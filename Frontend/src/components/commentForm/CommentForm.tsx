import { Box, TextField } from '@mui/material';
import { useContext } from 'react';

import UserContext from '../userManager/UserManager';

function CommentForm() {
  const { user } = useContext(UserContext);
  return (
    <Box sx={{ display: 'flex' }}>
      <TextField
        label="Postavite pitanje ili komentarišite oglas"
        placeholder="Da li imate ovaj u žutojj?"
        fullWidth
        multiline
        rows={2}
        variant="outlined"
      />
    </Box>
  );
}

export default CommentForm;
