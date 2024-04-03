define(function (require) {
    'use strict';

    var DependencyStepper = require('model/support/DependencyStepper'),
        BaseVehiclesProxy = require('model/proxy/data/BaseVehiclesProxy'),
        ConfigurableType = require('support/ConfigurableType'),
        GlobalConfig = bmc.support.GlobalConfig.getInstance(),
        GlobalConstants = bmc.support.GlobalConstants;

    return puremvc.define({
            name: 'bmc.controller.command.startup.FilterVOsByDriveTypeCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {
                if (GlobalConfig.getBodyStyleId() !== null) {
                    this.filterProxyByDriveType(BaseVehiclesProxy.NAME);
                }
            },

            filterProxyByDriveType: function (proxy) {
                var criteria = this.getCriteria(),
                    proxyVOs = this.getProxy(proxy).getData(),
                    filteredVOs = [];

                _.each(proxyVOs, function (proxyVO) {
                    var availabilityPreconditions = proxyVO.getGradeVO().getDependencies()
                        .getAvailabilityPrecondition();

                    if (DependencyStepper.isAvailable(criteria, availabilityPreconditions)) {
                        filteredVOs.push(proxyVO);
                    }
                });

                filteredVOs = _.sortBy(filteredVOs, function (VO) {
                    return VO.getRank();
                });

                this.getProxy(proxy).setData(filteredVOs);
                this.getProxy(proxy).setStartupBaseVehicleId(filteredVOs[0]);

            },

            getCriteria: function () {
                var criteria = {},
                    driveType = GlobalConfig.getDriveType();

                criteria[ConfigurableType.BODYSTYLE] = GlobalConfig.getBodyStyleId();

                if (driveType) {
                    criteria[GlobalConstants.DRIVETYPE] = driveType;
                }

                return criteria;
            },

            getProxy: function (proxy) {
                return this.facade.retrieveProxy(proxy);
            }
        }
    );
});