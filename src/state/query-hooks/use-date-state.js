// Hook for managing selected date (year, month) for display.
// It is (a) a separate hook, and (b) in state/query-hooks because the initial value of date
// needs to be set from a query to the backend. This hook also encapsulates the complication
// associated with that.
// date always has a valid value, and setDate is always usable
// Initialized date is settled when !isPending and !isError.
// Note we don't return the full set of useQuery returns, just a roll-up
// of isPending, isError, and the maximum (latest) date.

import { useMemo, useState } from "react";
import useLastDateWithMonthlyData, {
  latestPossibleDataDate,
} from "@/state/query-hooks/use-last-date-with-monthly-data";
import moment from "moment/moment";
import flow from "lodash/fp/flow";
import compact from "lodash/fp/compact";
import map from "lodash/fp/map";

const useDateState = () => {
  const [date, setDate] = useState(latestPossibleDataDate);

  const lastDates = ["precip", "tmax", "tmin"].map((variable) =>
    useLastDateWithMonthlyData(variable),
  );
  const isError = lastDates.some((query) => query.isError);
  const isPending = lastDates.some((query) => query.isPending);
  const lastDateWithMonthlyData = flow(
    map("data"),
    compact,
    moment.max,
  )(lastDates);
  // Set to max latest date when all latest dates have loaded.
  // Never set if latest date does not load or errors out.
  useMemo(() => {
    if (!isError) {
      setDate(lastDateWithMonthlyData);
    }
  }, [isPending]);

  return { isPending, isError, lastDateWithMonthlyData, date, setDate };
};

export default useDateState;
