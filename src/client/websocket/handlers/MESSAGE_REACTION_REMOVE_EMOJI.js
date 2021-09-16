'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { reaction } = client.actions.MessageReactionRemoveEmoji.handle(data);
  client.emit(Events.MESSAGE_REACTION_REMOVE_EMOJI, reaction);
};
