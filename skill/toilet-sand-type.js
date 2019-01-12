'use strict';
// 一問一答形式
module.exports = class ToiletSandType {
  async begin(bot, event, context){
      bot.queue({
          type: "text",
          text: "素材で分けると、鉱物系の他に、木材系、おから系、紙系があります。機能では、そのままトイレに流せるもの、尿がかかると色がかわるもの、消臭成分が含まれているものなどがあります。"
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
                label: "トイレ、いろんな種類があるけど？",
                text: "トイレ、いろんな種類があるけど？",
                data: "toilet-types"
              },
              {
                type: "postback",
                label: "どこに置いたらいい？",
                text: "どこに置いたらいい？",
                data: "toilet-where"
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
