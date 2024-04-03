define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.tracking.SophusTrackingId' },
        {},
        {
            PREFIX: 'Configurator/',

            UPSELL_CLICKED: 'configuration_step/Upsell_clicked',
            UPSELL_CONFIRM_CLICKED: 'configuration_step/Upsell_confirm_clicked',
            UPSELL_REJECTED_CLICKED: 'configuration_step/Upsell_rejected_clicked',

            SUMMARY_DOWNLOADPDF_CLICKED: 'Summary_DownloadPDF_clicked',

            CONFIGURABLE_TYPES: {
                bodyStyle: 'Bodystyle',
                grade: 'Grade',
                engine: 'Engine',
                colour: 'Colour',
                wheel: 'Wheels',
                trim: 'Interior'
            },

            SUMMARY: 'Summary_NewCar'
        }
    );
});