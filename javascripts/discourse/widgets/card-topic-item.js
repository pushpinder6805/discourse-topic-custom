import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { avatarFor } from "discourse/widgets/post";

export default createWidget("card-topic-item", {
  tagName: "div.custom-topic-card",

  html(attrs) {
    const topicUrl = `/t/${attrs.slug}/${attrs.id}`;
    const avatarUrl = avatarFor(attrs.username, attrs.avatar);

    return [
      h("div.profile", [
        h("img.user-avatar", { attributes: { src: avatarUrl } }),
        h("div.user-info", [
          h("strong", attrs.username),
          h("span.date", this.formatDate(attrs.createdAt))
        ])
      ]),
      h("div.topic-content", [
        h("h2.title", [ h("a", { href: topicUrl }, attrs.fancyTitle) ]),
        attrs.excerpt ? h("p.excerpt", attrs.excerpt) : null
      ]),
      h("div.topic-footer", [
        h("div.actions", [
          h("button.fake-like", `❤️ ${attrs.likeCount || 0}`),
          h("a.comment-link", { href: topicUrl }, [
            h("i.fa.fa-comment"), ` ${attrs.replyCount || 0} Comments`
          ])
        ])
      ])
    ];
  },

  formatDate(raw) {
    const date = new Date(raw);
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric"
    }).format(date);
  }
});
