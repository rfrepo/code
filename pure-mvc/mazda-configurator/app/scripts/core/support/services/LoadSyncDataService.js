bmc.support.services.LoadSyncDataService = (function () {

    'use strict';

    function LoadSyncDataService(pathToLoad) {
        this.pathToLoad = pathToLoad;
    }

    LoadSyncDataService.prototype.load = function () {
        var request;

        if (navigator.appName === 'Microsoft Internet Explorer') {
            request = new window.ActiveXObject('MSXML2.XMLHTTP');
        }
        else {
            request = new XMLHttpRequest();
        }

        request.open('GET', urlExtractor.getResourcesUrl() + this.pathToLoad, false);
        request.send();

        if (request.status === 200 || request.status === 0) {
            return JSON.parse(request.responseText);
        } else {
            throw new Error('Failed to load file');
        }
    };

    return LoadSyncDataService;

}());