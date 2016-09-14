var assetRoutes;

assetRoutes = [
  {
    method: 'GET',
    path: '/javascript/{filePath*}',
    handler: function(request, response) {
      response.file('assets/javascript/' + request.params.filePath);
    }
  },
  {
    method: 'GET',
    path: '/helpers/{filePath*}',
    handler: function(request, response) {
      response.file('helpers/' + request.params.filePath);
    }
  }
];

module.exports = assetRoutes;
