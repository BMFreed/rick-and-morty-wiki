import { useState } from 'react';

const useFetchData = <Data>(
  responseValidator: (data: unknown) => boolean,
): {
  data?: Data;
  loadData(url: string): Promise<void>;
  isLoading: boolean;
  fetchError?: string;
} => {
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string>();

  const isResponseValid = (parsedData: unknown): parsedData is Data =>
    responseValidator(parsedData);

  const loadData = async (url: string): Promise<void> => {
    setIsLoading(true);
    try {
      const apiResponse = await fetch(url);

      const parsedData = await apiResponse.json();

      if (isResponseValid(parsedData)) {
        setData(parsedData);
      } else {
        setFetchError('The server returned an invalid response.');
      }
    } catch {
      setFetchError('Problem fetching data. Please try again later.');
    }
    setIsLoading(false);
  };

  return { data, loadData, isLoading, fetchError };
};

export default useFetchData;
