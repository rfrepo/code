const { fork } = require('node:child_process');

const { StyleSheetService } = require('../style-sheet-service/StyleSheetService.ts');

let mainWindow;

let systemFontsData;

let systemFontResolve;

const systemFontsDataPromised = new Promise(resolve => systemFontResolve = resolve);

const attemptToAppendStyleSheetToDom = () => {
  if (!(mainWindow && systemFontsData)) return;
  StyleSheetService.appendFontFaceStyleSheetToDom(mainWindow, systemFontsData);
};

const initialise = () => {
  const initialiseLocalFontsDataRetrievalProcess = fork('./src/main/support/child-processes/initialise-local-fonts-data-retrieval-process.ts');

  initialiseLocalFontsDataRetrievalProcess.on('message', result => {
    systemFontsData = result;

    systemFontResolve(systemFontsData);

    if (mainWindow) attemptToAppendStyleSheetToDom();
  });

  initialiseLocalFontsDataRetrievalProcess.send('message');
};

const setMainWindow = (_mainWindow) => {
  mainWindow = _mainWindow;

  attemptToAppendStyleSheetToDom();
};

module.exports = {
  FontsAndStyleSheetService: {
    initialise,
    setMainWindow,
    getSystemFontsData: () => systemFontsDataPromised
  }
};
