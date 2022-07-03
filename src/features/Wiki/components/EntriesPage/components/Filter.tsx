import { TFilter } from '@Wiki/utils/categories';
import { FC } from 'react';
import styled from 'styled-components';

interface IProps {
  filter: TFilter;
  onFiltersChange(filterName: string, newValue: string): void;
}

export const Filter: FC<IProps> = ({ filter, onFiltersChange }) => {
  if ('conditions' in filter) {
    return (
      <SFilterSelect
        name={filter.name}
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
      </SFilterSelect>
    );
  }

  return (
    <SFilterInput
      type='text'
      id={filter.name}
      onChange={(event) =>
        onFiltersChange(filter.name, event.target.value.trim().toLowerCase())
      }
    />
  );
};

const SFilterInput = styled.input`
  padding: 8px 10px;
  width: 200px;
  border-radius: 3px;
  border: none;
  outline-color: ${({ theme }) => theme.colors.accentDark};
`;

const SFilterSelect = styled.select`
  padding: 8px 10px;
  width: 200px;
  border-radius: 3px;
`;
