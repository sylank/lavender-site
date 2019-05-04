export class BookingData {
    constructor(
    public email: string,
    public body: string,
    public fromDate: Date,
    public toDate: Date,
    public fullName: string,
    public phoneNumber: string,
    public newsLetter: boolean
    ) {

    }
}
