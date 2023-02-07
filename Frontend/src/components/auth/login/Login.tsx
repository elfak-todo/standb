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
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import UserLoginDto from '../../../dto/User.login.dto';
import { login } from '../../../services/user.service';
import UserContext from '../../userManager/UserManager';

interface LoginProps {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function Login({ setDialogOpen }: LoginProps) {
  const { setUser } = useContext(UserContext);
  const [userCreds, setUserCreds] = useState<UserLoginDto>({
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
    const { email, password } = userCreds;
    if (email === '' || password === '') {
      setSnackbar({
        open: true,
        message: 'Molimo unesite email i lozinku',
        severity: 'error',
      });
      return;
    }

    login(userCreds)
      .then(({ data }) => {
        setUser(data);
        setDialogOpen(false);
      })
      .catch(({ response }) => {
        const { data } = response;
        setSnackbar({
          open: true,
          message:
            data == 'InvalidPassword'
              ? 'Uneta lozinka nije validna.'
              : data == 'UserNotFound'
              ? 'Email nije registrovan.'
              : 'Greška na strani servera.',
          severity: 'error',
        });
      });
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
            onChange={(e) =>
              setUserCreds((s) => ({ ...s, email: e.target.value }))
            }
          />
          <TextField
            sx={{ marginBottom: 2 }}
            label="Lozinka"
            variant="outlined"
            type="password"
            required
            onChange={(e) =>
              setUserCreds((s) => ({ ...s, password: e.target.value }))
            }
          />
          <Button variant="contained" onClick={handleLogin}>
            Prijavi se
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={(s) => ({ ...s, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}

export default Login;
