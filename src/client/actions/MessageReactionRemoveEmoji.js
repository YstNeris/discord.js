'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class MessageReactionRemoveEmoji extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    const message = Util.getOrCreateMessage(channel, data.message_id);
    let reaction = message.reactions.cache.get(data.emoji.id ?? decodeURIComponent(data.emoji.name));
    if (!reaction) {
      reaction = message.reactions._add(
        {
          emoji: data.emoji,
          count: null,
          me: null,
        },
        false,
      );
    }
    if (!message.partial) {
      message.reactions.cache.delete(reaction.emoji.id ?? reaction.emoji.name);
    }
    return { reaction };
  }
}

module.exports = MessageReactionRemoveEmoji;
