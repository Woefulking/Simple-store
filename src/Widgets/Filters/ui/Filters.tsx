import { useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useClickOutside } from 'Shared/hooks/useClickOutside';
import { FilterItem, filters, FilterValue } from 'Shared/constants/filters';
import cls from './Filters.module.scss';
import clsx from 'clsx';
import { useFilterStore } from '../model/FiltersStore';

export const Filters = () => {
  const filterDispatch = useFilterStore((state) => state.dispatch);
  const currentFilter = useFilterStore((state) => state.currentFilter);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<FilterValue>(currentFilter.value);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function handleFilterClick(filter: FilterItem) {
    setFilter(filter.value);
    filterDispatch({
      type: filter.type,
    });
    setIsOpen(false);
  }

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  })

  return (
    <div className={clsx(cls.filters)}>
      <span className={clsx(cls.label)}>Сортировка:</span>
      <div className={clsx(cls.select)} ref={dropdownRef}>
        <button className={clsx(cls.selectCurrent)} onClick={() => setIsOpen(!isOpen)}>
          {filter}
          <IoIosArrowDown size={18} className={clsx(cls.selectArrow, { [cls.rotated]: isOpen })} />
        </button>
        {isOpen && (
          <ul className={clsx(cls.dropdown)}>
            {filters.map((filter) => (
              <li
                key={filter.type}
                onClick={() => handleFilterClick(filter)}
                className={clsx(cls.option)}
              >
                {filter.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
