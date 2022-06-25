import { useState } from 'react';

const useFetchData = <Data>(
  responseValidator: (data: unknown) => boolean,
): {
  pageData?: Data;
  loadPageData(url: string): Promise<void>;
  isLoading: boolean;
  fetchError?: string;
} => {
  const [pageData, setPageData] = useState<Data>();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string>();

  const isResponseValid = (data: unknown): data is Data =>
    responseValidator(data);

  const loadPageData = async (url: string): Promise<void> => {
    setIsLoading(true);
    try {
      const apiResponse = await fetch(url);

      const data = await apiResponse.json();

      if (isResponseValid(data)) {
        setPageData(data);
      } else {
        setFetchError('The server returned an invalid response.');
      }
    } catch {
      setFetchError('Problem fetching data. Please try again later.');
    }
    setIsLoading(false);
  };

  return { pageData, loadPageData, isLoading, fetchError };
};

export default useFetchData;
