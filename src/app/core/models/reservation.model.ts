export interface ReservationRequest {
  startDate: string;
  endDate: string;
  userId?: number;
  advertisementId: number;
}

export interface ReservationResponse {
  id: number;
  startDate: string;
  endDate: string;
  isExchangeConfirmed: boolean;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}
