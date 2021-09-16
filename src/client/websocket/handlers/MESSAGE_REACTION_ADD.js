'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { reaction, user } = client.actions.MessageReactionAdd.handle(data);
  client.emit(Events.MESSAGE_REACTION_ADD, reaction, user);
};
