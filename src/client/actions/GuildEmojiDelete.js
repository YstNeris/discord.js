'use strict';

const Action = require('./Action');

class GuildEmojiDeleteAction extends Action {
  handle(emoji) {
    emoji.guild.emojis.cache.delete(emoji.id);
    emoji.deleted = true;
    return { emoji };
  }
}

module.exports = GuildEmojiDeleteAction;
