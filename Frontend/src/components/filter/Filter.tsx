import SelectCategory from '../selectCategory/SelectCategory';
import SelectLocation from '../selectLocation/SelectLocation';
import SelectPriceOrder from '../selectPriceOrder/SelectPriceOrder';

import './Filter.css';

function Filter() {
  return (
    <div className="filter-main-div">
      <SelectLocation />
      <SelectCategory />
      <SelectPriceOrder />
    </div>
  );
}

export default Filter;
