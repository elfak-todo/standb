import { IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

function Options() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDelete = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        sx={{ padding: 0 }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        color="primary"
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleEdit}>Izmeni</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
          Obriši
        </MenuItem>
      </Menu>
    </>
  );
}

export default Options;
