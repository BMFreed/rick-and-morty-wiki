import charactersThumbnail from '../images/characters.webp';
import locationsThumbnail from '../images/locations.webp';
import episodesThumbnail from '../images/episodes.jpg';

export interface ICategory {
  name: string;
  url: string;
  image?: string;
}

export const categories: ICategory[] = [
  {
    name: 'characters',
    url: 'https://rickandmortyapi.com/api/character',
    image: charactersThumbnail,
  },
  {
    name: 'locations',
    url: 'https://rickandmortyapi.com/api/location',
    image: locationsThumbnail,
  },
  {
    name: 'episodes',
    url: 'https://rickandmortyapi.com/api/episode',
    image: episodesThumbnail,
  },
];
