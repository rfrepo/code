let resolve;

let isSystemFontsDataResolved = false;

const systemFontsData = new Promise(res => resolve = res);

const getSystemFontsData = () => systemFontsData;

const setSystemFontsData = systemFontsData => {
  isSystemFontsDataResolved = true;

  resolve(systemFontsData);
};

module.exports = {
  SystemFontsService: {
    getSystemFontsData,
    setSystemFontsData
  }
};

