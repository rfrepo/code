define([
    'view/mediators/NavigationContainerMediator',
    'view/mediators/ConfigurableItemCarouselMediator',
    'view/mediators/VehiclePresentationMediator',
    'view/mediators/MainConfiguratorContainerMediator',
    'view/mediators/ChangeNotificationUIMediator',
    'view/mediators/SectionContentUIMediator',
    'view/mediators/RecentConfigurationsMediator',
    'view/mediators/ApplicationMediator',
    'view/mediators/VehicleDetailsMediator',
    'view/mediators/SummaryMediator',
    'view/mediators/ConfigurableItemPanelMediator',
    'view/mediators/MobileMediator'
], function () {
    'use strict';
    var NavigationContainerMediator = arguments[0],
        ConfigurableItemCarouselMediator = arguments[1],
        VehiclePresentationMediator = arguments[2],
        MainConfiguratorContainerMediator = arguments[3],
        ChangeNotificationUIMediator = arguments[4],
        SectionContentUIMediator = arguments[5],
        RecentConfigurationsMediator = arguments[6],
        ApplicationMediator = arguments[7],
        VehicleDetailsMediator = arguments[8],
        SummaryMediator = arguments[9],
        ConfigurableItemPanelMediator = arguments[10],
        MobileMediator = arguments[11];


    return puremvc.define({
            name: 'bmc.controller.command.startup.core.PrepViewCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {
                if (bmc.support.PlatformDetector.isMobile()) {
                    this.prepMobileView();
                } else {
                    this.prepDesktopView();
                }
            },

            prepDesktopView: function () {
                this.facade.registerMediator(new MainConfiguratorContainerMediator());
                this.facade.registerMediator(new VehiclePresentationMediator());
                this.facade.registerMediator(new NavigationContainerMediator());
                this.facade.registerMediator(new ConfigurableItemCarouselMediator());
                this.facade.registerMediator(new ChangeNotificationUIMediator());
                this.facade.registerMediator(new VehicleDetailsMediator());
                this.facade.registerMediator(new RecentConfigurationsMediator());
                this.facade.registerMediator(new ApplicationMediator());
                this.facade.registerMediator(new SectionContentUIMediator());
                this.facade.registerMediator(new SummaryMediator());
                this.facade.registerMediator(new ConfigurableItemPanelMediator());
            },

            prepMobileView: function () {
                this.facade.registerMediator(new MobileMediator());
            }
        }
    );
});
