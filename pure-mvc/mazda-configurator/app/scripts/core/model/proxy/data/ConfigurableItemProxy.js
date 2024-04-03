define([
    'support/NotificationNames',
    'model/vo/data/BodyStyleVO',
    'model/vo/data/GradeVO',
    'model/vo/data/ColourVO',
    'model/vo/data/WheelVO',
    'model/vo/data/EngineVO',
    'model/vo/data/TrimVO',
    'support/ArrayUtils',
    'support/HTMLAttributes'

], function () {
    'use strict';
    var ArrayUtils = arguments[7];

    return puremvc.define({
            name: 'bmc.model.proxy.data.ConfigurableItemProxy',
            parent: puremvc.Proxy,

            constructor: function (type, dataKey, VOClassRef) {
                this.type = type;
                this.activeItems = undefined;
                this.dataKey = dataKey;
                this.VOClassRef = VOClassRef;
                puremvc.Proxy.call(this, this.type, []);
            }
        },
        {
            type: 'configurableItem',

            getType: function () {
                return this.type;
            },

            getDataKey: function () {
                return this.dataKey;
            },

            getVOClassRef: function () {
                return this.VOClassRef;
            },

            parseData: function (data) {

                this.createDataVOs(data);
                this.setDisclaimer(data);
            },

            createDataVOs: function (data) {

                var self = this,
                    vo,
                    collection = data[this.getDataKey()],
                    voPackage = bmc.model.vo.data;

                self.activeItems = new Array(collection.length);

                _.each(collection, function (dataItem) {

                    vo = new voPackage[self.getVOClassRef()](dataItem);
                    self.data.push(vo);
                });
            },

            setDisclaimer: function (data) {

                var globalConfig = bmc.support.GlobalConfig.getInstance(),
                    model = globalConfig.getVehicleId(),
                    modelDisclaimer = globalConfig.LANGUAGE.disclaimers[model];

                if (data.disclaimers && data.disclaimers[this.dataKey]) {
                    this.disclaimer = data.disclaimers[this.dataKey];
                } else {
                    if (modelDisclaimer) {
                        this.disclaimer = globalConfig.LANGUAGE.disclaimers[model][this.dataKey];
                    } else {
                        this.disclaimer = globalConfig.LANGUAGE.disclaimers.Default[this.dataKey];
                    }
                }
            },

            getById: function (id) {
                return ArrayUtils.getItemByGetterFunction(this.getData(), 'getId', id);
            },

            getDisclaimer: function () {
                return this.disclaimer;
            }
        },
        {
            NAME: 'ConfigurableItemProxy'
        }
    );
});
