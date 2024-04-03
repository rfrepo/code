define([
    'support/ConfigurableType',
    'support/NotificationNames',
    'model/support/DependencyStepper',
    'model/vo/ConfigurableTypeIdsVO'
], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        NotificationNames = arguments[1],
        DependencyStepper = arguments[2],
        ConfigurableTypeIdsVO = arguments[3];

    return puremvc.define({
            name: 'bmc.model.proxy.ChangeBaseVehicleByTrimProxy',
            parent: puremvc.Proxy,
            constructor: function () {
                puremvc.Proxy.call(this);
                this.baseVehicles = this.activeConfigurationVO = this.baseVehiclesWithSelectedEngine =
                    this.newBaseVehicle = undefined;
            }
        },
        {
            updateBaseVehicleOrCurrentTrim: function () {

                if (!this.isSelectedTrimAvailableOnCurrentGrade()) {
                    var newBaseVehicle = this.setBaseVehicleVO();
                    this.sendNotification(NotificationNames.NEW_BASE_VEHICLE_AVAILABLE, newBaseVehicle);
                }

                this.sendNotification(NotificationNames.NEW_TRIM_AVAILABLE, this.selectedTrimVO);
            },

            isSelectedTrimAvailableOnCurrentGrade: function () {

                var configurableTypeIdsVO = this.createConfigurableTypeIdsVO(
                        this.activeConfigurationVO.getConfigurableItemVO(ConfigurableType.BODYSTYLE).getId(),
                        this.activeConfigurationVO.getConfigurableItemVO(ConfigurableType.GRADE).getId()
                    ),
                    trimAvailabilityPreconditions = this.getTrimAvailabilityPreconditions();
                return DependencyStepper.isAvailable(configurableTypeIdsVO,
                    trimAvailabilityPreconditions);
            },

            createConfigurableTypeIdsVO: function (bodyStyle, grade) {
                var configurableTypeIdsVO = new ConfigurableTypeIdsVO();

                configurableTypeIdsVO[ConfigurableType.BODYSTYLE] = bodyStyle;
                configurableTypeIdsVO[ConfigurableType.GRADE] = grade;

                return configurableTypeIdsVO;
            },

            getTrimAvailabilityPreconditions: function () {
                return this.selectedTrimVO.getDependencies().getAvailabilityPrecondition();
            },

            setBaseVehicleVO: function () {

                var newBaseVehicle,
                    vehiclesWithSelectedTrim = this.getVehiclesWithSelectedTrim(),
                    currentEngine =
                        this.activeConfigurationVO.getConfigurableItemVO(ConfigurableType.ENGINE).getId(),
                    vehicleWithCurrentEngine = this.getVehiclesWithEngineId(currentEngine, vehiclesWithSelectedTrim);

                if (vehicleWithCurrentEngine.length) {
                    vehicleWithCurrentEngine = this.sortVehiclesByAscendingRank(vehicleWithCurrentEngine);
                    newBaseVehicle = vehicleWithCurrentEngine[0];
                } else {
                    vehiclesWithSelectedTrim = this.sortVehiclesByAscendingRank(vehiclesWithSelectedTrim);
                    newBaseVehicle = vehiclesWithSelectedTrim[0];
                }

                if (this.selectedTrimVO.getId() !== newBaseVehicle.getDefaultsVO().getTrimId()) {
                    this.setNewTrimOnBaseVehicle(newBaseVehicle);
                }

                return newBaseVehicle;
            },

            getVehiclesWithSelectedTrim: function () {

                var i,
                    currentVehicleVO,
                    configurableTypeIdsVO,
                    trimAvailabilityPreconditions = this.getTrimAvailabilityPreconditions(),
                    vehiclesWithSelectedTrim = [],
                    numOfVehicles = this.baseVehicles.length;

                for (i = 0; i < numOfVehicles; i++) {

                    currentVehicleVO = this.baseVehicles[i];
                    configurableTypeIdsVO = this.createConfigurableTypeIdsVO(
                        currentVehicleVO.getBodyStyleVO().getId(),
                        currentVehicleVO.getGradeVO().getId()
                    );

                    if (DependencyStepper.isAvailable(configurableTypeIdsVO, trimAvailabilityPreconditions)) {
                        vehiclesWithSelectedTrim.push(currentVehicleVO);
                    }
                }

                return vehiclesWithSelectedTrim;
            },

            getVehiclesWithEngineId: function (engineId, vehicles) {

                var i,
                    currentVehicleVO,
                    currentVehicleEngineId,
                    vehiclesWithEngineId = [],
                    numOfVehicles = vehicles.length;

                for (i = 0; i < numOfVehicles; i++) {

                    currentVehicleVO = vehicles[i];
                    currentVehicleEngineId = currentVehicleVO.getEngineVO().getId();

                    if (engineId === currentVehicleEngineId) {
                        vehiclesWithEngineId.push(currentVehicleVO);
                    }
                }

                return vehiclesWithEngineId;
            },

            setNewTrimOnBaseVehicle: function (newBaseVehicle) {
                return  newBaseVehicle.getDefaultsVO().setTrimVO(this.selectedTrimVO);
            },

            sortVehiclesByAscendingRank: function (vehicles) {

                return  vehicles.sort(function (a, b) {
                    return Number(a.rankId) - Number(b.rankId);
                });
            },

            setSelectedTrimVO: function (value) {
                this.selectedTrimVO = value;
            },

            setBaseVehicles: function (value) {
                this.baseVehicles = value;
            },

            getNewBaseVehicle: function () {
                return this.newBaseVehicle;
            },

            setActiveConfigurationVO: function (value) {
                this.activeConfigurationVO = value;
            }
        },

        {
            NAME: 'ChangeBaseVehicleByTrimProxy'
        }
    );
});