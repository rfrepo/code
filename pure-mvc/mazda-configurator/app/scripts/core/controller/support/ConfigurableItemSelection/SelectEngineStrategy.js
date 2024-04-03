define(['controller/support/ConfigurableItemSelection/AbstractSelectionStrategy'
], function () {
    'use strict';
    var AbstractSelectionStrategy = arguments[0];

    return puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.SelectEngineStrategy',
            parent: AbstractSelectionStrategy,
            constructor: function (facade) {
                AbstractSelectionStrategy.call(this, facade);
                this.facade = facade;
            }
        },
        {
            engineVO: undefined,

            handleItemSelected: function (engineVO) {

                this.engineVO = engineVO;

                if (this.engineIsNotOnActiveConfiguration()) {
                    this.changeBaseVehicleToOneThatSupportsEngineSelection();
                }
            },

            changeBaseVehicleToOneThatSupportsEngineSelection: function () {

                var baseVehicle;

                if (this.activeConfigurationHasOptionPacks()) {
                    baseVehicle = this.searchBaseVehicleVOGroupsForBaseVehicleVOWithOptionPacks();
                }

                if (!baseVehicle) {
                    baseVehicle = this.searchBaseVehicleVOGroupsForClosestMatchBaseVehicleVO();
                }

                this.getActiveConfigurationProxy().setBaseVehicleVO(baseVehicle);
            },

            engineIsNotOnActiveConfiguration: function () {
                return this.currentItemVOExistsAndIsNotConfigurableItemVO(this.engineVO);
            },

            getBaseVehicleVOWithOptionPacksFromCollection: function (baseVehicleVOs) {

                return this.getVehicleWithOptionPacks(
                    baseVehicleVOs, this.getActiveConfigurationProxy().getOptionPackVOs());
            },

            getBaseVehicleVOGroups: function () {

                var baseVehiclesProxy = this.getBaseVehiclesProxy(),
                    activeIds = this.getActiveBodyStyleGradeEngineIdsVO();

                return [
                    baseVehiclesProxy.getByBodyStyleGradeEngine(
                        activeIds.bodyStyle, activeIds.grade, this.engineVO.getId()),

                    baseVehiclesProxy.getByBodyStyleEngine(activeIds.bodyStyle, this.engineVO.getId())
                ];
            }
        }
    );
});