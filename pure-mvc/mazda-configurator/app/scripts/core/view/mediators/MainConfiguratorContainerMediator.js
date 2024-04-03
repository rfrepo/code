define([
    'support/NotificationNames',
    'support/HTMLAttributes',
    'view/components/MainConfiguratorHTMLUI',
    'jquery'

], function () {
    'use strict';
    var NotificationNames = arguments[0],
        HTMLAttributes = arguments[1],
        MainConfiguratorHTMLUI = arguments[2];


    return puremvc.define({
            name: 'bmc.view.mediators.MainConfiguratorContainerMediator',
            parent: puremvc.Mediator,

            constructor: function () {
                puremvc.Mediator.call(this,
                    bmc.view.mediators.MainConfiguratorContainerMediator.NAME,
                    new MainConfiguratorHTMLUI(
                        '#' + HTMLAttributes.CONFIGURATOR_CONTAINER_ID)
                );
            }
        },
        {
            onRegister: function () {
                this.getViewComponent().render();
            },

            listNotificationInterests: function () {
                return [
                    NotificationNames.INTERIOR_IMAGE_AVAILABLE,
                    NotificationNames.VEHICLE_IMAGE_AVAILABLE,
                    NotificationNames.ACTIVE_SECTION_UPDATED
                ];
            },

            handleNotification: function (note) {
                this.viewComponent.processNotifications(note, this.listNotificationInterests());
            }
        },
        {
            NAME: 'MainConfiguratorContainerMediator'
        }
    );
});