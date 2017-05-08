import Comment from './Comment';
import Component, {Config} from 'metal-jsx';
import DangerousHTML from './DangerousHTML';
import Details from './Details';

export default class Item extends Component {
  render() {
    const {comments, item} = this.props;

    return (
      <div class="item-view">
        <article>
          <a href={item.url}>
            <h3>{item.title}</h3>
          </a>

          <Details elementClasses="item-details" item={item} showComments={false} />

          {item.text &&
            <div class="text-content">
              <DangerousHTML content={item.text} />
            </div>
          }
        </article>

        {comments && !!comments.length &&
          <section>
            <h4 class="comments-count">{`${item.descendants} comments`}</h4>

            {comments.map(comment => <Comment item={comment} />)}
          </section>
        }
      </div>
    );
  }
}

Item.PROPS = {
  comments: Config.arrayOf(Config.object()),
  item: Config.object().required()
};
