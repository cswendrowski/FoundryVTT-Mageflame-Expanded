(() => {
  const version = 1.0;  //Current Version

  //Bootstrap
  if (!window.ThirtenthAgeExpanded) {
    window.ThirtenthAgeExpanded = {loaded: 0};
    window.ThirtenthAgeExpanded.setup = () => console.error('13th Age Expanded | Failed to setup 13th Age Expanded');
    $(() => window.ThirtenthAgeExpanded.setup());
  }

  if (window.ThirtenthAgeExpanded.loaded >= version) {
    return;
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

    Hooks.on('ready', () => {

    });
  };
})();

function RegisterConfigurationOptions() {

  Hooks.on('init', () => {

    game.settings.register('13th-age-expanded', 'showDebugLogs', {
      name: game.i18n.localize("DRP.SETTINGS.ShowDebugLogsName"),
      hint: game.i18n.localize("DRP.SETTINGS.ShowDebugLogsHint"),
      scope: 'world',
      config: true,
      default: false,
      type: Boolean,
    });
    
  });
}
