'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class MessageReactionAdd extends Action {
  handle(data) {
    const client = this.client;
    let channel = data.channel;
    if (!channel) {
      const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
      channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    }
    let user = data.user || client.users.cache.get(data.user_id);
    if (!user) {
      if (data.member?.user) {
        user = client.users._add(data.member.user);
      } else {
        user = client.users._add({ id: data.user_id }, false); // has built in partial
      }
    }
    const message = data.message || Util.getOrCreateMessage(channel, data.message_id);
    const reaction =
      message.reactions.cache.get(data.emoji.id ?? decodeURIComponent(data.emoji.name)) ||
      message.reactions._add({
        emoji: data.emoji,
        count: message.partial ? null : 0,
        me: user.id === client.user.id,
      });
    reaction._add(user);
    return {
      reaction,
      user,
    };
  }
}

module.exports = MessageReactionAdd;
