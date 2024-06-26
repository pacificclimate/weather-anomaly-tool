import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import urljoin from "url-join";
import { useConfigContext } from "../context-hooks/use-config-context";

export const MONTHLY_QUERY_KEY = ["monthly"];

export const getMonthly = async ({ config, variable, date }) => {
  const { data } = await axios(
    urljoin(
      config.backends.weatherAnomalyDataService,
      "weather",  // This is not a very good name, but it's in the backend
      `${variable};${date.year()}-${date.month() + 1}`,
    ),
  );

  return data;
};

export const monthlyQuery = (config, variable, date) => ({
  queryKey: [MONTHLY_QUERY_KEY, variable, date.year(), date.month()],
  queryFn: () => getMonthly({ config, variable, date }),
  enabled: !!config,
  staleTime: 86400000, // 24 hours
});

export const useMonthly = (variable, date) => {
  const config = useConfigContext();

  if (!variable || !date) {
    throw new Error("variable and date are required");
  }
  return useQuery(monthlyQuery(config, variable, date));
};

export default useMonthly;
