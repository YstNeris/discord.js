'use strict';

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  client.actions.StageInstanceDelete.handle(data);
};
