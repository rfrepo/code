define([
    'support/ConfigurableType',
    'model/vo/SimpleConfigurationVO',
    'support/NotificationNames'
], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        SimpleConfigurationVO = arguments[1],
        NotificationNames = arguments[2];

    return puremvc.define({
            name: 'bmc.model.proxy.ActiveConfigurationProxy',
            parent: puremvc.Proxy,

            constructor: function () {

                var self = this;
                puremvc.Proxy.call(self, bmc.model.proxy.ActiveConfigurationProxy.NAME);
                this.accessoryVOs = [];
                self.setId('configuration-' + new Date().getTime() + Math.floor(Math.random() * 999));
            }
        },
        {
            getId: function () {
                return this.id;
            },

            setId: function (value) {
                this.id = value;
            },

            getVehicleId: function () {
                return this.vehicleId;
            },

            setVehicleId: function (value) {
                this.vehicleId = value;
            },

            getLocale: function () {
                return this.locale;
            },

            setLocale: function (value) {
                this.locale = value;
            },

            setBaseVehicleVO: function (value) {
                var self = this;

                self.previousConfigurationVO = self.getSimplified();
                self.isSettingBaseVehicle = true;
                self.baseVehicle = value;
                //this.setVehicleId(value.getId());

                self.extractMSCVOFromBaseVehicle();

                if (self.baseVehicleWasPreviouslySet()) {
                    self.validateActiveConfiguration();
                } else {
                    self.extractNoneMSCVOFromBaseVehicle();
                }

                self.isSettingBaseVehicle = false;

                self.sendChangeNotification();
            },

            sendChangeNotification: function () {

                if (!this.isSettingBaseVehicle) {

                    this.sendNotification(
                        NotificationNames.ACTIVE_CONFIGURATION_CHANGE, this.getSimplified());
                }
            },

            restoreToPreviousConfiguration: function () {

                this.isSettingBaseVehicle = true;

                this.baseVehicle = this.previousConfigurationVO.getBaseVehicleVO();

                this.setConfigurableItemVO(ConfigurableType.WHEEL,
                    this.previousConfigurationVO[ConfigurableType.WHEEL]);

                this.setConfigurableItemVO(ConfigurableType.COLOUR,
                    this.previousConfigurationVO[ConfigurableType.COLOUR]);

                this.setConfigurableItemVO(ConfigurableType.TRIM,
                    this.previousConfigurationVO[ConfigurableType.TRIM]);

                this.accessories = this.previousConfigurationVO.getAccessoryVOs();

                this.isSettingBaseVehicle = false;

                this.sendNotification(NotificationNames.ACTIVE_CONFIGURATION_CHANGE,
                    this.getSimplified(),
                    NotificationNames.NOTIFICATION_TYPE_RESTORE);
            },

            extractMSCVOFromBaseVehicle: function () {
                this.setConfigurableItemVO(ConfigurableType.BODYSTYLE, this.baseVehicle.getBodyStyleVO());
                this.setConfigurableItemVO(ConfigurableType.GRADE, this.baseVehicle.getGradeVO());
                this.setConfigurableItemVO(ConfigurableType.ENGINE, this.baseVehicle.getEngineVO());
            },

            extractNoneMSCVOFromBaseVehicle: function () {

                this.setConfigurableItemVO(ConfigurableType.WHEEL,
                    this.baseVehicle.getWheelVO());

                this.setConfigurableItemVO(ConfigurableType.COLOUR,
                    this.baseVehicle.getColourVO());

                this.setConfigurableItemVO(ConfigurableType.TRIM,
                    this.baseVehicle.getTrimVO());
            },

            baseVehicleWasPreviouslySet: function () {

                return this.getColourVO() ? true : false;
            },

            validateActiveConfiguration: function validateActiveConfiguration() {

                var i,
                    configurableTypes = this.getConfigurableTypesToValidate(),
                    numOfConfigurableTypes = configurableTypes.length,
                    configurationItem;

                for (i = 0; i < numOfConfigurableTypes; i++) {

                    configurationItem =
                        this.getConfigurableItemVO(configurableTypes[i]);
                    if (configurationItem) {
                        this.checkItemAvailabilityDependencies(configurableTypes[i], configurationItem);
                    }
                }
            },

            checkItemAvailabilityDependencies: function (configurableType, configurationItem) {

                var availabilityPreconditions = configurationItem.getDependencies().getAvailabilityPrecondition(),
                    isAvailableOnCurrentConfiguration = this.traversePreconditions(availabilityPreconditions);

                if (!isAvailableOnCurrentConfiguration) {
                    this.replaceConfigurableItemWithBaseVehicleDefault(configurableType);
                }
            },

            replaceConfigurableItemWithBaseVehicleDefault: function (configurableType) {
                var defaultVO = this.baseVehicle.getDefaultsVO(),
                    getConfigurableItemVO = 'get' + this.capitaliseFirstLetter(configurableType) + 'VO',
                    newConfigurableItemVO = defaultVO[getConfigurableItemVO]();

                this.setConfigurableItemVO(configurableType, newConfigurableItemVO);
            },

            capitaliseFirstLetter: function (text) {
                return text.charAt(0).toUpperCase() + text.slice(1);
            },

            traversePreconditions: function (preconditions) {

                var i,
                    numOfPreconditions = preconditions.length,
                    isAvailable = false;

                for (i = 0; i < numOfPreconditions; i++) {

                    isAvailable = this.comparePreconditionAgainstKeyValues(preconditions[i]);
                    if (isAvailable) {
                        break;
                    }
                }

                return isAvailable;
            },

            comparePreconditionAgainstKeyValues: function (precondition) {

                var preconditionType = precondition.getType(),
                    configurationTypeVO,
                    isAvailable,
                    preconditions = precondition.getPreconditions();

                configurationTypeVO = this.getConfigurableItemVO(preconditionType);

                isAvailable = configurationTypeVO.getId() === precondition.getId();

                if (isAvailable && preconditions.length) {
                    isAvailable = this.traversePreconditions(preconditions);
                }

                return isAvailable;
            },

            getConfigurableTypesToValidate: function () {

                return [
                    ConfigurableType.COLOUR,
                    ConfigurableType.WHEEL,
                    ConfigurableType.TRIM
                ];
            },

            getBodyStyle: function () {
                return this.getConfigurableItemVO(ConfigurableType.BODYSTYLE);
            },

            getGrade: function () {
                return this.getConfigurableItemVO(ConfigurableType.GRADE);
            },

            getEngine: function () {
                return this.getConfigurableItemVO(ConfigurableType.ENGINE);
            },

            getColourVO: function () {
                return this.getConfigurableItemVO(ConfigurableType.COLOUR);
            },

            getWheel: function () {
                return this.getConfigurableItemVO(ConfigurableType.WHEEL);
            },

            getTrim: function () {
                return this.getConfigurableItemVO(ConfigurableType.TRIM);
            },

            getConfigurableItemVO: function (type) {
                return this[type];
            },

            setConfigurableItemVO: function (type, vo) {

                var self = this;

                if (self[type] !== vo) {

                    self[type] = vo;
                    this.sendNonConfigurableItemChangeNotification(vo, type);
                }
            },

            sendNonConfigurableItemChangeNotification: function (vo, type) {

                if (!this.isSettingBaseVehicle) {

                    this.sendNotification(NotificationNames.CONFIGURABLE_ITEM_UPDATED, vo, type);
                    this.sendNotification(
                        NotificationNames.NON_MSC_CONFIGURATION_CHANGE, this.getSimplified()
                    );
                }
            },

            addAccessoryVO: function (accessoryVO) {

                this.applyAccessoriesToPreviousConfiguration();
                this.accessoryVOs.push(accessoryVO);
                this.sendChangeNotification();
            },

            removeAccessoryVO: function (accessoryVO) {

                this.applyAccessoriesToPreviousConfiguration();
                var totalAccessories = this.accessoryVOs.length;
                this.accessoryVOs = _.without(this.accessoryVOs, accessoryVO);

                if (totalAccessories !== this.accessoryVOs.length) {
                    this.sendChangeNotification();
                }
            },

            applyAccessoriesToPreviousConfiguration: function () {

                if (this.previousConfigurationVO) {
                    this.previousConfigurationVO.accessoryVOs = this.accessoryVOs.slice(0);
                }
            },

            getAccessoryVOById: function (id) {
                return _.findWhere(this.accessoryVOs, {id: id});
            },

            getAccessoryVOs: function () {
                return this.accessoryVOs;
            },

            getOptionPackVOs: function () {
                return this.baseVehicle ? this.baseVehicle.getOptionPackVOs() : [];
            },

            getSimplified: function () {

                var self = this,
                    types = ConfigurableType.getTypes(),
                    simple = new SimpleConfigurationVO();

                _.each(types, function (type) {
                    simple.addConfigurableItemVO(type, self.getConfigurableItemVO(type));
                });

                simple.accessoryVOs = this.accessoryVOs;
                simple.optionPackVOs = this.getOptionPackVOs();

                simple.setId(self.getId());
                simple.setVehicleId(self.getVehicleId());
                simple.setLocale(self.getLocale());
                simple.setBaseVehicleVO(self.baseVehicle);
                simple.setPreviousConfigurationVO(self.previousConfigurationVO);

                return simple;
            }


        },
        {
            NAME: 'ActiveConfigurationProxy'
        }
    );
});