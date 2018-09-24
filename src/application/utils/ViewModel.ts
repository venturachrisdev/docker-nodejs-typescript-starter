enum ViewModelAction {
  assign = 1,
  rename = 2,
  remove = 3,
}

type ViewModelRule = {
  action: ViewModelAction,
  keyOne: string,
  keyTwo?: string,
  fn?: (model: any) => {},
};

export class ViewModelBuilder {

  rules: ViewModelRule[];

  constructor() {
    this.rules = [];
  }

  remove(key: string): ViewModelBuilder {
    this.rules.push({
      action: ViewModelAction.remove,
      keyOne: key,
    });
    return this;
  }

  rename(keyOne: string, keyTwo: string): ViewModelBuilder {
    this.rules.push({
      keyOne,
      keyTwo,
      action: ViewModelAction.rename,
    });
    return this;
  }

  assign(key: string, fn: (model: any) => any): ViewModelBuilder {
    this.rules.push({
      fn,
      action: ViewModelAction.assign,
      keyOne: key,
    });
    return this;
  }

  build() {
    return new ViewModel(this.rules);
  }
}

export class ViewModel {

  constructor(private rules: ViewModelRule[]) {}

  transform(model: any): any {
    let viewModel = model;
    for (const rule of this.rules) {
      switch (rule.action) {
        case ViewModelAction.remove:
          viewModel = this.remove(viewModel, rule);
          break;
        case ViewModelAction.rename:
          viewModel = this.rename(viewModel, rule);
          break;
        case ViewModelAction.assign:
          viewModel = this.assign(viewModel, rule);
          break;
      }
    }
    return viewModel;
  }

  assign(model: any, rule: ViewModelRule): any {
    model[rule.keyOne] = rule.fn ? rule.fn(model) : model[rule.keyOne];
    return model;
  }

  remove(model: any, rule: ViewModelRule): any {
    delete model[rule.keyOne];
    return model;
  }

  rename(model: any, rule: ViewModelRule): any {
    model[rule.keyTwo] = model[rule.keyOne];
    delete model[rule.keyOne];
    return model;
  }

  transformAll(models: any[]): any[] {
    const viewModels: any[] = [];
    for (const model of models) {
      viewModels.push(this.transform(model));
    }
    return viewModels;
  }
}
