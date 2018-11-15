/**
 * yy.insight-1.0.0.js
 *
 * changelog
 * 2013-12-31[16:11:51]:copyright
 * 2018-11-15[21:53:47]:umd
 *
 * @author yanni4night#gmail.com
 * @version 1.0.0
 * @since 0.1.0
 */
export default function insight(imgSrc, options) {
  options = options || {};
  var defaultOptions = {
    zIndex: 10000,
    ctrlPanelPosition: "NE", //Or NW or SW or SE
    hideonload: true,
    hotkeysEnabled: true,
    navButtonsEnabled: true,
    bigStep: 5,
    css: {}
  };

  function getStyle(ele, name) {
    return window.getComputedStyle
      ? window.getComputedStyle(ele, null)[name]
      : ele.currentStyle[name];
  }

  function bindEvent(ele, evt, func) {
    if (document.addEventListener) {
      ele.addEventListener(evt, func, false);
    } else {
      ele.attachEvent("on" + evt, func);
    }
  }

  //Load options
  for (var i in defaultOptions) {
    options[i] = undefined === options[i] ? defaultOptions[i] : options[i];
  }
  //Check options.ctrlPanelPosition
  if (!/(NE|NW|SW|SE)/.test(options.ctrlPanelPosition)) {
    options.ctrlPanelPosition = options.ctrlPanelPosition.ctrlPanelPosition;
  }

  //Half-opacity div
  var div = document.createElement("div");

  div.style.display = options.hideonload ? "none" : "block";
  div.style.position = "absolute";

  div.style.zIndex = options.css.zIndex || 10000;
  div.style.width = options.css.width || "100%";
  div.style.height = options.css.height || "100%";
  div.style.left = 0;
  div.style.top = 0;
  div.style.background = "url(" + imgSrc + ") left top no-repeat";
  for (var e in options.css) {
    if (options.css.hasOwnProperty(e)) {
      div.style[e] = options.css[e];
    }
  }

  //Show or hide
  var toggle = function() {
    if ("none" == div.style.display) {
      div.style.display = "block";
      for (var i in navBtns) {
        navBtns[i].disabled = "";
      }
    } else {
      div.style.display = "none";
      for (var i in navBtns) {
        navBtns[i].disabled = "disabled";
      }
    }
  };
  //With buttons
  var ctrldiv = document.createElement("div");
  var ctrldivPosCssText;
  switch (options.ctrlPanelPosition) {
    case "NE":
      ctrldivPosCssText = "right:0;top:0;";
      break;
    case "NW":
      ctrldivPosCssText = "left:0;top:0;";
      break;
    case "SE":
      ctrldivPosCssText = "right:0;bottom:0;";
      break;
    case "SW":
      ctrldivPosCssText = "left:0;bottom:0;";
      break;
  }
  ctrldiv.style.cssText =
    "width:100px;height:100px;position:fixed;_position:absolute;" +
    ctrldivPosCssText +
    "z-index:" +
    ((1 + options.zIndex) | 0);

  var navBtnConfig = [
    {
      left: 0,
      top: 35,
      text: "A",
      cmd: "left"
    },
    {
      right: 0,
      top: 35,
      text: "D",
      cmd: "right"
    },
    {
      left: 35,
      top: 0,
      text: "W",
      cmd: "up"
    },
    {
      left: 35,
      bottom: 0,
      text: "S",
      cmd: "down"
    }
  ];
  //Four navigation buttons
  var navBtns = [];

  if (options.navButtonsEnabled) {
    for (var i in navBtnConfig) {
      var btn = document.createElement("button");
      options.hideonload && (btn.disabled = "disabled");
      btn.style.cssText =
        "position:absolute;" +
        (navBtnConfig[i].left === undefined
          ? "right:" + navBtnConfig[i].right
          : "left:" + navBtnConfig[i].left) +
        "px;width:30px;height:30px;" +
        (navBtnConfig[i].top === undefined
          ? "bottom:" + navBtnConfig[i].bottom
          : "top:" + navBtnConfig[i].top) +
        "px;";
      btn.innerHTML = navBtnConfig[i].text;

      navBtns.push(btn);
      btn.onclick = (function(cmd) {
        return function(e) {
          move.call(div, cmd);
        };
      })(navBtnConfig[i].cmd);
      ctrldiv.appendChild(btn);
    }
  }

  var toggleBtn = document.createElement("button");
  toggleBtn.style.cssText =
    "width:30px;height:30px;position:absolute;right:35px;top:35px;";
  toggleBtn.innerHTML = "G";

  toggleBtn.onclick = function(e) {
    toggle();
  };
  ctrldiv.appendChild(toggleBtn);

  //Move the half-opacity div
  var move = function(direction, step) {
    if ("none" == this.style.display) return;

    if (!+step) {
      step = 1;
    }

    if (/(left|right)/i.test(direction)) {
      var left = parseInt(getStyle(this, "left"));
      left = "left" == direction ? left - step : left + step;
      this.style.left = left + "px";
    } else if (/(up|down)/i.test(direction)) {
      var top = parseInt(getStyle(this, "top"));
      top = "up" == direction ? top - step : top + step;
      this.style.top = top + "px";
    }
  };

  options.hotkeysEnabled &&
    bindEvent(document, "keydown", function(e) {
      e = e || window.event;
      switch (e.keyCode) {
        case 65: //left
          move.call(div, "left", e.shiftKey ? options.bigStep : 1);
          break;
        case 87: //up
          move.call(div, "up", e.shiftKey ? options.bigStep : 1);
          break;
        case 68: //right
          move.call(div, "right", e.shiftKey ? options.bigStep : 1);
          break;
        case 83: //down
          move.call(div, "down", e.shiftKey ? options.bigStep : 1);
          break;
        case 71: //toggle
          toggle();
          break;
        default:
      }
    });
  document.body.appendChild(div);
  document.body.appendChild(ctrldiv);
}
