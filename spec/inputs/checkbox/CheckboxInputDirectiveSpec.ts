import { expect } from 'chai';
import { MockInputIdentification } from '../MockInputIdentification';
import { CheckboxInputDirective } from '../../../src/inputs/checkbox/CheckboxInputDirective';

describe('CheckboxInputDirective', () => {
  it('uses the model from the attributes for the element ID when present', () => {
    const identification = new MockInputIdentification().stubbedToIdReturns('id');
    const scope: any = {};
    const element: JQuery = null;
    const attributes = { model: 'some.id' };
    const link = (CheckboxInputDirective.DIRECTIVE(identification) as any).link;

    link(scope, element, attributes);

    expect(scope.elementId).to.equal('id');
    identification.verifyToIdCalled('some.id');
  });
});
