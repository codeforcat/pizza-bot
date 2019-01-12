'use strict';
// 一問一答形式
module.exports = class CatbotNext {

  // コンストラクター。このスキルで必要とする、または指定することができるパラメータを設定します。
  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      type: {
        message_to_confirm: {
          type: "template",
          altText: "住民票ですね。今回必要なのは世帯全員分ですか？あるいはご本人だけ？",
          template: {
            type: "buttons",
            text: "住民票ですね。今回必要なのは世帯全員分ですか？あるいはご本人だけ？",
            actions: [{
                type: "message",
                label: "世帯全員分",
                text: "ネクスト"
              },
              {
                type: "message",
                label: "習性",
                text: "習性"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          // if (["世帯全員分", "本人だけ"].includes(value)) {
            return value;
          // }
          // throw new Error();
        },
        // reaction: async (error, value, bot, event, context) => {
        //   // if (error) {
        //   return;
        //   // }
        //   //
        //   // bot.queue({
        //   //   text: `${value}ですね。OKです。`
        //   // });
        // }
      }
    }
  }

  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context) {
    bot.switch_skill({
            name: "toilet-sand"
    })
    // console.log(context.confirmed);
    // let text;
    // if(context.confirmed.type.text == "はい"){
    //   text = "引き続き質問してニャ";
    // }else{
    //   text = "豆知識をランダムに表示";
    // }
    // let message = {
    //   type: "text",
    //   text: text
    // };
    // await bot.reply(message);
  }
};
