define(['model/support/sectionData/factory/PriceCalculatorDelegateFactory',
    'model/proxy/ActiveConfigurationProxy'],
    function () {
        'use strict';
        var PriceCalculatorDelegateFactory = arguments[0];


        return puremvc.define({
                name: 'bmc.controller.command.SetPriceOnConfigurableItemsVOsCommand',
                parent: puremvc.SimpleCommand
            },
            {
                execute: function (note) {

                    var configurableItemVOs = this.ensureDataIsAnArray(note.getBody());
                    this.setPricesOnConfigurableItemVOs(configurableItemVOs);
                },

                setPricesOnConfigurableItemVOs: function (configurableItemVOs) {

                    var type = configurableItemVOs[0].getType(),
                        delegateFactory = this.createPriceCalculatorDelegateFactory(),
                        delegate = delegateFactory.createStrategy(type, this);

                    delegate.setData(configurableItemVOs);

                    return delegate.calculatePrice();
                },

                createPriceCalculatorDelegateFactory: function () {
                    return new PriceCalculatorDelegateFactory();
                },

                ensureDataIsAnArray: function (data) {
                    return (!(data instanceof Array)) ? [data] : data;
                }
            }
        );
    });