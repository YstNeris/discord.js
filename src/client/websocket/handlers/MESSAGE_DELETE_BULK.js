'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { messages } = client.actions.MessageDeleteBulk.handle(data);
  client.emit(Events.MESSAGE_BULK_DELETE, messages);
};
