define(['controller/support/PrepareSectionConfigurableItemUIVOs/AbstractCreateConfigurableItemUIVOsStrategy',
    'model/proxy/data/AccessoriesProxy',
    'model/proxy/data/OptionPackProxy',
    'model/support/DependencyStepper'
], function () {
    'use strict';
    var AbstractCreateConfigurableItemUIVOsStrategy = arguments[0],
        AccessoriesProxy = arguments[1],
        OptionPackProxy = arguments[2],
        DependencyStepper = arguments[3];

    puremvc.define({
            name: 'bmc.controller.support.PrepareSectionConfigurableItemUIVOs.' +
                'CreateAccessoriesConfigurableItemUIVOsStrategy',
            parent: AbstractCreateConfigurableItemUIVOsStrategy,
            constructor: function (host, data) {

                AbstractCreateConfigurableItemUIVOsStrategy.call(this, host, data);
                this.initialiseVariables();
            }
        },
        {
            initialiseVariables: function () {

                this.accessoryVOsOnActiveConfiguration = this.getActiveConfigurationVO().getAccessoryVOs();
                this.optionPackVOsOnActiveConfiguration = this.getActiveConfigurationVO().getOptionPackVOs();
            },

            createAndDispatchConfigurableItemUIVOs: function () {

                this.configurableItemVOs = this.getSectionConfigurableItemVOs();
                this.sendNotification();
                this.configurableItemVOs = null;
            },

            getSectionConfigurableItemVOs: function () {

                var configurableItemVOs,
                    accessoriesVOs = this.host.facade.retrieveProxy(AccessoriesProxy.NAME).getData(),
                    optionPackVOs = this.host.facade.retrieveProxy(OptionPackProxy.NAME).getData();

                configurableItemVOs = this.configureConfigurableItemVOs(accessoriesVOs.concat(optionPackVOs));

                return this.getConfigurableItemsVOsCompatibleWithCurrentConfiguration(configurableItemVOs);
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


            configureConfigurableItemUIVO: function (configurableItemUIVO, configurableItemVO) {

                this.setFormattedPriceText.call(this, configurableItemUIVO, configurableItemVO);
                this.setThumbnailURL.call(this, configurableItemUIVO, configurableItemVO);
                this.setSelected(configurableItemUIVO, configurableItemVO);
                this.setCallToActionText(configurableItemUIVO);
            },

            setSelected: function (configurableItemUIVO, configurableItemVO) {
                configurableItemUIVO.setSelected(this.isVOOnActiveConfiguration(configurableItemVO));
            },

            setCallToActionText: function (configurableItemUIVO) {

                var callToActionText = configurableItemUIVO.getSelected() ?
                    bmc.support.GlobalConfig.getInstance().LANGUAGE.REMOVE :
                    bmc.support.GlobalConfig.getInstance().LANGUAGE.ADD;

                configurableItemUIVO.setCallToActionText(callToActionText);
            },

            isVOOnActiveConfiguration: function (configurableItemVO) {
                var accessoriesAndOptionPacks = this.accessoryVOsOnActiveConfiguration.concat(
                    this.optionPackVOsOnActiveConfiguration);
                return _.findWhere(accessoriesAndOptionPacks, {id: configurableItemVO.getId()});
            }
        });
});