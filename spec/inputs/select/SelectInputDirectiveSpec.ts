import { expect } from 'chai';
import { MockInputIdentification } from '../MockInputIdentification';
import { SelectInputDirective, ISelectInputDirectiveScope } from '../../../src/inputs/select/SelectInputDirective';
import { SelectListItem } from '../../../src/util/SelectListItem';

describe('SelectInputDirective', () => {
  it('uses the model from the attributes for the element ID when present', () => {
    const identification = new MockInputIdentification().stubbedToIdReturns('id');
    const scope: any = {};
    const element: JQuery = null;
    const attributes = { model: 'some.id' };
    const link = (SelectInputDirective.DIRECTIVE(identification) as any).link;

    link(scope, element, attributes);

    expect(scope.elementId).to.equal('id');
    identification.verifyToIdCalled('some.id');
  });

  it('replaces the model with the matching model from the select options', () => {
    const element: JQuery = null;
    const attributes = { model: 'some.id' };
    const foo = { value: 'foo', $$hashKey: '0' };
    const bar = { value: 'bar', $$hashKey: '1' };
    const scope: ISelectInputDirectiveScope = {
      elementId: '...',
      model: { value: 'bar' },
      options: [
        new SelectListItem(foo, 'foo'),
        new SelectListItem(bar, 'bar'),
      ],
    };

    const directive = SelectInputDirective.DIRECTIVE(new MockInputIdentification().stubbedToIdReturns('id'));
    const linkFunction = (directive as any).link;

    linkFunction(scope, element, attributes);

    expect(scope.model).to.equal(bar);
  });

  it('does not replace the model when there is no matching select option', () => {
    const element: JQuery = null;
    const attributes = { model: 'some.id' };
    const foo = { value: 'foo', $$hashKey: '0' };
    const bar = { value: 'bar', $$hashKey: '1' };
    const model = { value: 'baz' };
    const scope: ISelectInputDirectiveScope = {
      elementId: '...',
      model: model,
      options: [
        new SelectListItem(foo, 'foo'),
        new SelectListItem(bar, 'bar'),
      ],
    };

    const directive = SelectInputDirective.DIRECTIVE(new MockInputIdentification().stubbedToIdReturns('id'));
    const linkFunction = (directive as any).link;

    linkFunction(scope, element, attributes);

    expect(scope.model).to.equal(model);
  });
});
