define([
    'view/components/ConfigurableItemCarousel',
    'support/HTMLAttributes',
    'support/NotificationNames'
], function () {
    'use strict';
    var ConfigurableItemCarousel = arguments[0],
        HTMLAttributes = arguments[1],
        NotificationNames = arguments[2];

    return puremvc.define({
            name: 'bmc.view.mediators.ConfigurableItemCarouselMediator',
            parent: puremvc.Mediator,

            constructor: function () {
                var self = this;

                function buildViewComponent() {

                    return new ConfigurableItemCarousel(
                        '#' + HTMLAttributes.CONFIGURABLE_ITEM_CAROUSEL_ID +
                            ' .' + HTMLAttributes.CAR_OPTIONS_CLASS + ' .' + HTMLAttributes.CAROUSEL_ITEMS_CLASS);
                }

                puremvc.Mediator.call(this,
                    self.constructor.NAME,
                    buildViewComponent());
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

                if (note.getName() === NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE) {
                    this.getViewComponent().setData(note.getBody());
                }
                else if (note.getName() === NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE) {
                    this.getViewComponent().updateUI(note.getBody());
                }
            },

            addViewComponentListeners: function () {

                var self = this,
                    viewComponent = this.getViewComponent();

                function handleViewComponent(event, data) {
                    self.handleViewComponentEvents(event, data);
                }

                viewComponent.onItemSelected =
                    viewComponent.onCarouselUpdate = handleViewComponent;
            },

            handleViewComponentEvents: function (event, data) {

                var notificationName = (event.type !== this.getViewComponent().constructor.CAROUSEL_UPDATED) ?
                        NotificationNames.CONFIGURABLE_ITEM_SELECTION : NotificationNames.CAROUSEL_UPDATED;

                this.sendNotification(notificationName, data);
            }
        },
        {
            NAME: 'ConfigurableItemCarouselMediator'
        }
    );
});
