bmc.support.UrlExtractor = (function () {
    'use strict';

    function UrlExtractor(dictionary) {
        this.dictionary = dictionary;
        this.urlString = window.location.search;
    }

    UrlExtractor.LOCALE = 'locale';
    UrlExtractor.VEHICLE = 'vehicle';
    UrlExtractor.BASE_URL = 'baseUrl';
    UrlExtractor.DEFAULT_VEHICLE = 'M3';
    UrlExtractor.DRIVETYPE = 'driveType';
    UrlExtractor.DEFAULT_LOCALE = 'en-gb';
    UrlExtractor.BODY_STYLE = 'bodyStyle';
    UrlExtractor.DEFAULT_SCRIPTS_DIR = 'scripts';
    UrlExtractor.CONFIGURATION = 'savedConfigId';
    UrlExtractor.DEFAULT_BASE_URL = './' + UrlExtractor.DEFAULT_SCRIPTS_DIR;

    UrlExtractor.prototype.getLocale = function () {
        var localeValue = this.normaliseLocaleData(this.getValue(this.constructor.LOCALE));

        if (this.dictionary[localeValue]) {
            return localeValue;
        } else {
            return this.constructor.DEFAULT_LOCALE;
        }
    };

    UrlExtractor.prototype.getVehicle = function () {
        return this.getValue(this.constructor.VEHICLE) || this.constructor.DEFAULT_VEHICLE;
    };

    UrlExtractor.prototype.getBaseUrl = function () {
        return this.getValue(this.constructor.BASE_URL) || this.constructor.DEFAULT_BASE_URL;
    };

    UrlExtractor.prototype.getResourcesUrl = function () {
        return this.getBaseUrl().replace(this.constructor.DEFAULT_SCRIPTS_DIR, '');
    };

    UrlExtractor.prototype.getBodyStyle = function () {
        return this.getValue(this.constructor.BODY_STYLE);
    };

    UrlExtractor.prototype.getConfiguration = function () {
        return this.getValue(this.constructor.CONFIGURATION);
    };

    UrlExtractor.prototype.getDriveType = function () {
        return this.getValue(this.constructor.DRIVETYPE);
    };

    UrlExtractor.prototype.getValue = function (name) {
        var regex, results;

        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

        regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        results = regex.exec(this.urlString);

        return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    UrlExtractor.prototype.normaliseLocaleData = function (locale) {
        if (locale) {
            var hyphenSpacing = 2,
                stringToLowerCase = locale.toLowerCase(),
                stringLength;

            stringToLowerCase = stringToLowerCase.replace(/[_\-]/g, '');
            stringLength = stringToLowerCase.length - hyphenSpacing;

            while (stringLength > 0) {
                stringToLowerCase = stringToLowerCase.splice(stringLength, 0, '-');
                stringLength -= hyphenSpacing;
            }

            return stringToLowerCase;
        }

        return locale;
    };

    return UrlExtractor;
}());
