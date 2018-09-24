type Validation = {
  message: string;
  condition: boolean;
};

export default class PayloadValidator {

  validations: Validation[];

  constructor() {
    this.validations = [];
  }

  validate(condition: boolean, message: string) {
    this.validations.push({
      message,
      condition,
    });
  }

  getErrors(): string[] {
    const invalid: Validation[] = this.validations.filter(e => !e.condition);
    return invalid.map(val => val.message);
  }

}
