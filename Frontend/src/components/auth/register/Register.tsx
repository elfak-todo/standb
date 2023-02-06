import {
  Alert,
  AlertColor,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, MouseEvent, useState } from 'react';

import UserRegisterDto from '../../../models/User.register.dto';

interface RegisterProps {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function Register({ setDialogOpen }: RegisterProps) {
  const [newUser, setNewUser] = useState<UserRegisterDto>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleRegistration = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (Object.values(newUser).some((value) => value === '')) {
      setSnackbar({
        open: true,
        message: 'Polja označena zvezdicom ne mogu biti prazna',
        severity: 'error',
      });
      return;
    }

    console.log(newUser);

    setDialogOpen(false);
  };

  return (
    <>
      <Card elevation={2}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Registracija</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
            Nemaš nalog? Registruj se ovde
          </Typography>
          <TextField
            sx={{ mb: 2 }}
            label="Ime"
            variant="outlined"
            required
            onChange={(event) =>
              setNewUser((state) => ({
                ...state,
                firstName: event.target.value,
              }))
            }
          />
          <TextField
            sx={{ mb: 2 }}
            label="Prezime"
            variant="outlined"
            required
            onChange={(event) =>
              setNewUser((state) => ({
                ...state,
                lastName: event.target.value,
              }))
            }
          />
          <TextField
            sx={{ mb: 2 }}
            label="Email"
            variant="outlined"
            required
            onChange={(event) =>
              setNewUser((state) => ({ ...state, email: event.target.value }))
            }
          />
          <TextField
            sx={{ mb: 2 }}
            label="Lozinka"
            variant="outlined"
            type="password"
            required
            onChange={(event) =>
              setNewUser((state) => ({
                ...state,
                password: event.target.value,
              }))
            }
          />
          <Button variant="contained" onClick={handleRegistration}>
            Registruj se
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}

export default Register;
