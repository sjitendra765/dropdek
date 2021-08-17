import ComponentService from './ComponentService';

it('correctly creates an instance', () => {
  const componentManager = ComponentService.instance();
  expect(componentManager).toBeDefined();
  expect(componentManager).toBe(ComponentService.instance());
});

it('handles capabilities', () => {
  const componentManager = ComponentService.instance();
  expect(componentManager.componentsByType).toBeDefined();
  expect(componentManager.get('slide-break')).toBeDefined();
});

it('handles partial matches', () => {
  const componentManager = ComponentService.instance();
  expect(Object.keys(componentManager.suggest('n')).length).toEqual(0);
  expect(Object.keys(componentManager.suggest('ne')).length).toEqual(1);
  expect(Object.keys(componentManager.suggest('new ')).length).toEqual(1);
  expect(Object.keys(componentManager.suggest('sl')).length).toEqual(1);
});
