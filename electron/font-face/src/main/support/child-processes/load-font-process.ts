const opentype = require('opentype.js');

process.on('message', ({ path }) => {
  opentype.load(path, (err, font) => {
    if (err) process.send({ path, error: err.message });
    else process.send({
      path,
      meta: {
        fullName: font.tables?.name.fontFamily.en,
        fontFamily: font.tables?.name.postScriptName.en,
        fontSubfamily: font.tables?.name.fontSubfamily.en
      }
    });
  });
});
