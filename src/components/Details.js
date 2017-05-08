import Component, {Config} from 'metal-jsx';
import moment from 'moment';
import {itemURL} from '../lib/api';

export default class Details extends Component {
  render() {
    const {item, showComments} = this.props;

    return (
      <span class="details">
        {!!item.score && `${item.score} points, `}

        {'by '}<a href={`/user/${item.by}`}>{item.by}</a>

        {` | ${moment(item.time * 1000).fromNow()}`}

        {showComments && !!item.descendants &&
          <span>
            {' | '}<a href={itemURL(item)}>{`${item.descendants} comments`}</a>
          </span>
        }
      </span>
    );
  }
}

Details.PROPS = {
  item: Config.object().required(),
  showComments: Config.bool().value(true)
};
