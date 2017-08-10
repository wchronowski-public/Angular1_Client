function join(a: string, b: string): string {
  return a + '.' + b;
}

function childOf(parent: string): { withName: Func<string, string> } {
  return {
    withName: name => join(parent, name),
  };
}

const ROOT                  = 'projectName';
const HOME                  = childOf(ROOT).withName('home');
const UNAUTHORIZED          = childOf(ROOT).withName('unauthorized');
const STYLEGUIDE            = childOf(ROOT).withName('styleguide');
const AGENT_DEFAULTS        = childOf(ROOT).withName('defaults');
const AGENT_DEFAULTS_SHOW   = childOf(AGENT_DEFAULTS).withName('show');
const AGENT_DEFAULTS_EDIT   = childOf(AGENT_DEFAULTS).withName('edit');

export const STATES = {
  ROOT,
  HOME,
  UNAUTHORIZED,
  STYLEGUIDE,
  AGENT_DEFAULTS,
  AGENT_DEFAULTS_SHOW,
  AGENT_DEFAULTS_EDIT,
};

export const ADD_STATES_TO_ROOT_SCOPE = ['$rootScope', ($rootScope: any) => $rootScope.STATES = STATES];
