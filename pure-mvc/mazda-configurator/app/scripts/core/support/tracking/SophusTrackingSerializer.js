define(['support/ConfigurableType'], function (ConfigurableType) {
    'use strict';
    return puremvc.define({ name: 'bmc.support.tracking.SophusTrackingSerializer' },
        {},
        {
            serialiseModel: function (simpleConfigurationVO)
            {
                var baseVehicleVO = simpleConfigurationVO.getBaseVehicleVO();

                return 'Model=' + simpleConfigurationVO.getVehicleId() +
                    '&Body=' + baseVehicleVO.getBodyStyleVO().getName() +
                    '&Grade=' + baseVehicleVO.getGradeVO().getName() +
                    '&Engine=' + baseVehicleVO.getEngineVO().getName() +
                    '&Colour=' + simpleConfigurationVO.getConfigurableItemVO(ConfigurableType.COLOUR).getName() +
                    '&Wheels=' + simpleConfigurationVO.getConfigurableItemVO(ConfigurableType.WHEEL).getName() +
                    '&Interior=' + simpleConfigurationVO.getConfigurableItemVO(ConfigurableType.TRIM).getName();
            }
        }
    );
});