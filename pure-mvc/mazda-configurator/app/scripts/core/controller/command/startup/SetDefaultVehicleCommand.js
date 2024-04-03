define([
    'model/proxy/ActiveConfigurationProxy',
    'model/proxy/UserConfigurationsProxy',
    'model/proxy/data/BaseVehiclesProxy',
    'model/proxy/SessionProxy',
    'model/vo/data/BaseVehicleVO',
    'model/vo/data/UserConfigurationVO',
    'support/ConfigurableType',
    'support/NotificationNames'
], function () {
    'use strict';
    var ActiveConfigurationProxy = arguments[0],
        UserConfigurationsProxy = arguments[1],
        BaseVehiclesProxy = arguments[2],
        SessionProxy = arguments[3],
        UserConfigurationVO = arguments[5],
        ConfigurableType = arguments[6],
        NotificationNames = arguments[7];


    return puremvc.define({
            name: 'bmc.controller.command.startup.SetDefaultVehicleCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {
                var self = this,
                    activeConfigurationProxy = self.facade.retrieveProxy(ActiveConfigurationProxy.NAME),
                    globalConfig = bmc.support.GlobalConfig.getInstance(),
                    defaultVehicle = this.getDefaultBaseVehicle();

                globalConfig.setBodyStyleVO(defaultVehicle.getBodyStyleVO());
                activeConfigurationProxy.setLocale(globalConfig.getLocale());
                activeConfigurationProxy.setVehicleId(globalConfig.getVehicleId());

                activeConfigurationProxy.setBaseVehicleVO(defaultVehicle);
                activeConfigurationProxy.setId(this.getConfigurationId(activeConfigurationProxy));

                self.sendNotification(NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY,
                    activeConfigurationProxy.getSimplified());
            },

            getConfigurationId: function (activeConfigurationProxy) {
                var globalConfig = bmc.support.GlobalConfig.getInstance(),
                    configId = globalConfig.getConfigurationId();

                return configId ? configId : activeConfigurationProxy.getId();
            },

            getDefaultBaseVehicle: function () {
                var globalConfig = bmc.support.GlobalConfig.getInstance(),
                    configId = globalConfig.getConfigurationId(),
                    sessionProxy = this.facade.retrieveProxy(SessionProxy.NAME),
                    baseVehiclesProxy = this.facade.retrieveProxy(BaseVehiclesProxy.NAME),
                    userConfigurationsProxy = this.facade.retrieveProxy(UserConfigurationsProxy.NAME),
                    usersConfiguration = userConfigurationsProxy.getById(configId),
                    bodyStyleId = sessionProxy.getActiveBodyStyleId();

                if (usersConfiguration) {
                    return this.getUserConfigurationVOBasedOnAConfiguration(usersConfiguration);
                } else if (bodyStyleId) {
                    return baseVehiclesProxy.getBaseVehicleOnBodyStyle(bodyStyleId);
                } else {
                    return baseVehiclesProxy.getById(baseVehiclesProxy.getStartupBaseVehicleId());
                }
            },

            getUserConfigurationVOBasedOnAConfiguration: function (usersConfiguration) {
                var baseVehiclesProxy = this.facade.retrieveProxy(BaseVehiclesProxy.NAME),
                    baseConfiguration = baseVehiclesProxy.getById(usersConfiguration.getBaseVehicleVO().getId()),
                    userConfigurationVO = new UserConfigurationVO(baseConfiguration.data);

                this.applyConfigurableTypesToBaseConfiguration(usersConfiguration, userConfigurationVO);

                return userConfigurationVO;
            },

            applyConfigurableTypesToBaseConfiguration: function (usersConfiguration, baseConfiguration) {
                var types = ConfigurableType.getTypes(),
                    type,
                    numberOfTypes = types.length,
                    configurableItemProxy;

                while (numberOfTypes--) {
                    type = types[numberOfTypes];

                    configurableItemProxy = this.facade.retrieveProxy(type);

                    if (configurableItemProxy) {
                        baseConfiguration.setConfigurableItemVOByType(
                            type,
                            configurableItemProxy.getById(usersConfiguration.getConfigurableItemVO(type).getId())
                        );
                    }
                }
            }
        }
    );
});