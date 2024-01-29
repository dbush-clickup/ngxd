import { hasProperty } from '../../../lib/property-def';
import { ContextState, LifecycleReport, LifecycleState } from '../test-case.interfaces';

export class SimpleLifecycleReport extends LifecycleReport {
  constructor(protected name: string) {
    super();
  }

  canReport<TComponent>(oldState: ContextState, newState: ContextState): boolean {
    const hasChanged = oldState.dynamic.name !== newState.dynamic.name ||
      oldState.dynamic.label !== newState.dynamic.label;
    return hasChanged && newState.type && hasProperty(newState.type.prototype, this.name);
  }

  report<TComponent>(oldState: ContextState, newState: ContextState): LifecycleState {
    return {
      ctor: newState.type,
      name: this.name,
      state: { name: newState.dynamic.name, label: newState.dynamic.label },
      changes: void 0,
    };
  }
}
