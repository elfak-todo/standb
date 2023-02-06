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
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';

import UserLoginDto from '../../../models/User.login.dto';

interface LoginProps {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function Login({ setDialogOpen }: LoginProps) {
  const [user, setUser] = useState<UserLoginDto>({
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

  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { email, password } = user;
    if (email === '' || password === '') {
      setSnackbar({
        open: true,
        message: 'Molimo unesite email i lozinku',
        severity: 'error',
      });
      return;
    }

    console.log(user);
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
          <Typography variant="h6">Prijava</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
            Prijavi se već postojećim nalogom
          </Typography>
          <TextField
            sx={{ marginBottom: 2 }}
            label="Email"
            variant="outlined"
            required
            onChange={(e) => setUser((s) => ({ ...s, email: e.target.value }))}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            label="Lozinka"
            variant="outlined"
            type="password"
            required
            onChange={(e) =>
              setUser((s) => ({ ...s, password: e.target.value }))
            }
          />
          <Button variant="contained" onClick={handleLogin}>
            Prijavi se
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={(s) => ({ ...s, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}

export default Login;
