define([
    'support/ConfigurableType',
    'model/proxy/ActiveConfigurationProxy',
    'controller/support/ConfigurableItemSelection/AbstractChangeStrategy'
], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        AbstractChangeStrategy = arguments[2];

    return puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.ChangeColourStrategy',
            parent: AbstractChangeStrategy,
            constructor: function (facade) {
                AbstractChangeStrategy.call(this, facade);
                this.facade = facade;
            }
        },
        {
            handleItemSelected: function (configurableItemVO) {

                var itemType = configurableItemVO.getType();

                if (this.currentItemVOExistsAndIsNotConfigurableItemVO(configurableItemVO)) {
                    this.getActiveConfigurationProxy().setConfigurableItemVO(itemType, configurableItemVO);

                    this.getActiveConfigurationProxy().checkItemAvailabilityDependencies(ConfigurableType.TRIM,
                        this.getActiveConfigurationProxy().getTrim());


                }
            },

            getActiveConfigurationProxy: function () {
                return this.facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
            }
        }
    );
});