'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { role } = client.actions.GuildRoleDelete.handle(data);
  client.emit(Events.GUILD_ROLE_DELETE, role);
};
