import { createConnector } from "discourse/widgets/create-connector";

export default createConnector("below-topic-list", {
  html(attrs) {
    return [
      this.h("h1", "🚀 Below-topic-list connector is working!"),
      this.h("p", `Topics visible: ${attrs.topics?.length}`)
    ];
  }
});
