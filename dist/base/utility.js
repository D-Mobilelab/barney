if(!barney) { var barney = {}; }
barney.Utility = new function(){

    this.arrayDiff = function(first, second){
        return first.filter(function(i) {
            return second.indexOf(i) < 0;
        });
    };

    this.mediaMatcher = function(mediaquery, callback){
        var isMatchMediaSupported = !!(window && window.matchMedia);
        if(typeof mediaquery === 'string' && typeof callback === 'function' && isMatchMediaSupported ){
            var mql = window.matchMedia(mediaquery);
            callback(mql);
            mql.addListener(callback); 
        }
    };

};
