"use strict";

const debug = require("debug")("bot-express:skill");

module.exports = class CatbotHabitsSurisuriOtherCat {
  constructor(){
    this.clear_context_on_finish = true;
  }

  async finish(bot, event, context){
    await bot.reply({
      type: "text",
      text: "お互い安心するための、においの交換みたいなもんですね。"
    })
  }
};
