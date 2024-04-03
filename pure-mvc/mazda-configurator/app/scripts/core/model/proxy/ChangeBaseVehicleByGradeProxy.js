define(['support/ConfigurableType', 'support/NotificationNames'], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        NotificationNames = arguments[1];

    return puremvc.define({
            name: 'bmc.model.proxy.ChangeBaseVehicleByGradeProxy',
            parent: puremvc.Proxy,
            constructor: function () {
                puremvc.Proxy.call(this);
                this.baseVehicles =
                    this.activeConfiguration =
                        this.newBaseVehicle = undefined;
            }
        },
        {
            updateBaseVehicle: function () {

                this.setBaseVehicleVO();
            },

            setBaseVehicleVO: function () {

                this.newBaseVehicle = this.getVehicleWithCurrentEngine();

                if (!this.newBaseVehicle) {
                    this.newBaseVehicle = this.getFirstVehicleInSelectedGrade();
                }

                this.sendNotification(NotificationNames.NEW_BASE_VEHICLE_AVAILABLE, this.newBaseVehicle);
            },

            getVehicleWithCurrentEngine: function () {

                var i,
                    currentVehicle,
                    newVehicle,
                    currentEngine =
                        this.activeConfigurationVO.getConfigurableItemVO(ConfigurableType.ENGINE),
                    numOfVehicles = this.baseVehicles.length;

                for (i = 0; i < numOfVehicles; i++) {

                    currentVehicle = this.baseVehicles[i];
                    if (currentVehicle.engineId === currentEngine.getId()) {
                        newVehicle = currentVehicle;
                        break;
                    }
                }
                return newVehicle;
            },

            getFirstVehicleInSelectedGrade: function () {
                this.sortVehcilesByRank();
                return this.baseVehicles[0];
            },

            sortVehcilesByRank: function () {

                this.baseVehicles.sort(function (a, b) {
                    return Number(a.rankId) - Number(b.rankId);
                });
            },

            setBaseVehicles: function (value) {
                this.baseVehicles = value;
            },

            setActiveConfigurationVO: function (value) {
                this.activeConfigurationVO = value;
            },

            getNewBaseVehicle: function () {
                return this.newBaseVehicle;
            }
        },

        {
            NAME: 'ChangeBaseVehicleByGradeProxy'
        }
    );
})
;
