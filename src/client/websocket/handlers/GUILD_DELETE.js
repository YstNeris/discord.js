'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { guild } = client.actions.GuildDelete.handle(data);
  if (!guild) {
    return;
  }
  client.emit(Events.GUILD_DELETE, guild);
};
