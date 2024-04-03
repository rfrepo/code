define([
    'support/NotificationNames',
    'support/ConfigurableType',
    'model/proxy/data/BaseVehiclesProxy',
    'model/proxy/data/StandardFeaturesProxy',
    'model/support/sectionData/delegate/GradeSectionDataBuilderDelegate',
    'controller/support/PrepareSectionContent/DataBuilders/AbstractSectionDataBuilderStrategy',
    'model/vo/ConfigurableTypeIdsVO',
    'model/support/DependencyStepper',
    'model/proxy/ActiveConfigurationProxy'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        ConfigurableType = arguments[1],
        BaseVehiclesProxy = arguments[2],
        StandardFeaturesProxy = arguments[3],
        GradeSectionDataBuilderDelegate = arguments[4],
        AbstractSectionDataBuilderStrategy = arguments[5],
        ConfigurableTypeIdsVO = arguments[6],
        DependencyStepper = arguments[7],
        ActiveConfigurationProxy = arguments[8];

    return puremvc.define({
            name: 'bmc.controller.support.PrepareSectionContent.DataBuilders.GradeSectionDataBuilderStrategy',
            parent: AbstractSectionDataBuilderStrategy,
            constructor: function (host) {
                this.host = host;
                AbstractSectionDataBuilderStrategy.call(this, host, ConfigurableType.GRADE);
            }
        },
        {
            generateContent: function () {

                var superClass = AbstractSectionDataBuilderStrategy.prototype;
                superClass.generateContent.call(this, this.buildSectionData());

                this.sectionDataVO.setSectionData(this.buildSectionData());
                this.sectionDataVO.setGradeIds(this.getGradeIdsInOrderOfSelection());

                this.host.sendNotification(NotificationNames.SECTION_DATA_AVAILABLE, this.sectionDataVO);
            },

            buildSectionData: function () {

                var gradeSectionDataBuilder = new GradeSectionDataBuilderDelegate(this);
                return gradeSectionDataBuilder.buildData();
            },

            getBaseVehicleVOs: function () {
                return this.getProxy(BaseVehiclesProxy.NAME).getData();
            },

            getStandardFeatureVOs: function () {
                return this.getProxy(StandardFeaturesProxy.NAME).getStandardFeatureVOs();
            },

            getGradeIdsInOrderOfSelection: function () {

                var gradeIds,
                    currentGradeId = this.getProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME).getGrade().getId(),
                    gradeVOs = this.getAvailableGrades();

                gradeVOs = _(gradeVOs).sortBy(function (gradeIdVO) {
                    return gradeIdVO.getPrice();
                });

                gradeIds = _.map(gradeVOs, function (gradeIdVO) {
                    return gradeIdVO.getId();
                });

                gradeIds = _.without(gradeIds, currentGradeId);

                gradeIds.unshift(currentGradeId);

                return gradeIds;
            },

            getAvailableGrades: function () {
                var i,
                    availableGrades = [],
                    GlobalConfig = bmc.support.GlobalConfig.getInstance(),
                    GlobalConstants = bmc.support.GlobalConstants,
                    gradeAvailbilityConditions,
                    grade = ConfigurableType.GRADE,
                    gradeVOs = this.getProxy(grade).getData(),
                    numOfGrades = gradeVOs.length,
                    configurableTypeIdsVO = new ConfigurableTypeIdsVO();

                configurableTypeIdsVO[ConfigurableType.BODYSTYLE] = this.getProxy(ActiveConfigurationProxy.NAME)
                    .getBodyStyle().getId();

                if (GlobalConfig.getDriveType()) {
                    configurableTypeIdsVO[GlobalConstants.DRIVETYPE] = GlobalConfig.getDriveType();
                }

                for (i = 0; i < numOfGrades; i++) {
                    gradeAvailbilityConditions = gradeVOs[i].getDependencies().getAvailabilityPrecondition();

                    if (DependencyStepper.isAvailable(configurableTypeIdsVO, gradeAvailbilityConditions)) {
                        availableGrades.push(gradeVOs[i]);
                    }
                }

                return availableGrades;
            }
        }
    );
})
;