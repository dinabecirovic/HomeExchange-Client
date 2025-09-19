export interface ReservationRequest {
  startDate: string;
  endDate: string;
  userId?: number;
  advertisementId: number;
}
