'use strict';

const { Events } = require('../../../util/Constants');
const Util = require('../../../util/Util');

module.exports = (client, { d: data }, shard) => {
  let command;
  if (data.guild_id) {
    const guild = Util.getOrCreateGuild(client, data.guild_id, shard.id);
    command = guild.commands._add(data);
    guild.commands.cache.delete(data.id);
  } else {
    command = client.application.commands._add(data);
    client.application.commands.cache.delete(data.id);
  }
  client.emit(Events.APPLICATION_COMMAND_DELETE, command);
};
