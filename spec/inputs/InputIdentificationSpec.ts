import { expect } from 'chai';
import { InputIdentification } from '../../src/inputs/InputIdentification';

describe('input identification', () => {
  it('returns empty string when passed an empty string', () => {
    const identification = new InputIdentification();
    expect(identification.toId('')).to.be.eql('');
    expect(identification.toId('   ')).to.be.eql('');
    expect(identification.toId(null)).to.be.eql('');
  });

  it('returns empty string when passed only separators', () => {
    const identification = new InputIdentification();
    expect(identification.toId('.')).to.be.eql('');
    expect(identification.toId('..')).to.be.eql('');
    expect(identification.toId('.   .')).to.be.eql('');
  });
});
