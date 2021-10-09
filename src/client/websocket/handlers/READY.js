'use strict';

const ClientApplication = require('../../../structures/ClientApplication');
const { Events } = require('../../../util/Constants');
const ClientUser = require('../../../structures/ClientUser');

module.exports = (client, { d: data }, shard) => {
  if (client.user) {
    client.user._patch(data.user);
  } else {
    client.user = new ClientUser(client, data.user);
    client.users.cache.set(client.user.id, client.user);
  }
  for (const guild of data.guilds) {
    guild.shardId = shard.id;
    client.guilds._add(guild);
  }
  if (client.application) {
    client.application._patch(data.application);
  } else {
    client.application = new ClientApplication(client, data.application);
  }
  client.emit(Events.SHARD_CONNECT, shard.id, data.guilds);
  shard.checkReady();
};
