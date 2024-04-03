define(['support/ConfigurableType',
    'support/NotificationNames'], function () {
    'use strict';
    var NotificationNames = arguments[1];

    return puremvc.define({
            name: 'bmc.model.proxy.ChangeBaseVehicleByEngineProxy',
            parent: puremvc.Proxy,
            constructor: function () {
                puremvc.Proxy.call(this);
                this.baseVehicles =
                    this.baseVehiclesWithSelectedEngine =
                        this.newBaseVehicle = undefined;
            }
        },
        {
            updateBaseVehicle: function () {

                this.setBaseVehicleVO();
            },

            setBaseVehicleVO: function () {

                this.baseVehiclesWithSelectedEngine = this.getVehiclesWithSelectedEngine();

                this.baseVehicleWithSelectedEngineOnCurrentGrade = this.getVehiclesWithSelectedEngineOnCurrentGrade();

                if (this.baseVehicleWithSelectedEngineOnCurrentGrade.length) {

                    this.baseVehiclesWithSelectedEngine = this.baseVehicleWithSelectedEngineOnCurrentGrade;
                }

                this.newBaseVehicle = this.getLowestRankingVehicleVO();

                this.sendNotification(NotificationNames.NEW_BASE_VEHICLE_AVAILABLE, this.newBaseVehicle);
            },

            getVehiclesWithSelectedEngine: function () {

                var i,
                    vehiclesWithSelectedEngine = [],
                    currentVehicleVO,
                    numOfVehicles = this.baseVehicles.length;

                for (i = 0; i < numOfVehicles; i++) {

                    currentVehicleVO = this.baseVehicles[i];
                    if (currentVehicleVO.engineId === this.selectedEngineVO.getId()) {
                        vehiclesWithSelectedEngine.push(currentVehicleVO);
                    }
                }

                return vehiclesWithSelectedEngine;
            },

            getVehiclesWithSelectedEngineOnCurrentGrade: function () {

                var currentGradeId = this.getCurrentGradeVO().getId();

                return _.where(this.baseVehiclesWithSelectedEngine, {gradeId: currentGradeId });
            },

            getLowestRankingVehicleVO: function () {
                this.sortVehiclesByRank();
                return this.baseVehiclesWithSelectedEngine[0];
            },

            sortVehiclesByRank: function () {

                this.baseVehiclesWithSelectedEngine.sort(function (a, b) {
                    return Number(a.rankId) - Number(b.rankId);
                });
            },

            setSelectedEngineVO: function (value) {
                this.selectedEngineVO = value;
            },

            setBaseVehicles: function (value) {
                this.baseVehicles = value;
            },

            getNewBaseVehicle: function () {
                return this.newBaseVehicle;
            },

            setCurrentGradeVO: function (value) {
                this.currentGradeVO = value;
            },

            getCurrentGradeVO: function () {
                return this.currentGradeVO;
            }
        },

        {
            NAME: 'ChangeBaseVehicleByEngineProxy'
        }
    );
})
;