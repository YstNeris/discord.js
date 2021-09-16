'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class GuildRolesPositionUpdate extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.id, data.shardId);
    if (guild) {
      for (const partialRole of data.roles) {
        const role = guild.roles.cache.get(partialRole.id);
        if (role) role.rawPosition = partialRole.position;
      }
    }
    return { guild };
  }
}

module.exports = GuildRolesPositionUpdate;
