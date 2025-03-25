import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";

export default {
  transform(topic) {
    return {
      id: topic.id,
      fancyTitle: topic.fancyTitle,
      slug: topic.slug,
      avatar: topic.lastPoster.avatar_template,
      username: topic.lastPoster.username,
      category: topic.category.name,
      excerpt: topic.excerpt,
      replyCount: topic.reply_count,
      likeCount: topic.like_count,
      createdAt: topic.created_at,
      postId: topic.post_id,
    };
  },
};
