define(['support/ConfigurableType', 'model/vo/data/ConfigurableItemVO'], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        ConfigurableItemVO = arguments[1];

    puremvc.define({
            name: 'bmc.model.vo.data.BodyStyleVO',
            parent: ConfigurableItemVO,
            constructor: function (data) {
                ConfigurableItemVO.call(this, data);
                this.setType(ConfigurableType.BODYSTYLE);
            }
        },
        {});
});