export default () => {
    return {
        restrict: 'E',
        scope: false,
        require: '?^^liveHtml',
        link: function($scope, $element, $attrs, liveHtmlCtrl) {

            // if <script> is child of live-html directive
            if(liveHtmlCtrl){

                // if <script src="..."></script>
                if($element[0].src){
                    liveHtmlCtrl.liveScript($element[0]);
                }
                
                // if <script>...</script>
                if($element[0].innerHTML){
                    liveHtmlCtrl.liveJs($element[0]);
                }

            }

        }
    };
};