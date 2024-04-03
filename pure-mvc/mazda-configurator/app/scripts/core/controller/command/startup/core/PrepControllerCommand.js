define([
    'support/NotificationNames',
    'controller/command/DisplayActiveSectionCommand',
    'controller/command/NavigationItemSelectionCommand',
    'controller/command/ConfigurableItemSelectionCommand',
    'controller/command/ModelSelectedCommand',
    'controller/command/startup/LoadCurrentModelDataCommand',
    'controller/command/startup/LoadGlobalConfigCommand',
    'controller/command/startup/AllConfigurableItemDataCommand',
    'controller/command/SetBaseVehicleOnActiveConfigurationCommand',
    'controller/command/startup/ModelDataLoadedCommand',
    'controller/command/OnActiveConfigurationChangeCommand',
    'controller/command/AddVOToActiveConfigurationCommand',
    'controller/command/UndoConfigurationChangeCommand',
    'controller/command/RequestPriceUpdateCommand',
    'controller/command/SetPriceOnConfigurableItemsVOsCommand',
    'controller/command/ConfigurableItemUpdatedCommand',
    'controller/command/CreateConflictPriceCommand'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        DisplayActiveSectionCommand = arguments[1],
        NavigationItemSelectionCommand = arguments[2],
        ConfigurableItemSelectionCommand = arguments[3],
        ModelSelectedCommand = arguments[4],
        LoadCurrentModelDataCommand = arguments[5],
        AllConfigurableItemDataCommand = arguments[7],
        SetBaseVehicleOnActiveConfigurationCommand = arguments[8],
        ModelDataLoadedCommand = arguments[9],
        OnActiveConfigurationChangeCommand = arguments[10],
        AddVOToActiveConfigurationCommand = arguments[11],
        UndoConfigurationChangeCommand = arguments[12],
        RequestPriceUpdateCommand = arguments[13],
        SetPriceOnConfigurableItemsVOsCommand = arguments[14],
        ConfigurableItemUpdatedCommand = arguments[15],
        CreateConflictPriceCommand = arguments[16];


    return puremvc.define({
            name: 'bmc.controller.command.startup.core.PrepControllerCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {

                this.facade.registerCommand(NotificationNames.CONFIGURABLE_ITEM_SELECTION,
                    ConfigurableItemSelectionCommand);

                this.facade.registerCommand(NotificationNames.MODEL_SELECTED,
                    ModelSelectedCommand);

                this.facade.registerCommand(NotificationNames.CURRENT_MODEL_UPDATED,
                    LoadCurrentModelDataCommand);

                this.facade.registerCommand(NotificationNames.GLOBAL_CONFIG_LOADED,
                    bmc.controller.command.LoadGlobalConfigCommand);

                this.facade.registerCommand(NotificationNames.SECTION_SELECTED,
                    bmc.controller.command.LoadCarouselSectionCommand);

                this.facade.registerCommand(NotificationNames.MODEL_DATA_LOADED,
                    ModelDataLoadedCommand);

                this.facade.registerCommand(NotificationNames.NEW_BASE_VEHICLE_AVAILABLE,
                    SetBaseVehicleOnActiveConfigurationCommand);

                this.facade.registerCommand(NotificationNames.ALL_CONFIGURABLE_ITEM_DATA,
                    AllConfigurableItemDataCommand);

                this.facade.registerCommand(NotificationNames.NAVIGATION_ITEM_SELECTED,
                    NavigationItemSelectionCommand);

                this.facade.registerCommand(NotificationNames.ACTIVE_SECTION_UPDATED,
                    DisplayActiveSectionCommand);

                this.facade.registerCommand(NotificationNames.ACTIVE_CONFIGURATION_CHANGE,
                    OnActiveConfigurationChangeCommand);

                this.facade.registerCommand(NotificationNames.UNDO_CHANGE,
                    UndoConfigurationChangeCommand);

                this.facade.registerCommand(NotificationNames.NEW_TRIM_AVAILABLE,
                    AddVOToActiveConfigurationCommand);

                this.facade.registerCommand(NotificationNames.REQUEST_PRICE_UPDATE,
                    RequestPriceUpdateCommand);

                this.facade.registerCommand(NotificationNames.SET_PRICE_ON_CONFIGURABLE_ITEMS,
                    SetPriceOnConfigurableItemsVOsCommand);

                this.facade.registerCommand(NotificationNames.CONFIGURABLE_ITEM_UPDATED,
                    ConfigurableItemUpdatedCommand);

                this.facade.registerCommand(NotificationNames.ON_CONFLICTS_FOUND,
                    CreateConflictPriceCommand);
            }
        }
    );
});