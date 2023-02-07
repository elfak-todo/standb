import User from '../models/User.model';

export default interface UserLoginDetails extends User {
  accessToken: string;
}
