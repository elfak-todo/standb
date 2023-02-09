import { Alert, AlertColor, Box, Button, Snackbar } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import './ImageForm.css';
import { baseURL } from '../../config';

interface ImageFormProps {
  selectedImages?: string[];
  setSelectedImages: Dispatch<SetStateAction<File[]>>;
}

function ImageForm({ selectedImages, setSelectedImages }: ImageFormProps) {
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

  useEffect(() => {
    if (!selectedImages) return;
    setPreviewImgs(selectedImages.map((img) => baseURL + img));
  }, [selectedImages]);

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

    setSelectedImages(e.target.files);
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
