const routesRegistrationHelper = (app, routes) => {
  for(let route in routes) {
    if(route === 'home'){
      app.use('/', routes[route].router);
    } else {
      app.use('/' + route, routes[route].router);
    }
  }
}

module.exports = routesRegistrationHelper;
