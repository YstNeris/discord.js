'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { old, updated } = client.actions.GuildRoleUpdate.handle(data);
  client.emit(Events.GUILD_ROLE_UPDATE, old, updated);
};
