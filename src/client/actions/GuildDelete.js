'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class GuildDeleteAction extends Action {
  constructor(client) {
    super(client);
    this.deleted = new Map();
  }

  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.id, data.shardId);
    if (data.unavailable) {
      guild.available = false;
      client.emit(Events.GUILD_UNAVAILABLE, guild);
      return { guild: null };
    }
    for (const channel of guild.channels.cache.values()) {
      client.channels._remove(channel.id);
    }
    client.voice.adapters.get(data.id)?.destroy();
    client.guilds.cache.delete(guild.id);
    guild.deleted = true;
    return { guild };
  }
}

module.exports = GuildDeleteAction;
