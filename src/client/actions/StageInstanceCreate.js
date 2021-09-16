'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class StageInstanceCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    const stageInstance = channel.guild.stageInstances._add(data);
    client.emit(Events.STAGE_INSTANCE_CREATE, stageInstance);
    return { stageInstance };
  }
}

module.exports = StageInstanceCreateAction;
