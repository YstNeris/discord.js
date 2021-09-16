'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { invite } = client.actions.InviteDelete.handle(data);
  client.emit(Events.INVITE_DELETE, invite);
};
