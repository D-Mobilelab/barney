export default (BarneyConfig) => {
    return function(input) {
        return BarneyConfig.get(input);
    };
};