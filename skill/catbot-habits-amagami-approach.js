'use strict';

Promise = require('bluebird');

module.exports = class CatbotHabitsAmagamiApproach {
  async begin(bot, event, context){
    await bot.queue({
      type: "text",
      text: "ネコが人を噛んだ場合には、無反応・無視を徹底しましょう。ネコに「噛むと遊んでもらえない」ということを学習させることで、噛みクセがつくのを防ぎましょう。"
    });
  }

  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      how_many: {
        message_to_confirm: {
          type: "template",
          altText: "何匹、飼ってますか？",
          template: {
            type: "buttons",
            text: "何匹、飼ってますか？",
            actions: [
              {
                type: "postback",
                label: "１匹",
                displayText: "１匹",
                data: "one"
              },
              {
                type: "postback",
                label: "２匹",
                displayText: "２匹",
                data: "two"
              },
              {
                type: "postback",
                label: "それ以上（多頭飼い）",
                displayText: "それ以上（多頭飼い）",
                data: "many"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          if (["one", "two", "many"].includes(value.data)) {
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (!error) {
            let data = context.confirmed.how_many.data;
            let message;
            if (data === "one") {
              message = "他のネコ（兄弟）と一緒に育っていないと、噛む力加減が分からない場合があります。";
            } else {
              message = "多頭飼いの場合は、生後１ヶ月半頃から兄弟でのじゃれあいが激しくなり、噛む力加減を覚えます。強く噛みすぎると他の兄弟に怒られるのです。"
            }

            await bot.queue({
              type: "text",
              text: message
            });
          } else {
            await bot.reply({
              type: "text",
              text: "にゃ？\nもう一度言ってほしいにゃ。"
            });
            await bot.init();
          }
        }
      },
      another_q: {
        message_to_confirm: {
          type: "template",
          altText: "ほかのも気になる？",
          template: {
            type: "confirm",
            text: "ほかのも気になる？",
            actions: [
              {
                type: "postback",
                label: "知りたい",
                displayText: "知りたい",
                data: "yes"
              },
              {
                type: "postback",
                label: "もういいよ",
                displayText: "もういいよ",
                data: "no"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          if (["yes", "no"].includes(value.data)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (error){
            await bot.reply({
              type: "text",
              text: "にゃ？\nもう一度言ってほしいにゃ。"
            });
            await bot.init();
          }
        }
      }
    }
  }

  async finish(bot, event, context) {
    await bot.switch_skill({
      name: "catbot-habits-2",
      parameters: {
        return_skill: context.confirmed.another_q.data === "yes" ? "知りたい" : "もういいよ"
      }
    });
  }
};
