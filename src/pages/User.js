import * as api from '../lib/api';
import Component, {Config} from 'metal-jsx';
import layout from '../layout';
import Main from '../components/Main';
import {ComponentRegistry} from 'metal-component';
import {default as UserView} from '../components/User';

export const route = {
    method: 'get',
    path: '/user/:id'
};

export default class User extends Component {
  static renderLayout(req, content) {
    return layout(content);
  }

  static async getInitialState(req) {
    const user = await api.getUser(req.params.id);

    return {
      user
    };
  }

  render() {
    const {user} = this.props;

    return (
      <Main>
        {user &&
            <UserView user={user} />
        }

        {!user &&
          <p>{'There doesn\'t seem to be anything here...'}</p>
        }
      </Main>
    );
  }
}

User.PROPS = {
  user: Config.object()
};

ComponentRegistry.register(User);
