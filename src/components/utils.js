import _ from 'lodash';


function bindFunctions(obj, functionNames) {
    if (typeof functionNames === 'string') {
        functionNames = functionNames.split(/\s+/);
    }
    functionNames.forEach((name) => {
        obj[name] = obj[name].bind(obj);
    });
}

function pick(obj, names) {
    if (typeof names === 'string') {
        names = names.split(/\s+/);
    }
    return _.pick(obj, names);
}

export { bindFunctions, pick };