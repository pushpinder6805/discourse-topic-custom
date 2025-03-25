import Component from "@glimmer/component";

export default class TopicLikes extends Component {
  get likeCount() {
    return this.args.topic?.like_count || 0;
  }
}
