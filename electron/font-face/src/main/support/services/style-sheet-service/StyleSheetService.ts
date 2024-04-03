const createFontFaceDeclarations = ({ meta, path }) => `
            @font-face {
                font-family: '${meta?.fontFamily}';
                src: url('file://${path}');
            }
        `;

const createAppendStyleSheetScript = (fontFaceDeclarations) => `
            const style = document.createElement('style');
            style.id='dynamic-fonts'
            style.appendChild(document.createTextNode(\`${fontFaceDeclarations}\`));
            document.head.appendChild(style);
            
            window.data = ${JSON.stringify({ person: 'kc' })}
        `;

const createAppendParentDiv = (divs) => `
const parentDiv = document.createElement('div');
parentDiv.style.cssText = 'position:absolute;height:1px;width:1px;overflow:hidden;';
parentDiv.innerHTML = '${divs}';
document.body.appendChild(parentDiv);
`;

const createDivs = ({ meta }) => `<div style="font-family: ${meta?.fontFamily}; position: absolute;">abc-123</div>`;

const appendFontFaceStyleSheetToDom = (mainWindow, systemFontData) => {
  let fontFaceDeclarations = '';

  let divs = '';

  systemFontData.forEach(fontData => {
    fontFaceDeclarations += createFontFaceDeclarations(fontData);

    divs += createDivs(fontData);
  });

  const script = `
  ${createAppendStyleSheetScript(fontFaceDeclarations)}
  ${createAppendParentDiv(divs)}
  `;

  mainWindow.webContents.executeJavaScript(script);
};

export const StyleSheetService = {
  appendFontFaceStyleSheetToDom
};
