(function () {
    'use strict';
    describe('HTMLTemplate', function () {

        var HTMLTemplate;

        beforeEach(function (done) {
            require(['support/HTMLTemplate'], function () {
                HTMLTemplate = bmc.support.HTMLTemplate;

                done();
            });
        });

        describe('initializing', function () {
            it('should be initialised', function () {
                expect(HTMLTemplate).to.not.be(undefined);
            });
        });

        describe('retrieving a template synchronously', function () {
            beforeEach(function () {
                this.server = sinon.fakeServer.create();
            });

            afterEach(function () {
                this.server.restore();
            });

            it('should return the correct template', function () {
                var url = 'lib/resources/html-templates/simple.html',
                    responseText = '<div>Ricky</div>',
                    template;

                this.server.respondWith('GET', './' + url,
                    [
                        200, { 'Content-Type': 'text/html' },
                        responseText
                    ]);

                template = HTMLTemplate.getSynchronously(url);

                this.server.respond();

                expect(template).to.equal(responseText);
            });
        });

    });
})();