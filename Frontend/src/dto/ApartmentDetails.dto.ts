import Apartment from '../models/Apartment.model';

export default interface ApartmentDto extends Apartment {
  isFavourite: boolean;
}
