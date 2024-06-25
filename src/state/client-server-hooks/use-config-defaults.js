import { useEffect } from "react";
import { useConfig } from "../query-hooks/use-config";

/**
 * This hook runs after config is loaded, used once at the "App" component level to ensure that
 * Defaults are applied
 * @returns {object} results from useConfig hook.
 */
export const useConfigDefaults = () => {
  const { data: config, isLoading, isError } = useConfig();

  useEffect(() => {
    if (isLoading || isError || !!config) {
      return;
    }

    // Set browser title
    document.title = config.title;
  }, [config]);

  // TBD: Set Zustand state defaults.

  return { isLoading, isError, data: config };
};

export default useConfigDefaults;
