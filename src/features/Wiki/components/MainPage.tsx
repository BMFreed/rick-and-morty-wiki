import { FC } from 'react';
import { ICategory } from '../utils/categories';

interface IProps {
  categories: ICategory[];
  onCategoryClick(name: ICategory): void;
}

export const MainPage: FC<IProps> = ({ categories, onCategoryClick }) => (
  <section>
    <h1>Choose category:</h1>
    <main>
      {categories.map((category) => (
        <figure key={category.name} onClick={() => onCategoryClick(category)}>
          <img src={category.image} />
          <figcaption>{category.name}</figcaption>
        </figure>
      ))}
    </main>
  </section>
);
