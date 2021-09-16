'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class GuildChannelsPositionUpdate extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.id, data.shardId);
    if (guild) {
      for (const partialChannel of data.channels) {
        const channel = guild.channels.cache.get(partialChannel.id);
        if (channel) channel.rawPosition = partialChannel.position;
      }
    }
    return { guild };
  }
}

module.exports = GuildChannelsPositionUpdate;
