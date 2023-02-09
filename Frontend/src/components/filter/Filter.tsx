import { Dispatch, SetStateAction } from 'react';
import { SearchParams } from '../../interfaces/SearchParams.interface';
import SelectCategory from '../selectCategory/SelectCategory';
import SelectLocation from '../selectLocation/SelectLocation';
import SelectPriceOrder from '../selectPriceOrder/SelectPriceOrder';

import './Filter.css';

interface Props {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

function Filter({ searchParams, setSearchParams }: Props) {
  return (
    <div className="filter-main-div">
      <SelectLocation
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <SelectCategory
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <SelectPriceOrder setSearchParams={setSearchParams} />
    </div>
  );
}

export default Filter;
