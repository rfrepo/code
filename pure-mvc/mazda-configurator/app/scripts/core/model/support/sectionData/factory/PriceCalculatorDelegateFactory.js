define(['model/support/SectionData/delegate/GradePriceCalculatorDelegate',
    'model/support/SectionData/delegate/EnginePriceCalculatorDelegate',
    'model/support/SectionData/delegate/DependencyPriceCalculatorDelegate',
    'support/ConfigurableType'], function () {
    'use strict';
    var ConfigurableType = arguments[3];

    return puremvc.define({
            name: 'bmc.model.support.sectionData.factory.PriceCalculatorDelegateFactory'
        },
        {
            createStrategy: function (delegateType, host) {

                var delegateInstance;

                if (delegateType === ConfigurableType.GRADE) {
                    delegateInstance =
                        new bmc.model.support.sectionData.delegate.GradePriceCalculatorDelegate(host);
                }
                else if (delegateType === ConfigurableType.ENGINE) {
                    delegateInstance =
                        new bmc.model.support.sectionData.delegate.EnginePriceCalculatorDelegate(host);
                }
                else {
                    delegateInstance =
                        new bmc.model.support.sectionData.delegate.DependencyPriceCalculatorDelegate(host);
                }

                return delegateInstance;
            }

        }
    );
});