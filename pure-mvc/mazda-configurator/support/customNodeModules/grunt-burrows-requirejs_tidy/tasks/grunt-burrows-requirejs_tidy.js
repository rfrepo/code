module.exports = function (grunt) {
    'use strict';
    grunt.registerMultiTask('burrows-requirejs_tidy', '', function () {

        var options = this.options(),
            baseUrl = options.baseUrl,
            fileArray = this.files;

        fileArray.forEach(function (filesObject) {

            var files = grunt.file.expand(filesObject.src);

            files.forEach(amendLongDependencyClassNames);
        });

        function amendLongDependencyClassNames(filePath) {
            var regExpPatterns = {
                    topOfFile: new RegExp('define\\(\\[\\s*((?:(?:\\/\\*)?\'[\\w/]+\',?(?:\\*\\/)?\\s*)*)\\s*],' +
                        '\\s*function\\s*\\(\\)\\s*{\\s*\'use strict\';'),
                    dependency: /[^\w\/,]/g
                },
                file = {
                    contents: grunt.file.read(filePath),
                    dependencies: {}
                };

            regExpPatterns.topOfFile = regExpPatterns.topOfFile.exec(file.contents);

            if (regExpPatterns.topOfFile !== null && regExpPatterns.topOfFile[1] !== '') {

                file.head = regExpPatterns.topOfFile[0];
                file.dependencies.string = regExpPatterns.topOfFile[1];

                file.contents = file.contents.replace(file.head, '{{head}}');
                file.head = file.head.replace(file.dependencies.string, '{{deps}}');
                file.dependencies.string = file.dependencies.string.replace(/\/\*.*\*\/\n\s*/g, '');
                file.dependencies.list = file.dependencies.string.replace(regExpPatterns.dependency, '').split(',');

                file.dependencies.declared = getDeclaredDependencyVariables(file.dependencies.list, file.contents);
                addReturnToSupportFiles(file.dependencies.declared);

                file.head = file.head.replace('{{deps}}', file.dependencies.string);
                file = getUpdatedContentWithNewVars(file);

                grunt.file.write(filePath, file.contents);
            }

        }

        function getDeclaredDependencyVariables(depsArray, contents) {
            var dependencies = [], locationArray = [];

            depsArray.forEach(function (location, index) {
                var className = location.split('/').join('.'),
                    classNameRegExp = new RegExp('[\\s.]+' + className + '[^A-Za-z0-9]+'),
                    nonPureMVCClasses = [
                        'support/GlobalConfig',
                        'support/GlobalConstants',
                        'support/LocaleDictionary',
                        'support/PlatformDectector',
                        'support/UrlExtractor',
                        'support/services/LoadSyncDataService'
                    ];

                if (classNameRegExp.test(contents) && nonPureMVCClasses.indexOf(location) === -1 &&
                locationArray.indexOf(location) === -1) {
                    locationArray[locationArray.length] = location;
                    dependencies[dependencies.length] = {
                        string: location,
                        index: index
                    };
                }
            });

            return dependencies;
        }

        function getUpdatedContentWithNewVars(file) {
            var fileNameRegExp = /\/?(\w+)$/,
                varSpacing, varSpacingRegExp = /\n(\s*)'use strict';/,
                variables = [];

            file.dependencies.declared.forEach(function (locationObj) {
                var className = locationObj.string.split('/').join('.'),
                    fileName;

                fileName = fileNameRegExp.exec(locationObj.string)[1];
                if (className.indexOf('.') !== -1) {
                    className = 'bmc.' + className;
                }

                file.contents = file.contents.replace(new RegExp(className, 'g'), fileName);
                variables[variables.length] = fileName + ' = arguments[' + locationObj.index + ']';

                if (file.contents.indexOf(fileName + ' = ' + fileName) !== -1) {

                    file.contents = file.contents.replace(
                        new RegExp(',(\\s*)' + fileName + ' = ' + fileName + ',\\s*', 'g'), ',$1');
                    file.contents = file.contents.replace(
                        new RegExp(',\\s*' + fileName + ' = ' + fileName + '\\s*', 'g'), '');
                    file.contents = file.contents.replace(
                        new RegExp('\\s+' + fileName + ' = ' + fileName + ',?\\s*', 'g'), ' ');
                    file.contents = file.contents.replace(/var ;/g, '');
                }
            });

            if (file.dependencies.declared.length > 0) {
                varSpacing = varSpacingRegExp.exec(file.head)[1];
                file.contents = file.contents.replace(
                    '{{head}}', file.head + '\n' + varSpacing + 'var ' + variables.join(',\n        ') + ';\n');
            } else {
                file.contents = file.contents.replace('{{head}}', file.head);
            }

            return file;
        }

        function addReturnToSupportFiles(depsArray) {
            depsArray.forEach(function (locationObj) {
                var supportFilePath = baseUrl + locationObj.string + '.js',
                    supportFileRegExp = /return puremvc.define\(\s*\{/,
                    supportFile;

                if (grunt.file.exists(supportFilePath)) {
                    supportFile = grunt.file.read(supportFilePath);

                    if (!supportFileRegExp.test(supportFile)) {
                        supportFile = supportFile.replace(/puremvc.define\(\s*\{/, 'return puremvc.define({');
                        grunt.file.write(supportFilePath, supportFile);
                    }
                }
            });
        }
    });
};