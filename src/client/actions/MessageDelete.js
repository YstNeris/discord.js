'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class MessageDeleteAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    const message = Util.getOrCreateMessage(channel, data.id);
    channel.messages.cache.delete(message.id);
    message.deleted = true;
    return { message };
  }
}

module.exports = MessageDeleteAction;
