define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.support.data.RawModelData'
        },
        {
        },
        {
            DATA: {
                'modelID': 'M6',
                'modelName': 'Mazda6',
                'startupBaseVehicleId': 'GHW8BAA',
                'baseVehicles': [
                    {
                        'id': 'GHW8BAA',
                        'rank': '1',
                        'bodyStyleId': '2200',
                        'gradeId': '001',
                        'engineId': '600BMCXPE00',
                        'wheelId': 'WHE_01',
                        'keyCriteriaIds': 'KC03,KC05,KC06,KC07,KC08,KC11,KC13,KC16',
                        'standardFeatureIds': '0003,0016,0028,0030,0031,0032,0033,0034,0037,0041,0042,0046,0055,' +
                            '0063,0071,0075,0076,0081,0083,0084,0085,0086,0087,0088,0089,0121,0164,0500,0507,0508,' +
                            '0509,0511',
                        'optionPackIds': '',
                        'capCode': 'MA6 20SE 4SPIM  2',
                        'specPage': 'mock_spec.xml',
                        'price': '19595.0000'
                    },
                    {
                        'id': 'GHW8BAA6N3',
                        'rank': '2',
                        'bodyStyleId': '2200',
                        'gradeId': '001',
                        'engineId': 'A00BMC2XPE00',
                        'keyCriteriaIds': 'KC03,KC05,KC06,KC07,KC08,KC11,KC13,KC16',
                        'standardFeatureIds': '0001,0003,0016,0028,0030,0031,0032,0033,0034,0037,0041,0042,0046,0055,' +
                            '0063,0071,0075,0076,0081,0083,0084,0085,0086,0087,0088,0089,0121,0164,0500,0507,0508,' +
                            '0509,0511',
                        'optionPackIds': '',
                        'capCode': 'MA6 20SEN4SPIM  2',
                        'specPage': 'ghw8baa6n3_specs.xml',
                        'price': '20195.0000'
                    },

                    {
                        'id': 'GHW8BAD',
                        'rank': '5',
                        'bodyStyleId': '2200',
                        'gradeId': '002',
                        'engineId': '600BMCXPE00',
                        'keyCriteriaIds': 'KC04,KC05,KC06,KC07,KC08,KC11,KC12,KC14,KC16',
                        'standardFeatureIds': '0001,0003,0004,0011,0014,0017,0018,0030,0031,0032,0034,0035,0038' +
                            ',0039,0041,0042,0046,0055,0057,0063,0071,0075,0076,0081,0083,0084,0085,0086,0087,0088,' +
                            '0089,0121,0164,0500,0504,0507,0508,0509,0511',
                        'optionPackIds': '',
                        'capCode': 'MA6 20LSE4SPIM  2',
                        'specPage': 'ghw8bad_specs.xml',
                        'price': '20395.0000'
                    },
                    {
                        'id': 'GHW8BAD6N3',
                        'rank': '6',
                        'bodyStyleId': '2200',
                        'gradeId': '002',
                        'engineId': '600BMCXPE00',
                        'keyCriteriaIds': 'KC04,KC05,KC06,KC07,KC08,KC11,KC12,KC14,KC16',
                        'standardFeatureIds': '0001,0003,0004,0011,0014,0017,0018,0030,0031,0032,0034,0035,0038,' +
                            '0039,0041,0042,0046,0055,0057,0063,0071,0075,0076,0081,0083,0084,0085,0086,0087,0088,' +
                            '0089,0121,0164,0500,0504,0507,0508,0509,0511',
                        'optionPackIds': '',
                        'capCode': 'MA6 20LSN4SPIM  2',
                        'specPage': 'ghw8bad6n3_specs.xml',
                        'price': '20995.0000'
                    },
                    {
                        'id': 'GKL7BAA',
                        'rank': '13',
                        'bodyStyleId': '2200',
                        'gradeId': '003',
                        'engineId': '600XPE00',
                        'keyCriteriaIds': 'KC01,KC04,KC05,KC06,KC07,KC08,KC09,KC11,KC12,KC14,KC15,KC16',
                        'standardFeatureIds': '0002,0003,0004,0011,0014,0017,0018,0028,0030,0031,0032,0034,0036,0038,' +
                            '0039,0041,0042,0047,0048,0057,0060,0063,0071,0073,0075,0076,0078,0081,0083,0084,0085,' +
                            '0086,0087,0088,0089,0158,0160,0162,0164,0500,0501,0504,0507,0508,0509,0512',
                        'capCode': 'MA6 20SPO4SPIM  2',
                        'optionPackIds': '',
                        'specPage': 'gkl7baa_specs.xml',
                        'price': '23515.0000'
                    },
                    {
                        'id': 'GKL7BAA6N3',
                        'rank': '14',
                        'bodyStyleId': '2200',
                        'gradeId': '003',
                        'engineId': '600XPE00',
                        'keyCriteriaIds': 'KC01,KC04,KC05,KC06,KC07,KC08,KC09,KC11,KC12,KC14,KC15,KC16',
                        'standardFeatureIds': '0002,0003,0004,0011,0014,0017,0018,0028,0030,0031,0032,0034,0036,0038,' +
                            '0039,0041,0042,0047,0048,0057,0060,0063,0071,0073,0075,0076,0078,0081,0083,0084,0085,' +
                            '0086,0087,0088,0089,0158,0160,0162,0164,0500,0501,0504,0507,0508,0509,0512',
                        'optionPackIds': 'P_01_003',
                        'capCode': 'MA6 20SPN4SPIM  2',
                        'specPage': 'gkl7baa6n3_specs.xml',
                        'price': '24115.0000'
                    },
                    {
                        'id': 'GKL7BAA6N4',
                        'rank': '15',
                        'bodyStyleId': '2200',
                        'gradeId': '003',
                        'engineId': '600XPE00',
                        'keyCriteriaIds': 'KC01,KC04,KC05,KC06,KC07,KC08,KC09,KC11,KC12,KC14,KC15,KC16',
                        'standardFeatureIds': '0002,0003,0004,0011,0014,0017,0018,0028,0030,0031,0032,0034,0036,0038,' +
                            '0039,0041,0042,0047,0048,0057,0060,0063,0071,0073,0075,0076,0078,0081,0083,0084,0085,' +
                            '0086,0087,0088,0089,0158,0160,0162,0164,0500,0501,0504,0507,0508,0509,0512',
                        'optionPackIds': 'P_01_003,P_02_003',
                        'capCode': 'MA6 20SPN4SPIM  2',
                        'specPage': 'gkl7baa6n3_specs.xml',
                        'price': '24444.0000'
                    },
                    {
                        'id': 'GKL7BAA6N5',
                        'rank': '16',
                        'bodyStyleId': '2200',
                        'gradeId': '003',
                        'engineId': '600XPE00',
                        'keyCriteriaIds': 'KC01,KC04,KC05,KC06,KC07,KC08,KC09,KC11,KC12,KC14,KC15,KC16',
                        'standardFeatureIds': '0002,0003,0004,0011,0014,0017,0018,0028,0030,0031,0032,0034,0036,0038,' +
                            '0039,0041,0042,0047,0048,0057,0060,0063,0071,0073,0075,0076,0078,0081,0083,0084,0085,' +
                            '0086,0087,0088,0089,0158,0160,0162,0164,0500,0501,0504,0507,0508,0509,0512',
                        'optionPackIds': 'P_04_002',
                        'capCode': 'MA6 20SPN4SPIM  2',
                        'specPage': 'gkl7baa6n3_specs.xml',
                        'price': '24544.0000'
                    }
                ],
                'baseVehicleDefaults': [
                    {
                        'baseVehicleId': 'GHW8BAA',
                        'wheelId': 'WHE_01',
                        'colourId': '41V',
                        'trimId': 'GN5',
                        'accessoryIds': 'null'
                    },
                    {
                        'baseVehicleId': 'GHW8BAA6N3',
                        'wheelId': 'WHE_01',
                        'colourId': '41V',
                        'trimId': 'GN5',
                        'accessoryIds': 'null'
                    },
                    {
                        'baseVehicleId': 'GHW8BAD',
                        'wheelId': 'WHE_01',
                        'colourId': '41V',
                        'trimId': 'GN5',
                        'accessoryIds': 'null'
                    },
                    {
                        'baseVehicleId': 'GHW8BAD6N3',
                        'wheelId': 'WHE_01',
                        'colourId': '41V',
                        'trimId': 'GN5',
                        'accessoryIds': 'null'
                    },
                    {
                        'baseVehicleId': 'GKL7BAA',
                        'wheelId': 'WHE_02',
                        'colourId': '35J',
                        'trimId': 'GN5',
                        'accessoryIds': 'null'
                    },
                    {
                        'baseVehicleId': 'GKL7BAA6N3',
                        'wheelId': 'WHE_02',
                        'colourId': '35J',
                        'trimId': 'GN8',
                        'accessoryIds': 'null'
                    },
                    {
                        'baseVehicleId': 'GKL7BAA6N4',
                        'wheelId': 'WHE_02',
                        'colourId': '35J',
                        'trimId': 'GN8',
                        'accessoryIds': 'null'
                    },
                    {
                        'baseVehicleId': 'GKL7BAA6N5',
                        'wheelId': 'WHE_02',
                        'colourId': '35J',
                        'trimId': 'GN8',
                        'accessoryIds': 'null'
                    }
                ],
                'bodyStyles': [
                    {
                        'name': 'Saloon',
                        'id': '2200',
                        'description': '',
                        'imageFileName': '9030abb0-f4ba-48f5-b871-a2097cbccfe2.jpg',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '001',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'name': 'Tourer',
                        'id': '5500',
                        'description': '',
                        'imageFileName': 'd8dba37d-2d0e-4d3b-bc97-40999cb9cfe1.jpg',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '001',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ]
                        }
                    }
                ],
                'grades': [
                    {
                        'name': 'SE',
                        'id': '001',
                        'description': '<b>Standard Features</b>&#xD;• 17\'&nbsp;Alloy wheel&#xD;• Manual ' +
                            'air-conditioning&#xD;• Front and rear electric windows&#xD;• Cruise control&#xD;• ' +
                            'Mazda Multimedia System&#xD;• Leather steering wheel and gear knob',
                        'imageFileName': '16f20581-4fcf-4599-9921-af08015f0ca7.jpg',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': []
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'name': 'SE-L',
                        'id': '002',
                        'description': '<span style=\'font-family: arial;\'><b>Standard Features as SE model ' +
                            'plus:</b>&#xD;• Smart City Brake Support (SCBS)&#xD;•&nbsp;Privacy glass&#xD;' +
                            '• Dual-zone climate control air-conditioning&#xD;• Front and rear parking sensors</span>',
                        'imageFileName': '97422af7-7630-40df-a25c-5181276d06d7.jpg',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': []
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'name': 'Sport',
                        'id': '003',
                        'description': '<b>Standard Features as SE-L model plus:</b>&#xD;• 19\' Alloy wheel&#xD;• ' +
                            'Leather trim&#xD;• Bose® sound system&#xD;•Reversing camera&#xD;' +
                            '• Smart keyless entry&#xD;• Bi-Xenon headlights with AFS',
                        'imageFileName': '90d69c74-add9-44a3-9455-7fb9c4005534.jpg',
                        'disclaimer': 'test 123',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': []
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': []
                                }
                            ]
                        }
                    }
                ],
                'engines': [
                    {
                        'taxIncrease': 15,
                        'id': '600BMCXPE00',
                        'imageFileName': '7fa49e11-2d04-48df-9815-55079e02cc8e.jpg',
                        'fuelType': 'Petrol',
                        'name': '2.0l 145ps Petrol Manual',
                        'engineSize': '2.0',
                        'enginePower': '144',
                        'performanceAndEconomy': [
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '5500',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '113',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '10.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            },
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '2200',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '123',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '8.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            }
                        ],
                        'dependencies': {
                            'availability': [
                                {
                                    'id': '5500',
                                    'type': 'bodyStyle',
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '002',
                                            'type': 'grade'
                                        }
                                    ]
                                },
                                {
                                    'id': '2200',
                                    'type': 'bodyStyle',
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '001',
                                            'type': 'grade'
                                        },
                                        {
                                            'preconditions': [],
                                            'id': '002',
                                            'type': 'grade'
                                        }
                                    ]
                                }
                            ]
                        },
                        'emissions': 'CO2 emissions: 131 g/km&#xD;Fuel consumption: 50.4 (5.6) mpg (l/100km)',
                        'transmission': 'Manual'
                    },
                    {
                        'taxIncrease': 15,
                        'id': 'A00BMC2XPE00',
                        'imageFileName': '5801c49b-af53-4b9e-a4e4-dcabf07fb96c.jpg',
                        'fuelType': 'Petrol',
                        'name': '2.0l 145ps Petrol Automatic',
                        'engineSize': '2.0',
                        'enginePower': '144',
                        'performanceAndEconomy': [
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '5500',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '113',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '10.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            },
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '2200',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '123',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '8.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            }
                        ],
                        'dependencies': {
                            'availability': [
                                {
                                    'id': '2200',
                                    'type': 'bodyStyle',
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '002',
                                            'type': 'grade'
                                        },
                                        {
                                            'preconditions': [],
                                            'id': '001',
                                            'type': 'grade'
                                        }
                                    ]
                                }
                            ]
                        },
                        'emissions': 'CO2 emissions: 136 g/km&#xD;Fuel consumption: 47.9 (5.9) mpg (l/100km)',
                        'transmission': 'Automatic'
                    },
                    {
                        'taxIncrease': 15,
                        'id': '600XPE00',
                        'imageFileName': '66467bce-db5b-4889-acde-e0bbc1f4c39c.jpg',
                        'fuelType': 'Petrol',
                        'name': '2.0l 165ps Petrol Manual',
                        'engineSize': '2.0',
                        'enginePower': '165',
                        'performanceAndEconomy': [
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '5500',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '113',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '10.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            },
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '2200',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '123',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '8.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            }
                        ],
                        'dependencies': {
                            'availability': [
                                {
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '003',
                                            'type': 'grade'
                                        }
                                    ],
                                    'id': '5500',
                                    'type': 'bodyStyle'
                                },
                                {
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '003',
                                            'type': 'grade'
                                        }
                                    ],
                                    'id': '2200',
                                    'type': 'bodyStyle'
                                }
                            ]
                        },
                        'emissions': 'CO2 emissions: 136 g/km&#xD;Fuel consumption: 47.9 (5.9) mpg (l/100km)',
                        'transmission': 'Manual'
                    },
                    {
                        'taxIncrease': 0,
                        'id': '600BMCXPY00',
                        'imageFileName': '00e327fb-56e6-4283-aa60-19a8f6220a25.jpg',
                        'fuelType': 'Diesel',
                        'name': '2.2l 150ps Diesel Manual',
                        'engineSize': '2.2',
                        'enginePower': '150',
                        'performanceAndEconomy': [
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '5500',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '113',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '10.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            },
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '2200',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '123',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '8.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            }
                        ],
                        'dependencies': {
                            'availability': [
                                {
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '001',
                                            'type': 'grade'
                                        },
                                        {
                                            'preconditions': [],
                                            'id': '002',
                                            'type': 'grade'
                                        },
                                        {
                                            'preconditions': [],
                                            'id': '003',
                                            'type': 'grade'
                                        }
                                    ],
                                    'id': '5500',
                                    'type': 'bodyStyle'
                                },
                                {
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '001',
                                            'type': 'grade'
                                        },
                                        {
                                            'preconditions': [],
                                            'id': '002',
                                            'type': 'grade'
                                        },
                                        {
                                            'preconditions': [],
                                            'id': '003',
                                            'type': 'grade'
                                        }
                                    ],
                                    'id': '2200',
                                    'type': 'bodyStyle'
                                }
                            ]
                        },
                        'emissions': 'CO2 emissions: 116 g/km&#xD;Fuel consumption: 64.2 (4.4) mpg (l/100km)',
                        'transmission': 'Manual'
                    },
                    {
                        'taxIncrease': 0,
                        'id': 'A00BMCXPY00',
                        'imageFileName': '64177de4-bf3c-457d-b32b-56d5632f7fc1.jpg',
                        'fuelType': 'Diesel',
                        'name': '2.2l 150ps Diesel Automatic',
                        'engineSize': '2.2',
                        'enginePower': '150',
                        'performanceAndEconomy': [
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '5500',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '113',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '10.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            },
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '2200',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '123',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '8.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            }
                        ],

                        'dependencies': {
                            'availability': [
                                {
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '002',
                                            'type': 'grade'
                                        }
                                    ],
                                    'id': '5500',
                                    'type': 'bodyStyle'
                                },
                                {
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '002',
                                            'type': 'grade'
                                        }
                                    ],
                                    'id': '2200',
                                    'type': 'bodyStyle'
                                }
                            ]
                        },
                        'emissions': 'CO2 emissions: 129 g/km&#xD;Fuel consumption: 57.6 (4.9) mpg (l/100km)',
                        'transmission': 'Automatic'
                    },
                    {
                        'taxIncrease': 0,
                        'id': '600XPY00',
                        'imageFileName': 'ba6eac1d-370f-4d04-81d6-f774b2b112d7.jpg',
                        'fuelType': 'Diesel',
                        'name': '2.2l 175ps Diesel Manual',
                        'engineSize': '2.2',
                        'enginePower': '175',
                        'performanceAndEconomy': [
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '5500',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '113',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '10.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            },
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '2200',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '123',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '8.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            }
                        ],
                        'dependencies': {'availability': [
                            {
                                'preconditions': [
                                    {
                                        'preconditions': [],
                                        'id': '003',
                                        'type': 'grade'
                                    }
                                ],
                                'id': '5500',
                                'type': 'bodyStyle'
                            },
                            {
                                'preconditions': [
                                    {
                                        'preconditions': [],
                                        'id': '003',
                                        'type': 'grade'
                                    }
                                ],
                                'id': '2200',
                                'type': 'bodyStyle'
                            }
                        ]},
                        'emissions': 'CO2 emissions: 121 g/km&#xD;Fuel consumption: 61.4 (4.6) mpg (l/100km)',
                        'transmission': 'Manual'
                    },
                    {
                        'taxIncrease': 0,
                        'id': 'A00XPY00',
                        'imageFileName': 'c7b2880d-649d-4177-9565-07d4aa61554f.jpg',
                        'fuelType': 'Diesel',
                        'name': '2.2l 175ps Diesel Automatic',
                        'engineSize': '2.2',
                        'enginePower': '175',
                        'performanceAndEconomy': [
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '5500',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '113',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '10.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            },
                            {
                                'name': 'Performance and Economy',
                                'bodyStyle': '2200',
                                'specs': [
                                    {
                                        'group': null,
                                        'name': 'Fuel tank capacity',
                                        'value': '51',
                                        'unit': 'litres'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Recommended fuel',
                                        'value': 'Unleaded 95 RON',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'EC emission level',
                                        'value': 'Euro V',
                                        'unit': ''
                                    },
                                    {
                                        'group': null,
                                        'name': 'CO2 emissions',
                                        'value': '119',
                                        'unit': 'g/km'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Top speed ',
                                        'value': '123',
                                        'unit': 'mph'
                                    },
                                    {
                                        'group': null,
                                        'name': 'Acceleration (0-62mph in sec.)',
                                        'value': '8.8',
                                        'unit': ''
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Combined',
                                        'value': '55.4 (5.1)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Extra Urban',
                                        'value': '65.7 (4.3)',
                                        'unit': 'mpg (l/100km)'
                                    },
                                    {
                                        'group': 'fuel consumption',
                                        'name': 'Urban',
                                        'value': '43.5 (6.5)',
                                        'unit': 'mpg (l/100km)'
                                    }
                                ]
                            }
                        ],
                        'dependencies': {
                            'availability': [
                                {
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '003',
                                            'type': 'grade'
                                        }
                                    ],
                                    'id': '5500',
                                    'type': 'bodyStyle'
                                },
                                {
                                    'preconditions': [
                                        {
                                            'preconditions': [],
                                            'id': '003',
                                            'type': 'grade'
                                        }
                                    ],
                                    'id': '2200',
                                    'type': 'bodyStyle'
                                }
                            ]
                        },
                        'emissions': 'CO2 emissions: 129 g/km&#xD;Fuel consumption: 57.6 (4.9) mpg (l/100km)',
                        'transmission': 'Automatic'
                    }
                ],
                'colours': [
                    {
                        'disclaimer': null,
                        'name': 'Arctic White',
                        'taxable': false,
                        'description': null,
                        'imageFileName': '2ae76169-c85e-4844-beac-1bc0c937e551.jpg',
                        'id': 'A4D',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '0.00',
                                    'id': '003',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '0.00',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '0.00',
                                    'id': '001',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'disclaimer': null,
                        'name': 'Aluminium Metallic',
                        'taxable': false,
                        'description': null,
                        'imageFileName': '1b909903-6040-43a1-a1cc-6d1ddad4802e.jpg',
                        'id': '38P',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '003',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '001',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'disclaimer': null,
                        'name': 'Blue Reflex Mica',
                        'taxable': false,
                        'description': null,
                        'imageFileName': '405543c5-1cc7-46d3-94dc-8d928553b077.jpg',
                        'id': '42B',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '003',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '001',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'disclaimer': null,
                        'name': 'Jet Black Mica',
                        'taxable': false,
                        'description': null,
                        'imageFileName': '8edb69b6-813c-425d-9bf6-a3419ab947f7.jpg',
                        'id': '41W',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '003',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '001',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'disclaimer': null,
                        'name': 'Meteor Gray Mica',
                        'taxable': false,
                        'description': null,
                        'imageFileName': 'ecdb0551-9bff-4363-b015-3518b9980257.jpg',
                        'id': '42A',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '003',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '001',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'disclaimer': null,
                        'name': 'Snowflake White Pearl',
                        'taxable': false,
                        'description': null,
                        'imageFileName': 'c53e36a9-e592-46fa-bb05-bff07c3ed211.jpg',
                        'id': '25D',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '003',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '001',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'disclaimer': null,
                        'name': 'Soul Red Metallic',
                        'taxable': true,
                        'description': null,
                        'imageFileName': '087a4dfc-6284-44b0-8717-be280d326a63.jpg',
                        'id': '41V',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '660.00',
                                    'id': '003',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '660.00',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '660.00',
                                    'id': '001',
                                    'preconditions': []
                                }
                            ]
                        }
                    },
                    {
                        'disclaimer': null,
                        'name': 'Stormy Blue Mica',
                        'taxable': false,
                        'description': null,
                        'imageFileName': '7a54fddf-63ab-4fc4-82bd-caffa5cd12c8.jpg',
                        'id': '35J',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '5500',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '001',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '002',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '003',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '002',
                                    'preconditions': []
                                },
                                {
                                    'type': 'grade',
                                    'value': '530.00',
                                    'id': '001',
                                    'preconditions': []
                                }
                            ]
                        }
                    }
                ],
                'wheels': [
                    {
                        'name': '17" Alloy wheel',
                        'imageFileName': '5694bdbe-8ebd-438f-befb-9e04ffcfb653.jpg',
                        'description': '',
                        'accessoryCode': 'ACCESSORY-WHE-01',
                        'price': '0.00',
                        'id': 'WHE_01',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '001',
                                    'preconditions': [
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': 'A00BMC2XPE00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': 'A00BMCXPY00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600BMCXPE00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600BMCXPY00',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '002',
                                    'preconditions': [
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': 'A00BMC2XPE00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': 'A00BMCXPY00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600BMCXPE00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600BMCXPY00',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                }
                            ],
                            'render': [
                                {
                                    'type': 'bodyStyle',
                                    'value': 'whe_01.png',
                                    'id': '2200',
                                    'preconditions': [

                                    ]
                                }
                            ]
                        }
                    },
                    {
                        'name': '17" Alloy wheel',
                        'imageFileName': '5694bdbe-8ebd-438f-befb-9e04ffcfb653.jpg',
                        'description': '',
                        'price': '0.00',
                        'id': 'ACCESSORY-WHE-01',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '001',
                                    'preconditions': [
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': 'A00BMC2XPE00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': 'A00BMCXPY00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600BMCXPE00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600BMCXPY00',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '002',
                                    'preconditions': [
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': 'A00BMC2XPE00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': 'A00BMCXPY00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600BMCXPE00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600BMCXPY00',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                }
                            ],
                            'render': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '2200_WHEEL_01_IMAGE_URL',
                                    'id': '2200',
                                    'preconditions': [

                                    ]
                                }
                            ]
                        }
                    },
                    {
                        'name': '19" Alloy Wheel',
                        'imageFileName': 'cf6bc77d-d0d3-47b7-bd63-b229d9d9af2f.jpg',
                        'description': '',
                        'price': '0.00',
                        'id': 'WHE_02',
                        'dependencies': {
                            'availability': [
                                {
                                    'type': 'grade',
                                    'value': '',
                                    'id': '003',
                                    'preconditions': [
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': 'A00XPY00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600XPE00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600XPY00',
                                            'preconditions': []
                                        },
                                        {
                                            'type': 'engine',
                                            'value': '',
                                            'id': '600BMCXPY00',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                }
                            ],

                            'render': [
                                {
                                    'type': 'default',
                                    'value': 'whe_02.png',
                                    'id': '',
                                    'preconditions': []
                                }
                            ]
                        }
                    }
                ],
                'trim': [
                    {
                        'id': 'GN1',
                        'imageFileName': 'e6dcfc93-6057-4aaf-bd9f-8f15e2d53be1.jpg',
                        'name': 'Black Cloth',
                        'disclaimer': null,
                        'dependencies': {
                            'availability': [
                                {
                                    'id': '2200',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '001',
                                            'type': 'grade',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                }
                            ],
                            'render': [
                                {
                                    'type': 'grade',
                                    'value': null,
                                    'id': '001',
                                    'preconditions': [
                                        {
                                            'type': 'engine',
                                            'value': '2200_TRIM_IMAGE_URL',
                                            'id': '600BMCXPE00',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        'id': 'GN5',
                        'imageFileName': 'e6dcfc93-6057-4aaf-bd9f-8f15e2d53be1.jpg',
                        'name': 'Black Cloth',
                        'disclaimer': null,
                        'dependencies': {
                            'availability': [
                                {
                                    'id': '5500',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '001',
                                            'type': 'grade',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '002',
                                            'type': 'grade',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '2200',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '001',
                                            'type': 'grade',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '002',
                                            'type': 'grade',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                }
                            ],
                            'render': [
                                {
                                    'type': 'grade',
                                    'value': null,
                                    'id': '002',
                                    'preconditions': [
                                        {
                                            'type': 'engine',
                                            'value': '2200_TRIM_IMAGE_URL',
                                            'id': '600BMCXPE00',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        'id': 'GN8',
                        'imageFileName': 'd8757a68-bf80-474d-ad69-33016558b801.jpg',
                        'name': 'Black Leather',
                        'disclaimer': null,
                        'dependencies': {
                            'selection': [
                                {
                                    'id': 'P_01_003',
                                    'type': 'optionPack',
                                    'value': '',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '5500',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '003',
                                            'type': 'grade',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '2200',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '003',
                                            'type': 'grade',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '0.00',
                                    'preconditions': []
                                }
                            ]

                        }
                    },
                    {
                        'id': 'GN7',
                        'imageFileName': '659e4a03-fe4f-4361-bbc6-66dc4fbb45cf.jpg',
                        'name': 'Light Stone Leather',
                        'disclaimer': null,
                        'dependencies': {
                            'availability': [
                                {
                                    'id': '5500',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '003',
                                            'type': 'grade',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '2200',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '003',
                                            'type': 'grade',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ],
                            'price': [
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '100.00',
                                    'preconditions': []
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '100.00',
                                    'preconditions': []
                                },
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '200.00',
                                    'preconditions': []
                                }
                            ]
                        }
                    }
                ],
                'standardFeatures': [
                    {
                        'id': '0028',
                        'price': '0.00',
                        'Category': 'Comfort and Convenience',
                        'file': {
                            'filename': '82d14fbe-1d09-432f-9a06-53639a03c791.jpg'
                        },
                        'name': 'Front and rear electric windows'
                    },
                    {
                        'id': '0037',
                        'price': '0.00',
                        'Category': 'Comfort and Convenience',
                        'file': {
                            'filename': '9a0456ce-0fa4-442a-9287-33ee449491a7.jpg'
                        },
                        'name': 'Manual air-conditioning'
                    },
                    {
                        'id': '0038',
                        'price': '0.00',
                        'Category': 'Comfort and Convenience',
                        'file': {
                            'filename': '03bb1f26-82fc-49ce-9fb8-07c46dabeb66.jpg'
                        },
                        'name': 'Dual-zone climate control air-conditioning'
                    },
                    {
                        'id': '0075',
                        'price': '0.00',
                        'Category': 'Comfort and Convenience',
                        'file': {
                            'filename': '6affaa35-f6b3-447e-9bea-c3c80d13361a.jpg'
                        },
                        'name': 'Cruise control'
                    },
                    {
                        'id': '0078',
                        'price': '0.00',
                        'Category': 'Comfort and Convenience',
                        'file': {
                            'filename': '1ff7f929-b84c-467d-a4fb-aa68550a1565.jpg'
                        },
                        'name': 'Smart keyless entry'
                    },
                    {
                        'id': '0081',
                        'price': '0.00',
                        'Category': 'Comfort and Convenience',
                        'file': {
                            'filename': 'c828aa46-2d3a-4554-b9ba-9a4033843163.jpg'
                        },
                        'name': 'Engine push button start'
                    },
                    {
                        'id': '0085',
                        'price': '0.00',
                        'Category': 'Comfort and Convenience',
                        'file': {
                            'filename': '4b252ee3-7f16-4fe7-aae0-7ee34da6e075.jpg'
                        },
                        'name': 'Remote central locking'
                    },
                    {
                        'id': '0001',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': 'df3231c0-fc1e-46a5-8017-6b7a6b4b68b8.jpg'
                        },
                        'name': 'Halogen headlights'
                    },
                    {
                        'id': '0002',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': 'b0bd5ab2-7beb-4164-80f7-b27ce4307e80.jpg'
                        },
                        'name': 'Bi-Xenon headlights with Adaptive Front Lighting System (AFS)'
                    },
                    {
                        'id': '0003',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': '80cec99e-fcbe-4be7-9bea-a97f4b5cd79b.jpg'
                        },
                        'name': 'Front fog lights'
                    },
                    {
                        'id': '0004',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': 'c3672b47-8112-409c-921c-e34e3da39d11.jpg'
                        },
                        'name': 'Dusk-sensing lights'
                    },
                    {
                        'id': '0011',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': 'c5a53d7f-a1e3-4c3a-895e-ab151e0ae428.jpg'
                        },
                        'name': 'Privacy glass'
                    },
                    {
                        'id': '0014',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': '852a97a0-75ae-4381-9b05-cfb21338c5d7.jpg'
                        },
                        'name': 'Power folding, heated door mirrors with integrated indicator light'
                    },
                    {
                        'id': '0016',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': 'b4e037d2-0782-441b-bfe8-06e8ebfa3457.jpg'
                        },
                        'name': 'Heated door mirrors with integrated indicator light'
                    },
                    {
                        'id': '0017',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': '677dfd90-43ed-46ba-a535-f131793046ca.jpg'
                        },
                        'name': 'Rain-sensing front wipers'
                    },
                    {
                        'id': '0018',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': 'a4561264-ee1a-4eaf-b390-cd9cbcd96077.jpg'
                        },
                        'name': 'Front and rear parking sensors'
                    },
                    {
                        'id': '0073',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': '9682f743-61f6-431e-af28-ae8c28e6123e.jpg'
                        },
                        'name': 'Reversing camera'
                    },
                    {
                        'id': '0360',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {},
                        'name': 'Rear view camera'
                    },
                    {
                        'id': '0511',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': 'b86460ec-4847-4de2-97d6-f42d8274e760.jpg'
                        },
                        'name': 'Daytime running lights'
                    },
                    {
                        'id': '0512',
                        'price': '0.00',
                        'Category': 'Exterior',
                        'file': {
                            'filename': 'fcf873fe-9dea-481e-82c6-19e4eb0fc08f.jpg'
                        },
                        'name': 'LED daytime running lights'
                    },
                    {
                        'id': '0030',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': 'f53ad7db-d671-4ba8-a6ac-bd8910779679.jpg'
                        },
                        'name': 'Integrated Bluetooth®'
                    },
                    {
                        'id': '0032',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '84441bc4-b693-4ef4-915d-b4d9d3ab528b.jpg'
                        },
                        'name': 'Trip computer'
                    },
                    {
                        'id': '0033',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '431d96e6-3ffb-4876-82e1-97e6548bce1a.jpg'
                        },
                        'name': 'Four speakers'
                    },
                    {
                        'id': '0034',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '2bb0a1c3-eaf0-425a-b9b0-4efc7670d6ed.jpg'
                        },
                        'name': 'AM/FM radio with CD player'
                    },
                    {
                        'id': '0035',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '0abff08c-db7d-47ba-a863-900e1a2ec31e.jpg'
                        },
                        'name': 'Six speakers'
                    },
                    {
                        'id': '0036',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': 'e105d544-8411-4f0f-bdc5-188fcbee3fb7.jpg'
                        },
                        'name': 'Premium Bose® surround sound system'
                    },
                    {
                        'id': '0039',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '70d66aa1-3e8c-473b-b949-ace3da4cecbf.jpg'
                        },
                        'name': 'Auto-dimming rear-view mirror'
                    },
                    {
                        'id': '0041',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': 'c9bd36ab-89b6-4f85-bef5-06a66ed414c0.jpg'
                        },
                        'name': 'Steering wheel audio controls'
                    },
                    {
                        'id': '0042',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '011b9b5d-5313-434f-a816-fe82973405a2.jpg'
                        },
                        'name': 'Leather steering wheel'
                    },
                    {
                        'id': '0046',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '9c5764d2-92eb-4847-9949-81bce787caa0.jpg'
                        },
                        'name': 'Driver’s seat, reclining and height adjustment'
                    },
                    {
                        'id': '0047',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '350862fb-ffe8-41cc-8e10-d4bdc5bba5c2.jpg'
                        },
                        'name': 'Heated front seats'
                    },
                    {
                        'id': '0048',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '39ecff0f-a8f0-413d-8239-6aae0d2e83fb.jpg'
                        },
                        'name': 'Leather seat trim'
                    },
                    {
                        'id': '0055',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '97154689-4be1-4d20-9403-fc979f1eb243.jpg'
                        },
                        'name': 'Driver’s seat lumbar adjustment'
                    },
                    {
                        'id': '0057',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': 'd53e7bbe-6f62-4f3c-bf4b-079a9f043402.jpg'
                        },
                        'name': 'Sliding centre armrest'
                    },
                    {
                        'id': '0060',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': 'e0862af7-28c0-4f8c-8a0f-0af62ccc03af.jpg'
                        },
                        'name': 'Eleven speakers'
                    },
                    {
                        'id': '0063',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '00a85d51-5c34-4382-a60e-799bd16d25cd.jpg'
                        },
                        'name': 'Auxiliary input jack (AUX)'
                    },
                    {
                        'id': '0121',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '28a7aae4-9dad-4d98-9644-0e9022351c30.jpg'
                        },
                        'name': 'Cloth seat trim'
                    },
                    {
                        'id': '0158',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {},
                        'name': '6-way driver’s seat power adjustment'
                    },
                    {
                        'id': '0160',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {},
                        'name': 'Driver’s seat, power lumbar adjustment'
                    },
                    {
                        'id': '0162',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {},
                        'name': '4-way passenger seat power adjustment'
                    },
                    {
                        'id': '0273',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {},
                        'name': 'SEAT-CLO 1;WARMER'
                    },
                    {
                        'id': '0275',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {},
                        'name': 'SEAT-CL1;WAR,ARMREST'
                    },
                    {
                        'id': '0276',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {},
                        'name': 'SEAT-LEAT+CLO 2;WARM'
                    },
                    {
                        'id': '0315',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {},
                        'name': 'AUD-9/100,CD_MP3;SP6'
                    },
                    {
                        'id': '0507',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': 'dbaff532-a972-4039-bb50-7adfcec7eb7d.jpg'
                        },
                        'name': 'Multimedia commander'
                    },
                    {
                        'id': '0508',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': '01a604df-5065-42da-8471-caa86166cee6.jpg'
                        },
                        'name': 'Integrated 5.8” colour touch screen'
                    },
                    {
                        'id': '0509',
                        'price': '0.00',
                        'Category': 'Interior',
                        'file': {
                            'filename': 'd3127ce9-522e-444c-a584-dec438ed1049.jpg'
                        },
                        'name': 'USB connectivity'
                    },
                    {
                        'id': '0500',
                        'price': '0.00',
                        'Category': 'Mechanical',
                        'file': {
                            'filename': 'b56f1096-6e78-4e0d-94d8-4b439d26ac80.jpg'
                        },
                        'name': 'i-Stop'
                    },
                    {
                        'id': '0501',
                        'price': '0.00',
                        'Category': 'Mechanical',
                        'file': {
                            'filename': 'd69e0b56-2fb5-47fe-be7a-c464030fea1c.jpg'
                        },
                        'name': 'i-ELOOP'
                    },
                    {
                        'id': '0031',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': 'fc554f9a-42ad-401d-926d-ab73cd5f3849.jpg'
                        },
                        'name': 'Tyre Pressure Monitoring System (TPMS)'
                    },
                    {
                        'id': '0071',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': 'bd4118f9-4faa-4605-9b4b-1ee345377b89.jpg'
                        },
                        'name': 'ISOFIX child seat anchorages'
                    },
                    {
                        'id': '0076',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': 'cd80a21d-cde2-4034-9d53-ce49fda1902a.jpg'
                        },
                        'name': 'Thatcham Category 1 alarm and immobiliser'
                    },
                    {
                        'id': '0083',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': 'f3ca2bca-a2ce-44eb-84b6-a0d4340dfed6.jpg'
                        },
                        'name': 'Dynamic Stability Control (DSC) with Traction Control System (TCS)'
                    },
                    {
                        'id': '0084',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': 'b41ed5b3-a87b-4e5a-9823-c0a1488a7616.jpg'
                        },
                        'name': 'Emergency Stop Signalling system (ESS)'
                    },
                    {
                        'id': '0086',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': '3aad6ab1-2258-4c7a-9296-c6beb3de0722.jpg'
                        },
                        'name': 'Driver and front passenger airbags'
                    },
                    {
                        'id': '0087',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': '2ffc5c74-693b-40cd-923c-3d3aed99f61d.jpg'
                        },
                        'name': 'Front side airbags'
                    },
                    {
                        'id': '0088',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': 'e74bbb01-7644-45a2-a121-05e36eba0b0f.jpg'
                        },
                        'name': 'Curtain airbags'
                    },
                    {
                        'id': '0089',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': '8400ef16-f331-400a-9c3c-b49b8196b28b.jpg'
                        },
                        'name': 'Hill Hold Assist'
                    },
                    {
                        'id': '0164',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {},
                        'name': 'Passenger airbag cut-off switch'
                    },
                    {
                        'id': '0504',
                        'price': '0.00',
                        'Category': 'Safety and Security',
                        'file': {
                            'filename': 'f3184bb0-01d7-4bc1-88ca-6af9ba677b54.jpg'
                        },
                        'name': 'Smart City Brake Support (SCBS)'
                    }
                ],
                'optionPack': [
                    {
                        'id': 'P_01_003',
                        'name': 'Navigation_1',
                        'caption': 'P_01',
                        'dependencies': {
                            'render': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': []
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '100.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'selection': [
                                {
                                    'id': 'GN8',
                                    'type': 'trim',
                                    'value': '',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '2200',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': [
                                                {
                                                    'id': '600XPE00',
                                                    'type': 'engine',
                                                    'value': '',
                                                    'preconditions': []
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]

                        }
                    },
                    {
                        'id': 'P_02_003',
                        'name': 'Navigation_2',
                        'caption': 'P_02',
                        'dependencies': {
                            'render': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': []
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '100.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '2200',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': [
                                                {
                                                    'id': '600XPE00',
                                                    'type': 'engine',
                                                    'value': '',
                                                    'preconditions': []
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]

                        }
                    },
                    {
                        'id': 'P_04_002',
                        'name': 'Navigation_3',
                        'caption': 'P_04',
                        'dependencies': {
                            'render': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'id': '2200',
                                    'preconditions': []
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '100.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '2200',
                                    'type': 'bodyStyle',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'type': 'grade',
                                            'value': '',
                                            'id': '003',
                                            'preconditions': [
                                                {
                                                    'id': '600XPE00',
                                                    'type': 'engine',
                                                    'value': '',
                                                    'preconditions': []
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]

                        }
                    }
                ],
                'accessories': [
                    {
                        'unit': '1',
                        'id': 'GHP9-V4-090',
                        'name': 'Rear bumper step plate',
                        'group': 'Test group',
                        'dependencies': {
                            'render': [
                                {
                                    'type': 'bodyStyle',
                                    'value': '2200_GHP9-V4-090.png',
                                    'id': '2200',
                                    'preconditions': []
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '100.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '25ba4cee-953b-464d-a118-938a27398746.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GHK1-V4-920-00',
                        'name': 'Rear spoiler, lip type',
                        'group': 'Test group',
                        'dependencies': {
                            'render': [
                                {
                                    'type': 'bodyStyle',
                                    'value': 'GHK1-V4-920-00.png',
                                    'id': '2200',
                                    'preconditions': []
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '250.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '7ee60705-07d7-484f-8f7d-0143f562e277.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GHP9-V4-920',
                        'name': 'Rear roof spoiler',
                        'group': null,
                        'dependencies': {
                            'render': [
                                {
                                    'type': 'bodyStyle',
                                    'value': 'GHP9-V4-920.png',
                                    'id': '2200',
                                    'preconditions': []
                                }
                            ],
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '1000.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '71b70c53-7447-4070-8906-828d3f1a6717.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GHP9-V4-900',
                        'name': 'Front airdam skirt',
                        'group': null,
                        'dependencies': {
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '600.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '4abff465-7b2a-4e65-97cf-136456faf125.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GHP9-V3-450',
                        'name': 'Mud flaps, front',
                        'group': null,
                        'dependencies': {
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '5000.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': 'fca0f80a-04c9-458d-b6f8-4a1c425242f5.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GHK1-V3-460',
                        'name': 'Mud flaps, rear',
                        'group': null,
                        'dependencies': {
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '90.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '2806bd7c-ea02-4f6f-b6de-7b11af7f3d2d.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GHP9-V3-460',
                        'name': 'Mud flaps, rear',
                        'group': null,
                        'dependencies': {
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '10.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '0023cf24-2a5f-4801-a146-962bd72bd4bb.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GKM1-V0-320',
                        'name': 'Floor mats "Standard"',
                        'group': null,
                        'dependencies': {
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '100.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '15f1f8fa-5f2b-4db8-b982-3648cbd0ab41.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GJA1-V0-320',
                        'name': 'Floor mats "Standard"',
                        'group': null,
                        'dependencies': {
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '60.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '51095132-3da1-4adf-bb9a-0df49846a46e.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GHW8-V0-320',
                        'name': 'Floor mats "Luxury""',
                        'group': null,
                        'dependencies': {
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '25.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '60759a95-3ddc-436b-b245-89ca7665ebd8.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GJE8-V0-320',
                        'name': 'Floor mats "Luxury"',
                        'group': null,
                        'dependencies': {
                            'price': [
                                {
                                    'type': 'grade',
                                    'value': '5000.00',
                                    'id': '003',
                                    'preconditions': []
                                }
                            ],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '2b801dcb-88e9-426d-9a23-b9b488b7f786.jpg',
                        'price': [],
                        'disclaimer': null
                    }
                ],
                'disclaimerDictionary': {
                    '1': 'DS52RAQ DisclaimerHeader',
                    '2': 'DS52RAQ InititalDisclaimer',
                    '3': 'ACT state True Red rdp disclaimer',
                    '4': 'ACT state Std rdp disclaimer',
                    '5': 'ACT state True Red promo disclaimer',
                    '6': 'ACT state Std promo disclaimer',
                    '7': 'Special Offer. Recommended Driveaway Price',
                    '8': 'DS52RAQ True Red colour disclaimer',
                    '9': 'DS52RAQ Std colour disclaimer'
                },
                'disclaimerHeader': {
                    'availability': [
                        {
                            'type': 'msc',
                            'value': '1',
                            'id': 'GHW8BAA'
                        },
                        {
                            'type': 'msc',
                            'value': '1',
                            'id': 'GKL7BAA6N3'
                        }
                    ]
                },
                'initialDisclaimer': {
                    'availability': [
                        {
                            'type': 'msc',
                            'value': '2',
                            'id': 'GHW8BAA'
                        },
                        {
                            'type': 'msc',
                            'value': '2',
                            'id': 'GKL7BAA6N3'
                        }
                    ]
                },
                'rdpDisclaimer': {
                    'availability': [
                        {
                            'type': 'msc',
                            'id': 'GHW8BAA',
                            'preconditions': [
                                {
                                    'type': 'colour',
                                    'value': '3',
                                    'id': 'A4D'
                                }
                            ]
                        },
                        {
                            'type': 'msc',
                            'value': '4',
                            'id': 'GKL7BAA6N3'
                        }
                    ]
                },
                'promoDisclaimer': {
                    'availability': [
                        {
                            'type': 'msc',
                            'id': 'GHW8BAA',
                            'preconditions': [
                                {
                                    'type': 'colour',
                                    'value': '5',
                                    'id': 'A4D'
                                }
                            ]
                        },
                        {
                            'type': 'msc',
                            'value': '6',
                            'id': 'GHW8BAA'
                        },
                        {
                            'type': 'msc',
                            'value': '7',
                            'id': 'GHW8BAA'
                        }
                    ]
                },
                'colourDisclaimer': {
                    'availability': [
                        {
                            'type': 'msc',
                            'id': 'GHW8BAA',
                            'preconditions': [
                                {
                                    'type': 'colour',
                                    'value': '8',
                                    'id': 'A4D'
                                }
                            ]
                        },
                        {
                            'type': 'msc',
                            'value': '9',
                            'id': 'GKL7BAA6N3'
                        }
                    ]
                }
            }
        });
});
