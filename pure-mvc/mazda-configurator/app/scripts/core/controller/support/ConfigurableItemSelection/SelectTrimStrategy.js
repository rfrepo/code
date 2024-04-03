define([
    'support/ConfigurableType',
    'model/proxy/data/BaseVehiclesProxy',
    'model/proxy/ActiveConfigurationProxy',
    'model/proxy/ChangeBaseVehicleByTrimProxy',
    'controller/support/ConfigurableItemSelection/AbstractSelectionStrategy',
    'model/support/DependencyStepper',
    'model/proxy/data/OptionPackProxy'
], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        BaseVehiclesProxy = arguments[1],
        ActiveConfigurationProxy = arguments[2],
        AbstractSelectionStrategy = arguments[4],
        DependencyStepper = arguments[5],
        OptionPackProxy = arguments[6];

    return puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.SelectTrimStrategy',
            parent: AbstractSelectionStrategy,
            constructor: function (facade) {
                AbstractSelectionStrategy.call(this, facade);
                this.facade = facade;
            }
        },
        {
            trimVO: undefined,

            handleItemSelected: function (trimVO) {

                this.trimVO = trimVO;

                if (this.trimIsNotOnActiveConfiguration()) {

                    this.ensureActiveBaseVehicleSupportsTrim();
                    this.getActiveConfigurationProxy().setConfigurableItemVO(ConfigurableType.TRIM, trimVO);
                }
            },

            trimIsNotOnActiveConfiguration: function () {
                return this.currentItemVOExistsAndIsNotConfigurableItemVO(this.trimVO);
            },

            ensureActiveBaseVehicleSupportsTrim: function () {

                if (this.getTrimOptionPackIds(this.trimVO).length) {

                    this.changeBaseVehicleToOneThatSupportsTrimAndOptionPack();

                } else if (!this.isTrimAvailableOnCurrentGrade()) {

                    this.changeBaseVehicleToOneOnAGradeThatSupportsTrim();

                } else if (this.getNumberOfOptionPacksOnActiveConfiguration()) {

                    this.changeBaseVehicleToOneThatMayHaveOptionPacks();
                }
            },

            changeBaseVehicleToOneThatMayHaveOptionPacks: function () {

                var baseVehicleVO,
                    selectedTrim,
                    activeTrimOptionPackIds = this.activeTrimOptionPackIds();

                if (activeTrimOptionPackIds.length && this.getNumberOfOptionPacksOnActiveConfiguration() === 1) {

                    baseVehicleVO = this.getBaseVehicleVOThatCloselyMatchesTheActiveConfiguration(
                        this.getBaseVehicleVOFromTheCurrentGrade());
                    this.getActiveConfigurationProxy().setBaseVehicleVO(baseVehicleVO);

                } else if (this.getTrimOptionPackIds(this.trimVO).length) {

                    selectedTrim = this.trimVO;
                    this.trimVO = this.getActiveConfigurationProxy().getConfigurableItemVO(ConfigurableType.TRIM);
                    this.changeBaseVehicleToOneThatSupportsTrimAndOptionPack();
                    this.trimVO = selectedTrim;
                }
            },

            activeTrimOptionPackIds: function () {

                var activeTrimVO = this.getActiveConfigurationProxy().getConfigurableItemVO(ConfigurableType.TRIM);
                return this.getTrimOptionPackDependencyIds(activeTrimVO);
            },

            getNumberOfOptionPacksOnActiveConfiguration: function () {
                return this.getActiveConfigurationProxy().getOptionPackVOs().length;
            },

            getTrimOptionPackIds: function (trimVO) {
                return this.getTrimOptionPackDependencyIds(trimVO);
            },

            changeBaseVehicleToOneThatSupportsTrimAndOptionPack: function () {
                this.getActiveConfigurationProxy().setBaseVehicleVO(
                    this.getBaseVehicleVOWithOptionPacksFromCollections());
            },

            isTrimAvailableOnCurrentGrade: function () {

                return DependencyStepper.isAvailable(this.getBodyStyleGradeCriteriaVO(),
                    this.getTrimAvailabilityPreconditions());
            },

            changeBaseVehicleToOneOnAGradeThatSupportsTrim: function () {
                this.getActiveConfigurationProxy().setBaseVehicleVO(this.getBaseVehicleVOThatSupportsTrim());
            },

            getBaseVehicleVOThatSupportsTrim: function () {

                var baseVehicleVOsThatSupportTrim = this.getBaseVehicleVOsThatSupportTrim();
                return this.getBaseVehicleVOThatCloselyMatchesTheActiveConfiguration(baseVehicleVOsThatSupportTrim);
            },

            getBaseVehicleVOFromTheCurrentGrade: function () {

                var activeGradeVO = this.getActiveConfigurationProxy().getGrade();

                return _.filter(this.getBaseVehicleVOsThatSupportTrim(), function (baseVehicleVO) {
                    return  baseVehicleVO.getGradeVO() === activeGradeVO;
                });
            },

            getBaseVehicleVOGroupsWithOptionPacks: function () {

                return [
                    this.getBaseVehicleVOsWithActiveBodyStyleGradeEngine(),
                    this.getBaseVehicleVOsWithActiveBodyStyleGrade(),
                    this.getBaseVehicleVOsWithActiveBodyStyle()
                ];
            },


            getBaseVehicleVOsThatSupportTrim: function () {

                var searchCriteria = this.getBodyStyleGradeCriteriaVO(),
                    trimAvailabilityPreconditions = this.getTrimAvailabilityPreconditions(),
                    baseVehicleVOs = this.getAllTheBaseVehicleVOs();

                return _.filter(baseVehicleVOs, function (baseVehicleVO) {

                    searchCriteria.bodyStyle = baseVehicleVO.getBodyStyleVO().getId();
                    searchCriteria.grade = baseVehicleVO.getGradeVO().getId();

                    return DependencyStepper.isAvailable(searchCriteria, trimAvailabilityPreconditions);
                });
            },

            getBaseVehicleVOThatCloselyMatchesTheActiveConfiguration: function (baseVehicleVOs) {

                var vehicleVOsToRank,
                    vehicleVOsWithTheActiveEngine = this.getVehicleVOsWithActiveEngineId(baseVehicleVOs);

                vehicleVOsToRank = vehicleVOsWithTheActiveEngine.length ?
                    vehicleVOsWithTheActiveEngine : baseVehicleVOs;

                return this.getLowestRankingVehicleVO(vehicleVOsToRank);
            },

            getVehicleVOsWithActiveEngineId: function (baseVehicleVOs) {

                var activeEngineId = this.getActiveConfigurationProxy().getEngine().getId();

                return _.filter(baseVehicleVOs, function (baseVehicleVO) {
                    return baseVehicleVO.getEngineVO().getId() === activeEngineId;
                });
            },

            getTrimOptionPackDependencyIds: function (trimVO) {

                var optionPackIds = [],
                    selectionDependencies = trimVO.getDependencies().getSelectionPrecondition();

                _.each(selectionDependencies, function (preconditionVO) {

                    if (preconditionVO.getType() === ConfigurableType.OPTIONPACK) {
                        optionPackIds.push(preconditionVO.getId());
                    }
                });

                return optionPackIds;
            },

            getBaseVehicleVOWithOptionPacksFromCollection: function (baseVehicleVOs) {

                var optionPackVO = this.getTrimOptionPackDependencyVO(),
                    activeOptionPacks = this.getListOfActiveAndSelectedOptionPacks(optionPackVO);

                return this.getVehicleWithOptionPacks(baseVehicleVOs, activeOptionPacks, optionPackVO);
            },

            getVehicleWithOptionPacks: function (baseVehicleVOs, sortOptionPackVOs, selectedOptionPackVO) {

                var baseVehicle = this.getVehicleWithExactOptionPacks(baseVehicleVOs, sortOptionPackVOs);

                if (!baseVehicle) {
                    baseVehicle = this.getVehicleWithClosestMatchingOptionPacks(
                        baseVehicleVOs, sortOptionPackVOs, selectedOptionPackVO);
                }

                return baseVehicle;
            },

            getVehicleWithClosestMatchingOptionPacks: function (baseVehicleVOs, sortOptionPackVOs,
                                                                selectedOptionPackVO) {

                var vehicleVOsThatHaveTheSelectedOptionPack =
                        this.getVehicleVOsThatHaveOptionPack(baseVehicleVOs, selectedOptionPackVO),

                    vehicleOptionPackMatchingData =
                        this.getVehicleOptionPackMatchingData(
                            vehicleVOsThatHaveTheSelectedOptionPack, sortOptionPackVOs),

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
            },

            getTrimOptionPackDependencyVO: function () {
                var optionPackId = this.getTrimOptionPackDependencyIds(this.trimVO)[0];
                return this.getProxy(OptionPackProxy.NAME).getById(optionPackId);
            },


            getLowestRankingVehicleVO: function (baseVehicleVOs) {

                return _.min(baseVehicleVOs, function (vehicleVO) {
                    return vehicleVO.getRank();
                });
            },

            getAllTheBaseVehicleVOs: function () {
                return this.facade.retrieveProxy(BaseVehiclesProxy.NAME).getByBodyStyle(this.getActiveBodyStyleId());
            },

            getBodyStyleGradeCriteriaVO: function () {

                var criteriaVO = {};
                criteriaVO[ConfigurableType.BODYSTYLE] = this.getActiveBodyStyleId();
                criteriaVO[ConfigurableType.GRADE] = this.getActiveGradeId();

                return criteriaVO;
            },

            getTrimAvailabilityPreconditions: function () {
                return this.trimVO.getDependencies().getAvailabilityPrecondition();
            },

            getActiveBodyStyleId: function () {
                return this.getActiveConfigurationProxy().getBodyStyle().getId();
            },

            getActiveGradeId: function () {
                return this.getActiveConfigurationProxy().getGrade().getId();
            },

            getActiveConfigurationProxy: function () {
                return this.facade.retrieveProxy(ActiveConfigurationProxy.NAME);
            }
        }
    );
});