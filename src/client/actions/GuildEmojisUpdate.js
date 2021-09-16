'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class GuildEmojisUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const deletions = new Map(guild.emojis.cache);
    for (const emoji of data.emojis) {
      const cached = guild.emojis.cache.get(emoji.id);
      if (cached) {
        deletions.delete(emoji.id);
        if (!cached.equals(emoji)) {
          const result = client.actions.GuildEmojiUpdate.handle(cached, emoji);
          client.emit(Events.GUILD_EMOJI_UPDATE, result.old, result.emoji);
        }
      } else {
        const result = client.actions.GuildEmojiCreate.handle(guild, emoji);
        client.emit(Events.GUILD_EMOJI_CREATE, result.emoji);
      }
    }
    for (const deleted of deletions.values()) {
      const result = client.actions.GuildEmojiDelete.handle(deleted);
      client.emit(Events.GUILD_EMOJI_DELETE, result.emoji);
    }
  }
}

module.exports = GuildEmojisUpdateAction;
