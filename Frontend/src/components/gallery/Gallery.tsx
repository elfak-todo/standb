import { Box } from '@mui/material';
import { useState } from 'react';

import placeholderImg from '../../assets/placeholder.jpg';
import ap1 from '../../assets/ap1.jpg';
import ap4 from '../../assets/ap4.jpg';
import ap5 from '../../assets/ap5.jpg';
import ap6 from '../../assets/ap6.jpg';

import './Gallery.css';

function Gallery() {
  const imgs = [ap1, ap4, ap5, ap6];
  const [previewImg, setPreviewImg] = useState<string>(
    imgs ? imgs[0] : placeholderImg
  );

  return (
    <div className="gallery-main-div">
      <Box
        component="img"
        src={previewImg}
        sx={{ width: 600, height: 425, mr: 1, borderRadius: 1.5 }}
      />
      <div className="vertical-div">
        {imgs?.map((img, i) => (
          <Box
            component="img"
            key={i}
            src={img}
            onClick={() => setPreviewImg(img)}
            sx={{
              width: 150,
              height: 100,
              mb: 1,
              cursor: 'pointer',
              border: img == previewImg ? 2.5 : 0,
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
