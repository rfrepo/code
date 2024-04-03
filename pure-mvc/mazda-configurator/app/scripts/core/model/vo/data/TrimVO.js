define(['model/vo/data/ConfigurableItemVO'], function () {
    'use strict';
    var ConfigurableItemVO = arguments[0];


    puremvc.define({
            name: 'bmc.model.vo.data.TrimVO',
            parent: ConfigurableItemVO,
            constructor: function (data) {
                ConfigurableItemVO.call(this, data);
                this.setType(bmc.support.ConfigurableType.TRIM);
            }
        },
        {});
});