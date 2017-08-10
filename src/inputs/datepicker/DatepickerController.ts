import { Inject } from '../../util/Inject';
import { DateInput } from '../date/DateInput';
import { TIME_PROVIDER , ITimeProvider } from '../../util/ITimeProvider';
import { Month } from '../../util/Month';

export interface IDatepickerScope {
  model: DateInput;
  onSelection?: () => void;
}

type DateSelection = {
  date: Date,
  isDisplayedMonth: boolean,
}

const NUMBER_OF_OPTIONS_PER_SCREEN = 12;
const NUMBER_OF_DAY_OPTIONS = 42;

@Inject('$scope', TIME_PROVIDER)
export class DatepickerController {
  private isShowingYearSelection = false;
  private isShowingMonthSelection = false;
  private isShowingDaySelection = true;

  public currentYearSelection: number;
  public currentMonthSelection: Month;

  public yearSelections: number[] = [];
  public monthSelections: Month[] = [
    Month.January,
    Month.February,
    Month.March,
    Month.April,
    Month.May,
    Month.June,
    Month.July,
    Month.August,
    Month.September,
    Month.October,
    Month.November,
    Month.December,
  ];
  public daySelections: DateSelection[] = [];

  public constructor(private $scope: IDatepickerScope, private timeProvider: ITimeProvider) {
    const date = $scope.model.toDate();

    if(date) {
      this.currentYearSelection = date.getUTCFullYear();
      this.currentMonthSelection = date.getUTCMonth();
      this.setYearSelections(date);
      this.setDateSelections(date);
    } else {
      const now = timeProvider.now();
      this.currentYearSelection = now.getUTCFullYear();
      this.currentMonthSelection = now.getUTCMonth();
      this.setYearSelections(now);
      this.setDateSelections(now);
    }
  }

  public currentMonthName(): string {
    return this.monthName(this.currentMonthSelection);
  }

  public monthName(month: Month): string {
    switch(month) {
      case Month.January: return 'January';
      case Month.February: return 'February';
      case Month.March: return 'March';
      case Month.April: return 'April';
      case Month.May: return 'May';
      case Month.June: return 'June';
      case Month.July: return 'July';
      case Month.August: return 'August';
      case Month.September: return 'September';
      case Month.October: return 'October';
      case Month.November: return 'November';
      case Month.December: return 'December';
      default: throw new Error(`unsupported month: ${month}`);
    }
  }

  public currentMinimumYearSelection(): number {
    return this.yearSelections[0];
  }

  public currentMaximumYearSelection(): number {
    return this.yearSelections[this.yearSelections.length - 1];
  }

  public backButtonClicked(): void {
    if(this.isShowingYearSelection) {
      return;
    }

    if(this.isShowingMonthSelection) {
      this.isShowingYearSelection = true;
      this.isShowingMonthSelection = false;
      this.isShowingDaySelection = false;
      return;
    }

    this.isShowingYearSelection = false;
    this.isShowingMonthSelection = true;
    this.isShowingDaySelection = false;
  }

  public leftButtonClicked(): void {
    if(this.isShowingYearSelection) {
      this.yearSelections = this.yearSelections.map(n => n - NUMBER_OF_OPTIONS_PER_SCREEN);
      return;
    }

    if(this.isShowingMonthSelection) {
      this.currentYearSelection--;
      return;
    }

    if(this.currentMonthSelection === Month.January) {
      this.currentYearSelection--;
      this.currentMonthSelection = Month.December;
      this.updateDateSelections();
    } else {
      this.currentMonthSelection--;
      this.updateDateSelections();
    }
  }

  public rightButtonClicked(): void {
    if(this.isShowingYearSelection) {
      this.yearSelections = this.yearSelections.map(n => n + NUMBER_OF_OPTIONS_PER_SCREEN);
      return;
    }

    if(this.isShowingMonthSelection) {
      this.currentYearSelection++;
      return;
    }

    if(this.currentMonthSelection === Month.December) {
      this.currentYearSelection++;
      this.currentMonthSelection = Month.January;
      this.updateDateSelections();
    } else {
      this.currentMonthSelection++;
      this.updateDateSelections();
    }
  }

  public selectYear(year: number): void {
    this.currentYearSelection = year;
    this.isShowingYearSelection = false;
    this.isShowingMonthSelection = true;
    this.isShowingDaySelection = false;
  }

  public selectMonth(month: Month): void {
    this.currentMonthSelection = month;
    const date = new Date(this.currentYearSelection, this.currentMonthSelection);
    this.setDateSelections(date);
    this.isShowingYearSelection = false;
    this.isShowingMonthSelection = false;
    this.isShowingDaySelection = true;
  }

  public selectDay(selection: DateSelection): void {
    this.$scope.model.setTo(selection.date);
    if(this.$scope.onSelection) {
      this.$scope.onSelection();
    }
  }

  public shouldDisplayAsCurrentYearSelection(year: number): boolean {
    return year === this.currentYearSelection;
  }

  public shouldDisplayAsCurrentMonthSelection(month: Month): boolean {
    return month === this.currentMonthSelection;
  }

  public shouldDisplayDateSelectionAsToday(selection: DateSelection): boolean {
    const now = this.timeProvider.now();
    const date = selection.date;

    return selection.isDisplayedMonth
        && now.getUTCFullYear() === date.getUTCFullYear()
        && now.getUTCMonth() === date.getUTCMonth()
        && now.getUTCDate() === date.getUTCDate();
  }

  public shouldDisplayAsCurrentDateSelection(selection: DateSelection): boolean {
    const modelDate = this.$scope.model.toDate();
    const date = selection.date;

    return !!modelDate
        && modelDate.getUTCFullYear() === date.getUTCFullYear()
        && modelDate.getUTCMonth() === date.getUTCMonth()
        && modelDate.getUTCDate() === date.getUTCDate();
  }

  private updateDateSelections(): void {
    this.setDateSelections(new Date(this.currentYearSelection, this.currentMonthSelection));
  }

  private setYearSelections(currentDate: Date): void {
    const year = currentDate.getUTCFullYear();
    const earliestYearInGroup = year - (year % NUMBER_OF_OPTIONS_PER_SCREEN);
    const selections: number[] = [];
    for(let i = 0; i < NUMBER_OF_OPTIONS_PER_SCREEN; i++) {
      selections.push(earliestYearInGroup + i);
    }
    this.yearSelections = selections;
  }

  private setDateSelections(currentDate: Date): void {
    const startOfMonth = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth());
    const offset = 1 - startOfMonth.getDay();
    const start = new Date(startOfMonth.getUTCFullYear(), startOfMonth.getUTCMonth(), offset);

    const selections: DateSelection[] = [];
    for(let i = 0; i < NUMBER_OF_DAY_OPTIONS; i++) {
      const date = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + i);
      const isDisplayedMonth = date.getUTCMonth() === currentDate.getUTCMonth();
      selections.push({ date, isDisplayedMonth });
    }

    this.daySelections = selections;
  }

  public shouldShowYearSelection(): boolean {
    return this.isShowingYearSelection;
  }

  public shouldShowMonthSelection(): boolean {
    return this.isShowingMonthSelection;
  }

  public shouldShowDaySelection(): boolean {
    return this.isShowingDaySelection;
  }
}
