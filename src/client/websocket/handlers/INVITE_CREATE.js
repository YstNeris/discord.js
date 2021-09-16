'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { invite } = client.actions.InviteCreate.handle(data);
  client.emit(Events.INVITE_CREATE, invite);
};
