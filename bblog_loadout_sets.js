/****************************
 * Loadout Sets
 * BBLog plugin - tested with 3.8.0
 *
 * Translators:
 *  - de: Brady_The
 *  - fr: Amkhatar, GeneralSheppard
 *  - ru: ThePredatoR
 *  - cs: dapil
 *
 * And an added thanks to Amkhatar for the design ideas.
 *
 * @author   Joshua M. Murphy (poisonblx)
 * @version  0.6
 * @date     2014-01-05
 * @url      http://poisonbl.freeshell.org/bf4/bblog_loadout_sets.js
 *
 * Uses:
 * jquery.addrule.js 0.0.1 - https://gist.github.com/yckart/5563717/
 *   Copyright (c) 2013 Yannick Albert (http://yckart.com)
 *   Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 *   2013/05/12
 ***************************/

BBLog.handle("add.plugin", {
  id : "loadout-sets",

  name : "Loadout Sets",

  translations : {
    "en" : {
      "plugin.name" : "Loadout Sets",
      "button.sets" : "Sets",
      "button.save" : "Store",
      "button.load" : "Use",
      "button.clear" : "Clear",
      "prompt.setname" : "Loadout Name: ",
      "set.basename" : "Loadout",
      "button.rename" : "Rename",
      "button.random" : "Random",
      "button.togglelocked" : "Toggle Locked",
      "option.togglelocked" : "Show 'Toggle Locked' button?",
      "option.randombutton" : "Show 'Randomize' button?",
      "button.descriptions" : "Descriptions"
    },
    "ru" : {
      "plugin.name" : "Наборы экипировки",
      "button.sets" : "Наборы",
      "button.save" : "Сохранить",
      "button.load" : "Использовать",
      "button.clear" : "Очистить",
      "prompt.setname" : "Имя экипировки: ",
      "set.basename" : "Экипировка",
      "button.rename" : "Переименовать",
      "button.random" : "Случайно",
      "button.togglelocked" : "Заблокировать",
      "option.togglelocked" : "Отображать кнопку блокировки?",
      "option.randombutton" : 'Отображать кнопку "Случайно"',
      "button.descriptions" : "Описания"
    },
    "fr" : {
      "plugin.name" : "Sets d'équipements",
      "button.sets" : "Equipements",
      "button.save" : "Sauvegarder",
      "button.load" : "Utiliser",
      "button.clear" : "Réinitialiser",
      "prompt.setname" : "Nom de l'équipement: ",
      "set.basename" : "Équipement",
      "button.rename" : "Renommer",
      "button.random" : "Aléatoire",
      "button.togglelocked" : "Masquer (Vérouillé)",
      "option.togglelocked" : "Afficher le bouton Masquer Vérouillé", //Not sure
      "option.randombutton" : "Afficher le bouton Choisir Aléatoire",
      "button.descriptions" : "Descriptions" //Détails
    },
    "cs" : {
      "plugin.name" : "Sady vybavení",
      "button.sets" : "Sady",
      "button.save" : "Uložit",
      "button.load" : "Použít",
      "button.clear" : "Clear",
      "prompt.setname" : "Název výbavy: ",
      "set.basename" : "Výbava",
      "button.rename" : "Rename",
      "button.random" : "Randomize",
      "button.togglelocked" : "Toggle Locked",
      "option.togglelocked" : "Show 'Toggle Locked' button?",
      "option.randombutton" : "Show 'Randomize' button?",
      "button.descriptions" : "Descriptions"
    },
    "de" : {
      "plugin.name" : "Ausr&uuml;stungen",
      "button.sets" : "S&auml;tze",
      "button.save" : "Speichern",
      "button.load" : "Ausr&uuml;sten",
      "button.clear" : "Zur&uuml;cksetzen",
      "prompt.setname" : "Name der Ausr&uuml;stung: ",
      "set.basename" : "Ausr&uuml;stung",
      "button.rename" : "Umbenennen",
      "button.random" : "Zufallsausr&uuml;stung",
      "button.togglelocked" : "Gesperrt umschalten",
      "option.togglelocked" : "Button 'Gesperrt umschalten' anzeigen?",
      "option.randombutton" : "Button 'Zufallsausr&uuml;stung' anzeigen?",
      "button.descriptions" : "Descriptions"
    }
  },

  configFlags : [
    ["option.randombutton", 0]
  ],

  cssAddRule : function (selector, styles, sheet) {
    // From jquery.addrule.js 0.0.1 - https://gist.github.com/yckart/5563717/
    styles = (function (styles) {
      if (typeof styles === "string") {
        return styles;
      }
      var clone = "",
      val = "",
      p = "";
      for (p in styles) {
        if (styles.hasOwnProperty(p)) {
          val = styles[p];
          p = p.replace(/([A-Z])/g, "-$1").toLowerCase(); // convert to dash-case
          clone += p + ":" + (p === "content" ? '"' + val + '"' : val) + "; ";
        }
      }
      return clone;
    }
      (styles));
    sheet = sheet || document.styleSheets[document.styleSheets.length - 1];
    if (sheet.insertRule)
      sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
    else if (sheet.addRule)
      sheet.addRule(selector, styles);
    return this;
  },

  init : function (instance) {
    if (!instance.storage('loadout.set1.name')) {
      instance.storage('loadout.set1.name', instance.t("set.basename") + " 1");
    }
    if (!instance.storage('loadout.set2.name')) {
      instance.storage('loadout.set2.name', instance.t("set.basename") + " 2");
    }
    if (!instance.storage('loadout.set3.name')) {
      instance.storage('loadout.set3.name', instance.t("set.basename") + " 3");
    }
    if (!instance.storage('loadout.set4.name')) {
      instance.storage('loadout.set4.name', instance.t("set.basename") + " 4");
    }

    if (instance.storage('loadout.set1.data')) { instance.storage('loadout.set1.data', null); };
    if (instance.storage('loadout.set2.data')) { instance.storage('loadout.set2.data', null); };
    if (instance.storage('loadout.set3.data')) { instance.storage('loadout.set3.data', null); };
    if (instance.storage('loadout.set4.data')) { instance.storage('loadout.set4.data', null); };

    if (BBLog.cache('mode') === 'bf4') {
      this.handler(instance);
    }
  },

  domchange : function (instance) {
    if (BBLog.cache('mode') === 'bf4') {
      this.handler(instance);
    }
  },

  handler : function (instance) {

    // Game Manager ("Playing on server" bar) button and menu.
    if ($('#loadout-sets-ugm-menu').length && !$('.ugm-btn-group').length) {
      $('#loadout-sets-ugm-menu').slideUp("fast").remove();
    }

    if (!$('.loadout-sets-ugm').length && $('.ugm-btn-group').length) {
      var cdnpath = Surface.globalContext.staticPrefix;

      $('#ugm-playing-meta-data').removeClass('span7').addClass('span6');
      $('#ugm-action-buttons').removeClass('span5').addClass('span6');

      $('.ugm-btn-group').prepend(
        '<a class="btn btn-clean loadout-sets-ugm">' +
        '<i id="icon-sets"></i>' +
        '<span>' + instance.t("button.sets") + '</span>' +
        '</a>');

      $('#unified-game-manager').prepend(
        '<div id="loadout-sets-ugm-menu">' +
        '  <div class="set1 btn btn-small loadout-sets-ugm-load">' + instance.storage('loadout.set1.name') + '</div>' +
        '  <div class="set2 btn btn-small loadout-sets-ugm-load">' + instance.storage('loadout.set2.name') + '</div>' +
        '  <div class="set3 btn btn-small loadout-sets-ugm-load">' + instance.storage('loadout.set3.name') + '</div>' +
        '  <div class="set4 btn btn-small loadout-sets-ugm-load">' + instance.storage('loadout.set4.name') + '</div>' +
        '</div>');

      instance.cssAddRule('.loadout-sets-ugm-load', {
        "display" : "block",
        "margin-top" : "0px",
        "margin-bottom" : "0px",
        "border" : "0px",
        "padding-left" : "25px",
        "padding-right" : "25px",
      });

      instance.cssAddRule('#loadout-sets-ugm-menu', {
        "position" : "absolute",
        "background-color" : "rgba(7,7,7,.6)",
        "vertical-align" : "baseline",
        "margin-bottom" : "50px",
        "padding" : "0px",
        "padding-bottom" : "0px",
        "border" : "0px",
        "bottom" : "0px"
      });

      instance.cssAddRule('#icon-sets', {
        "background" : 'url("' + cdnpath + '/public/loadout/icon-bp.png") center no-repeat'
      });

      $('#icon-sets').css({
        "background" : 'url("' + cdnpath + '/public/loadout/icon-bp.png") center no-repeat'
      });

      $('#loadout-sets-ugm-menu').hide();

      $('.loadout-sets-ugm').click(function () {
        $('#loadout-sets-ugm-menu').slideToggle("fast");
      });

      $('.loadout-sets-ugm-load').click(function () {
        var current_setname = this.className.split(/\s+/)[0];
        var new_loadout_weapons = instance.storage('loadout.' + current_setname + '.weapons');
        var new_loadout_kits = instance.storage('loadout.' + current_setname + '.kits');
        if ( new_loadout_weapons && new_loadout_kits ) {
          new_loadout_weapons = JSON.parse(new_loadout_weapons);
          new_loadout_kits = JSON.parse(new_loadout_kits);
          var loadoutmodel = window.BL.backbone.model_instances.loadoutModel;
          var new_loadout = loadoutmodel.get('loadout');
          new_loadout.weapons = new_loadout_weapons;
          new_loadout.kits = new_loadout_kits;
          loadoutmodel.set({
            loadout : new_loadout
          }).set({
            changed : true
          });
          loadoutmodel.trigger('refresh');
          loadoutmodel.saveLoadout();
          $('#loadout-sets-ugm-menu').slideUp("slow");
        }
      });
    }

    // Loadout page buttons/menus/etc
    if ($('#loadout-actions').length) {
      if (!$('.loadout-edit-sets').length) {

        instance.cssAddRule('#loadout-sets', {
          "float" : "clear",
          "display" : "inline-block",
          "margin-top" : "-8px",
          "margin-bottom" : "16px",
          "margin-left" : "-4px"
        });
        instance.cssAddRule('#loadout-sets .btn', {
          "display" : "block",
          "margin-left" : "4px",
          "width" : "245px"
        });
        instance.cssAddRule('#loadout-sets .loadout-set', {
          "float" : "left"
        });
        instance.cssAddRule('#loadout-sets .loadout-submenu', {
          "margin-left" : "4px",
          "position" : "absolute",
          "background-color" : "rgba(7,7,7,0.9)",
          "z-index" : "500",
          "width" : "245px",
          "padding-top" : "10px",
          "padding-bottom" : "10px"
        });
        instance.cssAddRule('#loadout-sets .loadout-submenu .btn', {
          "border-width" : "0",
          "background-image" : "none"
        });

        $('#loadout-actions').prepend(' <div id="loadout-edit-sets" class="btn btn-small loadout-edit-sets">' +
          instance.t("button.sets") +
          '</div> ');

        $('#loadout-content').before(
          '<div id="loadout-sets">' +
          '<div id="set1" class="set1 loadout-set">' +
          '  <div class="set1 btn btn-small loadout-load">' + instance.storage('loadout.set1.name') + '</div>' +
          '  <div class="loadout-submenu">' +
          '    <div class="set1 btn btn-small loadout-save">' + instance.t("button.save") + '</div>' +
          '    <div class="set1 btn btn-small loadout-clear">' + instance.t("button.clear") + '</div>' +
          '    <div class="set1 btn btn-small loadout-rename">' + instance.t("button.rename") + '</div>' +
          '  </div>' +
          '</div>' +
          '<div id="set2" class="set2 loadout-set">' +
          '  <div class="set2 btn btn-small loadout-load">' + instance.storage('loadout.set2.name') + '</div>' +
          '  <div class="loadout-submenu">' +
          '    <div class="set2 btn btn-small loadout-save">' + instance.t("button.save") + '</div>' +
          '    <div class="set2 btn btn-small loadout-clear">' + instance.t("button.clear") + '</div>' +
          '    <div class="set2 btn btn-small loadout-rename">' + instance.t("button.rename") + '</div>' +
          '  </div>' +
          '</div>' +
          '<div id="set3" class="set3 loadout-set">' +
          '  <div class="set3 btn btn-small loadout-load">' + instance.storage('loadout.set3.name') + '</div>' +
          '  <div class="loadout-submenu">' +
          '    <div class="set3 btn btn-small loadout-save">' + instance.t("button.save") + '</div>' +
          '    <div class="set3 btn btn-small loadout-clear">' + instance.t("button.clear") + '</div>' +
          '    <div class="set3 btn btn-small loadout-rename">' + instance.t("button.rename") + '</div>' +
          '  </div>' +
          '</div>' +
          '<div id="set4" class="set4 loadout-set">' +
          '  <div class="set4 btn btn-small loadout-load">' + instance.storage('loadout.set4.name') + '</div>' +
          '  <div class="loadout-submenu">' +
          '    <div class="set4 btn btn-small loadout-save">' + instance.t("button.save") + '</div>' +
          '    <div class="set4 btn btn-small loadout-clear">' + instance.t("button.clear") + '</div>' +
          '    <div class="set4 btn btn-small loadout-rename">' + instance.t("button.rename") + '</div>' +
          '  </div>' +
          '</div>' +
          '</div>');

        // Start the menus out hidden.
        $('#loadout-sets .loadout-submenu').hide();

        $('#loadout-edit-sets').click(function () {
          $('.loadout-submenu').slideToggle("slow");
        });

        $('#loadout-sets .loadout-rename').click(function () {
          var current_setname = this.className.split(/\s+/)[0];
          var oldname = instance.storage('loadout.' + current_setname + '.name');
          var newname = prompt(instance.t("prompt.setname"), oldname);
          instance.storage('loadout.' + current_setname + '.name', newname ? newname : oldname);
          $("#loadout-sets ." + current_setname + ".loadout-load").text(instance.storage('loadout.' + current_setname + '.name'));
          $("#loadout-sets-ugm-menu ." + current_setname + ".loadout-sets-ugm-load").text(instance.storage('loadout.' + current_setname + '.name'));
        });

        $('#loadout-sets .loadout-save').click(function () {
          var current_setname = this.className.split(/\s+/)[0];
          var loadoutmodel = window.BL.backbone.get({
              model : {
                name : 'loadoutModel'
              }
            });
          var current_loadout_weapons = JSON.stringify(loadoutmodel.get('loadout').weapons);
          var current_loadout_kits = JSON.stringify(loadoutmodel.get('loadout').kits);
          instance.storage('loadout.' + current_setname + '.weapons', current_loadout_weapons);
          instance.storage('loadout.' + current_setname + '.kits', current_loadout_kits);
        });

        $('#loadout-sets .loadout-load').click(function () {
          var current_setname = this.className.split(/\s+/)[0];
          var new_loadout_weapons = instance.storage('loadout.' + current_setname + '.weapons');
          var new_loadout_kits = instance.storage('loadout.' + current_setname + '.kits');
          if ( new_loadout_weapons && new_loadout_kits ) {
            new_loadout_weapons = JSON.parse(new_loadout_weapons);
            new_loadout_kits = JSON.parse(new_loadout_kits);
            var loadoutmodel = window.BL.backbone.model_instances.loadoutModel;
            var new_loadout = loadoutmodel.get('loadout');
            new_loadout.weapons = new_loadout_weapons;
            new_loadout.kits = new_loadout_kits;
            loadoutmodel.set({
              loadout : new_loadout
            }).set({
              changed : true
            });
            loadoutmodel.trigger('refresh');
          }
        });

        $('#loadout-sets .loadout-clear').click(function () {
          var current_setname = this.className.split(/\s+/)[0];
          instance.storage('loadout.' + current_setname + '.weapons', null);
          instance.storage('loadout.' + current_setname + '.kits', null);
        });

        if (instance.storage("option.randombutton")) {
          $('#loadout-actions').prepend(' <div id="loadout-random" class="btn btn-small loadout-random">' + instance.t("button.random") + '</div> ');
          $('#loadout-actions .loadout-random').click(function () {
            window.BL.backbone.model_instances.loadoutModel.randomize();
          });
        }
      }

      if ($('.item-info-icon').length && !$('#loadout-toggle-ItemInfo').length) {
        $('#grid-controls .toggle-button').append('<div id="loadout-toggle-ItemInfo" class="btn btn-tiny">' + instance.t("button.descriptions") + '</div>');
        $('#loadout-toggle-ItemInfo').click(function () {
          $('.items-select-item').toggleClass('show-item-desc');
        });
      }
    }
  }
});
