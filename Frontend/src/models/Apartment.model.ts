import { Category } from '../enums/Category.enum';
import { Location } from '../enums/Location.enum';
import Comment from './Comment.model';

export default interface Apartment {
  id?: string;
  title: string;
  price: number;
  category: Category;
  location: Location;
  squareFootage: number;
  storey: number;
  roomsCount: number;
  heatingType: string;
  isRegistered: boolean;
  hasParking: boolean;
  description: string;
  gallery: string[] | File[];
  comments: Comment[];
}
