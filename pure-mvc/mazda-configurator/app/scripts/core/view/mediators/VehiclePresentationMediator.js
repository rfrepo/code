define([
    'view/components/VehiclePresentationUI',
    'support/NotificationNames',
    'support/ConfigurableType',
    'support/HTMLAttributes'
], function () {
    'use strict';
    var VehiclePresentationUI = arguments[0],
        NotificationNames = arguments[1],
        HTMLAttributes = arguments[3];


    return puremvc.define({
            name: 'bmc.view.mediators.VehiclePresentationMediator',
            parent: puremvc.Mediator,

            constructor: function () {
                function buildViewComponent() {
                    

                    return new VehiclePresentationUI(
                        '#' + HTMLAttributes.CONFIGURATOR_CONTAINER_ID);
                }

                puremvc.Mediator.call(this,
                    bmc.view.mediators.VehiclePresentationMediator.NAME,
                    buildViewComponent());
            }
        },
        {
            onRegister: function () {
                var self = this;

                self.getViewComponent().allImagesLoaded = function () {
                    self.sendNotification(NotificationNames.VEHICLE_PRESENTATION_LOADED);
                };
            },

            listNotificationInterests: function () {
                return [NotificationNames.VEHICLE_PRESENTATION_UPDATE,
                    NotificationNames.ACTIVE_SECTION_UPDATED,
                    NotificationNames.VIEW_SCROLL_UPDATED
                ];
            },

            handleNotification: function (note) {

                var noteName = note.getName(),
                    noteBody = note.getBody(),
                    viewComponent = this.getViewComponent();

                if (noteName === NotificationNames.VEHICLE_PRESENTATION_UPDATE) {
                    viewComponent.updateView(noteBody);
                }
                else if (noteName === NotificationNames.ACTIVE_SECTION_UPDATED) {
                    viewComponent.updateState(noteBody);
                }
                else if (noteName === NotificationNames.VIEW_SCROLL_UPDATED) {
                    viewComponent.scaleImage(noteBody);
                }
            }
        },
        {
            NAME: 'VehiclePresentationMediator'
        }
    );
});