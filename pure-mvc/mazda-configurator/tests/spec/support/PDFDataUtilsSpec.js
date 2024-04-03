(function () {
    'use strict';

    describe('PDFDataUtils', function () {

        var facade,
            pdfDataUtils,
            activeConfigurationProxy,
            dataBuilder,
            globalConfig,
            imageData = {};

        imageData.interior = {'base': '2200_A4D_001.png'};
        imageData.exterior = {'interior': 'gn5.png'};
        window.location.origin = 'http://www.burrows.info';

        beforeEach(function (done) {
            require(
                ['../../../' + 'test/spec/support/data/DataBuilder', 'support/GlobalConfig', 'support/PDFDataUtils',
                    'model/proxy/ActiveConfigurationProxy', 'support/services/LoadSyncDataService'],
                function () {
                    dataBuilder = new bmc.support.data.DataBuilder();
                    globalConfig = bmc.support.GlobalConfig.getInstance();
                    globalConfig.applyLocaleData('en-gb');
                    createFacade();
                    createPopulatedActiveConfigurationProxy();

                    done();
                });
        });

        describe('should have everything needed as per flash version', function () {
            it('PDFDataUtils should be instance', function () {
                pdfDataUtils = bmc.support.PDFDataUtils.buildJSONData(activeConfigurationProxy,
                    imageData);

                expect(pdfDataUtils.documentFilename).to.not.be(undefined);
                expect(pdfDataUtils.MACScode).to.not.be(undefined);
                expect(pdfDataUtils.culture).to.not.be(undefined);
                expect(pdfDataUtils.modelSeries).to.not.be(undefined);
                expect(pdfDataUtils.pdfDescription).to.not.be(undefined);
                expect(pdfDataUtils.mscCode).to.not.be(undefined);
                expect(pdfDataUtils.price).to.not.be(undefined);
                expect(pdfDataUtils.dateContent).to.not.be(undefined);
                expect(pdfDataUtils.bodystyleTitle).to.not.be(undefined);
                expect(pdfDataUtils.seriesTitle).to.not.be(undefined);
                expect(pdfDataUtils.engineTitle).to.not.be(undefined);
                expect(pdfDataUtils.trimValue).to.not.be(undefined);
                expect(pdfDataUtils.accessoriesTitle).to.not.be(undefined);

                expect(pdfDataUtils.interiorImages).to.not.be(undefined);
                expect(pdfDataUtils.exteriorImages).to.not.be(undefined);
                expect(pdfDataUtils.languageFileUrl).to.not.be(undefined);

                expect(pdfDataUtils.accessoryCodes).to.contain(dataBuilder.ACCESSORY_3_ID());
                expect(pdfDataUtils.accessoryCodes).to.contain(dataBuilder.ACCESSORY_1_ID());

                expect(pdfDataUtils.optionPackCodes).to.contain(dataBuilder.OPTIONPACK_3_ID());
            });
        });

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createPopulatedActiveConfigurationProxy() {

            activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();
            facade.registerProxy(activeConfigurationProxy);

            activeConfigurationProxy.setConfigurableItemVO(
                bmc.support.ConfigurableType.BODYSTYLE, dataBuilder.BODYSTYLE_2200_VO());

            activeConfigurationProxy.setConfigurableItemVO(
                bmc.support.ConfigurableType.GRADE, dataBuilder.GRADE_001_VO());

            activeConfigurationProxy.setConfigurableItemVO(
                bmc.support.ConfigurableType.ENGINE, dataBuilder.ENGINE_2_VO());

            activeConfigurationProxy.setConfigurableItemVO(
                bmc.support.ConfigurableType.COLOUR, dataBuilder.COLOUR_1_VO());

            activeConfigurationProxy.setConfigurableItemVO(
                bmc.support.ConfigurableType.WHEEL, dataBuilder.WHEEL_1_VO());

            activeConfigurationProxy.setConfigurableItemVO(
                bmc.support.ConfigurableType.TRIM, dataBuilder.TRIM_1_VO());

            activeConfigurationProxy.addAccessoryVO(dataBuilder.ACCESSORY_1_VO());
            activeConfigurationProxy.addAccessoryVO(dataBuilder.ACCESSORY_3_VO());

            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_8_VO());
            activeConfigurationProxy.vehicleId = 'M6';
        }

    });
})();
