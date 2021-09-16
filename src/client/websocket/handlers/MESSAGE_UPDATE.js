'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { old, updated } = client.actions.MessageUpdate.handle(data);
  client.emit(Events.MESSAGE_UPDATE, old, updated);
};
