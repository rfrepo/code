define([
    'support/NotificationNames',
    'support/HTMLAttributes',
    'view/components/RecentConfigurationsUI',
    'controller/command/UpdateUserConfigurationsCommand',
    'controller/command/LoadSavedConfigurationCommand'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        HTMLAttributes = arguments[1],
        RecentConfigurationsUI = arguments[2],
        UpdateUserConfigurationsCommand = arguments[3],
        LoadSavedConfigurationCommand = arguments[4];


    return puremvc.define({
            name: 'bmc.view.mediators.RecentConfigurationsMediator',
            parent: puremvc.Mediator,

            constructor: function () {
                var self = this;

                function buildViewComponent() {
                    

                    return new RecentConfigurationsUI(
                        '.' + HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS);
                }

                puremvc.Mediator.call(this,
                    self.constructor.NAME,
                    buildViewComponent());
            }
        },
        {
            onRegister: function () {
                var self = this;

                self.getFacade().registerCommand(NotificationNames.VEHICLE_PRESENTATION_LOADED,
                    UpdateUserConfigurationsCommand);
                self.getFacade().registerCommand(NotificationNames.LOAD_SAVED_CONFIGURATION,
                    LoadSavedConfigurationCommand);

                self.sendNotification(NotificationNames.REQUEST_USER_CONFIGURATIONS);
                self.getViewComponent().render({});
                self.setupComponentEvents();

            },

            setupComponentEvents: function () {
                var self = this;

                self.getViewComponent().onSelected = function (simpleConfig) {
                    self.sendNotification(NotificationNames.LOAD_SAVED_CONFIGURATION,
                        simpleConfig);
                };
            },

            listNotificationInterests: function () {
                return [NotificationNames.USER_CONFIGURATIONS_CHANGED];
            },

            handleNotification: function (note) {

                var self = this;
                self.getViewComponent().renderVehicles(note.getBody());
            }
        },
        {
            NAME: 'RecentConfigurationsMediator'
        }
    );
});