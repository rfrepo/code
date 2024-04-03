define([
    'support/GlobalConstants',
    'support/ConfigurableType',
    'support/NotificationNames',
    'model/vo/ConflictVO'
], function () {
    'use strict';
    var ConfigurableType = arguments[1],
        NotificationNames = arguments[2],
        ConflictVO = arguments[3];

    return puremvc.define({
            name: 'bmc.model.proxy.ConfigurationConflictProxy',
            parent: puremvc.Proxy

        },
        {
            checkForConflicts: function (activeConfigurationVO, activeSectionVO) {

                if (this.hasBaseVehicleChanged(activeConfigurationVO) && activeSectionVO &&
                    ConfigurableType.ACCESSORIES !== activeSectionVO.getType()) {
                    //if (this.hasBaseVehicleChanged(activeConfigurationVO) && activeSectionVO) {

                    var conflictsFound = [];

                    this.checkConflictsOnSingleSelectionTypes(activeConfigurationVO, activeSectionVO, conflictsFound);

                    //this.checkConflictsOnAccessories(activeConfigurationVO, activeSectionVO, conflictsFound);

                    this.dispatchNotification(conflictsFound, activeSectionVO);
                }
            },

            checkConflictsOnSingleSelectionTypes: function (activeConfigurationVO, activeSectionVO, conflictsFound) {

                var self = this,
                    currentTypeVO,
                    conflictVO,
                    previousTypeVO,
                    configurableTypes = ConfigurableType.getTypes(),
                    previousConfigurationVO = activeConfigurationVO.getPreviousConfigurationVO();

                _.each(configurableTypes, function (type) {

                    currentTypeVO = activeConfigurationVO.getConfigurableItemVO(type);
                    previousTypeVO = previousConfigurationVO.getConfigurableItemVO(type);

                    if (self.doesPreviousAndCurrentTypeConflict(currentTypeVO, previousTypeVO)) {

                        conflictVO = new ConflictVO();

                        conflictVO.setType(type);
                        conflictVO.setCurrentValue(currentTypeVO.getName());
                        conflictVO.setPreviousValue(previousTypeVO.getName());
                        conflictVO.setSectionType(activeSectionVO.getType());

                        conflictsFound.push(conflictVO);
                    }
                });
            },

            checkConflictsOnAccessories: function (activeConfigurationVO, activeSectionVO, conflictsFound) {

                var conflictVO,
                    numberOfActiveAccessoryVOs = this.getTotalActiveAccessoriesAndOptionPacks(activeConfigurationVO),

                    numberOfPreviousAccessoryVOs =
                        this.getTotalPreviousAccessoriesAndOptionPacks(activeConfigurationVO),

                    totalDifferentAccessoryAndOptionPackVOs =
                        this.totalDifferentAccessoryAndOptionPackVOs(activeConfigurationVO);

                if (totalDifferentAccessoryAndOptionPackVOs) {

                    conflictVO = new bmc.model.vo.ConflictVO();

                    conflictVO.setType(ConfigurableType.ACCESSORIES);
                    conflictVO.setCurrentValue(numberOfActiveAccessoryVOs);
                    conflictVO.setPreviousValue(numberOfPreviousAccessoryVOs);
                    conflictVO.setSectionType(activeSectionVO.getType());

                    conflictsFound.push(conflictVO);
                }
            },

            getTotalActiveAccessoriesAndOptionPacks: function (activeConfigurationVO) {
                return activeConfigurationVO.getOptionPackVOs().length + activeConfigurationVO.getAccessoryVOs().length;
            },

            getTotalPreviousAccessoriesAndOptionPacks: function (activeConfigurationVO) {

                return activeConfigurationVO.getPreviousConfigurationVO().getAccessoryVOs().length +
                    activeConfigurationVO.getPreviousConfigurationVO().getOptionPackVOs().length;
            },

            totalDifferentAccessoryAndOptionPackVOs: function (activeConfigurationVO) {

                var activeAccessoriesAndOptionPackVOs =
                        activeConfigurationVO.getOptionPackVOs().concat(activeConfigurationVO.getAccessoryVOs()),

                    previousConfigurationVO = activeConfigurationVO.getPreviousConfigurationVO(),

                    previousAccessoriesAndOptionPackVOs =
                        previousConfigurationVO.getOptionPackVOs().concat(previousConfigurationVO.getAccessoryVOs());

                return !_.isEqual(activeAccessoriesAndOptionPackVOs, previousAccessoriesAndOptionPackVOs);

            },

            dispatchNotification: function (conflictsFound, activeSectionVO) {

                if (conflictsFound.length > 1) {
                    //console.log('1', conflictsFound);
                    this.addPriceConflictVOToConflictsFound(conflictsFound);
                    this.sendNotification(NotificationNames.ON_CONFLICTS_FOUND, conflictsFound);
                    this.sendNotification(NotificationNames.CONFLICTS_FOUND, conflictsFound);

                } else if (conflictsFound.length === 1 && conflictsFound[0].getType() !== activeSectionVO.getType()) {
                    //console.log('2');
                    this.sendNotification(NotificationNames.NO_CONFLICTS_FOUND);
                } else {
                    //console.log('3');
                    this.sendNotification(NotificationNames.NO_CONFLICTS_FOUND);
                }
            },

            doesPreviousAndCurrentTypeConflict: function (currentTypeVO, previousTypeVO) {
                return currentTypeVO && previousTypeVO && currentTypeVO.getId() !== previousTypeVO.getId();
            },

            setChangeType: function (type) {

                this.changeType = type;
            },

            addPriceConflictVOToConflictsFound: function (conflictsFound) {

                var price = bmc.support.GlobalConstants.PRICE,
                    conflictVO = new ConflictVO();

                conflictVO.setType(price);
                conflictVO.setCurrentValue(price);
                conflictVO.setPreviousValue(price);
                conflictVO.setSectionType(price);

                conflictsFound.unshift(conflictVO);
            },

            hasBaseVehicleChanged: function (activeConfigurationVO) {
                var previousConfigurationVO = activeConfigurationVO.getPreviousConfigurationVO();
                return activeConfigurationVO.getBaseVehicleVO() !== previousConfigurationVO.getBaseVehicleVO();
            }
        },
        {
            NAME: 'ConfigurationConflictProxy'
        }
    )
        ;
})
;