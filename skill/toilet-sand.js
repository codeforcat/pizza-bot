'use strict';
// 一問一答形式
module.exports = class ToiletSand {
  async begin(bot, event, context){
      bot.queue({
          type: "text",
          text: "一般的には、自然の砂に近い「鉱物系」を好む傾向があるようだけど、いろいろ試してみて、猫に合うものを選んであげてね。"
      });
  }

  // コンストラクター。このスキルで必要とする、または指定することができるパラメータを設定します。
  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      another_q: {
        message_to_confirm: {
          type: "template",
          altText: "他にも気になることある？",
          template: {
            type: "buttons",
            text: "他にも気になることある？",
            actions: [
              {
                type: "postback",
                label: "どこに置いたらいい？",
                text: "どこに置いたらいい？",
                data: "toilet-where"
              },
              {
                type: "postback",
                label: "どんな種類があるの？",
                text: "どんな種類があるの？",
                data: "toilet-sand-type"
              }
            ]
          }
        }
      }
    }
  }
  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context) {
    let intent_name = context.confirmed.another_q.data;
    console.log("**************intent_name ********: "+intent_name);
    bot.switch_skill({
        name: intent_name
    })

  }
};
