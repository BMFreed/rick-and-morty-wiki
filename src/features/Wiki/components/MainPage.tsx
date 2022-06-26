import { FC } from 'react';
import { categories, CategoryName } from '../utils/categories';

interface IProps {
  onCategoryClick(name: CategoryName, url: string): void;
}

export const MainPage: FC<IProps> = ({ onCategoryClick }) => (
  <section>
    <h1>Choose category:</h1>
    <main>
      {categories.map(({ name, url, image }) => (
        <figure key={name} onClick={() => onCategoryClick(name, url)}>
          <img src={image} />
          <figcaption>{name}</figcaption>
        </figure>
      ))}
    </main>
  </section>
);