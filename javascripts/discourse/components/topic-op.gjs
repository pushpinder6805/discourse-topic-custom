import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class TopicOp extends Component {
  @tracked poster = this.args.poster;
}