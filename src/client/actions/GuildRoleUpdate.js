'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class GuildRoleUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    let role = guild.roles.cache.get(data.role.id) ?? null;
    let old = null;
    if (role) {
      old = role._update(data.role);
    } else {
      role = guild.roles._add(data.role);
      old = guild.roles._add({ id: data.role.id, permissions: 0 }, false);
      old.partial = true;
    }
    return {
      old,
      updated: role,
    };
  }
}

module.exports = GuildRoleUpdateAction;
