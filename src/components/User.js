import Component, {Config} from 'metal-jsx';
import DangerousHTML from './DangerousHTML';
import moment from 'moment';

export default class User extends Component {
  render() {
    const {user} = this.props;

    return (
      <div class="user">
        <h1>{user.id}</h1>

        <div class="details">
          {`${user.karma} karma | joined ${moment(user.created * 1000).fromNow()}`}
        </div>

        {user.about &&
          <div class="about">
            <DangerousHTML content={user.about} />
          </div>
        }
      </div>
    );
  }
}

User.PROPS = {
  user: Config.object().required()
};
