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
      RegisterCharacterFlags();
    });

    // Hooks.on('renderActorArchmageSheet', (app, html, data) => {
    //   console.log(app);
    //   console.log(html);
    //   console.log(data);

    //   var abilitiesTab = html.find(".abilities");

    //   AddIncrementals(abilitiesTab);
    // });
  };
})();

function RegisterCharacterFlags() {
  CONFIG.Actor.characterFlags = {
    "initiativeAdv": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.initiativeAdvName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.initiativeAdvHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.feats"),
      type: Boolean
    },
    "improvedIniative": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.improvedIniativeName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.improvedIniativeHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.feats"),
      type: Boolean
    },
    "feat": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.featName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.featHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    },
    "hp": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.hpName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.hpHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    },
    "skills": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.skillsName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.skillsHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    },
    "extraMagicItem": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.extraMagicItemName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.extraMagicItemHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    },
    "abilityScoreBonus": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.abilityScoreBonusName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.abilityScoreBonusHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    },
    "iconRelationshipPoint": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.iconRelationshipPointName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.iconRelationshipPointHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    },
    "powerOrSpell1": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.powerSpellName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.powerSpellHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    },
    "powerOrSpell2": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.powerSpellName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.powerSpellHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    },
    "powerOrSpell3": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.powerSpellName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.powerSpellHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    },
    "powerOrSpell4": {
      name: game.i18n.localize("13AE.CHARACTERFLAGS.powerSpellName"),
      hint: game.i18n.localize("13AE.CHARACTERFLAGS.powerSpellHint"),
      section: game.i18n.localize("13AE.CHARACTERFLAGS.incrementals"),
      type: Boolean
    }
  };
}

function AddIncrementals(abilitiesTab) {
  var toAdd = "";
  toAdd += checkbox("Melee Miss Dmg.", "data.attributes.weapon.melee.miss");
  toAdd += checkbox("Ability Score Bonus (4th/7th/10th Level)", "data.incrementals.abilityScoreBonus");
  toAdd += "</hr>";
  abilitiesTab.append(toAdd);
}

function checkbox(displayName, dataName) {
  return '<div class="settings-group"><strong class="attribute-name">' + displayName + '</strong><input class="attribute-input" name="' + dataName + '" type="checkbox" value="1" checked="0" data-dtype="Boolean"></div>';
}

function RegisterConfigurationOptions() {

  Hooks.once('init', () => {
    game.settings.register('13th-age-expanded', 'showDebugLogs', {
      name: game.i18n.localize("13AE.SETTINGS.ShowDebugLogsName"),
      hint: game.i18n.localize("13AE.SETTINGS.ShowDebugLogsHint"),
      scope: 'world',
      config: true,
      default: false,
      type: Boolean,
    });
    
  });
}
