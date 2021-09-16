'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class GuildRoleDeleteAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    let role = guild.roles.cache.get(data.role_id) ?? null;
    if (!role) {
      role = guild.roles._add({ id: data.role_id, permissions: 0 }, false);
      role.partial = true;
    }
    guild.roles.cache.delete(data.role_id);
    role.deleted = true;
    return { role };
  }
}

module.exports = GuildRoleDeleteAction;
