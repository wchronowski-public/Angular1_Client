import { expect } from 'chai';
import { MockInputIdentification } from '../MockInputIdentification';
import { ToggleInputDirective } from '../../../src/inputs/toggle/ToggleInputDirective';

describe('ToggleInputDirective', () => {
  it('uses the model from the attributes for the element ID when present', () => {
    const scope: any = {};
    const identification = new MockInputIdentification().stubbedToIdReturns('id');
    const element: JQuery = null;
    const attributes = { model: 'some.id' };
    const link = (ToggleInputDirective.DIRECTIVE(identification) as any).link;

    link(scope, element, attributes);

    expect(scope.elementId).to.equal('id');
    identification.verifyToIdCalled('some.id');
  });
});
