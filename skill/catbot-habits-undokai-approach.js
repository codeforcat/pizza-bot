'use strict';

module.exports = class CatbotHabitsUndokaiApproach {
  async begin(bot, event, context){
    await bot.queue({
      type: "text",
      text: "寝る前に、しっかり遊ばせることで、飼い主もネコもぐっすり眠れるでしょう。"
    });
  }

  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      drop: {
        message_to_confirm: {
          type: "template",
          altText: "そう言えば、ネコに机の上のものを落とされたことないですか？",
          template: {
            type: "buttons",
            text: "そう言えば、ネコに机の上のものを落とされたことないですか？",
            actions: [
              {
                type: "postback",
                label: "ある",
                displayText: "ある",
                data: "yes-no"
              },
              {
                type: "postback",
                label: "ない",
                displayText: "ない",
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
      text: "なぜ、机の上のものを落とすか、それは楽しいからです。\n落とすものによって、その様子は様々、ネコは獲物を想起させるものが好きなので、落下の動きが楽しいのです。また、モノを落とすと飼い主さんが来たり、声を出したりするので、その反応も楽しんでいます。ネコがモノを落とすことを防ぐのは無理なので、落とされたら困るものを置かないようにする、これしかありません。"
    });

    await bot.switch_skill({
      name: "catbot-habits-2"
    });
  }
};
