'use strict';

const { Events } = require('../../../util/Constants');

module.exports = (client, { d: data }) => {
  const { old, updated } = client.actions.UserUpdate.handle(data);
  client.emit(Events.USER_UPDATE, old, updated);
};
