'use strict';

module.exports = class CatbotHabitsKickApproach {
  async begin(bot, event, context){
    await bot.queue({
      type: "text",
      text: "機嫌の悪いときにされる気がする...そうですね。遊びたいときや不機嫌なときにもネコキックすることがありますので、要注意です。あまりにも痛いときには、付き合わず、そっと離れましょう。"
    });
  }

  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
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
