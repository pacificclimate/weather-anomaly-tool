// Hook for managing selected date (year, month) for display.
// It is (a) a separate hook, and (b) in state/query-hooks because the initial value of date
// needs to be set from a query to the backend. This hook also encapsulates the complication
// associated with that.
// date always has a valid value, and setDate is always usable
// Initialized date is settled when !isLoading and !isError.

import { useMemo, useState } from "react";
import useLastDateWithMonthlyData, {
  latestPossibleDataDate,
} from "@/state/query-hooks/use-last-date-with-monthly-data";
import moment from "moment/moment";

const useDateState = () => {
  const [date, setDate] = useState(latestPossibleDataDate);

  const lastDates = ["precip", "tmax", "tmin"].map((variable) =>
    useLastDateWithMonthlyData(variable),
  );
  const isError = lastDates.some((query) => query.isError);
  const isLoading = lastDates.some((query) => query.isLoading);
  const lastDateWithMonthlyData = moment.max(
    lastDates.map((query) => query.data ?? moment.invalid()),
  );
  // Set to max latest date when all latest dates have loaded.
  // Never set if a latest date does not load or errors out.
  useMemo(() => {
    setDate(lastDateWithMonthlyData);
  }, [isLoading]);

  return { isLoading, isError, date, setDate };
};

export default useDateState;
