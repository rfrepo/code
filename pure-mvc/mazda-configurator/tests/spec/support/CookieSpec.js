(function () {
    'use strict';
    describe('Cookie', function () {

        var USER_AGENT_WARNING = 'PLEASE RUN UserConfigurationProxySpec with grunt, not ' + navigator.userAgent;

        function runCookieSavingTests() {
            var Cookie;

            beforeEach(function (done) {
                require(['support/Cookie'], function () {
                    Cookie = bmc.support.Cookie;
                    done();
                });
            });

            afterEach(function () {
                Cookie.removeAll();
            });

            describe('initializing', function () {
                it('should be initialised', function () {
                    expect(Cookie).to.not.be(undefined);
                });
            });

            describe('adding', function () {
                it('should add a cookie to the document', function () {
                    var name = 'person',
                        value = 'ricky';

                    Cookie.setItem(name, value);

                    expect(Cookie.getItem(name)).to.equal(value);
                });
            });

            describe('retrieving', function () {
                var name1 = 'person',
                    value1 = 'ricky',
                    name2 = 'colleague',
                    value2 = 'mark';

                beforeEach(function () {
                    Cookie.setItem(name1, value1);
                    Cookie.setItem(name2, value2);
                });

                it('should get the correct cookie when more than one exist', function () {
                    expect(Cookie.getItem(name1)).to.equal(value1);
                    expect(Cookie.getItem(name2)).to.equal(value2);
                });

                it('should get the two different keys', function () {
                    var keys = Cookie.getKeys();

                    expect(keys).to.contain(name1);
                    expect(keys).to.contain(name2);
                });

                it('should clear all keys', function () {
                    var keys = Cookie.getKeys();

                    expect(keys).to.contain(name1);
                    expect(keys).to.contain(name2);

                    Cookie.removeAll();

                    expect(Cookie.getItem(name1)).to.be(null);
                    expect(Cookie.getItem(name2)).to.be(null);
                });
            });
        }

        if (navigator.userAgent.indexOf('Phantom') === -1) {
            console.log(USER_AGENT_WARNING);
        }
        else {
            runCookieSavingTests();
        }

    });
})();