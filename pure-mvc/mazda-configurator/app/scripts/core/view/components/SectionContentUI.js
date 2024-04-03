define([
    'view/components/support/SectionContent/GradeContentStrategy',
    'view/components/support/SectionContent/EngineContentStrategy',
    'view/components/support/SectionContent/AccessoryContentStrategy',
    'view/components/support/SectionContent/NullContentStrategy',
    'support/ConfigurableType'
], function () {
    'use strict';
    var ConfigurableType = arguments[4];

    return puremvc.define({
            name: 'bmc.view.components.SectionContentUI',
            constructor: function (parentSelector) {

                this.parentSelector = parentSelector;
                this.strategyCache = {};
                this.disclaimerUI = jQuery('#' + bmc.support.HTMLAttributes.SECTION_DISCLAIMER_ID);
            }
        },
        {
            displayContent: function (data) {

                this.displayMainSectionContent(data);
                this.displayDisclaimerContent(data);
            },

            displayMainSectionContent: function (data) {

                this.currentStrategyName = data.getSectionName();
                this.setContentDisplayStrategy(data.getSectionName());
                this.contentDisplayStrategy.display(data);
            },

            removePreviousContent: function () {

                if (this.contentDisplayStrategy) {
                    this.contentDisplayStrategy.cleanup();
                }
            },

            setContentDisplayStrategy: function (sectionName) {

                if (!this.strategyCache[sectionName]) {
                    this.strategyCache[sectionName] = this.createContentStrategy(sectionName);
                }

                this.contentDisplayStrategy = this.strategyCache[sectionName];
            },

            createContentStrategy: function (sectionName) {

                var StrategyClass,
                    StrategyPackage = bmc.view.components.support.SectionContent;

                if (sectionName === ConfigurableType.GRADE) {

                    StrategyClass = StrategyPackage.GradeContentStrategy;

                } else if (sectionName === ConfigurableType.ENGINE) {

                    StrategyClass = StrategyPackage.EngineContentStrategy;

                } else if (sectionName === ConfigurableType.ACCESSORIES) {

                    StrategyClass = StrategyPackage.AccessoryContentStrategy;
                }
                else {
                    StrategyClass = StrategyPackage.NullContentStrategy;
                }

                return new StrategyClass();
            },

            getCurrentStrategyName: function () {
                return this.currentStrategyName;
            },

            displayDisclaimerContent: function (data) {

                this.disclaimerUI.parent().append(this.disclaimerUI);
                this.disclaimerUI.html(data.getDisclaimer());
            }
        }
    );
});