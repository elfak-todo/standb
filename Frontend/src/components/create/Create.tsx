import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import Form from './form/Form';
import Apartment from '../../models/Apartment.model';
import ImageForm from './imageForm/ImageForm';
import { createApartmentAd } from '../../services/apartment.service';

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
      .catch((err) => console.log(err));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      fullWidth
      maxWidth="md"
    >
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
  );
}

export default Create;
