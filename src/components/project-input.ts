import Component from "./base-component.js";
import { projectState } from "../state/project-state.js";
import { InputHtmlElements } from "../models/project-item-interface";
import { UserInput } from "../models/input-interfaces.js";
import { autobind } from "../decorators/autobind.js";
import { submitProjectMessage, changeHeaderColor } from "../utils/utils.js";
import {
  titleValidatable,
  descriptionValidatable,
  peopleValidatable,
  validate,
  errorMessages,
} from "../validations/input.js";

export default class ProjectInput extends Component<
  HTMLDivElement,
  HTMLFormElement
> {
  formInputHtmlElements: InputHtmlElements;
  submitProjectMessageTemplate: HTMLTemplateElement;
  submitProjectMessage: HTMLDivElement;
  constructor() {
    super("project-input", "app", true, "user-input");

    this.formInputHtmlElements = {
      title: this.element.querySelector("#title") as HTMLInputElement,
      description: this.element.querySelector(
        "#description"
      ) as HTMLTextAreaElement,
      numberOfPeople: this.element.querySelector("#people") as HTMLInputElement,
    };

    this.submitProjectMessageTemplate = this.element.querySelector(
      "#project-message"
    )! as HTMLTemplateElement;
    this.submitProjectMessage = this.submitProjectMessageTemplate.content
      .lastElementChild as HTMLDivElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): UserInput | string {
    titleValidatable.value = this.formInputHtmlElements.title.value;
    descriptionValidatable.value = this.formInputHtmlElements.description.value;
    peopleValidatable.value = Number(
      this.formInputHtmlElements.numberOfPeople.value
    );

    if (!validate(titleValidatable)) return errorMessages.title;
    if (!validate(descriptionValidatable)) return errorMessages.description;
    if (!validate(peopleValidatable)) return errorMessages.people;

    return {
      title: titleValidatable.value.toString(),
      description: descriptionValidatable.value,
      numberOfPeople: peopleValidatable.value,
    };
  }

  private clearInputs() {
    this.formInputHtmlElements.title.value = "";
    this.formInputHtmlElements.description.value = "";
    this.formInputHtmlElements.numberOfPeople.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    const userInputResult = this.gatherUserInput();

    if (typeof userInputResult === "object") {
      projectState.addProject(userInputResult);
      submitProjectMessage(
        userInputResult,
        this.submitProjectMessage,
        this.element
      );
      this.clearInputs();
      changeHeaderColor(this.projectHeader);
    } else {
      submitProjectMessage(
        userInputResult,
        this.submitProjectMessage,
        this.element
      );
    }
  }
}
