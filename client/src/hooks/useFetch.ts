import {
  useEffect, useState,
} from 'react';

function useFetch<T>(
  promise: () => Promise<any>,
  onSuccess: (values: T) => void,
  onError: (error: Error)=>void,
  eject = true,
) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (eject) {
      setLoading(true);
      promise()
        .then((resp) => {
          onSuccess(resp.data);
          setLoading(false);
        })
        .catch((error) => {
          onError(error);
          setLoading(false);
        });
    }
  }, []);

  return { loading };
}

export default useFetch;
