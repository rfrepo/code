define(['controller/support/PrepareSectionConfigurableItemUIVOs/AbstractCreateConfigurableItemUIVOsStrategy'
], function () {
    'use strict';
    var AbstractCreateConfigurableItemUIVOsStrategy = arguments[0];


    puremvc.define({
            name: 'bmc.controller.support.PrepareSectionConfigurableItemUIVOs.' +
                'CreateWheelConfigurableItemUIVOsStrategy',
            parent:
                AbstractCreateConfigurableItemUIVOsStrategy,
            constructor: function (host, data) {

                this.abstractsPackage = bmc.controller.support.PrepareSectionConfigurableItemUIVOs;
                this.abstractsPackage.AbstractCreateConfigurableItemUIVOsStrategy.call(this, host, data);
                this.initialiseVariables();
            }
        },
        {
            initialiseVariables: function () {

                this.accessoryVOsOnActiveConfiguration = this.getActiveConfigurationVO().getAccessoryVOs();
                this.parentClassMethods = this.abstractsPackage.AbstractCreateConfigurableItemUIVOsStrategy.prototype;
            },

            createAndDispatchConfigurableItemUIVOs: function () {

                this.configurableItemVOs = this.getSectionConfigurableItemVOs();
                this.removeDuplicateWheelVOs();
                this.sendNotification();
            },

            removeDuplicateWheelVOs: function () {

                var wheelVOOnActiveConfigurationVO = this.configurableItemVOs[0];

                this.removeAccessoryDuplicateVOs(wheelVOOnActiveConfigurationVO);

                if (!wheelVOOnActiveConfigurationVO.getAccessoryCode()) {
                    this.removeStandardWheelDuplicateVO(wheelVOOnActiveConfigurationVO);
                }
            },

            removeAccessoryDuplicateVOs: function (wheelVOOnActiveConfiguration) {

                var self = this,
                    standardWheelAccessoryWheelIds = this.getStandardWheelAccessoryWheelIds();

                _.each(standardWheelAccessoryWheelIds, function (accessoryWheelId) {

                    self.configurableItemVOs = _.reject(self.configurableItemVOs, function (wheelVO) {
                        return wheelVO !== wheelVOOnActiveConfiguration && wheelVO.getId() === accessoryWheelId;
                    });
                });
            },

            getStandardWheelAccessoryWheelIds: function () {

                var accessoryId,
                    accessoryIds = [];

                _.each(this.configurableItemVOs, function (wheelVO) {

                    accessoryId = wheelVO.getAccessoryCode();

                    if (wheelVO.getAccessoryCode() !== undefined) {
                        accessoryIds.push(accessoryId);
                    }
                });

                return accessoryIds;
            },

            removeStandardWheelDuplicateVO: function (wheelVOOnActiveConfiguration) {

                var standardWheelWithSelectedAccessoryId =
                    this.getStandardWheelWithSelectedAccessoryId(wheelVOOnActiveConfiguration.getId());

                this.configurableItemVOs = _.without(this.configurableItemVOs, standardWheelWithSelectedAccessoryId);
            },

            getStandardWheelWithSelectedAccessoryId: function (accessoryWheelId) {
                return _.findWhere(this.configurableItemVOs, {accessoryCode: accessoryWheelId});
            }
        });
});