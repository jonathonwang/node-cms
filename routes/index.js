const fs = require('fs');

const routesExports = {};
const routesDirectories = [
  __dirname
];

// Imports all files found in given directories
for(let routesDir of routesDirectories) {
  const filenames = fs.readdirSync(routesDir);
  for(let filename of filenames){
    if(routesDir + '/' + filename !== __dirname + '/' + 'index.js') {
      const filenameNoExt = filename.substr(0, filename.indexOf('.'), filename.length);
      routesExports[filenameNoExt] = require(routesDir + '/' + filename);
    }
  }
}



module.exports = routesExports;
