define([
    'view/components/NavigationContainer',
    'support/NotificationNames',
    'support/HTMLAttributes'
], function () {
    'use strict';
    var NavigationContainer = arguments[0],
        NotificationNames = arguments[1],
        HTMLAttributes = arguments[2];


    return puremvc.define({
            name: 'bmc.view.mediators.NavigationContainerMediator',
            parent: puremvc.Mediator,
            constructor: function () {
                var mediatorName = bmc.view.mediators.NavigationContainerMediator.NAME,
                    viewComponent = this.buildViewComponent();

                puremvc.Mediator.call(this, mediatorName, viewComponent);

                this.addViewComponentListener();
            }
        },
        {
            listNotificationInterests: function () {
                return [
                    NotificationNames.NAVIGATION_DATA_AVAILABLE,
                    NotificationNames.NAVIGATION_ITEM_SELECTED,
                    NotificationNames.CONFIGURABLE_ITEM_UPDATED,
                    NotificationNames.ACTIVE_CONFIGURATION_CHANGE
                ];
            },

            handleNotification: function (note) {

                var activeConfiguration,
                    activeConfigurationSimplified;

                if (note.getName() === NotificationNames.NAVIGATION_ITEM_SELECTED ||
                    note.getName() === NotificationNames.CONFIGURABLE_ITEM_UPDATED) {
                    activeConfiguration = this.facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
                    activeConfigurationSimplified = activeConfiguration.getSimplified();
                    this.viewComponent.populateUpTo(note.getBody(), activeConfigurationSimplified);
                }
                else if (note.getName() === NotificationNames.NAVIGATION_DATA_AVAILABLE) {
                    this.viewComponent.setData(note.getBody());
                } else if (note.getName() === NotificationNames.ACTIVE_CONFIGURATION_CHANGE) {
                    this.viewComponent.populateUpTo({ type: this.getViewComponent().getType() }, note.getBody());
                }
            },

            buildViewComponent: function () {
                var parentDomId = '#' + HTMLAttributes.CONFIGURATOR_CONTAINER_ID;
                return new NavigationContainer(parentDomId);
            },

            addViewComponentListener: function () {
                var self = this;

                function eventHandler(data) {
                    self.sendNotification(NotificationNames.NAVIGATION_ITEM_SELECTED, data);
                }

                this.getViewComponent().onItemSelected = eventHandler;
            },

            handleViewComponentEvents: function (event, data) {
                this.sendNotification(NotificationNames.NAVIGATION_ITEM_SELECTED, data);
            }
        },
        {
            NAME: 'NavigationContainerMediator'
        }
    );
});