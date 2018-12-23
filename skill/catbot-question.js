'use strict';
// 一問一答形式
module.exports = class CatbotQuestion {

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
            text: "カリカリ（ドライ）と缶詰パウチ（ウェット）があるけど、ドライが基本かな。\n\nもっと質問あるニャ？",
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
    let text;
    if(context.confirmed.answer.data == "はい"){
      text = "引き続き質問してニャ";
    }else{
      text = "豆知識をランダムに表示";
    }
    let message = {
      type: "text",
      text: text
    };
    await bot.reply(message);
  }
};
