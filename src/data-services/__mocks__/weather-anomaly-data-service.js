function getBaselineData() {
    return new Promise((resolve, reject) => {
       resolve({
           data: [],
       });
    });
}

const getMonthlyData = getBaselineData;

export { getBaselineData, getMonthlyData };