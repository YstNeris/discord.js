'use strict';

const { Events, Status } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  let guild = client.guilds.cache.get(data.id);
  if (guild) {
    if (!guild.available && !data.unavailable) {
      guild._patch(data);
    }
  } else {
    guild = client.guilds._add(data);
    if (shard.status === Status.READY) {
      client.emit(Events.GUILD_CREATE, guild);
    }
  }
};
