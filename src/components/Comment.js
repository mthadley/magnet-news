import Component, {Config} from 'metal-jsx';
import Details from './Details';
import DangerousHTML from './DangerousHTML';

export default class Comment extends Component {
  created() {
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.state.collapsed = !this.state.collapsed;
  }

  render() {
    const {item} = this.props;
    const {collapsed} = this.state;

    return (
      <article class="comment">
        <Details item={item} showComments={false} />

        <button class="collapse" onClick={this.handleClick}>
          {`[${collapsed ? '+' : '-'}]`}
        </button>

        {!collapsed &&
          <div>
            {item.text &&
              <div class="comment-content">
                <DangerousHTML content={item.text} />
              </div>
            }

            <section class="children">
              {!!item.comments.length &&
                item.comments.map(comment => <Comment item={comment} />)
              }
            </section>
          </div>
        }
      </article>
    );
  }
}

Comment.PROPS = {
  item: Config.object().required()
};

Comment.STATE = {
  collapsed: Config.bool().value(false)
};
