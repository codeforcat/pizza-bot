"use strict";

module.exports = class CatbotWelcome {
  async begin(bot, event, context) {
    await bot.queue({
      type: "image",
      originalContentUrl: "https://code4cat.org/catbot/catbot-05_original.jpg",
      previewImageUrl: "https://code4cat.org/catbot/catbot-05_preview.jpg"
    });
    await bot.queue({
      type: "text",
      text: "やあ！こんにちは！"
    });
  }

  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      opening: {
        message_to_confirm: {
          type: "template",
          altText: "何か気になることある？",
          template: {
            type: "buttons",
            text: "何か気になることある？",
            actions: [{
                type: "postback",
                label: "トイレについて",
                displayText: "トイレについて",
                data: "toilet-how-many-get"
              },
              {
                type: "postback",
                label: "しぐさについて",
                displayText: "しぐさについて",
                data: "catbot-habits-1"
              }
              ,
              {
                type: "postback",
                label: "習性について",
                displayText: "習性について",
                data: "catbot-habits-2"
              }
            ]
          }
        }
      }
    }
  }

  async finish(bot, event, context) {
    let intent_name = context.confirmed.opening.data;
    await bot.switch_skill({
      name: intent_name
    })
  }
};
