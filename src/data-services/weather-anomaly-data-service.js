import axios from 'axios';
import urljoin from 'url-join';


export function getBaselineData(variable, date, url) {
  // logger.log(this, variable, date.format());
  return axios.get(
    urljoin(url, 'baseline', `${variable};${date.month() + 1}`)
  );
}


export function getMonthlyData(variable, date, url) {
  // logger.log(this, variable, date.format());
  // TODO: Change 'weather' to 'monthly' when WADS changes
  return axios.get(
    urljoin(url, 'weather', `${variable};${date.year()}-${date.month() + 1}`)
  );
}


export function getLastDateWithDataBefore(variable, date, url) {
  // Return a promise for the latest date with data coming before (or on) the
  // specified year and month. "With data" means that there is a non-zero
  // number of results in the data response. (A 404 is not returned for valid
  // dates without data, just an empty array of data.)
  // Does not mutate `date`.
  return getMonthlyData(variable, date, url)
  .then(monthly => {
    if (monthly.data.length > 0) {
      return date;
    }
    return getLastDateWithDataBefore(
      variable, date.clone().subtract(1, 'month'), url
    );
  });
}
