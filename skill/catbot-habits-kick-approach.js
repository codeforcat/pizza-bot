'use strict';

module.exports = class CatbotHabitsKickApproach {
  constructor() {
    this.clear_context_on_finish = true;
  }

  async finish(bot, event, context) {
    await bot.send(context.event.source.userId, {
      type: "text",
      text: "機嫌の悪いときにされる気がする...そうですね。遊びたいときや不機嫌なときにもネコキックすることがありますので、要注意です。あまりにも痛いときには、付き合わず、そっと離れましょう。"
    });

    await bot.switch_skill({
      name: "catbot-habits-2"
    });
  }
};
