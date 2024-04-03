define(['model/proxy/VehiclePresentationProxy'], function () {
    'use strict';

    puremvc.define({
            name: 'bmc.controller.command.ParseVehiclePresentationCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {
                console.log('doing nothing');
                //GET THE VEHICLE PRESENTATION PROXY AND PROVIDE IT WITH
                // THE JSON FILE;

            }
        }
    );
});
