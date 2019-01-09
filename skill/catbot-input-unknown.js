"use strict";

const debug = require("debug")("bot-express:skill");

module.exports = class CatbotInputUnknown {

  async finish(bot, event, context){
    await bot.queue({
      type: "text",
      text: "ごめんね。ちょっとわからなかったにゃ。\n少し言い換えてほしいにゃ。"
    });
    await bot.reply({
      type: "image",
      originalContentUrl: "https://www.dropbox.com/s/drjadm9wyrlni5v/17_main.png?dl=1",
      previewImageUrl: "https://www.dropbox.com/s/slpecn47l04axoc/17_preview.png?dl=1"
    });
  }
};
