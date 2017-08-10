import { expect } from 'chai';
import { DateInput } from '../../../src/inputs/date/DateInput';

describe('DateInput', () => {
  context('when determining if the input has a value', () => {
    let dateInput: DateInput;

    beforeEach(() => {
      dateInput = new DateInput();
    });

    context('fromStrings', () => {
      it('creates a date input from strings', () => {
        const input = DateInput.fromStrings('1986', '08', '24');
        expect(input.year).to.equal('1986');
        expect(input.month).to.equal('08');
        expect(input.day).to.equal('24');
      });

      it('zero-pads month and day values', () => {
        const input = DateInput.fromStrings('1986', '8', '1');
        expect(input.month).to.equal('08');
        expect(input.day).to.equal('01');
      });
    });

    [
      {
        value: '1',
        description: 'a numeric character',
      },
      {
        value: 'a',
        description: 'an alpha character',
      },
      {
        value: '\n',
        description: 'a whitespace character',
      },
    ].forEach(({value, description}) => {
      it(`month has a value if ${description} is present`, () => {
        dateInput.month = value;

        expect(dateInput.monthHasValue()).to.be.true;
      });

      it(`day has a value if ${description} is present`, () => {
        dateInput.day = value;

        expect(dateInput.dayHasValue()).to.be.true;
      });

      it(`year has a value if ${description} is present`, () => {
        dateInput.year = value;

        expect(dateInput.yearHasValue()).to.be.true;
      });
    });

    ['', null, undefined].forEach(value => {
      it(`month does not have a value if (${value})`, () => {
        dateInput.month = value;

        expect(dateInput.monthHasValue()).to.be.false;
      });

      it(`day does not have a value if (${value})`, () => {
        dateInput.day = value;

        expect(dateInput.dayHasValue()).to.be.false;
      });

      it(`year does not have a value if (${value})`, () => {
        dateInput.year = value;

        expect(dateInput.yearHasValue()).to.be.false;
      });
    });

    it('has a value if month, day and year all have values', () => {
      dateInput.month = '11';
      dateInput.day = '5';
      dateInput.year = '1965';

      expect(dateInput.hasValue()).to.be.true;
    });

    it('does not have a value if month does not have value', () => {
      dateInput.month = null;
      dateInput.day = '5';
      dateInput.year = '1965';

      expect(dateInput.hasValue()).to.be.false;
    });

    it('does not have a value if day does not have value', () => {
      dateInput.month = '11';
      dateInput.day = null;
      dateInput.year = '1965';

      expect(dateInput.hasValue()).to.be.false;
    });

    it('does not have a value if year does not have value', () => {
      dateInput.month = '11';
      dateInput.day = '5';
      dateInput.year = null;

      expect(dateInput.hasValue()).to.be.false;
    });
  });

  context('when converting from a Date', () => {
    it('builds a DateInput from a Date', () => {
      const dateInput = DateInput.fromDate(new Date('11/20/1965'));

      expect(dateInput.month).to.eq('11');
      expect(dateInput.day).to.eq('20');
      expect(dateInput.year).to.eq('1965');
    });

    it('uses the UTC time', () => {
      const dateInput = DateInput.fromDate(new Date(Date.UTC(1965, 10, 20)));

      expect(dateInput.month).to.eq('11');
      expect(dateInput.day).to.eq('20');
      expect(dateInput.year).to.eq('1965');
    });

    it('builds an empty DateInput when given a null Date', () => {
      const dateInput = DateInput.fromDate(null);

      expect(dateInput.month).to.be.null;
      expect(dateInput.day).to.be.null;
      expect(dateInput.year).to.be.null;
    });

    it('zero-pads single digit months and days', () => {
      const dateInput = DateInput.fromDate(new Date('01/01/1965'));

      expect(dateInput.month).to.eq('01');
      expect(dateInput.day).to.eq('01');
    });
  });

  context('when converting to a Date', () => {
    const invalidIntegerInputSamples = ['a', '5a', 'a5', 'a5a', '5\n5'];
    let dateInput: DateInput;

    beforeEach(() => {
      dateInput = new DateInput();
    });

    it('succeeds when all the inputs are only numeric characters', () => {
      dateInput.month = '11';
      dateInput.day = '20';
      dateInput.year = '1965';

      const date = dateInput.toDate();

      expect(date.getUTCMonth()).to.eq(10);
      expect(date.getUTCDate()).to.eq(20);
      expect(date.getUTCFullYear()).to.eq(1965);
    });

    it('succeeds when the the inputs are numeric characters, containing leading or trailing whitespace', () => {
      dateInput.month = ' \n5\n ';
      dateInput.day = ' \n10\n\t';
      dateInput.year = '\r\n1965  ';

      const date = dateInput.toDate();

      expect(date.getUTCMonth()).to.eq(4);
      expect(date.getUTCDate()).to.eq(10);
      expect(date.getUTCFullYear()).to.eq(1965);
    });

    it('fails when the month is null', () => {
      dateInput.month = null;
      dateInput.day = '10';
      dateInput.year = '1965';

      expect(dateInput.toDate()).to.be.null;
    });

    it('fails when the month is whitespace', () => {
      dateInput.month = ' \n ';
      dateInput.day = '10';
      dateInput.year = '1965';

      expect(dateInput.toDate()).to.be.null;
    });

    invalidIntegerInputSamples.forEach(month => {
      it(`fails when the month is not an integer (${month})`, () => {
        dateInput.month = month;
        dateInput.day = '10';
        dateInput.year = '1965';

        expect(dateInput.toDate()).to.be.null;
      });
    });

    it('fails when the day is null', () => {
      dateInput.month = '11';
      dateInput.day = null;
      dateInput.year = '1965';

      expect(dateInput.toDate()).to.be.null;
    });

    it('fails when the day is whitespace', () => {
      dateInput.month = '11';
      dateInput.day = ' \n ';
      dateInput.year = '1965';

      expect(dateInput.toDate()).to.be.null;
    });

    invalidIntegerInputSamples.forEach(day => {
      it(`fails when the day is not an integer (${day})`, () => {
        dateInput.month = '11';
        dateInput.day = day;
        dateInput.year = '1965';

        expect(dateInput.toDate()).to.be.null;
      });
    });

    it('fails when the day contains trailing characters', () => {
      dateInput.month = '5';
      dateInput.day = '1a';
      dateInput.year = '1965';

      expect(dateInput.toDate()).to.be.null;
    });

    it('fails when the year is null', () => {
      dateInput.month = '11';
      dateInput.day = '20';
      dateInput.year = null;

      expect(dateInput.toDate()).to.be.null;
    });

    it('fails when the year is whitespace', () => {
      dateInput.month = '11';
      dateInput.day = '20';
      dateInput.year = ' \n ';

      expect(dateInput.toDate()).to.be.null;
    });

    invalidIntegerInputSamples.forEach(year => {
      it(`fails when the year is not an integer (${year})`, () => {
        dateInput.month = '11';
        dateInput.day = '20';
        dateInput.year = year;

        expect(dateInput.toDate()).to.be.null;
      });
    });

    it('fails when the year contains trailing characters', () => {
      dateInput.month = '5';
      dateInput.day = '1';
      dateInput.year = '1965a';

      expect(dateInput.toDate()).to.be.null;
    });

    it('fails when the year is before 1900', () => {
      dateInput.month = '5';
      dateInput.day = '1';
      dateInput.year = '1899';

      expect(dateInput.toDate()).to.be.null;
    });

    ['31', '0', '-1'].forEach(invalidDay => {
      it(`fails when the day is not a valid day of the given month (${invalidDay})`, () => {
        dateInput.month = '11';
        dateInput.day = invalidDay;
        dateInput.year = '2000';

        expect(dateInput.toDate()).to.be.null;
      });
    });

    ['13', '0', '-1'].forEach(invalidMonth => {
      it(`fails when the month is not valid (${invalidMonth})`, () => {
        dateInput.month = invalidMonth;
        dateInput.day = '31';
        dateInput.year = '2000';

        expect(dateInput.toDate()).to.be.null;
      });
    });

    it('handles a leap day', () => {
      dateInput.month = '2';
      dateInput.day = '29';
      dateInput.year = '2016';

      const date = dateInput.toDate();

      expect(date.getUTCMonth()).to.eq(1);
      expect(date.getUTCDate()).to.eq(29);
      expect(date.getUTCFullYear()).to.eq(2016);
    });

    it('fails for February 29 when not a leap year', () => {
      dateInput.month = '2';
      dateInput.day = '29';
      dateInput.year = '2017';

      expect(dateInput.toDate()).to.be.null;
    });

    it('can be set to a specific date', () => {
      const date = new Date(Date.UTC(2000, 0, 1));

      dateInput.setTo(date);

      expect(dateInput.year).to.equal('2000');
      expect(dateInput.month).to.equal('01');
      expect(dateInput.day).to.equal('01');
    });
  });
});
