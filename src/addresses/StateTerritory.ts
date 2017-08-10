import * as Immutable from 'immutable';
import { SelectListItem } from '../util/SelectListItem';
import { Optional } from '../util/Optional';

export enum StateTerritory {
  Alabama = 1,
  Alaska = 2,
  Arizona = 4,
  Arkansas = 5,
  California = 6,
  Colorado = 8,
  Connecticut = 9,
  Delaware = 10,
  DistrictOfColumbia = 11,
  Florida = 12,
  Georgia = 13,
  Hawaii = 15,
  Idaho = 16,
  Illinois = 17,
  Indiana = 18,
  Iowa = 19,
  Kansas = 20,
  Kentucky = 21,
  Louisiana = 22,
  Maine = 23,
  Maryland = 24,
  Massachusetts = 25,
  Michigan = 26,
  Minnesota = 27,
  Mississippi = 28,
  Missouri = 29,
  Montana = 30,
  Nebraska = 31,
  Nevada = 32,
  NewHampshire = 33,
  NewJersey = 34,
  NewMexico = 35,
  NewYork = 36,
  NorthCarolina = 37,
  NorthDakota = 38,
  Ohio = 39,
  Oklahoma = 40,
  Oregon = 41,
  Pennsylvania = 42,
  RhodeIsland = 44,
  SouthCarolina = 45,
  SouthDakota = 46,
  Tennessee = 47,
  Texas = 48,
  Utah = 49,
  Vermont = 50,
  Virginia = 51,
  Washington = 53,
  WestVirginia = 54,
  Wisconsin = 55,
  Wyoming = 56,
}

const FULL_NAME_MAPPINGS: Immutable.Map<StateTerritory, string> = Immutable.Map<StateTerritory, string>().withMutations(map => {
  return map
    .set(StateTerritory.Alabama, 'Alabama')
    .set(StateTerritory.Alaska, 'Alaska')
    .set(StateTerritory.Arizona, 'Arizona')
    .set(StateTerritory.Arkansas, 'Arkansas')
    .set(StateTerritory.California, 'California')
    .set(StateTerritory.Colorado, 'Colorado')
    .set(StateTerritory.Connecticut, 'Connecticut')
    .set(StateTerritory.Delaware, 'Delaware')
    .set(StateTerritory.DistrictOfColumbia, 'District Of Columbia')
    .set(StateTerritory.Florida, 'Florida')
    .set(StateTerritory.Georgia, 'Georgia')
    .set(StateTerritory.Hawaii, 'Hawaii')
    .set(StateTerritory.Idaho, 'Idaho')
    .set(StateTerritory.Illinois, 'Illinois')
    .set(StateTerritory.Indiana, 'Indiana')
    .set(StateTerritory.Iowa, 'Iowa')
    .set(StateTerritory.Kansas, 'Kansas')
    .set(StateTerritory.Kentucky, 'Kentucky')
    .set(StateTerritory.Louisiana, 'Louisiana')
    .set(StateTerritory.Maine, 'Maine')
    .set(StateTerritory.Maryland, 'Maryland')
    .set(StateTerritory.Massachusetts, 'Massachusetts')
    .set(StateTerritory.Michigan, 'Michigan')
    .set(StateTerritory.Minnesota, 'Minnesota')
    .set(StateTerritory.Mississippi, 'Mississippi')
    .set(StateTerritory.Missouri, 'Missouri')
    .set(StateTerritory.Montana, 'Montana')
    .set(StateTerritory.Nebraska, 'Nebraska')
    .set(StateTerritory.Nevada, 'Nevada')
    .set(StateTerritory.NewHampshire, 'New Hampshire')
    .set(StateTerritory.NewJersey, 'New Jersey')
    .set(StateTerritory.NewMexico, 'New Mexico')
    .set(StateTerritory.NewYork, 'New York')
    .set(StateTerritory.NorthCarolina, 'North Carolina')
    .set(StateTerritory.NorthDakota, 'North Dakota')
    .set(StateTerritory.Ohio, 'Ohio')
    .set(StateTerritory.Oklahoma, 'Oklahoma')
    .set(StateTerritory.Oregon, 'Oregon')
    .set(StateTerritory.Pennsylvania, 'Pennsylvania')
    .set(StateTerritory.RhodeIsland, 'Rhode Island')
    .set(StateTerritory.SouthCarolina, 'South Carolina')
    .set(StateTerritory.SouthDakota, 'South Dakota')
    .set(StateTerritory.Tennessee, 'Tennessee')
    .set(StateTerritory.Texas, 'Texas')
    .set(StateTerritory.Utah, 'Utah')
    .set(StateTerritory.Vermont, 'Vermont')
    .set(StateTerritory.Virginia, 'Virginia')
    .set(StateTerritory.Washington, 'Washington')
    .set(StateTerritory.WestVirginia, 'West Virginia')
    .set(StateTerritory.Wisconsin, 'Wisconsin')
    .set(StateTerritory.Wyoming, 'Wyoming');
});

