# Frontend Coding Best Practices

## Cardinal Rules

### Are You A Professional?
* Are You A Professional?
* Do no harm!
* Leave something in a better state than you found it.
* If you see something that is wrong.... Refactor it! If you need more time to, escalate to your team leader, project manager. The The Digital Studio will make the decision if it should be changed.
* Your code should not look personal. You should not be able to tell who has written it. It should follow the Burrows Digital Studio standards.
* You are a team... Not an individual! Make sure all your code is as easy for them to understand as it is for you! If you don’t know......... ASK ONE OF THEM!

## Linting

### JSLint & JSHint
* Must always be switched on in Grunt and WebStorm.
* Console and Alert can be toggled off, but must never be committed in this form.
* If a framework makes it impossible to Lint then we will discuss as a team to toggle that rule.

## Class style with RequireJS

```javascript
define([], function () {

    function VehicleRepository () {
        var self = this;

        self.vehicles = [];
    }

    function hasMatchingMSCCode(vehicle, mscCode) {
        return vehicle.getMSC() === mscCode;
    }

    VehicleRepository.prototype.getVehicleByMSC = function (mscCode) {
        var self = this,
            i,
            numberOfVehicles = self.vehicles.length,
            vehicle;

        for (i = 0; i < numberOfVehicles; i += 1) {
            vehicle = self.vehicles[i];

            if (hasMatchingMSCCode(vehicle, mscCode)) {
                return vehicle;
            }
        }

        return null;
    };

    return VehicleRepository;
});
```
