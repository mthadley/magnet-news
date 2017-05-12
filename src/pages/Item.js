import * as api from '../lib/api';
import Component, {Config} from 'metal-jsx';
import layout from '../Layout';
import Main from '../components/Main';
import {ComponentRegistry} from 'metal-component';
import {default as ItemView} from '../components/Item';

export const route = {
  method: 'get',
  path: '/item/:id'
};

export default class Item extends Component {
  static renderLayout(req, content) {
    return layout(content);
  }

  static async getInitialState(req) {
    const item = await api.getItem(req.params.id);

    let comments = [];
    if (item) {
      comments = await api.getComments(item.kids);
    }

    return {
      comments,
      item
    };
  }

  render() {
    const {comments, item} = this.props;

    return (
      <Main>
        {item &&
            <ItemView comments={comments} item={item} />
        }

        {!item &&
          <p>{'There doesn\'t seem to be anything here...'}</p>
        }
      </Main>
    );
  }
}

Item.PROPS = {
  comments: Config.arrayOf(Config.object),
  item: Config.object()
};

ComponentRegistry.register(Item);
