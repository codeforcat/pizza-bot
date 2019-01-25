'use strict';
// 質問に対して選択肢の質問で答える形式
module.exports = class CatbotQuestion {

  // コンストラクター。このスキルで必要とする、または指定することができるパラメータを設定します。
  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      quiz: {
        message_to_confirm: {
          type: "template",
          altText: "ここでクイズです",
          template: {
            type: "buttons",
            text: "ここで、クイズです。ネコの平均睡眠時間はどれくらいだと思う？",
            actions: [{
                type: "postback",
                label: "①4時間",
                data: "1"
              },
              {
                type: "postback",
                label: "②8時間",
                data: "2"
              },
              {
                type: "postback",
                label: "③12時間",
                data: "3"
              },
              {
                type: "postback",
                label: "④16時間",
                data: "4"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          console.log("value: " + value.data);
          if (["1", "2", "3", "4"].includes(value.data)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (error){
            bot.change_message_to_confirm("quiz", {
              type: "text",
              text: "選択肢を入れてほしいニャ。",
            });
          } else {
            let answer = `選択肢${value.data}だね。\n`;
            if(value.data == "4"){
              answer += "ピンポン！正解です。\nネコは狩りのとき以外寝ていた野生時代の習性の名残で、一日16時間くらい寝るよ。でも、そのうちの12時間くらいは、眠りの浅いうたた寝状態だぞ。";
            }else{
              answer += "ブッブー！不正解です。\nネコは狩りのとき以外寝ていた野生時代の習性の名残で、一日16時間くらい寝るよ。でも、そのうちの12時間くらいは、眠りの浅いうたた寝状態だぞ。";
            }
            bot.queue({
              type: "text",
              text: answer
            });
          }
        }
      },
    };
  }

  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context) {
    await bot.switch_skill({
      name: "catbot-question-more"
    });
  }
};
