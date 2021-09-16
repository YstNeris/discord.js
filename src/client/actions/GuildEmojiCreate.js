'use strict';

const Action = require('./Action');

class GuildEmojiCreateAction extends Action {
  handle(guild, emoji) {
    const created = guild.emojis._add(emoji);
    return { emoji: created };
  }
}

module.exports = GuildEmojiCreateAction;
