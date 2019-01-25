'use strict';
// 一問一答形式
module.exports = class ToiletWhere {
  async begin(bot, event, context){
    await bot.queue({
      type: "text",
      text: "人の出入りが少ない、猫が落ち着ける場所がいいですね。でも、いつもいるところからあんまり離れたとこだと、我慢しちゃうかも。"
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
                label: "いろんな種類があるけど？",
                displayText: "いろんな種類があるけど？",
                data: "toilet-types"
              },
              {
                type: "postback",
                label: "猫砂は何がいい？",
                displayText: "猫砂は何がいい？",
                data: "toilet-sand"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          if (["toilet-types", "toilet-sand"].includes(value.data)){
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
  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context) {
    let intent_name = context.confirmed.another_q.data;
    console.log("**************intent_name ********: "+intent_name);
    await bot.switch_skill({
      name: intent_name
    });
  }
};
