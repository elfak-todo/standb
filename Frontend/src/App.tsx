import './App.css';
import AppRoutes from './AppRoutes';
import AxiosConfig from './components/axiosConfig/AxiosConfig';
import { UserManager } from './components/userManager/UserManager';

function App() {
  return (
    <UserManager>
      <AxiosConfig />
      <AppRoutes />
    </UserManager>
  );
}

export default App;
