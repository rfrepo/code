# Frontend Testing Best Practices

## BDD

### Specifications

Name you spec files by what you are testing followed by the word spec.

```
WidgetSpec.js
stringUtilsSpec.js
```

### Describe

```javascript
describe('Widget', function () { });
```

Describe should be named after either the application, the module you are testing or the Class.

If you are not describing a class use lowercase.

```javascript
describe('stringUtils', function () { });
```

You can nest as many describes as you need to test different functionality.

```javascript
describe('Widget', function () {
    describe('errors', function () {

    });
});
```

### It

```javascript
it('should do something when something happens', function () { });
```

A real example:

```javascript
it('should have cooked chips when I put chips in the fryer', function () { });
```

The main goal of BDD is to test the result of a scenario, the inner workings do not matter.

### Example

```javascript
describe('Configuration', function () {

    var configuration;

    beforeEach(function () {
        configuration = new Configuration();
    });

    describe('initialize', function () {
        it ('should have no color value when configuration is created', function () {
            expect(configuration.get('color')).not.toBeDefined();
        }
    });
});
```

## Unit testing

To get the best coverage possible sometimes you will create a utility that is not behaviour driven.
You will encounter this during a BDD test you can stop the current BDD test and unit test that element to make sure that it works.

```javascript
describe('Calculator', function () {
    describe('adding numbers', function () {
        it ('should return 2 when adding 1 plus 1', function () {
            expect(Calculator.add(1, 1)).toEqual(2);
        }

        it ('should return 3 when adding 1 plus 2', function () {
            expect(Calculator.add(1, 2)).toEqual(2);
        }
    });

    describe('multiplying numbers', function () {
        it ('should return 4 when multiplying 2 times 2', function () {
            expect(Calculator.multiply(2, 2)).toEqual(4);
        }
    });
});
```

## Testing RequireJS Modules with Jasmine

```javascript
define(['utils/Calculator'], function (Calculator) {
    describe('Calculator', function () {
        describe('adding numbers', function () {
            it ('should return 2 when adding 1 plus 1', function () {
                expect(Calculator.add(1, 1)).toEqual(2);
            }
        });
    });
});
```