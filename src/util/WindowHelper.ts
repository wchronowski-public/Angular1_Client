export class WindowHelper {

  public static HEADER_HEIGHT = 100;

  public static goToFirstError(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(function(): void {
        let input = document.querySelector('.invalid') as HTMLElement;
        WindowHelper.focusElement(input);
        WindowHelper.scrollToElement(input);
        resolve();
      });
    });
  }

  public static goToFirstElement(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        let input = document.querySelector('.valid') as HTMLElement;
        WindowHelper.focusElement(input);
        WindowHelper.scrollToElement(input);
        resolve();
      });
    });
  }

  public static focusElementByName(name: string): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        let input = document.querySelector('input[name=' + name + ']') as HTMLElement;
        WindowHelper.focusElement(input);
        resolve();
      });
    });
  }

  public static highlightTextInput(elementId: string): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        const element = document.getElementById(elementId) as HTMLInputElement;
        element.focus();
        element.select();
        resolve();
      });
    });
  }

  private static focusElement(input: HTMLElement): void {
    if (input) {
      input.focus();
    }
  }

  private static scrollToElement(input: HTMLElement): void {
    if (input) {
      input.scrollIntoView();
      window.scrollBy(0, -WindowHelper.HEADER_HEIGHT);
    }
  }
}
