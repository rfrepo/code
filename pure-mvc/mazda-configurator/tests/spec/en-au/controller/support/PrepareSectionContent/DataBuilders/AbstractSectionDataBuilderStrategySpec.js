describe('EN-AU - AbstractSectionDataBuilderStrategy', function () {
    'use strict';

    var AbstractSectionDataBuilderStrategy,
        DisclaimerProxy,
        ConfigurableType,
        RawModelData,
        dataBuilder,
        command;

    beforeEach(function (done) {
        require([
            '../en-au/' + 'controller/support/PrepareSectionContent/DataBuilders/AbstractSectionDataBuilderStrategy',
            'model/proxy/data/ConfigurableItemProxy',
            'model/proxy/data/DisclaimerProxy',
            'model/proxy/ActiveConfigurationProxy',
            'support/ConfigurableType',
            'support/GlobalConfig',
            '../../../' + 'test/spec/support/data/DataBuilder',
            '../../../' + 'test/spec/support/data/RawModelData'
        ], function () {

            AbstractSectionDataBuilderStrategy = arguments[0];
            DisclaimerProxy = arguments[2];
            ConfigurableType = arguments[4];
            dataBuilder = new arguments[6]();
            RawModelData = arguments[7];

            done();
        });
    });


    describe('initialisation - AbstractSectionDataBuilderStrategy', function () {
        it('should not be undefined', function () {
            expect(AbstractSectionDataBuilderStrategy).to.not.be(undefined);
        });
    });

    describe('get disclaimers', function () {

        var facade;

        beforeEach(function () {
            facade = puremvc.Facade.getInstance(new Date().getTime());

            command = new AbstractSectionDataBuilderStrategy({facade: facade, sendNotification: function () {}},
                ConfigurableType.GRADE);
            command.facade = facade;

            resetGlobalConfig();
            createAndRegisterProxies();
        });

        function resetGlobalConfig() {
            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
        }

        function createAndRegisterProxies() {

            var activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy(),
                disclaimerProxy = new DisclaimerProxy(),
                gradeProxy = new bmc.model.proxy.data.ConfigurableItemProxy(ConfigurableType.GRADE, 'grades');

            facade.registerProxy(gradeProxy);
            facade.registerProxy(disclaimerProxy);
            facade.registerProxy(activeConfigurationProxy);

            gradeProxy.data = [dataBuilder.GRADE_001_VO(), dataBuilder.GRADE_002_VO(), dataBuilder.GRADE_003_VO()];
            gradeProxy.setDisclaimer({});
            activeConfigurationProxy.setVehicleId(dataBuilder.VEHICLE_6_ID());
            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());
            disclaimerProxy.parseData(RawModelData.DATA);
        }

        it('should return an object of disclaimers instead of string', function () {
            var disclaimers;

            disclaimers = command.getDisclaimer();

            expect(disclaimers).to.be.an('object');
            expect(disclaimers.section).to.be.an('array');
            expect(disclaimers.disclaimerHeader[0]).to.equal('DS52RAQ DisclaimerHeader');
        });
    });
});