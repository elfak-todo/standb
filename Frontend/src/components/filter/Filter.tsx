import { useState } from 'react';
import { Category } from '../../enums/Category.enum';
import { Location } from '../../enums/Location.enum';
import SelectCategory from '../selectCategory/SelectCategory';
import SelectLocation from '../selectLocation/SelectLocation';
import SelectPriceOrder from '../selectPriceOrder/SelectPriceOrder';

import './Filter.css';

function Filter() {
  const [category, setCategory] = useState<Category>(Category.Default);
  const [location, setLocation] = useState<Location>(Location.Default);
  return (
    <div className="filter-main-div">
      <SelectLocation location={location} setLocation={setLocation} />
      <SelectCategory category={category} setCategory={setCategory} />
      <SelectPriceOrder />
    </div>
  );
}

export default Filter;
