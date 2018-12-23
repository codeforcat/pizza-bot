"use strict";

const debug = require("debug")("bot-express:skill");

module.exports = class TemplateButtons {

  constructor() {
    this.required_parameter = {
      line_template_button_message: {
        message_to_confirm: {
          type: "template",
          altText: "ご注文のピザをお選びください。",
          template: {
            type: "buttons",
            text: "ご注文のピザをお選びください。",
            actions: [
              {type:"message",label:"マルゲリータ",text:"マルゲリータ"},
              {type:"message",label:"マリナーラ",text:"マリナーラ"},
              {type:"message",label:"カプリチョーザ",text:"カプリチョーザ"},
              {type:"message",label:"クワトロフォルマッジ",text:"クワトロフォルマッジ"}
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          if (["マルゲリータ", "マリナーラ", "カプリチョーザ", "クワトロフォルマッジ"].includes(value)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (error){
            bot.change_message_to_confirm("line_template_button_message", {
              type: "text",
              text: "恐れ入ります。ご注文のピザをお選びください。",
            });
          } else {
            bot.queue({
              type: "text",
              text: `${value}ですね。ありがとうございます。`
            });
          }
        }
      }
    };

    this.clear_context_on_finish = true;
  }

  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context){
    let message = {
      type: "text",
      text: "完了"
    };
    await bot.reply(message);
  }
};
