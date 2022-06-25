import charactersThumbnail from '../images/characters.webp';
import locationsThumbnail from '../images/locations.webp';
import episodesThumbnail from '../images/episodes.jpg';

export enum CategoryName {
  CHARACTERS = 'characters',
  LOCATIONS = 'locations',
  EPISODES = 'episodes',
}

export interface ICategory {
  name: CategoryName;
  url: string;
  image?: string;
}

export const categories: ICategory[] = [
  {
    name: CategoryName.CHARACTERS,
    url: 'https://rickandmortyapi.com/api/character',
    image: charactersThumbnail,
  },
  {
    name: CategoryName.LOCATIONS,
    url: 'https://rickandmortyapi.com/api/location',
    image: locationsThumbnail,
  },
  {
    name: CategoryName.EPISODES,
    url: 'https://rickandmortyapi.com/api/episode',
    image: episodesThumbnail,
  },
];
