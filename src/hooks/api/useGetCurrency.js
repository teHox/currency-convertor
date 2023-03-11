import { useEffect, useState } from "react";
import { getCurrency } from "../../services/exchangeApi";

export function useGetCurrency() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [res, setRes] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getCurrency()
      .then((res) => {
        setRes(res);
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isSuccess,
    isLoading,
    isError,
    res,
  };
}
