'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class ChannelCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    const channel = client.channels._add(data, guild);
    return { channel };
  }
}

module.exports = ChannelCreateAction;
