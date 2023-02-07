import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import Form from './form/Form';
import ImageForm from './imageForm/ImageForm';

interface CreateProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Create({ isOpen, setIsOpen }: CreateProps) {
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
        <Form />
        <ImageForm />
      </DialogContent>
      <DialogActions>
        <Button variant="contained">Kreiraj</Button>
        <Button variant="outlined">Odustani</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Create;
