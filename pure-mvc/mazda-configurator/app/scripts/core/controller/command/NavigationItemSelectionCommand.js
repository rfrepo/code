define([
    'model/proxy/NavigationProxy',
    'model/proxy/ActiveConfigurationProxy',
    'support/NotificationNames',
    'support/ConfigurableType',
    'support/tracking/TrackingService'

], function () {
    'use strict';
    var NavigationProxy = arguments[0];

    return puremvc.define({
            name: 'bmc.controller.command.NavigationItemSelectionCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {

                var navigationVO = note.getBody();
                this.setPreviouslyActiveSection(navigationVO);
                this.getNavigationProxy().updateActiveSectionVO(navigationVO);

                this.trackNavigationChange(navigationVO);
            },

            trackNavigationChange: function (navigationVO) {
                if (bmc.support.ConfigurableType.getTypes().indexOf(navigationVO.getType()) > -1) {
                    burrows.app.tracking.trackConfigurableType(navigationVO.getType());
                } else {
                    burrows.app.tracking.trackSummary(this.getActiveConfigurationProxy().getSimplified());
                }
            },

            getNavigationProxy: function () {
                return this.facade.retrieveProxy(NavigationProxy.NAME);
            },

            getActiveConfigurationProxy: function () {
                return this.facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME);
            },

            setPreviouslyActiveSection: function (navigationVO) {

                var activeSectionVO = this.getNavigationProxy().getActiveSectionVO();

                if (activeSectionVO) {
                    navigationVO.setPreviouslyActiveSection(activeSectionVO.getType());
                }
            }
        }
    );
});