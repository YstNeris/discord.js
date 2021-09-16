'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class StageInstanceDeleteAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    const stageInstance = channel.guild.stageInstances._add(data);
    if (stageInstance) {
      channel.guild.stageInstances.cache.delete(stageInstance.id);
      stageInstance.deleted = true;
    }
    client.emit(Events.STAGE_INSTANCE_DELETE, stageInstance);
    return { stageInstance };
  }
}

module.exports = StageInstanceDeleteAction;
