define([
    'view/components/ConfigurableItemPanel',
    'support/ConfigurableType',
    'support/HTMLAttributes',
    'support/NotificationNames'
], function () {
    'use strict';
    var ConfigurableItemPanel = arguments[0],
        ConfigurableType = arguments[1],
        HTMLAttributes = arguments[2],
        NotificationNames = arguments[3];

    return puremvc.define({
            name: 'bmc.view.mediators.ConfigurableItemPanelMediator',
            parent: puremvc.Mediator,

            constructor: function () {

                var self = this;

                function buildViewComponent() {
                    return new ConfigurableItemPanel('#' + HTMLAttributes.OPTION_PACK_AND_ACCESSORIES);
                }

                puremvc.Mediator.call(this, self.constructor.NAME, buildViewComponent());
            }
        },
        {
            onRegister: function () {
                this.addViewComponentListeners();
            },

            listNotificationInterests: function () {

                return [
                    NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE,
                    NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE
                ];
            },

            handleNotification: function (note) {

                this.data = note.getBody();
                this.getViewComponent().setData(this.data);
            },

            setIsSectionOfInterest: function (section) {
                this.isSectionOfInterest = ConfigurableType.ACCESSORIES === section;
            },

            addViewComponentListeners: function () {

                var self = this,
                    viewComponent = this.getViewComponent();

                function handleViewComponent(event, data) {
                    self.handleViewComponentEvents(event, data);
                }

                viewComponent.onItemSelected = handleViewComponent;
            },

            handleViewComponentEvents: function (event, data) {
                var notificationName = (event.type !== this.getViewComponent().constructor.CAROUSEL_UPDATED) ?
                    NotificationNames.CONFIGURABLE_ITEM_SELECTION : NotificationNames.CAROUSEL_UPDATED;

                this.sendNotification(notificationName, data);
            }
        },
        {
            NAME: 'ConfigurableItemPanelMediator'
        }
    );
})
;
