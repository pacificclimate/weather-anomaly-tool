import _ from 'lodash';


export function bindFunctions(obj, functionNames) {
    if (typeof functionNames === 'string') {
        functionNames = functionNames.split(/\s+/);
    }
    functionNames.forEach((name) => {
        obj[name] = obj[name].bind(obj);
    });
}


export function pick(obj, names) {
    if (typeof names === 'string') {
        names = names.split(/\s+/);
    }
    return _.pick(obj, names);
}


export function incrementMonth([year, month], by) {
    const monthsSinceEpoch = year * 12 + month - 1 + by;
    const incrYear = Math.floor(monthsSinceEpoch / 12);
    const incrMonth = monthsSinceEpoch % 12 + 1;
    return [incrYear, incrMonth];
}
