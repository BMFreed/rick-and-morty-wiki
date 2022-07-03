import { FC, useState } from 'react';
import { TFilter } from '@Wiki/utils/categories';
import styled from 'styled-components';
import { Filter } from '@Wiki/components/EntriesPage/components/Filter';
import { SButton } from '@features/Wiki/ui';

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
    <SWrapper>
      <SFiltersHeading>Filters:</SFiltersHeading>
      <SFiltersList>
        {filters.map((filter) => (
          <SFilterWrapper key={filter.name}>
            <SFilterTitle htmlFor={filter.name}>{filter.name}</SFilterTitle>
            <Filter filter={filter} onFiltersChange={onFiltersChange} />
          </SFilterWrapper>
        ))}
      </SFiltersList>
      <SButton onClick={() => onApplyFilters(activeFilters)}>
        Apply filters
      </SButton>
    </SWrapper>
  );
};

const SWrapper = styled.aside`
  margin-left: 20px;
`;

const SFiltersHeading = styled.h2`
  margin-bottom: 20px;
`;

const SFiltersList = styled.ul`
  display: flex;
  gap: 10px;
  flex-direction: column;
  list-style: none;
  margin-bottom: 20px;
`;

const SFilterWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const SFilterTitle = styled.label`
  text-transform: capitalize;
  font-weight: bold;
`;
