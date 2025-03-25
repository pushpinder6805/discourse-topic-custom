import { createConnector } from "discourse/widgets/create-connector";
import CardTopicItem from "discourse/widgets/card-topic-item";

export default createConnector("topic-list-item-after", {
  setupComponent(args, component) {
    component.set("cardData", args.attrs);
  },

  html(attrs, state) {
    return this.attach("card-topic-item", attrs);
  },
});
