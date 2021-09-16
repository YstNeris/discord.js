'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class WebhooksUpdate extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    client.emit(Events.WEBHOOKS_UPDATE, channel);
  }
}

module.exports = WebhooksUpdate;
