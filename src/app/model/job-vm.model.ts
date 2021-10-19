export class JobVM {

  constructor(public id?: number,
              public jobName?: string,
              public selected?: boolean) {
    this.selected = false;
  }
}
