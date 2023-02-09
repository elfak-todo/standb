import { Category } from '../enums/Category.enum';
import { Location } from '../enums/Location.enum';
import { SortBy } from '../enums/SortBy.enum';

export interface SearchParams {
  q?: string;
  loc?: Location;
  cat?: Category;
  sortBy?: SortBy;
}
