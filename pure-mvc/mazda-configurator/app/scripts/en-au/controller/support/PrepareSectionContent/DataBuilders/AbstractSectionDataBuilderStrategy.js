define([
    '../../../../../core/controller/support/PrepareSectionContent/DataBuilders/AbstractSectionDataBuilderStrategy',
    'model/proxy/data/DisclaimerProxy',
    'model/proxy/ActiveConfigurationProxy'
],
    function () {
        'use strict';
        var AbstractSectionDataBuilderStrategy = arguments[0],
            DisclaimerProxy = arguments[1],
            ActiveConfigurationProxy = arguments[2];

        return puremvc.define({
                name: 'bmc.controller.support.PrepareSectionContent.DataBuilders.' +
                    'AbstractSectionDataBuilderStrategy',
                parent: AbstractSectionDataBuilderStrategy
            },
            {
                getDisclaimer: function () {
                    var disclaimers,
                        activeConfiguration = this.getProxy(ActiveConfigurationProxy.NAME).getSimplified();

                    disclaimers =
                        this.getProxy(DisclaimerProxy.NAME).getDisclaimersByActiveConfiguration(activeConfiguration);
                    disclaimers.section = [];
                    disclaimers.section.push(this.getProxy(this.currentSection).getDisclaimer());

                    return disclaimers;

                }
            }
        );
    }
);