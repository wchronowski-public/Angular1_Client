import 'mocha';
import 'angular';
import 'angular-ui-router';
import 'angular-mocks';
require('es6-promise').polyfill();

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const testsContext = (require as any).context('.', true, /Spec$/);
testsContext.keys().forEach(testsContext);
