'use strict';

const { Events } = require('../../../util/Constants');
const Util = require('../../../util/Util');

module.exports = (client, { d: data }, shard) => {
  let command;
  if (data.guild_id) {
    const guild = Util.getOrCreateGuild(client, data.guild_id, shard.id);
    command = guild.commands._add(data);
  } else {
    command = client.application.commands._add(data);
  }
  client.emit(Events.APPLICATION_COMMAND_CREATE, command);
};
