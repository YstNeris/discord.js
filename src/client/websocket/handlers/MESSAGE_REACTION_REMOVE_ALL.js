'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { message } = client.actions.MessageReactionRemoveAll.handle(data);
  client.emit(Events.MESSAGE_REACTION_REMOVE_ALL, message);
};
