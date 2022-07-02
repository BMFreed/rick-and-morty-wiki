import { FC, useState } from 'react';

import { TFilter } from '../../../utils/categories';

interface IProps {
  filters: TFilter[];
  onApplyFilters(filters: Record<string, string>): void;
}

export const FiltersPanel: FC<IProps> = ({ filters, onApplyFilters }) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );

  const onFiltersChange = (filterName: string, newValue: string): void =>
    setActiveFilters((prevState) => ({
      ...prevState,
      [filterName]: newValue,
    }));

  return (
    <aside>
      {filters.map((filter) => {
        if ('conditions' in filter) {
          return (
            <article key={filter.name}>
              <label htmlFor={`filter-${filter.name}`}>{filter.name}</label>{' '}
              <select
                name={`filter-${filter.name}`}
                id={filter.name}
                onChange={(event) => {
                  const currentValue = event.target.value;

                  const condition = currentValue === 'all' ? '' : currentValue;

                  onFiltersChange(filter.name, condition);
                }}
              >
                <option>all</option>
                {filter.conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </article>
          );
        }

        return (
          <article key={filter.name}>
            <label htmlFor={`filter-${filter.name}`}>{filter.name}</label>{' '}
            <input
              type='text'
              id={`filter-${filter.name}`}
              onChange={(event) =>
                onFiltersChange(
                  filter.name,
                  event.target.value.trim().toLowerCase(),
                )
              }
            />
          </article>
        );
      })}
      <button onClick={() => onApplyFilters(activeFilters)}>
        Apply filters
      </button>
    </aside>
  );
};
