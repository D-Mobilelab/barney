var BarneyHistory = new function(){

	var previousPath = null;
    var previousState = null;

    this.init = function(){
    	var _this = this;
    	window.addEventListener("hashchange", function(newurl, oldurl){
    		if(newurl !== oldurl){
                _this.previousPath = oldurl.substr(oldurl.indexOf('#!') + 2);
            }
    	}, false);
    };

    this.setPrevPath = function(path){
    	previousPath = path;
    };

    this.getPrevPath = function(){
        return previousPath;
    };

}