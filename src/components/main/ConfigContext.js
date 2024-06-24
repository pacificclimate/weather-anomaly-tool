// This module provides a React context for app configuration values,
// a hook for fetching its value from a YAML file in the public folder ,
// and a hook for using the context value in a functional component.
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import yaml from "js-yaml";
import filter from "lodash/fp/filter";
import isUndefined from "lodash/fp/isUndefined";

// The context
const ConfigContext = React.createContext({});
export default ConfigContext;

// Custom hook for fetching configuration from public/config.yaml.
// This hook returns two state variables, `[config, errorMessage]`.
//
// If the configuration file is successfully fetched, parsed as YAML, and
// the resulting configuration object contains all required keys, the `config`
// state variable is set to that value and `errorMessage` remains null.
//
// If not (i.e., there are errors), `config` remains null and `errorMessage`
// is set to an appropriate message (which may be a string or a React object).
//
// This hook should be used only by the top-level component, and the returned
// `config` used to set the value provided by `ConfigContext.Provider`. (For
// specific usage, see component `App`.) All other components should access
// app configuration using the hook `useConfigContext`.
export function useFetchConfigContext({
  defaultConfig = {},
  requiredConfigKeys = [],
}) {
  const [config, setConfig] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/config.yaml`)
      .then((response) => {
        // Extend default config with values loaded from config.yaml
        let cfg;
        try {
          const customConfig = yaml.load(response.data);
          cfg = { ...defaultConfig, ...customConfig };
        } catch (e) {
          setErrorMsg(
            <div>
              Error loading config.yaml: <pre>{e.toString()}</pre>
            </div>,
          );
          return;
        }

        // Check for required config keys (we don't check value types, yet)
        const missingRequiredKeys = filter(
          (key) => isUndefined(cfg[key]),
          requiredConfigKeys,
        );
        if (missingRequiredKeys.length > 0) {
          setErrorMsg(
            `Error in config.yaml: The following keys must have values, 
            but do not: ${missingRequiredKeys}`,
          );
          return;
        }

        // TODO: Is there really any value in this?
        //  Alternatively, just transfer everything in process.env here.
        //  None of that makes much sense ...
        // Extend config with some env var values
        cfg.appVersion = process.env.REACT_APP_APP_VERSION ?? "unknown";

        // Update the config state.
        setConfig(cfg);
      })
      .catch((error) => {
        setErrorMsg(
          <div>
            Error fetching configuration: <pre>{error.toString()}</pre>
          </div>,
        );
      });
  }, []);

  return [config, errorMsg];
}

// Custom hook to make it slightly simpler to access the config context from a
// client component.
export function useConfigContext() {
  return useContext(ConfigContext);
}
