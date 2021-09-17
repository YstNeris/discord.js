'use strict';

const Action = require('./Action');
const Structures = require('../../util/Structures');
const DMChannel = require('../../structures/DMChannel');
const Util = require('../../util/Util');

class ChannelDeleteAction extends Action {
  constructor(client) {
    super(client);
    this.deleted = new Map();
  }

  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    const channel = client.channels.cache.get(data.id) || client.channels._add(data, guild);
    if (channel.messages?.cache.size && !(channel instanceof DMChannel)) {
      for (const message of channel.messages.cache.values()) {
        message.deleted = true;
      }
    }
    channel.deleted = true;
    client.channels._remove(channel.id);
    return { channel };
  }
}

module.exports = ChannelDeleteAction;
