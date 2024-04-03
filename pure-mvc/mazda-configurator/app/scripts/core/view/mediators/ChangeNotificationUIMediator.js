define([
    'view/components/ChangeNotificationUI',
    'support/NotificationNames'
], function () {
    'use strict';
    var ChangeNotificationUI = arguments[0],
        NotificationNames = arguments[1];


    return puremvc.define({
            name: 'bmc.view.mediators.ChangeNotificationUIMediator',
            parent: puremvc.Mediator,
            constructor: function () {
                function buildViewComponent() {
                    var HTMLAttributes = bmc.support.HTMLAttributes;

                    return new ChangeNotificationUI(
                        '.' + HTMLAttributes.CHANGE_ALERT_CONTAINER_CLASS);
                }

                puremvc.Mediator.call(this,
                    this.constructor.NAME,
                    buildViewComponent());
            }
        },
        {
            onRegister: function () {
                this.getViewComponent().render();
                this.addViewComponentListener();
            },

            addViewComponentListener: function () {
                var self = this;

                self.getViewComponent().onUndoClicked = function () {
                    self.sendNotification(NotificationNames.UNDO_CHANGE);
                };
            },

            listNotificationInterests: function () {
                return [
                    NotificationNames.CONFLICTS_FOUND,
                    NotificationNames.NO_CONFLICTS_FOUND,
                    NotificationNames.NAVIGATION_ITEM_SELECTED
                ];
            },

            handleNotification: function (note) {
                var noteName = note.getName();

                if (noteName === NotificationNames.CONFLICTS_FOUND &&
                    note.getType() !== NotificationNames.NOTIFICATION_TYPE_RESTORE) {
                    this.getViewComponent().show(note.getBody());

                } else {
                    this.getViewComponent().hide();

                }
            }
        },
        {
            NAME: 'ChangeNotificationUIMediator'
        }
    );
});