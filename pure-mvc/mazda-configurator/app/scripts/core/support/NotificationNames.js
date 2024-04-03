define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.NotificationNames' }, {}, {
            STARTUP: 'startup',

            MODELS_DATA_AVAILABLE: 'model_thumnbnail-data-available',
            MODEL_DATA_AVAILABLE: 'model-data-available',

            MODEL_SELECTED: 'model-selected',
            MODELS_DATA_LOADED: 'model_thumnbnail-data-loaded',
            MODEL_DATA_LOADED: 'model-data-loaded',

            BODYSTYLE_SELECTED: 'bodystyle-selected',

            SECTION_SELECTED: 'section-selected',

            VEHICLE_VIEW_AMENDED: 'vehicle-view-amended',

            CONFIGURABLE_ITEM_SELECTION: 'configurable-item-selection',

            CURRENT_MODEL_UPDATED: 'current-model-updated',

            GLOBAL_CONFIG_LOADED: 'global-config-loaded',

            CONFIGURABLE_ITEM_DATA_AVAILABLE: 'configurable-item-data-available',

            INITIAL_ACTIVE_CONFIGURATION_READY: 'initial_active_configuration_ready',

            CHIP_SELECTED: 'chip-selected',

            ACTIVE_CONFIGURATION_AVAILABLE: 'active-configuration-available',

            BODY_STYLE_DATA_FILTERED: 'body-style-data-filtered',

            GRADE_DATA_FILTERED: 'grade-data-filtered',

            COLOUR_DATA_FILTERED: 'colour-data-filtered',

            WHEEL_DATA_FILTERED: 'wheel-data-filtered',

            ACTIVE_CONFIGURATION_CHANGE: 'active-configuration-change',

            CONFIGURABLE_ITEM_UPDATED: 'configurable-item-updated',

            NON_MSC_CONFIGURATION_CHANGE: 'non-msc-configuration-change',

            NEW_BASE_VEHICLE_AVAILABLE: 'new-base-vehicle-available',

            NEW_TRIM_AVAILABLE: 'new-trim-available',

            VEHICLE_IMAGE_AVAILABLE: 'vehicle-image-available',

            SPRITESHEET_AVAILABLE: 'spritesheet-available',

            ALL_CONFIGURABLE_ITEM_DATA: 'all-configurable-item-data',

            NAVIGATION_DATA_AVAILABLE: 'navigation-data-available',

            NAVIGATION_ITEM_SELECTED: 'navigation-item-selected',

            ACTIVE_SECTION_UPDATED: 'active-section-updated',

            SECTION_DATA_AVAILABLE: 'section-data-available',

            INTERIOR_IMAGE_AVAILABLE: 'interior-image-available',

            PRICE_UPDATED: 'price-updated',

            CONFLICTS_FOUND: 'conflicts-found',

            ON_CONFLICTS_FOUND: 'on-conflicts-found',

            UNDO_CHANGE: 'undo-change',

            VIEW_SCROLL_UPDATED: 'view-scroll-updated',

            NOTIFICATION_TYPE_RESTORE: 'restore',

            LOCALE_DATA_READY: 'local-data-available',

            REQUEST_USER_CONFIGURATIONS: 'requestUserConfigurations',

            USER_CONFIGURATIONS_CHANGED: 'userConfigurationsChanged',

            VEHICLE_PRESENTATION_LOADED: 'vehicle-presentation-loaded',

            LOAD_SAVED_CONFIGURATION: 'load-saved-configuration',

            REQUEST_PRICE_UPDATE: 'request-price-update',

            SET_PRICE_ON_CONFIGURABLE_ITEMS: 'set-price-on-configurable-items',

            SHOW_SUMMARY_PAGE: 'show-summary-page',

            CAROUSEL_REDRAW_DATA_AVAILABLE: 'carousel-redraw_data_available',

            CAROUSEL_UPDATE_DATA_AVAILABLE: 'carousel-update_data_available',
        
            HIDE_SUMMARY_PAGE: 'hide-summary-page',

            CAROUSEL_UPDATED: 'carousel-position-updated',

            GET_PDF: 'get-pdf',

            PREPARING_SECTION_CONTENT: 'preparing-section-Content',

            VEHICLE_PRESENTATION_UPDATE: 'vehicle-presentation-update'
        });
});
