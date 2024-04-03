define(['model/vo/data/ConfigurableItemVO'], function () {
    'use strict';
    var ConfigurableItemVO = arguments[0];

    return puremvc.define({
            name: 'bmc.model.vo.data.OptionPackVO',
            parent: ConfigurableItemVO,
            constructor: function (data) {
                ConfigurableItemVO.call(this, data);
                this.setType(bmc.support.ConfigurableType.OPTIONPACK);
                this.parentId = data.caption;
            }
        },
        {
            getParentId: function () {
                return this.parentId;
            }
        }
    );
});