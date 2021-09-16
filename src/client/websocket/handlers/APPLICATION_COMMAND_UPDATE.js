'use strict';

const { Events } = require('../../../util/Constants');
const Util = require('../../../util/Util');

module.exports = (client, { d: data }, shard) => {
  let oldCommand;
  let newCommand;
  if (data.guild_id) {
    const guild = Util.getOrCreateGuild(client, data.guild_id, shard.id);
    oldCommand = guild.commands.cache.get(data.id)?._clone();
    if (!oldCommand) {
      oldCommand = guild.commands._add({ id: data.id });
      oldCommand.partial = true;
    }
    newCommand = guild.commands._add(data);
  } else {
    oldCommand = client.application.commands.cache.get(data.id)?._clone();
    if (!oldCommand) {
      oldCommand = client.application.commands._add({ id: data.id });
      oldCommand.partial = true;
    }
    newCommand = client.application.commands._add(data);
  }
  client.emit(Events.APPLICATION_COMMAND_UPDATE, oldCommand, newCommand);
};
