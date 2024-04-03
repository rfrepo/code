define([
    'support/ConfigurableType',
    'controller/support/ConfigurableItemSelection/AbstractSelectionStrategy'
], function () {
    'use strict';
    var AbstractSelectionStrategy = arguments[1];

    return puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.SelectAccessoryStrategy',
            parent: AbstractSelectionStrategy,
            constructor: function (facade) {
                AbstractSelectionStrategy.call(this, facade);
                this.facade = facade;
            }
        },
        {
            handleItemSelected: function (accessoryVO) {
                this.addorRemoveAccessoryVO(accessoryVO);
            },

            addorRemoveAccessoryVO: function (accessoryVO) {

                var activeConfigurationProxy = this.getActiveConfigurationProxy(),
                    isAccessoryVOOnActiveConfiguration =
                        activeConfigurationProxy.getAccessoryVOById(accessoryVO.getId());

                if (isAccessoryVOOnActiveConfiguration) {
                    activeConfigurationProxy.removeAccessoryVO(accessoryVO);
                } else {
                    this.removeAccessoryWithTheSameGroupName(accessoryVO);
                    activeConfigurationProxy.addAccessoryVO(accessoryVO);
                }
            },

            removeAccessoryWithTheSameGroupName: function (accessoryVO) {

                var activeConfigurationProxy = this.getActiveConfigurationProxy(),
                    accessoryVOWithSameGroupNameVO = this.getAccessoryVOWithTheSameGroupName(accessoryVO);

                if (accessoryVOWithSameGroupNameVO) {
                    activeConfigurationProxy.removeAccessoryVO(accessoryVOWithSameGroupNameVO);
                }
            },

            getAccessoryVOWithTheSameGroupName: function (accessoryVO) {

                var activeConfigurationProxy = this.getActiveConfigurationProxy(),
                    accessoryVOs = activeConfigurationProxy.getAccessoryVOs(),
                    activeAccessoryVOGroupName;

                return _.find(accessoryVOs, function (activeAccessoryVO) {

                    activeAccessoryVOGroupName = activeAccessoryVO.getGroupName();

                    return activeAccessoryVOGroupName &&
                        activeAccessoryVOGroupName === accessoryVO.getGroupName();
                });
            },

            getActiveConfigurationProxy: function () {
                return this.facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
            }
        }
    );
});