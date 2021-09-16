'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { channel } = client.actions.ChannelCreate.handle(data);
  if (!channel) {
    return;
  }
  client.emit(Events.CHANNEL_CREATE, channel);
};
