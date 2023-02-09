import { Alert, AlertColor, Box, Button, Snackbar } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { Dispatch, SetStateAction, useState } from 'react';

import './ImageForm.css';
import Apartment from '../../../models/Apartment.model';

interface ImageFormProps {
  apartment: Apartment;
  setApartment: Dispatch<SetStateAction<Apartment>>;
}

function ImageForm({ apartment, setApartment }: ImageFormProps) {
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSelectedImages = (e: any) => {
    const selectedFiles: File[] = Array.from(e.target.files);

    if (selectedFiles.length > 4) {
      setSnackbar({
        open: true,
        message: 'Maksimalni broj fotografija je 4!',
        severity: 'error',
      });
      return;
    }

    setPreviewImgs(
      selectedFiles.map((file: File) => URL.createObjectURL(file))
    );

    setApartment((s) => ({ ...s, gallery: e.target.files }));
  };

  return (
    <>
      <div className="image-form-main-div">
        <div>
          <Button component="label" variant="outlined" size="small">
            <UploadIcon /> Dodaj fotografije
            <input
              hidden
              accept="image/png, image/jpeg"
              multiple
              type="file"
              onChange={handleSelectedImages}
            />
          </Button>
        </div>
        <Box
          className="image-form-preview-div"
          sx={{
            border: 1,
            borderColor: '#c4c4c4',
            borderRadius: 1,
          }}
        >
          {previewImgs.map((img, ind) => {
            return (
              <Box
                component="img"
                key={ind}
                src={img}
                className="image-form-img-div"
              />
            );
          })}
        </Box>
      </div>
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

export default ImageForm;
