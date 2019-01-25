'use strict';
// 質問に対して選択肢の質問で答える形式
module.exports = class CatbotQuestionMore {

  // コンストラクター。このスキルで必要とする、または指定することができるパラメータを設定します。
  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      answer: {
        message_to_confirm: {
          type: "template",
          altText: "もっと質問あるニャ？",
          template: {
            type: "buttons",
            text: "もっと質問あるニャ？",
            actions: [{
                type: "postback",
                label: "はい",
                data: "はい"
              },
              {
                type: "postback",
                label: "いいえ",
                data: "いいえ"
              }
            ]
          }
        }
      },
    };
  }

  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context) {
    console.log(context.confirmed);
    let intent_name = "catbot-mamechisiki";
    if (context.confirmed.answer.data == "はい") {
      await bot.reply({
        type: "text",
        text: "どんなことが聞きたい？"
      });
    }
    await bot.switch_skill({
      name: intent_name
    });
  }
};
