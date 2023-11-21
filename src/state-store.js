// This is the Zustand state store for the app.
//
// Comments:
// - The store knows a lot here, such as the structure of config and the names
//    and usages of the data services. OK? Too much dependency?


// Note: We use package `moment` for date arithmetic. It is excellent but it
// *mutates* its objects. We use functional components, which require values
// whose identity changes when their value is changed, i.e., a new object.
// Therefore, every change to a `moment` date object should be preceded by
// `.clone()`; for example, `y = x.clone().subtract(1, 'month')` yields a new
// moment object with a value 1 month before the `x` object. `x` is unchanged by
// this operation; `y` is a different object than `x`.


import { create } from 'zustand';
import moment from 'moment/moment';
import {
  getBaselineData,
  getLastDateWithDataBefore,
  getMonthlyData,
} from './data-services/weather-anomaly-data-service';
import axios from 'axios';
import yaml from 'js-yaml';
import filter from 'lodash/fp/filter';
import isUndefined from 'lodash/fp/isUndefined';



// Likely latest possible date of available data = current date - 15 d.
// This allows for cron jobs that run in first half of month.
// Subtract fewer/more days if cron jobs run earlier/later in month.
// But it is not guaranteed that there is data for this date; that can only be
// determined by consulting the backend.
export const latestPossibleDataDate = moment().subtract(15, 'days');


export const useStore = create((set, get) => ({
  // States
  config: null,
  configError: null,

  variable: null,  // config.ui.variableSelector.initial
  dataset: null,  // config.ui.datasetSelector.initial
  baseline: null,
  monthly: null,
  date: latestPossibleDataDate,  // TODO: Put subtraction value in config

  // Actions

  // Important: Wrap in useEffect
  // Load configuration
  // This should not be called except by initialize.
  _loadConfig: ({ dfault = {}, requiredKeys = [] }) => {
    return axios.get(`${process.env.PUBLIC_URL}/config.yaml`)
    .then(response => {
      // Extend default config with values loaded from config.yaml
      let config;
      try {
        const customConfig = yaml.load(response.data);
        config = { ...dfault, ...customConfig };
      } catch (error) {
        set({
          configError: (
            <div>Error parsing config.yaml: <pre>{error.toString()}</pre></div>
          )
        });
        throw error;
      }

      // Check for required config keys (we don't check value types, yet)
      const missingRequiredKeys = filter(
        key => isUndefined(config[key]), requiredKeys
      );
      if (missingRequiredKeys.length > 0) {
        const configErrorMsg = (
          `Error in config.yaml: The following keys must have values, 
          but do not: ${missingRequiredKeys}`
        );
        set({ configError: (<div>{configErrorMsg}</div>) });
        throw new Error(configErrorMsg);
      }

      // TODO: Is there really any value in this?
      //  Alternatively, just transfer everything in process.env here.
      //  None of that makes much sense ...
      // Extend config with some env var values
      config.appVersion = process.env.REACT_APP_APP_VERSION ?? "unknown";

      // Update the config state.
      set({ config });
    })
    .catch(error => {
      set({
        configError: (
          <div>Error fetching configuration: <pre>{error.toString()}</pre></div>
        )
      });
      throw error;
    });
  },

  isConfigLoaded: () => get().config !== null,

  // Important: Wrap in useEffect
  // Load config and initialize state.
  initialize: ({ configOpts = { dfault: {}, requiredKeys: [] } }) => {
    // TODO: This can probably be done more nicely with async/await.
    get()._loadConfig(configOpts).then(() => {
      // TODO: return config from _loadConfig as well as setting
      //  state.config. Would be neater.
      const config = get().config;
      const wadsUrl = config.backends.weatherAnomalyDataService;
      const variable = config.ui.variableSelector.initial;
      const dataset = config.ui.datasetSelector.initial;
      set({ variable, dataset });
      getLastDateWithDataBefore(variable, latestPossibleDataDate, wadsUrl)
      .then(date => {
        // Note: This will also fetch the data for this date (and variable).
        // We only want to do this once, so we don't call setVariable also.
        get().setDate(date);
      });
    });
  },

  hasValidState: () =>
    get().variable !== null
    && get().dataset !== null
    && get().date !== null,

  // Important: Wrap in useEffect
  // Set the variable and load the data associated with it.
  setVariable: (variable) => {
    set({ variable });
    get().getData();
  },

  setDataset: dataset => {
    set({ dataset });
  },

  // Important: Wrap in useEffect
  // Set the date and load the data associated with it.
  setDate: (date) => {
    set({ date });
    get().getData();
  },

  // Important: Wrap in useEffect
  // Fetch baseline and monthly data for current setting of variable and date.
  getData: () => {
    const wadsUrl = get().config.backends.weatherAnomalyDataService;
    set({ baseline: null, monthly: null });
    getBaselineData(get().variable, get().date, wadsUrl)
    .then(r => {
      set({ baseline: r.data });
    });
    getMonthlyData(get().variable, get().date, wadsUrl)
    .then(r => {
      set({ monthly: r.data });
    });
  },

  isDataLoading: () => get().baseline === null || get().monthly === null,

  isBaselineDataset: () => get().dataset === 'baseline',
  
  setYear: year => {
    get().setDate(get().date.clone().year(year));
  },

  incrementYear: by => {
    get().setDate(get().date.clone().add(by, 'year'));
  },

  setMonth: month => {
    get().setDate(get().date.clone().month(month));
  },

  incrementMonth: by => {
    get().setDate(get().date.clone().add(by, 'month'));
  },

  setBaseline: baseline => set({ baseline }),
}))