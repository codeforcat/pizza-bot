'use strict';
// 一問一答形式
module.exports = class MameChishiki {
  async begin(bot, event, context){
    await bot.queue({
      type: "text",
      text: "豆知識だよ！ネコが高いところが好きなのは、野生の名残らしいよ。野生のネコは地上の敵から襲われにくく、獲物を狙いやすい木の上で暮らしてたからだよ。お家では、タンスやテーブルの上が指定席なのはそういうこと。キャットタワー置いてあげるといいよ。"
    });
  }

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
      intent_name = "clear-context";
    }
    await bot.switch_skill({
      name: intent_name
    });
  }
};
