import { ZipCodeBuilder } from './../../src/addresses/ZipCodeBuilder';
import { AgentDefaultsBuilder } from './../../src/defaults/AgentDefaultsBuilder';
import { expect } from 'chai';
import { AgentDefaultsPresenter } from '../../src/defaults/AgentDefaultsPresenter';
import { StateTerritory } from '../../src/addresses/StateTerritory';

describe('AgentDefaultsPresenter', () => {
  it('presents the agency number', () => {
    const agentDefaults = new AgentDefaultsBuilder().setAgencyNumber('A000123').build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.agencyNumber).to.eql('A000123');
  });

  it('presents the city', () => {
    const agentDefaults = new AgentDefaultsBuilder().setCity('Pekin').build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.city).to.eql('Pekin');
  });

  it('presents the city if empty', () => {
    const agentDefaults = new AgentDefaultsBuilder().build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.city).to.be.null;
  });

  it('presents the state', () => {
    const agentDefaults = new AgentDefaultsBuilder().setState(StateTerritory.Illinois).build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.state).to.eql('Illinois');
  });

  it('presents the state it empty', () => {
    const agentDefaults = new AgentDefaultsBuilder().build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.state).to.be.eql('');
  });

  it('presents the county', () => {
    const agentDefaults = new AgentDefaultsBuilder().setCounty('Tazewell').build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.county).to.eql('Tazewell');
  });

  it('presents the county if empty', () => {
    const agentDefaults = new AgentDefaultsBuilder().build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.county).to.be.null;
  });

  it('presents the zip code with only base value', () => {
    const zipCode = new ZipCodeBuilder().setBaseValue('12345').build();
    const agentDefaults = new AgentDefaultsBuilder().setZipCode(zipCode).build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.zipCode).to.eql('12345');
  });

  it('presents the zip code with base value and extended value', () => {
    const zipCode = new ZipCodeBuilder().setBaseValue('12345').setExtendedValue('1234').build();
    const agentDefaults = new AgentDefaultsBuilder().setZipCode(zipCode).build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.zipCode).to.eql('12345-1234');
  });

  it('presents the zip code if empty', () => {
    const agentDefaults = new AgentDefaultsBuilder().setZipCode(null).build();
    const presenter = new AgentDefaultsPresenter(agentDefaults);

    const agentDefaultsViewModel = presenter.present();

    expect(agentDefaultsViewModel.zipCode).to.eql('');
  });
});
