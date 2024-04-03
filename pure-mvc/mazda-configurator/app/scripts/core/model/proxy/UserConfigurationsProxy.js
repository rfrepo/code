define([
    'support/Cookie',
    'support/NotificationNames',
    'support/ConfigurableType',
    'support/CanvasCapture',
    'model/vo/SimpleConfigurationVO',
    'model/vo/data/ConfigurableItemVO',
    'model/vo/data/BaseVehicleVO'
], function () {
    'use strict';
    var Cookie = arguments[0],
        NotificationNames = arguments[1],
        ConfigurableType = arguments[2],
        CanvasCapture = arguments[3],
        SimpleConfigurationVO = arguments[4],
        ConfigurableItemVO = arguments[5],
        BaseVehicleVO = arguments[6];


    return puremvc.define({
            name: 'bmc.model.proxy.UserConfigurationsProxy',
            parent: puremvc.Proxy,

            constructor: function () {
                puremvc.Proxy.call(this, bmc.model.proxy.UserConfigurationsProxy.NAME);
            }
        },
        {
            load: function () {
                var self = this;

                self.sendNotification(
                    NotificationNames.USER_CONFIGURATIONS_CHANGED,
                    self.getAll()
                );
            },

            getAt: function (index) {
                var self = this,
                    configurations = self.getAll(),
                    configuration = configurations[index];

                if (configuration) {
                    return configuration;
                } else {
                    return null;
                }
            },

            getById: function (id) {
                var self = this,
                    configurations = self.getAll(),
                    configuration,
                    numberOfConfigurations = configurations.length;

                while (numberOfConfigurations--) {
                    configuration = configurations[numberOfConfigurations];

                    if (configuration.getId() === id) {
                        return configuration;
                    }
                }

                return null;
            },

            getConfigurationIndex: function (id, configurations) {
                var configuration,
                    numberOfConfigurations = configurations.length;

                while (numberOfConfigurations--) {
                    configuration = configurations[numberOfConfigurations];

                    if (configuration.id === id) {
                        return numberOfConfigurations;
                    }
                }

                return -1;
            },

            getAll: function () {
                var self = this,
                    rawConfigurations = self.getRawConfigurations() || [],
                    i,
                    numberOfConfigurations = rawConfigurations.length,
                    configurations = [];

                for (i = 0; i < numberOfConfigurations; i++) {
                    configurations.push(self.convertToSimpleConfiguration(rawConfigurations[i]));
                }

                configurations = self.getCleansedConfigurations(configurations);

                return configurations;
            },

            getRawConfigurations: function () {
                var configs = JSON.parse(Cookie.getItem(bmc.model.proxy.UserConfigurationsProxy.KEY)) || [];

                return configs.slice();
            },

            save: function (simpleConfigurationVO) {
                var self = this,
                    configurations =
                        self.getNewConfigurationToArray(simpleConfigurationVO);

                Cookie.setItem(
                    bmc.model.proxy.UserConfigurationsProxy.KEY,
                    JSON.stringify(configurations)
                );

                self.sendNotification(
                    NotificationNames.USER_CONFIGURATIONS_CHANGED,
                    self.getAll()
                );
            },

            convertToJSON: function (simpleConfigurationVO) {
                var self = this,
                    types = ConfigurableType.getTypes(),
                    numberOfTypes = types.length,
                    type,
                    jsonObj = {
                        id: simpleConfigurationVO.getId(),
                        vehicleId: simpleConfigurationVO.getVehicleId(),
                        locale: simpleConfigurationVO.getLocale(),
                        baseVehicleId: simpleConfigurationVO.getBaseVehicleVO().getId()
                    };

                while (numberOfTypes--) {
                    type = types[numberOfTypes];

                    if (simpleConfigurationVO[type]) {
                        jsonObj[type] = simpleConfigurationVO[type].id;
                    }
                }

                self.saveImageUrl(jsonObj);

                return jsonObj;
            },

            saveImageUrl: function (jsonObj) {
                if (window.localStorage) {
                    window.localStorage.setItem(jsonObj.id,
                        CanvasCapture.getDataUrlForVehicleThumbnail());
                }
            },

            loadImageUrl: function (jsonObj) {
                var url = 'dummy_img.png';

                if (window.localStorage) {
                    url = window.localStorage.getItem(jsonObj.id);
                }

                return url;
            },

            removeImageUrl: function (jsonObj) {
                if (window.localStorage) {
                    window.localStorage.removeItem(jsonObj.id);
                }
            },

            getNewConfigurationToArray: function (simpleConfigurationVO) {
                var self = this,
                    configId = simpleConfigurationVO.getId(),
                    oldConfigurations = Cookie.getItem(bmc.model.proxy.UserConfigurationsProxy.KEY);

                oldConfigurations = JSON.parse(oldConfigurations) || [];

                if (self.getById(configId)) {
                    oldConfigurations.splice(self.getConfigurationIndex(configId, oldConfigurations), 1);
                    self.removeImageUrl({ id: configId});
                }

                oldConfigurations.unshift(self.convertToJSON(simpleConfigurationVO));

                self.removeExcessConfigurations(oldConfigurations);

                return oldConfigurations.slice();
            },

            removeExcessConfigurations: function (configurations) {
                var self = this,
                    config;

                if (configurations.length > 3) {
                    config = configurations.pop();
                    self.removeImageUrl(config);
                }
            },

            getCleansedConfigurations: function (configurations) {
                var numofConfigurations = configurations.length,
                    config, newConfigurations = [];

                while (numofConfigurations--) {
                    config = configurations[numofConfigurations];

                    if (this.loadImageUrl(config)) {
                        newConfigurations.unshift(config);
                    }
                }

                return newConfigurations;
            },

            convertToSimpleConfiguration: function (jsonObj) {
                var self = this,
                    simpleConfig = new SimpleConfigurationVO();

                simpleConfig.setId(jsonObj.id);
                simpleConfig.setVehicleId(jsonObj.vehicleId);
                simpleConfig.setLocale(jsonObj.locale);
                simpleConfig.setImageUrl(self.loadImageUrl(jsonObj));
                simpleConfig.setBaseVehicleVO(
                    new BaseVehicleVO({
                        id: jsonObj.baseVehicleId
                    })
                );

                self.applyTypesToSimpleConfig(jsonObj, simpleConfig);

                return simpleConfig;
            },

            applyTypesToSimpleConfig: function (jsonObj, simpleConfig) {
                var types = ConfigurableType.getTypes(),
                    numberOfTypes = types.length,
                    type;

                while (numberOfTypes--) {
                    type = types[numberOfTypes];

                    if (jsonObj[type]) {
                        simpleConfig.addConfigurableItemVO(
                            type,
                            new ConfigurableItemVO({
                                id: jsonObj[type]
                            })
                        );
                    }
                }
            }
        },
        {
            KEY: 'bmcConfigurations',
            NAME: 'UserConfigurationsProxy'
        }
    );
});