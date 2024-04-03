(function () {
    'use strict';
    describe('ArrayUtils', function () {

        var ArrayUtils;

        beforeEach(function (done) {
            require(['support/ArrayUtils'], function () {
                ArrayUtils = bmc.support.ArrayUtils;

                done();
            });
        });

        describe('initializing', function () {
            it('should be initialised', function () {
                expect(ArrayUtils).to.not.be(undefined);
            });
        });

        describe('getting by property methods', function () {
            it('should get return null if no object can be found', function () {
                var data = [];

                expect(ArrayUtils.getItemByGetterFunction(data, 'noFunction', 'ricky')).to.be(null);
            });

            function getMockGetterObject(id, name) {
                return {
                    getId: function () {
                        return id;
                    },

                    getName: function () {
                        return name;
                    }
                };
            }

            function getMockData() {
                return [
                    getMockGetterObject('BB1', 'Wagon'),
                    getMockGetterObject('BB2', '3 Door'),
                    getMockGetterObject('BB3', '5 Door')
                ];
            }

            it('should get return object with the matching id BB1', function () {
                var id = 'BB1',
                    data = getMockData();

                expect(ArrayUtils.getItemByGetterFunction(data, 'getId', id)).to.be(data[0]);
                expect(ArrayUtils.getItemByGetterFunction(data, 'getId', id).getId()).to.equal(id);
            });

            it('should get return object with the matching id BB2', function () {
                var id = 'BB2',
                    data = getMockData();

                expect(ArrayUtils.getItemByGetterFunction(data, 'getId', id)).to.be(data[1]);
                expect(ArrayUtils.getItemByGetterFunction(data, 'getId', id).getId()).to.equal(id);
            });

            it('should get return object with the matching id BB3', function () {
                var id = 'BB3',
                    data = getMockData();

                expect(ArrayUtils.getItemByGetterFunction(data, 'getId', id)).to.be(data[2]);
                expect(ArrayUtils.getItemByGetterFunction(data, 'getId', id).getId()).to.equal(id);
            });

            it('should get return object with the matching name 5 Door', function () {
                var name = '5 Door',
                    data = getMockData();

                expect(ArrayUtils.getItemByGetterFunction(data, 'getName', name)).to.be(data[2]);
                expect(ArrayUtils.getItemByGetterFunction(data, 'getName', name).getName()).to.equal(name);
            });
        });

    });
})();