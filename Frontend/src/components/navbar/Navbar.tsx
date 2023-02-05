import { AppBar, Avatar, Box, Button, Typography } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { red, green } from '@mui/material/colors';
import { useNavigate } from 'react-router';

import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <div className="navbar-main-div">
          <div className="navbar-logo-div" onClick={() => navigate('/')}>
            <LocationCityIcon fontSize="large" sx={{ mb: 0.5, mr: 0.5 }} />
            <Typography variant="h6">StanDB</Typography>
          </div>
          <Button variant="text" sx={{ color: 'white' }}>
            Sačuvani oglasi
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ ml: 2, bgcolor: red[500] }}
          >
            Kreiraj oglas
          </Button>
          <div className="navbar-auth-div">
            <Avatar
              sx={{
                bgcolor: green[500],
                mr: 0.5,
                fontSize: 'small',
                width: 32,
                height: 32,
              }}
            >
              AM
            </Avatar>
            <span>Andrija Mitć</span>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ ml: 2, bgcolor: red[500] }}
            >
              Odjavi se
            </Button>
          </div>
        </div>
      </AppBar>
    </Box>
  );
}

export default Navbar;
