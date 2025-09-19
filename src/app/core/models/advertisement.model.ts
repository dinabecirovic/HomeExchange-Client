export interface AdvertisementRequest {
  photos: File[];
  title: string;
  description: string;
  date: string;
  address: string;
  city: string;
  country: string;
  numberOfRooms: number;
  homeArea: number;
  garden: boolean;
  parkingSpace: boolean;
  swimmingPool: boolean;
}

export interface AdvertisementResponse {
  id: number;
  urlPhotos: string[];
  title: string;
  description: string;
  date: string;
  address: string;
  city: string;
  country: string;
  numberOfRooms: number;
  homeArea: number;
  garden: boolean;
  parkingSpace: boolean;
  swimmingPool: boolean;
  availability?: string;
  isApproved?: boolean;
  homeId?: number;
}
