import Component, {Config} from 'metal-jsx';

export default class DangerousHTML extends Component {
  render() {
    const node = IncrementalDOM.elementOpen('div', null, null);
    IncrementalDOM.elementClose('div');

    node.innerHTML = this.props.content;

    return node;
  }
}

DangerousHTML.PROPS = {
  content: Config.string().required()
};
