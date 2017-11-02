import axios from 'axios';
import urljoin from 'url-join';

import logger from '../logger';

const WADS_URL = process.env.REACT_APP_WADS_URL;

function getBaselineData(variable, month) {
    logger.log(this, variable, month);
    return axios.get(urljoin(WADS_URL, 'baseline', `${variable};${month}`));
}

function getMonthlyData(variable, year, month) {
    logger.log(this, variable, year, month);
    // TODO: Change 'weather' to 'monthly' when WADS changes
    return axios.get(urljoin(WADS_URL, 'weather', `${variable};${year}-${month}`));
}


export { getBaselineData, getMonthlyData };
