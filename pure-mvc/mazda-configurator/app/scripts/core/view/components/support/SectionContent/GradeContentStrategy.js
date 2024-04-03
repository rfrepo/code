define([
    'jqueryui',
    'support/HTMLAttributes',
    'view/components/HTMLComponentUI',
    'view/components/support/Carousel',
    'support/HTMLTemplateURL',
    'support/Accordion'
], function () {
    'use strict';
    var HTMLAttributes = arguments[1],
        HTMLComponentUI = arguments[2],
        HTMLTemplateURL = arguments[4],
        Accordion = arguments[5];

    puremvc.define({
            name: 'bmc.view.components.support.SectionContent.GradeContentStrategy',
            parent: HTMLComponentUI,
            constructor: function (parentSelector) {

                HTMLComponentUI.call(this,
                    '#' + HTMLAttributes.GRADE_SECTION_CONTENT_ID,
                    parentSelector,
                    HTMLTemplateURL.GRADE_SECTION_CONTENT_UI
                );
            }
        },
        {
            display: function (sectionDataVO) {

                this.sectionDataVO = sectionDataVO;
                this.standardFeaturesVOs = sectionDataVO.getSectionData();
                this.render({ standardFeatures: this.getStandardFeaturesDataForTemplate() });
                Accordion.setupAccordion({active: true});

                if (!this.animationProperties) {
                    this.setInitialVariables();
                }
            },

            getTableColumnsStore: function () {

                var columns = [];

                jQuery('.' + this.constructor.TABLE_CLASS).each(function () {
                    columns.push(jQuery(this));
                });

                return columns;
            },

            updateView: function (positionData) {

                var self = this;

                this.animationProperties.left = positionData.currentPosition -
                    this.constructor.COLUMN_WITH;

                _.each(this.tableColumnStore, function (tableColumn) {

                    tableColumn.stop(true, false);
                    tableColumn.animate(self.animationProperties, 350);
                });
            },

            getStandardFeaturesDataForTemplate: function () {
                var i,
                    featureStore = {},
                    totalStandardFeatures = this.standardFeaturesVOs.length;

                for (i = 0; i < totalStandardFeatures; i++) {
                    this.groupStandardFeatureByCategory(featureStore, this.standardFeaturesVOs[i]);
                }

                return this.extractStandardFeaturesAsList(featureStore);
            },

            groupStandardFeatureByCategory: function (store, standardFeatureVO) {

                var standardFeatureCategory = standardFeatureVO.getCategory(),
                    categoryList = store[standardFeatureCategory];

                if (!categoryList) {
                    categoryList = store[standardFeatureCategory] = [];
                }

                if (standardFeatureVO.isAvailableOnBodyStyle(
                    bmc.support.GlobalConfig.getInstance().getBodyStyleVO().getId())) {
                    categoryList.push(standardFeatureVO);
                }
            },

            extractStandardFeaturesAsList: function (featureStore) {

                var propName,
                    self = this,
                    categoryObject,
                    categoryObjectList = [];

                for (propName in featureStore) {

                    if (featureStore[propName]) {

                        categoryObject = {
                            name: propName,
                            features: self.createStandardFeatureGradeMatrix(featureStore[propName])
                        };

                        categoryObjectList.push(categoryObject);
                    }
                }

                categoryObjectList.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (b.name < a.name) {
                        return 1;
                    }
                    return 0;
                });

                return categoryObjectList;
            },

            createStandardFeatureGradeMatrix: function (standardFeatureVOs) {

                var i,
                    feature,
                    self = this,
                    features = [],
                    standardFeatureVO,
                    totalStandardFeatures = standardFeatureVOs.length;

                for (i = 0; i < totalStandardFeatures; i++) {

                    standardFeatureVO = standardFeatureVOs[i];

                    feature = {
                        name: standardFeatureVO.getName(),
                        stateOnGrade: self.getStandardFeatureStateOnGrade(standardFeatureVO)
                    };

                    features.push(feature);
                }

                features.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (b.name < a.name) {
                        return 1;
                    }
                    return 0;
                });

                return features;
            },

            getStandardFeatureStateOnGrade: function (standardFeatureVO) {

                var self = this,
                    stateOnGrade,
                    states = [],
                    globalConfig = bmc.support.GlobalConfig.getInstance();

                _.each(self.sectionDataVO.getGradeIds(), function (gradeId) {

                    if (standardFeatureVO.isStandardOnGrades(gradeId)) {

                        stateOnGrade = self.createStateOnGradeProperties(globalConfig.LANGUAGE.STANDARD, 2);
                    }
                    else if (standardFeatureVO.isOptionalOnGrades(gradeId)) {

                        stateOnGrade = self.createStateOnGradeProperties(globalConfig.LANGUAGE.OPTIONAL, 1);
                    } else {

                        stateOnGrade = self.createStateOnGradeProperties(globalConfig.LANGUAGE.NOT_AVAILABLE, 0);
                    }

                    states.push(stateOnGrade);
                });

                return states;
            },

            createStateOnGradeProperties: function (label, iconId) {

                return {
                    label: label,
                    iconId: iconId
                };
            },

            appendToDOM: function (html) {
                var target = jQuery('#' + HTMLAttributes.SECTION_CONTENT_ID);
                target.append(html);
            },

            cleanup: function () {

                this.tableColumnStore =
                    this.animationProperties = null;
                jQuery(this.getSelector()).remove();
            },

            getRawSelector: function () {
                return this.getSelector().substr(1);
            },

            setInitialVariables: function () {

                this.tableColumnStore = this.getTableColumnsStore();
                this.animationProperties = {left: 0};
            }
        },
        {
            TABLE_CLASS: 'state-table',
            COLUMN_WITH: 237
        });
});
