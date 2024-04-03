bmc.support.GlobalConfig = (function () {
    'use strict';

    function GlobalConfig() {}

    GlobalConfig.getInstance = function () {
        if (!this.instance) {
            this.instance = new bmc.support.GlobalConfig();
        }

        return this.instance;
    };

    GlobalConfig.prototype.applyLocaleData = function (isoCountryCode) {
        var url = 'resources/locale/' + isoCountryCode + '/localeConfig.json',
            loader = new bmc.support.services.LoadSyncDataService(url),
            localInstance = bmc.support.GlobalConfig.getInstance();

        this.locale = isoCountryCode;
        this.globalConstants = bmc.support.GlobalConstants;

        this.processData(loader.load());

        delete localInstance.applyLocaleData;

        if (this.onReady) {
            this.onReady();
        }
    };

    GlobalConfig.prototype.processData = function (rawData) {
        var property,
            localInstance = bmc.support.GlobalConfig.getInstance();

        for (property in rawData) {
            if (rawData.hasOwnProperty(property) && rawData) {
                localInstance[property] = rawData[property];
            }
        }
    };

    GlobalConfig.prototype.getGlobalConstants = function () {
        return this.globalConstants;
    };

    GlobalConfig.prototype.getLocale = function () {
        return this.locale;
    };

    GlobalConfig.prototype.getVehicleId = function () {
        return this.vehicleId;
    };

    GlobalConfig.prototype.setVehicleId = function (value) {
        this.vehicleId = value;
    };

    GlobalConfig.prototype.getConfigurationId = function () {
        return this.configurationId;
    };

    GlobalConfig.prototype.setConfigurationId = function (value) {
        this.configurationId = value;
    };

    GlobalConfig.prototype.getBodyStyleId = function () {
        return this.bodyStyleId;
    };

    GlobalConfig.prototype.setBodyStyleId = function (value) {
        this.bodyStyleId = value;
    };

    GlobalConfig.prototype.getBodyStyleVO = function () {
        return this.bodyStyleVO;
    };

    GlobalConfig.prototype.setBodyStyleVO = function (value) {
        this.bodyStyleVO = value;
    };

    GlobalConfig.prototype.getDriveType = function () {
        return this.driveType;
    };

    GlobalConfig.prototype.setDriveType = function (value) {
        this.driveType = value;
    };

    return GlobalConfig;

}());
