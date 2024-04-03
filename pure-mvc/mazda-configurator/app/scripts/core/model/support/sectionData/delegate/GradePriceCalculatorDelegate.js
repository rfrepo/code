define(['support/ConfigurableType',
    'model/proxy/data/BaseVehiclesProxy',
    'model/proxy/ActiveConfigurationProxy'], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        BaseVehiclesProxy = arguments[1],
        ActiveConfigurationProxy = arguments[2];

    puremvc.define({
            name: 'bmc.model.support.sectionData.delegate.GradePriceCalculatorDelegate',
            constructor: function (host) {
                this.host = host;
            }
        },
        {
            calculatePrice: function () {

                var i = 0,
                    gradeVO,
                    totalGradeVOs = this.dataVOs.length,
                    bodyStyleId = this.getBodyStyleId(),
                    baseVehicleProxy = this.getProxy(BaseVehiclesProxy.NAME);

                for (i; i < totalGradeVOs; i++) {

                    gradeVO = this.dataVOs[i];
                    gradeVO.setPrice(
                        this.getPriceOfBaseVehicleWithGrade(baseVehicleProxy, gradeVO.getId(), bodyStyleId)
                    );
                }
            },

            getPriceOfBaseVehicleWithEngine: function (baseVehicleProxy, engineId, bodyStyleId) {

                var baseVehicleVOsWithEngine = baseVehicleProxy.getByBodyStyleEngine(bodyStyleId, engineId);
                return this.getPriceOfCheapestVehicleVO(baseVehicleVOsWithEngine);
            },

            getPriceOfCheapestVehicleVO: function (vehicleVOs) {

                var i = 0,
                    price = bmc.support.GlobalConfig.getInstance().NO_MATCHING_VEHICLES,
                    vehicleVOPrice,
                    totalVehicleVOs = vehicleVOs.length;

                for (i = 0; i < totalVehicleVOs; i++) {

                    vehicleVOPrice = Number(vehicleVOs[i].getPrice());
                    price = (!i || vehicleVOPrice < price) ? vehicleVOPrice : price;
                }

                return price;
            },

            getPriceOfBaseVehicleWithGrade: function (baseVehicleProxy, gradeId, bodyStyleId) {

                var baseVehicleVOsWithEngine = baseVehicleProxy.getByBodyStyleGrade(bodyStyleId, gradeId);
                return this.getPriceOfCheapestVehicleVO(baseVehicleVOsWithEngine);
            },

            getBodyStyleId: function () {

                var activeConfigurationProxy = this.getProxy(ActiveConfigurationProxy.NAME),
                    currentBodyStyleVO = activeConfigurationProxy.getConfigurableItemVO(
                        ConfigurableType.BODYSTYLE);

                return currentBodyStyleVO.getId();
            },

            getProxy: function (proxyName) {
                return this.host.facade.retrieveProxy(proxyName);
            },

            setData: function (VOs) {
                this.dataVOs = VOs;
            }
        }
    );
})
;
