define(['controller/support/ConfigurableItemSelection/AbstractSelectionStrategy'], function () {
    'use strict';
    var AbstractSelectionStrategy = arguments[0];

    return puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.SelectOptionPackStrategy',
            parent: AbstractSelectionStrategy,
            constructor: function (facade) {
                AbstractSelectionStrategy.call(this, facade);
                AbstractSelectionStrategy.prototype.facade = this.facade = facade;
            }
        },
        {
            handleItemSelected: function (selectedOptionPackVO) {

                var baseVehicleVOs = this.getBaseVehicleVOsWithActiveBodyStyleGradeEngine(),
                    optionPackVOs = this.getListOfActiveAndSelectedOptionPacks(selectedOptionPackVO),
                    baseVehicle = this.getBaseVehicleVOWithOptionPacksFromCollections(
                        baseVehicleVOs, optionPackVOs, selectedOptionPackVO);

                this.getActiveConfigurationProxy().setBaseVehicleVO(baseVehicle);
                this.handleSelectionDependencies(baseVehicle.getOptionPackVOs(), selectedOptionPackVO);

            },

            getBaseVehicleVOWithOptionPacksFromCollections: function (
                baseVehicleVOs, optionPackVOs, selectedOptionPackVO) {

                var baseVehicleVO;

                if (optionPackVOs.length) {
                    baseVehicleVO = this.getVehicleWithOptionPacks(baseVehicleVOs, optionPackVOs, selectedOptionPackVO);
                } else {
                    baseVehicleVO = this.getVehicleWithoutOptionPacks(baseVehicleVOs);
                }

                return baseVehicleVO;
            },

            getVehicleWithOptionPacks: function (baseVehicleVOs, soughtOptionPackVOs, selectedOptionPackVO) {

                var baseVehicle = this.getVehicleWithExactOptionPacks(baseVehicleVOs, soughtOptionPackVOs);

                if (!baseVehicle) {
                    baseVehicle = this.getVehicleWithClosestMatchingOptionPacks(
                        baseVehicleVOs, soughtOptionPackVOs, selectedOptionPackVO);
                }

                return baseVehicle;
            },

            getVehicleWithClosestMatchingOptionPacks: function (
                baseVehicleVOs, soughtOptionPackVOs, selectedOptionPackVO) {

                var vehicleVOsThatHaveTheSelectedOptionPack =
                        this.getVehicleVOsThatHaveOptionPack(baseVehicleVOs, selectedOptionPackVO),

                    vehicleOptionPackMatchingData = this.getVehicleOptionPackMatchingData(
                        vehicleVOsThatHaveTheSelectedOptionPack, soughtOptionPackVOs),

                    vehicleVOsWithTheHighestMatchingOptionPacks =
                        this.getVehicleVOsWithTheHighestMatchingOptionPacks(vehicleOptionPackMatchingData);

                return vehicleVOsWithTheHighestMatchingOptionPacks.length > 1 ?
                    this.getCheapestVehicleVO(vehicleVOsWithTheHighestMatchingOptionPacks) :
                    vehicleVOsWithTheHighestMatchingOptionPacks[0];
            },

            getVehicleVOsThatHaveOptionPack: function (baseVehicleVOs, selectedOptionPackVO) {

                var vehicleVOsThatHaveSelectedOptionPack = [];

                _.each(baseVehicleVOs, function (baseVehicleVO) {

                    if (_.contains(baseVehicleVO.getOptionPackVOs(), selectedOptionPackVO)) {
                        vehicleVOsThatHaveSelectedOptionPack.push(baseVehicleVO);
                    }
                });

                return vehicleVOsThatHaveSelectedOptionPack;
            }
        }
    );
});