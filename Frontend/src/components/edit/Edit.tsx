import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Category } from '../../enums/Category.enum';
import { Location } from '../../enums/Location.enum';

import Apartment from '../../models/Apartment.model';
import Form from '../apartmentForm/ApartmentForm';
import ImageForm from '../imageForm/ImageForm';

interface EditProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  apartment: Apartment;
  setApartment: Dispatch<SetStateAction<Apartment>>;
}

function Edit({ isOpen, setIsOpen, apartment, setApartment }: EditProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [editApartmentData, setEditApartmentData] = useState<Apartment>({
    id: '',
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
  });

  useEffect(() => {
    setEditApartmentData(apartment);
  }, [apartment]);

  const handleEdit = () => {
    console.log(selectedImages);
    console.log(editApartmentData);
  };

  const handleCancelEdit = () => {
    setEditApartmentData(apartment);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleCancelEdit} maxWidth="lg">
      <DialogContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Izmena oglasa
        </Typography>
        <Form
          apartment={editApartmentData}
          setApartment={setEditApartmentData}
        />
        <ImageForm
          selectedImages={editApartmentData?.gallery as string[]}
          setSelectedImages={setSelectedImages}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleEdit}>
          Sačuvaj izmene
        </Button>
        <Button variant="outlined" onClick={handleCancelEdit}>
          Odustani
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Edit;
