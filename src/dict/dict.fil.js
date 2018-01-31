export default (BarneyDict) => {
    return function(key) {
        return BarneyDict.get(key);
    };
};