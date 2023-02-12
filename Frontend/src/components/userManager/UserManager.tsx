import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import UserLoginDetails from '../../dto/User.login.details.dto';
import { createRootAdmin } from '../../services/user.service';

interface UserContextState {
  user: UserLoginDetails | null;
  setUser: Dispatch<SetStateAction<UserLoginDetails | null>>;
}

const UserContext = createContext<UserContextState>({} as UserContextState);

export const UserManager: FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserLoginDetails | null>(
    JSON.parse(localStorage.getItem('user') ?? 'null')
  );

  useEffect(() => {
    createRootAdmin();
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
