define([
    'support/NotificationNames',
    'support/HTMLAttributes'
], function () {
    'use strict';
    var NotificationNames = arguments[0];


    puremvc.define({
            name: 'bmc.view.mediators.ConfigurableItemSpecificationsUIMediator',
            parent: puremvc.Mediator,
            constructor: function (viewComponent) {

                var mediatorName = this.constructor.NAME;
                puremvc.Mediator.call(this, mediatorName, viewComponent);
            }
        },
        {
            listNotificationInterests: function () {
                return [NotificationNames.CAROUSEL_UPDATED];
            },

            handleNotification: function (note) {
                this.viewComponent.updateView(note.getBody());
            }
        },
        {
            NAME: 'ConfigurableItemSpecificationsUIMediator'
        }
    );
});