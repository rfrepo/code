define([
    '../../../core/controller/command/PrepareSectionCarouselContentCommand',
    'controller/support/PrepareSectionConfigurableItemUIVOs/CreateGradesConfigurableItemUIVOsStrategy'
],
    function () {
        'use strict';

        var PrepareSectionCarouselContentCommand = arguments[0];

        return puremvc.define({
                name: 'bmc.controller.command.PrepareSectionCarouselContentCommand',
                parent: PrepareSectionCarouselContentCommand
            },
            {
                createStrategy: function (note) {

                    var StrategyClass,
                        currentSection = this.getCurrentSection(),
                        strategyPackage = bmc.controller.support.PrepareSectionConfigurableItemUIVOs;

                    if (currentSection === bmc.support.GlobalConfig.getInstance().SUMMARY) {
                        StrategyClass = undefined;
                    }
                    else if (currentSection === bmc.support.ConfigurableType.GRADE ||
                        currentSection === bmc.support.ConfigurableType.ENGINE) {
                        StrategyClass = strategyPackage.CreateGradesConfigurableItemUIVOsStrategy;
                    }
                    else if (currentSection === bmc.support.ConfigurableType.ACCESSORIES) {
                        StrategyClass = strategyPackage.CreateAccessoriesConfigurableItemUIVOsStrategy;
                    }
                    else if (currentSection === bmc.support.ConfigurableType.WHEEL) {
                        StrategyClass = strategyPackage.CreateWheelConfigurableItemUIVOsStrategy;
                    }
                    else {
                        StrategyClass = strategyPackage.CreateConfigurableItemUIVOsStrategy;
                    }

                    return StrategyClass ? new StrategyClass(this, note) : false;
                }
            }
        );
    });