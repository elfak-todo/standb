import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import placeholderImg from '../../assets/placeholder.jpg';
import { baseURL } from '../../config';

import './Gallery.css';

interface GalleryProps {
  images: string[];
}

function Gallery({ images }: GalleryProps) {
  const [previewImg, setPreviewImg] = useState<string>(placeholderImg);

  useEffect(() => {
    setPreviewImg(images ? `${baseURL}/${images[0]}` : placeholderImg);
  }, [images]);

  return (
    <div className="gallery-main-div">
      <Box
        component="img"
        src={previewImg}
        sx={{ width: 600, height: 425, mr: 1, borderRadius: 1.5 }}
      />
      <div className="vertical-div">
        {images?.map((img, i) => (
          <Box
            component="img"
            key={i}
            src={`${baseURL}/${img}`}
            onClick={() => setPreviewImg(`${baseURL}/${img}`)}
            sx={{
              width: 150,
              height: 100,
              mb: 1,
              cursor: 'pointer',
              border: `${baseURL}/${img}` == previewImg ? 2.5 : 0,
              borderRadius: 1.5,
              borderColor: 'primary.dark',
              boxSizing: 'border-box',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
