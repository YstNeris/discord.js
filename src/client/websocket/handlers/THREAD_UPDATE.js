'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }) => {
  const { old, updated } = client.actions.ChannelUpdate.handle(data);
  client.emit(Events.THREAD_UPDATE, old, updated);
};
