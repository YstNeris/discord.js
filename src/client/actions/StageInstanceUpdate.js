'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class StageInstanceUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    let oldStageInstance = channel.guild.stageInstances.cache.get(data.id)?._clone();
    if (!oldStageInstance) {
      oldStageInstance = channel.guild.stageInstances._add({ id: data.id }, false);
      oldStageInstance.partial = true;
    }
    const newStageInstance = channel.guild.stageInstances._add(data);
    client.emit(Events.STAGE_INSTANCE_UPDATE, oldStageInstance, newStageInstance);
    return {
      oldStageInstance,
      newStageInstance,
    };
  }
}

module.exports = StageInstanceUpdateAction;
