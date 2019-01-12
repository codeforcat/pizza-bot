'use strict';
// 一問一答形式
module.exports = class ToiletWhyMulti {

  // コンストラクター。このスキルで必要とする、または指定することができるパラメータを設定します。
  constructor() {
    this.required_parameter = {
      another_q2: {
        message_to_confirm: {
          type: "template",
          altText: "他にも気になることある？",
          template: {
            type: "buttons",
            text: "他にも気になることある？",
            actions: [
              {
                type: "postback",
                label: "トイレはどうしたらいいの？",
                text: "トイレはどうしたらいいの？",
                data: "toilet-how-many-get"
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
        }
        // reaction: async (error, value, bot, event, context) => {
        //   let intent_name = context.confirmed.another_q2.data;
        //   console.log("***何故複数***********intent_name ********: " + intent_name);
        //   bot.switch_skill({
        //     name: intent_name
        //   })
        // }
      }
    }
    this.clear_context_on_finish = true;
  }
  async begin(bot, event, context){
      bot.queue({
          type: "text",
          text: "あなたの留守中や夜間などお掃除できないことがありますよね。そんなときでも、清潔なトイレを利用できるように、複数設置してあげてください。"
      });
  }
  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context) {
    let intent_name = context.confirmed.another_q2.data;
    console.log("*******ToiletWhyMulti*******intent_name ********: "+intent_name);
    bot.switch_skill({
        name: intent_name
    })

  }
};
