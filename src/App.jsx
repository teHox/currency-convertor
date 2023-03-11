import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
} from "react";
import { ConverterBody } from "./ConverterBody";
import { convertFromUsd } from "./helpers/currencyHelper";
import { useGetCurrency } from "./hooks/api/useGetCurrency";

import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const { isSuccess, isLoading, isError, res } = useGetCurrency();

  const onChangeFromPrice = (value) => {
    const result = convertFromUsd({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
      res,
      value,
    });
    setToPrice(result);
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result = convertFromUsd({ fromCurrency, toCurrency, res, value });
    setFromPrice(result);
    setToPrice(value);
  };

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    onChangeToPrice(1);
  }, [isSuccess]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const toUsd = useMemo(() => {
    if (!isSuccess) {
      return "";
    }
    return convertFromUsd({
      fromCurrency: "UAH",
      toCurrency: "USD",
      res,
      value: 1,
    });
  }, [isSuccess]);

  const toEur = useMemo(() => {
    if (!isSuccess) {
      return "";
    }
    return convertFromUsd({
      fromCurrency: "UAH",
      toCurrency: "EUR",
      res,
      value: 1,
    });
  }, [isSuccess]);

  return (
    <div className="App">
      {isSuccess && (
        <Fragment>
          <header className="header">
            <div className="header__wrapper">
              <div>USD = {toUsd} грн</div>
              <div>EUR = {toEur} грн</div>
            </div>
          </header>
          <div className="wrapper">
            <ConverterBody
              value={fromPrice}
              currency={fromCurrency}
              onChangeCurrency={setFromCurrency}
              onChangeValue={onChangeFromPrice}
            />
            <ConverterBody
              value={toPrice}
              currency={toCurrency}
              onChangeCurrency={setToCurrency}
              onChangeValue={onChangeToPrice}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default App;
