define(['controller/command/RequestPDFDataCommand'], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.PDFDataUtils' },
        {},
        {
            getPDFDataAsString: function (activeConfiguration, imageData, vehicleTotalPrice) {
                this.getPDF(this.buildJSONData(activeConfiguration, imageData, vehicleTotalPrice));
            },

            buildJSONData: function (activeConfiguration, imageData, vehicleTotalPrice) {
                var self = this,
                    language = bmc.support.GlobalConfig.getInstance().LANGUAGE,
                    today = new Date();
                today = today.toLocaleDateString();

                return {
                    documentFilename: this.processDocumentFileName(language.PDF.DOCUMENT_FILENAME,
                        activeConfiguration.vehicleId),
                    MACScode: '',
                    culture: bmc.support.GlobalConfig.getInstance().LOCALE_CODE.substring(0, 5),
                    modelSeries: activeConfiguration.vehicleId.toLowerCase(),
                    pdfDescription: this.processPrintDescription(language.PDF.PRINT_DESCRIPTION, language.model),
                    mscCode: activeConfiguration.baseVehicle.id,
                    price: bmc.support.StringUtils.formatPrice(vehicleTotalPrice),
                    dateContent: today,
                    bodystyleTitle: '',
                    seriesTitle: language.grade,
                    engineTitle: language.engine,
                    trimValue: activeConfiguration.trim.name,
                    accessoriesTitle: language.PDF.ACCESSORIES_TITLE,
                    accessoryCodes: self.getAccessoryIds(activeConfiguration),
                    optionPackCodes: self.getOptionPackIds(activeConfiguration),
                    exteriorImages: imageData.exterior,
                    interiorImages: imageData.interior,
                    languageFileUrl: self.removeURLExterneousPathData(window.location) +
                        urlExtractor.getResourcesUrl().replace(/^\.\//, '') + 'resources/locale/' +
                        bmc.support.GlobalConfig.getInstance().LOCALE_CODE + '/localeConfig.json'
                };
            },

            getAccessoryIds: function (activeConfiguration) {
                return _.pluck(activeConfiguration.getAccessoryVOs(), 'id');
            },

            getOptionPackIds: function (activeConfiguration) {
                return _.pluck(activeConfiguration.getOptionPackVOs(), 'id');
            },

            processDocumentFileName: function (filenameString, modelName) {
                return filenameString.replace('[modelName]', (modelName + '_'));
            },

            processPrintDescription: function (filenameString, model) {
                return filenameString.replace('[vehicle name]', model);
            },

            removeURLExterneousPathData: function (url) {
                url = String(url);
                url = (url.indexOf('/index.html') !== -1) ? url.split('/index.html').join('') : url;
                url = (url.indexOf('/#') !== -1) ? url.split('/#').join('') : url;
                url = (url.charAt(url.length) === '/') ? url.substring(0, url.length - 1) : url;
                url = (url.indexOf('?') !== -1) ? url.split('?')[0] : url;
                return url;
            },

            putLoadingOverlayToDefault: function () {
                document.getElementById('vehicleLoadIndicator').innerHTML =
                    bmc.support.GlobalConfig.getInstance().LANGUAGE.LOADING_IMAGE;
                jQuery('.' + bmc.support.HTMLAttributes.IMAGE_LOADING_CLASS).hide();
            },

            getPDF: function (jsonData) {
                var PlatformDetector = bmc.support.PlatformDetector,
                    self = this;

                if (PlatformDetector.isUserAgent(PlatformDetector.MSIE) ||
                    PlatformDetector.isUserAgent(PlatformDetector.IPAD)) {
                    window.open('http://195.59.157.73/ccpdsummarypdf/home/ie8?input=' +
                        escape(JSON.stringify(jsonData)));
                    self.putLoadingOverlayToDefault();
                }
                else {
                    jQuery.support.cors = true;
                    $.ajax({
                        type: 'post',
                        url: 'http://195.59.157.73/ccpdsummarypdf/api/SummaryPdf',
                        crossDomain: true,
                        data: {
                            'input': JSON.stringify(jsonData)
                        },
                        dataType: 'json',
                        statusCode: {
                            200: function (responseText) {
                                window.open(responseText);
                                self.putLoadingOverlayToDefault();
                            },
                            500: function () {
                                self.putLoadingOverlayToDefault();
                            }
                        }
                    });
                }
            }

        }
    );
});
