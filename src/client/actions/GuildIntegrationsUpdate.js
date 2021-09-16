'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class GuildIntegrationsUpdate extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    client.emit(Events.GUILD_INTEGRATIONS_UPDATE, guild);
  }
}

module.exports = GuildIntegrationsUpdate;
