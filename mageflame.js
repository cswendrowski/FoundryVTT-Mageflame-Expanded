(() => { })();

Hooks.once('ready', async function() {
  const version = 2.0;  //Current Version

  //Bootstrap
  if (!window.MageflameExpanded) {
    window.MageflameExpanded = { loaded: 0 };
    window.MageflameExpanded.setup = () => console.error('Mageflame Expanded | Failed to setup Mageflame Expanded');
    $(() => window.MageflameExpanded.setup());
  }

  window.MageflameExpanded.loaded = version;

  function log(log) {
    if (game.settings.get("mageflame-expanded", "showDebugLogs")) {
      console.log(log);
    }
  }

  window.MageflameExpanded.setup = () => {
    console.log(`Mageflame Expanded | Initializing v` + version);
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

      return "modules/mageflame-expanded/templates/ReorganizedActorArchmageSheet.html";
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
    console.log("Mageflame Expanded | Registering configuration options");
  
    game.settings.register('mageflame-expanded', 'showDebugLogs', {
      name: game.i18n.localize("Mageflame.SETTINGS.ShowDebugLogsName"),
      hint: game.i18n.localize("Mageflame.SETTINGS.ShowDebugLogsHint"),
      scope: 'world',
      config: true,
      default: false,
      type: Boolean,
    });
  }
});
