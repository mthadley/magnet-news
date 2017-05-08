import Component, {Config} from 'metal-jsx';
import * as api from '../lib/api';

export default class Main extends Component {
  render() {
    return (
      <div class="main-layout">
        <header>
          <nav>
            <a class="title" href="/">{'Magnet News'}</a>

            <ul>
              {Object.keys(api.types).map(key =>
                <li class={this.props.active === key ? 'active' : ''} key={key}>
                  <a href={`/?type=${key}`}>{key}</a>
                </li>
              )}
            </ul>
          </nav>
        </header>

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

Main.PROPS = {
  active: Config.string()
};
