define(['controller/support/ConfigurableItemSelection/SelectionStrategyFactory'], function () {
    'use strict';
    var SelectionStrategyFactory = arguments[0];

    return puremvc.define({
            name: 'bmc.controller.command.ConfigurableItemSelectionCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function (note) {
                var itemVO = note.getBody(),
                    selectionStrategyFactory = this.createStrategyFactory(),
                    selectionStrategy = selectionStrategyFactory.createStrategy(itemVO.getType(), this.facade);

                selectionStrategy.handleItemSelected(itemVO);
            },

            createStrategyFactory: function () {
                return new SelectionStrategyFactory();
            }
        }
    );
});