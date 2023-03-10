import { AppBar, Avatar, Box, Button, Typography } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { red, green } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import './Navbar.css';
import Auth from '../auth/Auth';
import UserContext from '../userManager/UserManager';
import Create from '../create/Create';
import Apartment from '../../models/Apartment.model';

interface NavbarProps {
  setFeed?: Dispatch<SetStateAction<Apartment[]>>;
}

function Navbar({ setFeed }: NavbarProps) {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginOrLogout = () => {
    if (user) {
      setUser(null);
      return;
    }

    setIsAuthDialogOpen(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <div className="navbar-main-div">
            <div className="navbar-logo-div" onClick={() => navigate('/')}>
              <LocationCityIcon fontSize="large" sx={{ mb: 0.5, mr: 0.5 }} />
              <Typography variant="h4">StanDB</Typography>
            </div>
            {user && (
              <>
                <Button
                  variant="text"
                  sx={{ color: 'white' }}
                  onClick={() => navigate('/sacuvaniOglasi')}
                >
                  Sačuvani oglasi
                </Button>
                {user.isAdmin && (
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    sx={{ ml: 2, bgcolor: red[500] }}
                    onClick={() => setIsCreateOpen(true)}
                  >
                    Kreiraj oglas
                  </Button>
                )}
              </>
            )}
            <div className="navbar-auth-div">
              {user && (
                <div className="navbar-user-div">
                  <Avatar
                    sx={{
                      bgcolor: green[500],
                      mr: 0.5,
                      fontSize: 'small',
                      width: 32,
                      height: 32,
                    }}
                  >
                    {`${user?.firstName[0]}${user?.lastName[0]}`}
                  </Avatar>
                  <span>{`${user?.firstName} ${user?.lastName}`}</span>
                </div>
              )}
              <Button
                variant="contained"
                color="error"
                size="medium"
                sx={{ ml: 2, bgcolor: red[500] }}
                onClick={handleLoginOrLogout}
              >
                {user ? 'Odjavi se' : 'Prijavi se'}
              </Button>
            </div>
          </div>
        </AppBar>
      </Box>
      <Auth isOpen={isAuthDialogOpen} setIsOpen={setIsAuthDialogOpen} />
      <Create
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        setFeed={setFeed!}
      />
    </>
  );
}

export default Navbar;
