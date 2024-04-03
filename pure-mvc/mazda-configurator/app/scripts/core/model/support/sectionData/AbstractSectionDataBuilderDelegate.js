define(['support/ConfigurableType'], function () {
    'use strict';
    var ConfigurableType = arguments[0];

    puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.AbstractSelectionStrategy',
            constructor: function (facade) {
                this.facade = facade;
            }
        },
        {
            currentItemVOExistsAndIsNotConfigurableItemVO: function (configurableItemVO) {

                var itemType = configurableItemVO.getType(),
                    activeConfigurationProxy = this.getActiveConfigurationProxy(),
                    currentItemVO = activeConfigurationProxy.getConfigurableItemVO(itemType);

                return !currentItemVO || (configurableItemVO.getId() !== currentItemVO.getId());
            },

            getBaseVehiclesProxy: function () {
                return this.facade.retrieveProxy(bmc.model.proxy.data.BaseVehiclesProxy.NAME);
            },

            getActiveConfigurationProxy: function () {
                return this.facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
            },

            getActiveBodyStyleId: function () {
                var bodyStyle = ConfigurableType.BODYSTYLE,
                    activeConfigurationVO = this.getActiveConfigurationProxy().getSimplified();
                return activeConfigurationVO.getConfigurableItemVO(bodyStyle).getId();
            }
        }
    );
});