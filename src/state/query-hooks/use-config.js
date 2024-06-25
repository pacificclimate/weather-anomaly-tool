import { useQuery } from "@tanstack/react-query";
import yaml from "js-yaml";
import filter from "lodash/fp/filter";
import isUndefined from "lodash/fp/isUndefined";

const defaultConfig = {
  // TBD
};

const requiredConfigKeys = [
  // Absolutely required values
  // TBD

  // Required values with defaults
  // TBD
];

const checkMissingKeys = (config) => {
  const missingRequiredKeys = filter(
    (key) => isUndefined(config[key]),
    requiredConfigKeys,
  );
  if (missingRequiredKeys.length > 0) {
    throw new Error(
      `Error in config.yaml: The following keys must have values, 
      but do not: ${missingRequiredKeys}`,
    );
  }
};


/**
 * Layer 1. Server fetch and config parsing.
 * @returns {Promise<object>}
 */
const fetchConfig = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/config.yaml`);
  const yamlConfig = await response.text();
  const fetchedConfig = yaml.load(yamlConfig);
  const config = { ...defaultConfig, ...fetchedConfig };

  checkMissingKeys(config);

  // Extend config with some env var values
  config.appVersion = process.env.REACT_APP_APP_VERSION ?? "unknown";

  return config;
};

const CONFIG_QUERY_KEY = ["config"];

export const configQuery = () => ({
  queryKey: CONFIG_QUERY_KEY,
  queryFn: fetchConfig,
  staleTime: Infinity, // config should rarely change while on the same version
});

/**
 * Layer 2. Query hook for the config. Generally this should not be used directly but via {@link useConfigContext}
 * @returns {object}
 */
export const useConfig = () => useQuery(configQuery());
