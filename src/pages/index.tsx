import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type ImageProps = {
  after: string;
  data: {
    title: string;
    description: string;
    id: string;
    ts: number;
    url: string;
  }[];
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      if (pageParam) {
        return (await api.get<ImageProps>(`/api/images?after=${pageParam}`))
          .data;
      }

      return (await api.get<ImageProps>('/api/images')).data;
    },
    {
      getNextPageParam: lastPageData => lastPageData.after,
    }
  );

  const formattedData = useMemo(
    () => data?.pages.flatMap(({ data }) => data),
    [data]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            isLoading={isFetchingNextPage}
            loadingText="Carregando..."
            onClick={() => fetchNextPage()}
            type="button"
          >
            Carregar mais...
          </Button>
        )}
      </Box>
    </>
  );
}
