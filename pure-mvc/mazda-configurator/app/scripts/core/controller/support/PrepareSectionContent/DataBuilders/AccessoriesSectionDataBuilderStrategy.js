define(['support/NotificationNames',
    'model/proxy/data/AccessoriesProxy',
    'model/proxy/data/OptionPackProxy',
    'controller/support/PrepareSectionContent/DataBuilders/AbstractSectionDataBuilderStrategy',
    'model/support/DependencyStepper',
    'model/proxy/ActiveConfigurationProxy'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        AccessoriesProxy = arguments[1],
        OptionPackProxy = arguments[2],
        AbstractSectionDataBuilderStrategy = arguments[3],
        DependencyStepper = arguments[4],
        ActiveConfigurationProxy = arguments[5];

    return puremvc.define({
            name: 'bmc.controller.support.PrepareSectionContent.DataBuilders.AccessoriesSectionDataBuilderStrategy',
            parent: AbstractSectionDataBuilderStrategy,
            constructor: function (host, currentSection) {

                this.host = host;
                AbstractSectionDataBuilderStrategy.call(this, host, currentSection);
            }
        },
        {
            generateContent: function () {

                this.sectionDataVO.setSectionData(this.createMessageVO());
                this.sectionDataVO.setSectionName(this.currentSection);
                this.host.sendNotification(NotificationNames.SECTION_DATA_AVAILABLE, this.sectionDataVO);
            },

            createMessageVO: function () {

                var vo = {};
                vo.hasAccessoriesAndOptionPacks = this.doesCurrentVehicleHaveAccessoriesAndOpitonPacksAvailable();

                if (!vo.hasAccessoriesAndOptionPacks) {
                    vo.message = bmc.support.GlobalConfig.getInstance().LANGUAGE.NO_ACCESSORIES_AND_OPTIONPACKS_MESSAGE;
                }

                return vo;
            },

            doesCurrentVehicleHaveAccessoriesAndOpitonPacksAvailable: function () {
                return Boolean(this.getSectionConfigurableItemVOs().length);
            },

            getSectionConfigurableItemVOs: function () {

                var accessoriesVOs = this.host.facade.retrieveProxy(AccessoriesProxy.NAME).getData(),
                    optionPackVOs = this.host.facade.retrieveProxy(OptionPackProxy.NAME).getData();

                return this.getConfigurableItemsVOsCompatibleWithCurrentConfiguration(
                    accessoriesVOs.concat(optionPackVOs));
            },

            getConfigurableItemsVOsCompatibleWithCurrentConfiguration: function (configurableItemVOs) {

                var filteredConfigurableItemVOs = [],
                    availabilityPreconditions,
                    activeConfigurationValuePairs = this.getActiveConfigurationVOAsValuePairObject();

                _.each(configurableItemVOs, function (configurableItemVO) {

                    availabilityPreconditions = configurableItemVO.getDependencies().getAvailabilityPrecondition();

                    if (DependencyStepper.isAvailable(activeConfigurationValuePairs, availabilityPreconditions)) {
                        filteredConfigurableItemVOs.push(configurableItemVO);
                    }
                });

                return filteredConfigurableItemVOs;
            },

            getActiveConfigurationVO: function () {
                return this.host.facade.retrieveProxy(ActiveConfigurationProxy.NAME).getSimplified();
            },

            getActiveConfigurationVOAsValuePairObject: function () {
                return this.getActiveConfigurationVO().getTypeIdValuePairObjectFromCurrentItemVOs();
            }
        }
    );
});