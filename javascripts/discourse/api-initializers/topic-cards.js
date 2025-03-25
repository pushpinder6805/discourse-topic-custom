// /common/javascripts/discourse/api-initializers/topic-cards.js

import { apiInitializer } from "discourse/lib/api";
import { createWidget } from "discourse/widgets/widget";

export default apiInitializer("1.34", (api) => {
  // Create the card widget for topic rows
  createWidget("custom-topic-card", {
    tagName: "div.card-wrapper",

    html(attrs) {
      const topic = attrs.topic;
      const creator = topic.creator || {};

      return [
        this.attach("card-header", { topic, creator }),
        this.attach("card-body", { topic }),
        this.attach("card-footer", { topic }),
      ];
    },
  });

  // Header section
  createWidget("card-header", {
    tagName: "div.card-header",
    html({ topic, creator }) {
      return [
        h("div.user-meta", [
          h("img.avatar", {
            attributes: {
              src: creator.avatar_template.replace("{size}", "40"),
              alt: creator.username,
            },
          }),
          h("div.user-info", [
            h("strong", creator.username),
            h("span.date", moment(topic.created_at).fromNow()),
            h("span.category", `Posted in ${topic.category_name}`),
          ]),
        ]),
        h("div.top-right-icons", [
          this.attach("button", { icon: "bookmark", action: "bookmark" }),
          this.attach("button", { icon: "ellipsis" }),
        ]),
      ];
    },
  });

  // Body
  createWidget("card-body", {
    tagName: "div.card-body",
    html({ topic }) {
      return [
        h("h2.card-title", this.attach("link", { href: `/t/${topic.slug}/${topic.id}`, text: topic.fancy_title })),
        h("p.card-excerpt", topic.excerpt || "No excerpt"),
      ];
    },
  });

  // Footer
  createWidget("card-footer", {
    tagName: "div.card-footer",
    html({ topic }) {
      return h("div.reactions", [
        this.attach("button", { icon: "heart", action: () => this.toggleLike(topic) }),
        this.attach("link", {
          href: `/t/${topic.slug}/${topic.id}`,
          html: h("i.fa-regular.fa-comment"),
        }),
        h("span.comment-count", `${topic.reply_count || 0} comments`),
      ]);
    },

    toggleLike(topic) {
      const likeAction = topic.liked ? topic.unlike() : topic.like();
      likeAction.then(() => topic.appEvents.trigger("refresh:likes"));
    },
  });

  // Value transformer: replace entire topic row with the custom card
  api.registerValueTransformer("topic-list-columns", () => [
    {
      id: "topic-card",
      header: null,
      item: {
        name: "custom-topic-card",
      },
    },
  ]);
});
