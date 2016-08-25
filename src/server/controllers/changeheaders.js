function noshenanigans(){
  return function(request, response, next) {
      response.set('X-Shenanigans', 'None');
      next();
  }
}

module.exports = noshenanigans;
