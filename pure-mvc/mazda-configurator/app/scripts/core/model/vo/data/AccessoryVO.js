define(['model/vo/data/ConfigurableItemVO'], function () {
    'use strict';
    var ConfigurableItemVO = arguments[0];


    return puremvc.define({
            name: 'bmc.model.vo.data.AccessoryVO',
            parent: ConfigurableItemVO,
            constructor: function (data) {
                ConfigurableItemVO.call(this, data);
                this.setType(bmc.support.ConfigurableType.ACCESSORIES);
                this.groupName = data.group;
            }
        },
        {
            getGroupName: function () {
                return this.groupName;
            }
        }
    );
});