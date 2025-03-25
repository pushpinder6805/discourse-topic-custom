import Component from "@glimmer/component";

export default class TopicExcerpt extends Component {
  get excerpt() {
    return this.args.topic?.excerpt;
  }
}
