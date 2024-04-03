define([
    'support/NotificationNames',
    'support/ConfigurableType',
    'model/support/DependencyStepper',
    'model/proxy/ActiveConfigurationProxy',
    'controller/support/PrepareSectionContent/DataBuilders/AbstractSectionDataBuilderStrategy'
], function () {
    'use strict';
    return puremvc.define({
            name: 'bmc.controller.support.PrepareSectionContent.DataBuilders.EngineSectionDataBuilderStrategy',
            parent: bmc.controller.support.PrepareSectionContent.DataBuilders.AbstractSectionDataBuilderStrategy,
            constructor: function (host) {
                this.host = host;
                bmc.controller.support.PrepareSectionContent.DataBuilders.AbstractSectionDataBuilderStrategy.call(
                    this, host, bmc.support.ConfigurableType.ENGINE);
            }
        },
        {
            generateContent: function () {

                this.superClass.generateContent.call(this);
                this.sectionDataVO.setSectionData(this.getConfiguredEngineVOs());

                this.host.sendNotification(bmc.support.NotificationNames.SECTION_DATA_AVAILABLE, this.sectionDataVO);
            },

            getConfiguredEngineVOs: function () {

                var engineVOs = this.getProxy(bmc.support.ConfigurableType.ENGINE).getData();

                engineVOs = this.filterEngineVOsByActiveBodyStyle(engineVOs);

                engineVOs = this.configureEngineVOsByPrice(engineVOs);

                engineVOs = this.sortEngineVOsByGrade(engineVOs);

                engineVOs = this.positionActiveItemToBeFirst(engineVOs);

                this.filterEngineVOsSpecificationsByActiveBodyStyle(engineVOs);

                return engineVOs;
            },


            filterEngineVOsByActiveBodyStyle: function (engineVOs) {


                var filteredEngineVOs = [],
                    dependencyStepper = bmc.model.support.DependencyStepper,
                    criteriaVO = this.getCriteria();

                _.each(engineVOs, function (engineVO) {

                    var availabilityPreconditions =
                        engineVO.getDependencies().getAvailabilityPrecondition();

                    if (dependencyStepper.isAvailable(criteriaVO, availabilityPreconditions)) {
                        filteredEngineVOs.push(engineVO);
                    }
                });

                return filteredEngineVOs;
            },

            configureEngineVOsByPrice: function (engineVOs) {

                this.host.sendNotification(bmc.support.NotificationNames.SET_PRICE_ON_CONFIGURABLE_ITEMS, engineVOs);
                return engineVOs;
            },

            sortEngineVOsByGrade: function (engineVOs) {


                var dependencyStepper = bmc.model.support.DependencyStepper,
                    criteriaVO = this.getCriteria();

                criteriaVO[bmc.support.ConfigurableType.GRADE] =
                    this.getActiveConfigurationVOAsValuePairObject()[bmc.support.ConfigurableType.GRADE];

                engineVOs = _.sortBy(engineVOs, function (engineVO) {

                    var availabilityPreconditions =
                        engineVO.getDependencies().getAvailabilityPrecondition();

                    if (dependencyStepper.isAvailable(criteriaVO, availabilityPreconditions)) {
                        return 0;
                    } else {
                        return 1;
                    }
                });

                return engineVOs;
            },

            positionActiveItemToBeFirst: function (engineVOs) {

                var activeEngineVO = this.getActiveEngineVO();

                engineVOs = _.without(engineVOs, _.findWhere(engineVOs,
                    {id: activeEngineVO.getId()}));

                engineVOs.unshift(activeEngineVO);

                return engineVOs;
            },

            filterEngineVOsSpecificationsByActiveBodyStyle: function (engineVOs) {

                var specifications,
                    activeBodyStyleSpecifications,
                    activeBodyStyleId = this.getCriteria().bodyStyle;

                _.each(engineVOs, function (engineVO) {

                    specifications = engineVO.getSpecifications();

                    if (Object.prototype.toString.call(specifications) === '[object Array]') {
                        activeBodyStyleSpecifications = _.find(specifications, function (spec) {
                            return spec.bodyStyle === String(activeBodyStyleId);
                        });

                        if (activeBodyStyleSpecifications) {
                            engineVO.setSpecifications(activeBodyStyleSpecifications);
                        }
                    }
                });
            },

            getCriteria: function () {

                var criteria = {},
                    GlobalConfig = bmc.support.GlobalConfig.getInstance(),
                    activeConfiguration = this.getActiveConfigurationVOAsValuePairObject(),
                    GlobalConstants = bmc.support.GlobalConstants;

                criteria[bmc.support.ConfigurableType.BODYSTYLE] =
                    activeConfiguration[bmc.support.ConfigurableType.BODYSTYLE];

                if (GlobalConfig.getDriveType()) {
                    criteria[GlobalConstants.DRIVETYPE] = GlobalConfig.getDriveType();
                }

                return criteria;
            },

            getActiveEngineVO: function () {
                return  this.getActiveConfigurationProxy().getEngine();
            },

            getActiveConfigurationVOAsValuePairObject: function () {
                return this.getActiveConfigurationVO().getTypeIdValuePairObjectFromCurrentItemVOs();
            },

            getActiveConfigurationProxy: function () {
                return this.getProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
            },

            getActiveConfigurationVO: function () {
                return this.getActiveConfigurationProxy().getSimplified();
            }
        }
    );
})
;