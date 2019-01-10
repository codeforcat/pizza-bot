"use strict";

const debug = require("debug")("bot-express:skill");

module.exports = class CatbotInputUnknown {
  async finish(bot, event, context){
    const messages = [
      "ごめんね。ちょっとわからなかったにゃ。",
      "にゃ？\n少し言い換えてほしいにゃ。",
      "よくわからないにゃー",
      "にゃ？\nもう一度おねがいするにゃ。"
    ];
    let random_message = Math.floor(Math.random() * messages.length);

    const images = [
      {
        original: "https://www.dropbox.com/s/drjadm9wyrlni5v/17_main.png?dl=1",
        preview: "https://www.dropbox.com/s/slpecn47l04axoc/17_preview.png?dl=1"
      },
      {
        original: "https://www.dropbox.com/s/bllwb8sbyyur1ji/18_main.png?dl=1",
        preview: "https://www.dropbox.com/s/xu7yjaare17xkas/18_preview.png?dl=1"
      },
      {
        original: "https://www.dropbox.com/s/9l8e96hxqkd6c0s/21_main.png?dl=1",
        preview: "https://www.dropbox.com/s/zzwbpbhgh93a2z7/21_preview.png?dl=1"
      }
    ];
    let random_image = Math.floor(Math.random() * images.length);

    await bot.queue({
      type: "text",
      text: messages[random_message]
    });

    await bot.reply({
      type: "image",
      originalContentUrl: images[random_image].original,
      previewImageUrl: images[random_image].preview
    });
  }
};
