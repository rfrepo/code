(function () {
    'use strict';
    describe('SimpleConfigurationVO', function () {

        var vo,
            dataBuilder;

        describe('class should exist ', function () {

            it('should be instanced', function () {
                expect(vo).not.to.be(undefined);
            });
        });

        describe('getTypeIdValuePairObjectFromCurrentItemVOs ', function () {

            it('should return an object with any stored vos as key value pair. The key being the item vos type and ' +
                'the value the vos id', function () {

                var valuePairObject = vo.getTypeIdValuePairObjectFromCurrentItemVOs();

                expect(valuePairObject).to.have.property(bmc.support.ConfigurableType.BODYSTYLE);
                expect(valuePairObject).to.have.property(bmc.support.ConfigurableType.GRADE);
                expect(valuePairObject).to.have.property(bmc.support.ConfigurableType.ENGINE);
            });

            it('should return an MSC code', function () {

                var valuePairObject = vo.getTypeIdValuePairObjectFromCurrentItemVOs();

                expect(valuePairObject).to.have.property('msc');
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {


                createActiveConfgurationVO();
                done();
            });
        });

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        function getDependencies() {
            return [
                'model/vo/SimpleConfigurationVO'
            ];
        }

        function createActiveConfgurationVO() {
            vo = new bmc.model.vo.SimpleConfigurationVO();

            vo.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());

            vo.addConfigurableItemVO(
                bmc.support.ConfigurableType.BODYSTYLE, dataBuilder.BODYSTYLE_2200_VO());

            vo.addConfigurableItemVO(
                bmc.support.ConfigurableType.GRADE, dataBuilder.GRADE_001_VO());

            vo.addConfigurableItemVO(
                bmc.support.ConfigurableType.ENGINE, dataBuilder.ENGINE_2_VO());

        }
    });
})();
