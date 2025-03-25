export default (api) => {
    api.registerRawView("topic-likes", (topic) => {
      return {
        template: "topic-likes",
        args: { topic },
      };
    });
  };