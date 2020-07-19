import crypto from 'crypto';

export const validPassword = (password, hash, salt) => {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

export const genPassword = (password) => {
  var salt = crypto.randomBytes(32).toString('hex');
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: genHash
  };
}

export const paginateResults = ({ after: cursor, pageSize = 20, results, getCursor = () => null }) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    let itemCursor = item.cursor ? item.cursor : getCursor(item);
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1
      ? []
      : results.slice(
        cursorIndex + 1,
        Math.min(results.length, cursorIndex + 1 + pageSize),
      )
    : results.slice(0, pageSize);
};

