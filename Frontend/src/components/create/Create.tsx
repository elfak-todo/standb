import {
  Alert,
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Snackbar,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import Form from './form/Form';
import Apartment from '../../models/Apartment.model';
import ImageForm from './imageForm/ImageForm';
import { createApartmentAd } from '../../services/apartment.service';
import Portal from '@mui/material/Portal';

interface CreateProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setFeed: Dispatch<SetStateAction<Apartment[]>>;
}

function Create({ isOpen, setIsOpen, setFeed }: CreateProps) {
  const [apartment, setApartment] = useState<Apartment>({
    title: '',
    price: -1,
    category: '',
    location: '',
    squareFootage: -1,
    storey: -1,
    roomsCount: -1,
    heatingType: '',
    isRegistered: false,
    hasParking: false,
    description: '',
    gallery: [],
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

  const handleCreate = () => {
    const { gallery, ...rest } = apartment;
    const formData = new FormData();

    formData.set('apartment', JSON.stringify(rest));

    for (let i = 0; i < apartment.gallery.length; i++) {
      formData.append('gallery', apartment.gallery[i]);
    }

    createApartmentAd(formData)
      .then(({ data }) => {
        setFeed((s) => [data, ...s]);
        setIsOpen(false);
      })
      .catch(({ response }) => {
        if (response.data === 'FormDataInvalid') {
          setSnackbar({
            open: true,
            message: 'Molimo popunite sva polja!',
            severity: 'error',
          });
        }
      });
  };

  const handleSnackbarClose = () => {
    setSnackbar((s) => {
      return { ...s, open: false };
    });
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Kreiranje oglasa
          </Typography>
          <Form setApartment={setApartment} />
          <ImageForm apartment={apartment} setApartment={setApartment} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCreate}>
            Kreiraj
          </Button>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Odustani
          </Button>
        </DialogActions>
      </Dialog>
      <Portal>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Portal>
    </>
  );
}

export default Create;
