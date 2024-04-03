define([
    '../../../../../core/model/support/SectionData/delegate/DependencyPriceCalculatorDelegate',
    'model/proxy/ActiveConfigurationProxy',
    'support/ConfigurableType',
    'model/proxy/PriceDisplayProxy'
], function () {
    'use strict';
    var DependencyPriceCalculatorDelegate = arguments[0],
        ActiveConfigurationProxy = arguments[1],
        ConfigurableType = arguments[2],
        PriceDisplayProxy = arguments[3];

    puremvc.define({
            name: 'bmc.model.support.sectionData.delegate.DependencyPriceCalculatorDelegate',
            parent: DependencyPriceCalculatorDelegate
        },
        {
            calculatePrice: function () {
                var i = 0,
                    parent = DependencyPriceCalculatorDelegate.prototype,
                    configurableItemVO,
                    activeConfigurationVO = this.getProxy(ActiveConfigurationProxy.NAME).getSimplified(),
                    totalConfigurableItemVOs = this.dataVOs.length;

                parent.calculatePrice.call(this);

                for (i; i < totalConfigurableItemVOs; i++) {
                    configurableItemVO = this.dataVOs[i];

                    if (configurableItemVO.getType() === ConfigurableType.COLOUR) {
                        configurableItemVO.setDisplayPrice(
                            this.getProxy(PriceDisplayProxy.NAME).getPrice(configurableItemVO,
                                activeConfigurationVO.getBaseVehicleVO().getId()));
                    }
                }
            }
        }
    );
});
