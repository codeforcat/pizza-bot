"use strict";

const debug = require("debug")("bot-express:skill");

let confirmed_habits1_array = [];
let new_habit1_elements = [];
let new_actions1_array = [];

module.exports = class CatbotHabits1 {
  constructor() {
    this.habits_array = ["ゴロゴロ", "ふみふみ", "スリスリ", "カカカッ"];
    this.actions_array = [
      {type:"message",label:"ゴロゴロ",text:"ゴロゴロ"},
      {type:"message",label:"ふみふみ",text:"ふみふみ"},
      {type:"message",label:"スリスリ",text:"スリスリ"},
      {type:"message",label:"カカカッ",text:"カカカッ"}
    ];

    this.required_parameter = {
      select_habits: {
        message_to_confirm: {
          type: "template",
          altText: "どれが気になるかな？",
          template: {
            type: "buttons",
            thumbnailImageUrl: "https://www.dropbox.com/s/o2r7acj2bptfxt0/catbot-02_thumbnail.jpg?dl=1",
            text: "どれが気になるかな？",
            actions: new_actions1_array.length > 0 ? new_actions1_array : this.actions_array
          }
        },
        parser: async (value, bot, event, context) => {
          confirmed_habits1_array.push(value);
          const habit_element = this.habits_array.filter(elm => !confirmed_habits1_array.includes(elm));
          let set = new Set(habit_element);
          new_habit1_elements = [...set];

          if (this.habits_array.includes(value)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (error){
            await bot.change_message_to_confirm("select_habits", {
              type: "text",
              text: "ごめんね。選択肢から選んでね。",
            });
          } else {
            await bot.queue({
              type: "text",
              text: `${value}が気になるんだね。`
            });
            let message;
            if (value === "ゴロゴロ") {
              message = "ゴロゴロという鳴き声には、いろんな意味があるよ。\n大体は、ご機嫌なときのゴロゴロなんだけど、「ご飯ちょうだい」などの要求がらみのものやカラダの具合が悪いときにもゴロゴロするので、気をつけて見ておいてね。";
            } else if (value === "ふみふみ") {
              message = "ふみふみは、赤ちゃん時代の思い出。\nネコは母乳を飲むとき、より母乳が出やすくなるように前脚で母親のおっぱいをマッサージするようにしながら飲みます。その時の心地よさや安心感を思い出すのか、大人になってからも、毛布や布団などのやわらかくて気持ちのいいものに触れると、ふみふみしたくなるみたいですね。";
            } else if (value === "スリスリ") {
              message = "縄張りの安心を得るためのマーキング。\n自分の縄張りにあるものや人に自分のにおいをつけるマーキング行動だよ。自分のにおいがついていないと落ち着かないんだね、きっと。";
            } else if (value === "カカカッ") {
              message = "ネコが窓に向かって、「カカカッ」といった鳴き声を出してることを聞いたことがありませんか？これは、獲物に対して、ネコが興奮しているときの反応で、クラッキングと言います。ちなみに、ライオンやトラは、同じネコ科の動物ですが、クラッキングはしません。";
            }
            await bot.queue({
              type: "text",
              text: message
            });
            if (new_habit1_elements.length > 0) {
              await bot.collect("other");
            }
          }
        }
      }
    };

    this.optional_parameter = {
      other: {
        message_to_confirm: {
          type: "template",
          altText: "ほかのも気になる？",
          template: {
            type: "confirm",
            text: "ほかのも気になる？",
            actions: [
              {
                type: "message",
                label: "知りたい",
                text: "ほかの習性を知りたい"
              },
              {
                type: "message",
                label: "もういいよ",
                text: "もういいよ"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          new_actions1_array = [];
          if (new_habit1_elements.length > 0) {
            new_habit1_elements.forEach((elm) => {
              new_actions1_array.push({type: "message", label: elm, text: elm});
            });
          }
          if (["もういいよ"].includes(value)){
            new_habit1_elements = [];
            confirmed_habits1_array = [];
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (error){
            await bot.init();
          }
        }
      }
    };

    this.clear_context_on_finish = true;
  }

  async finish(bot, event, context){
    if (new_habit1_elements.length === 0) {
      await bot.reply({
        type: "text",
        text: "ほかに気になることがあったら話しかけてね！"
      });
      new_actions1_array = [];
      new_habit1_elements = [];
      confirmed_habits1_array = [];
    } else {
      await bot.reply({
        type: "text",
        text: "にゃ？\nもう一度言ってほしいにゃ。"
      });
    }
  }
};
