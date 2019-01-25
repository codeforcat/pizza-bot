'use strict';
// 一問一答形式
module.exports = class ToiletTypes {
  async begin(bot, event, context){
    await bot.queue({
      type: "text",
      text: "猫がのびのびできるよう、屋根がないタイプで、大きさは、カラダの向きをかえられるくらい、猫の1.5倍くらいが目安。"
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
                displayText: "どこに置いたらいい？",
                data: "toilet-where"
              },
              {
                type: "postback",
                label: "猫砂は何がいい？",
                displayText: "猫砂は何がいい？",
                data: "toilet-sand-type"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          if (["toilet-where", "toilet-sand-type"].includes(value.data)){
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
