'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { old, updated } = client.actions.ChannelUpdate.handle(data);
  if (!updated) {
    return;
  }
  client.emit(Events.CHANNEL_UPDATE, old, updated);
};
