import { Author } from './Author.model';
import User from './User.model';

export default interface Comment {
  id: string;
  text: string;
  publicationTime: Date;
  author: Author;
}
