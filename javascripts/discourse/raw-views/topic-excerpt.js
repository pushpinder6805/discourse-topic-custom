export default (api) => {
    api.registerRawView("topic-excerpt", (topic) => {
      return {
        template: "topic-excerpt",
        args: { topic },
      };
    });
  };