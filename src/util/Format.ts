import * as _ from 'lodash';
import { ZipCode } from '../addresses/ZipCode';

export function utcDate(date: Date): string {
  return date ? formatDate(date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCFullYear()) : '';
}

export function localDate(date: Date): string {
  return date ? formatDate(date.getMonth() + 1, date.getDate(), date.getFullYear()) : '';
}

export function utcTime(date: Date): string {
  return date ? formatTime(date.getUTCHours(), date.getUTCMinutes()) : '';
}

export function localTime(date: Date): string {
  return date ? formatTime(date.getHours(), date.getMinutes()) : '';
}

export function utcDateTime(date: Date): string {
  return date ? `${utcDate(date)}, ${utcTime(date)}` : '';
}

export function localDateTime(date: Date): string {
  return date ? `${localDate(date)}, ${localTime(date)}` : '';
}

function formatDate(month: number, day: number, year: number): string {
  return `${month}/${day}/${year}`;
}

function formatTime(hours: number, minutes: number): string {
  const amPm = hours < 12 ? 'am' : 'pm';
  let h = demilitarize(hours);
  const mm = leftPad(minutes.toString(), 2, '0');
  return `${h}:${mm} ${amPm}`;
}

function demilitarize(hours: number): number {
  if (hours > 12) { return hours - 12; }
  if (hours === 0) { return 12; }
  return hours;
}

export function leftPad(input: string, limit: number, padding: string): string {
  const needed = limit - input.length;
  let ret = input;
  for (let i = 0; i < needed; i++) {
    ret = padding + ret;
  }
  return ret;
}

export function parseDate(prop: string): (obj: any) => any {
  return (obj) => {
    if(obj[prop]) {
      obj[prop] = new Date(obj[prop]);
    }
    return obj;
  };
}

const EMPTY_STRING = '';
const COMMA = ',';

function interposeComma(characters: string[], character: string, idx: number): string[] {
  if(idx !== 0 && idx % 3 === 0) {
    return [...characters, COMMA, character];
  } else {
    return [...characters, character];
  }
}

export function number(n: number): string {
  return n.toString()
    .split(EMPTY_STRING)
    .reverse()
    .reduce(interposeComma, [])
    .reverse()
    .join(EMPTY_STRING);
}

const YES = 'Yes';
const NO = 'No';

export function yesNo(bool: boolean): string {
  switch(bool) {
    case true: return YES;
    case false: return NO;
    default: return EMPTY_STRING;
  }
}

export function dollars(n: number): string {
  return '$' + number(n);
}

export function coverage(a: number, b?: number): string {
  if(b) {
    return number(a) + '/' + number(b);
  } else {
    return dollars(a);
  }
}

export function name(name: string): string {
  return _.capitalize(name);
}

export function fullName(first: string, last: string): string {
  return name(first) + ' ' + name(last);
}

export function zipCode(zipCode: ZipCode): string {
  if(!zipCode.extendedValue) {
    return zipCode.baseValue;
  }

  return zipCode.baseValue + '-' + zipCode.extendedValue;
}

export function emptyStringOrValue<T>(value: T, f: Func<T, string>): string {
  return value === null || value === undefined ? '' : f(value);
}

export function upperCase(s: string): string {
  return s ? s.toUpperCase() : EMPTY_STRING;
}

export function isIncluded(bool: boolean): string {
  return bool ? 'Included' : 'Not Included';
}
