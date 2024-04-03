define([
    'support/NotificationNames',
    'support/ConfigurableType',
    'model/proxy/ActiveConfigurationProxy',
    'model/proxy/data/StandardFeaturesProxy',
    'controller/support/PrepareSectionConfigurableItemUIVOs/CreateAccessoriesConfigurableItemUIVOsStrategy'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        ActiveConfigurationProxy = arguments[2],
        StandardFeaturesProxy = arguments[3];

    return puremvc.define({
            name: 'bmc.controller.support.PrepareSectionContent.SummarySectionContentDelegate',
            constructor: function (host) {
                this.host = host;
            }
        },
        {
            generateContent: function () {
                this.host.sendNotification(NotificationNames.SHOW_SUMMARY_PAGE, this.buildSectionData());
            },

            buildSectionData: function () {
                var self = this,
                    GlobalConfig = bmc.support.GlobalConfig.getInstance();

                return {
                    configuration: self.getActiveConfigurationVO(),
                    standardFeatures: self.getStandardFeatureVOs(),
                    accessoryUIVOs: self.getAccessoriesUIVOs(),
                    disclaimer: GlobalConfig.LANGUAGE.disclaimers.summary
                };
            },

            getActiveConfigurationVO: function () {
                return this.host.facade.retrieveProxy(ActiveConfigurationProxy.NAME).getSimplified();
            },

            getStandardFeatureVOs: function () {
                return this.host.facade.retrieveProxy(StandardFeaturesProxy.NAME).getStandardFeatureVOs();
            },

            getAccessoriesUIVOs: function () {

                var strategyPackage = bmc.controller.support.PrepareSectionConfigurableItemUIVOs,

                    accessoryVOs = this.getActiveConfigurationVO().getAccessoryVOs().concat(
                        this.getActiveConfigurationVO().getOptionPackVOs()),
                    strategy = new strategyPackage.CreateAccessoriesConfigurableItemUIVOsStrategy(this.host);
                if (!_.isEmpty(accessoryVOs)) {
                    this.host.sendNotification(
                        bmc.support.NotificationNames.SET_PRICE_ON_CONFIGURABLE_ITEMS, accessoryVOs);
                }
                return  strategy.createAndConfigureConfigurableItemUIVOs(accessoryVOs);
            }
        });
});