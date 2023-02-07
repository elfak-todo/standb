import { Dialog, Tab, Tabs } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import Login from './login/Login';
import Register from './register/Register';

interface AuthProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Auth({ isOpen, setIsOpen }: AuthProps) {
  const [tab, setTab] = useState<number>(1);
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md">
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value={1} label="Prijavi se" />
        <Tab value={2} label="Registruj se" />
      </Tabs>
      {tab == 1 && <Login setDialogOpen={setIsOpen} />}
      {tab == 2 && <Register setDialogOpen={setIsOpen} setTab={setTab} />}
    </Dialog>
  );
}

export default Auth;
