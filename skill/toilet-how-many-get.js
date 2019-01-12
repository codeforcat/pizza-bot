'use strict';
// 一問一答形式
module.exports = class ToiletHowManyGet {
  async begin(bot, event, context) {
    bot.queue({
      type: "text",
      text: "複数設置が基本です。ネコの数より1つ多く置いてあげてね。1匹なら2個、2匹なら3個という具合です。"
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
            actions: [{
                type: "postback",
                label: "どうして、複数いるの？",
                text: "どうして、複数いるの？",
                data: "toilet-why-multi"
              },
              {
                type: "postback",
                label: "トイレ、いろんな種類があるけど？",
                text: "トイレ、いろんな種類があるけど？",
                data: "toilet-types"
              },
              // {
              //   type: "postback",
              //   label: "どこに置いたらいい？",
              //   text: "どこに置いたらいい？",
              //   data: "toilet-where"
              // },
              // {
              //   type: "postback",
              //   label: "猫砂は、何がいい？",
              //   text: "猫砂は、何がいい？",
              //   data: "toilet-sand"
              // }
            ]
          }
        },
        // reaction: async (error, value, bot, event, context) => {
        //   let intent_name = context.confirmed.another_q.data;
        //   console.log("*****といれどう*********intent_name ********: " + intent_name);
        //   bot.switch_skill({
        //     name: intent_name,
        //     parameters: {
        //         pizza: "マルゲリータ"
        //     }
        //   })
        // }

      }
    }
  }
  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context) {
    let intent_name = context.confirmed.another_q.data;
    console.log("**************intent_name ********: " + intent_name);
    bot.switch_skill({
      name: intent_name
    })

  }
};
