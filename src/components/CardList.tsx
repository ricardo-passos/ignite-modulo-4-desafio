import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [selectedImgUrl, setSelectedImgUrl] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleViewImage(url: string) {
    setSelectedImgUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map(({ id, title, description, ts, url }) => (
          <Card
            key={id}
            data={{ title, description, url, ts }}
            viewImage={handleViewImage}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImgUrl}
      />
    </>
  );
}
