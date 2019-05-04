import { environment } from '../../environments/environment';

export class HttpConstants {
    public static rootUrl = environment.baseUrl;

    public static calendarQueryEndpoint = '/reservation/query';
    public static calendarEnabledEndpoint = '/reservation/enabled';
    public static calendarCreateReservationEndpoint = '/reservation/create';
    public static calendarDeleteReservationEndpoint = '/reservation/delete-claim';
    public static staticInformationEndpoint = '/reservation/static-info';
    public static costCalculationEndpoint = '/reservation/cost-calculation';

    public static eventQueryEndpoint = '/events/query';

    public static reCaptchaSiteKey ="6LfhH5UUAAAAAIPkIxC6e8SmerK17bNnCjgL8nPD";
}
