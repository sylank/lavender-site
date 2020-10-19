import { Component, OnInit } from "@angular/core";
import { CalendarService } from "./calendar/calendar.service";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
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
import { LanguageService } from "../shared/language.service";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.pug",
  styleUrls: ["./booking.component.sass"],
})
export class BookingComponent implements OnInit {
  navigationSubscription: any;

  public lavender1Selected: boolean = true;
  public lavender2Selected: boolean = false;
  public lavender1Title: string = "Levendula 1";
  public lavender2Title: string = "Levendula 2";
  public lavender1Subtitle: string =
    "Levendula Apartman (baloldal) - 5 fő részére";
  public lavender2Subtitle: string =
    "Levendula Apartman (jobboldal)- 5 fő részére";
  public comingSoon: string = "Új!";

  public dataProtection = false;
  public dataHandling = false;
  public showBookingLoading = false;
  public houseRules = false;

  public bookingEnabled = environment.reservationEnabled;
  public showNotification = !this.bookingEnabled;
  public showSuccessfulBookingDialog: boolean = false;
  public showFailedBookingDialog: boolean = false;

  public showLoading = true;
  public showDateLoading = true;

  private basePrice = 25000;
  private calendarMode: "arrival" | "departure" = "arrival";
  private showCalendar = false;
  private arrivalCalendarActive = false;
  private departureCalendarActive = false;
  private calendarInitDate: Date; // To determine which date the calendar should open up with
  public bookingStage: "person" | "data" | "overview" = "person";
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
    private googleAnalyticsService: GoogleAnalyticsService,
    private languageService: LanguageService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.bookingStage = "person";
        this.scrollToPosition();
      }
    });

    this.languageService
      .observer()
      .subscribe((event: string) => this.refreshHouseChooserText());
  }

  houseChooserSelected(apartment: string) {
    if (apartment === "Lavender1") {
      this.lavender1Selected = true;
      this.lavender2Selected = false;
    }

    if (apartment === "Lavender2") {
      this.lavender1Selected = false;
      this.lavender2Selected = true;
    }
  }

  getApartmentCodeBySelectedComponent(): "lavender1" | "lavender2" {
    if (this.lavender1Selected) {
      return "lavender1";
    }

    if (this.lavender2Selected) {
      return "lavender2";
    }
  }

  getMessageLength(): number {
    return 300 - this.booking.message.length;
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
      .getReservedDates(
        this.booking.arrival,
        this.booking.departure,
        this.getApartmentCodeBySelectedComponent()
      )
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
    this.showBookingLoading = true;
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
          .submitBooking(
            bookingData,
            token,
            this.getApartmentCodeBySelectedComponent()
          )
          .subscribe((bookingResult: any) => {
            this.showLoading = false;

            this.bookingStage = "person";

            const data = bookingResult.response;
            if (data.enabled === true && data.reservationCause === "SUCCESS") {
              this.booking.reservationId = data.reservationId;
              this.scrollToPosition();

              this.showSuccessfulBookingDialog = true;
              this.showBookingLoading = false;

              this.googleAnalyticsService.eventEmitter(
                GoogleAnalyticsConstants.SEND_BOOKING_SUBMIT_EVENT,
                GoogleAnalyticsConstants.SUCCEED_ACTION,
                "",
                1
              );
            } else {
              this.showFailedBookingDialog = true;
              this.showBookingLoading = false;

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

  onBack(stateName: "person" | "data"): void {
    this.bookingStage = stateName;
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

    this.showDateLoading = true;
    this.calendarHttpService
      .getReservedDates(
        this.booking.arrival,
        this.booking.departure,
        this.getApartmentCodeBySelectedComponent()
      )
      .subscribe(
        (reservedDates: any) => {
          this.reservedDates = reservedDates.response.reservations;

          this.showDateLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );

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

    this.refreshHouseChooserText();
  }

  refreshHouseChooserText() {
    this.languageService.getTranslation().subscribe((translations: any) => {
      this.lavender1Title =
        translations["booking"].house_chooser.lavender1_title;
      this.lavender2Title =
        translations["booking"].house_chooser.lavender2_title;
      this.lavender1Subtitle =
        translations["booking"].house_chooser.lavender1_subtitle;
      this.lavender2Subtitle =
        translations["booking"].house_chooser.lavender2_subtitle;
      this.comingSoon = translations["booking"].house_chooser.coming_soon;
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
