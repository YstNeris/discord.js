'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const { member } = client.actions.GuildMemberRemove.handle(data);
  client.emit(Events.GUILD_MEMBER_REMOVE, member);
};
