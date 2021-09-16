'use strict';

const Action = require('./Action');

class GuildEmojiUpdateAction extends Action {
  handle(current, data) {
    const old = current._update(data);
    return {
      old,
      emoji: current,
    };
  }
}

module.exports = GuildEmojiUpdateAction;
