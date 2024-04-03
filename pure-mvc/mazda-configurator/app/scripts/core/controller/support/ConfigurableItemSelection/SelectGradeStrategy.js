define(['controller/support/ConfigurableItemSelection/AbstractSelectionStrategy'], function () {
    'use strict';
    var AbstractSelectionStrategy = arguments[0];

    return puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.SelectGradeStrategy',
            parent: AbstractSelectionStrategy,
            constructor: function (facade) {
                AbstractSelectionStrategy.call(this, facade);
                this.facade = facade;
            }
        },
        {
            gradeVO: undefined,

            handleItemSelected: function (gradeVO) {

                this.gradeVO = gradeVO;

                if (this.gradeIsNotOnActiveConfiguration()) {
                    this.changeBaseVehicleToOneThatSupportsGradeSelection();
                }
            },

            changeBaseVehicleToOneThatSupportsGradeSelection: function () {

                var baseVehicle;

                if (this.activeConfigurationHasOptionPacks()) {
                    baseVehicle = this.searchBaseVehicleVOGroupsForBaseVehicleVOWithOptionPacks();
                }

                if (!baseVehicle) {
                    baseVehicle = this.searchBaseVehicleVOGroupsForClosestMatchBaseVehicleVO();
                }

                this.getActiveConfigurationProxy().setBaseVehicleVO(baseVehicle);
            },

            gradeIsNotOnActiveConfiguration: function () {
                return this.currentItemVOExistsAndIsNotConfigurableItemVO(this.gradeVO);
            },

            getBaseVehicleVOGroups: function () {

                var baseVehiclesProxy = this.getBaseVehiclesProxy(),
                    activeIds = this.getActiveBodyStyleGradeEngineIdsVO();

                return [
                    baseVehiclesProxy.getByBodyStyleGradeEngine(activeIds.bodyStyle, this.gradeVO.getId(),
                        activeIds.engine),
                    baseVehiclesProxy.getByBodyStyleGrade(activeIds.bodyStyle, this.gradeVO.getId())
                ];
            }
        }
    );
});