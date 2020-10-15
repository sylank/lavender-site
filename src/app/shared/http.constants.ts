import { environment } from "../../environments/environment";

export class HttpConstants {
  public static rootUrl = environment.baseUrl;

  //Query
  public static lavender1CalendarQueryEndpoint =
    "/reservation/lavender1_query_all";
  public static lavender2CalendarQueryEndpoint =
    "/reservation/lavender2_query_all";

  // Create
  public static lavender1CalendarCreateReservationEndpoint =
    "/reservation/lavender1_create";
  public static lavender2CalendarCreateReservationEndpoint =
    "/reservation/lavender2_create";

  public static calendarDeleteReservationEndpoint = "/reservation/delete-claim";
  public static staticInformationEndpoint = "/reservation/static-info";
  public static deleteUserDataEndpoint = "/user/delete-claim";
  public static costCalculationEndpoint = "/reservation/cost-calculation";

  public static eventQueryEndpoint = "/events/query";

  public static reCaptchaSiteKey = "6LfhH5UUAAAAAIPkIxC6e8SmerK17bNnCjgL8nPD";
}
