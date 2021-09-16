'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, _, shard) => {
  const replayed = shard.sequence - shard.closeSequence;
  client.emit(Events.SHARD_RESUME, shard.id, replayed);
};
