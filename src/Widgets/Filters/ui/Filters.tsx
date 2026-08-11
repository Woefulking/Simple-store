import { useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { type FilterItem, filters, type FilterValue } from 'shared/constants/filters';
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
    <div className="flex flex-col gap-2 mb-5 text-primary sm:flex-row sm:items-center sm:gap-3">
      <span className="text-secondary-text text-sm font-medium sm:text-base">Sorting:</span>
      <div className="relative w-full sm:w-auto" ref={dropdownRef}>
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full min-w-full sm:min-w-55 flex justify-between items-center gap-3 px-3.5 py-2 rounded-m border border-primary-border bg-tertiary text-sm font-medium cursor-pointer text-primary transition-all duration-200 hover:border-accent hover:ring-1 hover:ring-accent/25"
        >
          <span>{filter}</span>
          <IoIosArrowDown 
            size={18} 
            className={`text-secondary-text transition-transform duration-200 ${isOpen && "rotate-180"}`} 
          />
        </button>
        {isOpen && (
          <ul className="w-full absolute top-[calc(100%+6px)] left-0 p-1.5 rounded-m bg-secondary border border-primary-border shadow-soft list-none z-10 animate-dropdown-fade">
            {filters.map((item) => {
              const isSelected = filter === item.value;
              
              return (
                <li
                  key={item.type}
                  onClick={() => handleFilterClick(item)}
                  className={`px-2.5 py-2 rounded-lg cursor-pointer text-sm text-secondary-text transition-colors duration-200 hover:bg-tertiary hover:text-primary ${isSelected && "bg-accent/15 font-medium hover:bg-accent/20"}`}
                >
                  {item.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
