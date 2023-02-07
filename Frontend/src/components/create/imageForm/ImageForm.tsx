import { Box, Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';

import './ImageForm.css';

function ImageForm() {
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);

  const handleSelectedImages = (e: any) => {
    const selectedFiles: File[] = Array.from(e.target.files);

    setPreviewImgs(
      selectedFiles.map((file: File) => URL.createObjectURL(file))
    );
  };

  return (
    <div className="image-form-main-div">
      <div>
        <Button component="label" variant="outlined" size="small">
          <UploadIcon /> Dodaj fotografije
          <input
            hidden
            accept="image/*"
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
        {previewImgs?.map((img, ind) => {
          return (
            <Box
              component="img"
              key={ind}
              src={img}
              sx={{
                width: 150,
                height: 100,
                margin: '20px 0px 20px 16px',
                borderRadius: 1.5,
              }}
            />
          );
        })}
      </Box>
    </div>
  );
}

export default ImageForm;
