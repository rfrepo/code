define([
    'support/NotificationNames',
    'view/components/ApplicationUI',
    'controller/command/RequestPDFDataCommand'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        ApplicationUI = arguments[1],
        RequestPDFDataCommand = arguments[2];

    return puremvc.define({
            name: 'bmc.view.mediators.ApplicationMediator',
            parent: puremvc.Mediator,
            constructor: function () {
                puremvc.Mediator.call(this,
                    this.constructor.NAME,
                    new ApplicationUI());
            }
        },
        {
            onRegister: function () {
                var self = this;

                self.getViewComponent().onViewScrollUpdated = function (eventData) {
                    self.sendNotification(NotificationNames.VIEW_SCROLL_UPDATED, eventData);
                };

                self.getViewComponent().initialise();

                self.getFacade().registerCommand(NotificationNames.GET_PDF,
                    RequestPDFDataCommand);
            },

            listNotificationInterests: function () {
                return [
                    NotificationNames.SHOW_SUMMARY_PAGE,
                    NotificationNames.HIDE_SUMMARY_PAGE,
                    NotificationNames.ACTIVE_SECTION_UPDATED
                ];
            },

            handleNotification: function (note) {
                

                switch (note.getName()) {

                case NotificationNames.SHOW_SUMMARY_PAGE:
                    this.getViewComponent().showSummary();
                    break;

                case NotificationNames.HIDE_SUMMARY_PAGE:
                    this.getViewComponent().hideSummary();
                    break;

                case NotificationNames.ACTIVE_SECTION_UPDATED:
                    this.getViewComponent().handleActiveSectionUpdated(note.getBody());
                    break;
                }
            }
        },
        {
            NAME: 'ApplicationMediator'
        }
    );
});