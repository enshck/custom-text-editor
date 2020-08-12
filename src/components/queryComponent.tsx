import React, { useEffect, useState } from "react";

import { genQuery } from "../utils/handlers";
import Loading from "./loading";
import { useInterval } from "../cutomHooks/useInterval";
import { METRIC_ENDPOINT } from "../utils/constants";

interface IProps {
  refreshInterval_Secs: number;
  nameOfComponent: string;
}

const QueryComponent = ({ refreshInterval_Secs, nameOfComponent }: IProps) => {
  const [data, setData] = useState("");
  const [isFetching, setFetching] = useState(false);

  useInterval(() => {
    getQueryHandler();
  }, +`${refreshInterval_Secs}000`);

  useEffect(() => {
    getQueryHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getQueryHandler = () => {
    setFetching(true);
    setData(
      `'${genQuery(refreshInterval_Secs, nameOfComponent)}' request to ${
        process.env.REACT_APP_API
      }${METRIC_ENDPOINT}`
    );
    setFetching(false);
  };

  if (isFetching) {
    return <Loading />;
  }
  return <div>{data}</div>;
};

export default QueryComponent;
