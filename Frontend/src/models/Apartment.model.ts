export default interface Apartment {
  id?: string;
  title: string;
  price: number;
  category: string;
  location: string;
  squareFootage: number;
  storey: number;
  roomsCount: number;
  heatingType: string;
  isRegistered: boolean;
  hasParking: boolean;
  description: string;
  gallery: string[] | File[];
}