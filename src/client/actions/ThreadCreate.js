'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class ThreadCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const thread = client.channels._add(data, guild);
    client.emit(Events.THREAD_CREATE, thread);
    return { thread };
  }
}

module.exports = ThreadCreateAction;
