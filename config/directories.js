'use strict';

const path = require('path');
const root = path.join(__dirname, '..');

module.exports = {
  root: root,
  config: path.join(root, 'config'),
  src: path.join(root, 'src'),
  spec: path.join(root, 'spec'),
  output: path.join(root, 'dist')
}
