'use strict';

module.exports = class CatbotHabitsMabatakiOpenEyes {
  async begin(bot, event, context){
    await bot.queue({
      type: "text",
      text: "目を見開いて、じっと見つめてるときは、緊張しているときかもしれませんね。ネコ同士のケンカでも、どちらかが目をそらすまで瞬きはしません。"
    });
  }

  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      notice: {
        message_to_confirm: {
          type: "template",
          altText: "「遊んで視線」に気づいたことありませんか？",
          template: {
            type: "buttons",
            text: "「遊んで視線」に気づいたことありませんか？",
            actions: [
              {
                type: "postback",
                label: "YES",
                displayText: "YES",
                data: "yes-no"
              },
              {
                type: "postback",
                label: "NO",
                displayText: "NO",
                data: "yes-no"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          if (["yes-no"].includes(value.data)){
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
    await bot.send(context.event.source.userId, {
      type: "text",
      text: "ネコの「遊んで視線」に気づけないで、ほったらかしだと、読んでる新聞や雑誌の上に乗ってくる、パソコンのキーボードの上に座るなど、実力行使を受けることになるので、普段からよくコミュニケーションしておきましょうね。"
    });

    await bot.switch_skill({
      name: "catbot-habits-2"
    });
  }
};
