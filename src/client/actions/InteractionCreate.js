'use strict';

const Action = require('./Action');
const ButtonInteraction = require('../../structures/ButtonInteraction');
const CommandInteraction = require('../../structures/CommandInteraction');
const ContextMenuInteraction = require('../../structures/ContextMenuInteraction');
const SelectMenuInteraction = require('../../structures/SelectMenuInteraction');
const { Events, InteractionTypes, MessageComponentTypes, ApplicationCommandTypes } = require('../../util/Constants');

class InteractionCreateAction extends Action {
  handle(data) {
    const client = this.client;
    let InteractionType;
    switch (data.type) {
      case InteractionTypes.APPLICATION_COMMAND: {
        switch (data.data.type) {
          case ApplicationCommandTypes.CHAT_INPUT:
            InteractionType = CommandInteraction;
            break;
          case ApplicationCommandTypes.USER:
          case ApplicationCommandTypes.MESSAGE:
            InteractionType = ContextMenuInteraction;
            break;
          default:
            client.emit(
              Events.DEBUG,
              `[INTERACTION] Received application command interaction with unknown type: ${data.data.type}`,
            );
            return;
        }
        break;
      }
      case InteractionTypes.MESSAGE_COMPONENT: {
        switch (data.data.component_type) {
          case MessageComponentTypes.BUTTON: {
            InteractionType = ButtonInteraction;
            break;
          }
          case MessageComponentTypes.SELECT_MENU:
            InteractionType = SelectMenuInteraction;
            break;
          default: {
            client.emit(
              Events.DEBUG,
              `[INTERACTION] Received component interaction with unknown type: ${data.data.component_type}`,
            );
            return;
          }
        }
        break;
      }
      default: {
        client.emit(Events.DEBUG, `[INTERACTION] Received interaction with unknown type: ${data.type}`);
        return;
      }
    }
    client.emit(Events.INTERACTION_CREATE, new InteractionType(client, data));
  }
}

module.exports = InteractionCreateAction;
