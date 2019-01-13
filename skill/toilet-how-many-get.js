"use strict";

module.exports = class ToiletHowManyGet {
  async begin(bot, event, context) {
    bot.queue({
      type: "text",
      text: "複数設置が基本です。ネコの数より1つ多く置いてあげてね。1匹なら2個、2匹なら3個という具合です。"
    });
  }

  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      param_a: {
        message_to_confirm: {
          type: "template",
          altText: "他にも気になることある？",
          template: {
            type: "buttons",
            text: "他にも気になることある？",
            actions: [{
                type: "postback",
                label: "どうして、複数いるの？",
                displayText: "どうして、複数いるの？",
                data: "toilet-why-multi"
              },
              {
                type: "postback",
                label: "トイレ、いろんな種類があるけど？",
                displayText: "トイレ、いろんな種類があるけど？",
                data: "toilet-types"
              },
              {
                type: "postback",
                label: "どこに置いたらいい？",
                displayText: "どこに置いたらいい？",
                data: "toilet-where"
              }
            ]
          }
        }


      }
    }
  }

  async finish(bot, event, context) {
    let intent_name = context.confirmed.another_q2.data;
    console.log("*******ToiletWhyMulti*******intent_name ********: "+intent_name);
    bot.switch_skill({
        name: "toilet-why-multi"
    })
  }
}
