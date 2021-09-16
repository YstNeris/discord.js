'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { old, updated } = client.actions.GuildUpdate.handle(data);
  client.emit(Events.GUILD_UPDATE, old, updated);
};
