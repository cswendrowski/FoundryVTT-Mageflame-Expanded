(() => { })();

Hooks.once('ready', async function() {
  const version = 2.0;  //Current Version

  //Bootstrap
  if (!window.ThirtenthAgeExpanded) {
    window.ThirtenthAgeExpanded = { loaded: 0 };
    window.ThirtenthAgeExpanded.setup = () => console.error('13th Age Expanded | Failed to setup 13th Age Expanded');
    $(() => window.ThirtenthAgeExpanded.setup());
  }

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
  class ReorganizedActorArchmageSheet extends ActorArchmageSheet {
    get template() {
      // adding the #equals and #unequals handlebars helper
      Handlebars.registerHelper('equals', function (arg1, arg2, options) {
          return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      });

      Handlebars.registerHelper('unequals', function (arg1, arg2, options) {
          return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
      });

      return "modules/13th-age-expanded/templates/ReorganizedActorArchmageSheet.html";
    }

    getData() {
      const sheetData = super.getData();

      console.log(sheetData);
      sheetData.actor.class = sheetData.actor.powers.filter(power => power.data.actionType.value === "");
      sheetData.actor.actions = sheetData.actor.powers.filter(power => power.data.actionType.value !== "");

      return sheetData;
    }
    
  }


  Actors.registerSheet("archmage", ReorganizedActorArchmageSheet, {
    types: [],
    makeDefault: true
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
  }
});
