import Component from "./base-component.js";
import { Project } from "../models/project.js";
import { InputHtmlElements } from "../models/project-item-interface";
import { Draggable } from "../models/drag-and-drop.js";
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { peopleValidatable, validate } from "../validations/input.js";

export default class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;
  singleProjectHtmlElements: InputHtmlElements;

  get persons(): { numberOfPeople: number; message: string } {
    if (this.project.userInputs.numberOfPeople === 1) {
      return {
        numberOfPeople: this.project.userInputs.numberOfPeople,
        message: "person assigned",
      };
    } else {
      return {
        numberOfPeople: this.project.userInputs.numberOfPeople,
        message: "persons assigned",
      };
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.singleProjectHtmlElements = {
      title: this.element.querySelector("h2")! as HTMLHeadingElement,
      description: this.element.querySelector(
        "textarea"
      )! as HTMLTextAreaElement,
      numberOfPeople: this.element.querySelector("input")! as HTMLInputElement,
      buttons: Array.from(
        this.element.querySelectorAll("button")
      )! as HTMLButtonElement[],
    };

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent) {}

  addProjectStyles(id: string) {
    Object.defineProperty(this.singleProjectHtmlElements, "title", {
      enumerable: false,
    });

    //   let key: keyof typeof this.singleProjectHtmlElements;
    //   for (key in this.singleProjectHtmlElements) {
    //     if (key !== "buttons") {
    //       if (id === "edit") {
    //         if (this.singleProjectHtmlElements[key].type === "text") {
    //           this.singleProjectHtmlElements[key].value =
    //             this.persons.numberOfPeople;
    //         }
    //         this.singleProjectHtmlElements[key].classList.add("edit");
    //         this.singleProjectHtmlElements[key].disabled = false;
    //       } else {
    //         if (this.singleProjectHtmlElements[key].type === "text") {
    //           peopleValidatable.value = Number(
    //             this.singleProjectHtmlElements[key].value
    //           );

    //           if (validate(peopleValidatable)) {
    //             this.project.userInputs.numberOfPeople = Number(
    //               this.singleProjectHtmlElements[key].value
    //             );

    //             this.singleProjectHtmlElements[
    //               key
    //             ].value = `${this.persons.numberOfPeople} ${this.persons.message}`;
    //           } else {
    //             console.log(peopleValidatable);

    //             return alert("Number of people must be between 1 and 7!");
    //           }
    //         }
    //         this.singleProjectHtmlElements[key].classList.remove("edit");
    //         this.singleProjectHtmlElements[key].disabled = true;
    //       }
    //     } else {
    //       if (id === "edit") {
    //         this.singleProjectHtmlElements.buttons!.forEach((button, index) => {
    //           if (index === 2) {
    //             button.style.visibility = "visible";
    //           } else {
    //             button.style.display = "none";
    //           }
    //         });
    //       } else if (id === "save") {
    //         this.singleProjectHtmlElements.buttons!.forEach((button, index) => {
    //           if (index === 2) {
    //             button.style.visibility = "hidden";
    //           } else {
    //             button.style.display = "inline-block";
    //           }
    //         });
    //       } else {
    //         projectState.removeProject(this.element.id);
    //       }
    //     }
    //   }
    // }

    let key: keyof typeof this.singleProjectHtmlElements;
    for (key in this.singleProjectHtmlElements) {
      if (key === "description") {
        if (id === "edit") {
          this.project.userInputs.description =
            this.singleProjectHtmlElements[key].value;
          this.singleProjectHtmlElements[key].classList.add("edit");
          this.singleProjectHtmlElements[key].disabled = false;
        } else {
          this.singleProjectHtmlElements[key].classList.remove("edit");
          this.singleProjectHtmlElements[key].disabled = true;
        }
      }

      if (key === "numberOfPeople") {
        if (id === "edit") {
          peopleValidatable.value = this.project.userInputs.numberOfPeople;
          this.project.userInputs.numberOfPeople = peopleValidatable.value;
          if (validate(peopleValidatable)) {
            this.singleProjectHtmlElements[
              key
            ].value = `${this.persons.numberOfPeople}`;
            this.singleProjectHtmlElements[key].classList.add("edit");
            this.singleProjectHtmlElements[key].disabled = false;
          } else {
            return alert("Number of people must be between 1 and 7!");
          }
        } else {
          this.project.userInputs.numberOfPeople = Number(
            this.singleProjectHtmlElements[key].value
          );

          this.singleProjectHtmlElements[
            key
          ].value = `${this.persons.numberOfPeople} ${this.persons.message}`;
          this.singleProjectHtmlElements[key].classList.remove("edit");
          this.singleProjectHtmlElements[key].disabled = true;
          console.log(this.persons);
        }
      }

      if (key === "buttons") {
        this.singleProjectHtmlElements.buttons!.forEach((button, index) => {
          console.log(button);

          if (id === "edit") {
            return index === 2
              ? (button.style.visibility = "visible")
              : (button.style.display = "none");
          }
          if (id === "save") {
            return index === 2
              ? (button.style.visibility = "hidden")
              : (button.style.display = "inline-block");
          }

          return projectState.removeProject(this.element.id);
        });
      }
    }
  }

  @autobind
  editProjectItem(e: any): void {
    this.addProjectStyles(e.target.id);
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
    this.singleProjectHtmlElements.buttons!.forEach((e) =>
      e.addEventListener("click", this.editProjectItem)
    );
  }

  renderContent() {
    this.singleProjectHtmlElements.title.textContent =
      this.project.userInputs.title;
    this.singleProjectHtmlElements.description.textContent =
      this.project.userInputs.description;
    this.singleProjectHtmlElements.numberOfPeople.value = `${this.persons.numberOfPeople} ${this.persons.message}`;
  }
}
