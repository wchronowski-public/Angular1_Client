import { AngularUiRouter } from './../src/routing/AngularUiRouter';
import { IAgentDefaultsRouter } from 'src/defaults/IAgentDefaultsRouter';
import { AgentDefaultsValidator } from './../src/defaults/AgentDefaultsValidator';
import { IAgentDefaultsValidator } from 'src/defaults/IAgentDefaultsValidator';
import { AgentDefaultsService } from './../src/defaults/AgentDefaultsService';
import { IAgentDefaultsService } from 'src/defaults/IAgentDefaultsService';
import * as angular from 'angular';
import { expect } from 'chai';
import { Application } from '../src/Application';
import { ITimeProvider } from '../src/util/ITimeProvider';
import { CurrentTimeProvider } from '../src/util/CurrentTimeProvider';
import { IEnvironmentConfiguration } from '../src/IEnvironmentConfiguration';
import { FakeConfig } from './util/FakeConfig';
import { AngularHttpClient } from '../src/http/AngularHttpClient';
import { IHttpClient } from '../src/http/IHttpClient';
import { Optional } from '../src/util/Optional';
import { IInputIdentification } from '../src/inputs/IInputIdentification';
import { InputIdentification } from '../src/inputs/InputIdentification';

function findAttribute(element: Element, attributeName: string): Optional<Attr> {
  const attributes = element.attributes;
  for(let attributeIndex = 0; attributeIndex < attributes.length; attributeIndex++) {
    const attribute = attributes[attributeIndex];
    if (attribute.name === attributeName) {
      return Optional.of(attribute);
    }
  }

  return Optional.none<Attr>();
}

function findElementByAttribute(element: Element, tagName: string, attributeName: string, attributeValue: string): Optional<Element> {
  const elementsWithTag = element.getElementsByTagName(tagName);
  for(let elementIndex = 0; elementIndex < elementsWithTag.length; elementIndex++) {
    const div = elementsWithTag[elementIndex];
    const maybeMatchingAttribute = findAttribute(div, attributeName) .flatMap(attribute => {
      return attribute.value === attributeValue ? Optional.of(attribute) : Optional.none<Attr>();
    });
    if (maybeMatchingAttribute.hasValue()) {
      return Optional.of(div);
    }
  }
  return Optional.none<HTMLElement>();
}

function removeAllChildren(element: Element): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function findApplicationContainer(): Optional<Element> {
  return findElementByAttribute(document.body, 'div', 'data-id', 'application-container');
}

function findViewContainer(parent: Element): Optional<Element> {
  return findElementByAttribute(parent, 'div', 'data-id', 'view-container');
}

function buildConfig(): IEnvironmentConfiguration {
  return new FakeConfig();
}

describe('Application', () => {
  afterEach(() => removeAllChildren(document.body));

  describe('#initialize', () => {
    it('creates an application container', () => {
      let maybeContainerElement = findApplicationContainer();
      expect(maybeContainerElement.hasValue()).to.equal(false);

      new Application().initialize(buildConfig());

      maybeContainerElement = findApplicationContainer();
      expect(maybeContainerElement.hasValue()).to.equal(true);
      const maybeNgAppAttribute = maybeContainerElement.flatMap(containerElement => {
        return findAttribute(containerElement, 'ng-app');
      });
      expect(maybeNgAppAttribute.hasValue()).to.equal(true);
      expect(maybeNgAppAttribute.get().value).to.equal(Application.NAME);
    });

    it('creates a view element within the application container', () => {
      expect(findViewContainer(document.body).hasValue()).to.equal(false);

      new Application().initialize(buildConfig());

      const maybeViewContainer = findApplicationContainer()
        .flatMap(applicationContainer => findViewContainer(applicationContainer));

      expect(maybeViewContainer.hasValue()).to.equal(true);

      const maybeUiViewAttribute = maybeViewContainer.flatMap(viewContainer => findAttribute(viewContainer, 'ui-view'));
      expect(maybeUiViewAttribute.hasValue()).to.equal(true);
      expect(maybeUiViewAttribute.get().value).to.equal('');
    });
  });

  context('dependency injection', () => {
    beforeEach(() => angular.mock.module(new Application().setupAngular(buildConfig()).name()));

    it('injects a time provider', () => {
      inject(['timeProvider', (timeProvider: ITimeProvider) => {
        expect(timeProvider).to.be.an.instanceOf(CurrentTimeProvider);
      }]);
    });

    it('injects the angular $http wrapper as an http client', () => {
      inject(['httpClient', (client: IHttpClient) => {
        expect(client).to.be.an.instanceOf(AngularHttpClient);
      }]);
    });

    it('injects the environment configuration', () => {
      const config = buildConfig();
      angular.mock.module(new Application().setupAngular(config).name());
      inject(['config', (injectedConfig: IEnvironmentConfiguration) => {
        expect(injectedConfig).to.equal(config);
      }]);
    });

    it('injects the identification', () => {
      inject(['identification', (identification: IInputIdentification) => {
        expect(identification).to.be.an.instanceOf(InputIdentification);
      }]);
    });

    it('injects the service as an agent defaults service', () => {
      inject(['agentDefaultsService', (agentDefaultsService: IAgentDefaultsService) => {
        expect(agentDefaultsService).to.be.an.instanceOf(AgentDefaultsService);
      }]);
    });

    it('injects the validator as an agent defaults validator', () => {
      inject(['agentDefaultsValidator', (agentDefaultsValidator: IAgentDefaultsValidator) => {
        expect(agentDefaultsValidator).to.be.an.instanceOf(AgentDefaultsValidator);
      }]);
    });

    it('injects the angular ui router as the agent defaults router', () => {
      inject(['agentDefaultsRouter', (router: IAgentDefaultsRouter) => {
        expect(router).to.be.an.instanceOf(AngularUiRouter);
        }]);
    });
  });
});
