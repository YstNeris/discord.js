'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class MessageReactionRemove extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    let user = client.users.cache.get(data.user_id);
    if (!user) {
      user = client.users._add({ id: data.user_id }, false); // has built in partial
    }
    const message = Util.getOrCreateMessage(channel, data.message_id);
    let reaction = message.reactions.cache.get(data.emoji.id ?? decodeURIComponent(data.emoji.name));
    if (!reaction) {
      reaction = message.reactions._add(
        {
          emoji: data.emoji,
          count: null,
          me: user.id === client.user.id,
        },
        false,
      );
    }
    reaction._remove(user);
    return {
      message,
      reaction,
      user,
    };
  }
}

module.exports = MessageReactionRemove;
