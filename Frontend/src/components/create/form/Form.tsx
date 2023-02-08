import {
  Checkbox,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Apartment from '../../../models/Apartment.model';
import SelectCategory from '../../selectCategory/SelectCategory';
import SelectLocation from '../../selectLocation/SelectLocation';

import './Form.css';

interface FormProps {
  setApartment: Dispatch<SetStateAction<Apartment>>;
}

function Form({ setApartment }: FormProps) {
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    setApartment((s) => ({ ...s, category: category, location: location }));
  }, [category, location]);

  return (
    <div>
      <Typography variant="body1">Osnovne informacije</Typography>
      <Divider sx={{ mb: 2 }} />
      <div>
        <TextField
          label="Naslov oglasa"
          variant="outlined"
          size="small"
          required
          sx={{ mb: 2 }}
          onChange={(e) =>
            setApartment((s) => ({ ...s, title: e.target.value }))
          }
        />
        <TextField
          label="Cena"
          type="number"
          variant="outlined"
          size="small"
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          sx={{ mb: 2, ml: 2, width: 150 }}
          onChange={(e) =>
            setApartment((s) => ({ ...s, price: parseInt(e.target.value) }))
          }
        />
      </div>
      <div className="form-select-div">
        <SelectCategory setCategory={setCategory} />
        <SelectLocation setLocation={setLocation} />
      </div>
      <Typography variant="body1">Detalji</Typography>
      <Divider />
      <div className="form-details-div">
        <div className="form-pair-div">
          <TextField
            label="Kvadratura"
            type="number"
            variant="outlined"
            size="small"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">m²</InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
            onChange={(e) =>
              setApartment((s) => ({
                ...s,
                squareFootage: parseInt(e.target.value),
              }))
            }
          />
          <TextField
            label="Spratnost"
            type="number"
            variant="outlined"
            size="small"
            required
            sx={{ mb: 1 }}
            onChange={(e) =>
              setApartment((s) => ({ ...s, storey: parseInt(e.target.value) }))
            }
          />
        </div>
        <div className="form-pair-div">
          <TextField
            label="Broj Prostorija"
            type="number"
            variant="outlined"
            size="small"
            required
            sx={{ mb: 1 }}
            onChange={(e) =>
              setApartment((s) => ({
                ...s,
                roomsCount: parseInt(e.target.value),
              }))
            }
          />
          <TextField
            label="Grejanje"
            variant="outlined"
            size="small"
            required
            sx={{ mb: 1 }}
            onChange={(e) =>
              setApartment((s) => ({ ...s, heatingType: e.target.value }))
            }
          />
        </div>
        <div className="form-pair-div">
          <div>
            <span>Uknjiženo</span>{' '}
            <Checkbox
              onChange={(e) =>
                setApartment((s) => ({
                  ...s,
                  isRegistered: !s.isRegistered,
                }))
              }
            />
          </div>
          <div>
            <span>Parking</span>{' '}
            <Checkbox
              onChange={(e) =>
                setApartment((s) => ({
                  ...s,
                  hasParking: !s.hasParking,
                }))
              }
            />
          </div>
        </div>
      </div>
      <Typography variant="body1">Opis</Typography>
      <Divider sx={{ mb: 1 }} />
      <TextField
        margin="dense"
        label="Opis oglasa"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        onChange={(e) =>
          setApartment((s) => ({
            ...s,
            description: e.target.value,
          }))
        }
      />
      <Typography variant="body1" sx={{ mt: 1 }}>
        Fotografije
      </Typography>
      <Divider sx={{ mb: 1 }} />
    </div>
  );
}

export default Form;
