define(['support/ConfigurableType'], function () {
    'use strict';
    var ConfigurableType = arguments[0];
    return puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.AbstractSelectionStrategy',
            constructor: function (facade) {
                this.facade = facade;
            }
        },
        {
            currentItemVOExistsAndIsNotConfigurableItemVO: function (configurableItemVO) {

                var itemType = configurableItemVO.getType(),
                    activeConfigurationProxy = this.getActiveConfigurationProxy(),
                    currentItemVO = activeConfigurationProxy.getConfigurableItemVO(itemType);

                return !currentItemVO || (configurableItemVO.getId() !== currentItemVO.getId());
            },

            handleSelectionDependencies: function (configurableItemsVOs, selectedOptionPackVO) {

                if (_.contains(configurableItemsVOs, selectedOptionPackVO)) {

                    this.addSelectionDependenciesToActiveConfiguration(
                        this.extractSelectionDependencies(configurableItemsVOs));
                } else {

                    this.removeSelectionDependenciesFromActiveConfiguration(
                        this.extractSelectionDependencies([selectedOptionPackVO]));
                }
            },

            extractSelectionDependencies: function (configurableItemsVOs) {

                var selectionDependencies = [],
                    selectionPreconditionVOs;

                _.each(configurableItemsVOs, function (configurableItemsVO) {

                    selectionPreconditionVOs = configurableItemsVO.getDependencies().getSelectionPrecondition();

                    if (selectionPreconditionVOs.length) {
                        selectionDependencies.push(selectionPreconditionVOs);
                    }
                });

                return _.flatten(selectionDependencies);
            },

            addSelectionDependenciesToActiveConfiguration: function (selectionPreconditionVOs) {

                var self = this,
                    configurableUItemVO;

                _.each(selectionPreconditionVOs, function (selectionPreconditionVO) {

                    configurableUItemVO =
                        self.getConfigurableItemVOFromId(
                            selectionPreconditionVO.getType(), selectionPreconditionVO.getId());

                    self.getActiveConfigurationProxy().setConfigurableItemVO(configurableUItemVO.getType(),
                        configurableUItemVO);
                });
            },

            removeSelectionDependenciesFromActiveConfiguration: function (selectionPreconditionVOs) {
                var self = this;
                _.each(selectionPreconditionVOs, function (selectionPreconditionVO) {

                    var activeConfigurationProxy = self.getActiveConfigurationProxy(),
                        configurableItemVO = self.getConfigurableItemVOFromId(
                            selectionPreconditionVO.getType(), selectionPreconditionVO.getId());

                    activeConfigurationProxy.replaceConfigurableItemWithBaseVehicleDefault(
                        configurableItemVO.getType());
                });
            },

            getConfigurableItemVOFromId: function (type, id) {

                var configurableItemProxy = this.facade.retrieveProxy(type);
                return configurableItemProxy.getById(id);
            },


            getVehicleOptionPackMatchingData: function (baseVehicleVOs, sortOptionPackVOs) {

                var matchingOptionPacks,
                    numberOfMatchingOptionPacks,
                    vehicleWithClosestMatchingOptionPacks = [];

                _.each(baseVehicleVOs, function (baseVehicleVO) {

                    matchingOptionPacks = _.intersection(baseVehicleVO.getOptionPackVOs(), sortOptionPackVOs);
                    numberOfMatchingOptionPacks = matchingOptionPacks.length;

                    if (numberOfMatchingOptionPacks) {

                        vehicleWithClosestMatchingOptionPacks.push({baseVehicleVO: baseVehicleVO,
                            numberOfMatchingOptionPacks: numberOfMatchingOptionPacks
                        });
                    }
                });

                return vehicleWithClosestMatchingOptionPacks;
            },

            getVehicleVOsWithTheHighestNumberOfMatchingOptionPacks: function (matchingDataVOs) {

                var vehicleVOsWithHighestMatchingOptionPacks = [],
                    highestNumberOfMatchingOptionPacks = _.max(matchingDataVOs, function (matchingDataVO) {
                        return matchingDataVO.numberOfMatchingOptionPacks;
                    }).numberOfMatchingOptionPacks;

                _.each(matchingDataVOs, function (matchingDataVO) {
                    if (matchingDataVO.numberOfMatchingOptionPacks === highestNumberOfMatchingOptionPacks) {
                        vehicleVOsWithHighestMatchingOptionPacks.push(matchingDataVO.baseVehicleVO);
                    }
                });

                return vehicleVOsWithHighestMatchingOptionPacks;
            },

            //TODO REPLACE WITH RANK FROM TRIM
            getCheapestVehicleVO: function (vehicleVOs) {

                return _.min(vehicleVOs, function (vehicleVO) {
                    return vehicleVO.getPrice();
                });
            },

            getProxy: function (proxyName) {
                return this.facade.retrieveProxy(proxyName);
            },


            getActiveBodyStyleGradeEngineIdsVO: function () {

                var activeConfigurationProxy = this.getActiveConfigurationProxy();

                return {
                    bodyStyle: activeConfigurationProxy.getBodyStyle().getId(),
                    grade: activeConfigurationProxy.getGrade().getId(),
                    engine: activeConfigurationProxy.getEngine().getId()
                };
            },

            getListOfActiveAndSelectedOptionPacks: function (selectedOptionPackVO) {

                var activeConfigurationProxy = this.getActiveConfigurationProxy(),
                    currentOptionPackVOs = _.clone(activeConfigurationProxy.getOptionPackVOs());

                if (_.contains(currentOptionPackVOs, selectedOptionPackVO)) {
                    currentOptionPackVOs = _.without(currentOptionPackVOs, selectedOptionPackVO);
                } else {
                    currentOptionPackVOs.push(selectedOptionPackVO);
                }

                return currentOptionPackVOs;
            },

            getVehicleWithOptionPacks: function (baseVehicleVOs, sortOptionPackVOs) {

                var baseVehicle = this.getVehicleWithExactOptionPacks(baseVehicleVOs, sortOptionPackVOs);

                if (!baseVehicle) {
                    baseVehicle = this.getVehicleVOWithTheClosestNumberOfMatchingOptionPacks(
                        baseVehicleVOs, sortOptionPackVOs);
                }

                return baseVehicle;
            },

            getVehicleVOWithTheClosestNumberOfMatchingOptionPacks: function (baseVehicleVOs, sortOptionPackVOs) {

                var vehicleOptionPackMatchingData = this.getVehicleOptionPackMatchingData(
                        baseVehicleVOs, sortOptionPackVOs),

                    vehicleVOsWithTheHighestMatchingOptionPacks =
                        this.getVehicleVOsWithTheHighestNumberOfMatchingOptionPacks(vehicleOptionPackMatchingData);

                return vehicleVOsWithTheHighestMatchingOptionPacks.length > 1 ?
                    this.getCheapestVehicleVO(vehicleVOsWithTheHighestMatchingOptionPacks) :
                    vehicleVOsWithTheHighestMatchingOptionPacks[0];
            },


            getVehicleWithExactOptionPacks: function (baseVehicleVOs, sortOptionPackVOs) {

                var numberOfSimilarOptionPacks,
                    numberOfSortOptionPackVOs = sortOptionPackVOs.length;

                return  _.find(baseVehicleVOs, function (baseVehicleVO) {

                    numberOfSimilarOptionPacks =
                        _.intersection(baseVehicleVO.getOptionPackVOs(), sortOptionPackVOs).length;
                    return numberOfSimilarOptionPacks === numberOfSortOptionPackVOs;
                });
            },

            getVehicleWithoutOptionPacks: function (baseVehicleVOs) {

                var vehicleOptionPackVOs;

                return _.find(baseVehicleVOs, function (baseVehicleVO) {

                    vehicleOptionPackVOs = baseVehicleVO.getOptionPackVOs();

                    if (!vehicleOptionPackVOs.length) {
                        return baseVehicleVO;
                    }
                });
            },

            getBaseVehicleVOsWithActiveBodyStyleGradeEngine: function () {

                var activeIds = this.getActiveBodyStyleGradeEngineIdsVO();

                return this.getBaseVehiclesProxy().getByBodyStyleGradeEngine(activeIds.bodyStyle,
                    activeIds.grade, activeIds.engine);
            },

            getBaseVehicleVOWithOptionPacksFromCollections: function () {

                var baseVehicleVO,
                    baseVehicleVOCollections = this.getBaseVehicleVOGroupsWithOptionPacks();

                while (baseVehicleVOCollections.length) {
                    baseVehicleVO =
                        this.getBaseVehicleVOWithOptionPacksFromCollection(baseVehicleVOCollections.shift());

                    if (baseVehicleVO) {
                        break;
                    }
                }
                return baseVehicleVO;
            },

            searchBaseVehicleVOGroupsForBaseVehicleVOWithOptionPacks: function () {
                return this.searchBaseVehicleVOGroup(this.getBaseVehicleVOWithOptionPacksFromVehicleVOGroup);
            },

            searchBaseVehicleVOGroupsForClosestMatchBaseVehicleVO: function () {
                return this.searchBaseVehicleVOGroup(this.getLowestRankingVehicleVO);
            },

            searchBaseVehicleVOGroup: function (searchMethod) {

                var baseVehicleVO,
                    baseVehicleVOCollections = this.getBaseVehicleVOGroups();

                while (baseVehicleVOCollections.length) {
                    baseVehicleVO =
                        searchMethod.call(this, baseVehicleVOCollections.shift());

                    if (baseVehicleVO) {
                        return baseVehicleVO;
                    }
                }
            },

            getLowestRankingVehicleVO: function (baseVehicleVOs) {

                if (baseVehicleVOs.length) {

                    return _.min(baseVehicleVOs, function (vehicleVO) {
                        return vehicleVO.getRank();
                    });
                }
            },

            getBaseVehicleVOsWithActiveBodyStyleGrade: function () {

                var activeBodyStyleGradeEngineIds = this.getActiveBodyStyleGradeEngineIdsVO();

                return this.getBaseVehiclesProxy().getByBodyStyleGrade(activeBodyStyleGradeEngineIds.bodyStyle,
                    activeBodyStyleGradeEngineIds.grade);
            },

            getBaseVehicleVOWithOptionPacksFromVehicleVOGroup: function (baseVehicleVOs) {

                var activeOptionPacks = this.getListOfActiveAndSelectedOptionPacks();
                return this.getVehicleWithOptionPacks(baseVehicleVOs, activeOptionPacks);
            },

            getBaseVehicleVOsWithActiveBodyStyle: function () {
                return this.getBaseVehiclesProxy().getByBodyStyle(this.getActiveBodyStyleGradeEngineIdsVO().bodyStyle);
            },

            getBaseVehiclesProxy: function () {
                return this.facade.retrieveProxy(bmc.model.proxy.data.BaseVehiclesProxy.NAME);
            },

            getActiveConfigurationProxy: function () {
                return this.facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
            },

            getActiveBodyStyleId: function () {

                var bodyStyle = ConfigurableType.BODYSTYLE,
                    activeConfigurationVO = this.getActiveConfigurationProxy().getSimplified();
                return activeConfigurationVO.getConfigurableItemVO(bodyStyle).getId();
            },

            activeConfigurationHasOptionPacks: function () {
                return Boolean(this.getListOfActiveAndSelectedOptionPacks().length);
            },

            getVehicleVOsWithTheHighestMatchingOptionPacks: function (matchingDataVOs) {

                var vehicleVOsWithHighestMatchingOptionPacks = [],
                    highestNumberOfMatchingOptionPacks = _.max(matchingDataVOs, function (matchingDataVO) {
                        return matchingDataVO.numberOfMatchingOptionPacks;
                    }).numberOfMatchingOptionPacks;

                _.each(matchingDataVOs, function (matchingDataVO) {
                    if (matchingDataVO.numberOfMatchingOptionPacks === highestNumberOfMatchingOptionPacks) {
                        vehicleVOsWithHighestMatchingOptionPacks.push(matchingDataVO.baseVehicleVO);
                    }
                });

                return vehicleVOsWithHighestMatchingOptionPacks;
            }
        }
    );
});