import { apiInitializer } from "discourse/lib/api";
import hbs from "discourse/widgets/hbs-compiler";

export default apiInitializer("1.34", (api) => {
  api.registerValueTransformer("topic-list-columns", () => {
    return [
      {
        id: "topic-card",
        header: null, // no header cell
        item: {
          name: "topic-card-item",
          template: hbs`
            <td class="custom-topic-card" colspan="100">
              <div class="topic-card-wrapper">
                <div class="card-header">
                  <div class="user-meta">
                    <img class="avatar" src="{{@topic.creator.avatar_template_url}}" alt="{{@topic.creator.username}}">
                    <div class="user-info">
                      <strong>{{@topic.creator.username}}</strong>
                      <span class="date">{{format-date @topic.created_at "tiny"}}</span>
                      <span class="category">Posted in {{@topic.category.name}}</span>
                    </div>
                  </div>
                  <div class="top-right-icons">
                    <DButton class="bookmark-btn" @icon="bookmark" @action={{fn this.bookmarkTopic @topic}} />
                    <DButton class="menu-btn" @icon="ellipsis" />
                  </div>
                </div>

                <div class="card-body">
                  <h2 class="card-title">
                    <LinkTo @route="topic" @model={{@topic.id}}>{{@topic.title}}</LinkTo>
                  </h2>
                  <div class="card-excerpt">
                    {{html-safe @topic.excerpt}}
                  </div>
                </div>

                <div class="card-footer">
                  <div class="reactions">
                    <DButton
                      class="like-btn"
                      @icon={{if @topic.liked "heart" "heart"}}
                      @label={{if @topic.liked "Liked" ""}}
                      @action={{fn this.toggleLike @topic}}
                    />
                    <LinkTo @route="topic" @model={{@topic.id}} class="comment-btn">
                      <i class="fa-regular fa-comment"></i>
                      {{@topic.reply_count}} comments
                    </LinkTo>
                  </div>
                </div>

                <div class="inline-reply">
                  <img class="avatar" src="{{@currentUser.avatar_template}}" alt="Me">
                  <textarea placeholder="What are your thoughts?" class="quick-reply"></textarea>
                  <div class="reply-toolbar">
                    <i class="fa-solid fa-link"></i>
                    <i class="fa-solid fa-paperclip"></i>
                    <i class="fa-regular fa-image"></i>
                    <i class="fa-regular fa-face-smile"></i>
                    <button class="post-reply-btn">POST</button>
                  </div>
                </div>
              </div>
            </td>
          `,
          component: {
            toggleLike(topic) {
              const likeAction = topic.liked ? topic.unlike() : topic.like();
              likeAction.then(() => topic.appEvents.trigger("refresh:likes"));
            },
            bookmarkTopic(topic) {
              topic.toggleBookmark();
            },
          },
        },
      },
    ];
  });
});
