import { FC } from 'react';

import usePagination from '../hooks/usePagination';

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
    <section>
      {isFirstSetOfPages && (
        <button onClick={goToPreviousSetOfPages}>...</button>
      )}
      {currentSetOfPages.map((pageNumber) => (
        <button key={pageNumber} onClick={() => onPageChange(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      {isLastSetOfPages && <button onClick={goToNextSetOfPages}>...</button>}
    </section>
  );
};
