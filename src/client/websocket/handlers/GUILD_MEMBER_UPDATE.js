'use strict';

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  client.actions.GuildMemberUpdate.handle(data);
};
