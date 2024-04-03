define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.HTMLTemplate' },
        {},
        {
            getSynchronously: function (url) {
                var request,
                    fullUrl = urlExtractor.getResourcesUrl() + url,
                    template = this.getTemplateFromMemory(fullUrl),
                    responseStatus,
                    responseText;

                if (navigator.appName === 'Microsoft Internet Explorer') {
                    request = new window.ActiveXObject('MSXML2.XMLHTTP');
                }
                else {
                    request = new XMLHttpRequest();
                }

                if (template) {
                    responseStatus = 200;
                    responseText = template;
                } else {
                    request.open('GET', fullUrl, false);
                    request.send();
                }

                responseStatus = responseStatus || request.status;

                if (responseStatus === 200 || responseStatus === 0) {
                    responseText = responseText || request.responseText;

                    this.addTemplateToMemory(fullUrl, responseText);

                    return responseText;
                } else {
                    throw new Error('Failed to load template: ' + fullUrl);
                }
            },

            getTemplateFromMemory: function (url) {
                bmc.support.HTMLTemplate.templateMap = bmc.support.HTMLTemplate.templateMap || {};

                return bmc.support.HTMLTemplate.templateMap[url];
            },

            addTemplateToMemory: function (url, template) {
                bmc.support.HTMLTemplate.templateMap = bmc.support.HTMLTemplate.templateMap || {};

                bmc.support.HTMLTemplate.templateMap[url] = template;
            }
        }
    );
});
