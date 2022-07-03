import { FC } from 'react';
import { usePagination } from '@Wiki/components/EntriesPage/hooks/usePagination';
import styled from 'styled-components';
import { SButton } from '@Wiki/ui';

interface IProps {
  numberOfPages: number;
  pagesPerView: number;
  onPageChange(pageNumber: number): void;
}

export const PageButtons: FC<IProps> = ({
  numberOfPages,
  pagesPerView,
  onPageChange,
}) => {
  const {
    isFirstSetOfPages,
    isLastSetOfPages,
    goToPreviousSetOfPages,
    goToNextSetOfPages,
    currentSetOfPages,
  } = usePagination({ numberOfPages, pagesPerView });

  return (
    numberOfPages > 1 && (
      <SButtonsWrapper>
        {isFirstSetOfPages && (
          <SPageButton onClick={goToPreviousSetOfPages}>...</SPageButton>
        )}
        {currentSetOfPages.map((pageNumber) => (
          <SPageButton
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </SPageButton>
        ))}
        {isLastSetOfPages && (
          <SPageButton onClick={goToNextSetOfPages}>...</SPageButton>
        )}
      </SButtonsWrapper>
    )
  );
};

const SButtonsWrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 80px;
`;

const SPageButton = styled(SButton)`
  border: none;
  font-weight: bold;
  font-size: 20px;
  background-color: ${({ theme }) => theme.colors.accentDark};
`;
