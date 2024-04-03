(function () {
    'use strict';
    describe('Accordion', function () {

        var Accordion,
            HTMLAttributes;

        beforeEach(function (done) {
            require([
                'support/Accordion',
                'support/HTMLAttributes'
            ], function () {
                Accordion = bmc.support.Accordion;
                HTMLAttributes = bmc.support.HTMLAttributes;

                done();
            });
        });

        describe('initializing', function () {
            it('should be initialised', function () {
                expect(Accordion).to.not.be(undefined);
            });
        });

        describe('Accordion Setup', function () {

            beforeEach(function () {
                setupDOM();
            });

            afterEach(function () {
                removeDOM();
            });

            it('should prepare DOM with correct classes for accordion to work (without active)', function () {
                Accordion.setupAccordion();

                expect(jQuery('#AccordionDom').html()).to.not.contain(HTMLAttributes.ACCORDION_ACTIVE_CLASS);
            });

            it('should prepare DOM with correct classes for accordion to work (with active)', function () {
                Accordion.setupAccordion({active: true});

                expect(jQuery('#AccordionDom').html()).to.contain(HTMLAttributes.ACCORDION_ACTIVE_CLASS);
            });
        });

        describe('Accordion Use', function () {

            var alignElement,
                toggleElement;

            beforeEach(function (done) {
                setupDOM();

                Accordion.setupAccordion();
                alignElement = sinon.spy(Accordion, 'alignWithAccordionElement');
                toggleElement = sinon.spy(Accordion, 'toggleAccordionElement');

                done();
            });

            afterEach(function (done) {
                removeDOM();

                alignElement.restore();
                toggleElement.restore();

                done();
            });

            it('should open its content below (click icon)', function () {
                var element = jQuery('.' + HTMLAttributes.ACCORDION_CLASS + ' h3 span');

                element.trigger('click');

                expect(alignElement.called).to.be.ok();
                expect(toggleElement.called).to.be.ok();
                expect(element.parent().next().css('display')).to.equal('block');
            });

            it('should open its content below (click bar)', function () {
                var element = jQuery('.' + HTMLAttributes.ACCORDION_CLASS + ' h3 ');

                element.trigger('click');

                expect(alignElement.called).to.be.ok();
                expect(toggleElement.called).to.be.ok();
                expect(element.next().css('display')).to.equal('block');
            });

        });

        function setupDOM() {
            var div = document.createElement('div');
            div.id = 'AccordionDom';
            div.innerHTML = '<div class="accordion"><h3 class="accordion-header"></h3><div></div></div>';

            jQuery(document.body).append(div);
        }

        function removeDOM() {
            jQuery('#AccordionDom').remove();
        }
    });
})();
