define([
    'support/ConfigurableType',
    'controller/support/ConfigurableItemSelection/AbstractSelectionStrategy'
], function () {
    'use strict';
    var AbstractSelectionStrategy = arguments[1];

    return puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.SelectItemStrategy',
            parent: AbstractSelectionStrategy,
            constructor: function (facade) {
                AbstractSelectionStrategy.call(this, facade);
                this.facade = facade;
            }
        },
        {
            handleItemSelected: function (configurableItemVO) {

                var itemType = configurableItemVO.getType();

                if (this.currentItemVOExistsAndIsNotConfigurableItemVO(configurableItemVO)) {
                    this.getActiveConfigurationProxy().setConfigurableItemVO(itemType, configurableItemVO);
                }
            },

            currentItemVOExistsAndIsNotConfigurableItemVO: function (configurableItemVO) {

                var itemType = configurableItemVO.getType(),
                    activeConfigurationProxy = this.getActiveConfigurationProxy(),
                    currentItemVO = activeConfigurationProxy.getConfigurableItemVO(itemType);

                return !currentItemVO || (configurableItemVO.getId() !== currentItemVO.getId());
            },

            getActiveConfigurationProxy: function () {
                return this.facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
            }
        }
    );
});