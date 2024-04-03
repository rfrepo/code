define([
    'controller/support/PrepareSectionConfigurableItemUIVOs/CreateConfigurableItemUIVOsStrategy',
    'controller/support/PrepareSectionConfigurableItemUIVOs/CreateWheelConfigurableItemUIVOsStrategy',
    'controller/support/PrepareSectionConfigurableItemUIVOs/CreateAccessoriesConfigurableItemUIVOsStrategy'
],
    function () {
        'use strict';

        return puremvc.define({
                name: 'bmc.controller.command.PrepareSectionCarouselContentCommand',
                parent: puremvc.SimpleCommand
            },
            {
                execute: function (note) {

                    var strategy = this.createStrategy(note);

                    if (strategy) {
                        strategy.createAndDispatchConfigurableItemUIVOs();
                    }
                },

                createStrategy: function (note) {

                    var StrategyClass,
                        currentSection = this.getCurrentSection(),
                        strategyPackage = bmc.controller.support.PrepareSectionConfigurableItemUIVOs;

                    if (currentSection === bmc.support.GlobalConfig.getInstance().SUMMARY) {
                        StrategyClass = undefined;
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
                },

                getCurrentSection: function () {

                    var navigationProxy = this.facade.retrieveProxy(bmc.model.proxy.NavigationProxy.NAME),
                        currentSection = navigationProxy.getActiveSectionVO() ?
                            navigationProxy.getActiveSectionVO().getType() : bmc.support.ConfigurableType.GRADE;

                    return currentSection;
                }
            }
        );
    });