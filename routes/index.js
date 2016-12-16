const fs = require('fs');

const routesDirectories = [
  __dirname
];

// Imports all files found in given directories
// Assigns them to the RoutesExports Object based on File Name
const routesFileImporter = (routesDirectories) => {
  const routesExports = {};
  for(let routesDir of routesDirectories) {
    const filenames = fs.readdirSync(routesDir);
    for(let filename of filenames){
      const filePath = routesDir + '/' + filename;
      // Can be used to check isDirectory() or isFile();
      const fileStats = fs.lstatSync(filePath);
      if(!filePath.includes('index.js') && fileStats.isFile()) {
        const filenameNoExt = filename.substr(0, filename.indexOf('.'), filename.length);
        if(routesDir.endsWith('/routes')) {
          routesExports[filenameNoExt] = require(routesDir + '/' + filename);
        } else {
          // Might need to do some more work here depending on if I need to
          // add more folders inside of /routes
          console.log(routesDir);
          routesExports[filenameNoExt] = require(routesDir + '/' + filename);
        }
      }
    }
  }
  return routesExports;
}
const routesExports = routesFileImporter(routesDirectories);

module.exports = routesExports;
