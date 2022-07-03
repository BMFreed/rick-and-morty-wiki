import { DispatchWithoutAction, FC } from 'react';
import styled from 'styled-components';
import { CategoryName } from '@Wiki/utils/categories';
import {
  ICharacterEntry,
  IEpisodeEntry,
  ILocationEntry,
  TEntry,
} from '@Wiki/types/entriesPageData';
import { SButton } from '@Wiki/ui';
import CloseIcon from '@common/icons/close.svg';

interface IProps {
  categoryName: CategoryName;
  data: TEntry;
  onClose: DispatchWithoutAction;
}

export const DetailedEntryPopup: FC<IProps> = ({
  categoryName,
  data,
  onClose,
}) => (
  <SPopupOverlay>
    <SPopupWrapper>
      <SCloseButton onClick={onClose}>
        <SCloseIcon />
      </SCloseButton>
      <PopupContent categoryName={categoryName} data={data} />
    </SPopupWrapper>
  </SPopupOverlay>
);

const PopupContent: FC<Omit<IProps, 'onClose'>> = ({ categoryName, data }) => {
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

const CharacterPopup: FC<{ data: ICharacterEntry }> = ({ data }) => {
  const { image, name, species, status, type, gender, origin, location } = data;

  return (
    <>
      <SImage src={image} />
      <SEntryHeading>{name}</SEntryHeading>
      <SList>
        <SEntryItem>
          <SEntryItemTitle>Species:</SEntryItemTitle>
          <div>{species}</div>
        </SEntryItem>
        {type && (
          <SEntryItem>
            <SEntryItemTitle>Type:</SEntryItemTitle>
            <div>{type}</div>
          </SEntryItem>
        )}
        <SEntryItem>
          <SEntryItemTitle>Gender:</SEntryItemTitle>
          <div>{gender}</div>
        </SEntryItem>
        <SEntryItem>
          <SEntryItemTitle>Status:</SEntryItemTitle>
          <div>{status}</div>
        </SEntryItem>
        <SEntryItem>
          <SEntryItemTitle>Original location:</SEntryItemTitle>
          <div>{origin.name}</div>
        </SEntryItem>
        <SEntryItem>
          <SEntryItemTitle>Last known location:</SEntryItemTitle>
          <div>{location.name}</div>
        </SEntryItem>
      </SList>
    </>
  );
};

const LocationPopup: FC<{ data: ILocationEntry }> = ({ data }) => {
  const { name, type, dimension } = data;

  return (
    <>
      <SEntryHeading>{name}</SEntryHeading>
      <SList>
        {type && (
          <SEntryItem>
            <div>Type:</div>
            <div>{type}</div>
          </SEntryItem>
        )}
        <SEntryItem>
          <SEntryItemTitle>Dimension:</SEntryItemTitle>
          <div>{dimension}</div>
        </SEntryItem>
      </SList>
    </>
  );
};

const EpisodePopup: FC<{ data: IEpisodeEntry }> = ({ data }) => {
  const { name, air_date: airDate, episode } = data;

  return (
    <>
      <SEntryHeading>{name}</SEntryHeading>
      <SList>
        <SEntryItem>
          <SEntryItemTitle>Aired on:</SEntryItemTitle>
          <div>{airDate}</div>
        </SEntryItem>
        <SEntryItem>
          <SEntryItemTitle>Episode code:</SEntryItemTitle>
          <div>{episode}</div>
        </SEntryItem>
      </SList>
    </>
  );
};

const SPopupWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 36px;
  border-radius: 4px;
  position: relative;
`;

const SPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(66 66 66 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SCloseButton = styled(SButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  padding: 0;
`;

const SCloseIcon = styled(CloseIcon)`
  fill: ${({ theme }) => theme.colors.text};
`;

const SImage = styled.img`
  border-radius: 6px;
  margin-bottom: 20px;
`;

const SList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SEntryHeading = styled.h2`
  margin-bottom: 16px;
`;

const SEntryItem = styled.li`
  display: flex;
  gap: 8px;
`;

const SEntryItemTitle = styled.div`
  font-weight: bold;
`;
