define([
    'view/components/support/ConfigurableItemSpecificationsUI',
    'support/HTMLAttributes',
    'view/components/HTMLComponentUI',
    'view/components/support/Carousel',
    'support/HTMLTemplateURL'
], function () {
    'use strict';

    puremvc.define({
            name: 'bmc.view.components.support.SectionContent.EngineContentStrategy',
            constructor: function () {
                this.createConfigurableItemSpecificationsUI('#' + bmc.support.HTMLAttributes.SECTION_CONTENT_ID);
            }
        },
        {
            createConfigurableItemSpecificationsUI: function (parentSelector) {

                this.specificationUI = new bmc.view.components.support.ConfigurableItemSpecificationsUI(parentSelector);
                this.specificationUI.setCellRendererTemplateURL(bmc.support.HTMLTemplateURL.ENGINE_ROW_ACCORDION);
            },

            display: function (sectionDataVO) {

                this.sectionDataVO = sectionDataVO;
                this.engineVOs = sectionDataVO.getSectionData();

                if (this.enginesHaveSpecificationData()) {
                    this.specificationUI.render(this.createSectionData());
                } else {
                    this.specificationUI = undefined;
                }
            },

            enginesHaveSpecificationData: function () {

                return _.find(this.engineVOs, function (engineVO) {
                    return engineVO.getSpecifications() && engineVO.getSpecifications().specs.length > 0;
                });
            },

            createSectionData: function () {
                return {
                    sections: [this.getEngineTechnicalData()]
                };
            },

            getEngineTechnicalData: function () {

                var self = this,
                    specificationSectionName = this.engineVOs[0].getSpecifications().name;

                return {
                    title: specificationSectionName,
                    table: {
                        rows: self.createRowsOfEngineSpecification()
                    }
                };
            },

            createRowsOfEngineSpecification: function () {

                var self = this,
                    rows = [],
                    specifications = this.getAllSpecificationValues(),
                    numOfEngines = this.getLargestSpecificationColumn(specifications);


                _.each(specifications, function (specificationRowArray, specificationName) {
                    rows = rows.concat(self.createRowsForSingleSpecification(
                        specificationName, specificationRowArray, numOfEngines));
                });

                rows.sort(function (a, b) {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (b.title < a.title) {
                        return 1;
                    }
                    return 0;
                });

                return rows;
            },

            createRowsForSingleSpecification: function (specificationName, specificationArray, numOfEngines) {
                var self = this,
                    largestColumn,
                    i, j,
                    row,
                    rows = [];

                largestColumn = this.getLargestSpecificationColumn(specificationArray);

                for (i = 0; i < largestColumn; i++) {
                    row = [];

                    for (j = 0; j < numOfEngines; j++) {

                        row.push(self.getReadableSpecificationValue(specificationArray[j], i));
                    }

                    rows.push({title: specificationName, values: row});
                }

                return rows;
            },

            getLargestSpecificationColumn: function (specificationArray) {
                var largestColumn = 0;

                _.each(specificationArray, function (column) {
                    var columnLength = column.length;

                    if (columnLength > largestColumn) {
                        largestColumn = columnLength;
                    }
                });

                return largestColumn;
            },

            getReadableSpecificationValue: function (specificationRow, index) {
                return specificationRow ? specificationRow[index] : '';
            },

            getAllSpecificationValues: function () {
                var self = this,
                    specificationsObject = {},
                    i = 0;

                _.each(this.engineVOs, function (engineVO) {
                    _.each(engineVO.getSpecifications().specs, function (specification) {
                        var groupName = '', specName;

                        if (specification.group) {
                            groupName = ' ' + specification.group;
                        }

                        specName = specification.name + groupName;

                        if (!specificationsObject.hasOwnProperty(specName)) {
                            specificationsObject[specName] = [];
                        }

                        if (specificationsObject[specName][i] === undefined) {
                            specificationsObject[specName][i] = [];
                        }

                        specificationsObject[specName][i].push(self.getSpecificationValue(specification));
                    });

                    i += 1;
                });

                return specificationsObject;
            },

            getSpecificationValue: function (specification) {
                return specification.value + ' ' + specification.unit.replace(/ /g, '');
            },

            updateView: function (positionData) {
                if (this.enginesHaveSpecificationData()) {
                    this.specificationUI.scrollTo(positionData);
                }
            },

            positionSelectedAccordionHeaderTopOfScrollableArea: function (event) {
                $('html, body').animate({scrollTop: jQuery(event.target).offset().top - 350}, 400);
            },

            cleanup: function () {
                if (this.enginesHaveSpecificationData()) {
                    this.specificationUI.cleanup();
                }
            }
        });
});
