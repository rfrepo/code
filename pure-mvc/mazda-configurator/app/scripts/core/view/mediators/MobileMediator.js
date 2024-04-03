define([
    'support/NotificationNames',
    'support/HTMLAttributes',
    'support/ConfigurableType',
    'view/components/MobileUI',
    'model/vo/NavigationItemVO'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        ConfigurableType = arguments[2],
        MobileUI = arguments[3],
        NavigationItemVO = arguments[4];


    return puremvc.define({
            name: 'bmc.view.mediators.MobileMediator',
            parent: puremvc.Mediator,

            constructor: function () {
                puremvc.Mediator.call(this, this.constructor.NAME, new MobileUI());
            }
        },
        {
            onRegister: function () {
                this.getViewComponent().renderVehicleName();
                this.getViewComponent().setCurrent(ConfigurableType.GRADE);
                this.setupEventsOnViewComponent();
            },

            setupEventsOnViewComponent: function () {
                var self = this;

                this.getViewComponent().onSectionClick = function (section) {
                    if (section !== bmc.support.GlobalConfig.getInstance().SUMMARY) {
                        self.sendNotification(NotificationNames.NAVIGATION_ITEM_SELECTED,
                            new NavigationItemVO(section));
                    }
                };

                this.getViewComponent().onConfigurableItemSelected = function (configurableItemUIVO) {
                    self.sendNotification(bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION,
                        configurableItemUIVO.getConfigurableItemVO());
                };
            },

            listNotificationInterests: function () {

                return [
                    NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY,
                    NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE,
                    NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE,
                    NotificationNames.ACTIVE_CONFIGURATION_CHANGE,
                    NotificationNames.NON_MSC_CONFIGURATION_CHANGE,
                    NotificationNames.PRICE_UPDATED
                ];
            },

            handleNotification: function (note) {
                var noteBody = note.getBody();

                switch (note.getName()) {
                case NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY:
                    this.getViewComponent().renderGlobalBodyStyleName();
                    this.getViewComponent().setConfiguration(noteBody);
                    break;
                case NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE:
                    this.getViewComponent().renderSection(noteBody);
                    break;
                case NotificationNames.ACTIVE_CONFIGURATION_CHANGE:
                    this.getViewComponent().setConfiguration(noteBody);
                    break;
                case NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE:
                    this.getViewComponent().updateSection(noteBody);
                    break;
                case NotificationNames.NON_MSC_CONFIGURATION_CHANGE:
                    this.getViewComponent().setConfiguration(noteBody);
                    break;
                case NotificationNames.PRICE_UPDATED:
                    this.getViewComponent().renderPrice(noteBody);
                    break;
                }
            }
        },
        {
            NAME: 'MobileMediator'
        }
    );
});