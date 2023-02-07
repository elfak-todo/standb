import {
  Checkbox,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SelectCategory from '../../selectCategory/SelectCategory';
import SelectLocation from '../../selectLocation/SelectLocation';

import './Form.css';

function Form() {
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
        />
      </div>
      <div className="form-select-div">
        <SelectCategory />
        <SelectLocation />
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
          />
          <TextField
            label="Spratnost"
            type="number"
            variant="outlined"
            size="small"
            required
            sx={{ mb: 1 }}
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
          />
          <TextField
            label="Grejanje"
            variant="outlined"
            size="small"
            required
            sx={{ mb: 1 }}
          />
        </div>
        <div className="form-pair-div">
          <div>
            <span>Uknjiženo</span> <Checkbox />
          </div>
          <div>
            <span>Parking</span> <Checkbox />
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
      />
      <Typography variant="body1" sx={{ mt: 1 }}>
        Fotografije
      </Typography>
      <Divider sx={{ mb: 1 }} />
    </div>
  );
}

export default Form;
