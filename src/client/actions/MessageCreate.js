'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class MessageCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    channel.lastMessageId = data.id;
    const message = channel.messages._add(data);
    return { message };
  }
}

module.exports = MessageCreateAction;
