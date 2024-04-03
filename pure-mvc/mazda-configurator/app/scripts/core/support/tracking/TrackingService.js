define([], function () {
    'use strict';
    return puremvc.define(
        {
            name: 'bmc.support.tracking.TrackingService',
            constructor: function (trackingIds, trackingSerializer, trackingMethod) {
                this.trackingIds = trackingIds;
                this.trackingSerializer = trackingSerializer;
                this.trackingMethod = trackingMethod;
                this.enabled = true;

                if (!window.console) {
                    window.console = {
                        log: function () {}
                    };
                }
            }
        },
        {
            getEnabled: function () {
                return this.enabled;
            },

            setEnabled: function (value) {
                this.enabled = value;
            },

            trackConfigurableType: function (value) {
                this.trackingMethod.sendTrackingValue(
                    this.trackingIds.PREFIX + this.trackingIds.CONFIGURABLE_TYPES[value], this.getEnabled());
            },

            trackSummary: function (simpleConfigurationVO) {
                this.trackWithModelConfiguration(this.trackingIds.SUMMARY, simpleConfigurationVO);
            },

            trackPdfDownload: function (simpleConfigurationVO) {
                this.trackWithModelConfiguration(this.trackingIds.SUMMARY_DOWNLOADPDF_CLICKED, simpleConfigurationVO);
            },

            trackUpsellClick: function () {
                this.trackingMethod.sendTrackingValue(
                    this.trackingIds.PREFIX + this.trackingIds.UPSELL_CLICKED, this.getEnabled());
            },

            trackUpsellAccept: function () {
                this.trackingMethod.sendTrackingValue(
                    this.trackingIds.PREFIX + this.trackingIds.UPSELL_CONFIRM_CLICKED, this.getEnabled());
            },

            trackUpsellReject: function () {
                this.trackingMethod.sendTrackingValue(
                    this.trackingIds.PREFIX + this.trackingIds.UPSELL_REJECTED_CLICKED, this.getEnabled());
            },

            trackWithModelConfiguration: function (trackingId, simpleConfigurationVO) {
                this.trackingMethod.sendTrackingValue(
                    this.trackingIds.PREFIX +
                        trackingId +
                        '?' + this.trackingSerializer.serialiseModel(simpleConfigurationVO), this.getEnabled());
            }
        }
    );
});
