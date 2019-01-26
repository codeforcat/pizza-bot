"use strict";

const debug = require("debug")("bot-express:skill");

let confirmed_habits2_array = [];
let new_habit2_elements = [];
let new_actions2_array = [];

module.exports = class CatbotHabits2 {
  constructor() {
    this.habits_array = ["甘噛み", "ゆっくり瞬き", "後ろ脚キック", "夜の運動会"];
    this.actions_array = [
      {type:"message",label:"甘噛み",text:"甘噛み"},
      {type:"message",label:"ゆっくり瞬き",text:"ゆっくり瞬き"},
      {type:"message",label:"後ろ脚キック",text:"後ろ脚キック"},
      {type:"message",label:"夜の運動会",text:"夜の運動会"}
    ];

    this.required_parameter = {
      return_skill: {
        condition: async (bot, event, context) => {
          if (context._flow !== "reply" && new_habit2_elements.length === 0) {
            return false;
          }
          return true;
        },
        message_to_confirm: {
          type: "template",
          altText: "ほかのも気になる？",
          template: {
            type: "confirm",
            text: "ほかのも気になる？",
            actions: [
              {
                type: "postback",
                label: "知りたい",
                displayText: "知りたい",
                data: "yes"
              },
              {
                type: "postback",
                label: "もういいよ",
                displayText: "もういいよ",
                data: "no"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          new_actions2_array = [];
          if (new_habit2_elements.length > 0) {
            new_habit2_elements.forEach((elm) => {
              new_actions2_array.push({type: "message", label: elm, text: elm});
            });
          }
          if (["yes", "no"].includes(value.data)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (!error) {
            if (new_habit2_elements.length > 0) {
              await bot.collect({
                select_habits: {
                  condition: async (bot, event, context) => {
                    if (context.confirmed.return_skill.data === "no") {
                      await bot.reply({
                        type: "text",
                        text: "ほかに気になることがあったら話しかけてね！"
                      });
                      new_actions2_array = [];
                      new_habit2_elements = [];
                      confirmed_habits2_array = [];
                      return false;
                    }
                    return true;
                  },
                  message_to_confirm: {
                    type: "template",
                    altText: "どれが気になるかな？",
                    template: {
                      type: "buttons",
                      thumbnailImageUrl: "https://www.dropbox.com/s/o2r7acj2bptfxt0/catbot-02_thumbnail.jpg?dl=1",
                      text: "どれが気になるかな？",
                      actions: new_actions2_array
                    }
                  }
                }
              });
            }
          } else {
            await bot.init();
          }
        }
      },
      select_habits: {
        message_to_confirm: {
          type: "template",
          altText: "どれが気になるかな？",
          template: {
            type: "buttons",
            thumbnailImageUrl: "https://www.dropbox.com/s/o2r7acj2bptfxt0/catbot-02_thumbnail.jpg?dl=1",
            text: "どれが気になるかな？",
            actions: new_actions2_array.length > 0 ? new_actions2_array : this.actions_array
          }
        },
        parser: async (value, bot, event, context) => {
          confirmed_habits2_array.push(value);
          const habit_element = this.habits_array.filter(elm => !confirmed_habits2_array.includes(elm));
          let set = new Set(habit_element);
          new_habit2_elements = [...set];

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
            let parameter;
            if (value === "甘噛み") {
              message = "頻繁な甘噛みはストレスのサインです。\n甘噛み本来は狩りの練習と考えられますが、ストレスによる攻撃の場合もありますので、頻繁に行われるときには注意してあげてね。";
              parameter = "amagami";
            } else if (value === "ゆっくり瞬き") {
              message = "ゆっくり瞬きは、好きのサイン。\nネコが飼い主に対して瞬きするのは、心を許しているサインです。リラックスしているときは、瞬きのほかに、両目をギュッと閉じたりすることも。";
              parameter = "mabataki";
            } else if (value === "後ろ脚キック") {
              message = "後ろ脚キックも狩りのトレーニングです。\n後ろ脚から繰り出される強烈なネコキックは、狩猟本能によるもの。獲物を仕留めたあと、相手を疲れさせることが目的なので、一度始まるとなかなか止まりません。";
              parameter = "kick";
            } else if (value === "夜の運動会") {
              message = "夜の運動会は狩りのシミュレーションです。\n飼い主が寝ようとすると、ネコが鳴いたり、走り回ったり、あるいは、明け方、ネコが騒ぎ出して、起こされたり。複数のネコを飼っている場合には追っかけっこして、さながら、夜の運動会と化します。";
              parameter = "undokai"
            }
            await bot.queue({
              type: "text",
              text: message
            });
            await bot.collect(parameter);
          }
        }
      }
    };

    this.optional_parameter = {
      amagami: {
        message_to_confirm: {
          type: "template",
          altText: "対処法を知りたい？",
          template: {
            type: "confirm",
            text: "対処法を知りたい？",
            actions: [
              {
                type: "postback",
                label: "知りたい",
                displayText: "知りたい",
                data: "yes"
              },
              {
                type: "postback",
                label: "大丈夫",
                displayText: "大丈夫",
                data: "no"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          new_actions2_array = [];
          if (new_habit2_elements.length > 0) {
            new_habit2_elements.forEach((elm) => {
              new_actions2_array.push({type: "message", label: elm, text: elm});
            });
          }
          if (["yes", "no"].includes(value.data)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (!error) {
            if (value.data === "yes") {
              await bot.switch_skill({
                name: "catbot-habits-amagami-approach"
              });
            } else {
              if (new_habit2_elements.length > 0) {
                await bot.collect({
                  select_habits: {
                    message_to_confirm: {
                      type: "template",
                      altText: "どれが気になるかな？",
                      template: {
                        type: "buttons",
                        thumbnailImageUrl: "https://www.dropbox.com/s/o2r7acj2bptfxt0/catbot-02_thumbnail.jpg?dl=1",
                        text: "どれが気になるかな？",
                        actions: new_actions2_array
                      }
                    }
                  }
                });
              }
            }
          } else {
            await bot.init();
          }
        }
      },
      mabataki: {
        message_to_confirm: {
          type: "template",
          altText: "じっと見つめる理由を知りたい？",
          template: {
            type: "confirm",
            text: "じっと見つめる理由を知りたい？",
            actions: [
              {
                type: "postback",
                label: "知りたい",
                displayText: "知りたい",
                data: "yes"
              },
              {
                type: "postback",
                label: "大丈夫",
                displayText: "大丈夫",
                data: "no"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          new_actions2_array = [];
          if (new_habit2_elements.length > 0) {
            new_habit2_elements.forEach((elm) => {
              new_actions2_array.push({type: "message", label: elm, text: elm});
            });
          }
          if (["yes", "no"].includes(value.data)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (!error) {
            if (value.data === "yes") {
              await bot.switch_skill({
                name: "catbot-habits-mabataki-open-eyes"
              });
            } else {
              if (new_habit2_elements.length > 0) {
                await bot.collect({
                  select_habits: {
                    message_to_confirm: {
                      type: "template",
                      altText: "どれが気になるかな？",
                      template: {
                        type: "buttons",
                        thumbnailImageUrl: "https://www.dropbox.com/s/o2r7acj2bptfxt0/catbot-02_thumbnail.jpg?dl=1",
                        text: "どれが気になるかな？",
                        actions: new_actions2_array
                      }
                    }
                  }
                });
              }
            }
          } else {
            await bot.init();
          }
        }
      },
      kick: {
        message_to_confirm: {
          type: "template",
          altText: "対処法を知りたい？",
          template: {
            type: "confirm",
            text: "対処法を知りたい？",
            actions: [
              {
                type: "postback",
                label: "知りたい",
                displayText: "知りたい",
                data: "yes"
              },
              {
                type: "postback",
                label: "大丈夫",
                displayText: "大丈夫",
                data: "no"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          new_actions2_array = [];
          if (new_habit2_elements.length > 0) {
            new_habit2_elements.forEach((elm) => {
              new_actions2_array.push({type: "message", label: elm, text: elm});
            });
          }
          if (["yes", "no"].includes(value.data)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (!error) {
            if (value.data === "yes") {
              await bot.switch_skill({
                name: "catbot-habits-kick-approach"
              });
            } else {
              if (new_habit2_elements.length > 0) {
                await bot.collect({
                  select_habits: {
                    message_to_confirm: {
                      type: "template",
                      altText: "どれが気になるかな？",
                      template: {
                        type: "buttons",
                        thumbnailImageUrl: "https://www.dropbox.com/s/o2r7acj2bptfxt0/catbot-02_thumbnail.jpg?dl=1",
                        text: "どれが気になるかな？",
                        actions: new_actions2_array
                      }
                    }
                  }
                });
              }
            }
          } else {
            await bot.init();
          }
        }
      },
      undokai: {
        message_to_confirm: {
          type: "template",
          altText: "対処法を知りたい？",
          template: {
            type: "confirm",
            text: "対処法を知りたい？",
            actions: [
              {
                type: "postback",
                label: "知りたい",
                displayText: "知りたい",
                data: "yes"
              },
              {
                type: "postback",
                label: "大丈夫",
                displayText: "大丈夫",
                data: "no"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          new_actions2_array = [];
          if (new_habit2_elements.length > 0) {
            new_habit2_elements.forEach((elm) => {
              new_actions2_array.push({type: "message", label: elm, text: elm});
            });
          }
          if (["yes", "no"].includes(value.data)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (!error) {
            if (value.data === "yes") {
              await bot.switch_skill({
                name: "catbot-habits-undokai-approach"
              });
            } else {
              if (new_habit2_elements.length > 0) {
                await bot.collect({
                  select_habits: {
                    message_to_confirm: {
                      type: "template",
                      altText: "どれが気になるかな？",
                      template: {
                        type: "buttons",
                        thumbnailImageUrl: "https://www.dropbox.com/s/o2r7acj2bptfxt0/catbot-02_thumbnail.jpg?dl=1",
                        text: "どれが気になるかな？",
                        actions: new_actions2_array
                      }
                    }
                  }
                });
              }
            }
          } else {
            await bot.init();
          }
        }
      }
    };

    this.clear_context_on_finish = true;
  }

  async finish(bot, event, context){
    if (new_habit2_elements.length === 0) {
      await bot.reply({
        type: "text",
        text: "ほかに気になることがあったら話しかけてね！"
      });
      new_actions2_array = [];
      new_habit2_elements = [];
      confirmed_habits2_array = [];
    } else {
      await bot.reply({
        type: "text",
        text: "にゃ？\nもう一度言ってほしいにゃ。"
      });
    }
  }
};
