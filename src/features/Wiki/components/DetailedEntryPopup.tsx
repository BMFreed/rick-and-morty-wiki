import { DispatchWithoutAction, FC } from 'react';
import styled from 'styled-components';
import { CategoryName } from '../utils/categories';
import {
  ICharacterEntry,
  IEpisodeEntry,
  ILocationEntry,
  TEntry,
} from '../types/entriesPageData';

interface IProps {
  categoryName: CategoryName;
  data: TEntry;
  onClose: DispatchWithoutAction;
}

const CharacterPopup: FC<{ data: ICharacterEntry }> = ({ data }) => {
  const { image, name, species, status, type, gender, origin, location } = data;

  return (
    <SPopupWrapper>
      <img src={image} />
      <h2>{name}</h2>
      <ul>
        <li>
          <div>Species:</div>
          <div>{species}</div>
        </li>
        {type && (
          <li>
            <div>Type:</div>
            <div>{type}</div>
          </li>
        )}
        <li>
          <div>Gender:</div>
          <div>{gender}</div>
        </li>
        <li>
          <div>Status:</div>
          <div>{status}</div>
        </li>
        <li>
          <div>Original location:</div>
          <div>{origin.name}</div>
        </li>
        <li>
          <div>Last known location:</div>
          <div>{location.name}</div>
        </li>
      </ul>
    </SPopupWrapper>
  );
};

const LocationPopup: FC<{ data: ILocationEntry }> = ({ data }) => {
  const { name, type, dimension } = data;

  return (
    <SPopupWrapper>
      <h2>{name}</h2>
      <ul>
        {type && (
          <li>
            <div>Type:</div>
            <div>{type}</div>
          </li>
        )}
        <li>
          <div>Dimension:</div>
          <div>{dimension}</div>
        </li>
      </ul>
    </SPopupWrapper>
  );
};

const EpisodePopup: FC<{ data: IEpisodeEntry }> = ({ data }) => {
  const { name, air_date: airDate, episode } = data;

  return (
    <SPopupWrapper>
      <h2>{name}</h2>
      <ul>
        <li>
          <div>Aired on:</div>
          <div>{airDate}</div>
        </li>
        <li>
          <div>Episode code:</div>
          <div>{episode}</div>
        </li>
      </ul>
    </SPopupWrapper>
  );
};

export const DetailedEntryPopup: FC<IProps> = ({ categoryName, data }) => {
  switch (categoryName) {
    case CategoryName.CHARACTERS:
      return <CharacterPopup data={data as ICharacterEntry} />;
    case CategoryName.LOCATIONS:
      return <LocationPopup data={data as ILocationEntry} />;
    case CategoryName.EPISODES:
      return <EpisodePopup data={data as IEpisodeEntry} />;
    default:
      return null;
  }
};

const SPopupWrapper = styled.section`
  position: absolute;
  background-color: white;
`;
