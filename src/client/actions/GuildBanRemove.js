'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class GuildBanRemove extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const ban = guild.bans.cache.get(data.user.id) || guild.bans._add(data);
    guild.bans.cache.delete(ban.user.id);
    client.emit(Events.GUILD_BAN_REMOVE, ban);
  }
}

module.exports = GuildBanRemove;
