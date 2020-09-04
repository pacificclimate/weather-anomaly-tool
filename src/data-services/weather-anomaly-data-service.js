import axios from 'axios';
import urljoin from 'url-join';

import logger from '../logger';
import { incrementMonth } from '../components/utils';

const WADS_URL = process.env.REACT_APP_WADS_URL;


export function getBaselineData(variable, month) {
    logger.log(this, variable, month);
    return axios.get(urljoin(WADS_URL, 'baseline', `${variable};${month}`));
}


export function getMonthlyData(variable, year, month) {
    logger.log(this, variable, year, month);
    // TODO: Change 'weather' to 'monthly' when WADS changes
    return axios.get(urljoin(WADS_URL, 'weather', `${variable};${year}-${month}`));
}


export function getLastDateWithDataBefore(variable, [year, month]) {
    // Return a promise for a pair, `[year, month]` of values defining the
    // latest date with data coming before (or on) the specified year and month.
    // "With data" means that there is a non-zero number of results in the
    // data response. (A 404 is not returned for valid dates without data, just
    // an empty array of data.)
    return getMonthlyData(variable, year, month)
    .then(monthly => {
        if (monthly.data.length > 0) {
            return [year, month];
        }
        return getLastDateWithDataBefore(
          variable, incrementMonth([year, month], -1)
        );
    });
}
