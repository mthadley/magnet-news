import firebase from 'firebase';

firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com'
});

const db = firebase
  .database()
  .ref('v0');

/**
 * Story Types
 */
export const types = {
  ask: 'ask',
  best: 'best',
  job: 'job',
  new: 'new',
  show: 'show',
  top: 'top'
};

/**
 * Requests stories for a particular category.
 * @param {!string} type
 * @return {!Promise.<Array.<Item>>}
 */
export async function getStories(type) {
  const ids = await db
    .child(type + 'stories')
    .once('value');

  return Promise.all(ids
    .val()
    .slice(0, 20)
    .map(getItem));
}

/**
 * Requests a single item.
 * @param {!number} id
 * @return {!Promise.<Item>}
 */
export async function getItem(id) {
  const item = await db
    .child('item')
    .child(id)
    .once('value');

  return item.val();
}

/**
 * Requests an item and it's comments.
 * @param {!Array.<number>} ids
 * @return {!Promise.<Item>}
 */
export async function getComments(ids) {
  return Promise.all(ids.map(async id => {
    const item = await getItem(id);

    if (item) {
      item.comments = await getComments(item.kids || []);
    }

    return item;
  }));
}

/**
 * Requests a user.
 * @param {!string} id
 * @return {!Promise.<User>}
 */
export async function getUser(id) {
  const user = await db
    .child('user')
    .child(id)
    .once('value');

  return user.val();
}

/**
 * Gets the link to the item
 * @param {!Item}
 * @return {!string}
 */
export function itemURL(item) {
  return `/item/${item.id}`;
}
