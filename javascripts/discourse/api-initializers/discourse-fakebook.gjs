import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-fakebook",

  initialize(container) {
    withPluginApi("1.20.0", (api) => {
      api.modifyClass("component:topic-list-item", {
        didInsertElement() {
          this._super(...arguments);
          this.element.classList.add("fakebook-topic-card");
        },
      });
    });
  },
};