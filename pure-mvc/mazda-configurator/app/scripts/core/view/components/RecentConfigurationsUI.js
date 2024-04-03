define([
    'jquery',
    'support/HTMLTemplate',
    'support/HTMLTemplateURL',
    'support/HTMLAttributes',
    'view/components/HTMLComponentUI'
], function () {
    'use strict';
    var HTMLTemplate = arguments[1],
        HTMLTemplateURL = arguments[2],
        HTMLAttributes = arguments[3],
        HTMLComponentUI = arguments[4];


    return puremvc.define({
            name: 'bmc.view.components.RecentConfigurationsUI',
            parent: HTMLComponentUI,
            constructor: function (parentSelector) {
                this.userConfigurations = [];

                HTMLComponentUI.call(this,
                    '.' + HTMLAttributes.RECENT_CONFIG_CONTAINER_CLASS,
                    parentSelector,
                    HTMLTemplateURL.RECENT_CONFIGURATIONS_UI);
            }
        },
        {
            isCanvasSupported: function () {
                var elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            },

            createTemplateData: function (configurations) {
                var self = this,
                    globalConfig = bmc.support.GlobalConfig.getInstance(),
                    numberOfConfigurations = configurations.length,
                    vehicles = [],
                    i,
                    userConfig;

                self.userConfigurations = configurations;

                for (i = 0; i < numberOfConfigurations; i++) {
                    userConfig = self.userConfigurations[i];

                    vehicles.push({
                        vehicleId: userConfig.getId(),
                        vehicleDataName: userConfig.getVehicleId(),
                        vehicleNiceName: globalConfig.LANGUAGE[userConfig.getVehicleId()],
                        imageUrl: this.getImageUrl(userConfig)
                    });
                }

                return {
                    items: vehicles
                };
            },

            getImageUrl: function (userConfig) {
                return this.isCanvasSupported() ? userConfig.getImageUrl() :
                    bmc.support.GlobalConfig.getInstance().DEFAULT_MODEL_THUMBNAILS[userConfig.getVehicleId()];
            },

            getConfigurationById: function (id) {
                var numberOfConfigurations = this.userConfigurations.length,
                    config;

                while (numberOfConfigurations--) {
                    config = this.userConfigurations[numberOfConfigurations];

                    if (config.getId() === id) {
                        return config;
                    }
                }

                return null;
            },

            renderVehicles: function (configurations) {
                var self = this,
                    html = HTMLTemplate.getSynchronously(
                        HTMLTemplateURL.RECENT_CONFIGURATION_UI),
                    data = self.createTemplateData(configurations);

                self.clearVehicles();

                if (data.items.length === 0) {
                    return;
                }

                jQuery(self.getSelector() + ' .recent-config').append(_.template(html, data));
                self.setupComponentEvents();
            },

            setupComponentEvents: function () {
                var self = this;

                jQuery(self.getVehiclesSelector()).click(function (jQueryEvent) {
                    if (self.onSelected) {
                        self.onSelected(self.getConfigurationById(jQueryEvent.currentTarget.id));
                    }
                });
            },

            getVehiclesSelector: function () {
                return this.getSelector() +
                    ' .' + HTMLAttributes.RECENT_CONFIGURATION;
            },

            clearVehicles: function () {
                var self = this;

                jQuery(self.getVehiclesSelector()).each(function (index, element) {
                    jQuery(element).remove();
                });
            },

            onSelected: undefined
        },
        {});
});