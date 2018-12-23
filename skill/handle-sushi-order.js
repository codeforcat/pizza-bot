'use strict';

module.exports = class HandleSushiOrder {

  // コンストラクター。このスキルで必要とする、または指定することができるパラメータを設定します。
  constructor() {
    this.required_parameter = {
      sushi_level: {
        message_to_confirm: {
          type: "template",
          altText: "ご注文の寿司はお決まりでしょうか？ 松、竹、梅からお選びください。",
          template: {
            type: "buttons",
            text: "ご注文の寿司はお決まりでしょうか？",
            actions: [{
                type: "postback",
                label: "松",
                data: "松"
              },
              {
                type: "postback",
                label: "竹",
                data: "竹"
              },
              {
                type: "postback",
                label: "梅",
                data: "梅"
              }
            ]
          }
        }
      },
      address: {
        message_to_confirm: {
          type: "text",
          text: "お届け先の住所を教えていただけますか？"
        }
      },
      name: {
        message_to_confirm: {
          type: "text",
          text: "最後に、お客様のお名前を教えていただけますか？"
        }
      }
    };
  }

  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context) {
    console.log("finish**********************");
    console.log(context.confirmed);
    let message = {
      type: "text",
      text: `寿司の注文${context.confirmed.name} 様、ご注文ありがとうございました！${context.confirmed.sushi_level.data}を30分以内にご指定の${context.confirmed.address}までお届けに上がります。`
    };

    await bot.reply(message);
  }
};
