const { fork } = require('node:child_process');

const getSystemFonts = require('get-system-fonts');

process.on('message', () => {
  getSystemFonts({
    additionalFolders: ['/System/Library/Fonts/Supplemental/']
  }).then(systemFontPaths => {
    const childProcess = fork('src/main/support/child-processes/retrieve-font-meta-data-process.ts');

    childProcess.on('message', (result) => process.send(result));

    childProcess.send({ systemFontPaths });
  });
});
