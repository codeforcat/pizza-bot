"use strict";

const debug = require("debug")("bot-express:skill");

module.exports = class LineVariousFormat {

  constructor() {
    this.required_parameter = {
      line_text: {
        message_to_confirm: {
          type: "text",
          text: "ご注文のピザは？"
        }
      },
      line_template_button_postback: {
        message_to_confirm: {
          type: "template",
          altText: "ご注文のピザをお選びください。",
          template: {
            type: "buttons",
            text: "ご注文のピザをお選びください。",
            actions: [
              {type:"postback",label:"マルゲリータ",data:"マルゲリータ"},
              {type:"postback",label:"マリナーラ",data:"マリナーラ"},
              {type:"postback",label:"カプリチョーザ",data:"カプリチョーザ"},
              {type:"postback",label:"クワトロフォルマッジ",data:"クワトロフォルマッジ"}
            ]
          }
        },
        parser: async (postback, bot, event, context) => {
          if (typeof postback == "string"){
            return postback;
          } else if (typeof postback == "object"){
            return postback.data;
          }
          throw new Error();
        }
      },
      line_template_button_message: {
        message_to_confirm: {
          type: "template",
          altText: "ご注文のピザをお選びください。",
          template: {
            type: "buttons",
            text: "ご注文のピザをお選びください。",
            actions: [
              {type:"message",label:"マルゲリータ",text:"マルゲリータ"},
              {type:"message",label:"マリナーラ",text:"マリナーラ"},
              {type:"message",label:"カプリチョーザ",text:"カプリチョーザ"},
              {type:"message",label:"クワトロフォルマッジ",text:"クワトロフォルマッジ"}
            ]
          }
        }
      },
      line_template_button_uri: {
        message_to_confirm: {
          type: "template",
          altText: "ご注文のピザをお選びください。",
          template: {
            type: "buttons",
            text: "ご注文のピザをお選びください。",
            actions: [
              {type:"postback",label:"マルゲリータ",data:"マルゲリータ"},
              {type:"postback",label:"マリナーラ",data:"マリナーラ"},
              {type:"uri", label: "すべてのメニュー", uri:"https://www.dominos.jp/order/pizza/search/"}
            ]
          }
        },
        parser: async (postback, bot, event, context) => {
          if (typeof postback == "string"){
            return postback;
          } else if (typeof postback == "object"){
            return postback.data;
          }
          throw new Error();
        }
      },
      line_template_button_uri_more_than_3: {
        message_to_confirm: {
          type: "template",
          altText: "ご注文のピザをお選びください。",
          template: {
            type: "buttons",
            text: "ご注文のピザをお選びください。",
            actions: [
              {type:"postback",label:"マルゲリータ",data:"マルゲリータ"},
              {type:"postback",label:"マリナーラ",data:"マリナーラ"},
              {type:"postback",label:"カプリチョーザ",data:"カプリチョーザ"},
              {type:"uri", label: "すべてのメニュー", uri:"https://www.dominos.jp/order/pizza/search/"}
            ]
          }
        },
        parser: async (postback, bot, event, context) => {
          if (typeof postback == "string"){
            return postback;
          } else if (typeof postback == "object"){
            return postback.data;
          }
          throw new Error();
        }
      },
      line_template_confirm: {
        message_to_confirm: {
          type: "template",
          altText: "ご注文は以上ですか？",
          template: {
            type: "confirm",
            text: "ご注文は以上ですか？",
            actions: [
              {type:"message",label:"はい",text:"はい"},
              {type:"message",label:"いいえ",text:"いいえ"}
            ]
          }
        }
      },
      line_template_carousel: {
        message_to_confirm: {
          type: "template",
          altText: "Carousel Template",
          template: {
            type: "carousel",
            columns: [{
              thumbnailImageUrl: "https://www.dominos.jp/common/img/itemimgsx/90.jpg?_=12016",
              text: "マルゲリータ",
              actions: [
                {type:"postback", label:"注文する", data:"マルゲリータ"},
                {type:"uri", label:"詳細", uri:"https://www.dominos.jp/order/pizza/detail/99999/19001/90"}
              ]
            },{
              thumbnailImageUrl: "https://www.dominos.jp/common/img/itemimgsx/216.jpg?_=12016",
              text: "ジェノベーゼ",
              actions: [
                {type:"postback", label:"注文する", data:"ジェノベーゼ"},
                {type:"uri", label:"詳細", uri:"https://www.dominos.jp/order/pizza/detail/99999/19001/216"}
              ]
            }]
          }
        },
        parser: (postback, bot, event, context) => {
          if (typeof postback == "string"){
            return postback;
          } else if (typeof postback == "object"){
            return postback.data;
          }
          throw new Error();
        }
      },
      /*
      line_image: {
          message_to_confirm: {
              type: "image",
              originalContentUrl: "https://www.dropbox.com/sh/lbmx3s1yg392mvh/AAAwCzdEjO_I5OK9nrbDurdra?dl=1"
          }
      },
      line_video: {
          message_to_confirm: {
              type: "video",
              originalContentUrl: "https://www.dropbox.com/sh/lbmx3s1yg392mvh/AAAwCzdEjO_I5OK9nrbDurdra?dl=1"
          }
      },
      line_audio: {
          message_to_confirm: {
              type: "sticker",
              originalContentUrl: "https://www.dropbox.com/sh/lbmx3s1yg392mvh/AAAwCzdEjO_I5OK9nrbDurdra?dl=1"
          }
      },
      line_sticker: {
          message_to_confirm: {
              type: "sticker",

          }
      },
      line_location: {
          message_to_confirm: {
              type: "location",

          }
      },
      line_imagemap: {
          message_to_confirm: {
              type: "imagemap",
              originalContentUrl: "https://www.dropbox.com/sh/lbmx3s1yg392mvh/AAAwCzdEjO_I5OK9nrbDurdra?dl=1"
          }
      }
      */
    };
  }

  // パラメーターが全部揃ったら実行する処理を記述します。
  async finish(bot, event, context){
    let message = {
      text: "完了"
    };
    await bot.reply(message);
  }
};
