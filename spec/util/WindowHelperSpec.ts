import { WindowHelper } from './../../src/util/WindowHelper';
import { expect } from 'chai';

function appendInput(id: string, className: string): void {
  const input = document.createElement('input');
  input.id = id;
  input.className = className;
  document.body.appendChild(input);
}

function removeAllChildren(element: Element): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

describe('WindowHelper', () => {
  afterEach(() => removeAllChildren(document.body));

  it('focuses on nothing with all inputs are invalid', () => {
    appendInput('1', 'invalid');
    appendInput('2', 'invalid');
    return WindowHelper.goToFirstElement().then(() => {
      expect(document.activeElement.id).to.be.eql('');
    });
  });

  it('focuses on first valid input', () => {
    appendInput('1', 'valid');
    appendInput('2', 'invalid');
    return WindowHelper.goToFirstElement().then(() => {
      expect(document.activeElement.id).to.be.eql('1');
    });
  });

  it('focuses on first valid input when first input is invalid', () => {
    appendInput('1', 'invalid');
    appendInput('2', 'valid');
    return WindowHelper.goToFirstElement().then(() => {
      expect(document.activeElement.id).to.be.eql('2');
    });
  });

  it('focuses on first valid input when multiple inputs are valid', () => {
    appendInput('1', 'valid');
    appendInput('2', 'valid');
    return WindowHelper.goToFirstElement().then(() => {
      expect(document.activeElement.id).to.be.eql('1');
    });
  });

  it('focuses on nothing when all inputs are valid', () => {
    appendInput('1', 'valid');
    appendInput('2', 'valid');
    return WindowHelper.goToFirstError().then(() => {
      expect(document.activeElement.id).to.be.eql('');
    });
  });

  it('focuses on first invalid input', () => {
    appendInput('1', 'invalid');
    appendInput('2', 'valid');
    return WindowHelper.goToFirstError().then(() => {
      expect(document.activeElement.id).to.be.eql('1');
    });
  });

  it('focuses on first invalid input when first input is valid', () => {
    appendInput('1', 'valid');
    appendInput('2', 'invalid');
    return WindowHelper.goToFirstError().then(() => {
      expect(document.activeElement.id).to.be.eql('2');
    });
  });

  it('focuses on first invalid input when multiple inputs are invalid', () => {
    appendInput('1', 'invalid');
    appendInput('2', 'invalid');
    return WindowHelper.goToFirstError().then(() => {
      expect(document.activeElement.id).to.be.eql('1');
    });
  });

  it('highlights an input element', () => {
    appendInput('my-input', '');
    expect(document.activeElement.id).to.eql('');

    return WindowHelper.highlightTextInput('my-input').then(() => {
      expect(document.activeElement.id).to.eql('my-input');
    });
  });
});
