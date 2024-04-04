import InAir from "./InAir";

export default class Descending extends InAir {
  onEnter(options: Record<string, any>) {
    super.onEnter(options);
    this.stateName = "Descending";
  }
}
