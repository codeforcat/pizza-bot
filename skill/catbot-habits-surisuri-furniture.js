"use strict";

const debug = require("debug")("bot-express:skill");

module.exports = class CatbotHabitsSurisuriFurniture {
  constructor(){
    this.clear_context_on_finish = true;
  }

  async finish(bot, event, context){
    await bot.reply({
      type: "text",
      text: "ネコは身の回りにあるものすべてを、自分の知ってるにおいにしたいので、その意味では、家具も人も同列ですね。"
    })
  }
};
