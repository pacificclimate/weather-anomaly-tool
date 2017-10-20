function bindFunctions(obj, functionNames) {
    if (typeof functionNames === 'string') {
        functionNames = functionNames.split(/\s+/);
    }
    functionNames.map((name) => {
        obj[name] = obj[name].bind(obj);
        return null;
    });
    return obj;
}

export { bindFunctions };