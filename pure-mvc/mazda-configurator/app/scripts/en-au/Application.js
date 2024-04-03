define([
    '../core/Application',
    'support/tracking/TrackingService',
    'support/tracking/SophusTrackingId',
    'support/tracking/SophusTrackingSerializer',
    'support/tracking/GoogleTrackingMethod'

],
    function () {
        'use strict';

        puremvc.define({
                name: 'bmc.Application',
                parent: bmc.Application // reference's parent directly because of circular deps
            },
            {

                setupTracking: function () {
                    this.setupGoogleTracking();
                },

                setupGoogleTracking: function () {
                    this.tracking = new bmc.support.tracking.TrackingService(
                        bmc.support.tracking.SophusTrackingId,
                        bmc.support.tracking.SophusTrackingSerializer,
                        bmc.support.tracking.GoogleTrackingMethod
                    );
                    this.tracking.setEnabled(true);
                }
            }
        );
    });
