import { useEffect } from "react";
import { useConfig } from "../query-hooks/use-config";

/**
 * This hook runs after config is loaded, used once at the "App" component
 * level to ensure that defaults are applied. At present very little is or
 * needs to be done here.
 *
 * @returns {object} results from useConfig hook.
 */
export const useConfigDefaults = () => {
  const { data: config, isPending, isError } = useConfig();

  useEffect(() => {
    if (isPending || isError || !!config) {
      return;
    }

    // Set browser title
    document.title = config.title;
  }, [config]);

  // Set Zustand state defaults.
  // TBD when Zustand in use

  return { isPending, isError, data: config };
};

export default useConfigDefaults;
