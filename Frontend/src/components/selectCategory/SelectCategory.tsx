import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { Category } from '../../enums/Category.enum';
interface SelectCategoryProps {
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
}

function SelectCategory({ category, setCategory }: SelectCategoryProps) {
  const categories = Object.values(Category);

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth>
        <InputLabel size="small">Kategorija</InputLabel>
        <Select
          size="small"
          label="Kategorija"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {categories.map((cat, i) => (
            <MenuItem key={i} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectCategory;
