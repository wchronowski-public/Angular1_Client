import * as angular from 'angular';
import * as RouteMiddlewareChain from './routing/RouteMiddlewareChain';
import { ADD_PERMISSIONS_TO_ROOT_SCOPE } from './auth/Permissions';
import { ADD_STATES_TO_ROOT_SCOPE } from './routing/States';
import { AngularHttpClient } from './http/AngularHttpClient';
import { AngularUiRouter } from './routing/AngularUiRouter';
import { AuthMiddleware } from './auth/AuthMiddleware';
import { AUTH_ROUTER } from './auth/IAuthRouter';
import { AUTH_SERVICE } from './auth/IAuthService';
import { AuthService } from './auth/AuthService';
import { CheckboxInputDirective } from './inputs/checkbox/CheckboxInputDirective';
import { ConfirmationComponent } from './util/confirmations/ConfirmationComponent';
import { CurrentTimeProvider } from './util/CurrentTimeProvider';
import { DateInputDirective } from './inputs/date/DateInputDirective';
import { DatepickerDirective } from './inputs/datepicker/DatepickerDirective';
import { HTTP_CLIENT } from './http/IHttpClient';
import { IDENTIFICATION } from './inputs/IInputIdentification';
import { IEnvironmentConfiguration, CONFIG } from './IEnvironmentConfiguration';
import { InputIdentification } from './inputs/InputIdentification';
import { NotificationDirective } from './notifications/NotificationDirective';
import { NotificationsDirective } from './notifications/NotificationsDirective';
import { NOTIFICATION_SERVICE, NotificationService } from './notifications/NotificationService';
import { NumberInputDirective } from './inputs/number/NumberInputDirective';
import { OnDocumentClickDirective } from './util/OnDocumentClickDirective';
import { PermissionDirective } from './auth/PermissionDirective';
import { ROUTING } from './routing/Routing';
import { SelectInputDirective } from './inputs/select/SelectInputDirective';
import { TIME_PROVIDER } from './util/ITimeProvider';
import { TextInputDirective } from './inputs/text/TextInputDirective';
import { ToggleInputDirective } from './inputs/toggle/ToggleInputDirective';
import { YesNoInputDirective } from './inputs/toggle/YesNoInputDirective';
import { ZipCodeInputDirective } from './inputs/zipCode/ZipCodeInputDirective';
import { AGENT_DEFAULTS_SERVICE } from './defaults/IAgentDefaultsService';
import { AgentDefaultsService } from './defaults/AgentDefaultsService';
import { AGENT_DEFAULTS_VALIDATOR } from './defaults/IAgentDefaultsValidator';
import { AgentDefaultsValidator } from './defaults/AgentDefaultsValidator';
import { AGENT_DEFAULTS_ROUTER } from './defaults/IAgentDefaultsRouter';

export class Application {
  public static NAME = 'ProgramName';

  public initialize(config: IEnvironmentConfiguration): void {
    this.setupApplicationContainer().setupAngular(config);
  }

  public setupAngular(config: IEnvironmentConfiguration): this {
    angular.module(this.name(), ['ui.router'])
      .component(ConfirmationComponent.NAME, ConfirmationComponent.COMPONENT)
      .config(ROUTING)
      .directive(CheckboxInputDirective.NAME, CheckboxInputDirective.DIRECTIVE)
      .directive(DateInputDirective.NAME, DateInputDirective.DIRECTIVE)
      .directive(DatepickerDirective.NAME, DatepickerDirective.DIRECTIVE)
      .directive(NotificationsDirective.NAME, NotificationsDirective.DIRECTIVE)
      .directive(NotificationDirective.NAME, NotificationDirective.DIRECTIVE)
      .directive(NumberInputDirective.NAME, NumberInputDirective.DIRECTIVE)
      .directive(OnDocumentClickDirective.NAME, OnDocumentClickDirective.DIRECTIVE)
      .directive(PermissionDirective.NAME, PermissionDirective.DIRECTIVE)
      .directive(SelectInputDirective.NAME, SelectInputDirective.DIRECTIVE)
      .directive(TextInputDirective.NAME, TextInputDirective.DIRECTIVE)
      .directive(ToggleInputDirective.NAME, ToggleInputDirective.DIRECTIVE)
      .directive(YesNoInputDirective.NAME, YesNoInputDirective.DIRECTIVE)
      .directive(ZipCodeInputDirective.NAME, ZipCodeInputDirective.DIRECTIVE)
      .run(RouteMiddlewareChain.using(AuthMiddleware.NAME))
      .run(ADD_PERMISSIONS_TO_ROOT_SCOPE)
      .run(ADD_STATES_TO_ROOT_SCOPE)
      .service(AUTH_ROUTER, AngularUiRouter)
      .service(AUTH_SERVICE, AuthService)
      .service(AuthMiddleware.NAME, AuthMiddleware)
      .service(HTTP_CLIENT, AngularHttpClient)
      .service(IDENTIFICATION, InputIdentification)
      .service(NOTIFICATION_SERVICE, NotificationService)
      .service(TIME_PROVIDER, CurrentTimeProvider)
      .service(AGENT_DEFAULTS_SERVICE, AgentDefaultsService)
      .service(AGENT_DEFAULTS_VALIDATOR, AgentDefaultsValidator)
      .service(AGENT_DEFAULTS_ROUTER, AngularUiRouter)
      .value(CONFIG, config);
    return this;
  }

  public name(): string {
    return Application.NAME;
  }

  private setupApplicationContainer(): this {
    document.body.appendChild(this.createApplicationDiv());
    return this;
  }

  private createApplicationDiv(): HTMLDivElement {
    const applicationDiv = document.createElement('div');
    this.addAttribute(applicationDiv, 'data-id', 'application-container');
    this.addAttribute(applicationDiv, 'ng-app', this.name());
    applicationDiv.appendChild(this.createViewDiv());
    return applicationDiv;
  }

  private createViewDiv(): HTMLDivElement {
    const viewDiv = document.createElement('div');
    this.addAttribute(viewDiv, 'data-id', 'view-container');
    this.addAttribute(viewDiv, 'ui-view');
    return viewDiv;
  }

  private addAttribute(el: Element, attributeName: string, attributeValue?: string): void {
    const attribute = document.createAttribute(attributeName);
    if(attributeValue) { attribute.value = attributeValue; };
    el.setAttributeNode(attribute);
  }
}
