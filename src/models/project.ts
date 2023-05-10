export enum ProjectStatus {
  Active,
  Finished,
}
export class Project {
  constructor(
    public id: string,
    public userInputs: {
      title: string;
      description: string;
      numberOfPeople: number;
    },
    public status: ProjectStatus
  ) {}
}
