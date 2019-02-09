export class HttpUtils {
  public static dateFormat(date: Date): string {
    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${date.getFullYear()}-${month}-${day}`;
  }

  public static convertArrivalDate(date: Date): string {
    return encodeURIComponent(`${HttpUtils.dateFormat(date)}T00:00:01+01:00`);
  }

  public static convertDepartureDate(date: Date): string {
    return encodeURIComponent(`${HttpUtils.dateFormat(date)}T23:59:59+01:00`);
  }

  public static getEndOfTheYear() {
    return new Date(new Date().getFullYear(), 11, 31);
  }
}
