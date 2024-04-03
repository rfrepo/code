define([
    'support/NotificationNames',
    'support/HTMLAttributes',
    'view/components/VehicleDetailsUI',
    'view/mediators/PricePresentationMediator'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        HTMLAttributes = arguments[1],
        VehicleDetailsUI = arguments[2],
        PricePresentationMediator = arguments[3];


    return puremvc.define({
            name: 'bmc.view.mediators.VehicleDetailsMediator',
            parent: puremvc.Mediator,

            constructor: function () {
                var self = this;

                function buildViewComponent() {
                    

                    return new VehicleDetailsUI(
                        '.' + HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS);
                }

                puremvc.Mediator.call(this,
                    self.constructor.NAME,
                    buildViewComponent());
            }
        },
        {
            listNotificationInterests: function () {
                return [NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY];
            },

            handleNotification: function (note) {
                this.getViewComponent().render(note.getBody());

                this.getFacade().registerMediator(new PricePresentationMediator());
            }
        },
        {
            NAME: 'VehicleDetailsMediator'
        }
    );
});