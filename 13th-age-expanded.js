(() => { })();

Hooks.once('ready', async function() {
  const version = 1.7;  //Current Version

  //Bootstrap
  if (!window.ThirtenthAgeExpanded) {
    window.ThirtenthAgeExpanded = { loaded: 0 };
    window.ThirtenthAgeExpanded.setup = () => console.error('13th Age Expanded | Failed to setup 13th Age Expanded');
    $(() => window.ThirtenthAgeExpanded.setup());
  }

  // if (window.ThirtenthAgeExpanded.loaded >= version) {
  //   return;
  // }
  window.ThirtenthAgeExpanded.loaded = version;

  function log(log) {
    if (game.settings.get("13th-age-expanded", "showDebugLogs")) {
      console.log(log);
    }
  }

  window.ThirtenthAgeExpanded.setup = () => {
    console.log(`13th Age Expanded | Initializing v` + version);
    RegisterConfigurationOptions();
  };

  const ActorArchmageSheet = game.archmage.ActorArchmageSheet;
  class ExpandedActorArchmageSheet extends ActorArchmageSheet {
    get template() {
      // adding the #equals and #unequals handlebars helper
      Handlebars.registerHelper('equals', function (arg1, arg2, options) {
          return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      });

      Handlebars.registerHelper('unequals', function (arg1, arg2, options) {
          return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
      });

      return "modules/13th-age-expanded/templates/ExpandedActorArchmageSheet.html";
    }

    getData() {
      const sheetData = super.getData();
      if (sheetData.actor.type === 'character') {
        if (!sheetData.actor.data.coins) {
          sheetData.actor.data.coins = {
            showRare: false,
            platinum: 0,
            gold: 0,
            silver: 0,
            copper: 0
          }
        }

        sheetData.actor.data.coins.showRare = game.settings.get("13th-age-expanded", "showRareCoins");
      }

      return sheetData;
    }
    
  }

  class MonkActorArchmageSheet extends ExpandedActorArchmageSheet {
    get template() {
      // adding the #equals and #unequals handlebars helper
      Handlebars.registerHelper('equals', function (arg1, arg2, options) {
          return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      });

      Handlebars.registerHelper('unequals', function (arg1, arg2, options) {
          return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
      });

      return "modules/13th-age-expanded/templates/MonkActorArchmageSheet.html";
    }
  }

  class CommanderActorArchmageSheet extends ExpandedActorArchmageSheet {
    get template() {
      // adding the #equals and #unequals handlebars helper
      Handlebars.registerHelper('equals', function (arg1, arg2, options) {
          return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      });

      Handlebars.registerHelper('unequals', function (arg1, arg2, options) {
          return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
      });

      return "modules/13th-age-expanded/templates/CommanderActorArchmageSheet.html";
    }
  }

  class RogueActorArchmageSheet extends ExpandedActorArchmageSheet {
    get template() {
      // adding the #equals and #unequals handlebars helper
      Handlebars.registerHelper('equals', function (arg1, arg2, options) {
          return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      });

      Handlebars.registerHelper('unequals', function (arg1, arg2, options) {
          return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
      });

      return "modules/13th-age-expanded/templates/RogueActorArchmageSheet.html";
    }
  }

  Actors.registerSheet("archmage", ExpandedActorArchmageSheet, {
    types: [],
    makeDefault: true
  });
  Actors.registerSheet("archmage", MonkActorArchmageSheet, {
    types: [],
    makeDefault: false
  });
  Actors.registerSheet("archmage", CommanderActorArchmageSheet, {
    types: [],
    makeDefault: false
  });
  Actors.registerSheet("archmage", RogueActorArchmageSheet, {
    types: [],
    makeDefault: false
  });

  RegisterConfigurationOptions();

  function RegisterConfigurationOptions() {
    console.log("13th Age Expanded | Registering configuration options");
  
    game.settings.register('13th-age-expanded', 'showDebugLogs', {
      name: game.i18n.localize("13AE.SETTINGS.ShowDebugLogsName"),
      hint: game.i18n.localize("13AE.SETTINGS.ShowDebugLogsHint"),
      scope: 'world',
      config: true,
      default: false,
      type: Boolean,
    });
    
    game.settings.register('13th-age-expanded', 'showRareCoins', {
      name: game.i18n.localize("13AE.SETTINGS.ShowRareCoinsName"),
      hint: game.i18n.localize("13AE.SETTINGS.ShowRareCoinsHint"),
      scope: 'world',
      config: true,
      default: false,
      type: Boolean,
    });
  }
});
