'use strict';

module.exports = class HandlePastaOrder {

  // コンストラクター。このスキルで必要とする、または指定することができるパラメータを設定します。
  constructor() {
    this.required_parameter = {
      pasta: {
        message_to_confirm: {
          type: "template",
          altText: "ご注文のパスタはお決まりでしょうか？ ペペロンチーノ、ジェノベーゼ、ナポリタンからお選びください。",
          template: {
            type: "buttons",
            text: "ご注文のパスタはお決まりでしょうか？",
            actions: [{
                type: "postback",
                label: "ペペロンチーノ",
                data: "ペペロンチーノ"
              },
              {
                type: "postback",
                label: "ジェノベーゼ",
                data: "ジェノベーゼ"
              },
              {
                type: "postback",
                label: "ナポリタン",
                data: "ナポリタン"
              }
            ]
          }
        }
      },
      size: {
        message_to_confirm: {
          type: "template",
          altText: "パスタのサイズはいかがいたしましょうか？ 普通、大盛りからお選びください。",
          template: {
            type: "buttons",
            text: "サイズはいかがいたしましょうか？",
            actions: [{
                type: "postback",
                label: "普通",
                data: "普通"
              },
              {
                type: "postback",
                label: "大盛り",
                data: "大盛り"
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
      text: `パスタの注文。${context.confirmed.name} 様、ご注文ありがとうございました！${context.confirmed.pasta.data}の${context.confirmed.size.data}サイズを30分以内にご指定の${context.confirmed.address}までお届けに上がります。`
    };

    await bot.reply(message);
  }
};
