define([
    'model/proxy/ActiveConfigurationProxy',
    'support/PDFDataUtils',
    'support/UrlBuilder',
    'model/proxy/PriceCalculationProxy'
],

    function () {
        'use strict';
        var ActiveConfigurationProxy = arguments[0],
            PDFDataUtils = arguments[1],
            UrlBuilder = arguments[2],
            PriceCalculationProxy = arguments[3];

        return puremvc.define({
                name: 'bmc.controller.command.RequestPDFDataCommand',
                parent: puremvc.SimpleCommand
            },
            {
                execute: function () {

                    var activeConfigurationProxy = this.getFacade().retrieveProxy(ActiveConfigurationProxy.NAME),
                        simpleConfig = activeConfigurationProxy.getSimplified(),
                        vehicleTotalPrice = this.facade.retrieveProxy(PriceCalculationProxy.NAME).calculate(
                            simpleConfig),
                        interiorImageArray = this.buildInteriorImagesArray(UrlBuilder.getTrimImageURL(simpleConfig)),
                        exteriorImageArray = this.buildExteriorImagesArray(
                            UrlBuilder.getInitialFrameBaseImageURL(simpleConfig),
                            UrlBuilder.getInitialFrameWheelImageURL(simpleConfig)
                        ),

                        accessoryImages =
                            this.getAccessoryImagesURL(activeConfigurationProxy.getAccessoryVOs(), simpleConfig),

                        imageData = {
                            interior: interiorImageArray,
                            exterior: exteriorImageArray.concat(accessoryImages)
                        };

                    PDFDataUtils.getPDFDataAsString(activeConfigurationProxy, imageData, vehicleTotalPrice);

                    this.trackNavigationChange(simpleConfig);
                },

                getAccessoryImagesURL: function (accessoryVOs, simpleConfig) {

                    var self = this,
                        imageURL,
                        accessoryImageURLS = [];

                    _.each(accessoryVOs, function (accessoryVO) {

                        imageURL =
                            UrlBuilder.getInitialFrameAccessoryImageURL(accessoryVO, simpleConfig);

                        if (imageURL !== null) {

                            imageURL = self.removeExtraneousPathData(imageURL);
                            imageURL =
                                self.removeURLExterneousPathData(window.location) + imageURL;
                            accessoryImageURLS.push(imageURL);
                        }
                    });

                    return accessoryImageURLS;
                },

                buildInteriorImagesArray: function (interiorImage) {
                    return [this.removeURLExterneousPathData(window.location) +
                        this.removeURLExterneousPathData(interiorImage)];
                },

                buildExteriorImagesArray: function (baseImage, wheelImage) {
                    var outputArray = [],
                        baseImagePath = this.removeExtraneousPathData(baseImage),
                        wheelImagePath = this.removeExtraneousPathData(wheelImage);

                    outputArray.push(this.removeURLExterneousPathData(window.location) + baseImagePath);
                    outputArray.push(this.removeURLExterneousPathData(window.location) + wheelImagePath);

                    return outputArray;
                },

                removeExtraneousPathData: function (path) {
                    return (path.indexOf('./') !== -1) ? path.replace(/^\.\//, '') : path;
                },

                removeURLExterneousPathData: function (url) {
                    url = String(url);
                    url = (url.indexOf('/index.html') !== -1) ? url.split('/index.html').join('') : url;
                    url = (url.indexOf('/#') !== -1) ? url.split('/#').join('') : url;
                    url = (url.charAt(url.length) === '/') ? url.substring(0, url.length - 1) : url;
                    url = (url.indexOf('?') !== -1) ? url.split('?')[0] : url;
                    url = (url.indexOf('./') !== -1) ? url.replace(/^\.\//, '') : url;
                    return url;
                },

                trackNavigationChange: function (simpleConfig) {
                    burrows.app.tracking.trackPdfDownload(simpleConfig);
                }
            }
        );
    }
);