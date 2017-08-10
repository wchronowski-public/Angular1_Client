import { expect } from 'chai';
import { DateInput } from '../../../src/inputs/date/DateInput';
import { DatepickerController } from '../../../src/inputs/datepicker/DatepickerController';
import { CurrentTimeProvider } from '../../../src/util/CurrentTimeProvider';
import { ITimeProvider } from '../../../src/util/ITimeProvider';
import { MockTimeProvider } from '../../util/MockTimeProvider';
import { Month } from '../../../src/util/Month';

interface IDatepickerControllerOverrides {
  model?: DateInput;
  timeProvider?: ITimeProvider;
  onSelection?: () => void;
}

function buildDatepickerController(overrides: IDatepickerControllerOverrides = {}): DatepickerController {
  const model = overrides.model || DateInput.fromStrings('2000', '01', '01');
  const timeProvider = overrides.timeProvider || new CurrentTimeProvider();
  const onSelection = overrides.onSelection;
  return new DatepickerController({ model, onSelection }, timeProvider);
}

function utc(year: number, month: Month, day: number = 1): Date {
  return new Date(Date.UTC(year, month, day));
}

describe('DatepickerController', () => {
  it('builds the day selections from a pre-populated date input', () => {
    const model = DateInput.fromStrings('2016', '08', '01');
    const controller = buildDatepickerController({ model });

    const values = controller.daySelections.map(selection => {
      return {
        year: selection.date.getFullYear(),
        month: selection.date.getMonth(),
        day: selection.date.getDate(),
        isDisplayedMonth: selection.isDisplayedMonth,
      };
    });

    expect(values).to.eql([
      { year: 2016, month: Month.July,      day: 31, isDisplayedMonth: false },
      { year: 2016, month: Month.August,    day: 1,  isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 2,  isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 3,  isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 4,  isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 5,  isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 6,  isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 7,  isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 8,  isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 9,  isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 10, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 11, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 12, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 13, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 14, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 15, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 16, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 17, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 18, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 19, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 20, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 21, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 22, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 23, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 24, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 25, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 26, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 27, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 28, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 29, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 30, isDisplayedMonth: true  },
      { year: 2016, month: Month.August,    day: 31, isDisplayedMonth: true  },
      { year: 2016, month: Month.September, day: 1,  isDisplayedMonth: false },
      { year: 2016, month: Month.September, day: 2,  isDisplayedMonth: false },
      { year: 2016, month: Month.September, day: 3,  isDisplayedMonth: false },
      { year: 2016, month: Month.September, day: 4,  isDisplayedMonth: false },
      { year: 2016, month: Month.September, day: 5,  isDisplayedMonth: false },
      { year: 2016, month: Month.September, day: 6,  isDisplayedMonth: false },
      { year: 2016, month: Month.September, day: 7,  isDisplayedMonth: false },
      { year: 2016, month: Month.September, day: 8,  isDisplayedMonth: false },
      { year: 2016, month: Month.September, day: 9,  isDisplayedMonth: false },
      { year: 2016, month: Month.September, day: 10, isDisplayedMonth: false },
    ]);
  });

  it('builds the day selections based on the current date when the model is not populated', () => {
    const model = new DateInput();
    const date = utc(2016, Month.May, 1);
    const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
    const controller = buildDatepickerController({ model, timeProvider });

    const values = controller.daySelections.map(selection => {
      return {
        year: selection.date.getFullYear(),
        month: selection.date.getMonth(),
        day: selection.date.getDate(),
        isDisplayedMonth: selection.isDisplayedMonth,
      };
    });

    expect(values).to.eql([
      { year: 2016, month: Month.May,  day: 1,  isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 2,  isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 3,  isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 4,  isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 5,  isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 6,  isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 7,  isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 8,  isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 9,  isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 10, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 11, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 12, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 13, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 14, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 15, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 16, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 17, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 18, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 19, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 20, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 21, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 22, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 23, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 24, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 25, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 26, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 27, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 28, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 29, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 30, isDisplayedMonth: true  },
      { year: 2016, month: Month.May,  day: 31, isDisplayedMonth: true  },
      { year: 2016, month: Month.June, day: 1,  isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 2,  isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 3,  isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 4,  isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 5,  isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 6,  isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 7,  isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 8,  isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 9,  isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 10, isDisplayedMonth: false },
      { year: 2016, month: Month.June, day: 11, isDisplayedMonth: false },
    ]);
  });

  it('builds the year selections from a pre-populated date input', () => {
    const model = DateInput.fromStrings('2004', '08', '01');
    const controller = buildDatepickerController({ model });

    const years = controller.yearSelections;

    expect(years).to.eql([
      2004, 2005, 2006, 2007,
      2008, 2009, 2010, 2011,
      2012, 2013, 2014, 2015,
    ]);
  });

  it('builds the year selections using the closest group of 12 years to the date input year', () => {
    const model = DateInput.fromStrings('1991', '08', '01');
    const controller = buildDatepickerController({ model });

    const years = controller.yearSelections;

    expect(years).to.eql([
      1980, 1981, 1982, 1983,
      1984, 1985, 1986, 1987,
      1988, 1989, 1990, 1991,
    ]);
  });

  it('builds the year selections based on the current date when the model is not populated', () => {
    const model = new DateInput();
    const date = utc(2018, Month.May, 1);
    const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
    const controller = buildDatepickerController({ model, timeProvider });

    const years = controller.yearSelections;

    expect(years).to.eql([
      2016, 2017, 2018, 2019,
      2020, 2021, 2022, 2023,
      2024, 2025, 2026, 2027,
    ]);
  });

  it('returns the current minimum year selection', () => {
    const model = DateInput.fromStrings('2004', '08', '01');
    const controller = buildDatepickerController({ model });

    expect(controller.currentMinimumYearSelection()).to.equal(2004);
  });

  it('returns the current maximum year selection', () => {
    const model = DateInput.fromStrings('2004', '08', '01');
    const controller = buildDatepickerController({ model });

    expect(controller.currentMaximumYearSelection()).to.equal(2015);
  });

  it('sets the current year, month selection from a pre-populated model', () => {
    const model = DateInput.fromStrings('2004', '08', '01');
    const controller = buildDatepickerController({ model });

    expect(controller.currentYearSelection).to.equal(2004);
    expect(controller.currentMonthSelection).to.equal(Month.August);
  });

  it('sets the current year, month selection from the current date when the model is not populated', () => {
    const model = new DateInput();
    const date = utc(2018, Month.May);
    const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
    const controller = buildDatepickerController({ model, timeProvider });

    expect(controller.currentYearSelection).to.equal(2018);
    expect(controller.currentMonthSelection).to.equal(Month.May);
  });

  describe('section visibility', () => {
    it('shows the day selections by default', () => {
      const model = new DateInput();
      const controller = buildDatepickerController({ model });

      expect(controller.shouldShowYearSelection()).to.equal(false);
      expect(controller.shouldShowMonthSelection()).to.equal(false);
      expect(controller.shouldShowDaySelection()).to.equal(true);
    });

    it('shows the day selection when the model is already populated', () => {
      const model = DateInput.fromStrings('2000', '01', '02');
      const controller = buildDatepickerController({ model });

      expect(controller.shouldShowYearSelection()).to.equal(false);
      expect(controller.shouldShowMonthSelection()).to.equal(false);
      expect(controller.shouldShowDaySelection()).to.equal(true);
    });

    it('continues to show the year selections when showing the year selections and the back button is clicked', () => {
      const model = DateInput.fromStrings('2000', '01', '02');
      const controller = buildDatepickerController({ model });

      controller.backButtonClicked();
      controller.backButtonClicked();
      controller.backButtonClicked();

      expect(controller.shouldShowYearSelection()).to.equal(true);
      expect(controller.shouldShowMonthSelection()).to.equal(false);
      expect(controller.shouldShowDaySelection()).to.equal(false);
    });

    it('shows the month selections when a year is chosen', () => {
      const controller = buildDatepickerController();

      controller.selectYear(2000);

      expect(controller.shouldShowYearSelection()).to.equal(false);
      expect(controller.shouldShowMonthSelection()).to.equal(true);
      expect(controller.shouldShowDaySelection()).to.equal(false);
    });

    it('shows the year selections when showing the month selections and the back button is clicked', () => {
      const controller = buildDatepickerController();

      controller.selectYear(2000);
      controller.backButtonClicked();

      expect(controller.shouldShowYearSelection()).to.equal(true);
      expect(controller.shouldShowMonthSelection()).to.equal(false);
      expect(controller.shouldShowDaySelection()).to.equal(false);
    });

    it('shows the day selections when a year then a month is chosen', () => {
      const controller = buildDatepickerController();

      controller.selectYear(2000);
      controller.selectMonth(Month.May);

      expect(controller.shouldShowYearSelection()).to.equal(false);
      expect(controller.shouldShowMonthSelection()).to.equal(false);
      expect(controller.shouldShowDaySelection()).to.equal(true);
    });

    it('shows the month selections when showing the day selections and the back button is clicked', () => {
      const controller = buildDatepickerController();

      controller.selectYear(2000);
      controller.selectMonth(Month.January);
      controller.backButtonClicked();

      expect(controller.shouldShowYearSelection()).to.equal(false);
      expect(controller.shouldShowMonthSelection()).to.equal(true);
      expect(controller.shouldShowDaySelection()).to.equal(false);
    });
  });

  describe('setting a year', () => {
    it('sets the current year selection when a year is selected', () => {
      const controller = buildDatepickerController();

      controller.selectYear(2000);

      expect(controller.currentYearSelection).to.equal(2000);
    });
  });

  describe('setting a month', () => {
    it('sets the current month selection when a month is selected', () => {
      const controller = buildDatepickerController();

      controller.selectMonth(Month.February);

      expect(controller.currentMonthSelection).to.equal(Month.February);
    });

    it('builds the day selections based off the current year and chosen month', () => {
      const controller = buildDatepickerController();

      controller.selectYear(2016);
      controller.selectMonth(Month.June);

      const values = controller.daySelections.map(selection => {
        return {
          year: selection.date.getFullYear(),
          month: selection.date.getMonth(),
          day: selection.date.getDate(),
          isDisplayedMonth: selection.isDisplayedMonth,
        };
      });

      expect(values).to.eql([
        { year: 2016, month: Month.May,  day: 29, isDisplayedMonth: false  },
        { year: 2016, month: Month.May,  day: 30, isDisplayedMonth: false  },
        { year: 2016, month: Month.May,  day: 31, isDisplayedMonth: false  },
        { year: 2016, month: Month.June, day: 1,  isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 2,  isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 3,  isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 4,  isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 5,  isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 6,  isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 7,  isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 8,  isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 9,  isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 10, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 11, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 12, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 13, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 14, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 15, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 16, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 17, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 18, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 19, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 20, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 21, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 22, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 23, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 24, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 25, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 26, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 27, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 28, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 29, isDisplayedMonth: true  },
        { year: 2016, month: Month.June, day: 30, isDisplayedMonth: true  },
        { year: 2016, month: Month.July, day: 1,  isDisplayedMonth: false },
        { year: 2016, month: Month.July, day: 2,  isDisplayedMonth: false },
        { year: 2016, month: Month.July, day: 3,  isDisplayedMonth: false },
        { year: 2016, month: Month.July, day: 4,  isDisplayedMonth: false },
        { year: 2016, month: Month.July, day: 5,  isDisplayedMonth: false },
        { year: 2016, month: Month.July, day: 6,  isDisplayedMonth: false },
        { year: 2016, month: Month.July, day: 7,  isDisplayedMonth: false },
        { year: 2016, month: Month.July, day: 8,  isDisplayedMonth: false },
        { year: 2016, month: Month.July, day: 9,  isDisplayedMonth: false },
      ]);
    });
  });

  describe('rendering a month', () => {
    [
      { enumValue: Month.January,   renderedValue: 'January'   },
      { enumValue: Month.February,  renderedValue: 'February'  },
      { enumValue: Month.March,     renderedValue: 'March'     },
      { enumValue: Month.April,     renderedValue: 'April'     },
      { enumValue: Month.May,       renderedValue: 'May'       },
      { enumValue: Month.June,      renderedValue: 'June'      },
      { enumValue: Month.July,      renderedValue: 'July'      },
      { enumValue: Month.August,    renderedValue: 'August'    },
      { enumValue: Month.September, renderedValue: 'September' },
      { enumValue: Month.October,   renderedValue: 'October'   },
      { enumValue: Month.November,  renderedValue: 'November'  },
      { enumValue: Month.December,  renderedValue: 'December'  },
    ].forEach(({ enumValue, renderedValue }) => {
      it(`renders Month.${Month[enumValue]} to ${renderedValue}`, () => {
        const controller = buildDatepickerController();

        expect(controller.monthName(enumValue)).to.equal(renderedValue);
      });

      it(`returns the current month name when set to Month.${Month[enumValue]}`, () => {
        const controller = buildDatepickerController();

        controller.selectYear(2000);
        controller.selectMonth(enumValue);

        expect(controller.currentMonthName()).to.equal(renderedValue);
      });
    });
  });

  describe('clicking the left button', () => {
    context('when selecting a year', () => {
      it('sets the year selections to the previous 12 years', () => {
        const model = new DateInput();
        const date = utc(2013, Month.May, 1);
        const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
        const controller = buildDatepickerController({ model, timeProvider });

        controller.backButtonClicked();
        controller.backButtonClicked();

        expect(controller.yearSelections).to.eql([
          2004, 2005, 2006, 2007,
          2008, 2009, 2010, 2011,
          2012, 2013, 2014, 2015,
        ]);

        controller.leftButtonClicked();

        expect(controller.yearSelections).to.eql([
          1992, 1993, 1994, 1995,
          1996, 1997, 1998, 1999,
          2000, 2001, 2002, 2003,
        ]);
      });
    });

    context('when selecting a month', () => {
      it('decrements the current selected year', () => {
        const controller = buildDatepickerController();

        controller.selectYear(2000);
        controller.leftButtonClicked();

        expect(controller.currentYearSelection).to.equal(1999);
      });
    });

    context('when selecting a day', () => {
      it('decrements the current month', () => {
        const controller = buildDatepickerController();
        controller.selectYear(2000);
        controller.selectMonth(Month.February);

        controller.leftButtonClicked();

        expect(controller.currentMonthSelection).to.equal(Month.January);
      });

      it('sets the date selections of the new month in the current year', () => {
        const controller = buildDatepickerController();
        controller.selectYear(2015);
        controller.selectMonth(Month.November);

        controller.leftButtonClicked();

        const values = controller.daySelections.map(selection => {
          return {
            year: selection.date.getFullYear(),
            month: selection.date.getMonth(),
            day: selection.date.getDate(),
            isDisplayedMonth: selection.isDisplayedMonth,
          };
        });

        expect(values).to.eql([
          { year: 2015, month: Month.September, day: 27, isDisplayedMonth: false },
          { year: 2015, month: Month.September, day: 28, isDisplayedMonth: false },
          { year: 2015, month: Month.September, day: 29, isDisplayedMonth: false },
          { year: 2015, month: Month.September, day: 30, isDisplayedMonth: false },
          { year: 2015, month: Month.October,   day: 1,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 2,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 3,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 4,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 5,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 6,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 7,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 8,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 9,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 10, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 11, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 12, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 13, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 14, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 15, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 16, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 17, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 18, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 19, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 20, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 21, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 22, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 23, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 24, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 25, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 26, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 27, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 28, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 29, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 30, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 31, isDisplayedMonth: true  },
          { year: 2015, month: Month.November,  day: 1,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 2,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 3,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 4,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 5,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 6,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 7,  isDisplayedMonth: false },
        ]);
      });

      it('selects december of the previous year when the current month is january', () => {
        const controller = buildDatepickerController();
        controller.selectYear(2000);
        controller.selectMonth(Month.January);

        controller.leftButtonClicked();

        expect(controller.currentYearSelection).to.equal(1999);
        expect(controller.currentMonthSelection).to.equal(Month.December);
      });

      it('sets the date selections of the new month and year when the current month is january', () => {
        const controller = buildDatepickerController();
        controller.selectYear(2016);
        controller.selectMonth(Month.January);

        controller.leftButtonClicked();

        const values = controller.daySelections.map(selection => {
          return {
            year: selection.date.getFullYear(),
            month: selection.date.getMonth(),
            day: selection.date.getDate(),
            isDisplayedMonth: selection.isDisplayedMonth,
          };
        });

        expect(values).to.eql([
          { year: 2015, month: Month.November, day: 29, isDisplayedMonth: false },
          { year: 2015, month: Month.November, day: 30, isDisplayedMonth: false },
          { year: 2015, month: Month.December, day: 1,  isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 2,  isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 3,  isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 4,  isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 5,  isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 6,  isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 7,  isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 8,  isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 9,  isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 10, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 11, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 12, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 13, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 14, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 15, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 16, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 17, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 18, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 19, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 20, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 21, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 22, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 23, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 24, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 25, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 26, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 27, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 28, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 29, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 30, isDisplayedMonth: true  },
          { year: 2015, month: Month.December, day: 31, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 1,  isDisplayedMonth: false },
          { year: 2016, month: Month.January,  day: 2,  isDisplayedMonth: false },
          { year: 2016, month: Month.January,  day: 3,  isDisplayedMonth: false },
          { year: 2016, month: Month.January,  day: 4,  isDisplayedMonth: false },
          { year: 2016, month: Month.January,  day: 5,  isDisplayedMonth: false },
          { year: 2016, month: Month.January,  day: 6,  isDisplayedMonth: false },
          { year: 2016, month: Month.January,  day: 7,  isDisplayedMonth: false },
          { year: 2016, month: Month.January,  day: 8,  isDisplayedMonth: false },
          { year: 2016, month: Month.January,  day: 9,  isDisplayedMonth: false },
        ]);
      });
    });
  });

  describe('clicking the right button', () => {
    context('when selecting a year', () => {
      it('sets the year selections to the next 12 years', () => {
        const model = new DateInput();
        const date = utc(2003, Month.May, 1);
        const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
        const controller = buildDatepickerController({ model, timeProvider });

        controller.backButtonClicked();
        controller.backButtonClicked();

        expect(controller.yearSelections).to.eql([
          1992, 1993, 1994, 1995,
          1996, 1997, 1998, 1999,
          2000, 2001, 2002, 2003,
        ]);

        controller.rightButtonClicked();

        expect(controller.yearSelections).to.eql([
          2004, 2005, 2006, 2007,
          2008, 2009, 2010, 2011,
          2012, 2013, 2014, 2015,
        ]);
      });
    });

    context('when selecting a month', () => {
      it('increments the current selected year', () => {
        const controller = buildDatepickerController();

        controller.selectYear(2000);
        controller.rightButtonClicked();

        expect(controller.currentYearSelection).to.equal(2001);
      });
    });

    context('when selecting a day', () => {
      it('increments the current month', () => {
        const controller = buildDatepickerController();
        controller.selectYear(2000);
        controller.selectMonth(Month.February);

        controller.rightButtonClicked();

        expect(controller.currentMonthSelection).to.equal(Month.March);
      });

      it('sets the date selections of the new month in the current year', () => {
        const controller = buildDatepickerController();
        controller.selectYear(2015);
        controller.selectMonth(Month.September);

        controller.rightButtonClicked();

        const values = controller.daySelections.map(selection => {
          return {
            year: selection.date.getFullYear(),
            month: selection.date.getMonth(),
            day: selection.date.getDate(),
            isDisplayedMonth: selection.isDisplayedMonth,
          };
        });

        expect(values).to.eql([
          { year: 2015, month: Month.September, day: 27, isDisplayedMonth: false },
          { year: 2015, month: Month.September, day: 28, isDisplayedMonth: false },
          { year: 2015, month: Month.September, day: 29, isDisplayedMonth: false },
          { year: 2015, month: Month.September, day: 30, isDisplayedMonth: false },
          { year: 2015, month: Month.October,   day: 1,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 2,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 3,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 4,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 5,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 6,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 7,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 8,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 9,  isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 10, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 11, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 12, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 13, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 14, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 15, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 16, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 17, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 18, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 19, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 20, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 21, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 22, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 23, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 24, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 25, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 26, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 27, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 28, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 29, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 30, isDisplayedMonth: true  },
          { year: 2015, month: Month.October,   day: 31, isDisplayedMonth: true  },
          { year: 2015, month: Month.November,  day: 1,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 2,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 3,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 4,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 5,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 6,  isDisplayedMonth: false },
          { year: 2015, month: Month.November,  day: 7,  isDisplayedMonth: false },
        ]);
      });

      it('selects january of the following month when the current month is december', () => {
        const controller = buildDatepickerController();
        controller.selectYear(2000);
        controller.selectMonth(Month.December);

        controller.rightButtonClicked();

        expect(controller.currentYearSelection).to.equal(2001);
        expect(controller.currentMonthSelection).to.equal(Month.January);
      });

      it('sets the date selections of the new month and year when the current month is december', () => {
        const controller = buildDatepickerController();
        controller.selectYear(2015);
        controller.selectMonth(Month.December);

        controller.rightButtonClicked();

        const values = controller.daySelections.map(selection => {
          return {
            year: selection.date.getFullYear(),
            month: selection.date.getMonth(),
            day: selection.date.getDate(),
            isDisplayedMonth: selection.isDisplayedMonth,
          };
        });

        expect(values).to.eql([
          { year: 2015, month: Month.December, day: 27, isDisplayedMonth: false },
          { year: 2015, month: Month.December, day: 28, isDisplayedMonth: false },
          { year: 2015, month: Month.December, day: 29, isDisplayedMonth: false },
          { year: 2015, month: Month.December, day: 30, isDisplayedMonth: false },
          { year: 2015, month: Month.December, day: 31, isDisplayedMonth: false },
          { year: 2016, month: Month.January,  day: 1,  isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 2,  isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 3,  isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 4,  isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 5,  isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 6,  isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 7,  isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 8,  isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 9,  isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 10, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 11, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 12, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 13, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 14, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 15, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 16, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 17, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 18, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 19, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 20, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 21, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 22, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 23, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 24, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 25, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 26, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 27, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 28, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 29, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 30, isDisplayedMonth: true  },
          { year: 2016, month: Month.January,  day: 31, isDisplayedMonth: true  },
          { year: 2016, month: Month.February, day: 1,  isDisplayedMonth: false },
          { year: 2016, month: Month.February, day: 2,  isDisplayedMonth: false },
          { year: 2016, month: Month.February, day: 3,  isDisplayedMonth: false },
          { year: 2016, month: Month.February, day: 4,  isDisplayedMonth: false },
          { year: 2016, month: Month.February, day: 5,  isDisplayedMonth: false },
          { year: 2016, month: Month.February, day: 6,  isDisplayedMonth: false },
        ]);
      });
    });
  });

  describe('selecting a day', () => {
    it('updates the model', () => {
      const model = new DateInput();
      const controller = buildDatepickerController({ model });

      controller.selectYear(2000);
      controller.selectMonth(Month.January);
      controller.selectDay({
        isDisplayedMonth: true,
        date: utc(2000, Month.January, 2),
      });

      expect(model.year).to.equal('2000');
      expect(model.month).to.equal('01');
      expect(model.day).to.equal('02');
    });

    it('invokes the on selection callback', () => {
      let callbackWasInvoked = false;
      const onSelection = () => {
        callbackWasInvoked = true;
      };
      const model = new DateInput();
      const controller = buildDatepickerController({ model, onSelection });
      controller.selectYear(2000);
      controller.selectMonth(Month.January);

      controller.selectDay({
        isDisplayedMonth: true,
        date: utc(2000, Month.January, 2),
      });

      expect(callbackWasInvoked).to.equal(true);
    });
  });

  describe('determining if a given date selection should be displayed as today', () => {
    it('returns true when the date selection has the same year, month, and day, and the selection represents the displayed month', () => {
      const model = DateInput.fromStrings('2016', '01', '01');
      const date = utc(2016, Month.May, 1);
      const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
      const controller = buildDatepickerController({ model, timeProvider });
      const selection = {
        isDisplayedMonth: true,
        date: utc(2016, Month.May, 1),
      };

      expect(controller.shouldDisplayDateSelectionAsToday(selection)).to.equal(true);
    });

    it('returns false when the selection does not represent the displayed month', () => {
      const model = DateInput.fromStrings('2016', '01', '01');
      const date = utc(2016, Month.May, 1);
      const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
      const controller = buildDatepickerController({ model, timeProvider });
      const selection = {
        isDisplayedMonth: false,
        date: utc(2016, Month.May, 1),
      };

      expect(controller.shouldDisplayDateSelectionAsToday(selection)).to.equal(false);
    });

    it('returns false when the current year is different than the selection', () => {
      const model = DateInput.fromStrings('2016', '01', '01');
      const date = utc(2016, Month.May, 1);
      const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
      const controller = buildDatepickerController({ model, timeProvider });
      const selection = {
        isDisplayedMonth: false,
        date: utc(1999, Month.May, 1),
      };

      expect(controller.shouldDisplayDateSelectionAsToday(selection)).to.equal(false);
    });

    it('returns false when the current month is different than the selection', () => {
      const model = DateInput.fromStrings('2016', '01', '01');
      const date = utc(2016, Month.May, 1);
      const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
      const controller = buildDatepickerController({ model, timeProvider });
      const selection = {
        isDisplayedMonth: false,
        date: utc(2016, Month.August, 1),
      };

      expect(controller.shouldDisplayDateSelectionAsToday(selection)).to.equal(false);
    });

    it('returns false when the current day is different than the selection', () => {
      const model = DateInput.fromStrings('2016', '01', '01');
      const date = utc(2016, Month.May, 1);
      const timeProvider = new MockTimeProvider().withNowStubbedToReturn(date);
      const controller = buildDatepickerController({ model, timeProvider });
      const selection = {
        isDisplayedMonth: false,
        date: utc(2016, Month.May, 2),
      };

      expect(controller.shouldDisplayDateSelectionAsToday(selection)).to.equal(false);
    });
  });

  describe('determining if a given year should be displayed as the current year selection', () => {
    it('returns true/false when the year is equal to the current selected year', () => {
      const controller = buildDatepickerController();
      controller.selectYear(1999);
      expect(controller.shouldDisplayAsCurrentYearSelection(2000)).to.equal(false);

      controller.selectYear(2000);
      expect(controller.shouldDisplayAsCurrentYearSelection(2000)).to.equal(true);
    });
  });

  describe('determining if a given month should be displayed as the current month selection', () => {
    it('returns true/false when the month is equal to the current selected month', () => {
      const controller = buildDatepickerController();
      controller.selectYear(1999);
      controller.selectMonth(Month.May);
      expect(controller.shouldDisplayAsCurrentMonthSelection(Month.August)).to.equal(false);

      controller.backButtonClicked();
      controller.selectMonth(Month.August);
      expect(controller.shouldDisplayAsCurrentMonthSelection(Month.August)).to.equal(true);
    });
  });

  describe('determining if a given date selection should be displayed as the current date selection', () => {
    it('returns true when the model has a date and the year, month, and day are the same', () => {
      const model = DateInput.fromStrings('2000', '01', '01');
      const controller = buildDatepickerController({ model });
      const selection = {
        isDisplayedMonth: false,
        date: utc(2000, 0, 1),
      };

      expect(controller.shouldDisplayAsCurrentDateSelection(selection)).to.equal(true);
    });

    it('returns false when the model does not have a fully-formed, parseable date', () => {
      const model = DateInput.fromStrings('2000', '01', '');
      const controller = buildDatepickerController({ model });
      const selection = {
        isDisplayedMonth: false,
        date: utc(2000, 0, 1),
      };

      expect(controller.shouldDisplayAsCurrentDateSelection(selection)).to.equal(false);
    });

    it('returns false when the model\'s year is not the same as the selection\'s year', () => {
      const model = DateInput.fromStrings('2000', '01', '01');
      const controller = buildDatepickerController({ model });
      const selection = {
        isDisplayedMonth: false,
        date: utc(1999, 0, 1),
      };

      expect(controller.shouldDisplayAsCurrentDateSelection(selection)).to.equal(false);
    });

    it('returns false when the model\'s month is not the same as the selection\'s month', () => {
      const model = DateInput.fromStrings('2000', '01', '01');
      const controller = buildDatepickerController({ model });
      const selection = {
        isDisplayedMonth: false,
        date: utc(2000, 9, 1),
      };

      expect(controller.shouldDisplayAsCurrentDateSelection(selection)).to.equal(false);
    });

    it('returns false when the model\'s day is not the same as the selection\'s day', () => {
      const model = DateInput.fromStrings('2000', '01', '01');
      const controller = buildDatepickerController({ model });
      const selection = {
        isDisplayedMonth: false,
        date: utc(2000, 0, 25),
      };

      expect(controller.shouldDisplayAsCurrentDateSelection(selection)).to.equal(false);
    });
  });
});
