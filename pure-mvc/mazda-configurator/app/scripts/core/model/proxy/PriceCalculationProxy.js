define([
    'support/NotificationNames',
    'support/ConfigurableType',
    'model/support/DependencyStepper'
], function () {
    'use strict';
    var ConfigurableType = arguments[1],
        DependencyStepper = arguments[2];

    return puremvc.define({
            name: 'bmc.model.proxy.PriceCalculationProxy',
            parent: puremvc.Proxy
        },
        {
            activeConfigurationVO: undefined,

            calculate: function (activeConfigurationVO) {
                this.activeConfigurationVO = activeConfigurationVO;

                return this.getBaseVehicleVOPrice() +
                    this.addUpAndReturnConfigurableItemVOPrices();
            },

            getBaseVehicleVOPrice: function () {

                var baseVehicle = this.activeConfigurationVO.getBaseVehicleVO();
                return Number(baseVehicle.getPrice());
            },

            addUpAndReturnConfigurableItemVOPrices: function () {

                return this.addUpAndReturnWheelColourTrimPrices() +
                    this.addUpAndReturnAccessoryPrices();
            },

            addUpAndReturnWheelColourTrimPrices: function () {

                var VOPrice,
                    price = 0,
                    self = this,
                    configurableTypes = [
                        ConfigurableType.WHEEL,
                        ConfigurableType.COLOUR,
                        ConfigurableType.TRIM
                    ];

                _.each(configurableTypes, function (type) {

                    VOPrice = self.activeConfigurationVO.getConfigurableItemVO(type).getPrice();
                    price += isNaN(VOPrice) ? 0 : VOPrice;
                });

                return Number(price);
            },

            addUpAndReturnAccessoryPrices: function () {

                var price = 0,
                    self = this,
                    pricePreconditions;

                _.each(this.activeConfigurationVO.getAccessoryVOs(), function (accessoryVO) {

                    pricePreconditions = accessoryVO.getDependencies().getPricePrecondition();
                    price += self.getPriceValueOnCurrentConfiguration(pricePreconditions);
                });

                return price;
            },

            getPriceValueOnCurrentConfiguration: function (preconditions) {

                var criteriaVO = this.activeConfigurationVO.getTypeIdValuePairObjectFromCurrentItemVOs();

                return DependencyStepper.isAvailable(criteriaVO, preconditions) ?
                    Number(DependencyStepper.getFoundPreconditionVO().value) : 0;
            }

        },
        {
            NAME: 'PriceCalculationProxy'
        }
    );
});