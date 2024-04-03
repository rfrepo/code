describe('EN-AU - Disclaimer Proxy', function () {
    'use strict';

    var DisclaimerProxy,
        ActiveConfigurationProxy,
        proxy, facade,
        RawModelData,
        ConfigurableType,
        DataBuilder;

    function setupFacade() {
        facade = puremvc.Facade.getInstance(String(new Date().getTime()));

        proxy = new DisclaimerProxy();
        facade.registerProxy(proxy);
    }

    beforeEach(function (done) {
        require([
            'model/proxy/data/DisclaimerProxy',
            'model/proxy/ActiveConfigurationProxy',
            '../../../' + 'test/spec/support/data/RawModelData',
            '../../../' + 'test/spec/support/data/DataBuilder',
            'support/ConfigurableType'
        ], function () {

            DisclaimerProxy = arguments[0];
            ActiveConfigurationProxy = arguments[1];
            RawModelData = arguments[2];
            DataBuilder = new arguments[3]();
            ConfigurableType = arguments[4];
            done();
        });
    });

    describe('initialisation', function () {
        it('should not be undefined', function () {
            expect(DisclaimerProxy).to.not.be(undefined);
        });
    });

    describe('parse data', function () {

        beforeEach(function () {
            setupFacade();
        });

        it('should parse disclaimers into VOs', function () {
            var data;

            proxy.parseData(RawModelData.DATA);

            data = proxy.getData();

            expect(data.accessories).to.be(undefined);
            expect(data.disclaimerHeader.length).to.equal(2);
            expect(data.disclaimerHeader[0].getValue()).to.equal('1');
            expect(data.rdpDisclaimer[0].getValue()).to.be(null);
            expect(data.rdpDisclaimer[0].getPreconditions()[0].getValue()).to.equal('3');
        });
    });

    describe('get disclaimers by active configuration', function () {

        var activeConfiguration,
            SEND_NOTIFICATION_METHOD = 'sendNotification';

        function setActiveConfiguration() {
            activeConfiguration = new ActiveConfigurationProxy();
            facade.registerProxy(activeConfiguration);

            sinon.stub(activeConfiguration, SEND_NOTIFICATION_METHOD);

            activeConfiguration.setVehicleId(DataBuilder.VEHICLE_1_ID());
            activeConfiguration.setBaseVehicleVO(DataBuilder.VEHICLE_1_VO());
            activeConfiguration.setConfigurableItemVO(ConfigurableType.COLOUR, DataBuilder.COLOUR_1_VO());
        }

        beforeEach(function () {
            setupFacade();
            setActiveConfiguration();

            proxy.parseData(RawModelData.DATA);
        });

        it('should return Disclaimers based on active configuration', function () {
            var disclaimers;

            disclaimers = proxy.getDisclaimersByActiveConfiguration(activeConfiguration.getSimplified());

            expect(disclaimers).to.be.an('object');
            expect(disclaimers.disclaimerHeader).to.be.an('array');
            expect(disclaimers.disclaimerHeader.length).to.equal(3);
            expect(disclaimers.disclaimerHeader[0]).to.equal('ACT state True Red promo disclaimer');
            expect(disclaimers.colourDisclaimer[0]).to.equal('DS52RAQ True Red colour disclaimer');
        });
    });
});