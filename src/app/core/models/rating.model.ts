export interface RatingRequest {
  score: number;
  comment: string;
  advertisementId: number;
}

export interface RatingResponse {
  id: number;
  score: number;
  comment: string;
  advertisementId: number;
  userId: number;
  userFirstName: string;
  userLastName: string;
}
