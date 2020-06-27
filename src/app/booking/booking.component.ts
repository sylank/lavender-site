import { Component, OnInit } from "@angular/core";
import { CalendarService } from "./calendar/calendar.service";
import {
  NgForm,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { CalendarHttpService } from "../shared/calendar.http.service";
import { Booking } from "./booking.model";
import { CustomValidator } from "../shared/validators/email.validator";
import { Router, NavigationEnd } from "@angular/router";
import { ReCaptchaV3Service } from "ngx-captcha";
import { BookingData } from "./booking.data";
import { Constants } from "../shared/constants";
import { CostCalculationHttpService } from "../shared/cost-calculation.http.service";
import { environment } from "../../environments/environment";
import { HttpConstants } from "../shared/http.constants";
import { MailChimpService } from "../shared/mail-chimp.service";
import { SubscriptionModel } from "../subscribe/subscription-model";
import { GoogleAnalyticsService } from "../shared/google-analytics.service";
import { GoogleAnalyticsConstants } from "../shared/google.analytics.constants";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.pug",
  styleUrls: ["./booking.component.sass"],
})
export class BookingComponent implements OnInit {
  navigationSubscription: any;

  public lavender1Selected: boolean;
  public lavender2Selected: boolean;

  public dataProtection = false;
  public dataHandling = false;
  public houseRules = false;

  public bookingEnabled = environment.reservationEnabled;
  public showNotification = !this.bookingEnabled;

  public showLoading = true;

  private basePrice = 25000;
  private calendarMode: "arrival" | "departure" = "arrival";
  private showCalendar = false;
  private arrivalCalendarActive = false;
  private departureCalendarActive = false;
  private calendarInitDate: Date; // To determine which date the calendar should open up with
  public bookingStage: "person" | "data" | "overview" | "result" = "person";
  private bookingResult: "success" | "failed" = "failed";
  private messageLength = 300;
  reservedDates = [];

  private booking: Booking = {
    arrival: new Date(),
    departure: new Date(),
    nights: 1,
    price: 25000,
    fname: "",
    lname: "",
    phone: "",
    email: "",
    message: "",
    reservationId: "",
    subscribe: false,
    personCount: 1,
    petCount: 0,
  };
  formName: FormGroup;

