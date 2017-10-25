import axios from 'axios';
import urljoin from 'url-join';

const WADS_URL = process.env.REACT_APP_WADS_URL;

function getBaselineData(variable, month) {
    console.log('getBaselineData', variable, month);
    return axios.get(urljoin(WADS_URL, 'baseline', `${variable};${month}`));
}

function getMonthlyData(variable, year, month) {
    console.log('getMonthlyData', variable, year, month);
    // TODO: Change 'weather' to 'monthly' when WADS changes
    return axios.get(urljoin(WADS_URL, 'weather', `${variable};${year}-${month}`));
}


export { getBaselineData, getMonthlyData };
