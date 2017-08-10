import { expect } from 'chai';
import { MockInputIdentification } from '../MockInputIdentification';
import { YesNoInputDirective } from '../../../src/inputs/toggle/YesNoInputDirective';
import { SelectListItem } from '../../../src/util/SelectListItem';

describe('YesNoInputDirective', () => {
  it('uses the model from the attributes for the element ID when present', () => {
    const scope: any = {};
    const identification = new MockInputIdentification().stubbedToIdReturns('id');
    const element: JQuery = null;
    const attributes = { model: 'some.id' };
    const link = (YesNoInputDirective.DIRECTIVE(identification) as any).link;

    link(scope, element, attributes);

    expect(scope.elementId).to.equal('id');
    identification.verifyToIdCalled('some.id');
  });

  it('defaults the options to be Yes|No', () => {
    const expected = [
      new SelectListItem(true, 'Yes'),
      new SelectListItem(false, 'No'),
    ];
    const scope: any = {};
    const identification = new MockInputIdentification().stubbedToIdReturns('id');
    const element: JQuery = null;
    const attributes = {};
    const link = (YesNoInputDirective.DIRECTIVE(identification) as any).link;

    link(scope, element, attributes);

    expect(scope.options).to.eql(expected);
  });
});
