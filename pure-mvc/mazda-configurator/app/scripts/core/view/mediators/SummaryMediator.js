define([
    'support/NotificationNames',
    'support/HTMLAttributes',
    'support/ConfigurableType',
    'view/components/SummaryUI',
    'model/vo/NavigationItemVO',
    'jqueryui'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        HTMLAttributes = arguments[1],
        ConfigurableType = arguments[2],
        SummaryUI = arguments[3],
        NavigationItemVO = arguments[4];


    return puremvc.define({
            name: 'bmc.view.mediators.SummaryMediator',
            parent: puremvc.Mediator,

            constructor: function () {

                var self = this;

                function buildViewComponent() {
                    return new SummaryUI('.' + HTMLAttributes.SECTION_CONTENT_CLASS);
                }

                puremvc.Mediator.call(this, self.constructor.NAME, buildViewComponent());
            }
        },
        {
            onRegister: function () {
                var self = this;

                self.getViewComponent().onEditConfigurationButtonClick = function () {

                    self.sendNotification(NotificationNames.HIDE_SUMMARY_PAGE);
                    self.sendNotification(NotificationNames.NAVIGATION_ITEM_SELECTED, new NavigationItemVO(
                        ConfigurableType.GRADE)
                    );
                };

                self.getViewComponent().getPDF = function () {
                    self.sendNotification(NotificationNames.GET_PDF);
                };

                self.getViewComponent().render();
            },

            listNotificationInterests: function () {
                return [NotificationNames.SHOW_SUMMARY_PAGE];
            },

            handleNotification: function (note) {
                this.getViewComponent().renderSections(note.getBody());
            }
        },
        {
            NAME: 'SummaryMediator'
        }
    );
});