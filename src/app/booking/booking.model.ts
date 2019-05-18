export interface Booking {
  arrival: Date;
  departure: Date;
  nights: number;
  price: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  reservationId: string;
  subscribe: boolean;
  personCount: number;
  petCount: number;
}
