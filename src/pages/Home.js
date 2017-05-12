import Component, {Config} from 'metal-jsx';
import {ComponentRegistry} from 'metal-component';
import layout from '../Layout';
import Main from '../components/Main';
import StoriesIndex from '../components/StoriesIndex';
import * as api from '../lib/api';

export const route = {
  method: 'get',
  path: '/'
};

export default class Home extends Component {
  static renderLayout(req, content) {
    return layout(content);
  }

  static async getInitialState(req) {
    const activeType = api.types[req.query.type] || api.types.top;
    const stories = await api.getStories(activeType);

    return {
      stories,
      activeType
    };
  }

  render() {
    return (
      <Main active={this.props.activeType}>
        <StoriesIndex stories={this.props.stories} />
      </Main>
    );
  }
}

Home.PROPS = {
  activeType: Config.string(),
  stories: Config.array().value([])
};

ComponentRegistry.register(Home);
