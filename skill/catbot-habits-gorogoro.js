"use strict";

const debug = require("debug")("bot-express:skill");

module.exports = class CatbotHabitsGorogoro {

  async finish(bot, event, context){
    await bot.reply({
      type: "text",
      text: "音の大小とネコの気持ちは関係ないみたいだよ。小さいゴロゴロのネコもいるから耳をすまして聴いてあげよう。"
    })
  }
};
