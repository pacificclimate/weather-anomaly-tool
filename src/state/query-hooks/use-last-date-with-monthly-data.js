// React Query hook that returns the latest date for which there is data for
// a given variable. The returned { data } item is a moment.js value whose year
// and month are the latest year and month for which a non-zero number of data items
// are returned. Day, hour, etc. are not meaningful and can take on any valid values.

import { useQuery } from "@tanstack/react-query";
import { useConfigContext } from "../context-hooks/use-config-context";
import { getMonthly } from "@/state/query-hooks/use-monthly";
import moment from "moment";

export const LAST_DATE_QUERY_KEY = ["last-date-with-monthly-data"];

export const latestPossibleDataDate = moment().subtract(15, "days");

const getLastDateWithMonthlyDataBefore = async ({ config, variable, date }) => {
  const data = await getMonthly({ config, variable, date });
  if (data && data.length > 0) {
    return date;
  }
  const prior = await getLastDateWithMonthlyDataBefore({
    config,
    variable,
    date: date.clone().subtract(1, "month"),
  });
  return prior;
};

export const getLastDateQuery = (config, variable, date) => ({
  queryKey: [LAST_DATE_QUERY_KEY, variable, date.year(), date.month()],
  queryFn: () => getLastDateWithMonthlyDataBefore({ config, variable, date }),
  enabled: !!config,
});

export const useLastDateWithMonthlyData = (
  variable,
  date = latestPossibleDataDate,
) => {
  const config = useConfigContext();

  if (!variable || !date) {
    throw new Error("variable and date are required");
  }
  return useQuery(getLastDateQuery(config, variable, date));
};

export default useLastDateWithMonthlyData;
