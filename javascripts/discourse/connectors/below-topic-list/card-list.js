import { createConnector } from "discourse/widgets/create-connector";

export default createConnector("below-topic-list", {
  html(attrs) {
    return attrs.topics.map((topic) =>
      this.attach("card-topic-item", {
        id: topic.id,
        slug: topic.slug,
        avatar: topic.lastPoster.avatar_template,
        username: topic.lastPoster.username,
        category: topic.category?.name,
        excerpt: topic.excerpt,
        replyCount: topic.reply_count,
        likeCount: topic.like_count,
        createdAt: topic.created_at,
        postId: topic.post_id
      })
    );
  },
});
