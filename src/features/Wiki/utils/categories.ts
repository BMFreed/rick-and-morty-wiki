import charactersThumbnail from '@Wiki/images/characters.jpg';
import locationsThumbnail from '@Wiki/images/locations.jpg';
import episodesThumbnail from '@Wiki/images/episodes.jpg';

export enum CategoryName {
  CHARACTERS = 'characters',
  LOCATIONS = 'locations',
  EPISODES = 'episodes',
}
interface IBaseFilter {
  name: string;
}

interface IFilterWithPresetConditions extends IBaseFilter {
  name: string;
  conditions: string[];
}

export type TFilter = IFilterWithPresetConditions | IBaseFilter;

export interface ICategory {
  name: CategoryName;
  url: string;
  image?: string;
  filters: TFilter[];
}

export const categories: ICategory[] = [
  {
    name: CategoryName.CHARACTERS,
    url: 'https://rickandmortyapi.com/api/character',
    image: charactersThumbnail,
    filters: [
      { name: 'name' },
      { name: 'species' },
      { name: 'type' },
      { name: 'status', conditions: ['alive', 'dead', 'unknown'] },
      {
        name: 'gender',
        conditions: ['female', 'male', 'genderless', 'unknown'],
      },
    ],
  },
  {
    name: CategoryName.LOCATIONS,
    url: 'https://rickandmortyapi.com/api/location',
    image: locationsThumbnail,
    filters: [{ name: 'name' }, { name: 'type' }, { name: 'dimension' }],
  },
  {
    name: CategoryName.EPISODES,
    url: 'https://rickandmortyapi.com/api/episode',
    image: episodesThumbnail,
    filters: [{ name: 'name' }, { name: 'episode' }],
  },
];
