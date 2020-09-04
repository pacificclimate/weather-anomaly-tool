export function getBaselineData() {
  return Promise.resolve({
    data: [],
  });
}

export const getMonthlyData = getBaselineData;

export function getLastDateWithDataBefore() {
  return Promise.resolve([2020, 1]);
}
