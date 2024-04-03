define([
    'support/NotificationNames',
    'support/HTMLAttributes',
    'view/components/PricePresentationUI',
    'controller/command/RequestPriceUpdateCommand'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        HTMLAttributes = arguments[1],
        PricePresentationUI = arguments[2];


    return puremvc.define({
            name: 'bmc.view.mediators.PricePresentationMediator',
            parent: puremvc.Mediator,

            constructor: function () {
                function buildViewComponent() {
                    

                    return new PricePresentationUI(
                        '.' + HTMLAttributes.VEHICLE_DETAILS_CLASS);
                }

                puremvc.Mediator.call(this,
                    bmc.view.mediators.PricePresentationMediator.NAME,
                    buildViewComponent());
            }
        },
        {
            onRegister: function () {
                this.getViewComponent().renderHTML();

                this.sendNotification(NotificationNames.REQUEST_PRICE_UPDATE);
            },

            listNotificationInterests: function () {
                return [
                    NotificationNames.PRICE_UPDATED
                ];
            },

            handleNotification: function (note) {
                this.getViewComponent().updatePrice(note.getBody());
            }
        },
        {
            NAME: 'PricePresentationMediator'
        }
    );
});