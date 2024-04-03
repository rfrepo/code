define([
    'support/NotificationNames',
    'controller/command/startup/StartupCommand',
    'support/tracking/TrackingService',
    'support/tracking/SophusTrackingId',
    'support/tracking/SophusTrackingSerializer',
    'support/tracking/SophusTrackingMethod',
    'model/vo/data/ModelVO'
],
    function () {
        'use strict';

        puremvc.define({
                name: 'bmc.Application',
                constructor: function () {
                    this.facade.registerCommand(bmc.support.NotificationNames.STARTUP,
                        bmc.controller.command.startup.StartupCommand);
                }
            },
            {
                facade: puremvc.Facade.getInstance('MazdaConfigurator'),

                start: function () {
                    var globalConfig = bmc.support.GlobalConfig.getInstance(),
                        vo = new bmc.model.vo.data.ModelVO();

                    vo.setModelId(globalConfig.getVehicleId());
                    vo.setBodyStyle(globalConfig.getBodyStyleId());

                    this.setupTracking();

                    this.facade.sendNotification(bmc.support.NotificationNames.STARTUP);
                    this.facade.sendNotification(bmc.support.NotificationNames.MODEL_SELECTED, vo);
                },

                setupTracking: function () {
                    this.setupSophusTracking();
                },

                setupSophusTracking: function () {
                    this.tracking = new bmc.support.tracking.TrackingService(
                        bmc.support.tracking.SophusTrackingId,
                        bmc.support.tracking.SophusTrackingSerializer,
                        bmc.support.tracking.SophusTrackingMethod
                    );
                    this.tracking.setEnabled(false);
                }
            }
        );
    });
