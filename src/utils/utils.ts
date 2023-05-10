import { UserInput } from "../models/input-interfaces.js";

const randomNumber = (): number => Math.random() * 255;

export const changeHeaderColor = (projectHeader: HTMLHeadingElement): void => {
  projectHeader.style.color = `rgba(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
};

export function submitProjectMessage<
  M extends HTMLElement,
  F extends HTMLElement
>(userInputResult: UserInput | string, messages: M, form: F): void {
  messages.style.display = "flex";
  messages.classList.add("messages", "fade-in-out");

  const [firstParag, secondParag] = messages.querySelectorAll("p");

  if (typeof userInputResult === "object") {
    messages.style.color = "lightgreen";
    secondParag.style.borderColor = "lightgreen";
    firstParag.textContent = `Project - ${userInputResult.title} was successfully created!`;
    secondParag.innerHTML = "&#10004";
  } else {
    messages.style.color = "red";
    secondParag.style.borderColor = "red";
    firstParag.textContent = userInputResult;
    secondParag.innerHTML = "&#10006";
  }

  form.appendChild(messages);

  setTimeout(() => {
    messages.style.display = "none";
    messages.classList.remove("messages");
  }, 3000);
}
