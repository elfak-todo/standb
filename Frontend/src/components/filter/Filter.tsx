import { useState } from 'react';
import SelectCategory from '../selectCategory/SelectCategory';
import SelectLocation from '../selectLocation/SelectLocation';
import SelectPriceOrder from '../selectPriceOrder/SelectPriceOrder';

import './Filter.css';

function Filter() {
  const [category, setCategory] = useState<string>('');
  return (
    <div className="filter-main-div">
      <SelectLocation />
      <SelectCategory category={category} setCategory={setCategory} />
      <SelectPriceOrder />
    </div>
  );
}

export default Filter;
