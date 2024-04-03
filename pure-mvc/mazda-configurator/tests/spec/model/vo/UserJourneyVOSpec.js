(function () {
    'use strict';

    describe('UserJourneyVO', function () {

        var userJourney,
            configurableType;

        beforeEach(function (done) {
            require(['model/vo/UserJourneyVO'], function () {
                configurableType = new bmc.support.ConfigurableType();
                configurableType.getTypes = function () {
                    return ['bodyStyle', 'grade', 'engine', 'colour', 'wheel', 'trim'];
                };
                userJourney = new bmc.model.vo.UserJourneyVO();
                userJourney.initialiseUserJourney();
                done();
            });
        });

        describe('builds correct userJourney VO', function () {
            it('it should contain an array of Key-value pairs', function () {
                expect(userJourney.userJourney).to.eql(expectedUserJourney());
            });
        });

        function expectedUserJourney() {
            return [
                {'bodyStyle': undefined},
                {'grade': undefined},
                {'engine': undefined},
                {'colour': undefined},
                {'wheel': undefined},
                {'trim': undefined}
            ];
        }

    });
})();