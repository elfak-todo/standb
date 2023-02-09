import { IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Dispatch, SetStateAction, useState } from 'react';
import Edit from '../edit/Edit';
import Apartment from '../../models/Apartment.model';

interface OptionsProps {
  apartment: Apartment;
  setApartment: Dispatch<SetStateAction<Apartment>>;
}

function Options({ apartment, setApartment }: OptionsProps) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDelete = () => {
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
        <MenuItem onClick={() => setIsEditOpen(true)}>Izmeni</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
          Obriši
        </MenuItem>
      </Menu>
      <Edit
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        apartment={apartment}
        setApartment={setApartment}
      />
    </>
  );
}

export default Options;
