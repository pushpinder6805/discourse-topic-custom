import RawHtml from "discourse/widgets/raw-html";

export default (api) => {
  api.registerRawView("topic-op", (topic) => {
    return {
      template: "topic-op",
      args: {
        poster: topic.lastPoster,
      },
    };
  });
};