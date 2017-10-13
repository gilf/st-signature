exports.config = {
  bundles: [
    { components: ['st-signature'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
