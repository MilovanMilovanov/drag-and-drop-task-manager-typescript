import { InputModel } from "../models/input-interfaces.js";
import { messageValidation } from "../models/input-error-interface.js";

export const errorMessages: messageValidation = {
  title: "The title name must be longer!",
  description: "The description is not long enough!",
  people: "Number of people must be between 1 and 7!",
};

export const titleValidatable: InputModel = {
  value: "",
  required: true,
};
export const descriptionValidatable: InputModel = {
  value: "",
  required: true,
  minLength: 5,
};
export const peopleValidatable: InputModel = {
  value: "",
  required: true,
  min: 1,
  max: 7,
};

export function validate(validatableInput: InputModel) {
  let isValid = true;

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}
