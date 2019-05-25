export class BookingData {
    constructor(
    public email: string,
    public body: string,
    public fromDate: Date,
    public toDate: Date,
    public fname: string,
    public lname: string,
    public phoneNumber: string,
    public subscribe: boolean,
    public personCount: number,
    public petCount: number,
    ) {

    }
}