const ABBREVIATION_MAPPINGS = Immutable.Map<StateTerritory, string>().withMutations(map => {
  return map
    .set(StateTerritory.Alabama, 'AL')
    .set(StateTerritory.Alaska, 'AK')
    .set(StateTerritory.Arizona, 'AZ')
    .set(StateTerritory.Arkansas, 'AR')
    .set(StateTerritory.California, 'CA')
    .set(StateTerritory.Colorado, 'CO')
    .set(StateTerritory.Connecticut, 'CT')
    .set(StateTerritory.Delaware, 'DE')
    .set(StateTerritory.DistrictOfColumbia, 'DC')
    .set(StateTerritory.Florida, 'FL')
    .set(StateTerritory.Georgia, 'GA')
    .set(StateTerritory.Hawaii, 'HI')
    .set(StateTerritory.Idaho, 'ID')
    .set(StateTerritory.Illinois, 'IL')
    .set(StateTerritory.Indiana, 'IN')
    .set(StateTerritory.Iowa, 'IA')
    .set(StateTerritory.Kansas, 'KS')
    .set(StateTerritory.Kentucky, 'KY')
    .set(StateTerritory.Louisiana, 'LA')
    .set(StateTerritory.Maine, 'ME')
    .set(StateTerritory.Maryland, 'MD')
    .set(StateTerritory.Massachusetts, 'MA')
    .set(StateTerritory.Michigan, 'MI')
    .set(StateTerritory.Minnesota, 'MN')
    .set(StateTerritory.Mississippi, 'MS')
    .set(StateTerritory.Missouri, 'MO')
    .set(StateTerritory.Montana, 'MT')
    .set(StateTerritory.Nebraska, 'NE')
    .set(StateTerritory.Nevada, 'NV')
    .set(StateTerritory.NewHampshire, 'NH')
    .set(StateTerritory.NewJersey, 'NJ')
    .set(StateTerritory.NewMexico, 'NM')
    .set(StateTerritory.NewYork, 'NY')
    .set(StateTerritory.NorthCarolina, 'NC')
    .set(StateTerritory.NorthDakota, 'ND')
    .set(StateTerritory.Ohio, 'OH')
    .set(StateTerritory.Oklahoma, 'OK')
    .set(StateTerritory.Oregon, 'OR')
    .set(StateTerritory.Pennsylvania, 'PA')
    .set(StateTerritory.RhodeIsland, 'RI')
    .set(StateTerritory.SouthCarolina, 'SC')
    .set(StateTerritory.SouthDakota, 'SD')
    .set(StateTerritory.Tennessee, 'TN')
    .set(StateTerritory.Texas, 'TX')
    .set(StateTerritory.Utah, 'UT')
    .set(StateTerritory.Vermont, 'VT')
    .set(StateTerritory.Virginia, 'VA')
    .set(StateTerritory.Washington, 'WA')
    .set(StateTerritory.WestVirginia, 'WV')
    .set(StateTerritory.Wisconsin, 'WI')
    .set(StateTerritory.Wyoming, 'WY');
});

export function toAbbreviation(s: StateTerritory): Optional<string> {
  if (ABBREVIATION_MAPPINGS.has(s)) {
    return Optional.of(ABBREVIATION_MAPPINGS.get(s));
  }

  return Optional.none<string>();
}

export function fromAbbreviation(s: string): Optional<StateTerritory> {
  const stateTerritory = ABBREVIATION_MAPPINGS.keyOf(s);
  if (stateTerritory) {
    return Optional.of(stateTerritory);
  }

  return Optional.none<StateTerritory>();
}

export function toJson(s: StateTerritory): string {
  const maybeAbbr = toAbbreviation(s);
  if (!maybeAbbr.hasValue()) {
    throw new Error(`Could not convert ${StateTerritory[s]} to json`);
  }

  return maybeAbbr.get();
}

export function fromJson(s: string): StateTerritory {
  const maybeStateTerritory = fromAbbreviation(s);
  if (!maybeStateTerritory.hasValue()) {
    throw new Error(`Could not convert ${s} to a StateTerritory`);
  }

  return maybeStateTerritory.get();
}

export function toFullName(s: StateTerritory): Optional<string> {
  if (FULL_NAME_MAPPINGS.has(s)) {
    return Optional.of(FULL_NAME_MAPPINGS.get(s));
  }

  return Optional.none<string>();
}

export const BUSINESS_STATES: StateTerritory[] = [
  StateTerritory.Arizona,
  StateTerritory.Illinois,
  StateTerritory.Indiana,
  StateTerritory.Iowa,
  StateTerritory.Ohio,
  StateTerritory.Wisconsin,
];

export const BUSINESS_STATE_OPTIONS: SelectListItem<StateTerritory>[] = BUSINESS_STATES.map(s => {
  const maybeFullName = toFullName(s);
  if (!maybeFullName.hasValue()) {
    throw new Error(`Could not get full name of business state ${StateTerritory[s]}`);
  }

  return new SelectListItem(s, maybeFullName.get());
});

export const STATE_OPTIONS: SelectListItem<StateTerritory>[] = FULL_NAME_MAPPINGS.map((name, stateTerritory) => {
  return new SelectListItem(stateTerritory, name);
}).toArray();
