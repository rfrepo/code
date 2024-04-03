define([
    'jquery',
    'jqueryui',
    'easing',
    'view/components/HTMLComponentUI',
    'support/HTMLAttributes',
    'support/HTMLTemplateURL',
    'support/NotificationNames'
], function () {
    'use strict';
    var HTMLComponentUI = arguments[3],
        HTMLAttributes = arguments[4],
        NotificationNames = arguments[6];

    return puremvc.define({
            name: 'bmc.view.components.MainConfiguratorHTMLUI',
            parent: HTMLComponentUI,

            constructor: function (parentSelector) {

                this.notificationsSeen = [];

                HTMLComponentUI.call(this,
                    '#' + HTMLAttributes.CONFIGURATOR_CONTAINER_ID,
                    parentSelector
                );
            }
        },
        {
            processNotifications: function (note, listNotificationInterests) {
                for (var i = 0; i < listNotificationInterests.length; i++) {
                    if (note.getName() === listNotificationInterests[i]) {
                        this.notificationsSeen[i] = 'seen';
                    }
                }

                if (this.allNotificationsSeen(this.notificationsSeen, listNotificationInterests)) {
                    this.postRenderJqueryCalls();
                }

                if (note.getName() === NotificationNames.ACTIVE_SECTION_UPDATED) {
                    this.postRenderJqueryCalls();
                }
            },

            allNotificationsSeen: function (notificationsSeen, listNotificationInterests) {
                var count = 0,
                    i,
                    length = notificationsSeen.length;

                for (i = 0; i < length; i++) {
                    if (notificationsSeen[i] === 'seen') {
                        count += 1;
                    }
                }

                return (count === listNotificationInterests.length);
            },

            postRenderJqueryCalls: function () {
                if (!this.jQueryMethodsCalled) {
                    jQuery(' #' + HTMLAttributes.NAVIGATION_CONTAINER_ID).tabs();
                    this.jQueryMethodsCalled = true;
                }
            }
        });
});
