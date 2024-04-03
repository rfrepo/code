define([], function () {
    'use strict';
    return puremvc.define({
            name: 'bmc.support.services.LoadDataService',
            constructor: function (pathToLoad) {
                this.pathToLoad = pathToLoad;
            }
        },
        {
            setOnCompleteHandler: function (callback) {
                this.callback = callback;
            },

            load: function () {
                var self = this;

                jQuery.getJSON(urlExtractor.getResourcesUrl() + this.pathToLoad,
                    function (result) {
                        if (self.callback) {
                            self.callback(result);
                        }
                    }
                );
            }
        },
        {
            NAME: 'LoadDataService'
        }
    );
});