  constructor(
    private calendarService: CalendarService,
    private calendarHttpService: CalendarHttpService,
    private costCalculationHttpService: CostCalculationHttpService,
    private mailchimpService: MailChimpService,
    private fb: FormBuilder,
    private router: Router,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.bookingStage = "person";
        this.scrollToPosition();
      }
    });
  }

  houseChooserSelected(event) {
    if (event === "Lavender1") {
      this.lavender1Selected = true;
      this.lavender2Selected = false;
    }

    if (event === "Lavender2") {
      this.lavender1Selected = false;
      this.lavender2Selected = true;
    }
  }

  onMessageInput(): void {
    this.messageLength = 300 - this.formName.get("message").value.length;
  }

  toggleArrivalCalendar(event: PointerEvent): void {
    event.stopPropagation();
    this.departureCalendarActive = false;
    if (this.showCalendar && this.calendarMode === "departure") {
      this.calendarMode = "arrival";
    } else {
      this.showCalendar = !this.showCalendar;
    }
    this.calendarMode = "arrival";
    this.calendarInitDate = this.booking.arrival;
    if (this.showCalendar && this.calendarMode === "arrival") {
      this.arrivalCalendarActive = true;
    } else {
      this.arrivalCalendarActive = false;
    }
    this.calendarService.setSelectedDate(this.booking.arrival);
    this.calendarService.updateCalendar.next(this.booking.arrival);
    this.calendarService.reservedDates.next(this.reservedDates);

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.ARRIVAL_SHOW_EVENT,
      GoogleAnalyticsConstants.OPEN_ACTION,
      "",
      1
    );
  }

  toggleDepartureCalendar(event: PointerEvent): void {
    event.stopPropagation();
    this.arrivalCalendarActive = false;
    if (this.showCalendar && this.calendarMode === "arrival") {
      this.calendarMode = "departure";
    } else {
      this.showCalendar = !this.showCalendar;
    }
    this.calendarMode = "departure";
    this.calendarInitDate = this.booking.departure;
    if (this.showCalendar && this.calendarMode === "departure") {
      this.departureCalendarActive = true;
    } else {
      this.departureCalendarActive = false;
    }
    this.calendarService.setSelectedDate(this.booking.departure);
    this.calendarService.updateCalendar.next(this.booking.departure);
    this.calendarService.reservedDates.next(this.reservedDates);

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.DEPARTURE_SHOW_EVENT,
      GoogleAnalyticsConstants.OPEN_ACTION,
      "",
      1
    );
  }

  setDate(date: Date): void {
    switch (this.calendarMode) {
      case "arrival":
        this.booking.arrival = date;
        if (date.getTime() >= this.booking.departure.getTime() - 86400000) {
          this.booking.departure = new Date(
            this.booking.arrival.getFullYear(),
            this.booking.arrival.getMonth(),
            this.booking.arrival.getDate() + 1
          );
        }
        break;
      case "departure":
        this.booking.departure = date;
        if (date.getTime() < this.booking.arrival.getTime() + 86400000) {
          this.booking.arrival = new Date(
            this.booking.departure.getFullYear(),
            this.booking.departure.getMonth(),
            this.booking.departure.getDate() - 1
          );
        }
    }
    this.setPrice();
    this.calendarHttpService
      .getReservedDates(this.booking.arrival, this.booking.departure)
      .subscribe((reservedDates: any) => {
        this.reservedDates = reservedDates.response.reservations;
      });

    this.showLoading = true;
    this.costCalculationHttpService
      .getCostCalculationBetweenDate(
        this.booking.arrival,
        this.booking.departure
      )
      .subscribe((costData: any) => {
        this.basePrice = costData.response.value;
        this.setPrice();
        this.showLoading = false;
      });
  }

  setPrice(): void {
    if (
      (this.booking.departure.getTime() - this.booking.arrival.getTime()) /
        86400000 <
      1
    ) {
      this.booking.nights = 1;
    } else {
      this.booking.nights = Math.ceil(
        (this.booking.departure.getTime() - this.booking.arrival.getTime()) /
          86400000
      );
    }
    this.booking.price = this.basePrice;
  }

  onCalendarDestroy(): void {
    this.arrivalCalendarActive = false;
    this.departureCalendarActive = false;
    this.showCalendar = false;
  }

  onSubmit(form: NgForm): void {
    this.bookingStage = "overview";
    this.dataProtection = false;
    this.dataHandling = false;
    this.houseRules = false;
    this.booking.subscribe = false;

    this.scrollToPosition();
    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.PERSONAL_DATA_SUBMIT_EVENT,
      GoogleAnalyticsConstants.TRUE_ACTION,
      "",
      1
    );
  }

  onPersonSubmit(): void {
    this.bookingStage = "data";

    this.scrollToPosition();

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.PEOPLE_DATA_SUBMIT_EVENT,
      GoogleAnalyticsConstants.TRUE_ACTION,
      "",
      1
    );
  }

  isSendingDisabled() {
    return !(this.dataProtection && this.dataHandling && this.houseRules);
  }

  sendBooking() {
    this.showLoading = true;
    this.reCaptchaV3Service.execute(
      HttpConstants.reCaptchaSiteKey,
      "booking",
      (token) => {
        const bookingData = new BookingData(
          this.booking.email,
          this.booking.message,
          this.booking.arrival,
          this.booking.departure,
          this.booking.fname,
          this.booking.lname,
          this.booking.phone,
          this.booking.subscribe,
          this.booking.personCount,
          this.booking.petCount
        );

        this.calendarHttpService
          .submitBooking(bookingData, token)
          .subscribe((bookingResult: any) => {
            this.showLoading = false;

            this.bookingStage = "result";
            this.bookingResult = "failed";

            const data = bookingResult.response;
            if (data.enabled === true && data.reservationCause === "SUCCESS") {
              this.bookingStage = "result";
              this.bookingResult = "success";

              this.booking.reservationId = data.reservationId;
              this.scrollToPosition();

              this.googleAnalyticsService.eventEmitter(
                GoogleAnalyticsConstants.SEND_BOOKING_SUBMIT_EVENT,
                GoogleAnalyticsConstants.SUCCEED_ACTION,
                "",
                1
              );
            } else {
              this.googleAnalyticsService.eventEmitter(
                GoogleAnalyticsConstants.SEND_BOOKING_SUBMIT_EVENT,
                GoogleAnalyticsConstants.FAILED_ACTION,
                "",
                1
              );
            }
          });
      },
      {
        useGlobalDomain: false,
      }
    );

    if (this.booking.subscribe) {
      const subscriptionModel = new SubscriptionModel(
        this.booking.email,
        this.booking.fname,
        this.booking.lname
      );
      this.mailchimpService.submitSubscription(subscriptionModel).subscribe(
        (result) => {
          console.log("success");
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("else");
        }
      );

      this.googleAnalyticsService.eventEmitter(
        GoogleAnalyticsConstants.SUBSCRIBE_TO_NEWSLETTER_CHECKBOX_EVENT,
        GoogleAnalyticsConstants.TRUE_ACTION,
        "",
        1
      );
    } else {
      this.googleAnalyticsService.eventEmitter(
        GoogleAnalyticsConstants.SUBSCRIBE_TO_NEWSLETTER_CHECKBOX_EVENT,
        GoogleAnalyticsConstants.FALSE_ACTION,
        "",
        1
      );
    }

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.SEND_BOOKING_SUBMIT_EVENT,
      GoogleAnalyticsConstants.OPEN_ACTION,
      "",
      1
    );
  }

  onBack(stateName: number): void {
    switch (stateName) {
      case 0:
        this.bookingStage = "person";
        break;
      case 1:
        this.bookingStage = "data";
        break;
    }

    this.scrollToPosition();
  }

  closeCalendar(): void {
    this.showCalendar = false;
    this.arrivalCalendarActive = false;
    this.departureCalendarActive = false;
  }

  formatCurrency(amount: number) {
    let returnData = String(amount);
    const thousandIndex = returnData.length - 3;
    const millionIndex = returnData.length - 6;

    // 100 000, 10 000, 1 000
    if (amount > 1000) {
      returnData = [
        returnData.slice(0, thousandIndex),
        " ",
        returnData.slice(thousandIndex),
      ].join("");
    }

    // 100 000 000, 10 000 000, 1 000 000
    if (amount > 1000000) {
      returnData = [
        returnData.slice(0, millionIndex),
        " ",
        returnData.slice(millionIndex),
      ].join("");
    }

    return returnData;
  }

  ngOnInit() {
    this.formName = this.fb.group({
      fname: ["", [Validators.required]],
      lname: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, CustomValidator.emailValidator]],
      message: ["", []],
    });
    this.booking.arrival.setDate(this.booking.arrival.getDate() + 1);
    this.booking.departure.setDate(this.booking.departure.getDate() + 2);

    this.calendarHttpService
      .getReservedDates(this.booking.arrival, this.booking.departure)
      .subscribe((reservedDates: any) => {
        this.reservedDates = reservedDates.response.reservations;
      });

    this.reCaptchaV3Service.execute(
      HttpConstants.reCaptchaSiteKey,
      "booking",
      (token) => {},
      {
        useGlobalDomain: false,
      }
    );

    this.showLoading = this.bookingEnabled;
    this.costCalculationHttpService
      .getCostCalculationBetweenDate(
        this.booking.arrival,
        this.booking.departure
      )
      .subscribe((costData: any) => {
        this.basePrice = costData.response.value;
        this.setPrice();
        this.showLoading = false;
      });
  }

  getMonthNameById(id: number) {
    return Constants.months[id];
  }

  scrollToPosition(x: number = 0, y: number = 0) {
    window.scrollTo(x, y);
  }

  handleReset() {
    console.log("handleReset");
  }

  handleReady() {
    console.log("handleReady");
  }

  handleLoad() {
    console.log("handleLoad");
  }

  handleSuccess(event) {
    console.log("handleSuccess: " + event);
  }
}
