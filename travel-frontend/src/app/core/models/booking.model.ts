
export interface BookingRequest {
  packageId?: number;
  offerId?: number;
  mode: 'packages' | 'flights' | 'stays';
  travelDate: string;
  travelers: number;
}

export interface Booking {
  bookingReference: string;
  status: string;
  mode: string;
  totalAmount: string;
  travelDate: string;
  travelers: number;
}
