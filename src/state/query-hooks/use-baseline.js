import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import urljoin from "url-join";
import { useConfigContext } from "../context-hooks/use-config-context";

export const BASELINE_QUERY_KEY = ["baseline"];

const getBaseline = async ({ config, variable, date }) => {
  const { data } = await axios(
    urljoin(
      config.backends.weatherAnomalyDataService,
      "baseline",
      `${variable};${date.month() + 1}`,
    ),
  );

  return data;
};

export const baselineQuery = (config, variable, date) => ({
  queryKey: [BASELINE_QUERY_KEY, variable, date.month()],
  queryFn: () => getBaseline({ config, variable, date }),
  enabled: !!config,
  staleTime: 86400000, // 24 hours
});

export const useBaseline = (variable, date) => {
  const config = useConfigContext();

  if (!variable || !date) {
    throw new Error("variable and date are required");
  }
  return useQuery(baselineQuery(config, variable, date));
};

export default useBaseline;
