import Component, {Config} from 'metal-jsx';
import Details from './Details';
import {itemURL} from '../lib/api';

export default class StoriesIndex extends Component {
  render() {
    return (
      <div class="stories-index">
        <ul>
          {this.props.stories.map((item, index) =>
            <li class="item" key={item.id}>
              <div class="rank">{index + 1}</div>

              <article>
                <header class="title">
                  <a href={item.url || itemURL(item)}>
                    {item.title}
                  </a>
                </header>

                <Details item={item} />
              </article>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

StoriesIndex.PROPS = {
  stories: Config.arrayOf(Config.object()).value([])
};
