(function () {
    'use strict';
    describe('DataBuilder', function () {

        var dataBuilder;

        beforeEach(function (done) {

            require(getDependencies(), function () {
                createDataBuilder();
                done();
            });
        });

        describe('class should exist ', function () {

            it('should be instanced', function () {
                expect(dataBuilder).not.to.be(undefined);
            });
        });


        describe('databuilder should parse data and create VOs', function () {

            it('should create base vehicle VOs', function () {
                expect(dataBuilder.baseVehicles.length).to.be(8);
            });

            it('should create base vehicle defaultsVOs', function () {
                expect(dataBuilder.baseVehicleDefaults.length).to.be(8);
            });

            it('should create body style VOs', function () {
                expect(dataBuilder.bodyStyles.length).to.be(2);
            });

            it('should create grade VOs', function () {
                expect(dataBuilder.grades.length).to.be(3);
            });

            it('should create engine VOs', function () {
                expect(dataBuilder.engines.length).to.be(7);
            });

            it('should create color VOs', function () {
                expect(dataBuilder.colours.length).to.be(8);
            });

            it('should create wheel VOs', function () {
                expect(dataBuilder.wheels.length).to.be(3);
            });

            it('should create trim VOs', function () {
                expect(dataBuilder.trims.length).to.be(4);
            });

            it('should create baseFeatures VOs', function () {
                expect(dataBuilder.standardFeatures.length).to.be(60);
            });

            it('should create accessories VOs', function () {
                expect(dataBuilder.accessories.length).to.be(11);
            });

            it('should create optionPack VOs', function () {
                expect(dataBuilder.optionPacks.length).to.be(3);
            });
        });

        function getDependencies() {
            return [
                '../../../test/spec/support/data/DataBuilder'
            ];
        }

        function createDataBuilder() {
            dataBuilder = new bmc.support.data.DataBuilder();
        }
    });
})();
