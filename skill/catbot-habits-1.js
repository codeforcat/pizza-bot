"use strict";

const debug = require("debug")("bot-express:skill");

const habits_array = ["ゴロゴロ", "ふみふみ", "スリスリ", "カカカッ"];
let confirmed_habits_array = [];
let new_habit_elements = [];
let new_actions_array = [];

module.exports = class CatbotHabits1 {

  constructor() {
    this.required_parameter = {
      select_habits: {
        message_to_confirm: {
          type: "template",
          altText: "どれが気になるかな？",
          template: {
            type: "buttons",
            text: "どれが気になるかな？",
            actions: [
              {type:"message",label:"ゴロゴロ",text:"ゴロゴロ"},
              {type:"message",label:"ふみふみ",text:"ふみふみ"},
              {type:"message",label:"スリスリ",text:"スリスリ"},
              {type:"message",label:"カカカッ",text:"カカカッ"}
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          confirmed_habits_array.push(value);
          const habit_element = habits_array.filter(elm => !confirmed_habits_array.includes(elm));
          let set = new Set(habit_element);
          new_habit_elements = [...set];

          if (habits_array.includes(value)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (error){
            bot.change_message_to_confirm("select_habits", {
              type: "text",
              text: "ごめんね。選択肢から選んでね。",
            });
          } else {
            bot.queue({
              type: "text",
              text: `${value}が気になるんだね。`
            });
          }
        },
        // sub_skill: ["catbot-habits-gorogoro", "catbot-habits-fumifumi", "catbot-habits-surisuri", "catbot-habits-kakaka"]
      }
    };

    this.clear_context_on_finish = new_habit_elements.length < 0;
  }

  async finish(bot, event, context){
    let message;
    if (context.confirmed.select_habits === "ゴロゴロ"){
      message = "ゴロゴロという鳴き声には、いろんな意味があるよ。\n大体は、ご機嫌なときのゴロゴロなんだけど、「ご飯ちょうだい」などの要求がらみのものやカラダの具合が悪いときにもゴロゴロするので、気をつけて見ておいてね。"
    } else if (context.confirmed.select_habits === "ふみふみ"){
      message = "ふみふみは、赤ちゃん時代の思い出。\nネコは母乳を飲むとき、より母乳が出やすくなるように前脚で母親のおっぱいをマッサージするようにしながら飲みます。その時の心地よさや安心感を思い出すのか、大人になってからも、毛布や布団などのやわらかくて気持ちのいいものに触れると、ふみふみしたくなるみたいですね。"
    } else if (context.confirmed.select_habits === "スリスリ"){
      message = "縄張りの安心を得るためのマーキング。\n自分の縄張りにあるものや人に自分のにおいをつけるマーキング行動だよ。自分のにおいがついていないと落ち着かないんだね、きっと。"
    } else if (context.confirmed.select_habits === "カカカッ"){
      message = "ネコが窓に向かって、「カカカッ」といった鳴き声を出してることを聞いたことがありませんか？これは、獲物に対して、ネコが興奮しているときの反応で、クラッキングと言います。ちなみに、ライオンやトラは、同じネコ科の動物ですが、クラッキングはしません。"
    }
    await bot.queue({
      type: "text",
      text: message
    });

    if (new_habit_elements.length > 0){
      new_habit_elements.forEach((value) => {
        new_actions_array.push({type:"message",label:value,text:value});
      });
      await bot.reply({
        type: "template",
        altText: "こんなこと、知ってる？",
        template: {
          type: "buttons",
          text: "こんなこと、知ってる？",
          actions: new_actions_array
        }
      });
      new_actions_array = [];
    } else {
      await bot.reply({
        type: "text",
        text: "ほかに気になることがあったら話しかけてね！"
      });
      confirmed_habits_array = [];
    }
  }
};
