define(['../../support/data/RawModelData',
    'model/vo/data/BaseVehicleVO',
    'model/vo/data/BaseVehicleDefaultsVO',
    'model/vo/data/BodyStyleVO',
    'model/vo/data/GradeVO',
    'model/vo/data/ColourVO',
    'model/vo/data/WheelVO',
    'model/vo/data/TrimVO',
    'model/vo/data/StandardFeatureVO',
    'model/vo/data/AccessoryVO',
    'model/vo/data/OptionPackVO',
    'model/vo/data/EngineVO'], function () {

    'use strict';
    return puremvc.define({
            name: 'bmc.support.data.DataBuilder',
            constructor: function () {

                this.baseVehicles = [];
                this.baseVehiclesWithOutDefaults = [];
                this.baseVehicleDefaults = [];
                this.bodyStyles = [];
                this.grades = [];
                this.engines = [];
                this.colours = [];
                this.wheels = [];
                this.trims = [];
                this.standardFeatures = [];
                this.accessories = [];
                this.optionPacks = [];

                this.initialise();
                this.setVOsOnBaseVehicles();
                this.setVOsOnVehicleDefaults();
            }
        },
        {
            initialise: function () {
                var dataType,
                    dataTypes = this.getDataTypesVOs();

                for (dataType in dataTypes) {

                    if (dataType) {
                        this.parseData(dataTypes[dataType]);
                    }
                }
            },

            parseData: function (dataVO) {

                var i,
                    VOConstructor,
                    data = bmc.support.data.RawModelData.DATA[dataVO.dataKey];

                for (i = 0; i < data.length; i++) {

                    VOConstructor = bmc.model.vo.data[dataVO.VOClassRef];
                    dataVO.storageArray.push(new VOConstructor(data[i]));

                    if (dataVO.dataKey === 'baseVehicles') {
                        this.baseVehiclesWithOutDefaults.push(new VOConstructor(data[i]));
                    }
                }
            },

            getDataTypesVOs: function () {
                var self = this;
                return [
                    { dataKey: 'baseVehicles', VOClassRef: 'BaseVehicleVO', storageArray: self.baseVehicles },
                    { dataKey: 'baseVehicleDefaults', VOClassRef: 'BaseVehicleDefaultsVO',
                        storageArray: self.baseVehicleDefaults },
                    { dataKey: 'bodyStyles', VOClassRef: 'BodyStyleVO', storageArray: self.bodyStyles },
                    { dataKey: 'grades', VOClassRef: 'GradeVO', storageArray: self.grades },
                    { dataKey: 'engines', VOClassRef: 'EngineVO', storageArray: self.engines },
                    { dataKey: 'colours', VOClassRef: 'ColourVO', storageArray: self.colours},
                    { dataKey: 'wheels', VOClassRef: 'WheelVO', storageArray: self.wheels},
                    { dataKey: 'trim', VOClassRef: 'TrimVO', storageArray: self.trims},
                    { dataKey: 'standardFeatures', VOClassRef: 'StandardFeatureVO',
                        storageArray: self.standardFeatures},
                    { dataKey: 'accessories', VOClassRef: 'AccessoryVO', storageArray: self.accessories},
                    { dataKey: 'optionPack', VOClassRef: 'OptionPackVO', storageArray: self.optionPacks}
                ];
            },

            setVOsOnVehicleDefaults: function () {
                var i,
                    defaultsVO;

                for (i = 0; i < this.baseVehicleDefaults.length; i++) {

                    defaultsVO = this.baseVehicleDefaults[i];

                    defaultsVO.setTrimVO(this.getTrimById(defaultsVO.trimId));
                    defaultsVO.setColourVO(this.getColourById(defaultsVO.colourId));
                    defaultsVO.setWheelVO(this.getWheelById(defaultsVO.wheelId));
                }
            },

            setVOsOnBaseVehicles: function () {
                var i,
                    vehicleVO;

                for (i = 0; i < this.baseVehicles.length; i++) {

                    vehicleVO = this.baseVehicles[i];
                    vehicleVO.setBodyStyleVO(this.getBodyStyleById(vehicleVO.bodyStyleId));
                    vehicleVO.setGradeVO(this.getGradeById(vehicleVO.gradeId));
                    vehicleVO.setDefaultsVO(this.getVehicleDefaultsById(vehicleVO.id));
                    vehicleVO.setEngineVO(this.getEngineById(vehicleVO.engineId));
                    this.setOptionPacks(vehicleVO);
                }
            },

            setOptionPacks: function (baseVehicleVO) {

                var optionPackVOs = [],
                    self = this;
                _.each(baseVehicleVO.getOptionPackIds(), function (optionPackId) {
                    optionPackVOs.push(_.findWhere(self.optionPacks, {id: optionPackId}));
                });
                baseVehicleVO.setOptionPackVOs(optionPackVOs);

            },

            getVehicleById: function (id) {
                return this.lookUpLoop(id, this.baseVehicles);
            },

            getVehicleDefaultsById: function (id) {
                return this.lookUpLoop(id, this.baseVehicleDefaults);
            },

            getBodyStyleById: function (id) {
                return this.lookUpLoop(id, this.bodyStyles);
            },

            getGradeById: function (id) {
                return this.lookUpLoop(id, this.grades);
            },

            getEngineById: function (id) {
                return this.lookUpLoop(id, this.engines);
            },

            getColourById: function (id) {
                return this.lookUpLoop(id, this.colours);
            },

            getWheelById: function (id) {
                return this.lookUpLoop(id, this.wheels);
            },

            getTrimById: function (id) {
                return this.lookUpLoop(id, this.trims);
            },

            getStandardFeatureById: function (id) {
                return this.lookUpLoop(id, this.standardFeatures);
            },

            getAccessoryById: function (id) {
                return this.lookUpLoop(id, this.accessories);
            },

            getById: function (id) {
                return this.lookUpLoop(id, this.optionPacks);
            },

            lookUpLoop: function (id, items) {
                var i;

                for (i = 0; i < items.length; i++) {

                    if (items[i].getId() === id) {
                        return items[i];
                    }
                }
            },

            VEHICLE_1_VO: function () {
                return this.getVehicleById('GHW8BAA');
            },
            VEHICLE_1_ID: function () {
                return this.VEHICLE_1_VO().getId();
            },


            VEHICLE_2_VO: function () {
                return this.getVehicleById('GHW8BAA6N3');
            },
            VEHICLE_2_ID: function () {
                return this.VEHICLE_2_VO().getId();
            },

            VEHICLE_3_VO: function () {
                return this.getVehicleById('GHW8BAD');
            },
            VEHICLE_3_ID: function () {
                return this.VEHICLE_3_VO().getId();
            },

            VEHICLE_4_VO: function () {
                return this.getVehicleById('GHW8BAD6N3');
            },

            VEHICLE_5_VO: function () {
                return this.getVehicleById('GKL7BAA');
            },
            VEHICLE_6_VO: function () {
                return this.getVehicleById('GKL7BAA6N3');
            },

            VEHICLE_5_ID: function () {
                return this.VEHICLE_5_VO().getId();
            },

            VEHICLE_6_ID: function () {
                return this.VEHICLE_6_VO().getId();
            },

            VEHICLE_7_VO: function () {
                return this.getVehicleById('GKL7BAA6N4');
            },
            VEHICLE_8_VO: function () {
                return this.getVehicleById('GKL7BAA6N5');
            },

            VEHICLE_7_ID: function () {
                return this.VEHICLE_7_VO().getId();
            },

            VEHICLE_1_DEFUALTS_VO: function () {
                return this.getVehicleDefaultsById('GHW8BAA');
            },
            VEHICLE_2_DEFUALTS_VO: function () {
                return this.getVehicleDefaultsById('GHW8BAA6N3');
            },
            VEHICLE_3_DEFUALTS_VO: function () {
                return this.getVehicleDefaultsById('GHW8BAD');
            },
            VEHICLE_4_DEFUALTS_VO: function () {
                return this.getVehicleDefaultsById('GHW8BAD6N3');
            },
            VEHICLE_5_DEFUALTS_VO: function () {
                return this.getVehicleDefaultsById('GKL7BAA');
            },
            VEHICLE_6_DEFUALTS_VO: function () {
                return this.getVehicleDefaultsById('GKL7BAA6N3');
            },

            BODYSTYLE_2200_VO: function () {
                return this.getBodyStyleById('2200');
            },
            BODYSTYLE_2200_ID: function () {
                return this.BODYSTYLE_2200_VO().getId();
            },

            BODYSTYLE_5500_VO: function () {
                return this.getBodyStyleById('5500');
            },

            GRADE_001_VO: function () {
                return this.getGradeById('001');
            },
            GRADE_001_ID: function () {
                return this.GRADE_001_VO().getId();
            },

            GRADE_002_VO: function () {
                return this.getGradeById('002');
            },
            GRADE_002_ID: function () {
                return this.GRADE_002_VO().getId();
            },

            GRADE_003_VO: function () {
                return this.getGradeById('003');
            },
            GRADE_003_ID: function () {
                return this.GRADE_003_VO().getId();
            },

            ENGINE_1_VO: function () {
                return this.getEngineById('600BMCXPE00');
            },
            ENGINE_1_ID: function () {
                return this.ENGINE_1_VO().getId();
            },

            ENGINE_2_VO: function () {
                return this.getEngineById('A00BMC2XPE00');
            },

            ENGINE_3_VO: function () {
                return this.getEngineById('600XPE00');
            },
            ENGINE_3_ID: function () {
                return this.ENGINE_3_VO().getId();
            },

            ENGINE_4_VO: function () {
                return this.getEngineById('600BMCXPY00');
            },
            ENGINE_5_VO: function () {
                return this.getEngineById('A00BMCXPY00');
            },
            ENGINE_6_VO: function () {
                return this.getEngineById('600XPY00');
            },

            ENGINE_6_ID: function () {
                return this.ENGINE_6_VO().getId();
            },

            ENGINE_7_VO: function () {
                return this.getEngineById('A00XPY00');
            },


            COLOUR_1_VO: function () {
                return this.getColourById('A4D');
            },
            COLOUR_1_ID: function () {
                return this.COLOUR_1_VO().getId();
            },

            COLOUR_2_VO: function () {
                return this.getColourById('38P');
            },

            COLOUR_3_VO: function () {
                return this.getColourById('42B');
            },

            COLOUR_4_VO: function () {
                return this.getColourById('41W');
            },

            COLOUR_5_VO: function () {
                return this.getColourById('42A');
            },

            COLOUR_6_VO: function () {
                return this.getColourById('25D');
            },

            COLOUR_7_VO: function () {
                return this.getColourById('41V');
            },

            COLOUR_7_ID: function () {
                return this.COLOUR_7_VO().getId();
            },

            COLOUR_8_VO: function () {
                return this.getColourById('35J');
            },
            COLOUR_8_ID: function () {
                return this.COLOUR_8_VO().getId();
            },


            WHEEL_1_VO: function () {
                return this.getWheelById('WHE_01');
            },

            WHEEL_1_ID: function () {
                return this.WHEEL_1_VO().getId();
            },

            WHEEL_2_VO: function () {
                return this.getWheelById('WHE_02');
            },

            WHEEL_2_ID: function () {
                return this.WHEEL_2_VO().getId();
            },

            WHEEL_3_VO: function () {
                return this.getWheelById('ACCESSORY-WHE-01');
            },

            WHEEL_3_ID: function () {
                return this.WHEEL_3_VO().getId();
            },

            TRIM_1_VO: function () {
                return this.getTrimById('GN5');
            },
            TRIM_1_ID: function () {
                return this.TRIM_1_VO().getId();
            },
            TRIM_2_VO: function () {
                return this.getTrimById('GN8');
            },
            TRIM_2_ID: function () {
                return this.TRIM_2_VO().getId();
            },
            TRIM_3_VO: function () {
                return this.getTrimById('GN7');
            },
            TRIM_3_ID: function () {
                return this.TRIM_3_VO().getId();
            },
            TRIM_4_VO: function () {
                return this.getTrimById('GN1');
            },
            TRIM_4_ID: function () {
                return this.TRIM_4_VO().getId();
            },
            STANDARD_FEATURE_1_VO: function () {
                return this.getStandardFeatureById('0028');
            },
            STANDARD_FEATURE_2_VO: function () {
                return this.getStandardFeatureById('0037');
            },
            STANDARD_FEATURE_3_VO: function () {
                return this.getStandardFeatureById('0001');
            },
            ACCESSORY_1_VO: function () {
                return this.getAccessoryById('GHP9-V4-090');
            },
            ACCESSORY_2_VO: function () {
                return this.getAccessoryById('GHK1-V4-920-00');
            },
            ACCESSORY_3_VO: function () {
                return this.getAccessoryById('GHP9-V4-920');
            },
            ACCESSORY_1_ID: function () {
                return this.ACCESSORY_1_VO().getId();
            },
            ACCESSORY_2_ID: function () {
                return this.ACCESSORY_2_VO().getId();
            },
            ACCESSORY_3_ID: function () {
                return this.ACCESSORY_3_VO().getId();
            },
            OPTIONPACK_1_VO: function () {
                return this.getById('P_01_003');
            },
            OPTIONPACK_1_ID: function () {
                return this.OPTIONPACK_1_VO().getId();
            },
            OPTIONPACK_2_VO: function () {
                return this.getById('P_02_003');
            },
            OPTIONPACK_2_ID: function () {
                return this.OPTIONPACK_2_VO().getId();
            },
            OPTIONPACK_3_VO: function () {
                return this.getById('P_04_002');
            },
            OPTIONPACK_3_ID: function () {
                return this.OPTIONPACK_3_VO().getId();
            }
        },
        {
        }
    );
});