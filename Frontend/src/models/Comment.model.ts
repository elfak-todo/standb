import User from './User.model';

export default interface Comment {
  id: string;
  text: string;
  timestamp: Date;
  author: User;
}
