import { expect } from 'chai';
import { MockInputIdentification } from '../MockInputIdentification';
import { DateInputDirective } from '../../../src/inputs/date/DateInputDirective';

function appendInput(id: string): void {
  let input = document.createElement('input');
  input.id = id;
  document.body.appendChild(input);
}

function clearDocument(): void {
  const el = document.body;
  while(el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

describe('DateInputDirective', () => {
  it('uses the model from the attributes for the element ID when present', () => {
    const identification = new MockInputIdentification().stubbedToIdReturns('id');
    const scope: any = {};
    const element: JQuery = null;
    const attributes = { model: 'some.id' };
    const link = (DateInputDirective.DIRECTIVE(identification) as any).link;

    link(scope, element, attributes);

    expect(scope.groupId).to.equal('id');
    expect(scope.dayElementId).to.equal('id-day');
    expect(scope.monthElementId).to.equal('id-month');
    expect(scope.yearElementId).to.equal('id-year');
    identification.verifyToIdCalled('some.id');
  });

  context('focus callbacks', () => {
    afterEach(clearDocument);

    it('adds a focusDay function to the scope', () => {
      const identification = new MockInputIdentification().stubbedToIdReturns('some.id');
      appendInput('some.id-day');
      const scope = { focusDay(): Promise<void> { return new Promise<void>(resolve => {}); } };
      const element: JQuery = null;
      const attributes = { model: 'some.id' };
      const link = (DateInputDirective.DIRECTIVE(identification) as any).link;
      link(scope, element, attributes);

      expect(document.activeElement.id).to.equal('');

      return scope.focusDay().then(() => {
        expect(document.activeElement.id).to.equal('some.id-day');
      });
    });

    it('adds a focusYear function to the scope', () => {
      const identification = new MockInputIdentification().stubbedToIdReturns('some.id');
      appendInput('some.id-year');
      const scope = { focusYear(): Promise<void> { return new Promise<void>(resolve => {}); } };
      const element: JQuery = null;
      const attributes = { model: 'some.id' };
      const link = (DateInputDirective.DIRECTIVE(identification) as any).link;
      link(scope, element, attributes);

      expect(document.activeElement.id).to.equal('');

      return scope.focusYear().then(() => {
        expect(document.activeElement.id).to.equal('some.id-year');
      });
    });
  });
});
