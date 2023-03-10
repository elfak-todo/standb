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

import Form from '../apartmentForm/ApartmentForm';
import Apartment from '../../models/Apartment.model';
import ImageForm from '../imageForm/ImageForm';
import { createApartmentAd } from '../../services/apartment.service';
import { Category } from '../../enums/Category.enum';
import { Location } from '../../enums/Location.enum';
import { useLocation } from 'react-router';

interface CreateProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setFeed: Dispatch<SetStateAction<Apartment[]>>;
}

function Create({ isOpen, setIsOpen, setFeed }: CreateProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [apartment, setApartment] = useState<Apartment>({
    title: '',
    price: -1,
    category: Category.Default,
    location: Location.Default,
    squareFootage: -1,
    storey: -1,
    roomsCount: -1,
    heatingType: '',
    isRegistered: false,
    hasParking: false,
    description: '',
    gallery: [],
    comments: [],
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
  const location = useLocation();

  const handleCreate = () => {
    const { gallery, ...apartmentData } = apartment;
    const formData = new FormData();

    formData.set('apartment', JSON.stringify(apartmentData));

    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('gallery', selectedImages[i]);
    }

    createApartmentAd(formData)
      .then(({ data }) => {
        if (location.pathname === '/') {
          setFeed((s) => [data, ...s]);
        }
        setIsOpen(false);
        setSnackbar({
          open: true,
          message: 'Oglas je uspešno kreiran.',
          severity: 'success',
        });
      })
      .catch(({ response }) => {
        if (response?.data === 'FormDataInvalid') {
          setSnackbar({
            open: true,
            message: 'Molimo popunite sva polja!',
            severity: 'error',
          });
        }
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
          <ImageForm setSelectedImages={setSelectedImages} />
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

export default Create;
