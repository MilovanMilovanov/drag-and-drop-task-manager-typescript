export interface InputModel {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface UserInput {
  title: string;
  description: string;
  numberOfPeople: number;
}
