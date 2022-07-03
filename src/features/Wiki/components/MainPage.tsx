import { FC } from 'react';
import { ICategory } from '@Wiki/utils/categories';
import styled, { css } from 'styled-components';
import { SPageWrapper, SHeading } from '@Wiki/ui';

interface IProps {
  categories: ICategory[];
  onCategoryClick(name: ICategory): void;
}

export const MainPage: FC<IProps> = ({ categories, onCategoryClick }) => (
  <SPageWrapper>
    <SHeading>Choose category:</SHeading>
    <SCategoriesWrapper>
      {categories.map((category) => (
        <SCategory
          key={category.name}
          onClick={() => onCategoryClick(category)}
        >
          <img src={category.image} />
          <SCategoryTitle>{category.name}</SCategoryTitle>
        </SCategory>
      ))}
    </SCategoriesWrapper>
  </SPageWrapper>
);

const SCategoriesWrapper = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  padding: 0 80px;
`;

const SCategory = styled.figure`
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  height: 500px;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const SCategoryTitle = styled.figcaption`
  ${({ theme }) => css`
    ${theme.fonts.heading.secondary};
    background-color: ${theme.colors.background};
  `};
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 15px 0 15px;
  border-radius: 6px;
`;
