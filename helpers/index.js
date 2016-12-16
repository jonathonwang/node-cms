const hbs = require('hbs');
const fs = require('fs');

const registerHandlebarsPartials = (partialsDirectories) => {
  if(partialsDirectories.length > 0){
    for(const partialsDir of partialsDirectories){
      const filenames = fs.readdirSync(partialsDir);
      if(filenames.length > 0) {
        for(const filename of filenames) {
          const matches = /^([^.]+).hbs$/.exec(filename);
          if (!matches) {
            return;
          }
          const name = matches[1];
          const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
          console.log(template);
          hbs.registerPartial(name, template);
        }
      }
    }
  }
}

module.exports = registerHandlebarsPartials;
