'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class GuildBanAdd extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    client.emit(Events.GUILD_BAN_ADD, guild.bans._add(data));
  }
}

module.exports = GuildBanAdd;
