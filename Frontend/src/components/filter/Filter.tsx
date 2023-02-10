import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Category } from '../../enums/Category.enum';
import { Location } from '../../enums/Location.enum';
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
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.Default
  );
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    Location.Default
  );

  useEffect(() => {
    setSearchParams((s) => ({
      ...s,
      cat: selectedCategory,
      loc: selectedLocation,
    }));
  }, [selectedCategory, selectedLocation]);

  return (
    <div className="filter-main-div">
      <SelectLocation
        location={selectedLocation}
        setLocation={setSelectedLocation}
      />
      <SelectCategory
        category={selectedCategory}
        setCategory={setSelectedCategory}
      />
      <SelectPriceOrder setSearchParams={setSearchParams} />
    </div>
  );
}

export default Filter;
