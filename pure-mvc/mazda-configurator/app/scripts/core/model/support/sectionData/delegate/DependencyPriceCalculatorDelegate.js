define([
    'support/ConfigurableType',
    'model/proxy/ActiveConfigurationProxy',
    'model/support/DependencyStepper',
    'support/ConfigurableType'
], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        ActiveConfigurationProxy = arguments[1],
        DependencyStepper = arguments[2];

    return puremvc.define({
            name: 'bmc.model.support.sectionData.delegate.DependencyPriceCalculatorDelegate',
            constructor: function (host) {
                this.host = host;
            }
        },
        {
            calculatePrice: function () {

                var i = 0,
                    configurableItemVO,
                    totalConfigurableItemVOs = this.dataVOs.length;

                for (i; i < totalConfigurableItemVOs; i++) {

                    configurableItemVO = this.dataVOs[i];
                    configurableItemVO.setPrice(
                        this.getPriceBasedOnCurrentConfiguration(configurableItemVO)
                    );
                }
            },

            getPriceBasedOnCurrentConfiguration: function (configurableItemVO) {

                var price,
                    engineVO,
                    activeConfigurationVO = this.getProxy(
                        ActiveConfigurationProxy.NAME).getSimplified(),
                    pricePreconditions = configurableItemVO.getDependencies().getPricePrecondition(),
                    activeConfigurationValuePairs = activeConfigurationVO.getTypeIdValuePairObjectFromCurrentItemVOs();

                if (DependencyStepper.isAvailable(activeConfigurationValuePairs, pricePreconditions)) {
                    price = Number(DependencyStepper.getFoundPreconditionVO().getValue());
                } else {
                    price = 0;
                }

                if (configurableItemVO.getTaxable && configurableItemVO.getTaxable()) {
                    engineVO = activeConfigurationVO.getConfigurableItemVO(ConfigurableType.ENGINE);
                    price = this.calculateTax(price, engineVO);
                }
                return price;
            },

            calculateTax: function (preTaxtPrice, engineVO) {

                var taxIncrease = Number(engineVO.getTaxIncrease()),
                    priceIncrease = taxIncrease / 100 * preTaxtPrice;
                return priceIncrease + preTaxtPrice;
            },

            getProxy: function (proxyName) {
                return this.host.facade.retrieveProxy(proxyName);
            },

            setData: function (VOs) {
                this.dataVOs = VOs;
            }
        }
    );
})
;
