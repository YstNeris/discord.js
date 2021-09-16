'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class GuildRoleCreate extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const role = guild.roles._add(data.role);
    return { role };
  }
}

module.exports = GuildRoleCreate;
