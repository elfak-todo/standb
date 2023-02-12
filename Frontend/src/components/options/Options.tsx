import { IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Dispatch, SetStateAction, useState } from 'react';
import Edit from '../edit/Edit';
import Apartment from '../../models/Apartment.model';
import { deleteApartmentAd } from '../../services/apartment.service';
import { useNavigate } from 'react-router';

interface OptionsProps {
  apartment: Apartment;
  setApartment: Dispatch<SetStateAction<Apartment>>;
}

function Options({ apartment, setApartment }: OptionsProps) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteApartmentAd(apartment.id!)
      .then(() => {
        navigate('/', { replace: true });
        setAnchorEl(null);
      })
      .catch((err) => console.error(err));
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
