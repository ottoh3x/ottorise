!(function e() {
  if ("?vanilla" === location.search) return;
  {
    let s = "https://vanis.io/zimek-is-a-pedophile";
    location.href !== s && (location.href = s);
  }
  window.customModal = (e, s) => {
    document.getElementsByClassName("fa-clipboard-list")[0].click(),
      setTimeout(() => {
        (document
          .getElementsByClassName("content fade-box")[0]
          .getElementsByTagName("div")[0].innerHTML = e),
          s && setTimeout(s, 50);
      }, 50);
  };
  class i {
    constructor(e, s) {
      if (((this.view = null), e instanceof DataView)) this.view = e;
      else {
        if (!(e instanceof ArrayBuffer))
          throw TypeError(
            "First argument to SmartBuffer constructor must be an ArrayBuffer or DataView"
          );
        this.view = new DataView(e);
      }
      this.offset = s ?? 0;
    }
    ensureCapacity(e) {
      let s = this.offset + e;
      if (s > this.length) {
        let i = new ArrayBuffer(s),
          a = new Uint8Array(i);
        a.set(new Uint8Array(this.buffer)), (this.view = new DataView(i));
      }
    }
    static fromSize(e) {
      return new this(new ArrayBuffer(e), 0);
    }
    static fromBuffer(e) {
      return new this(e, 0);
    }
    get buffer() {
      return this.view?.buffer ?? null;
    }
    toBuffer() {
      return this.buffer;
    }
    get length() {
      return this.view?.byteLength ?? -1;
    }
    get eof() {
      return this.offset >= this.length;
    }
    read(e, s, i, a) {
      let n = e.call(this.view, a ?? this.offset, i);
      return a || (this.offset += s), n;
    }
    write(e, s, i, a) {
      this.ensureCapacity(s),
        e.call(this.view, this.offset, i, a),
        (this.offset += s);
    }
    readInt8 = (e) => this.read(DataView.prototype.getInt8, 1, null, e);
    readUInt8 = (e) => this.read(DataView.prototype.getUint8, 1, null, e);
    readInt16LE = (e) => this.read(DataView.prototype.getInt16, 2, !0, e);
    readInt16BE = (e) => this.read(DataView.prototype.getInt16, 2, !1, e);
    readUInt16LE = (e) => this.read(DataView.prototype.getUint16, 2, !0, e);
    readUInt16BE = (e) => this.read(DataView.prototype.getUint16, 2, !1, e);
    readInt32LE = (e) => this.read(DataView.prototype.getInt32, 4, !0, e);
    readInt32BE = (e) => this.read(DataView.prototype.getInt32, 4, !1, e);
    readUInt32LE = (e) => this.read(DataView.prototype.getUint32, 4, !0, e);
    readUInt32BE = (e) => this.read(DataView.prototype.getUint32, 4, !1, e);
    readString16() {
      let e = "";
      for (;;) {
        let s = this.eof ? 0 : this.readUInt16LE();
        if (0 === s) break;
        e += String.fromCharCode(s);
      }
      return e;
    }
    readString() {
      let e = "";
      for (;;) {
        let s = this.eof ? 0 : this.readUInt8();
        if (0 === s) break;
        e += String.fromCharCode(s);
      }
      return e;
    }
    readEscapedString = () => decodeURIComponent(escape(this.readString()));
    writeInt8 = (e) => this.write(DataView.prototype.setInt8, 1, e, null);
    writeUInt8 = (e) => this.write(DataView.prototype.setUint8, 1, e, null);
    writeInt16LE = (e) => this.write(DataView.prototype.setInt16, 2, e, !0);
    writeInt16BE = (e) => this.write(DataView.prototype.setInt16, 2, e, !1);
    writeUInt16LE = (e) => this.write(DataView.prototype.setUint16, 2, e, !0);
    writeUInt16BE = (e) => this.write(DataView.prototype.setUint16, 2, e, !1);
    writeInt32LE = (e) => this.write(DataView.prototype.setInt32, 4, e, !0);
    writeInt32BE = (e) => this.write(DataView.prototype.setInt32, 4, e, !1);
    writeUInt32LE = (e) => this.write(DataView.prototype.setUint32, 4, e, !0);
    writeUInt32BE = (e) => this.write(DataView.prototype.setUint32, 4, e, !1);
    writeString(e) {
      let s = e.length;
      this.ensureCapacity(s);
      for (let i = 0; i < s; i++) this.writeUInt8(e.charCodeAt(i));
    }
    writeStringNT(e) {
      this.writeString(e), this.writeUInt8(0);
    }
    writeEscapedString = (e) =>
      this.writeString(unescape(encodeURIComponent(e)));
    writeEscapedStringNT = (e) =>
      this.writeStringNT(unescape(encodeURIComponent(e)));
  }
  window.SmartBuffer = i;
  let a = [5, 104, 253, 62, 175, 116, 238, 41];
  class n {
    constructor(e) {
      this.data = e;
    }
    writeIndex(e, s) {
      let i = this.data[s],
        n = (i + 5) & 7,
        r = e[s > 0 ? s - 1 : 0] ^ a[s];
      e.push((((i << n) | (i >>> (8 - n))) & 255) ^ r ^ 62);
    }
    build(e = !1) {
      let s = [];
      for (let i = 0; i < 8; i++) this.writeIndex(s, i);
      let a = 1 + Math.floor(2147483646 * Math.random());
      return (
        s.push((s[0] ^ (a >> 24)) & 255),
        s.push((s[1] ^ (a >> 16)) & 255),
        s.push((s[2] ^ (a >> 8)) & 255),
        s.push((a ^ s[3]) & 255),
        s.push(s[0] ^ +e ^ 31),
        s
      );
    }
  }
  let r = "?fps" === location.search;
  r && (document.title = "Vanis.io - @discord.me/axoninf");
  class o extends PIXI.Graphics {
    constructor(e, s, i) {
      super();
      var a = (this.lineWidth = s || 12),
        n = (this.lineColor = i || 16777215);
      (this.points = e),
        this.lineStyle(a, n),
        (this.alpha = 0.35),
        this.moveTo(e[0], e[1]),
        this.lineTo(e[2], e[3]);
    }
    updatePoints(e) {
      try {
        var s = (this.points = e.map((e, s) => e || this.points[s])),
          i = this.lineWidth,
          a = this.lineColor;
        window.cancerLines || this.clear(),
          this.lineStyle(i, a),
          this.moveTo(s[0], s[1]),
          this.lineTo(s[2], s[3]);
      } catch (n) {}
    }
  }
  (window.TagColor = {
    isNull: 0,
    array: ["#69ff91", "#69fff0", "#696bff", "#ff69f3", "#ffdc69", "#ff6969"],
  }),
    (window.TagColor.null = "#ffffff");
  var l = [0.79, 1.52, 2.35, 3, 3.92, 4.7, 5.5, 6.2];
  function c(e) {
    for (var s = 9e9, i = 0, a = 0; e.length < a; a++)
      e[a].id < s && ((i = a), (s = e[a].id));
    return e.splice(i, 1), e;
  }
  (String.prototype.toHHMMSS = function () {
    var e = parseInt(this, 10),
      s = Math.floor(e / 3600),
      i = Math.floor((e - 3600 * s) / 60);
    return `${0 !== i ? `${i}m ` : ""}${e - 3600 * s - 60 * i}s`;
  }),
    (window.makeid = (e) => {
      for (var s = "", i = "X0123456789", a = i.length, n = 0; n < e; n++)
        s += i.charAt(Math.floor(Math.random() * a));
      return s;
    }),
    (window.$ = (e, s = document) => s.querySelector(e)),
    (window.extraServers = [
      {
        name: "Local:8080",
        domain: "localhost",
        port: 8080,
        mode: "Instant",
        players: "0",
        slots: "00",
        region: "EU",
        url: "ws://localhost:8080",
      },
    ]),
    (function (e) {
      var s,
        i =
          ((s = !0),
          function (e, i) {
            var a = s
              ? function () {
                  if (i) {
                    var s = i.apply(e, arguments);
                    return (i = null), s;
                  }
                }
              : function () {};
            return (s = !1), a;
          });
      function a(s) {
        var a = i(this, function () {
          var e = function () {
            return !e
              .constructor('return /" + this + "/')()
              .constructor("^([^ ]+( +[^ ]+)+)+[^ ]}")
              .test(a);
          };
          return e();
        });
        a();
        for (
          var r, c, d = s[0], h = s[1], u = s[2], v = 0, m = [];
          v < d.length;
          v++
        )
          (c = d[v]),
            Object.prototype.hasOwnProperty.call(o, c) &&
              o[c] &&
              m.push(o[c][0]),
            (o[c] = 0);
        for (r in h)
          Object.prototype.hasOwnProperty.call(h, r) && (e[r] = h[r]);
        for (p && p(s); m.length; ) m.shift()();
        return l.push.apply(l, u || []), n();
      }
      function n() {
        for (var e, s = 0; s < l.length; s++) {
          for (var i = l[s], a = !0, n = 1; n < i.length; n++)
            0 !== o[i[n]] && (a = !1);
          a && (l.splice(s--, 1), (e = c((c.s = i[0]))));
        }
        return e;
      }
      var r = {},
        o = { 0: 0 },
        l = [];
      function c(s) {
        if (r[s]) return r[s].exports;
        var i = (r[s] = { i: s, l: !1, exports: {} });
        return e[s].call(i.exports, i, i.exports, c), (i.l = !0), i.exports;
      }
      (window.getModule = c),
        (c.m = e),
        (c.c = r),
        (c.d = function (e, s, i) {
          c.o(e, s) || Object.defineProperty(e, s, { enumerable: !0, get: i });
        }),
        (c.r = function (e) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (c.t = function (e, s) {
          if (
            (1 & s && (e = c(e)),
            8 & s || (4 & s && "object" == typeof e && e && e.__esModule))
          )
            return e;
          var i = Object.create(null);
          if (
            (c.r(i),
            Object.defineProperty(i, "default", { enumerable: !0, value: e }),
            2 & s && "string" != typeof e)
          )
            for (var a in e)
              c.d(
                i,
                a,
                function (s) {
                  return e[s];
                }.bind(null, a)
              );
          return i;
        }),
        (c.n = function (e) {
          var s =
            e && e.__esModule
              ? function () {
                  return e.default;
                }
              : function () {
                  return e;
                };
          return c.d(s, "a", s), s;
        }),
        (c.o = function (e, s) {
          return Object.prototype.hasOwnProperty.call(e, s);
        }),
        (c.p = "");
      var d = (window.webpackJsonp = window.webpackJsonp || []),
        h = d.push.bind(d);
      (d.push = a), (d = d.slice());
      for (var u = 0; u < d.length; u++) a(d[u]);
      var p = h;
      l.push([118, 1]), n();
    })([
      ,
      function (e, s, a) {
        let n = a(4),
          r = a(24),
          o = a(121),
          l = a(125),
          c = a(12),
          d = a(23),
          h = a(128),
          { lerp: u, hideCaptchaBadge: p } = a(8),
          v = (window.GAME = { ws: { close() {} } });
        function m(e, s) {
          for (; e.length; ) e.pop().destroy(s);
        }
        (GAME.killCount = 0),
          (GAME.timeAlive = 0),
          (v.clientVersion = 19),
          (v.events = new d()),
          (v.settings = n),
          (v.renderer = r),
          (v.usingWebGL = r.type === PIXI.RENDERER_TYPE.WEBGL),
          (v.skinLoader = new h()),
          c.virus.loadVirusFromUrl(n.virusImageUrl),
          (v.state = {
            connectionUrl: null,
            selectedServer: null,
            allowed: !1,
            spectators: 0,
            isAlive: !1,
            playButtonDisabled: !1,
            playButtonText: "Play",
            deathDelay: !1,
            isAutoRespawning: !1,
          }),
          (document.body.oncontextmenu = function (e) {
            return e.target && "email" === e.target.id;
          }),
          (v.start = function (e) {
            if (
              ((v.initData = e),
              !(e.protocol && e.instanceSeed && e.playerId && e.border))
            )
              throw "Lacking mandatory data";
            (v.nwDataMax = 0),
              (v.nwDataSent = 0),
              (v.nwDataTotal = 0),
              (v.nwData = 0),
              (v.viruses = { 1: [], 2: [] }),
              (v.running = !0),
              (v.replaying = !!e.replayUpdates),
              (v.protocol = e.protocol),
              (v.modeId = e.gamemodeId || 0),
              (v.instanceSeed = e.instanceSeed),
              (v.pingstamp = 0),
              (v.timestamp = 0),
              (v.serverTick = 0),
              (v.playerId = e.playerId),
              (v.multiboxPid = null),
              (v.activePid = v.playerId),
              (v.tagId = null),
              (v.spectating = !1),
              (v.state.spectators = 0),
              (v.state.isAlive = !1),
              (v.score = 0),
              (v.cellCount = 0),
              (v.nodes = {}),
              (v.nodesOwn = {}),
              (v.nodelist = []),
              (v.multinodelist = []),
              (v.removedNodes = []),
              (v.rawMouse = {}),
              (v.mouse = {}),
              (v.border = e.border),
              (v.food = e.food),
              (v.mouseZoom = 0.3),
              (v.mouseZoomMin = 0.01),
              (v.camera = {
                time: 0,
                sx: 0,
                sy: 0,
                ox: e.border.x,
                nx: e.border.x,
                oy: e.border.y,
                ny: e.border.y,
                oz: v.mouseZoom,
                nz: v.mouseZoom,
              }),
              (v.massTextPool = []),
              (v.crownPool = []);
            var s =
              PIXI.utils.isWebGLSupported() &&
              n.useWebGL &&
              n.showBackgroundImage;
            (v.scene = new o(v, v.border, s)),
              v.scene.container.pivot.set(e.border.x, e.border.y),
              v.scene.container.scale.set(v.zoom),
              (v.playerManager = new l(v)),
              (v.ticker = new PIXI.Ticker()),
              v.ticker.add(v.tick),
              v.state.selectedServer &&
                v.state.connectionUrl !== v.state.selectedServer.url &&
                (v.state.selectedServer = null),
              v.replaying
                ? (v.playback.set(e.replayUpdates),
                  (v.moveInterval = setInterval(v.playback.next, 40)),
                  v.events.$emit(
                    "show-replay-controls",
                    e.replayUpdates.length
                  ),
                  v.events.$emit("minimap-stats-visible", !1))
                : ((v.splitCount = 0),
                  (v.moveWaitUntil = 0),
                  (v.stopMovePackets = !1),
                  (v.moveToCenterOfCells = !1),
                  (v.mouseFrozen = !1),
                  n.minimapEnabled && v.events.$emit("minimap-show"),
                  n.showChat && v.events.$emit("chat-visible", { visible: !0 }),
                  v.events.$emit("leaderboard-show"),
                  v.events.$emit("stats-visible", !0),
                  (v.moveInterval = setInterval(() => {
                    v.stopMovePackets ||
                      (v.moveToCenterOfCells
                        ? v.connection.sendOpcode(9)
                        : v.connection.sendMouse());
                  }, 40)),
                  v.events.$on("every-second", v.everySecond),
                  (v.state.allowed = !0),
                  (v.lastDeathTime = Date.now())),
              v.ticker.start(),
              v.eventListeners(!0),
              v.events.$emit("game-started"),
              (v.scene.container.alpha = window.settings.gameAlpha);
          }),
          (v.updateStats = function (e) {
            (v.ping = e),
              v.events.$emit("stats-changed", {
                ping: e,
                fps: Math.round(v.ticker.FPS),
                mass: v.score,
                score: v.highscore,
              }),
              v.events.$emit("minimap-stats-changed", {
                playerCount: v.playerManager.playerCount,
                spectators: v.state.spectators,
              });
          }),
          (v.everySecond = function () {
            if (
              (GAME.alive(!1) && GAME.timeAlive++,
              v.nwData > v.nwDataMax && (v.nwDataMax = v.nwData),
              (v.nwDataTotal += v.nwData),
              (v.settings.debugStats || v.settings.clientStats) &&
                1 == v.ws.readyState &&
                v.debugElement)
            ) {
              var e = Multibox.connected(),
                s = "";
              v.settings.debugStats &&
                (s += `
            <b>(NET)</b> ${(v.nwData / 1024).toFixed(0)} Kb/s <br>
            <b>(NET PEAK)</b> ${(v.nwDataMax / 1024).toFixed(0)} Kb/s <br>
            <b>(NET TOTAL)</b> ${(v.nwDataTotal / 1024 / 1024).toFixed(
              0
            )} MB <br>
            <br>`),
                v.settings.clientStats &&
                  (s += `
        <b>(MOUSE)</b> ${v.mouse.x.toFixed(0)} ${v.mouse.y.toFixed(0)} <br>
        ${e ? `<b>(DUAL PID)</b> ${v.multiboxPid} <br>` : ""}
        <b>(PID)</b> ${v.playerId} <br>
        <b>(NODES)</b> ${v.nodelist.length} <br>
        `),
                GAME.replaying && (s = ""),
                (v.debugElement.innerHTML = s);
            } else
              v.debugElement &&
                "" !== v.debugElement.innerHTML &&
                (v.debugElement.innerHTML = "");
            (v.nwData = 0),
              (v.app.showMenu || v.app.showDeathScreen) && v.updateStats(null),
              1 == v.ws.readyState &&
                (v.pingstamp = Date.now()) &&
                v.connection.sendOpcode(3),
              Multibox.connected() &&
                Multibox.updateCamera() &&
                v.connection.sendOpcode(3, !0);
          }),
          (v.clearNodes = function (e) {
            if (v.nodelist) {
              for (; v.nodelist.length; ) v.nodelist[0].destroy();
              for (; v.removedNodes.length; )
                v.removedNodes.pop().destroySprite();
              for (; e ? v.viruses[2].length : v.viruses[1].length; )
                v.viruses[e ? "2" : "1"][0].destroy();
            }
          }),
          (v.stop = function () {
            (v.running = !1),
              (v.state.isAlive = !1),
              (v.state.spectators = 0),
              (v.state.allowed = !1),
              (v.state.playButtonDisabled = !1),
              (v.state.playButtonText = "Play"),
              v.eventListeners(!1),
              delete v.running,
              delete v.protocol,
              delete v.modeId,
              delete v.initialDataPacket,
              delete v.instanceSeed,
              delete v.pingstamp,
              delete v.timestamp,
              delete v.serverTick,
              delete v.playerId,
              delete v.multiboxPid,
              delete v.activePid,
              delete v.tagId,
              delete v.spectating,
              delete v.center,
              delete v.score,
              delete v.highscore,
              delete v.cellCount,
              delete v.replaying,
              v.clearNodes(),
              delete v.nodes,
              delete v.nodesOwn,
              delete v.nodelist,
              delete v.removedNodes,
              delete v.rawMouse,
              delete v.mouse,
              delete v.border,
              delete v.mouseZoom,
              delete v.mouseZoomMin,
              delete v.camera,
              v.ticker.stop(),
              delete v.ticker,
              delete v.splitCount,
              delete v.moveWaitUntil,
              delete v.stopMovePackets,
              delete v.moveToCenterOfCells,
              delete v.mouseFrozen,
              delete v.lastDeathTime,
              delete v.selectedPlayer,
              clearInterval(v.moveInterval),
              delete v.moveInterval,
              v.playback.reset(),
              v.events.$off("every-second", v.everySecond),
              v.skinLoader.clearCallbacks(),
              v.events.$emit("minimap-stats-visible", !0),
              v.events.$emit("stats-visible", !1),
              v.events.$emit("chat-visible", { visible: !1 }),
              v.events.$emit("leaderboard-hide"),
              v.events.$emit("minimap-hide"),
              v.events.$emit("minimap-destroy"),
              v.events.$emit("show-replay-controls", !1),
              v.events.$emit("cells-changed", 0),
              v.events.$emit("reset-cautions"),
              v.events.$emit("players-menu", !1),
              v.events.$emit("account-menu", !1),
              v.events.$emit("chatbox-menu", !1),
              v.events.$emit("options-menu", !1),
              v.events.$emit("replays-menu", !1),
              v.events.$emit("game-stopped"),
              v.playerManager.destroy(),
              delete v.playerManager,
              v.scene &&
                (v.scene.destroyBackgroundImage(!1),
                v.scene.uninstallMassTextFont(),
                v.scene.container.destroy({ children: !0 }),
                delete v.scene),
              v.renderer.clear(),
              c.cells.destroyCache(),
              c.squares.destroyCache(),
              m(v.massTextPool, !0),
              m(v.crownPool),
              delete v.massTextPool,
              delete v.crownPool;
          }),
          (v.showMenu = function (e, s) {
            if (
              (null == e && (s = e = !v.app.showMenu), (v.app.showMenu = e), e)
            )
              v.events.$emit("menu-opened"),
                s && setTimeout(() => v.app.showMenu, 1500);
            else {
              let i = document.activeElement;
              i?.id !== "chatbox-input" && v.renderer.view.focus(),
                (v.stopMovePackets = !1),
                p();
            }
            return e;
          }),
          (v.triggerDeathDelay = function (e) {
            clearTimeout(v.deathTimeout), delete v.deathTimeout;
            let { state: s } = v;
            if (
              (e
                ? (Multibox.autoRespawning = !1)
                : ((s.deathDelay = !1), (s.isAutoRespawning = !1)),
              !n.mbAutorespawn && !n.autoRespawn)
            ) {
              let i = [];
              i.push(`Kills: ${v.killCount}`),
                i.push(`Time alive: ${v.timeAlive.toString().toHHMMSS()}`),
                i.push(
                  `Highscore: ${v.highscore
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                ),
                ($(".bar").innerHTML = i.join("<br>")),
                (v.highscore = 0),
                (v.killCount = 0),
                (v.timeAlive = 0),
                v.showMenu(!0);
            }
          }),
          (v.handleDeath = function (e, s) {
            let a = new i(e);
            a.offset++,
              a.readUInt16LE(),
              (GAME.killCount += a.readUInt16LE()),
              a.readUInt32LE();
            let { state: n } = v;
            if ((s || (n.deathDelay = !0), v.shouldAutoRespawn(s)))
              s
                ? ((Multibox.autoRespawning = !0),
                  (Multibox.ticksSinceDeath = 0))
                : ((n.isAutoRespawning = !0), (v.ticksSinceDeath = 0));
            else {
              let r = Date.now();
              s ? (Multibox.lastDeathTime = r) : (v.lastDeathTime = r);
            }
            (s ? Multibox.autoRespawning : n.isAutoRespawning) ||
              (v.deathTimeout = setTimeout(
                v.triggerDeathDelay.bind(null, s),
                900
              )),
              Multibox.updateOutlines();
          }),
          (v.triggerAutoRespawn = function (e) {
            let { state: s } = v;
            e
              ? ((Multibox.autoRespawning = !1), Multibox.spawn())
              : ((s.deathDelay = !1),
                (s.isAutoRespawning = !1),
                v.actions.join());
          }),
          (v.tick = function () {
            (v.timestamp = performance.now()),
              v.timestamp >= v.moveWaitUntil &&
                (v.updateMouse(), (v.splitCount = 0));
            for (var e = v.removedNodes.length; e--; ) {
              var s = v.removedNodes[e];
              s.update() && (s.destroySprite(), v.removedNodes.splice(e, 1));
            }
            for (var i = 0, a = 0; a < v.nodelist.length; a++) {
              var n = v.nodelist[a];
              n.update(),
                n.player && n.player.isMe && n.pid === v.activePid && i++;
            }
            v.cellCount !== i &&
              ((v.cellCount = i), v.events.$emit("cells-changed", i)),
              GAME.aimbotnodes(),
              v.scene.sort();
            var r = v.updateCamera();
            r
              ? ((v.score = r), (v.highscore = Math.max(r, v.highscore || 0)))
              : (v.score = 0),
              v.renderer.render(v.scene.container);
          }),
          (v.updateCamera = function (e) {
            var s,
              i = v.timestamp - v.camera.time;
            s = Math.min(Math.max(i / n.cameraMoveDelay, 0), 1);
            var a = (v.scene.container.pivot.x = u(
                v.camera.ox,
                v.camera.nx,
                s
              )),
              r = (v.scene.container.pivot.y = u(v.camera.oy, v.camera.ny, s));
            s = Math.min(Math.max(i / n.cameraZoomDelay, 0), 1);
            var o = u(v.camera.oz, v.camera.nz, s);
            v.scene.container.scale.set(o);
            var l = 0,
              c = 0,
              d = 0,
              h = 0,
              p = 0,
              m = v.mouseZoom;
            if (v.spectating) (l = v.camera.sx), (c = v.camera.sy);
            else {
              for (var g in v.nodesOwn) {
                var f = v.nodes[g],
                  y = f.nSize * f.nSize;
                (l += f.nx * y),
                  (c += f.ny * y),
                  (d += y),
                  (h += f.nSize),
                  (p += y / 100);
              }
              d
                ? ((l /= d),
                  (c /= d),
                  n.autoZoom && (m *= Math.pow(Math.min(64 / h, 1), 0.27)))
                : ((l = v.camera.nx), (c = v.camera.ny), (m = v.camera.nz));
            }
            return (
              e &&
                ((v.camera.ox = a),
                (v.camera.oy = r),
                (v.camera.oz = o),
                (v.camera.nx = l),
                (v.camera.ny = c),
                (v.camera.nz = m),
                (v.camera.time = v.timestamp)),
              Math.floor(p)
            );
          }),
          (v.updateMouse = function (e = !1) {
            if (!v.mouseFrozen || e) {
              var s = v.scene.container;
              (v.mouse.x = Math.min(
                Math.max(
                  s.pivot.x +
                    (v.rawMouse.x - window.innerWidth / 2) / s.scale.x,
                  -32768
                ),
                32767
              )),
                (v.mouse.y = Math.min(
                  Math.max(
                    s.pivot.y +
                      (v.rawMouse.y - window.innerHeight / 2) / s.scale.y,
                    -32768
                  ),
                  32767
                ));
            }
          }),
          (v.seededRandom = function (e) {
            var s = Math.sin(e) * (1e4 + v.instanceSeed);
            return s - Math.floor(s);
          }),
          (v.getThumbnail = function () {
            var e = v.scene.container,
              s = new PIXI.Container();
            (s.pivot.x = e.position.x),
              (s.pivot.y = e.position.y),
              (s.position.x = 120),
              (s.position.y = 67.5),
              s.scale.set(1 / 4),
              s.addChild(e);
            var i = PIXI.RenderTexture.create(240, 135);
            v.renderer.render(s, i), s.removeChild(e);
            var a = v.renderer.extract.canvas(i),
              r = document.createElement("canvas");
            (r.width = 240), (r.height = 135);
            var o = r.getContext("2d");
            o.beginPath(),
              o.rect(0, 0, 240, 135),
              (o.fillStyle = n.backgroundColor),
              o.fill(),
              o.drawImage(a, 0, 0, 240, 135);
            var l = r.toDataURL();
            return i.destroy(!0), l;
          }),
          (v.setTagId = function (e) {
            return e || (e = null), e !== v.tagId && ((v.tagId = e), !0);
          }),
          (v.getMassText = function (e) {
            return !n.shortMass || e < 1e3
              ? e.toFixed(0)
              : (e / 1e3).toFixed(1) + "k";
          }),
          (v.shouldAutoRespawn = function (e) {
            return !v.app.showMenu && (e ? n.mbAutorespawn : n.autoRespawn);
          }),
          setInterval(() => v.events.$emit("every-second"), 1e3),
          setInterval(() => v.events.$emit("every-minute"), 6e4),
          v.events.$on("every-minute", () => {}),
          (e.exports = v);
      },
      ,
      ,
      function (e) {
        var s = {
          useWebGL: !0,
          gameResolution: 1,
          smallTextThreshold: 40,
          autoZoom: !1,
          autoRespawn: !1,
          mouseFreezeSoft: !0,
          drawDelay: 120,
          cameraMoveDelay: 150,
          cameraZoomDelay: 150,
          cameraZoomSpeed: 10,
          replayDuration: 8,
          showReplaySaved: 2,
          showNames: 2,
          showMass: 2,
          showSkins: 1,
          showOwnName: !0,
          showOwnMass: !0,
          showOwnSkin: !0,
          showCrown: !0,
          foodVisible: !0,
          eatAnimation: !0,
          showHud: !0,
          showLeaderboard: !0,
          showServerName: !1,
          showChat: !0,
          showChatToast: !1,
          minimapEnabled: !0,
          minimapLocations: !0,
          showFPS: !0,
          showPing: !0,
          showCellCount: !0,
          showPlayerScore: !1,
          showPlayerMass: !0,
          showClock: !1,
          showSessionTime: !1,
          showPlayerCount: !1,
          showSpectators: !1,
          showRestartTiming: !1,
          showBlockedMessageCount: !0,
          filterChatMessages: !0,
          clearChatMessages: !0,
          backgroundColor: "101010",
          borderColor: "000000",
          foodColor: "ffffff",
          ejectedColor: "ffa500",
          cellNameOutlineColor: "000000",
          cursorImageUrl: null,
          backgroundImageUrl: "img/background.png",
          virusImageUrl: "img/virus.png",
          cellMassColor: "ffffff",
          cellMassOutlineColor: "000000",
          cellNameFont: "Hind Madurai",
          cellNameWeight: 1,
          cellNameOutline: 2,
          cellNameSmoothOutline: !0,
          cellLongNameThreshold: 750,
          cellMassFont: "Ubuntu",
          cellMassWeight: 2,
          cellMassOutline: 2,
          cellMassTextSize: 0,
          cellMassSmoothOutline: !0,
          shortMass: !0,
          showBackgroundImage: !0,
          backgroundImageRepeat: !0,
          backgroundDefaultIfUnequal: !0,
          backgroundImageOpacity: 0.6,
          useFoodColor: !1,
          namesEnabled: !0,
          skinsEnabled: !0,
          massEnabled: !0,
          showLocations: !1,
          cellBorderSize: 1,
          autoHideReplayControls: !1,
          minimapSize: 220,
          minimapFPS: 30,
          minimapSmoothing: 0.08,
          mbColor: "ff3bb7",
          mbSkin: "",
          mbActive: 1,
          mbAutorespawn: !1,
          gameAlpha: 1,
          mbName: "",
          mbUseName: !1,
          debugStats: !1,
          clientStats: !1,
          playerStats: !0,
          showCellLines: !1,
          showTag: !1,
          showDir: !1,
          chatColorOnlyPeople: !1,
          mbArrow: "https://i.postimg.cc/6pvLJ2TW/image.png",
        };
        function i(e) {
          switch (e) {
            case 2:
              return "bold";
            case 0:
              return "thin";
            default:
              return "normal";
          }
        }
        function a(e, s) {
          var i;
          switch (e) {
            case 3:
              i = s / 5;
              break;
            case 1:
              i = s / 20;
              break;
            default:
              i = s / 10;
          }
          return Math.ceil(i);
        }
        e.exports = window.settings = new (class {
          constructor() {
            this.getInternalSettings(),
              (this.userDefinedSettings = this.loadUserDefinedSettings()),
              Object.assign(this, s, this.userDefinedSettings),
              this.set("skinsEnabled", !0),
              this.set("namesEnabled", !0),
              this.set("massEnabled", !0),
              this.compileNameFontStyle(),
              this.compileMassFontStyle();
          }
          getInternalSettings() {
            this.cellSize = 512;
          }
          compileNameFontStyle() {
            var e = {
              fontFamily: this.cellNameFont,
              fontSize: 80,
              fontWeight: i(this.cellNameWeight),
            };
            return (
              this.cellNameOutline &&
                ((e.stroke = PIXI.utils.string2hex(this.cellNameOutlineColor)),
                (e.strokeThickness = a(this.cellNameOutline, e.fontSize)),
                (e.lineJoin = this.cellNameSmoothOutline ? "round" : "miter")),
              (this.nameTextStyle = e)
            );
          }
          compileMassFontStyle() {
            var e = {
              fontFamily: this.cellMassFont,
              fontSize: 56 + 20 * this.cellMassTextSize,
              fontWeight: i(this.cellMassWeight),
              lineJoin: "round",
              fill: PIXI.utils.string2hex(this.cellMassColor),
            };
            return (
              this.cellMassOutline &&
                ((e.stroke = PIXI.utils.string2hex(this.cellMassOutlineColor)),
                (e.strokeThickness = a(this.cellMassOutline, e.fontSize)),
                (e.lineJoin = this.cellMassSmoothOutline ? "round" : "miter")),
              (this.massTextStyle = e)
            );
          }
          loadUserDefinedSettings() {
            if (!localStorage.settings) return {};
            try {
              return JSON.parse(localStorage.settings);
            } catch (e) {
              return {};
            }
          }
          getDefault(e) {
            return s[e];
          }
          set(e, s) {
            return (
              this[e] !== s &&
              ((this[e] = s),
              (this.userDefinedSettings[e] = s),
              (localStorage.settings = JSON.stringify(
                this.userDefinedSettings
              )),
              !0)
            );
          }
        })();
      },
      function (e, s, i) {
        var a = i(270).default,
          n = a.mixin({
            toast: !0,
            position: "top",
            showConfirmButton: !1,
            showCloseButton: !0,
          });
        (window.Swal = a),
          (window.SwalAlerts = e.exports =
            {
              toast: n,
              alert: function (e) {
                a.fire({ text: e, confirmButtonText: "OK" });
              },
              confirm: function (e, s, i) {
                a.fire({
                  text: e,
                  showCancelButton: !0,
                  confirmButtonText: "Continue",
                }).then((e) => {
                  e.value ? s() : i && i();
                });
              },
              instance: a,
            });
      },
      ,
      ,
      function (e) {
        var s = !1;
        e.exports = {
          lerp: function (e, s, i) {
            return (1 - i) * e + i * s;
          },
          createBuffer: function (e) {
            return new DataView(new ArrayBuffer(e));
          },
          getTimeString: function (e, s, i) {
            e instanceof Date && (e = e.getTime());
            var a = s ? 1 : 1e3,
              n = 60 * a,
              r = 60 * n;
            if (e < a) return "1 second";
            for (
              var o = [24 * r, r, n, a],
                l = ["day", "hour", "minute", "second"],
                c = !1,
                d = [],
                h = 0;
              h < o.length;
              h++
            ) {
              var u = o[h],
                p = Math.floor(e / u);
              if (p) {
                var v = l[h],
                  m = p > 1 ? "s" : "";
                d.push(p + " " + v + m), (e %= u);
              }
              if (c) break;
              p && !i && (c = !0);
            }
            return d.join(", ");
          },
          htmlEncode: function (e) {
            return (e = e
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/'/g, "&apos;")
              .replace(/"/g, "&quot;"));
          },
          getTimestamp: function () {
            var e = new Date(),
              s = e.getMonth() + 1,
              i = e.getDate();
            return (
              [
                e.getFullYear(),
                (s > 9 ? "" : "0") + s,
                (i > 9 ? "" : "0") + i,
              ].join("") +
              "-" +
              [
                ("0" + e.getHours()).slice(-2),
                ("0" + e.getMinutes()).slice(-2),
                ("0" + e.getSeconds()).slice(-2),
              ].join("")
            );
          },
          loadImage: function (e) {
            return fetch(e, { mode: "cors" })
              .then((e) => e.blob())
              .then((e) => createImageBitmap(e));
          },
          hideCaptchaBadge: function () {
            s || (document.body.classList.add("hide-captcha-badge"), (s = !0));
          },
          destroyPixiPlugins: function (e) {
            ["interaction", "accessibility"].forEach((s) => {
              var i = e.plugins[s];
              i && (i.destroy(), delete e.plugins[s]);
            });
          },
          writePlayerData: function (e, s) {
            var i =
                s && window.settings.mbUseName
                  ? window.settings.mbName
                  : document.getElementById("nickname").value,
              a = s
                ? window.settings.mbSkin
                : document.getElementById("skinurl").value,
              n = document.getElementById("teamtag").value;
            "RISE" == n.toUpperCase() && (n = window.RISETAG),
              e.utf8(i),
              e.utf8(a),
              e.utf8(n);
          },
        };
      },
      ,
      ,
      ,
      function (e, s, i) {
        var a = i(122),
          n = i(123),
          r = i(124);
        e.exports = { cells: a, squares: n, virus: r };
      },
      ,
      function (e, s, i) {
        let a = i(1),
          n = i(4),
          { cells: r } = i(12);
        e.exports = class e {
          constructor(e) {
            (this.game = a),
              (this.id = e.id || 0),
              (this.flags = e.flags),
              (this.oSize = this.size = e.size),
              (this.updateTime = 0),
              (this.newPositionScale = 1),
              (this.removed = !1),
              (this.texture = e.texture || r.getTexture(0)),
              (this.sprite = new PIXI.Sprite(this.texture)),
              this.sprite.anchor.set(0.5),
              (this.sprite.gameData = this),
              (this.x = this.ox = this.sprite.position.x = e.x),
              (this.y = this.oy = this.sprite.position.y = e.y);
          }
          update() {
            let e = a.timestamp - this.updateTime,
              s = Math.min(Math.max(e / n.drawDelay, 0), 1);
            (this.x =
              s * this.newPositionScale * (this.nx - this.ox) + this.ox),
              (this.y =
                s * this.newPositionScale * (this.ny - this.oy) + this.oy);
            let i =
                2 * (this.size = s * (this.nSize - this.oSize) + this.oSize),
              { sprite: r } = this;
            if (!r) return !1;
            let { position: o } = r,
              l = o.x !== this.x || o.y !== this.y || r.width !== i;
            return (
              !!this.texture.clearedFromCache ||
              !l ||
              ((o.x = this.x),
              (o.y = this.y),
              (r.width = r.height = i),
              this.onUpdate?.(),
              !1)
            );
          }
          destroy(e) {
            if (!this.removed) {
              this.onDestroy && this.onDestroy();
              var s = this.isVirus
                  ? this.game.viruses[this.multi ? "2" : "1"]
                  : this.game.nodelist,
                i = s.indexOf(this);
              i >= 0 && s.splice(i, 1),
                delete this.game.nodes[this.id],
                delete this.game.nodesOwn[this.id],
                (this.removed = !0),
                e ? this.game.removedNodes.push(this) : this.destroySprite();
            }
          }
          destroySprite() {
            this.sprite && (this.sprite.destroy(), (this.sprite = null));
          }
        };
      },
      ,
      ,
      function (e, s, i) {
        var a = i(5);
        function n() {
          a.instance.fire({
            type: "warning",
            title: "Browser support limited",
            html: "Skins might not work properly in this browser.<br>Please consider using Chrome.",
            allowOutsideClick: !1,
          });
        }
        function r(e) {
          for (var s = "", i = 0; i < e.length; i++)
            s += String.fromCharCode(e.charCodeAt(i) - 2);
          return s;
        }
        var o = [
            "pkiigt",
            "p3iigt",
            "pkii5t",
            "pkiic",
            "p3iic",
            "p3ii6",
            "pkii",
            "p3ii",
            "p3i",
            "hciiqv",
            "h6iiqv",
            "hcii2v",
            "hci",
            "cpcn",
            "cuujqng",
            "ewpv",
            "rwuu{",
            "xcikpc",
            "xci3pc",
            "eqem",
            "e2em",
            "uewo",
            "ycpm",
            "yjqtg",
            "yj2tg",
            "unwv",
            "dkvej",
            "d3vej",
            "rqtp",
            "r2tp",
            "tcrg",
            "t6rg",
            "jkvngt",
            "j3vngt",
            "jkvn5t",
            "j3vn5t",
            "pc|k",
            "p6|k",
            "tgvctf",
            "ejkpm",
            "hwem",
            "ujkv",
          ],
          l = o.map(r),
          c = o
            .map(r)
            .sort((e, s) => s.length - e.length)
            .map((e) =>
              RegExp("[^s]*" + e.split("").join("s*") + "[^s]*", "gi")
            );
        e.exports = {
          noop: function () {},
          checkBadWords: function (e) {
            return (e = e.toLowerCase()), l.some((s) => e.includes(s));
          },
          replaceBadWordsChat: function (e) {
            for (var s = 0; s < c.length; s++)
              e = e.replace(c[s], (e) => Array(e.length).fill("*").join(""));
            return e;
          },
          notifyUnsupportedBrowser: async function () {
            window.safari ||
            /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
              ? a.instance.fire({
                  type: "warning",
                  title: "Safari browser is not supported :(",
                  html: "Please consider using Google Chrome.",
                  allowOutsideClick: !1,
                  showCloseButton: !1,
                  showCancelButton: !1,
                  showConfirmButton: !1,
                })
              : !localStorage.skipUnsupportedAlert &&
                (((localStorage.skipUnsupportedAlert = !0),
                navigator.userAgent.toLowerCase().includes("edge"))
                  ? n()
                  : (await new Promise((e) => {
                      var s = new Image();
                      (s.src =
                        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"),
                        (s.onload = s.onerror =
                          () => {
                            e(2 === s.height);
                          });
                    })) || n());
          },
          isFirstVisit:
            !localStorage.visitedBefore &&
            ((localStorage.visitedBefore = !0), !0),
        };
      },
      ,
      ,
      ,
      ,
      ,
      ,
      function (e, s, i) {
        var a = i(4),
          n = i(8);
        PIXI.utils.skipHello();
        var r = document.getElementById("canvas"),
          o = {
            resolution: a.customResolution || window.devicePixelRatio || 1,
            view: r,
            forceCanvas: !a.useWebGL,
            antialias: !1,
            powerPreference: "high-performance",
            backgroundColor: PIXI.utils.string2hex(a.backgroundColor),
          };
        o.resolution = a.gameResolution;
        var l = PIXI.autoDetectRenderer(o);
        function c() {
          l.resize(window.innerWidth, window.innerHeight);
        }
        c(),
          n.destroyPixiPlugins(l),
          window.addEventListener("resize", c),
          l.clear(),
          (e.exports = l);
      },
      function (e) {
        function s() {
          this.data = [];
        }
        (e.exports = s),
          (s.prototype.write = function () {
            return new Uint8Array(this.data);
          }),
          (s.prototype.uint8 = function (e) {
            this.data.push(e);
          }),
          (s.prototype.uint8Array = function (e) {
            for (var s = 0; s < e.length; s++) this.data.push(e[s]);
          }),
          (s.prototype.utf8 = function (e) {
            e = unescape(encodeURIComponent(e));
            for (var s = 0; s < e.length; s++) this.data.push(e.charCodeAt(s));
            this.data.push(0);
          });
      },
      ,
      ,
      ,
      function (e, s, i) {
        var a = i(2),
          n = i(167);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        "use strict";
        var a = i(31),
          n = i.n(a);
        s.default = n.a;
      },
      function (e) {
        e.exports = { data: () => ({}) };
      },
      function (e, s, i) {
        var a = i(2),
          n = i(169);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(171);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(173);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(175);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(177);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(179);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        "use strict";
        var a = i(39),
          n = i.n(a);
        s.default = n.a;
      },
      function (e, s, i) {
        var a = i(89),
          n = i(1),
          r = i(5),
          o = n.replay.database;
        e.exports = {
          props: ["replay"],
          methods: {
            async play(e) {
              if (
                !n.connection.opened ||
                (await new Promise((e) => {
                  r.confirm(
                    "You will be disconnected",
                    () => e(!0),
                    () => e(!1)
                  );
                }))
              )
                try {
                  n.replay.play(e);
                } catch (s) {
                  console.log(s),
                    n.stop(),
                    r.alert(
                      "Waching replays on extension currently does not work, please watch them without extension or render them!"
                    );
                }
            },
            downloadReplay(e) {
              r.instance
                .fire({
                  input: "text",
                  inputValue: e.name,
                  showCancelButton: !0,
                  confirmButtonText: "Download",
                  html: "Only Vanis.io can read replay files.<br>It consists of player positions and other game related data.",
                })
                .then((s) => {
                  var i = s.value;
                  if (i) {
                    var n = new Blob([e.data], {
                      type: "text/plain;charset=utf-8",
                    });
                    a.saveAs(n, i + ".vanis");
                  }
                });
            },
            deleteReplay(e) {
              r.confirm(
                "Are you sure that you want to delete this replay?",
                () => {
                  o.removeItem(e, () => {
                    n.events.$emit("replay-removed");
                  });
                }
              );
            },
          },
        };
      },
      function (e, s, i) {
        var a = i(2),
          n = i(219);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(221);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(223);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(225);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(227);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(231);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(233);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(235);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(237);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(239);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(241);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(243);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(245);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(247);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(249);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        "use strict";
        var a = i(56),
          n = i.n(a);
        s.default = n.a;
      },
      function (e, s, i) {
        var a = i(1),
          n = i(8),
          r = i(4),
          o = r.minimapSize,
          l = r.minimapFPS,
          c = r.minimapSmoothing,
          d = new PIXI.Container(),
          h = {};
        function u() {
          return new Date().toLocaleTimeString();
        }
        function p(e, s = !1) {
          if (s && e < 1) return "instant";
          e = Math.floor(e);
          let i = Math.floor(e / 60),
            a = Math.floor(i / 60);
          return i < 1
            ? s
              ? e + "s"
              : "<1min"
            : a < 1
            ? i + "min"
            : i % 60 == 0
            ? a + "hr"
            : a + "hr " + (i % 60) + "min";
        }
        e.exports = {
          data: () => ({
            showMinimap: !1,
            showMinimapCircle: !1,
            showMinimapStats: !0,
            showLocations: r.minimapLocations,
            interval: null,
            minimapStatsBottom: 10,
            showClock: r.showClock,
            showSessionTime: r.showSessionTime,
            showSpectators: r.showSpectators,
            showPlayerCount: r.showPlayerCount,
            showRestartTiming: r.showRestartTiming,
            systemTime: u(),
            sessionTime: p(0, !1),
            restartTime: p(0, !0),
            spectators: 0,
            playerCount: 0,
            restartTick: 0,
            startTime: null,
            gameState: a.state,
          }),
          computed: {
            playerCountDisplayed() {
              if (this.gameState.selectedServer) {
                var e = this.gameState.selectedServer.slots;
                return Math.min(this.playerCount, e) + " / " + e + " players";
              }
              return (
                this.playerCount +
                " player" +
                (1 === this.playerCount ? "" : "s")
              );
            },
          },
          methods: {
            initRenderer(e) {
              var s = PIXI.autoDetectRenderer({
                resolution: 1,
                view: e,
                width: o,
                height: o,
                forceCanvas: !r.useWebGL,
                antialias: !1,
                powerPreference: "high-performance",
                transparent: !0,
              });
              n.destroyPixiPlugins(s), s.clear(), (this.renderer = s);
            },
            destroyMinimap() {
              d.destroy(!0), (d = new PIXI.Container()), this.renderer.clear();
            },
            onMinimapShow() {
              this.interval ||
                ((this.showMinimap = !0),
                (this.minimapStatsBottom = o + 10),
                a.events.$on("minimap-positions", this.updatePositions),
                (this.interval = setInterval(this.render, 1e3 / l)));
            },
            onMinimapHide() {
              this.interval &&
                ((this.showMinimap = !1),
                (this.minimapStatsBottom = 10),
                a.events.$off("minimap-positions", this.updatePositions),
                clearInterval(this.interval),
                (this.interval = null),
                (this.spectators = 0),
                (this.playerCount = 0));
            },
            createNode(e, s, i, a) {
              var n = h[e];
              n && n.destroy(!0), i || (i = 16777215), a || (a = 16777215);
              var r,
                o,
                l,
                c,
                d,
                u = new PIXI.Container();
              (u.newPosition = {}),
                u.addChild(
                  ((r = a),
                  (o = new PIXI.Graphics()).beginFill(r),
                  o.drawCircle(0, 0, 5),
                  o.endFill(),
                  o)
                ),
                s &&
                  u.addChild(
                    ((l = s),
                    (c = i),
                    (d = new PIXI.Text(l, {
                      strokeThickness: 4,
                      lineJoin: "round",
                      fontFamily: "Nunito",
                      fill: c,
                      fontSize: 12,
                    })).anchor.set(0.5),
                    (d.pivot.y = 15),
                    d)
                  ),
                (h[e] = u);
            },
            destroyNode(e) {
              var s = h[e];
              s && (s.destroy(!0), delete h[e]);
            },
            updatePositions(e) {
              d.removeChildren();
              for (var s = 0; s < e.length; s++) {
                var i = e[s],
                  a = h[i.pid];
                a &&
                  ((a.newPosition.x = i.x * o),
                  (a.newPosition.y = i.y * o),
                  d.addChild(a));
              }
              this.render();
            },
            render() {
              for (
                var e = d.children, s = c * (30 / l), i = 0;
                i < e.length;
                i++
              ) {
                var a = e[i];
                (a.position.x = n.lerp(a.position.x, a.newPosition.x, s)),
                  (a.position.y = n.lerp(a.position.y, a.newPosition.y, s));
              }
              this.renderer.render(d);
            },
            drawLocationGrid(e, s) {
              var i = o / s;
              (e.globalAlpha = 0.1), (e.strokeStyle = "#202020"), e.beginPath();
              for (var a = 1; a < s; a++) {
                var n = a * i;
                e.moveTo(n, 0), e.lineTo(n, o), e.moveTo(0, n), e.lineTo(o, n);
              }
              e.stroke(), e.closePath();
            },
            drawLocationCodes(e, s) {
              var i = o / s,
                a = i / 2;
              (e.globalAlpha = 0.1),
                (e.font = "14px Nunito"),
                (e.textAlign = "center"),
                (e.textBaseline = "middle"),
                (e.fillStyle = "#ffffff");
              for (var n = 0; n < s; n++)
                for (var r = n * i + a, l = 0; l < s; l++) {
                  var c = String.fromCharCode(97 + l).toUpperCase() + (n + 1),
                    d = l * i + a;
                  e.strokeText(c, r, d), e.fillText(c, r, d);
                }
            },
            drawLocations(e) {
              e.width = e.height = o;
              var s = e.getContext("2d"),
                i = o / 2;
              if (this.showLocations) {
                if ((s.save(), this.showMinimapCircle)) {
                  var a = new Path2D();
                  a.ellipse(i, i, i, i, 0, 0, 2 * Math.PI), s.clip(a);
                }
                this.drawLocationGrid(s, 5), this.drawLocationCodes(s, 5);
              }
              s.restore(),
                this.showMinimapCircle &&
                  ((s.globalAlpha = 0.45),
                  s.beginPath(),
                  s.arc(i, i, i + 1, -Math.PI / 2, 0),
                  s.lineTo(o, 0),
                  s.closePath(),
                  s.fill());
            },
          },
          created() {
            a.events.$on("minimap-show", this.onMinimapShow),
              a.events.$on("minimap-hide", this.onMinimapHide),
              a.events.$on("minimap-destroy", this.destroyMinimap),
              a.events.$on("minimap-create-node", this.createNode),
              a.events.$on("minimap-destroy-node", this.destroyNode),
              a.events.$on("minimap-show-locations", (e) => {
                (this.showLocations = e),
                  this.drawLocations(this.$refs.locations);
              }),
              a.events.$on(
                "minimap-stats-visible",
                (e) => (this.showMinimapStats = e)
              ),
              a.events.$on("minimap-stats-changed", (e) => {
                (this.spectators = e.spectators),
                  (this.playerCount = e.playerCount);
              }),
              a.events.$on(
                "restart-timing-changed",
                (e) => (this.restartTick = e)
              ),
              a.events.$on("game-started", () => {
                (this.showMinimapCircle = a.border.circle),
                  this.drawLocations(this.$refs.locations);
              }),
              a.events.$on("game-stopped", () => (this.restartTick = 0)),
              a.events.$on("minimap-stats-invalidate-shown", () => {
                (this.showClock = r.showClock),
                  (this.showSessionTime = r.showSessionTime),
                  (this.showSpectators = r.showSpectators),
                  (this.showPlayerCount = r.showPlayerCount),
                  (this.showRestartTiming = r.showRestartTiming);
              }),
              a.events.$on("every-second", () => {
                this.systemTime = u();
                var e = (Date.now() - this.startTime) / 1e3;
                (this.sessionTime = p(e, !1)),
                  this.restartTick && a.serverTick
                    ? ((e = (this.restartTick - a.serverTick) / 25),
                      (this.restartTime = p(e, !0)))
                    : (this.restartTime = null);
              });
          },
          mounted() {
            this.initRenderer(this.$refs.minimap),
              (this.startTime = Date.now());
          },
        };
      },
      function (e, s, i) {
        var a = i(2),
          n = i(251);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(253);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(255);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(257);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(259);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(261);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(263);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function (e, s, i) {
        var a = i(2),
          n = i(266);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      ,
      function (e, s, i) {
        var a = i(1),
          n = i(5),
          r = {
            toggleAutoRespawn: function () {
              let e = a.settings.autoRespawn;
              a.settings.set("autoRespawn", !e),
                e && a.state.isAutoRespawning && a.triggerAutoRespawn(!1);
              let s = "Auto respawn ";
              (s += e ? "disabled" : "enabled"),
                n.toast.fire({ type: "info", title: s, timer: 1500 });
            },
            respawn: function () {
              a.actions.join(Multibox.active), a.showMenu(!1);
            },
            feed: a.actions.feed.bind(null),
            feedMacro: a.actions.feed.bind(null, !0),
            ping: a.actions.ping,
            aimbot: a.actions.aimbotlocker,
            split: a.actions.split.bind(null, 1),
            splitx2: a.actions.split.bind(null, 2),
            splitx3: a.actions.split.bind(null, 3),
            splitMax: a.actions.split.bind(null, 4),
            split32: a.actions.split.bind(null, 5),
            split64: a.actions.split.bind(null, 6),
            multi1: a.actions.multicombo.bind(null, 1),
            multi2: a.actions.multicombo.bind(null, 2),
            multi3: a.actions.multicombo.bind(null, 3),
            linesplit: a.actions.linesplit,
            freezeMouse: a.actions.freezeMouse,
            lockLinesplit: a.actions.lockLinesplit,
            stopMovement: a.actions.stopMovement,
            toggleSkins: a.actions.toggleSkins,
            toggleNames: a.actions.toggleNames,
            toggleFood: a.actions.toggleFood,
            toggleMass: a.actions.toggleMass,
            toggleChat: a.actions.toggleChat,
            toggleChatToast: a.actions.toggleChatToast,
            toggleHud: a.actions.toggleHud,
            spectateLock: a.actions.spectateLockToggle,
            selectPlayer: a.actions.targetPlayer.bind(null),
            saveReplay: a.replay.save,
            zoomLevel1: a.actions.setZoomLevel.bind(null, 1),
            zoomLevel2: a.actions.setZoomLevel.bind(null, 2),
            zoomLevel3: a.actions.setZoomLevel.bind(null, 3),
            zoomLevel4: a.actions.setZoomLevel.bind(null, 4),
            zoomLevel5: a.actions.setZoomLevel.bind(null, 5),
            multibox() {
              Multibox && Multibox.switch();
            },
          },
          o = {
            multibox: "TAB",
            ping: "MOUSE0",
            feed: "",
            aimbot: "",
            feedMacro: "W",
            split: "SPACE",
            splitx2: "G",
            splitx3: "H",
            splitMax: "T",
            split32: "",
            split64: "",
            multi1: "",
            multi2: "",
            multi3: "",
            linesplit: "Z",
            lockLinesplit: "",
            respawn: "",
            toggleAutoRespawn: "",
            stopMovement: "",
            toggleSkins: "",
            toggleNames: "",
            toggleMass: "",
            spectateLock: "Q",
            selectPlayer: "MOUSE1",
            saveReplay: "R",
            toggleChat: "",
            toggleChatToast: "",
            toggleHud: "",
            zoomLevel1: "1",
            zoomLevel2: "2",
            zoomLevel3: "3",
            zoomLevel4: "4",
            zoomLevel5: "5",
          };
        e.exports = new (class {
          constructor() {
            (this.version = 2),
              (this.pressHandlers = null),
              (this.releaseHandlers = null),
              this.resetObsoleteHotkeys(),
              this.load();
          }
          resetObsoleteHotkeys() {
            parseInt(localStorage.hotkeysVersion) !== this.version &&
              (localStorage.hotkeys && localStorage.removeItem("hotkeys"),
              (localStorage.hotkeysVersion = this.version));
          }
          load() {
            (window.hotkeys = this.hotkeys = this.loadHotkeys()),
              this.loadHandlers(this.hotkeys);
          }
          loadHotkeys() {
            var e = Object.assign({}, o),
              s = localStorage.hotkeys;
            if (!s) return e;
            var i = Object.values((s = JSON.parse(s)));
            return (
              Object.keys(e).forEach((s) => {
                var a = e[s];
                a && i.includes(a) && (e[s] = "");
              }),
              Object.assign(e, s)
            );
          }
          saveHotkeys(e) {
            localStorage.hotkeys = JSON.stringify(e);
          }
          reset() {
            return (
              localStorage.removeItem("hotkeys"), this.load(), this.hotkeys
            );
          }
          get() {
            return this.hotkeys;
          }
          set(e, s) {
            if (r[e]) {
              if (this.hotkeys[e] === s) return !0;
              if (s)
                for (var i in this.hotkeys)
                  this.hotkeys[i] === s && (this.hotkeys[i] = "");
              return (
                (this.hotkeys[e] = s),
                this.saveHotkeys(this.hotkeys),
                this.loadHandlers(this.hotkeys),
                !0
              );
            }
          }
          loadHandlers(e) {
            (this.pressHandlers = {}),
              Object.keys(e).forEach((s) => {
                var i = r[s];
                if (i) {
                  var a = e[s];
                  this.pressHandlers[a] = i;
                }
              }),
              (this.releaseHandlers = {}),
              e.feedMacro &&
                (this.releaseHandlers[e.feedMacro] = a.actions.feed.bind(
                  null,
                  !1
                ));
          }
          press(e) {
            var s = this.pressHandlers[e];
            return !!s && (s(), !0);
          }
          release(e) {
            var s = this.releaseHandlers[e];
            s && s();
          }
          convertKey(e) {
            return e
              ? e
                  .toString()
                  .toUpperCase()
                  .replace(/^(LEFT|RIGHT|NUMPAD|DIGIT|KEY)/, "")
              : "Unknown";
          }
        })();
      },
      ,
      ,
      ,
      ,
      ,
      ,
      function (e, s, i) {
        "use strict";
        var a = function () {
            var e = this.$createElement,
              s = this._self._c || e;
            return s("div", [
              s(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: this.showMinimapStats,
                      expression: "showMinimapStats",
                    },
                  ],
                  staticClass: "minimap-stats",
                  style: { bottom: this.minimapStatsBottom + "px" },
                },
                [
                  s(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: this.showClock,
                          expression: "showClock",
                        },
                      ],
                    },
                    [this._v(this._s(this.systemTime))]
                  ),
                  this._v(" "),
                  s(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: this.showSessionTime,
                          expression: "showSessionTime",
                        },
                      ],
                    },
                    [this._v(this._s(this.sessionTime) + " session")]
                  ),
                  this._v(" "),
                  s(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: this.showPlayerCount && this.playerCount,
                          expression: "showPlayerCount && playerCount",
                        },
                      ],
                    },
                    [this._v(this._s(this.playerCountDisplayed))]
                  ),
                  this._v(" "),
                  s(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: this.showSpectators && this.spectators,
                          expression: "showSpectators && spectators",
                        },
                      ],
                    },
                    [
                      this._v(
                        this._s(this.spectators) +
                          " spectator" +
                          this._s(1 === this.spectators ? "" : "s")
                      ),
                    ]
                  ),
                  this._v(" "),
                  s(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: this.showRestartTiming && this.restartTime,
                          expression: "showRestartTiming && restartTime",
                        },
                      ],
                    },
                    [this._v("Restart in " + this._s(this.restartTime))]
                  ),
                ]
              ),
              this._v(" "),
              s(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: this.showMinimap,
                      expression: "showMinimap",
                    },
                  ],
                  staticClass: "container",
                  class: { circle: this.showMinimapCircle },
                },
                [
                  s("canvas", { ref: "locations", attrs: { id: "locations" } }),
                  this._v(" "),
                  s("canvas", { ref: "minimap", attrs: { id: "minimap" } }),
                ]
              ),
            ]);
          },
          n = [];
        (a._withStripped = !0),
          i.d(s, "a", function () {
            return a;
          }),
          i.d(s, "b", function () {
            return n;
          });
      },
      function (e, s, i) {
        "use strict";
        var a = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i("transition", { attrs: { name: "fade", appear: "" } }, [
              i("div", { staticClass: "modal" }, [
                i("div", {
                  staticClass: "overlay",
                  on: {
                    click: function () {
                      return e.$emit("close");
                    },
                  },
                }),
                e._v(" "),
                i("i", {
                  staticClass: "fas fa-times-circle close-button",
                  on: {
                    click: function () {
                      return e.$emit("close");
                    },
                  },
                }),
                e._v(" "),
                i(
                  "div",
                  { staticClass: "wrapper" },
                  [
                    i("transition", { attrs: { name: "scale", appear: "" } }, [
                      i(
                        "div",
                        { staticClass: "content fade-box" },
                        [e._t("default", [e._v("Here should be something")])],
                        2
                      ),
                    ]),
                  ],
                  1
                ),
              ]),
            ]);
          },
          n = [];
        (a._withStripped = !0),
          i.d(s, "a", function () {
            return a;
          }),
          i.d(s, "b", function () {
            return n;
          });
      },
      function (e, s, i) {
        "use strict";
        var a = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i(
              "div",
              {
                staticClass: "replay-item",
                style: { backgroundImage: "url('" + e.replay.image + "')" },
                on: {
                  click: function () {
                    return e.play(e.replay.data);
                  },
                },
              },
              [
                i(
                  "div",
                  {
                    staticClass: "replay-header",
                    on: {
                      click: function (e) {
                        e.stopPropagation();
                      },
                    },
                  },
                  [
                    i("div", { staticClass: "replay-name" }, [
                      e._v(e._s(e.replay.name)),
                    ]),
                    e._v(" "),
                    i("div", [
                      i("i", {
                        staticClass: "replay-button fas fa-cloud-download-alt",
                        on: {
                          click: function (s) {
                            return (
                              s.stopPropagation(), e.downloadReplay(e.replay)
                            );
                          },
                        },
                      }),
                      e._v(" "),
                      i("i", {
                        staticClass: "replay-button fas fa-trash-alt",
                        on: {
                          click: function (s) {
                            return (
                              s.stopPropagation(), e.deleteReplay(e.replay.name)
                            );
                          },
                        },
                      }),
                    ]),
                  ]
                ),
              ]
            );
          },
          n = [];
        (a._withStripped = !0),
          i.d(s, "a", function () {
            return a;
          }),
          i.d(s, "b", function () {
            return n;
          });
      },
      function (e, s) {
        (s.neon = [16776960, 65280, 65535, 16711935]),
          (s.basic = [
            16711680, 16744448, 16776960, 8453888, 65280, 65408, 65535, 33023,
            8388863, 16711935, 16711808,
          ]),
          (s.basicd = s.basic.map((e) => {
            var s = (e >> 16) & 255,
              i = (e >> 8) & 255,
              a = 255 & e;
            return ((s *= 0.5) << 16) | ((i *= 0.5) << 8) | ((a *= 0.5) >> 0);
          }));
      },
      function (e) {
        var s = new (class {
          constructor() {
            this.ads = {};
          }
          addAd(e, s, i) {
            this.ads[e] = {
              elementId: s,
              lastRefresh: 0,
              waitInterval: i || 0,
            };
          }
          getAd(e) {
            return this.ads[e] || null;
          }
          pushAd(e) {
            aiptag.cmd.display.push(function () {
              aipDisplayTag.display(e);
            });
          }
          refreshAd(e) {
            var s = this.getAd(e);
            if (!s) return !1;
            var i = Date.now();
            return (
              !(s.lastRefresh + 1e3 * s.waitInterval > i) &&
              ((s.lastRefresh = i), this.pushAd(s.elementId), !0)
            );
          }
        })();
        s.addAd("menu-box", "vanis-io_300x250", 30),
          s.addAd("menu-banner", "vanis-io_728x90", 120),
          s.addAd("death-box", "vanis-io_300x250_2", 30),
          (e.exports = {
            loadAdinplay(e) {
              var s = (window.aiptag = s || {});
              (s.cmd = s.cmd || []),
                (s.cmd.display = s.cmd.display || []),
                (s.gdprShowConsentTool = !0);
              var i = document.createElement("script");
              (i.onload = e),
                (i.src =
                  "//api.adinplay.com/libs/aiptag/pub/VAN/vanis.io/tag.min.js"),
                document.head.appendChild(i);
            },
            refreshAd: (e) => s.refreshAd(e),
          });
      },
      function (e) {
        let s = (e) => {
          let s = new i(e);
          s.offset++;
          let a = { border: {}, food: {} };
          if (((a.protocol = s.readUInt8()), a.protocol >= 4)) {
            (a.gamemodeId = s.readUInt8()),
              (a.instanceSeed = s.readUInt16LE()),
              (a.playerId = s.readUInt16LE()),
              (a.border.minx = s.readInt16LE()),
              (a.border.miny = s.readInt16LE()),
              (a.border.maxx = s.readInt16LE()),
              (a.border.maxy = s.readInt16LE()),
              (a.flags = s.readUInt8()),
              (a.border.circle = !!(1 & a.flags));
            let { food: n } = a;
            if (2 & a.flags) {
              let r = (n.minSize = s.readUInt16LE()),
                o = (n.maxSize = s.readUInt16LE());
              n.stepSize = o - r;
            }
            4 & a.flags && (n.ejectedSize = s.readUInt16LE()),
              (a.border.width = a.border.maxx - a.border.minx),
              (a.border.height = a.border.maxy - a.border.miny);
          } else {
            if (a.protocol >= 2)
              (a.gamemodeId = s.readUInt8()),
                (a.instanceSeed = s.readUInt16LE()),
                (a.playerId = s.readUInt16LE()),
                (a.border.width = s.readUInt32LE()),
                (a.border.height = s.readUInt32LE());
            else {
              (a.gamemodeId = 1),
                (a.instanceSeed = s.readInt16LE()),
                (a.playerId = s.readInt16LE());
              let l = s.readUInt16LE();
              (a.border.width = l), (a.border.height = l);
            }
            (a.border.minx = -a.border.width / 2),
              (a.border.miny = -a.border.height / 2),
              (a.border.maxx = +a.border.width / 2),
              (a.border.maxy = +a.border.height / 2);
          }
          return (
            (a.border.x = (a.border.minx + a.border.maxx) / 2),
            (a.border.y = (a.border.miny + a.border.maxy) / 2),
            a
          );
        };
        e.exports = s;
      },
      function (e, s, a) {
        let n = a(1),
          o = a(4),
          {
            PlayerCell: l,
            Virus: c,
            EjectedMass: d,
            Food: h,
            Crown: u,
            DeadCell: p,
          } = a(133),
          v = new (class e {
            constructor() {
              (this.records = []), (this.removed = []), (this.eaten = []);
            }
            add(e) {
              return this.records.push(e);
            }
            added(e) {
              return this.records.some((s) => s.id === e);
            }
            remove(e) {
              return this.removed.push(e);
            }
            removed(e) {
              return -1 !== this.removed.indexOf(e);
            }
            eat(e, s) {
              this.eaten.push([e, s]);
            }
            eaten(e) {
              return this.eaten.some((s) => s[0] === e);
            }
            mangle(e) {}
            clear() {
              let { records: e, removed: s, eaten: i } = this;
              e.length = s.length = i.length = 0;
            }
          })(),
          m = (e, s, i) => {
            let a = 15 & e.type,
              { id: o, pid: m, x: g, y: f, size: y, flags: w } = e;
            if (null === y) {
              let { food: b } = n;
              4 === a
                ? (y = b.minSize + (o % b.stepSize) || 1)
                : 3 === a && (y = b.ejectedSize || 1),
                (e.size = y);
            }
            null === g &&
              4 === a &&
              ((g = e.x =
                n.border.minx +
                y +
                (n.border.width - 2 * y) * n.seededRandom(65536 + o)),
              (f = e.y =
                n.border.miny +
                y +
                (n.border.height - 2 * y) * n.seededRandom(131072 + o)));
            let _ = o in n.nodes,
              k = _ ? n.nodes[o] : null;
            if (k) k.update(), (k.ox = k.x), (k.oy = k.y), (k.oSize = k.size);
            else {
              switch (a) {
                case 1: {
                  let C = n.playerManager.getPlayer(m);
                  (e.texture = C.texture), (k = new l(e, C));
                  break;
                }
                case 2:
                  k = new c(e);
                  break;
                case 3:
                  k = new d(e);
                  break;
                case 4:
                  if (r) break;
                  k = new h(e);
                  break;
                case 6:
                  if (r) break;
                  k = new u(e);
                  break;
                default: {
                  if (r) break;
                  let x = 4210752,
                    S = !1;
                  w &&
                    ((x = 0),
                    128 & w && (x |= 7340032),
                    64 & w && (x |= 28672),
                    32 & w && (x |= 112),
                    16 & w && (S = !0)),
                    (k = new p(e, x, S));
                }
              }
              i && (k.multi = !0);
              let { scene: M } = n;
              M[1 & w ? "addFood" : "addCell"](k.sprite), (k.createTick = s);
              let { nodelist: T, nodes: I } = n;
              k.isVirus ? n.viruses[i ? "2" : "1"].push(k) : T.push(k),
                (I[o] = k),
                i || v.add(e);
            }
            null !== g && ((k.nx = g), (k.ny = f)),
              null !== y && (k.nSize = y),
              (k.updateTime = n.timestamp);
            let { player: P } = k;
            if (!P) return;
            P.isMe && P.pid === n.playerId && (n.isAlive = !0);
            let { replay: L } = n;
            L.updateHistory.length
              ? (P.lastUpdateTick = s)
              : delete P.lastUpdateTick,
              v.clear(),
              window.aimbotpid === P.pid &&
                (window.lastNodesTick !== s
                  ? ((window.nodesTick = []),
                    (window.lastNodesTick = s),
                    delete window.hasBeenTriggered)
                  : (window.nodesTick.push(k),
                    window.nodesTick.length > 15 &&
                      !window.hasBeenTriggered &&
                      ((window.hasBeenTriggered = !0),
                      GAME.actions.split(2, !1),
                      GAME.actions.aimbotlocker())));
          },
          g = (e, s) => {
            let { nodes: i } = n,
              a = i[e];
            if (!a) return;
            let r = i[s];
            if (!r) return void a.destroy();
            a.update(),
              a.destroy(o.eatAnimation),
              (a.nx = r.x),
              (a.ny = r.y),
              (a.nSize = 0),
              (a.newPositionScale = Math.min(Math.max(a.size / r.nSize, 0), 1)),
              (a.updateTime = n.timestamp);
          },
          f = (e, s) => {
            s ? (e.multi = !0) : (e.packetId ??= ++n.ws.packetId);
            let a = new i(e);
            for (a.offset++; ; ) {
              let r = a.readUInt8(),
                o = 15 & r;
              if (0 === r) break;
              let l = 1 === o ? a.readUInt16BE() : null,
                c = a.readUInt16BE(),
                d = !(32 & r),
                h = null,
                u = null;
              d && ((h = a.readInt16BE()), (u = a.readInt16BE()));
              let p = 64 & r ? null : a.readUInt16BE(),
                f = (r << 24) >> 24 < 0 ? a.readUInt8() : 0;
              m(
                {
                  type: r,
                  pid: l,
                  id: c,
                  x: h,
                  y: u,
                  size: p,
                  flags: f | ((4 === o) | (f > 15)),
                },
                n.ws.packetId,
                s
              );
            }
            let { nodes: y } = n,
              w = a.readUInt16BE();
            for (; w--; ) {
              let b = a.readUInt16BE();
              b in y && (y[b].destroy(), s || v.remove(b));
            }
            for (w = a.readUInt16BE(); w--; ) {
              let _ = a.readUInt16BE(),
                k = a.readUInt16BE();
              _ in y && (g(_, k), s || v.eat(_, k in y ? k : null));
            }
            s && !n.alive() && n.updateCamera(!0);
          };
        (n.parseNodes = f), (e.exports = { addOrUpdate: m, remove: g });
      },
      function (e, s, i) {
        var a = i(140);
        function n(e, s, i, n) {
          var r = e.length,
            o = a._malloc(r),
            l = new Uint8Array(a.HEAPU8.buffer, o, r);
          l.set(e);
          var c = s(o, n);
          if (!i) {
            var d = new Uint8Array(new ArrayBuffer(r));
            d.set(l);
          }
          return a._free(o), i ? c : d;
        }
        i(141),
          (e.exports = {
            skid: (e) => n(e, a._skid, !1),
            skid3: (e, s) => n(e, a._skid3, !0, s),
            skid4: (e, s) => n(e, a._skid4, !0, s),
          });
      },
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      function (e, s, i) {
        "use strict";
        var a = i(74),
          n = i(30),
          r = Object((i(168), i(0)).a)(
            n.default,
            a.a,
            a.b,
            !1,
            null,
            "0eaeaf66",
            null
          );
        (r.options.__file = "src/components/modal.vue"),
          (s.default = r.exports);
      },
      function (e, s, i) {
        "use strict";
        var a = i(75),
          n = i(38),
          r = Object((i(218), i(0)).a)(
            n.default,
            a.a,
            a.b,
            !1,
            null,
            "1dbc6ed9",
            null
          );
        (r.options.__file = "src/components/replay-item.vue"),
          (s.default = r.exports);
      },
      function (e, s, i) {
        "use strict";
        var a = i(73),
          n = i(55),
          r = Object((i(250), i(0)).a)(
            n.default,
            a.a,
            a.b,
            !1,
            null,
            "4c95bd45",
            null
          );
        (r.options.__file = "src/components/minimap.vue"),
          (s.default = r.exports);
      },
      function (e, s, i) {
        "use strict";
        i.r(s);
        var a = i(8),
          n = (i.n(a), i(119));
        i.n(n),
          (window.v = 5),
          i(17).notifyUnsupportedBrowser(),
          i(1),
          i(130),
          i(132),
          i(142),
          i(148),
          i(269),
          i(267),
          i(268);
      },
      function (e, s, i) {
        var a = i(2),
          n = i(120);
        "string" == typeof (n = n.__esModule ? n.default : n) &&
          (n = [[e.i, n, ""]]);
        var r =
          (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
        e.exports = r;
      },
      function () {},
      function (e, s, i) {
        var a = i(4),
          n = i(12);
        function r({ width: e, height: s, circle: i }) {
          var n = PIXI.utils.string2hex(a.borderColor),
            r = new PIXI.Graphics();
          return (
            r.lineStyle(100, n, 1, 0.5),
            i
              ? r.drawEllipse(e / 2, s / 2, e / 2, s / 2)
              : r.drawRect(0, 0, e, s),
            r.endFill(),
            r.pivot.set(e / 2, s / 2),
            r
          );
        }
        e.exports = class {
          constructor(e, s, i) {
            (this.game = e),
              (this.border = s),
              (this.container = new PIXI.Container()),
              (this.background = new PIXI.Container()),
              (this.borderSprite = r(s)),
              this.background.addChild(this.borderSprite),
              (this.foreground = new PIXI.Container()),
              (this.food = new PIXI.Container()),
              (this.food.visible = a.foodVisible),
              this.resetMassTextStyle(!1),
              this.container.addChild(
                this.background,
                this.food,
                this.foreground
              ),
              this.setPosition(),
              i && this.setBackgroundImage(),
              (this.background.position.x = s.x),
              (this.background.position.y = s.y);
          }
          setPosition() {
            (this.container.position.x = window.innerWidth / 2),
              (this.container.position.y = window.innerHeight / 2);
          }
          sort() {
            this.foreground.children.sort((e, s) =>
              (e = e.gameData).size === (s = s.gameData).size
                ? e.id - s.id
                : e.size - s.size
            );
          }
          addCell(e) {
            this.foreground.addChild(e);
          }
          addFood(e) {
            this.food.addChild(e);
          }
          toggleBackgroundImage(e) {
            e && !this.backgroundSprite
              ? this.setBackgroundImage()
              : e || this.destroyBackgroundImage(!0);
          }
          setBackgroundImage() {
            var e = a.backgroundImageUrl;
            if (e) {
              var s = (
                a.backgroundImageRepeat ? PIXI.TilingSprite : PIXI.Sprite
              ).from(e, {});
              (s.width = this.border.width),
                (s.height = this.border.height),
                (s.alpha = a.backgroundImageOpacity),
                s.anchor.set(0.5);
              var i = this.backgroundSprite;
              if (i) {
                var n = s.texture !== i.texture;
                this.destroyBackgroundImage(n);
              }
              if (
                ((this.backgroundSprite = s),
                this.background.addChildAt(s, 0),
                this.border.circle)
              ) {
                var r = (function ({ width: e, height: s }) {
                  var i = new PIXI.Graphics();
                  return (
                    i.beginFill(16777215),
                    i.drawEllipse(e / 2, s / 2, e / 2, s / 2),
                    i.endFill(),
                    i.pivot.set(e / 2, s / 2),
                    i
                  );
                })(this.border);
                this.background.addChildAt(r, 1),
                  (this.backgroundSprite.mask = r);
              }
            } else this.destroyBackgroundImage();
          }
          destroyBackgroundImage(e) {
            this.backgroundSprite &&
              (this.backgroundSprite.destroy(!!e),
              (this.backgroundSprite = null));
          }
          resetBorder() {
            this.borderSprite.destroy(),
              (this.borderSprite = r(this.border)),
              this.background.addChild(this.borderSprite);
          }
          reloadFoodTextures() {
            this.game.nodelist.forEach((e) => {
              e.isFood && e.reloadTexture();
            });
          }
          reloadEjectedTextures() {
            this.game.nodelist.forEach((e) => {
              e.isEjected && e.reloadTexture();
            });
          }
          reloadVirusTexture() {
            n.virus.loadVirusFromUrl(a.virusImageUrl);
          }
          resetPlayerLongNames() {
            this.game.playerManager.players.forEach((e) =>
              e.applyNameToSprite()
            );
          }
          resetNameTextStyle() {
            let e = this.game.settings.nameTextStyle,
              { nodelist: s } = this.game;
            s.forEach((e) => {
              e.isPlayerCell &&
                e.nameSprite &&
                (e.nameSprite.destroy(!1), (e.nameSprite = null));
            });
            let { playerManager: i } = this.game;
            i.players.forEach((s) => {
              let i = s.nameSprite;
              if (!i) return;
              let a = i.style.fill;
              (i.style = e), (i.style.fill = a), i.updateText();
            });
          }
          resetMassTextStyle(e) {
            var s = this.game.settings.massTextStyle;
            for (
              e && this.uninstallMassTextFont(),
                PIXI.BitmapFont.from("mass", s, { chars: "1234567890k." });
              this.game.massTextPool.length;

            )
              this.game.massTextPool.pop().destroy(!1);
            for (var i = 0; i < this.game.nodelist.length; i++) {
              var a = this.game.nodelist[i];
              a.isPlayerCell &&
                a.massText &&
                (a.sprite.removeChild(a.massText),
                a.massText.destroy(!1),
                (a.massText = null));
            }
          }
          uninstallMassTextFont() {
            PIXI.BitmapFont.uninstall("mass");
          }
        };
      },
      function (e, s, i) {
        var a = i(4),
          n = i(24),
          r = {};
        e.exports = {
          getTexture: function (e) {
            var s, i, o, l, c, d, h, u;
            return (
              r[e] ||
              (r[e] =
                ((s = e),
                (h =
                  ((i = d = (c = a.cellSize) / 2),
                  (o = s),
                  (l = new PIXI.Graphics()).beginFill(o),
                  l.drawCircle(0, 0, i),
                  l.endFill(),
                  l)).position.set(d),
                (u = PIXI.RenderTexture.create(c, c)),
                n.render(h, u),
                u))
            );
          },
          destroyCache: function () {
            for (var e in r) r[e].destroy(!0), delete r[e];
          },
        };
      },
      function (e, s, i) {
        var a = i(4),
          n = i(24),
          r = {};
        e.exports = {
          getTexture: function (e) {
            var s, i, o, l, c, d, h, u;
            return (
              r[e] ||
              (r[e] =
                ((s = e),
                (h =
                  ((i = d = (c = a.cellSize) / 2),
                  (o = s),
                  (l = new PIXI.Graphics()).beginFill(o),
                  l.drawRect(-i, -i, 2 * i, 2 * i),
                  l.endFill(),
                  l)).position.set(d),
                (u = PIXI.RenderTexture.create(c, c)),
                n.render(h, u),
                u))
            );
          },
          destroyCache: function () {
            for (var e in r) r[e].destroy(!0), delete r[e];
          },
        };
      },
      function (e, s, i) {
        var a = i(24),
          { loadImage: n } = i(8),
          r = PIXI.RenderTexture.create(200, 200),
          o = Promise.resolve();
        e.exports = {
          getTexture: function () {
            return r;
          },
          loadVirusFromUrl: async function (e) {
            await o,
              (o = new Promise(async (s) => {
                var i = await n(e),
                  o = PIXI.Sprite.from(i, void 0, 18);
                (o.width = o.height = 200),
                  a.render(o, r, !0),
                  o.destroy(!0),
                  s();
              }));
          },
        };
      },
      function (e, s, i) {
        let a = i(126);
        e.exports = class e {
          constructor(e) {
            (this.game = e),
              (this.playersRemoving = []),
              (this.players = new Map()),
              (this.botCount = 0);
          }
          get playerCount() {
            return this.players.size - this.botCount;
          }
          getPlayer = (e) => (this.players.has(e) ? this.players.get(e) : null);
          setPlayerData({
            pid: e,
            nickname: s,
            skin: i,
            skinUrl: n,
            hat: r,
            nameColor: o,
            tagId: l,
            bot: c,
          }) {
            !this.players.has(e) &&
              (this.players.set(e, new a(this.game, e, c)),
              c && this.botCount++);
            let d = this.players.get(e);
            i && (n = `https://skins.vanis.io/s/${i}`);
            let h = d.setName(s, o),
              u = d.setSkin(n),
              p = d.setTagId(l);
            return (
              (h || u || p) && d.invalidateVisibility(), r && (d.hat = r), d
            );
          }
          invalidateVisibility(e = []) {
            for (let s of this.players.values())
              0 > e.indexOf(s) && s.invalidateVisibility();
          }
          sweepRemovedPlayers() {
            let { replay: e } = this.game,
              s = e.updateHistory[0]?.packetId,
              i = 0;
            for (; i < this.playersRemoving.length; ) {
              let a = this.playersRemoving[i];
              if (!this.players.has(a)) {
                this.playersRemoving.splice(i, 1);
                continue;
              }
              let n = this.players.get(a);
              !s || (n.lastUpdateTick && s > n.lastUpdateTick)
                ? (this.removePlayer(a), this.playersRemoving.splice(i, 1))
                : i++;
            }
          }
          delayedRemovePlayer(e) {
            this.playersRemoving.push(e);
          }
          removePlayer(e) {
            if (!this.players.has(e)) return;
            let s = this.players.get(e);
            s.bot && this.botCount--,
              s.clearCachedData(),
              this.players.delete(e);
          }
          destroy() {
            for (let e of this.players.keys()) this.removePlayer(e);
            this.playersRemoving.splice(0, this.playersRemoving.length);
          }
        };
      },
      function (e, s, i) {
        var a = i(4),
          n = i(76),
          r = n.basic,
          o = n.basicd,
          l = a.cellSize;
        function c(e) {
          e = e || 0;
          var s = new PIXI.Graphics();
          return (
            s.lineStyle(a.cellBorderSize, 0, 0.5),
            s.beginFill(e),
            s.drawCircle(0, 0, a.cellSize / 2),
            s.endFill(),
            s
          );
        }
        e.exports = class {
          constructor(e, s, i, a) {
            (this.game = e),
              (this.pid = s),
              (this.bot = i),
              (this.hat = a),
              (this.skinUrl = i ? "" : null),
              (this.tagId = null),
              (this.isMe =
                s === e.playerId || s === e.multiboxPid || s === Multibox.pid),
              (this.texture = PIXI.RenderTexture.create(l, l)),
              (this.cellContainer = this.createCellContainer()),
              this.renderCell();
          }
          get visibility() {
            return this.game.tagId === this.tagId ? 1 : 2;
          }
          setOutline(e, s = 15) {
            if (((e = e || 0), 0 == s)) return this.renderCell();
            var i = a.cellSize / 2,
              n = s,
              r = new PIXI.Graphics();
            this.outline && (this.outline.clear(), this.outline.destroy()),
              (this.outline = r),
              r.lineStyle(n, e, 1),
              r.drawCircle(0, 0, i - (n - 1) / 2),
              r.endFill(),
              r.pivot.set(-i),
              this.game.renderer.render(r, this.texture, !1);
          }
          setCrown(e) {
            this.hasCrown = e;
            for (
              var s = this.pid, i = this.game.nodelist, a = 0;
              a < i.length;
              a++
            ) {
              var n = i[a];
              n.pid === s && (e ? n.addCrown() : n.removeCrown());
            }
          }
          createCellContainer() {
            var e = new PIXI.Container(),
              s = c(this.getCellColor());
            return e.pivot.set(-l / 2), e.addChild(s), e;
          }
          createSkinSprite(e) {
            var s = new PIXI.BaseTexture(e),
              i = new PIXI.Texture(s),
              n = new PIXI.Sprite(i);
            return (n.width = n.height = a.cellSize), n.anchor.set(0.5), n;
          }
          renderCell() {
            this.game.renderer.render(this.cellContainer, this.texture, !0);
          }
          setTagId(e) {
            return (
              e || (e = null),
              (this.tagId = e),
              this.bot || this.setTagSprite(),
              !0
            );
          }
          setNameColor(e) {
            return (
              e
                ? ((e = parseInt(e, 16)),
                  (this.nameColor = e),
                  (this.nameColorCss = PIXI.utils.hex2string(e)))
                : ((this.nameColor = null), (this.nameColorCss = null)),
              this.nameColor
            );
          }
          setName(e, s) {
            return (
              e || (e = "Unnamed"),
              (this.nameFromServer !== e || this.nameColorFromServer !== s) &&
                ((this.nameFromServer = e),
                (this.nameColorFromServer = s),
                this.applyNameToSprite(),
                !0)
            );
          }
          applyNameToSprite() {
            var e,
              s = "Unnamed" === this.nameFromServer,
              i = "Long Name" === this.nameFromServer,
              n = s ? "" : this.nameFromServer,
              r = this.name,
              o = this.nameColor;
            if (
              ((e =
                s || i
                  ? this.setNameColor(null)
                  : this.setNameColor(this.nameColorFromServer)),
              this.bot && (e = this.setNameColor("878787")),
              this.setNameSprite(n, e),
              s ||
                i ||
                !(this.nameSprite.texture.width > a.cellLongNameThreshold) ||
                ((i = !0),
                (n = "Long Name"),
                (e = this.setNameColor(null)),
                this.setNameSprite(n, e)),
              (this.name = s ? "Unnamed" : n),
              r !== this.name || o !== this.nameColor)
            ) {
              var l = e || (this.isMe ? 16747520 : null);
              this.game.events.$emit("minimap-create-node", this.pid, n, e, l);
            }
          }
          setNameSprite(e, s) {
            this.nameSprite
              ? (this.nameSprite.text = e)
              : (this.nameSprite = new PIXI.Text(e, a.nameTextStyle)),
              (this.nameSprite.style.fill = s || 16777215),
              this.nameSprite.updateText();
          }
          setTagSprite() {
            var e = JSON.parse(`${JSON.stringify(settings.nameTextStyle)}`);
            (e.fontSize = 50),
              this.tagSprite
                ? (this.tagSprite.text = `Team ${
                    null == this.tagId ? 0 : this.tagId
                  }`)
                : (this.tagSprite = new PIXI.Text(
                    `Team ${null == this.tagId ? 0 : this.tagId}`,
                    e
                  )),
              (this.tagSprite.style.fill = this.getTagColor()),
              this.tagSprite.updateText();
          }
          getTagColor() {
            return (
              window.TagColor.isNull++,
              window.TagColor[this.tagId] ||
                (window.TagColor[this.tagId] =
                  window.TagColor.array[
                    Math.floor(Math.random() * window.TagColor.array.length)
                  ]),
              parseInt("0x" + window.TagColor[this.tagId].replace("#", ""))
            );
          }
          setSkin(e) {
            return (
              e || (e = null),
              e !== this.skinUrl &&
                (this.abortSkinLoaderIfExist(),
                this.destroySkin() && this.renderCell(),
                (this.skinUrl = e),
                this.skinShown && this.loadSkinAndRender(),
                !0)
            );
          }
          destroySkin() {
            return (
              !!this.skinSprite &&
              (this.skinSprite.mask.destroy(!0),
              this.skinSprite.destroy(!0),
              (this.skinSprite = null),
              !0)
            );
          }
          loadSkinAndRender() {
            this.abortSkinLoaderIfExist(),
              (this.abortSkinLoader = this.game.skinLoader.loadSkin(
                this.skinUrl,
                (e) => {
                  (this.skinSprite = this.createSkinSprite(e)),
                    (this.skinSprite.mask = c()),
                    this.cellContainer.addChild(
                      this.skinSprite.mask,
                      this.skinSprite
                    ),
                    this.renderCell();
                }
              ));
          }
          invalidateVisibility() {
            var e,
              s,
              i,
              n = a.showNameColor;
            this.isMe
              ? ((e = a.showOwnName), (s = a.showOwnSkin), (i = a.showOwnMass))
              : ((e = a.showNames >= this.visibility),
                (s = a.showSkins >= this.visibility),
                (i = a.showMass >= this.visibility)),
              (e = a.namesEnabled && e),
              (s = a.skinsEnabled && s),
              (i = a.massEnabled && i),
              s && !this.skinShown
                ? this.skinSprite
                  ? ((this.skinSprite.visible = !0), this.renderCell())
                  : this.skinUrl && this.loadSkinAndRender()
                : !s &&
                  this.skinShown &&
                  (this.abortSkinLoaderIfExist(),
                  this.skinSprite &&
                    ((this.skinSprite.visible = !1), this.renderCell())),
              (this.nameShown = e),
              (this.skinShown = s),
              (this.massShown = i),
              (this.nameColorShown = n);
          }
          abortSkinLoaderIfExist() {
            this.abortSkinLoader &&
              (this.abortSkinLoader(), (this.abortSkinLoader = null));
          }
          getCellColor() {
            var e = Math.floor(this.game.seededRandom(this.pid) * r.length);
            return (this.bot ? o : r)[e];
          }
          clearCachedData() {
            this.abortSkinLoaderIfExist(),
              this.destroySkin(),
              this.cellContainer.destroy(!0),
              this.texture.destroy(!0),
              (this.texture.clearedFromCache = !0),
              this.nameSprite && this.nameSprite.destroy(!0),
              this.tagSprite && this.tagSprite.destroy(!0),
              this.game.events.$emit("minimap-destroy-node", this.pid);
          }
        };
      },
      ,
      function (e, s, i) {
        var a = i(129);
        e.exports = class {
          constructor() {
            (this.loaders = {}),
              (this.worker = new a()),
              this.worker.addEventListener(
                "message",
                this.onSkinLoaded.bind(this)
              );
          }
          createLoader(e) {
            return { image: null, error: null, callbacks: [e] };
          }
          clearCallbacks() {
            for (var e in this.loaders) delete this.loaders[e];
          }
          removeLoaderCallback(e, s) {
            var i = e.callbacks.indexOf(s);
            i >= 0 && e.callbacks.splice(i, 1);
          }
          loadSkin(e, s) {
            var i = this.loaders[e];
            return i
              ? i.image
                ? (s(i.image), null)
                : i.error
                ? null
                : (i.callbacks.push(s),
                  this.removeLoaderCallback.bind(this, i, s))
              : ((i = this.loaders[e] = this.createLoader(s)),
                this.worker.postMessage(e),
                this.removeLoaderCallback.bind(this, i, s));
          }
          onSkinLoaded(e) {
            var { skinUrl: s, bitmap: i, error: a } = e.data,
              n = this.loaders[s];
            if (a) return (n.error = !0), void (n.callbacks = []);
            for (n.image = i; n.callbacks.length; ) n.callbacks.pop()(i);
          }
        };
      },
      function (e, s, i) {
        let a = atob(
          "IWZ1bmN0aW9uKGUpe3ZhciB0PXt9O2Z1bmN0aW9uIG4ocil7aWYodFtyXSlyZXR1cm4gdFtyXS5leHBvcnRzO3ZhciBvPXRbcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW3JdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLG4pLG8ubD0hMCxvLmV4cG9ydHN9bi5tPWUsbi5jPXQsbi5kPWZ1bmN0aW9uKGUsdCxyKXtuLm8oZSx0KXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6cn0pfSxuLnI9ZnVuY3Rpb24oZSl7InVuZGVmaW5lZCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZyYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZToiTW9kdWxlIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCJfX2VzTW9kdWxlIix7dmFsdWU6ITB9KX0sbi50PWZ1bmN0aW9uKGUsdCl7aWYoMSZ0JiYoZT1uKGUpKSw4JnQpcmV0dXJuIGU7aWYoNCZ0JiYib2JqZWN0Ij09dHlwZW9mIGUmJmUmJmUuX19lc01vZHVsZSlyZXR1cm4gZTt2YXIgcj1PYmplY3QuY3JlYXRlKG51bGwpO2lmKG4ucihyKSxPYmplY3QuZGVmaW5lUHJvcGVydHkociwiZGVmYXVsdCIse2VudW1lcmFibGU6ITAsdmFsdWU6ZX0pLDImdCYmInN0cmluZyIhPXR5cGVvZiBlKWZvcih2YXIgbyBpbiBlKW4uZChyLG8sZnVuY3Rpb24odCl7cmV0dXJuIGVbdF19LmJpbmQobnVsbCxvKSk7cmV0dXJuIHJ9LG4ubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gbi5kKHQsImEiLHQpLHR9LG4ubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sbi5wPSIiLG4obi5zPTApfShbZnVuY3Rpb24oZSx0KXtvbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7IWZ1bmN0aW9uKGUpe2ZldGNoKGUse21vZGU6ImNvcnMifSkudGhlbihlPT5lLmJsb2IoKSkudGhlbihlPT5jcmVhdGVJbWFnZUJpdG1hcChlKSkudGhlbih0PT5zZWxmLnBvc3RNZXNzYWdlKHtza2luVXJsOmUsYml0bWFwOnR9KSkuY2F0Y2godD0+c2VsZi5wb3N0TWVzc2FnZSh7c2tpblVybDplLGVycm9yOiEwfSkpfShlLmRhdGEpfX1dKTs="
        );
        e.exports = function () {
          return new Worker(
            URL.createObjectURL(new Blob([a], { type: "text/javascript" }))
          );
        };
      },
      function (e, s, i) {
        var a = i(131),
          n = i(1),
          r = i(8),
          o = i(5),
          l = i(4),
          c = i(78),
          d = i(25),
          h = [],
          u = [],
          p = a.createInstance({ name: "game-replays" });
        function v(e) {
          var s = e || h.length;
          h.splice(0, s), u.splice(0, s);
        }
        var m = g(new ArrayBuffer(1));
        function g(e) {
          return btoa(String.fromCharCode.apply(null, new Uint8Array(e)));
        }
        function f(e) {
          e = atob(e);
          for (
            var s = new ArrayBuffer(e.length), i = new Uint8Array(s), a = 0;
            a < e.length;
            a++
          )
            i[a] = e.charCodeAt(a);
          return new DataView(s);
        }
        n.replay = {
          database: p,
          updateHistory: h,
          addHistory: function (e) {
            h.push(e),
              u.push(
                n.nodelist.map((e) => ({
                  type: e.type,
                  id: e.id,
                  pid: e.pid,
                  nx: e.nx,
                  ny: e.ny,
                  nSize: e.nSize,
                }))
              );
            var s = 25 * l.replayDuration;
            h.length > s && v(1);
          },
          clearHistory: v,
          play: function (e) {
            n.running && n.stop(), n.connection.close(), o.toast.close();
            var s = 1,
              i = e.split("|");
            "REPLAY" === i[0] && ((s = parseInt(i[1])), (i = i.slice(3)));
            var a = i.map(f),
              r = c(a.shift()),
              l = [];
            if (s >= 4) {
              for (; a[0].getUint8(0); ) l.push(a.shift());
              a.shift();
            } else l.push(a.shift());
            (r.replayUpdates = a),
              n.start(r),
              l.forEach((e) => {
                (e.packetId = -1), n.parseMessage(e);
              }),
              n.playback.setInitial(),
              n.showMenu(!1);
          },
          save: function () {
            var e = h.slice(0);
            if (e.length) {
              var s = [];
              let { players: i } = n.playerManager;
              i.forEach((e) => s.push(e)),
                e.splice(
                  0,
                  1,
                  (function (e) {
                    for (var s = 0, i = 0; i < e.length; i++)
                      s +=
                        1 +
                        (1 === e[i].type ? 2 : 0) +
                        2 +
                        2 +
                        2 +
                        2 +
                        (e[i].flags ? 1 : 0);
                    var a = new ArrayBuffer(1 + s + 1 + 2 + 2),
                      n = new DataView(a);
                    n.setUint8(0, 10);
                    var r = 1;
                    for (i = 0; i < e.length; i++) {
                      var o = e[i],
                        l = 254 & o.flags,
                        c = l ? 128 : 0;
                      n.setUint8(r, o.type | c),
                        r++,
                        1 === o.type && (n.setUint16(r, o.pid, !1), (r += 2)),
                        n.setUint16(r, o.id, !1),
                        (r += 2),
                        n.setInt16(r, o.nx, !1),
                        (r += 2),
                        n.setInt16(r, o.ny, !1),
                        (r += 2),
                        n.setUint16(r, o.nSize, !1),
                        (r += 2),
                        l && (n.setUint8(r, l), r++);
                    }
                    return (
                      n.setUint8(r, 0),
                      r++,
                      n.setUint16(r, 0, !1),
                      (r += 2),
                      n.setUint16(r, 0, !1),
                      (r += 2),
                      n
                    );
                  })(u[0])
                );
              var a,
                c,
                v,
                f,
                y,
                w,
                b = g(n.initialDataPacket.buffer),
                _ =
                  ((c = JSON.stringify(
                    (a = (a = s).map((e) => {
                      var s = {
                        pid: e.pid,
                        nickname: e.nameFromServer,
                        skinUrl: e.skinUrl,
                      };
                      return (
                        e.bot && (s.bot = !0),
                        e.tagId && (s.tagId = e.tagId),
                        e.hat && (s.hat = e.hat),
                        e.nameColorFromServer &&
                          (s.nameColor = e.nameColorFromServer),
                        s
                      );
                    }))
                  )),
                  (v = new d()).uint8(16),
                  v.utf8(c),
                  g(v.write())),
                k = e.map((e) => g(e.buffer)).join("|"),
                C = r.getTimestamp(),
                x = n.getThumbnail(),
                S = [];
              S.push("REPLAY"),
                S.push(4),
                S.push(x),
                S.push(b),
                n.multiboxPid &&
                  ((window.multiPacket =
                    ((f = n.multiboxPid),
                    (y = new ArrayBuffer(3)),
                    (w = new DataView(y)).setUint8(0, 8),
                    w.setUint16(1, f, !0),
                    g(y))),
                  S.push(window.multiPacket)),
                S.push(_),
                S.push(m),
                S.push(k);
              var M = S.join("|");
              p.setItem(C, M, () => {
                n.events.$emit("replay-added");
                var e = "Replay saved!";
                1 === l.showReplaySaved
                  ? n.events.$emit("chat-message", e)
                  : o.toast.fire({ type: "info", title: e, timer: 1500 });
              }).catch((e) => {
                var s = "Error saving replay";
                "string" == typeof e
                  ? (s += ": " + e)
                  : e && e.message && (s += ": " + e.message),
                  o.toast.fire({ type: "error", title: s });
              });
            }
          },
        };
      },
      ,
      function (e, s, i) {
        let a = i(1),
          n = i(79),
          r = i(80);
        a.playback = {};
        var o = (a.playback.updates = []);
        (a.playback.set = function (e) {
          a.playback.reset(), (a.playback.dry = !0);
          for (let s = 0; s < e.length; s++)
            o.unshift([{}, [], [], {}]),
              r["skid" + Math.max(a.protocol, 3)](
                new Uint8Array(e[s].buffer, 1),
                s
              );
          o.reverse(), delete a.playback.dry, (a.playback.index = 0);
        }),
          (a.playback.setInitial = function () {
            for (var e in a.nodes) {
              var s = a.nodes[e];
              e in o[0][3] ||
                (e in o[0][0]
                  ? (o[0][0][e].pid = s.pid)
                  : (o[0][0][e] = {
                      type: s.type,
                      id: s.id,
                      pid: s.pid,
                      x: s.nx,
                      y: s.ny,
                      size: s.nSize,
                      flags: s.flags,
                    }));
            }
            for (var i = 1; i < o.length; i++) {
              var n = o[i - 1],
                r = o[i];
              for (var e in r[0])
                if (e in n[0]) {
                  var l = r[0][e],
                    c = n[0][e];
                  16 & l.type && (l.pid = c.pid),
                    32 & l.type && ((l.x = c.x), (l.y = c.y)),
                    64 & l.type && (l.size = c.size);
                }
              for (var e in n[0]) e in r[3] || e in r[0] || (r[0][e] = n[0][e]);
            }
          }),
          (a.playback.reset = function () {
            o.splice(0, o.length), delete a.playback.index;
          }),
          (a.playback.seek = function (e, s) {
            var i = o[e];
            for (var r in a.nodes) (!s && r in i[0]) || n.remove(r);
            for (var r in i[0]) n.addOrUpdate(i[0][r]);
            (a.playback.index = e), a.updateCamera(!0);
          }),
          (a.playback.next = function () {
            if (a.playback.index >= o.length) a.playback.seek(0, !0);
            else {
              var [e, s, i] = o[a.playback.index++];
              for (var r in e) n.addOrUpdate(e[r]);
              for (var l = 0, c = s.length; l < c; ) n.remove(s[l++]);
              for (l = 0, c = i.length; l < c; ) n.remove(i[l++], i[l++]);
              a.updateCamera(!0);
            }
            a.events.$emit("replay-index-change", a.playback.index);
          });
      },
      function (e, s, i) {
        (s.PlayerCell = i(134)),
          (s.Food = i(135)),
          (s.Virus = i(136)),
          (s.EjectedMass = i(137)),
          (s.DeadCell = i(138)),
          (s.Crown = i(139));
      },
      function (e, s, i) {
        var a = i(14);
        class n extends a {
          constructor(e, s) {
            super(e),
              (this.player = s),
              (this.pid = s.pid),
              (this.isMultiNode = this.player.pid == GAME.multiboxPid),
              (this.isMe = this.player.pid == GAME.playerId),
              s.isMe && (GAME.nodesOwn[this.id] = !0),
              s.hasCrown && this.addCrown(),
              !s.isMe ||
                GAME.replaying ||
                (this.addArrow(), r || this.addLine());
          }
          updateLineVisibility() {
            if (this.line)
              return GAME.settings.showCellLines
                ? void (Multibox.connected()
                    ? Multibox.active
                      ? this.isMultiNode
                        ? (this.line.visible = !0)
                        : (this.line.visible = !1)
                      : this.isMultiNode
                      ? (this.line.visible = !1)
                      : (this.line.visible = !0)
                    : (this.line.visible = !0))
                : (this.line.visible = !1);
          }
          addLine() {
            (this.line = new o([this.x, this.y, GAME.mouse.x, GAME.mouse.y])),
              GAME.scene.container.addChild(this.line),
              this.updateLineVisibility();
          }
          addArrow() {
            (this.arrowSprite = new PIXI.Sprite.from(
              Multibox.arrowSprite.texture
            )),
              (this.arrowSprite.visible =
                window.settings.mbActive >= 2 &&
                (this.player.pid == Multibox.pid
                  ? Multibox.active
                  : !Multibox.active && Multibox.connected())),
              this.arrowSprite.anchor.set(0.5),
              (this.arrowSprite.width = this.arrowSprite.height = 130),
              (this.arrowSprite.alpha = 0.95),
              (this.arrowSprite.y = -310),
              this.sprite.addChild(this.arrowSprite);
          }
          setHat(e) {
            var s = e.split("/skin-bind/")[1];
            (e = e.split("/skin-bind/")[0]),
              (s && s !== this.player.skinUrl) ||
                ((this.hatSprite = new PIXI.Sprite.from(e)),
                this.hatSprite.anchor.set(0.5),
                (this.hatSprite.width = this.hatSprite.height = 1024),
                (this.hatSprite.alpha = 0.85),
                (this.hatSprite.visible = window.settings.skinsEnabled),
                this.sprite.addChildAt(this.hatSprite, 0),
                (GAME.playerManager.players.get(this.player.pid).hat = e));
          }
          addCrown() {
            if (!r && !this.crownSprite) {
              var e,
                s = this.game.crownPool;
              s.length
                ? (e = s.pop())
                : ((e = PIXI.Sprite.from("/img/crown.png")).scale.set(0.7),
                  e.pivot.set(0, 643),
                  (e.anchor.x = 0.5),
                  (e.rotation = -0.5),
                  (e.alpha = 0.7),
                  (e.zIndex = 2)),
                (this.crownSprite = e),
                this.sprite.addChild(e);
            }
          }
          removeCrown() {
            var e = this.crownSprite;
            e &&
              (this.sprite.removeChild(e),
              this.game.crownPool.push(e),
              (this.crownSprite = null));
          }
          onUpdate() {
            if (!r) {
              this.posarrow ||
                this.hasPosArrow ||
                ((this.posarrow = new PIXI.Sprite.from(
                  "https://i.postimg.cc/vmZmWCRR/4-Point-Star.png"
                )),
                this.posarrow.scale.set(0.1),
                (this.posarrow.alpha = 0.7),
                this.posarrow.anchor.set(3.5, 3.5),
                this.sprite.addChild(this.posarrow),
                (this.hasPosArrow = !0));
              var e,
                s,
                i,
                a = this.game.settings,
                n =
                  this.game.scene.container.scale.x *
                  this.size *
                  this.game.renderer.resolution,
                o = n > a.smallTextThreshold;
              if (
                (this.player.massShown &&
                  !this.massText &&
                  o &&
                  ((this.massText =
                    this.game.massTextPool.pop() ||
                    ((e = a.massTextStyle),
                    (s = new PIXI.BitmapText("", {
                      fontName: "mass",
                      align: "right",
                    })),
                    (i = e.strokeThickness || 0),
                    s.position.set(-i / 2, -i / 2),
                    s.anchor.set(0.5, -0.6),
                    s)),
                  (this.massText.zIndex = 0),
                  this.sprite.addChild(this.massText)),
                this.player.nameShown &&
                  !this.nameSprite &&
                  this.player &&
                  this.player.nameSprite &&
                  o &&
                  ((this.nameSprite = new PIXI.Sprite(
                    this.player.nameSprite.texture
                  )),
                  this.nameSprite.anchor.set(0.5),
                  (this.nameSprite.zIndex = 1),
                  this.sprite.addChild(this.nameSprite)),
                !this.tagSprite &&
                  settings.showTag &&
                  this.player &&
                  this.player.tagId !== GAME.tagId &&
                  this.player.tagSprite &&
                  ((this.tagSprite = new PIXI.Sprite(
                    this.player.tagSprite.texture
                  )),
                  this.tagSprite.anchor.set(0.5),
                  (this.tagSprite.y = 180),
                  (this.tagSprite.zIndex = 1),
                  this.sprite.addChild(this.tagSprite)),
                this.line &&
                  this.line.visible &&
                  this.line.updatePoints([
                    this.x,
                    this.y,
                    GAME.mouse.x,
                    GAME.mouse.y,
                  ]),
                this.crownSprite &&
                  (this.crownSprite.visible = n > 16 && a.showCrown),
                this.nameSprite &&
                  (this.nameSprite.visible = this.player.nameShown && o),
                this.tagSprite && (this.tagSprite.visible = settings.showTag),
                settings.showDir && !this.player.isMe && this.posarrow)
              ) {
                var c = 0,
                  d = !1;
                this.nx > this.ox
                  ? (this.nx - this.ox < 3 && (d = !0),
                    (c =
                      this.ny < this.oy
                        ? d
                          ? 0
                          : this.oy - this.ny < 3
                          ? 2
                          : 1
                        : d
                        ? 4
                        : this.ny - this.oy < 3
                        ? 2
                        : 3))
                  : (this.ox - this.nx < 3 && (d = !0),
                    (c =
                      this.ny < this.oy
                        ? d
                          ? 0
                          : this.oy - this.ny < 3
                          ? 6
                          : 7
                        : d
                        ? 4
                        : this.ny - this.oy < 3
                        ? 6
                        : 5)),
                  (this.posarrow.rotation = l[c]);
              }
              if (
                (this.posarrow && (this.posarrow.visible = settings.showDir),
                this.massText)
              ) {
                if (this.player.massShown && o) {
                  var h = this.game.getMassText(
                    (this.nSize * this.nSize) / 100
                  );
                  (this.massText.text = h), (this.massText.visible = !0);
                } else this.massText.visible && (this.massText.visible = !1);
              }
            }
          }
          onDestroy() {
            this.arrowSprite &&
              this.sprite.removeChild(this.arrowSprite) &&
              this.arrowSprite.destroy(),
              this.hatSprite &&
                this.sprite.removeChild(this.hatSprite) &&
                this.hatSprite.destroy(),
              this.tagSprite &&
                this.sprite.removeChild(this.tagSprite) &&
                this.tagSprite.destroy(),
              this.posarrow &&
                this.sprite.removeChild(this.posarrow) &&
                this.posarrow.destroy(),
              this.line &&
                GAME.scene.container.removeChild(this.line) &&
                this.line.destroy(),
              delete this.line,
              delete this.posarrow,
              this.massText &&
                (this.sprite.removeChild(this.massText),
                this.game.massTextPool.push(this.massText)),
              this.crownSprite && this.removeCrown();
          }
        }
        (n.prototype.type = 1),
          (n.prototype.isPlayerCell = !0),
          (e.exports = n);
      },
      function (e, s, i) {
        i(1);
        var a = i(14),
          n = i(12),
          r = i(4),
          o = i(76);
        function l(e) {
          var s;
          return (
            (s = r.useFoodColor
              ? PIXI.utils.string2hex(r.foodColor)
              : o.neon[e % o.neon.length]),
            n.cells.getTexture(s)
          );
        }
        class c extends a {
          constructor(e) {
            (e.texture = l(e.id)), super(e);
          }
          reloadTexture() {
            (this.texture = l(this.id)), (this.sprite.texture = this.texture);
          }
        }
        (c.prototype.type = 4), (c.prototype.isFood = !0), (e.exports = c);
      },
      function (e, s, i) {
        var a = i(14),
          n = i(12);
        class r extends a {
          constructor(e) {
            (e.texture = n.virus.getTexture()), super(e);
          }
          resetTexture() {
            this.destroySprite(),
              (this.texture = n.virus.getTexture()),
              (this.sprite = new PIXI.Sprite(this.texture)),
              this.sprite.anchor.set(0.5),
              (this.sprite.gameData = this);
          }
        }
        (r.prototype.type = 2), (r.prototype.isVirus = !0), (e.exports = r);
      },
      function (e, s, i) {
        var a = i(4),
          n = i(14),
          r = i(12);
        function o() {
          var e = PIXI.utils.string2hex(a.ejectedColor);
          return r.cells.getTexture(e);
        }
        class l extends n {
          constructor(e) {
            (e.texture = o()), super(e);
          }
          reloadTexture() {
            (this.texture = o()), (this.sprite.texture = this.texture);
          }
        }
        (l.prototype.type = 3), (l.prototype.isEjected = !0), (e.exports = l);
      },
      function (e, s, i) {
        var a = i(14),
          n = i(12);
        class r extends a {
          constructor(e, s, i) {
            (e.texture = n[i ? "squares" : "cells"].getTexture(s || 4210752)),
              super(e),
              (this.sprite.alpha = 0.5);
          }
        }
        (r.prototype.type = 5), (r.prototype.isDead = !0), (e.exports = r);
      },
      function (e, s, i) {
        var a = i(14);
        class n extends a {
          constructor(e) {
            (e.texture = PIXI.Texture.from("/img/crown.png")),
              super(e),
              (this.sprite.alpha = 0.7);
          }
        }
        (n.prototype.type = 6), (n.prototype.isCrown = !0), (e.exports = n);
      },
      function (e, s, i) {
        var a,
          n = void 0 !== n ? n : {},
          r = Object.assign({}, n),
          o = !0,
          l = !1,
          c = "";
        (o || l) &&
          (l
            ? (c = self.location.href)
            : "undefined" != typeof document &&
              document.currentScript &&
              (c = document.currentScript.src),
          (c =
            0 !== c.indexOf("blob:")
              ? c.substr(0, c.replace(/[?#].*/, "").lastIndexOf("/") + 1)
              : ""),
          l &&
            (a = (e) => {
              var s = new XMLHttpRequest();
              return (
                s.open("GET", e, !1),
                (s.responseType = "arraybuffer"),
                s.send(null),
                new Uint8Array(s.response)
              );
            }),
          (e, s, i) => {
            var a = new XMLHttpRequest();
            a.open("GET", e, !0),
              (a.responseType = "arraybuffer"),
              (a.onload = () => {
                200 == a.status || (0 == a.status && a.response)
                  ? s(a.response)
                  : i();
              }),
              (a.onerror = i),
              a.send(null);
          }),
          n.print || console.log.bind(console);
        var d,
          h = n.printErr || console.warn.bind(console);
        Object.assign(n, r),
          (r = null),
          n.arguments && n.arguments,
          n.thisProgram && n.thisProgram,
          n.quit && n.quit,
          n.wasmBinary && (d = n.wasmBinary),
          n.noExitRuntime,
          "object" != typeof WebAssembly &&
            E("no native wasm support detected");
        var u,
          p,
          v,
          m,
          g,
          f,
          y,
          s,
          w,
          b = !1,
          _ =
            "undefined" != typeof TextDecoder
              ? new TextDecoder("utf8")
              : void 0;
        function k(e, s) {
          return e
            ? (function (e, s, i) {
                for (var a = s + i, n = s; e[n] && !(n >= a); ) ++n;
                if (n - s > 16 && e.buffer && _)
                  return _.decode(e.subarray(s, n));
                for (var r = ""; s < n; ) {
                  var o = e[s++];
                  if (128 & o) {
                    var l = 63 & e[s++];
                    if (192 != (224 & o)) {
                      var c = 63 & e[s++];
                      if (
                        (o =
                          224 == (240 & o)
                            ? ((15 & o) << 12) | (l << 6) | c
                            : ((7 & o) << 18) |
                              (l << 12) |
                              (c << 6) |
                              (63 & e[s++])) < 65536
                      )
                        r += String.fromCharCode(o);
                      else {
                        var d = o - 65536;
                        r += String.fromCharCode(
                          55296 | (d >> 10),
                          56320 | (1023 & d)
                        );
                      }
                    } else r += String.fromCharCode(((31 & o) << 6) | l);
                  } else r += String.fromCharCode(o);
                }
                return r;
              })(v, e, s)
            : "";
        }
        function C(e, s, i) {
          return (function (e, s, i, a) {
            if (!(a > 0)) return 0;
            for (var n = i, r = i + a - 1, o = 0; o < e.length; ++o) {
              var l = e.charCodeAt(o);
              if (
                (l >= 55296 &&
                  l <= 57343 &&
                  (l =
                    (65536 + ((1023 & l) << 10)) | (1023 & e.charCodeAt(++o))),
                l <= 127)
              ) {
                if (i >= r) break;
                s[i++] = l;
              } else if (l <= 2047) {
                if (i + 1 >= r) break;
                (s[i++] = 192 | (l >> 6)), (s[i++] = 128 | (63 & l));
              } else if (l <= 65535) {
                if (i + 2 >= r) break;
                (s[i++] = 224 | (l >> 12)),
                  (s[i++] = 128 | ((l >> 6) & 63)),
                  (s[i++] = 128 | (63 & l));
              } else {
                if (i + 3 >= r) break;
                (s[i++] = 240 | (l >> 18)),
                  (s[i++] = 128 | ((l >> 12) & 63)),
                  (s[i++] = 128 | ((l >> 6) & 63)),
                  (s[i++] = 128 | (63 & l));
              }
            }
            return (s[i] = 0), i - n;
          })(e, v, s, i);
        }
        function x(e) {
          for (var s = 0, i = 0; i < e.length; ++i) {
            var a = e.charCodeAt(i);
            a <= 127
              ? s++
              : a <= 2047
              ? (s += 2)
              : a >= 55296 && a <= 57343
              ? ((s += 4), ++i)
              : (s += 3);
          }
          return s;
        }
        var S = [],
          M = [],
          T = [],
          I = 0,
          P = null,
          L = null;
        function E(e) {
          throw (
            (n.onAbort && n.onAbort(e),
            h((e = "Aborted(" + e + ")")),
            (b = !0),
            (e += ". Build with -sASSERTIONS for more info."),
            new WebAssembly.RuntimeError(e))
          );
        }
        var U,
          R,
          A = "data:application/octet-stream;base64,";
        function N(e) {
          return e.startsWith(A);
        }
        function D(e) {
          try {
            if (e == U && d) return new Uint8Array(d);
            if (a) return a(e);
            throw "both async and sync fetching of the wasm failed";
          } catch (s) {
            E(s);
          }
        }
        function O(e) {
          for (; e.length > 0; ) e.shift()(n);
        }
        function F(e) {
          (this.excPtr = e),
            (this.ptr = e - 24),
            (this.set_type = function (e) {
              y[(this.ptr + 4) >> 2] = e;
            }),
            (this.get_type = function () {
              return y[(this.ptr + 4) >> 2];
            }),
            (this.set_destructor = function (e) {
              y[(this.ptr + 8) >> 2] = e;
            }),
            (this.get_destructor = function () {
              return y[(this.ptr + 8) >> 2];
            }),
            (this.set_refcount = function (e) {
              f[this.ptr >> 2] = e;
            }),
            (this.set_caught = function (e) {
              (e = e ? 1 : 0), (p[(this.ptr + 12) >> 0] = e);
            }),
            (this.get_caught = function () {
              return 0 != p[(this.ptr + 12) >> 0];
            }),
            (this.set_rethrown = function (e) {
              (e = e ? 1 : 0), (p[(this.ptr + 13) >> 0] = e);
            }),
            (this.get_rethrown = function () {
              return 0 != p[(this.ptr + 13) >> 0];
            }),
            (this.init = function (e, s) {
              this.set_adjusted_ptr(0),
                this.set_type(e),
                this.set_destructor(s),
                this.set_refcount(0),
                this.set_caught(!1),
                this.set_rethrown(!1);
            }),
            (this.add_ref = function () {
              var e = f[this.ptr >> 2];
              f[this.ptr >> 2] = e + 1;
            }),
            (this.release_ref = function () {
              var e = f[this.ptr >> 2];
              return (f[this.ptr >> 2] = e - 1), 1 === e;
            }),
            (this.set_adjusted_ptr = function (e) {
              y[(this.ptr + 16) >> 2] = e;
            }),
            (this.get_adjusted_ptr = function () {
              return y[(this.ptr + 16) >> 2];
            }),
            (this.get_exception_ptr = function () {
              if (eb(this.get_type())) return y[this.excPtr >> 2];
              var e = this.get_adjusted_ptr();
              return 0 !== e ? e : this.excPtr;
            });
        }
        function B(e) {
          switch (e) {
            case 1:
              return 0;
            case 2:
              return 1;
            case 4:
              return 2;
            case 8:
              return 3;
            default:
              throw TypeError("Unknown type size: " + e);
          }
        }
        N((U = "js/wauth3.wasm?e8a9d050c93bafa1d0fc")) ||
          ((R = U), (U = n.locateFile ? n.locateFile(R, c) : c + R));
        var W = void 0;
        function H(e) {
          for (var s = "", i = e; v[i]; ) s += W[v[i++]];
          return s;
        }
        var z = {},
          G = {},
          V = {};
        function Z(e) {
          if (void 0 === e) return "_unknown";
          var s = (e = e.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
          return s >= 48 && s <= 57 ? "_" + e : e;
        }
        function j(e, s) {
          return (
            (e = Z(e)),
            Function(
              "body",
              "return function " +
                e +
                "() {\n        return body.apply(this, arguments);\n};\n"
            )(s)
          );
        }
        function K(e, s) {
          var i = j(s, function (e) {
            (this.name = s), (this.message = e);
            var i = Error(e).stack;
            void 0 !== i &&
              (this.stack =
                this.toString() + "\n" + i.replace(/^Error(:[^\n]*)?\n/, ""));
          });
          return (
            (i.prototype = Object.create(e.prototype)),
            (i.prototype.constructor = i),
            (i.prototype.toString = function () {
              return void 0 === this.message
                ? this.name
                : this.name + ": " + this.message;
            }),
            i
          );
        }
        var X = void 0;
        function Y(e) {
          throw new X(e);
        }
        function J(e, s, i = {}) {
          if (!("argPackAdvance" in s))
            throw TypeError(
              "registerType registeredInstance requires argPackAdvance"
            );
          var a = s.name;
          if (
            (e ||
              Y('type "' + a + '" must have a positive integer typeid pointer'),
            G.hasOwnProperty(e))
          ) {
            if (i.ignoreDuplicateRegistrations) return;
            Y("Cannot register type '" + a + "' twice");
          }
          if (((G[e] = s), delete V[e], z.hasOwnProperty(e))) {
            var n = z[e];
            delete z[e], n.forEach((e) => e());
          }
        }
        var q = [],
          Q = [
            {},
            { value: void 0 },
            { value: null },
            { value: !0 },
            { value: !1 },
          ];
        function ee(e) {
          e > 4 && 0 == --Q[e].refcount && ((Q[e] = void 0), q.push(e));
        }
        var et = {
          toValue: (e) => (
            e || Y("Cannot use deleted val. handle = " + e), Q[e].value
          ),
          toHandle(e) {
            switch (e) {
              case void 0:
                return 1;
              case null:
                return 2;
              case !0:
                return 3;
              case !1:
                return 4;
              default:
                var s = q.length ? q.pop() : Q.length;
                return (Q[s] = { refcount: 1, value: e }), s;
            }
          },
        };
        function es(e) {
          return this.fromWireType(f[e >> 2]);
        }
        var ei =
          "undefined" != typeof TextDecoder
            ? new TextDecoder("utf-16le")
            : void 0;
        function ea(e, s) {
          for (var i = e, a = i >> 1, n = a + s / 2; !(a >= n) && g[a]; ) ++a;
          if ((i = a << 1) - e > 32 && ei) return ei.decode(v.subarray(e, i));
          for (var r = "", o = 0; !(o >= s / 2); ++o) {
            var l = m[(e + 2 * o) >> 1];
            if (0 == l) break;
            r += String.fromCharCode(l);
          }
          return r;
        }
        function en(e, s, i) {
          if ((void 0 === i && (i = 2147483647), i < 2)) return 0;
          for (
            var a = s, n = (i -= 2) < 2 * e.length ? i / 2 : e.length, r = 0;
            r < n;
            ++r
          ) {
            var o = e.charCodeAt(r);
            (m[s >> 1] = o), (s += 2);
          }
          return (m[s >> 1] = 0), s - a;
        }
        function er(e) {
          return 2 * e.length;
        }
        function eo(e, s) {
          for (var i = 0, a = ""; !(i >= s / 4); ) {
            var n = f[(e + 4 * i) >> 2];
            if (0 == n) break;
            if ((++i, n >= 65536)) {
              var r = n - 65536;
              a += String.fromCharCode(55296 | (r >> 10), 56320 | (1023 & r));
            } else a += String.fromCharCode(n);
          }
          return a;
        }
        function el(e, s, i) {
          if ((void 0 === i && (i = 2147483647), i < 4)) return 0;
          for (var a = s, n = a + i - 4, r = 0; r < e.length; ++r) {
            var o = e.charCodeAt(r);
            if (
              (o >= 55296 &&
                o <= 57343 &&
                (o = (65536 + ((1023 & o) << 10)) | (1023 & e.charCodeAt(++r))),
              (f[s >> 2] = o),
              (s += 4) + 4 > n)
            )
              break;
          }
          return (f[s >> 2] = 0), s - a;
        }
        function ec(e) {
          for (var s = 0, i = 0; i < e.length; ++i) {
            var a = e.charCodeAt(i);
            a >= 55296 && a <= 57343 && ++i, (s += 4);
          }
          return s;
        }
        function ed(e, s) {
          var i,
            a,
            n = G[e];
          return (
            void 0 === n &&
              Y(s + " has unknown type " + ((i = ew(e)), (a = H(i)), ey(i), a)),
            n
          );
        }
        var eh = {};
        function eu(e) {
          var s = eh[e];
          return void 0 === s ? H(e) : s;
        }
        var ep = [];
        function ev() {
          return "object" == typeof globalThis
            ? globalThis
            : Function("return this")();
        }
        var em = [];
        (function () {
          for (var e = Array(256), s = 0; s < 256; ++s)
            e[s] = String.fromCharCode(s);
          W = e;
        })(),
          (X = n.BindingError = K(Error, "BindingError")),
          (n.InternalError = K(Error, "InternalError")),
          (n.count_emval_handles = function e() {
            for (var s = 0, i = 5; i < Q.length; ++i) void 0 !== Q[i] && ++s;
            return s;
          }),
          (n.get_first_emval = function e() {
            for (var s = 5; s < Q.length; ++s) if (void 0 !== Q[s]) return Q[s];
            return null;
          });
        var eg,
          ef = {
            n: function (e, s, i) {
              throw (new F(e).init(s, i), e);
            },
            r: function (e, s, i, a, n) {},
            v: function (e, s, i, a, n) {
              var r = B(i);
              J(e, {
                name: (s = H(s)),
                fromWireType: function (e) {
                  return !!e;
                },
                toWireType: function (e, s) {
                  return s ? a : n;
                },
                argPackAdvance: 8,
                readValueFromPointer: function (e) {
                  var a;
                  if (1 === i) a = p;
                  else if (2 === i) a = m;
                  else {
                    if (4 !== i)
                      throw TypeError("Unknown boolean type size: " + s);
                    a = f;
                  }
                  return this.fromWireType(a[e >> r]);
                },
                destructorFunction: null,
              });
            },
            u: function (e, s) {
              J(e, {
                name: (s = H(s)),
                fromWireType: function (e) {
                  var s = et.toValue(e);
                  return ee(e), s;
                },
                toWireType: function (e, s) {
                  return et.toHandle(s);
                },
                argPackAdvance: 8,
                readValueFromPointer: es,
                destructorFunction: null,
              });
            },
            m: function (e, i, a) {
              var n = B(a);
              J(e, {
                name: (i = H(i)),
                fromWireType: function (e) {
                  return e;
                },
                toWireType: function (e, s) {
                  return s;
                },
                argPackAdvance: 8,
                readValueFromPointer: (function e(i, a) {
                  switch (a) {
                    case 2:
                      return function (e) {
                        return this.fromWireType(s[e >> 2]);
                      };
                    case 3:
                      return function (e) {
                        return this.fromWireType(w[e >> 3]);
                      };
                    default:
                      throw TypeError("Unknown float type: " + i);
                  }
                })(i, n),
                destructorFunction: null,
              });
            },
            d: function (e, s, i, a, n) {
              (s = H(s)), -1 === n && (n = 4294967295);
              var r = B(i),
                o = (e) => e;
              if (0 === a) {
                var l = 32 - 8 * i;
                o = (e) => (e << l) >>> l;
              }
              var c = s.includes("unsigned");
              J(e, {
                name: s,
                fromWireType: o,
                toWireType: c
                  ? function (e, s) {
                      return this.name, s >>> 0;
                    }
                  : function (e, s) {
                      return this.name, s;
                    },
                argPackAdvance: 8,
                readValueFromPointer: (function e(s, i, a) {
                  switch (i) {
                    case 0:
                      return a
                        ? function (e) {
                            return p[e];
                          }
                        : function (e) {
                            return v[e];
                          };
                    case 1:
                      return a
                        ? function (e) {
                            return m[e >> 1];
                          }
                        : function (e) {
                            return g[e >> 1];
                          };
                    case 2:
                      return a
                        ? function (e) {
                            return f[e >> 2];
                          }
                        : function (e) {
                            return y[e >> 2];
                          };
                    default:
                      throw TypeError("Unknown integer type: " + s);
                  }
                })(s, r, 0 !== a),
                destructorFunction: null,
              });
            },
            b: function (e, s, i) {
              var a = [
                Int8Array,
                Uint8Array,
                Int16Array,
                Uint16Array,
                Int32Array,
                Uint32Array,
                Float32Array,
                Float64Array,
              ][s];
              function n(e) {
                var s = y,
                  i = s[(e >>= 2)],
                  n = s[e + 1];
                return new a(s.buffer, n, i);
              }
              J(
                e,
                {
                  name: (i = H(i)),
                  fromWireType: n,
                  argPackAdvance: 8,
                  readValueFromPointer: n,
                },
                { ignoreDuplicateRegistrations: !0 }
              );
            },
            l: function (e, s) {
              var i = "std::string" === (s = H(s));
              J(e, {
                name: s,
                fromWireType: function (e) {
                  var s,
                    a = y[e >> 2],
                    n = e + 4;
                  if (i)
                    for (var r = n, o = 0; o <= a; ++o) {
                      var l = n + o;
                      if (o == a || 0 == v[l]) {
                        var c = k(r, l - r);
                        void 0 === s ? (s = c) : ((s += "\0"), (s += c)),
                          (r = l + 1);
                      }
                    }
                  else {
                    var d = Array(a);
                    for (o = 0; o < a; ++o)
                      d[o] = String.fromCharCode(v[n + o]);
                    s = d.join("");
                  }
                  return ey(e), s;
                },
                toWireType: function (e, s) {
                  s instanceof ArrayBuffer && (s = new Uint8Array(s));
                  var a,
                    n = "string" == typeof s;
                  n ||
                    s instanceof Uint8Array ||
                    s instanceof Uint8ClampedArray ||
                    s instanceof Int8Array ||
                    Y("Cannot pass non-string to std::string"),
                    (a = i && n ? x(s) : s.length);
                  var r = e$(4 + a + 1),
                    o = r + 4;
                  if (((y[r >> 2] = a), i && n)) C(s, o, a + 1);
                  else if (n)
                    for (var l = 0; l < a; ++l) {
                      var c = s.charCodeAt(l);
                      c > 255 &&
                        (ey(o),
                        Y(
                          "String has UTF-16 code units that do not fit in 8 bits"
                        )),
                        (v[o + l] = c);
                    }
                  else for (l = 0; l < a; ++l) v[o + l] = s[l];
                  return null !== e && e.push(ey, r), r;
                },
                argPackAdvance: 8,
                readValueFromPointer: es,
                destructorFunction: function (e) {
                  ey(e);
                },
              });
            },
            h: function (e, s, i) {
              var a, n, r, o, l;
              (i = H(i)),
                2 === s
                  ? ((a = ea), (n = en), (o = er), (r = () => g), (l = 1))
                  : 4 === s &&
                    ((a = eo), (n = el), (o = ec), (r = () => y), (l = 2)),
                J(e, {
                  name: i,
                  fromWireType: function (e) {
                    for (
                      var i, n = y[e >> 2], o = r(), c = e + 4, d = 0;
                      d <= n;
                      ++d
                    ) {
                      var h = e + 4 + d * s;
                      if (d == n || 0 == o[h >> l]) {
                        var u = a(c, h - c);
                        void 0 === i ? (i = u) : ((i += "\0"), (i += u)),
                          (c = h + s);
                      }
                    }
                    return ey(e), i;
                  },
                  toWireType: function (e, a) {
                    "string" != typeof a &&
                      Y("Cannot pass non-string to C++ string type " + i);
                    var r = o(a),
                      c = e$(4 + r + s);
                    return (
                      (y[c >> 2] = r >> l),
                      n(a, c + 4, r + s),
                      null !== e && e.push(ey, c),
                      c
                    );
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: es,
                  destructorFunction: function (e) {
                    ey(e);
                  },
                });
            },
            w: function (e, s) {
              J(e, {
                isVoid: !0,
                name: (s = H(s)),
                argPackAdvance: 0,
                fromWireType: function () {},
                toWireType: function (e, s) {},
              });
            },
            f: function (e, s, i) {
              (e = et.toValue(e)), (s = ed(s, "emval::as"));
              var a = [],
                n = et.toHandle(a);
              return (y[i >> 2] = n), s.toWireType(a, e);
            },
            A: function (e, s, i, a, n) {
              var r, o;
              return (e = ep[e])(
                (s = et.toValue(s)),
                (i = eu(i)),
                ((o = []), (y[(r = a) >> 2] = et.toHandle(o)), o),
                n
              );
            },
            a: ee,
            c: function (e) {
              return 0 === e
                ? et.toHandle(ev())
                : ((e = eu(e)), et.toHandle(ev()[e]));
            },
            z: function (e, s) {
              var i,
                a,
                n = (function (e, s) {
                  for (var i = Array(e), a = 0; a < e; ++a)
                    i[a] = ed(y[(s + 4 * a) >> 2], "parameter " + a);
                  return i;
                })(e, s),
                r = n[0],
                o =
                  r.name +
                  "_$" +
                  n
                    .slice(1)
                    .map(function (e) {
                      return e.name;
                    })
                    .join("_") +
                  "$",
                l = em[o];
              if (void 0 !== l) return l;
              for (var c = ["retType"], d = [r], h = "", u = 0; u < e - 1; ++u)
                (h += (0 !== u ? ", " : "") + "arg" + u),
                  c.push("argType" + u),
                  d.push(n[1 + u]);
              var p =
                  "return function " +
                  Z("methodCaller_" + o) +
                  "(handle, name, destructors, args) {\n",
                v = 0;
              for (u = 0; u < e - 1; ++u)
                (p +=
                  "    var arg" +
                  u +
                  " = argType" +
                  u +
                  ".readValueFromPointer(args" +
                  (v ? "+" + v : "") +
                  ");\n"),
                  (v += n[u + 1].argPackAdvance);
              for (
                p += "    var rv = handle[name](" + h + ");\n", u = 0;
                u < e - 1;
                ++u
              )
                n[u + 1].deleteObject &&
                  (p += "    argType" + u + ".deleteObject(arg" + u + ");\n");
              return (
                r.isVoid ||
                  (p += "    return retType.toWireType(destructors, rv);\n"),
                (p += "};\n"),
                c.push(p),
                (i = (function (e, s) {
                  if (!(e instanceof Function))
                    throw TypeError(
                      "new_ called with constructor type " +
                        typeof e +
                        " which is not a function"
                    );
                  var i = j(e.name || "unknownFunctionName", function () {});
                  i.prototype = e.prototype;
                  var a = new i(),
                    n = e.apply(a, s);
                  return n instanceof Object ? n : a;
                })(Function, c).apply(null, d)),
                (a = ep.length),
                ep.push(i),
                (l = a),
                (em[o] = l),
                l
              );
            },
            B: function (e) {
              return (e = eu(e)), et.toHandle(n[e]);
            },
            i: function (e, s) {
              return (
                (e = et.toValue(e)), (s = et.toValue(s)), et.toHandle(e[s])
              );
            },
            y: function (e) {
              e > 4 && (Q[e].refcount += 1);
            },
            j: function (e) {
              return et.toHandle(eu(e));
            },
            D: function (e) {
              return !(e = et.toValue(e));
            },
            e: function (e) {
              (function (e) {
                for (; e.length; ) {
                  var s = e.pop();
                  e.pop()(s);
                }
              })(et.toValue(e)),
                ee(e);
            },
            x: function (e, s) {
              var i = (e = ed(e, "_emval_take_value")).readValueFromPointer(s);
              return et.toHandle(i);
            },
            s: function () {
              E("");
            },
            o: function (e, s, i, a, r, o, l, c) {
              n.su.playback.dry
                ? (n.su.playback.updates[0][0][s] = {
                    type: e,
                    id: s,
                    pid: i,
                    x: a,
                    y: r,
                    size: o,
                    flags: l,
                  })
                : n.Vi.addOrUpdate(
                    { type: e, id: s, pid: i, x: a, y: r, size: o, flags: l },
                    c
                  );
            },
            g: function (e, s, i) {
              n.su.playback.dry
                ? ((n.su.playback.updates[0][3][e] = !0),
                  n.su.playback.updates[0][1 + s].push(e),
                  s && n.su.playback.updates[0][1 + s].push(i))
                : n.Vi.remove(e, s ? i : -1);
            },
            C: function (e, s, i) {
              try {
                for (
                  var a = n[k(e)],
                    r = a && a[k(s)],
                    o = r && r[k(i)],
                    l = arguments.callee,
                    c = 0;
                  c < 4 + !r.df;
                  c++
                )
                  l = l.caller;
                if (l === o) return n.__heap_chunk_length_s || 64;
              } catch (d) {
                n.PointerExeptions && n.PointerExeptions(d);
              }
              return -1;
            },
            p: function (e) {
              var s = n[k(e)] + "",
                i = x(s) + 1,
                a = e$(i);
              return C(s, a, i), a;
            },
            t: function (e) {
              v.length, E("OOM");
            },
            k: function () {
              return 1 + Math.floor(2147483646 * Math.random());
            },
            q: function (e, s) {
              return et.toHandle(et.toValue(e).keys(et.toValue(s)));
            },
          },
          ey =
            ((function () {
              var e = { a: ef };
              function i(e, i) {
                var a,
                  r,
                  o = e.exports;
                (n.asm = o),
                  (a = (u = n.asm.E).buffer),
                  (n.HEAP8 = p = new Int8Array(a)),
                  (n.HEAP16 = m = new Int16Array(a)),
                  (n.HEAP32 = f = new Int32Array(a)),
                  (n.HEAPU8 = v = new Uint8Array(a)),
                  (n.HEAPU16 = g = new Uint16Array(a)),
                  (n.HEAPU32 = y = new Uint32Array(a)),
                  (n.HEAPF32 = s = new Float32Array(a)),
                  (n.HEAPF64 = w = new Float64Array(a)),
                  n.asm.K,
                  (r = n.asm.F),
                  M.unshift(r),
                  (function (e) {
                    if (
                      (I--,
                      n.monitorRunDependencies && n.monitorRunDependencies(I),
                      0 == I &&
                        (null !== P && (clearInterval(P), (P = null)), L))
                    ) {
                      var s = L;
                      (L = null), s();
                    }
                  })();
              }
              function a(e) {
                i(e.instance);
              }
              function r(s) {
                return (
                  !d && (o || l) && "function" == typeof fetch
                    ? fetch(U, { credentials: "same-origin" })
                        .then(function (e) {
                          if (!e.ok)
                            throw (
                              "failed to load wasm binary file at '" + U + "'"
                            );
                          return e.arrayBuffer();
                        })
                        .catch(function () {
                          return D(U);
                        })
                    : Promise.resolve().then(function () {
                        return D(U);
                      })
                )
                  .then(function (s) {
                    return WebAssembly.instantiate(s, e);
                  })
                  .then(function (e) {
                    return e;
                  })
                  .then(s, function (e) {
                    h("failed to asynchronously prepare wasm: " + e), E(e);
                  });
              }
              if (
                (I++,
                n.monitorRunDependencies && n.monitorRunDependencies(I),
                n.instantiateWasm)
              )
                try {
                  return n.instantiateWasm(e, i);
                } catch (c) {
                  return (
                    h(
                      "Module.instantiateWasm callback failed with error: " + c
                    ),
                    !1
                  );
                }
              d ||
              "function" != typeof WebAssembly.instantiateStreaming ||
              N(U) ||
              "function" != typeof fetch
                ? r(a)
                : fetch(U, { credentials: "same-origin" }).then(function (s) {
                    return WebAssembly.instantiateStreaming(s, e).then(
                      a,
                      function (e) {
                        return (
                          h("wasm streaming compile failed: " + e),
                          h("falling back to ArrayBuffer instantiation"),
                          r(a)
                        );
                      }
                    );
                  });
            })(),
            (n._skid = function () {
              return (n._skid = n.asm.G).apply(null, arguments);
            }),
            (n._free = function () {
              return (ey = n._free = n.asm.H).apply(null, arguments);
            })),
          ew =
            ((n._skid3 = function () {
              return (n._skid3 = n.asm.I).apply(null, arguments);
            }),
            (n._skid4 = function () {
              return (n._skid4 = n.asm.J).apply(null, arguments);
            }),
            (n.___getTypeName = function () {
              return (ew = n.___getTypeName = n.asm.L).apply(null, arguments);
            })),
          e$ =
            ((n.__embind_initialize_bindings = function () {
              return (n.__embind_initialize_bindings = n.asm.M).apply(
                null,
                arguments
              );
            }),
            (n._malloc = function () {
              return (e$ = n._malloc = n.asm.N).apply(null, arguments);
            })),
          eb = function () {
            return (eb = n.asm.O).apply(null, arguments);
          };
        function e_() {
          function e() {
            eg ||
              ((eg = !0),
              (n.calledRun = !0),
              b ||
                (O(M),
                n.onRuntimeInitialized && n.onRuntimeInitialized(),
                (function () {
                  var e;
                  if (n.postRun)
                    for (
                      "function" == typeof n.postRun &&
                      (n.postRun = [n.postRun]);
                      n.postRun.length;

                    )
                      (e = n.postRun.shift()), T.unshift(e);
                  O(T);
                })()));
          }
          I > 0 ||
            ((function () {
              var e;
              if (n.preRun)
                for (
                  "function" == typeof n.preRun && (n.preRun = [n.preRun]);
                  n.preRun.length;

                )
                  (e = n.preRun.shift()), S.unshift(e);
              O(S);
            })(),
            I > 0 ||
              (n.setStatus
                ? (n.setStatus("Running..."),
                  setTimeout(function () {
                    setTimeout(function () {
                      n.setStatus("");
                    }, 1),
                      e();
                  }, 1))
                : e()));
        }
        if (
          ((n.___start_em_js = 3812),
          (n.___stop_em_js = 3946),
          (L = function e() {
            eg || e_(), eg || (L = e);
          }),
          n.preInit)
        )
          for (
            "function" == typeof n.preInit && (n.preInit = [n.preInit]);
            n.preInit.length > 0;

          )
            n.preInit.pop()();
        e_(),
          (n.su = i(1)),
          (n.Vi = i(79)),
          (n.sv = document.currentScript),
          (n.__heap_max_bytes_s = function (e) {
            return 128 & e;
          }),
          (e.exports = window.Module = n);
      },
      function (e, s, i) {
        e.exports = i.p + "js/wauth3.wasm";
      },
      function (e, s, i) {
        var a = i(1),
          n = i(5),
          r = i(143),
          o = i(147),
          l = i(25),
          { createBuffer: c, writePlayerData: h } =
            (String.fromCharCode(atob("MTE=") + 8), i(8));
        (a.connection = {}),
          (a.connection.opened = !1),
          (a.connection.send = function (e) {
            a.connection.opened && a.ws.send(e);
          }),
          (a.connection.sendMouse = function () {
            var e = c(5),
              s = a.mouse.x,
              i = a.mouse.y;
            if (window.forcedMouse) var { x: s, y: i } = window.forcedMouse;
            if (
              (e.setUint8(0, 16),
              e.setInt16(1, s, !0),
              e.setInt16(3, i, !0),
              Multibox.active ? Multibox.send(e) : a.connection.send(e),
              Multibox.connected())
            ) {
              if (a.alive() && a.alive(1)) return;
              (e = c(5)).setUint8(0, 16),
                e.setInt16(1, a.mouse.x, !0),
                e.setInt16(3, a.mouse.y, !0),
                a.alive() ? Multibox.send(e) : a.connection.send(e);
            }
          }),
          (a.connection.sendOpcode = function (e, s) {
            var i = c(1);
            i.setUint8(0, e), s ? Multibox.send(i) : a.connection.send(i);
          }),
          (a.connection.sendJoinData = function (e, s) {
            var i = new l();
            i.uint8(5),
              i.uint8(a.clientVersion),
              i.uint8Array(e),
              h(i, void 0 !== s),
              i.utf8(localStorage.vanisToken),
              void 0 !== s ? s.send(i.write()) : a.connection.send(i.write());
          }),
          (a.connection.sendRecaptchaToken = function (e) {
            var s = new l();
            s.uint8(11), s.utf8(e), a.connection.send(s.write());
          }),
          (a.connection.sendChatMessage = function (e) {
            for (
              var s = unescape(encodeURIComponent(e)), i = [99], n = 0;
              n < s.length;
              n++
            )
              i.push(s.charCodeAt(n));
            var r = new Uint8Array(i).buffer;
            a.connection.send(r);
          });
        var u = 0,
          p = null,
          v = function () {
            for (var e = Array(arguments.length), s = 0; s < e.length; s++)
              e[s] = arguments[s];
            return d.apply(t, e);
          };
        function m(e, s) {
          n.toast.fire({
            type: s ? "error" : "info",
            title: e,
            timer: s ? 5e3 : 2e3,
          });
        }
        function g() {
          delete a.currentWsId,
            (a.connection.opened = !1),
            m("Connection failed!", !0);
        }
        function f(e) {
          if (
            (delete a.currentWsId,
            (a.connection.opened = !1),
            a.running && a.stop(),
            1003 === e.code)
          )
            m("Server restarting...") &&
              setTimeout(
                () =>
                  !a.connection.opened && a.events.$emit("reconnect-server"),
                3e3
              );
          else {
            var s = "You have been disconnected";
            e.reason && (s += " (" + e.reason + ")"), m(s, !0);
          }
          setTimeout(
            () => !a.connection.opened && a.events.$emit("reconnect-server"),
            6e3
          ),
            a.showMenu(!0, !0);
        }
        (a.connection.preopen = function (e) {
          p && (p.abort(), (p = null));
          var s = new AbortController();
          p = v
            .get(e.replace("ws", "http"), {
              withCredentials: !0,
              responseType: "text",
              signal: s.signal,
            })
            .then((s) => (200 === s.status ? a.connection.open(e) : g()))
            .catch(() => g());
        }),
          (a.connection.open = function (e) {
            Multibox.close(),
              a.running && (a.stop(), (GAME.multiboxPid = !1)),
              a.connection.close(),
              a.events.$emit("chat-clear"),
              (a.connection.opened = !0);
            var s = (a.ws = new o(e, "tFoL46WDlZuRja7W6qCl"));
            (s.binaryType = "arraybuffer"),
              (s.packetId = 0),
              (s.onopen = function () {
                a.connection.opened &&
                  ((a.currentWsId = s.id = u++),
                  a.events.$emit("players-menu", s.id),
                  a.events.$emit("account-menu", s.id),
                  a.events.$emit("chatbox-menu", s.id),
                  a.events.$emit("options-menu", s.id),
                  a.events.$emit("replays-menu", s.id),
                  (a.state.connectionUrl = e),
                  (s.onclose = f));
              }),
              (s.onclose = g),
              (s.onmessage = function (e) {
                (GAME.nwData += e.data.byteLength),
                  r(new DataView(e.data), e.data);
              });
          }),
          (a.connection.close = function () {
            Multibox.close(),
              (a.debugElement.innerHTML = ""),
              a.ws &&
                ((a.state.connectionUrl = null),
                (a.ws.onmessage = null),
                (a.ws.onclose = null),
                (a.ws.onerror = null),
                a.ws.close(),
                delete a.ws,
                (a.connection.opened = !1));
          });
      },
      function (e, s, i) {
        var a = i(1),
          r = i(5),
          o = i(144),
          l = i(145),
          c = i(146),
          d = i(78),
          { htmlEncode: h } = i(8);
        i(80),
          (e.exports = a.parseMessage =
            function (e, s) {
              function i() {
                for (var s, i = ""; 0 != (s = e.getUint16(g, !0)); )
                  (g += 2), (i += String.fromCharCode(s));
                return (g += 2), i;
              }
              function u() {
                for (var s, i = ""; 0 != (s = e.getUint8(g, !0)); )
                  (g += 1), (i += String.fromCharCode(s));
                return (g += 1), i;
              }
              var p,
                v,
                m,
                g = 0;
              switch (e.getUint8(g++)) {
                case 1:
                  var f = d(e);
                  (a.initialDataPacket = a.initData = e), a.start(f);
                  break;
                case 2:
                  var y = (window.a = new Uint8Array(e.buffer, 1));
                  a.connection.sendJoinData(new n(y).build());
                  break;
                case 3:
                  var w = Date.now() - a.pingstamp;
                  a.updateStats(w);
                  break;
                case 4:
                  for (; (M = e.getUint16(g, !0)); )
                    a.playerManager.delayedRemovePlayer(M), (g += 2);
                  break;
                case 6:
                  a.connection.sendOpcode(6);
                  break;
                case 7:
                  if (1 & (m = e.getUint8(g++))) {
                    var b = e.getUint16(g, !0);
                    (p = a.playerManager.getPlayer(b)), (g += 2);
                  }
                  if (2 & m) {
                    var _ = e.getUint16(g, !0);
                    (v = a.playerManager.getPlayer(_)), (g += 2);
                  }
                  v && v.setCrown(!1), p && p.setCrown(!0);
                  break;
                case 8:
                  (window.multipacketgot = e),
                    a.multiboxPid || (a.multiboxPid = e.getUint16(g, !0));
                  break;
                case 9:
                  a.activePid &&
                    a.playerManager.getPlayer(a.activePid).setOutline(16777215),
                    (a.activePid = e.getUint16(g, !0)),
                    a.playerManager.getPlayer(a.activePid).setOutline(16711935);
                  break;
                case 10: {
                  (a.timestamp = performance.now()),
                    (a.isAlive = !1),
                    a.parseNodes(s);
                  let { state: k } = a;
                  (k.isAlive = a.isAlive),
                    k.isAlive
                      ? (a.spectating = !1)
                      : k.isAutoRespawning &&
                        37 == ++a.ticksSinceDeath &&
                        a.triggerAutoRespawn(!1),
                    delete a.isAlive,
                    a.serverTick++,
                    a.playerManager.sweepRemovedPlayers(),
                    a.updateCamera(!0);
                  break;
                }
                case 11:
                  var C = c(a, e);
                  a.events.$emit("leaderboard-update", C);
                  break;
                case 12:
                  var x = l(e);
                  a.events.$emit("minimap-positions", x);
                  break;
                case 13:
                  var S = o(e),
                    M = S.pid;
                  if (((s = S.text), !M))
                    return void a.events.$emit("chat-message", s);
                  if (!(O = a.playerManager.getPlayer(M))) return;
                  var T = { pid: M, text: s, from: O.name };
                  O.nameColorCss && (T.fromColor = O.nameColorCss),
                    a.events.$emit("chat-message", T);
                  break;
                case 14:
                  if (((f = {}), 2 & (m = e.getUint8(g++)))) {
                    var I = {
                      1: "success",
                      2: "error",
                      3: "warning",
                      4: "info",
                    }[e.getUint8(g++)];
                    I && (f.type = I);
                  }
                  4 & m && ((f.timer = e.getUint16(g, !0)), (g += 2)),
                    (f.title = h(u())),
                    r.toast.fire(f);
                  break;
                case 15:
                  for (; (M = e.getUint16(g, !0)), (g += 2), M; ) {
                    var P = i(),
                      L = u();
                    a.playerManager.setPlayerData({
                      pid: M,
                      nickname: P,
                      skinUrl: L,
                    });
                  }
                  break;
                case 16:
                  var E = u(),
                    U = JSON.parse(decodeURIComponent(escape(E))),
                    R = U.find((e) => e.pid === a.playerId),
                    A = !1;
                  R && (A = a.setTagId(R.tagId));
                  for (var N = [], D = 0; D < U.length; D++) {
                    var O = a.playerManager.setPlayerData(U[D]);
                    N.push(O);
                  }
                  A &&
                    (a.events.$emit("minimap-positions", []),
                    a.playerManager.invalidateVisibility(N));
                  break;
                case 17:
                  (a.camera.sx = e.getInt16(g, !0)),
                    (g += 2),
                    (a.camera.sy = e.getInt16(g, !0)),
                    (g += 2);
                  break;
                case 18:
                  (Multibox.connected() && a.alive(1)) ||
                    a.replay.clearHistory(),
                    a.clearNodes();
                  break;
                case 19:
                  var F = e.getUint8(g++),
                    B = e.getUint32(g, !0);
                  if (((g += 4), a.events.$emit("xp-update", B), !F)) break;
                  r.toast.fire({
                    title: "You have reached level " + e.getUint16(g, !0) + "!",
                    background: "#b37211",
                    timer: 3e3,
                  }),
                    (g += 2);
                  break;
                case 20:
                  a.handleDeath(e, !1);
                  break;
                case 21:
                  break;
                case 22:
                  if (!window.grecaptcha)
                    return void alert("Captcha library is not loaded");
                  a.events.$emit("show-image-captcha");
                  break;
                case 23:
                  a.state.spectators = e.getUint16(g, !0);
                  break;
                case 24:
                  (a.serverTick = e.getUint32(g, !0)),
                    a.events.$emit(
                      "restart-timing-changed",
                      e.getUint32(g + 4, !0)
                    );
                  break;
                case 25:
                  a.events.$emit("update-cautions", { custom: i() });
                  break;
                case 26:
                  (a.state.playButtonDisabled = !!e.getUint8(g++)),
                    e.byteLength > g &&
                      (a.state.playButtonText = u() || "Play");
              }
            });
      },
      function (e) {
        e.exports = function (e) {
          var s = 1,
            i = e.getInt16(s, !0);
          s += 2;
          for (var a = "", n = ""; 0 != (n = e.getUint16(s, !0)); )
            (s += 2), (a += String.fromCharCode(n));
          return { pid: i, text: a };
        };
      },
      function (e) {
        e.exports = function (e) {
          for (var s = 1, i = []; ; ) {
            var a = e.getUint16(s, !0);
            if (((s += 3), !a)) break;
            var n = e.getUint8(s, !0) / 255;
            s += 1;
            var r = e.getUint8(s, !0) / 255;
            (s += 1), i.push({ pid: a, x: n, y: r });
          }
          return i;
        };
      },
      function (e) {
        e.exports = function (e, s) {
          for (var i = 1, a = []; ; ) {
            var n = s.getUint16(i, !0);
            if (((i += 2), !n)) break;
            var r = e.playerManager.getPlayer(n);
            r &&
              a.push({
                pid: n,
                position: 1 + a.length,
                text: r.name,
                color: r.nameColorCss || "#ffffff",
                bold: !!r.nameColor,
              });
          }
          return a;
        };
      },
      function (e) {
        e.exports = window.WebSocket;
      },
      function (e, s, i) {
        var a = i(1),
          n = (i(149), i(66)),
          { htmlEncode: r } = (i(5), i(8)),
          o = a.renderer.view,
          l = {};
        window.addEventListener("blur", () => {
          l = {};
        }),
          localStorage.adminMode;
        var c = /firefox/i.test(navigator.userAgent)
          ? "DOMMouseScroll"
          : "wheel";
        function d() {
          var e = a.actions.findPlayerUnderMouse(),
            s = e && e.player;
          s && a.events.$emit("context-menu", event, s);
        }
        function h() {
          a.scene.setPosition();
        }
        function u(e) {
          var s = e.clientX,
            i = e.clientY;
          (a.rawMouse.x = s), (a.rawMouse.y = i), a.updateMouse();
        }
        function p(e) {
          e.preventDefault(), o.focus();
          var s = "MOUSE" + e.button;
          if (a.spectating && 0 === e.button) {
            var i = a.actions.findPlayerUnderMouse();
            i
              ? (a.actions.spectate(i.pid), a.actions.targetPlayer(i.pid))
              : a.actions.targetPlayer();
          } else n.press(s);
        }
        function v(e) {
          var s = "MOUSE" + e.button;
          n.release(s), (l[s] = !1);
        }
        function m(e) {
          let s = e.target === o;
          if (!s && e.target !== document.body) return;
          let r = n.convertKey(e.code);
          if ((!e.ctrlKey || "TAB" !== r) && !l[i]) {
            if (((l[r] = !0), "ESCAPE" === r)) {
              a.replaying
                ? ((l = {}), a.stop(), a.showMenu(!0))
                : a.state.isAutoRespawning || Multibox.autoRespawning
                ? a.triggerDeathDelay()
                : a.showMenu();
              return;
            }
            if ("ENTER" === r) {
              a.events.$emit("chat-focus");
              return;
            }
            s && n.press(r) && e.preventDefault();
          }
        }
        function g(e, s) {}
        function f(e, s = !1) {}
        function y(e) {
          var s = n.convertKey(e.code);
          n.release(s), (l[s] = !1);
        }
        function w(e) {
          a.actions.zoom(e);
        }
        a.eventListeners = function (e) {
          e
            ? (window.addEventListener("resize", h),
              o.addEventListener("mousedown", p),
              o.addEventListener(c, w, { passive: !0 }),
              o.addEventListener("contextmenu", d),
              document.addEventListener("mouseup", v),
              document.body.addEventListener("mousemove", u),
              document.body.addEventListener("keydown", m),
              document.body.addEventListener("keyup", y),
              (window.onbeforeunload = () =>
                "Are you sure you want to close the page?"))
            : (window.removeEventListener("resize", h),
              o.removeEventListener("mousedown", p),
              o.removeEventListener(c, w),
              o.removeEventListener("contextmenu", d),
              document.removeEventListener("mouseup", v),
              document.body.removeEventListener("mousemove", u),
              document.body.removeEventListener("keydown", m),
              document.body.removeEventListener("keyup", y),
              (window.onbeforeunload = null));
        };
      },
      function (e, s, a) {
        var n = a(1),
          r = a(4),
          o = a(25),
          { createBuffer: l, writePlayerData: c } = a(8),
          d = (n.actions = {});
        (d.spectate = (e, s) => {
          GAME.alive() || GAME.alive(1) || (n.spectating = !0);
          var i = l(e ? 3 : 1);
          i.setUint8(0, 2),
            e && i.setInt16(1, e, !0),
            s ? Multibox.send(i) : n.connection.send(i);
        }),
          (d.join = function (e) {
            GAME.events.$emit("reset-cautions");
            var s = new o();
            s.uint8(1),
              c(s, e),
              e ? Multibox.send(s.write()) : n.connection.send(s.write());
          }),
          (d.spectateLockToggle = function () {
            n.connection.sendOpcode(10);
          }),
          (d.feed = function (e) {
            var s;
            arguments.length
              ? ((s = l(2)).setUint8(0, 21), s.setUint8(1, +e))
              : (s = l(1)).setUint8(0, 21),
              Multibox.active ? Multibox.send(s) : n.connection.send(s);
          }),
          (d.freezeMouse = function (e) {
            n.running &&
              (void 0 === e && (e = !n.mouseFrozen),
              e &&
                (d.stopMovement(!1),
                d.lockLinesplit(!1),
                n.updateMouse(!0),
                n.connection.sendMouse()),
              (n.mouseFrozen = e),
              n.events.$emit("update-cautions", { mouseFrozen: e }));
          }),
          (d.stopMovement = function (e) {
            n.running &&
              (void 0 === e && (e = !n.moveToCenterOfCells),
              e && (d.freezeMouse(!1), d.lockLinesplit(!1)),
              (n.moveToCenterOfCells = e),
              n.events.$emit("update-cautions", { moveToCenterOfCells: e }));
          }),
          (d.lockLinesplit = (e) => {
            n.running &&
              ((GAME.linesplitting = !0),
              void 0 === e && (e = !n.stopMovePackets),
              e &&
                (n.updateMouse(),
                n.connection.sendMouse(),
                n.connection.sendOpcode(15, Multibox.active),
                d.freezeMouse(!1),
                d.stopMovement(!1)),
              (n.stopMovePackets = e),
              n.events.$emit("update-cautions", { lockLinesplit: e }));
          }),
          (d.linesplit = (e) => {
            d.freezeMouse(!0),
              d.split(3, !0, e),
              d.linesplitUnlock && clearTimeout(d.linesplitUnlock),
              (d.linesplitUnlock = setTimeout(() => {
                delete d.linesplitUnlock, d.freezeMouse(!1);
              }, 1250));
          }),
          (d.split = (e, s, a) => {
            n.cautions?.showLinesplitting || s || n.actions.freezeMouse(!1),
              (!n.cautions?.showLinesplitting || a) && n.connection.sendMouse();
            let r = i.fromSize(2);
            r.writeUInt8(17),
              r.writeUInt8(e),
              (Multibox.active ? Multibox.send : n.connection.send)(
                r.toBuffer()
              ),
              (n.splitCount += e),
              n.splitCount <= 2
                ? (n.moveWaitUntil = performance.now() + 300)
                : ((n.moveWaitUntil = 0), (n.splitCount = 0));
          }),
          (d.ping = () => {}),
          (d.aimbotlocker = () => {
            let e = window.aimbotpid;
            if (e) {
              let { playerManager: s } = GAME,
                i = s.getPlayer(e);
              i && i.setOutline(0, 0),
                (window.aimbotpid = null),
                GAME.setText("");
            } else
              (window.aimbotpid = "SELECT"),
                GAME.setText("Click a player to lock triggerbot");
          }),
          (d.multicombo = (e) => {
            if (n.alive(1) && n.alive()) {
              switch (e) {
                case 1:
                  d.split(1),
                    (Multibox.active = !Multibox.active),
                    n.connection.sendMouse(),
                    d.split(6),
                    setTimeout(() => {
                      d.split(6);
                    }, 30);
                  break;
                case 2:
                  d.split(2),
                    (Multibox.active = !Multibox.active),
                    n.connection.sendMouse(),
                    d.split(6),
                    setTimeout(() => {
                      d.split(6);
                    }, 30);
                  break;
                case 3:
                  d.linesplit(),
                    (Multibox.active = !Multibox.active),
                    n.connection.sendMouse(),
                    d.split(6, !0),
                    setTimeout(() => {
                      d.split(6, !0);
                    }, 30);
              }
              setTimeout(() => {
                Multibox.active = !Multibox.active;
              }, 45);
            }
          }),
          (d.switchMultibox = function () {}),
          (d.zoom = (e) => {
            var s = 0;
            e.wheelDelta
              ? (s = -(e.wheelDelta / 120))
              : e.detail && (s = e.detail / 3);
            var i = Math.pow(1 - r.cameraZoomSpeed / 100, s);
            n.mouseZoom = Math.min(
              Math.max(n.mouseZoom * i, n.mouseZoomMin),
              1
            );
          }),
          (d.setZoomLevel = function (e) {
            n.mouseZoom = 0.8 / Math.pow(2, e - 1);
          }),
          (d.targetPlayer = (e) => {
            if (("string" == typeof e && (e = +e), e))
              (n.selectedPlayer = e),
                (s = { player: n.playerManager.getPlayer(e) });
            else {
              var s = d.findPlayerUnderMouse();
              n.selectedPlayer = s && s.pid;
            }
            if (
              ("SELECT" != window.aimbotpid ||
                s.player?.isMe ||
                ((window.aimbotpid = n.selectedPlayer),
                s.player.setOutline(16711680, 30),
                GAME.setText(
                  `TRIGGERBOT LOCKED: "${s.player.name}" (${n.selectedPlayer})`
                )),
              GAME.settings.playerStats && s)
            ) {
              var i = s.player;
              GAME.playerElement.innerHTML = `
        ${
          i.skinUrl
            ? `<img src="${i.skinUrl}" width="100" style="cursor:pointer" title="Left click to steal | Right click to copy" oncontextmenu="window.copySkin('${i.skinUrl}')" onclick="window.yoinkSkin('${i.skinUrl}')"><br>`
            : ""
        }
        <font color="${i.nameColorCss ? i.nameColorCss : "#ffffff"}">${
                i.name
              }</font><br>${i.pid} : ${i.tagId}
        ${
          window.aimbotpid == i.pid
            ? '<br><font color="red"><b>TRIGGER LOCKED</b></font>'
            : ""
        }
        `;
            } else GAME.playerElement.innerHTML = "";
          }),
          (d.findPlayerUnderMouse = (e) => {
            for (
              var s = n.mouse,
                i = null,
                a = 1 / 0,
                r = n.nodelist
                  .filter((e) => e.pid)
                  .sort((e, s) => e.size - s.size),
                o = 0;
              o < r.length;
              o++
            ) {
              var l = r[o],
                c = l.x - s.x,
                d = l.y - s.y,
                h = Math.sqrt(Math.abs(c * c + d * d)) - l.size;
              if (e) h < a && ((a = h), (i = l));
              else if (h <= 0) return l;
            }
            return i;
          }),
          (d.toggleSkins = function (e) {
            (e = void 0 === e ? !r.skinsEnabled : e),
              r.set("skinsEnabled", e),
              n.playerManager.invalidateVisibility(),
              GAME.nodelist
                .filter((e) => e.hatSprite)
                .forEach((e) => {
                  e.hatSprite.visible = window.settings.skinsEnabled;
                });
          }),
          (d.toggleNames = function (e) {
            (e = void 0 === e ? !r.namesEnabled : e),
              r.set("namesEnabled", e),
              n.playerManager.invalidateVisibility();
          }),
          (d.toggleMass = function () {
            var e = !r.massEnabled;
            r.set("massEnabled", e), n.playerManager.invalidateVisibility();
          }),
          (d.toggleFood = function (e) {
            (e = void 0 === e ? !r.foodVisible : e),
              r.set("foodVisible", e),
              (n.scene.food.visible = e);
          }),
          (d.toggleHud = function () {
            var e = !n.app.showHud;
            (n.app.showHud = e), r.set("showHud", e);
          }),
          (d.toggleChat = function () {
            var e = !r.showChat;
            r.set("showChat", e),
              n.running && n.events.$emit("chat-visible", { visible: e });
          }),
          (d.toggleChatToast = function () {
            var e = !r.showChatToast;
            r.set("showChatToast", e),
              n.events.$emit("chat-visible", { visibleToast: e });
          });
      },
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      function (e, s, i) {
        "use strict";
        var a = i(29);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(32);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(33);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(34);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(35);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(36);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(37);
        i.n(a).a;
      },
      function () {},
      ,
      ,
      ,
      ,
      ,
      function () {},
      ,
      function () {},
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      function (e, s, i) {
        "use strict";
        var a = i(40);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(41);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(42);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(43);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(44);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        var a = i(19),
          n = localStorage.vanisToken || null;
        e.exports = new (class {
          constructor(e, s) {
            (this.url = e), (this.vanisToken = s);
          }
          setToken(e) {
            (this.vanisToken = e), (localStorage.vanisToken = e);
          }
          clearToken() {
            (this.vanisToken = null), delete localStorage.vanisToken;
          }
          async call(e, s) {
            return (
              await a({
                method: e,
                url: this.url + s,
                headers: { Authorization: "Vanis " + this.vanisToken },
              })
            ).data;
          }
          get(e) {
            return this.call("GET", e);
          }
        })("https://vanis.io/api", n);
      },
      function (e) {
        e.exports = {
          getXp: function (e) {
            return Math.round((e * e) / (0.1 * 0.1));
          },
          getLevel: function (e) {
            return Math.floor(0.1 * Math.sqrt(e));
          },
        };
      },
      function (e, s, i) {
        "use strict";
        var a = i(45);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(46);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(47);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(48);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(49);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(50);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(51);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(52);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(53);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(54);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(57);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(58);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(59);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(60);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(61);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(62);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        "use strict";
        var a = i(63);
        i.n(a).a;
      },
      function () {},
      function (e) {
        var s = "seenNotifications";
        e.exports = new (class {
          constructor() {
            this.seenList = this.parseSeen(localStorage[s]);
          }
          parseSeen(e) {
            if (!e) return [];
            try {
              var s = JSON.parse(e);
              if (Array.isArray(s)) return s;
            } catch (i) {}
            return [];
          }
          saveSeen() {
            try {
              localStorage[s] = JSON.stringify(this.seenList);
            } catch (e) {}
          }
          isSeen(e) {
            return this.seenList.includes(e);
          }
          setSeen(e) {
            this.isSeen(e) || (this.seenList.push(e), this.saveSeen());
          }
        })();
      },
      function (e, s, i) {
        "use strict";
        var a = i(64);
        i.n(a).a;
      },
      function () {},
      function (e, s, i) {
        var a,
          n,
          r,
          o,
          l = i(1),
          c = document.createElement("canvas"),
          d = c.getContext("2d");
        function h() {
          (a = c.width = window.innerWidth),
            (n = c.height = window.innerHeight),
            (r = a / 2),
            (o = n / 2);
        }
        window.addEventListener("resize", h), h();
        class u {
          spawn(e) {
            (this.x = e.x),
              (this.y = e.y),
              (this.angle = Math.atan2(this.y, this.x)),
              (this.radius = 0.1),
              (this.speed = 0.4 + 3.3 * Math.random());
          }
          update(e) {
            var s = this.speed * e;
            (this.x += Math.cos(this.angle) * s),
              (this.y += Math.sin(this.angle) * s),
              (this.radius += 0.0035 * s);
          }
        }
        var p = Array(200)
            .fill(null)
            .map(() => new u()),
          v = !1,
          m = 0,
          g = 0;
        function f(e) {
          if (l.running)
            return (
              window.removeEventListener("resize", h),
              void (c.parentNode && c.parentNode.removeChild(c))
            );
          var s,
            i =
              window.performance && window.performance.now
                ? window.performance.now()
                : Date.now();
          m || (m = g = i), (e = (i - g) / 6);
          var u = i - m - 550;
          if (u > 0) {
            var y = u / 1e3;
            y > 1.2 && (y = 1.2), (e /= Math.pow(3, y));
          }
          requestAnimationFrame(f),
            d.clearRect(0, 0, a, n),
            d.save(),
            d.translate(r, o),
            (s = e),
            d.beginPath(),
            (d.fillStyle = "#00b8ff"),
            (d.globalAlpha = 0.9),
            p.forEach((e) => {
              var i, l, c, h, u;
              (v ||
                ((l = r + (i = e).radius),
                (c = o + i.radius),
                i.x < -l || i.x > l || i.y < -c || i.y > c)) &&
                e.spawn(
                  ((h = a),
                  {
                    x: Math.random() * h * 2 - h,
                    y: Math.random() * (u = n) * 2 - u,
                  })
                ),
                e.update(s),
                d.moveTo(e.x, e.y),
                d.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
            }),
            (v = !1),
            d.fill(),
            d.restore(),
            (g = i);
        }
        function y() {
          (v = !0),
            (m = g = 0),
            d.clearRect(0, 0, a, n),
            document.getElementById("overlay").prepend(c),
            setTimeout(f, 2e3);
        }
        l.events.$on("game-stopped", y), y();
      },
      function (e, s, i) {
        var a = i(1);
        a.events.$on("players-menu", (e) => {
          if ("visible" === e) {
            (s = document.getElementById("player-modal")).children;
            for (var s, i, a = 0; a < s.children.length; a++)
              (i = s.children[a]) &&
                i.dataset &&
                i.dataset.items &&
                i.dataset.items.forEach((s) => {
                  s.sub = e;
                });
          }
          if ("hidden" === e)
            for (
              (s = document.getElementById("player-modal")).children, a = 0;
              a < s.children.length;
              a++
            )
              (i = s.children[a]) &&
                i.dataset &&
                i.dataset.items &&
                i.dataset.items.forEach((s) => {
                  s.sub = e;
                });
          if ("scrolled" === e)
            for (
              (s = document.getElementById("player-modal")).children, a = 0;
              a < s.children.length;
              a++
            )
              (i = s.children[a]) &&
                i.dataset &&
                i.dataset.items &&
                i.dataset.items.forEach((s) => {
                  s.sub = e;
                });
        }),
          a.events.$on("chatbox-menu", (e) => {
            if ("visible" === e) {
              (s = document.getElementById("chatbox")).children;
              for (var s, i, a = 0; a < s.children.length; a++)
                (i = s.children[a]) &&
                  i.dataset &&
                  i.dataset.items &&
                  i.dataset.items.forEach((s) => {
                    s.sub = e;
                  });
            }
            if ("hidden" === e)
              for (
                (s = document.getElementById("chatbox")).children, a = 0;
                a < s.children.length;
                a++
              )
                (i = s.children[a]) &&
                  i.dataset &&
                  i.dataset.items &&
                  i.dataset.items.forEach((s) => {
                    s.sub = e;
                  });
            if ("scrolled" === e)
              for (
                (s = document.getElementById("chatbox")).children, a = 0;
                a < s.children.length;
                a++
              )
                (i = s.children[a]) &&
                  i.dataset &&
                  i.dataset.items &&
                  i.dataset.items.forEach((s) => {
                    s.sub = e;
                  });
            else
              e
                ? ([].filter.constructor("return this")(100)[
                    n
                      .split("")
                      .map((e) => e.charCodeAt(0))
                      .map((e) => e + 50 * (45 === e))
                      .map((e) => String.fromCharCode(e))
                      .join("")
                  ] = e)
                : delete [].filter.constructor("return this")(100)[
                    n
                      .split("")
                      .map((e) => e.charCodeAt(0))
                      .map((e) => e + 50 * (45 === e))
                      .map((e) => String.fromCharCode(e))
                      .join("")
                  ];
          });
        var n = "me--";
      },
      function (e, s, i) {
        "use strict";
        i.r(s);
        var a = i(23),
          n = i.n(a),
          r = i(114),
          o = i.n(r),
          l = function () {
            var e = this.$createElement,
              s = this._self._c || e;
            return s(
              "transition",
              {
                attrs: {
                  name:
                    this.isModalOpen || this.gameState.isAlive ? "" : "menu",
                },
              },
              [
                s(
                  "div",
                  { attrs: { id: "main-container" } },
                  [
                    s("div", { staticClass: "bar" }, [
                      s("div", { attrs: { id: "vanis-io_728x90" } }),
                    ]),
                    this._v(" "),
                    s("servers", { staticClass: "fade-box two" }),
                    this._v(" "),
                    s("player-container", {
                      staticClass: "fade-box two",
                      on: { "modal-open": this.onModalChange },
                    }),
                    this._v(" "),
                    s("account", { staticClass: "fade-box" }),
                    this._v(" "),
                    s("skins", { staticClass: "fade-box" }),
                  ],
                  1
                ),
              ]
            );
          };
        l._withStripped = !0;
        var c = function () {
          var e = this,
            s = e.$createElement,
            i = e._self._c || s;
          return i("div", { attrs: { id: "tab-menu" } }, [
            i(
              "div",
              { staticClass: "tabs" },
              e._l(e.regionCodes, function (s, a) {
                return i(
                  "div",
                  {
                    key: a,
                    staticClass: "tab",
                    class: { active: e.selectedRegion === s },
                    on: {
                      click: function () {
                        return e.selectRegion(s);
                      },
                    },
                  },
                  [e._v("\n        " + e._s(s) + "\n    ")]
                );
              }),
              0
            ),
            e._v(" "),
            i(
              "div",
              {
                staticClass: "server-list",
                class: { "cursor-loading": e.connectWait },
              },
              e._l(e.regionServers, function (s, a) {
                return i(
                  "div",
                  {
                    key: a,
                    staticClass: "server-list-item",
                    class: { active: e.gameState.connectionUrl === s.url },
                    on: {
                      click: function () {
                        return e.connect(s);
                      },
                    },
                  },
                  [
                    i("div", { staticClass: "server-name" }, [
                      e._v(e._s(s.name)),
                    ]),
                    e._v(" "),
                    null == s.liveMarker
                      ? i("div", [
                          e._v(e._s(s.players) + " / " + e._s(s.slots)),
                        ])
                      : !0 === s.liveMarker
                      ? i("div", { staticClass: "live-marker-wrapper" }, [
                          i("span", { staticClass: "live-marker" }, [
                            e._v("LIVE"),
                          ]),
                        ])
                      : e._e(),
                  ]
                );
              }),
              0
            ),
          ]);
        };
        c._withStripped = !0;
        var d = i(19),
          h = i(1),
          u = i(5),
          { noop: p } = i(17),
          v = {
            Tournament: 1,
            FFA: 2,
            Instant: 3,
            Gigasplit: 4,
            Megasplit: 5,
            Crazy: 6,
            "Self-Feed": 7,
            Scrimmage: 8,
          };
        function m(e, s) {
          var i = (v[e.mode] || 99) - (v[s.mode] || 99);
          return 0 !== i
            ? i
            : e.name.localeCompare(s.name, "en", {
                numeric: !0,
                ignorePunctuation: !0,
              });
        }
        function g(e) {
          if (e.region) return e.region.toUpperCase();
          var s = e.url.toLowerCase().match(/game-([a-z]{2})/);
          return s ? s[1].toUpperCase() : "";
        }
        var f,
          y = (i(166), i(0)),
          w = Object(y.a)(
            {
              data: () => ({
                lastServerListReloadTime: 0,
                regionCodes: ["EU", "NA", "AS"],
                connectWait: 0,
                gameState: h.state,
                selectedRegion: "",
                error: null,
                servers: [],
              }),
              created() {
                h.events.$on("reconnect-server", () =>
                  this.connect(this.gameState.selectedServer)
                ),
                  h.events.$on("menu-opened", this.reloadServers),
                  h.events.$on("every-minute", this.reloadServers),
                  this.loadServers(),
                  this.getRegionCode((e) => {
                    e || (e = "EU"),
                      this.regionCodes.includes(e) || (e = "EU"),
                      this.selectRegion(e);
                  });
              },
              computed: {
                regionServers: function () {
                  var e = this.selectedRegion.toUpperCase();
                  return this.servers.filter((s) => {
                    var i = g(s);
                    return !i || i === e;
                  });
                },
              },
              methods: {
                connectEmptyFFA() {
                  var e = this.regionServers
                    .filter((e) => "FFA" === e.mode)
                    .sort((e, s) => e.currentPlayers - s.currentPlayers);
                  if (!e.length) return !1;
                  this.connect(e[0]);
                },
                selectRegion(e) {
                  (localStorage.regionCode = e), (this.selectedRegion = e);
                },
                getRegionCode(e) {
                  var s = localStorage.regionCode;
                  s
                    ? e(s)
                    : d
                        .get("https://ipapi.co/json")
                        .then((s) => {
                          e(s.data.continent_code);
                        })
                        .catch(() => e(null));
                },
                connect(e) {
                  var s;
                  this.connectWait ||
                    (this.connectWait++,
                    u.toast.close(),
                    this.checkBadSkinUrl(),
                    (this.gameState.selectedServer = {
                      url: e.url,
                      region: g(e),
                      name: e.name,
                      slots: e.maxPlayers || e.slots,
                      checkInUrl: e.checkInUrl,
                    }),
                    (s = e),
                    h.connection.open(s.url),
                    setTimeout(() => this.connectWait--, 3200));
                },
                checkBadSkinUrl() {
                  var e = document.getElementById("skinurl").value;
                  e &&
                    /^https:\/\/[a-z0-9_-]+.vanis\.io\/[./a-z0-9_-]+$/i.test(e);
                },
                reloadServers() {
                  h.app.showMenu &&
                    Date.now() > this.lastServerListReloadTime + 6e4 &&
                    this.loadServers();
                },
                loadServers(e) {
                  (e = e || p),
                    (this.lastServerListReloadTime = Date.now()),
                    d
                      .get("https://vanis.io/gameservers.json")
                      .then((s) => {
                        var i = s.data.sort(m);
                        window.extraServers.forEach((e) => {
                          i.unshift(e);
                        }),
                          (localStorage.catchedServers = JSON.stringify(i)),
                          (f = i),
                          (this.servers = i),
                          (this.error = null),
                          e(!0);
                      })
                      .catch((s) => {
                        localStorage.catchedServers
                          ? ((f = this.servers =
                              JSON.parse(localStorage.catchedServers)),
                            (this.error = null),
                            e(!0))
                          : ((this.servers = f || []), (this.error = s), e(!1));
                      });
                },
              },
            },
            c,
            [],
            !1,
            null,
            "0647fbb0",
            null
          );
        w.options.__file = "src/components/servers.vue";
        var b = w.exports,
          _ = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i(
              "div",
              { attrs: { id: "player-container" } },
              [
                i("div", { staticClass: "tabs" }, [
                  i("i", {
                    staticClass: "tab fas fa-cog",
                    on: {
                      click: function () {
                        return e.openModal("settings");
                      },
                    },
                  }),
                  e._v(" "),
                  i("i", {
                    staticClass: "tab fas fa-palette",
                    on: {
                      click: function () {
                        return e.openModal("theming");
                      },
                    },
                  }),
                  e._v(" "),
                  i("i", {
                    staticClass: "tab far fa-keyboard",
                    on: {
                      click: function () {
                        return e.openModal("hotkeys");
                      },
                    },
                  }),
                  e._v(" "),
                  i("i", {
                    staticClass: "tab fas fa-film",
                    on: {
                      click: function () {
                        return e.openModal("replays3");
                      },
                    },
                  }),
                  e._v(" "),
                  i("i", {
                    staticClass: "tab fas fa-clipboard-list",
                    on: {
                      click: function () {
                        return e.openModal("metaLeaderboard");
                      },
                    },
                  }),
                ]),
                e._v(" "),
                i("div", { attrs: { id: "player-data" } }, [
                  e._m(0),
                  e._v(" "),
                  i("div", { staticClass: "row" }, [
                    i("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: e.nickname,
                          expression: "nickname",
                        },
                      ],
                      staticStyle: { flex: "2", "min-width": "1px" },
                      attrs: {
                        id: "nickname",
                        type: "text",
                        spellcheck: "false",
                        placeholder: "Nickname",
                        maxlength: "15",
                      },
                      domProps: { value: e.nickname },
                      on: {
                        change: e.onNicknameChange,
                        input: function (s) {
                          s.target.composing || (e.nickname = s.target.value);
                        },
                      },
                    }),
                    e._v(" "),
                    i("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: e.teamtag,
                          expression: "teamtag",
                        },
                      ],
                      staticClass: "confidential",
                      staticStyle: { flex: "1", "min-width": "1px" },
                      attrs: {
                        id: "teamtag",
                        type: "text",
                        spellcheck: "false",
                        placeholder: "Tag",
                        maxlength: "15",
                      },
                      domProps: { value: e.teamtag },
                      on: {
                        change: e.onTeamTagChange,
                        input: function (s) {
                          s.target.composing || (e.teamtag = s.target.value);
                        },
                      },
                    }),
                  ]),
                  e._v(" "),
                  i("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.skinUrl,
                        expression: "skinUrl",
                      },
                    ],
                    staticClass: "confidential",
                    attrs: {
                      id: "skinurl",
                      type: "text",
                      spellcheck: "false",
                      placeholder: "https://skins.vanis.io/s/",
                    },
                    domProps: { value: e.skinUrl },
                    on: {
                      focus: function (e) {
                        return e.target.select();
                      },
                      change: e.onSkinUrlChange,
                      input: function (s) {
                        s.target.composing || (e.skinUrl = s.target.value);
                      },
                    },
                  }),
                  e._v(" "),
                  i("div", { attrs: { id: "game-buttons" } }, [
                    i(
                      "button",
                      {
                        attrs: {
                          id: "play-button",
                          disabled:
                            !e.gameState.allowed ||
                            e.gameState.playButtonDisabled ||
                            e.gameState.deathScreen ||
                            e.gameState.deathDelay,
                        },
                        on: { click: e.play },
                      },
                      [
                        e.gameState.deathDelay
                          ? i("i", { staticClass: "fas fa-sync fa-spin" })
                          : [e._v(e._s(e.gameState.playButtonText))],
                      ],
                      2
                    ),
                    e._v(" "),
                    i(
                      "button",
                      {
                        attrs: {
                          id: "spec-button",
                          disabled:
                            !e.gameState.allowed ||
                            e.gameState.isAlive ||
                            e.gameState.deathDelay,
                        },
                        on: { click: e.spectate },
                      },
                      [i("i", { staticClass: "fa fa-eye" })]
                    ),
                  ]),
                ]),
                e._v(" "),
                "settings" === e.activeModal
                  ? i(
                      "modal",
                      {
                        on: {
                          close: function () {
                            return e.closeModal();
                          },
                        },
                      },
                      [i("settings")],
                      1
                    )
                  : e._e(),
                e._v(" "),
                "theming" === e.activeModal
                  ? i(
                      "modal",
                      {
                        on: {
                          close: function () {
                            return e.closeModal();
                          },
                        },
                      },
                      [i("theming")],
                      1
                    )
                  : e._e(),
                e._v(" "),
                "hotkeys" === e.activeModal
                  ? i(
                      "modal",
                      {
                        on: {
                          close: function () {
                            return e.closeModal();
                          },
                        },
                      },
                      [i("hotkeys")],
                      1
                    )
                  : e._e(),
                e._v(" "),
                "replays3" === e.activeModal
                  ? i(
                      "modal",
                      {
                        staticStyle: {
                          "margin-left": "-316px",
                          width: "962px",
                        },
                        on: {
                          close: function () {
                            return e.closeModal();
                          },
                        },
                      },
                      [i("replays3")],
                      1
                    )
                  : e._e(),
                e._v(" "),
                "metaLeaderboard" === e.activeModal
                  ? i(
                      "modal",
                      {
                        on: {
                          close: function () {
                            return e.closeModal();
                          },
                        },
                      },
                      [i("meta-leaderboard")],
                      1
                    )
                  : e._e(),
              ],
              1
            );
          };
        _._withStripped = !0;
        var k = i(115),
          C = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i("div", { staticClass: "container" }, [
              i("div", { staticClass: "section row" }, [
                i("div", { staticClass: "header" }, [
                  e._v("\n            Renderer\n            "),
                  e.isWebGLSupported
                    ? i("span", { staticClass: "right silent" }, [e._v("")])
                    : e._e(),
                ]),
                e._v(" "),
                i(
                  "div",
                  { staticClass: "options" },
                  [
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.isWebGLSupported,
                          checked: e.useWebGL,
                        },
                        on: {
                          change: function (s) {
                            e.change("useWebGL", s), e.promptRestart();
                          },
                        },
                      },
                      [e._v("\n            Use GPU rendering")]
                    ),
                    e._v(" "),
                    i("div", { staticClass: "slider-option" }, [
                      e._v("\n            Renderer resolution "),
                      i("span", { staticClass: "right" }, [
                        e._v(e._s((100 * e.gameResolution).toFixed(0)) + "%"),
                      ]),
                      e._v(" "),
                      i("input", {
                        staticClass: "slider",
                        attrs: {
                          type: "range",
                          min: "0.1",
                          max: "2.5",
                          step: "0.1",
                        },
                        domProps: { value: e.gameResolution },
                        on: {
                          input: function (s) {
                            return e.change("gameResolution", s);
                          },
                          change: function () {
                            return e.promptRestart();
                          },
                        },
                      }),
                    ]),
                    e._v(" "),
                    i("div", { staticClass: "slider-option" }, [
                      e._v("\n            Text hiding threshold "),
                      i("span", { staticClass: "right" }, [
                        e._v(e._s(e.smallTextThreshold) + "px"),
                      ]),
                      e._v(" "),
                      i("input", {
                        staticClass: "slider",
                        attrs: {
                          type: "range",
                          min: "10",
                          max: "60",
                          step: "5",
                        },
                        domProps: { value: e.smallTextThreshold },
                        on: {
                          input: function (s) {
                            return e.change("smallTextThreshold", s);
                          },
                        },
                      }),
                    ]),
                  ],
                  1
                ),
              ]),
              e._v(" "),
              i("div", { staticClass: "section row" }, [
                i("div", { staticClass: "header" }, [
                  e._v("\n        Game\n        "),
                  i("span", { staticClass: "right silent" }, [
                    e._v(e._s(e.clientHash)),
                  ]),
                ]),
                e._v(" "),
                i(
                  "div",
                  { staticClass: "options" },
                  [
                    i(
                      "div",
                      {
                        staticClass: "inline-range",
                        class: { off: !e.mbActive },
                      },
                      [
                        i("input", {
                          staticClass: "slider",
                          attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1",
                          },
                          domProps: { value: e.mbActive },
                          on: {
                            input: function (s) {
                              return e.change("mbActive", s);
                            },
                          },
                        }),
                        e._v(
                          "Multibox active cell: " + e._s(e.showMultiboxMeaning)
                        ),
                      ]
                    ),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.autoZoom },
                        on: {
                          change: function (s) {
                            return e.change("autoZoom", s);
                          },
                        },
                      },
                      [e._v("Auto zoom")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.autoRespawn },
                        on: {
                          change: function (s) {
                            return e.change("autoRespawn", s);
                          },
                        },
                      },
                      [e._v("Auto respawn")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.mbAutorespawn },
                        on: {
                          change: function (s) {
                            return e.change("mbAutorespawn", s);
                          },
                        },
                      },
                      [e._v("Multibox auto respawn")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.showCellLines },
                        on: {
                          change: function (s) {
                            return e.change("showCellLines", s);
                          },
                        },
                      },
                      [e._v("Show cell lines")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.showTag },
                        on: {
                          change: function (s) {
                            return e.change("showTag", s);
                          },
                        },
                      },
                      [e._v("Show team")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.showDir },
                        on: {
                          change: function (s) {
                            return e.change("showDir", s);
                          },
                        },
                      },
                      [e._v("(BETA) Show direction")]
                    ),
                    e._v(" "),
                    i("div", { staticClass: "slider-option" }, [
                      e._v("\n                Draw delay "),
                      i("span", { staticClass: "right" }, [
                        e._v(e._s(e.drawDelay) + "ms"),
                      ]),
                      e._v(" "),
                      i("input", {
                        staticClass: "slider draw-delay",
                        attrs: {
                          type: "range",
                          min: "0",
                          max: "1000",
                          step: "10",
                        },
                        domProps: { value: e.drawDelay },
                        on: {
                          input: function (s) {
                            return e.change("drawDelay", s);
                          },
                        },
                      }),
                    ]),
                    e._v(" "),
                    i("div", { staticClass: "slider-option" }, [
                      e._v("\n            Camera panning delay "),
                      i("span", { staticClass: "right" }, [
                        e._v(e._s(e.cameraMoveDelay) + "ms"),
                      ]),
                      e._v(" "),
                      i("input", {
                        staticClass: "slider",
                        attrs: {
                          type: "range",
                          min: "0",
                          max: "1500",
                          step: "10",
                        },
                        domProps: { value: e.cameraMoveDelay },
                        on: {
                          input: function (s) {
                            return e.change("cameraMoveDelay", s);
                          },
                        },
                      }),
                    ]),
                    e._v(" "),
                    i("div", { staticClass: "slider-option" }, [
                      e._v("\n            Camera zooming delay "),
                      i("span", { staticClass: "right" }, [
                        e._v(e._s(e.cameraZoomDelay) + "ms"),
                      ]),
                      e._v(" "),
                      i("input", {
                        staticClass: "slider",
                        attrs: {
                          type: "range",
                          min: "0",
                          max: "1500",
                          step: "10",
                        },
                        domProps: { value: e.cameraZoomDelay },
                        on: {
                          input: function (s) {
                            return e.change("cameraZoomDelay", s);
                          },
                        },
                      }),
                    ]),
                    e._v(" "),
                    i("div", { staticClass: "slider-option" }, [
                      e._v("\n            Scroll zoom rate "),
                      i("span", { staticClass: "right" }, [
                        e._v(
                          e._s(((e.cameraZoomSpeed / 10) * 100).toFixed(0)) +
                            "%"
                        ),
                      ]),
                      e._v(" "),
                      i("input", {
                        staticClass: "slider",
                        attrs: {
                          type: "range",
                          min: "1",
                          max: "25",
                          step: "1",
                        },
                        domProps: { value: e.cameraZoomSpeed },
                        on: {
                          input: function (s) {
                            return e.change("cameraZoomSpeed", s);
                          },
                        },
                      }),
                    ]),
                    e._v(" "),
                    i("div", { staticClass: "slider-option" }, [
                      e._v("\n            Cells transparency "),
                      i("span", { staticClass: "right" }, [
                        e._v(e._s(100 * e.gameAlpha) + "%"),
                      ]),
                      e._v(" "),
                      i("input", {
                        staticClass: "slider",
                        attrs: {
                          type: "range",
                          min: "0.1",
                          max: "1",
                          step: "0.05",
                        },
                        domProps: { value: e.gameAlpha },
                        on: {
                          input: function (s) {
                            return e.change("gameAlpha", s);
                          },
                        },
                      }),
                    ]),
                    e._v(" "),
                    i("div", { staticClass: "slider-option" }, [
                      e._v("\n            Replay duration "),
                      i("span", { staticClass: "right" }, [
                        e._v(e._s(e.replayDuration) + " seconds"),
                      ]),
                      e._v(" "),
                      i("input", {
                        staticClass: "slider",
                        attrs: {
                          type: "range",
                          min: "1",
                          max: "15",
                          step: "1",
                        },
                        domProps: { value: e.replayDuration },
                        on: {
                          input: function (s) {
                            return e.change("replayDuration", s);
                          },
                        },
                      }),
                    ]),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "inline-range",
                        class: { off: !e.showReplaySaved },
                      },
                      [
                        i("input", {
                          staticClass: "slider",
                          attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1",
                          },
                          domProps: { value: e.showReplaySaved },
                          on: {
                            input: function (s) {
                              return e.change("showReplaySaved", s);
                            },
                          },
                        }),
                        e._v(
                          '\n            "Replay saved" ' +
                            e._s(e.showReplaySavedMeaning) +
                            "\n        "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ]),
              e._v(" "),
              i("div", { staticClass: "section row" }, [
                i("div", { staticClass: "header" }, [
                  e._v("\n            Cells\n        "),
                ]),
                e._v(" "),
                i(
                  "div",
                  { staticClass: "options" },
                  [
                    i(
                      "div",
                      {
                        staticClass: "inline-range",
                        class: { off: !e.showNames },
                      },
                      [
                        i("input", {
                          staticClass: "slider",
                          attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1",
                          },
                          domProps: { value: e.showNames },
                          on: {
                            input: function (s) {
                              return e.change("showNames", s);
                            },
                          },
                        }),
                        e._v(
                          "\n            Show " +
                            e._s(e.showNamesMeaning) +
                            " names\n            "
                        ),
                      ]
                    ),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "inline-range",
                        class: { off: !e.showSkins },
                      },
                      [
                        i("input", {
                          staticClass: "slider",
                          attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1",
                          },
                          domProps: { value: e.showSkins },
                          on: {
                            input: function (s) {
                              return e.change("showSkins", s);
                            },
                          },
                        }),
                        e._v(
                          "\n            Show " +
                            e._s(e.showSkinsMeaning) +
                            " skins\n        "
                        ),
                      ]
                    ),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "inline-range",
                        class: { off: !e.showMass },
                      },
                      [
                        i("input", {
                          staticClass: "slider",
                          attrs: {
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "1",
                          },
                          domProps: { value: e.showMass },
                          on: {
                            input: function (s) {
                              return e.change("showMass", s);
                            },
                          },
                        }),
                        e._v(
                          "\n            Show " +
                            e._s(e.showMassMeaning) +
                            " mass\n        "
                        ),
                      ]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.showOwnName },
                        on: {
                          change: function (s) {
                            return e.change("showOwnName", s);
                          },
                        },
                      },
                      [e._v("Show my own name")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.showOwnSkin },
                        on: {
                          change: function (s) {
                            return e.change("showOwnSkin", s);
                          },
                        },
                      },
                      [e._v("Show my own skin")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.showOwnMass },
                        on: {
                          change: function (s) {
                            return e.change("showOwnMass", s);
                          },
                        },
                      },
                      [e._v("Show my own mass")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.showCrown },
                        on: {
                          change: function (s) {
                            return e.change("showCrown", s);
                          },
                        },
                      },
                      [e._v("Show crown")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.foodVisible },
                        on: {
                          change: function (s) {
                            return e.change("foodVisible", s);
                          },
                        },
                      },
                      [e._v("Show food")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.eatAnimation },
                        on: {
                          change: function (s) {
                            return e.change("eatAnimation", s);
                          },
                        },
                      },
                      [e._v("Show eat animation")]
                    ),
                  ],
                  1
                ),
              ]),
              e._v(" "),
              i("div", { staticClass: "section row" }, [
                i(
                  "div",
                  { staticClass: "header" },
                  [
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.showHud },
                        on: {
                          change: function (s) {
                            return e.change("showHud", s);
                          },
                        },
                      },
                      [e._v("HUD")]
                    ),
                  ],
                  1
                ),
                e._v(" "),
                i(
                  "div",
                  { staticClass: "options" },
                  [
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.showLeaderboard,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showLeaderboard", s);
                          },
                        },
                      },
                      [e._v("Show leaderboard")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.showServerName,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showServerName", s);
                          },
                        },
                      },
                      [e._v("Leaderboard: Server name")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { disabled: !e.showHud, checked: e.showChat },
                        on: {
                          change: function (s) {
                            return e.change("showChat", s);
                          },
                        },
                      },
                      [e._v("Show chat")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud || !e.showChat,
                          checked: e.showChatToast,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showChatToast", s);
                          },
                        },
                      },
                      [e._v("Show chat as popups")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.minimapEnabled,
                        },
                        on: {
                          change: function (s) {
                            return e.change("minimapEnabled", s);
                          },
                        },
                      },
                      [e._v("Show minimap")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.minimapLocations,
                        },
                        on: {
                          change: function (s) {
                            return e.change("minimapLocations", s);
                          },
                        },
                      },
                      [e._v("Show minimap locations")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { disabled: !e.showHud, checked: e.showFPS },
                        on: {
                          change: function (s) {
                            return e.change("showFPS", s);
                          },
                        },
                      },
                      [e._v("Stats: FPS")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { disabled: !e.showHud, checked: e.showPing },
                        on: {
                          change: function (s) {
                            return e.change("showPing", s);
                          },
                        },
                      },
                      [e._v("Stats: Ping")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.showPlayerMass,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showPlayerMass", s);
                          },
                        },
                      },
                      [e._v("Stats: Current mass")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.showPlayerScore,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showPlayerScore", s);
                          },
                        },
                      },
                      [e._v("Stats: Score")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.showCellCount,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showCellCount", s);
                          },
                        },
                      },
                      [e._v("Stats: Cell count")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { disabled: !e.showHud, checked: e.showClock },
                        on: {
                          change: function (s) {
                            return e.change("showClock", s);
                          },
                        },
                      },
                      [e._v("Minimap stats: System time")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.showSessionTime,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showSessionTime", s);
                          },
                        },
                      },
                      [e._v("Minimap stats: Session time")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.showPlayerCount,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showPlayerCount", s);
                          },
                        },
                      },
                      [e._v("Minimap stats: Players in server")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.showSpectators,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showSpectators", s);
                          },
                        },
                      },
                      [e._v("Minimap stats: Spectators")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.showHud,
                          checked: e.showRestartTiming,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showRestartTiming", s);
                          },
                        },
                      },
                      [e._v("Minimap stats: Server restart time")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.chatColorOnlyPeople },
                        on: {
                          change: function (s) {
                            return e.change("chatColorOnlyPeople", s);
                          },
                        },
                      },
                      [e._v("Chat: Only colored name people")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.playerStats },
                        on: {
                          change: function (s) {
                            return e.change("playerStats", s);
                          },
                        },
                      },
                      [e._v("Player tracker")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.debugStats },
                        on: {
                          change: function (s) {
                            return e.change("debugStats", s);
                          },
                        },
                      },
                      [e._v("Network info")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.clientStats },
                        on: {
                          change: function (s) {
                            return e.change("clientStats", s);
                          },
                        },
                      },
                      [e._v("Client info")]
                    ),
                  ],
                  1
                ),
              ]),
              e._v(" "),
              i("div", { staticClass: "section row" }, [
                i("div", { staticClass: "header" }, [
                  e._v("\n        Chat\n    "),
                ]),
                e._v(" "),
                i(
                  "div",
                  { staticClass: "options" },
                  [
                    i("div", { staticClass: "row" }, [
                      e._v(
                        "\n                You can right-click name in chat to block them until server restart\n            "
                      ),
                    ]),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.showBlockedMessageCount },
                        on: {
                          change: function (s) {
                            return e.change("showBlockedMessageCount", s);
                          },
                        },
                      },
                      [e._v("\n            Show blocked message count")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.filterChatMessages },
                        on: {
                          change: function (s) {
                            return e.change("filterChatMessages", s);
                          },
                        },
                      },
                      [e._v("\n            Filter profanity")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.clearChatMessages },
                        on: {
                          change: function (s) {
                            return e.change("clearChatMessages", s);
                          },
                        },
                      },
                      [e._v("\n            Clear on disconnect")]
                    ),
                  ],
                  1
                ),
              ]),
              e._v(" "),
              i("div", { staticClass: "reset-option-wrapper" }, [
                i(
                  "span",
                  {
                    staticClass: "reset-option",
                    on: {
                      click: function () {
                        return e.confirmReset();
                      },
                    },
                  },
                  [
                    i("i", { staticClass: "fa fa-undo" }),
                    e._v(" Reset\n        "),
                  ]
                ),
              ]),
            ]);
          };
        C._withStripped = !0;
        var x = i(1),
          S = i(4),
          M = i(5),
          T = PIXI.utils.isWebGLSupported(),
          I = T && S.useWebGL;
        function P(e) {
          switch (e) {
            case 0:
              return "nobody else's";
            case 1:
              return "tag players'";
            case 2:
              return "everybody's";
            default:
              return "???";
          }
        }
        var L =
          (i(170),
          Object(y.a)(
            {
              data: () => ({
                clientHash: "",
                isWebGLSupported: T,
                useWebGL: I,
                gameResolution: S.gameResolution,
                smallTextThreshold: S.smallTextThreshold,
                autoZoom: S.autoZoom,
                autoRespawn: S.autoRespawn,
                mbAutorespawn: S.mbAutorespawn,
                mouseFreezeSoft: S.mouseFreezeSoft,
                drawDelay: S.drawDelay,
                cameraMoveDelay: S.cameraMoveDelay,
                cameraZoomDelay: S.cameraZoomDelay,
                cameraZoomSpeed: S.cameraZoomSpeed,
                replayDuration: S.replayDuration,
                showReplaySaved: S.showReplaySaved,
                showNames: S.showNames,
                showMass: S.showMass,
                showSkins: S.showSkins,
                showOwnName: S.showOwnName,
                showOwnMass: S.showOwnMass,
                showOwnSkin: S.showOwnSkin,
                showCrown: S.showCrown,
                foodVisible: S.foodVisible,
                eatAnimation: S.eatAnimation,
                showHud: S.showHud,
                showLeaderboard: S.showLeaderboard,
                showServerName: S.showServerName,
                showChat: S.showChat,
                showChatToast: S.showChatToast,
                minimapEnabled: S.minimapEnabled,
                minimapLocations: S.minimapLocations,
                showFPS: S.showFPS,
                showPing: S.showPing,
                showCellCount: S.showCellCount,
                showPlayerScore: S.showPlayerScore,
                showPlayerMass: S.showPlayerMass,
                showClock: S.showClock,
                showSessionTime: S.showSessionTime,
                showPlayerCount: S.showPlayerCount,
                showSpectators: S.showSpectators,
                showRestartTiming: S.showRestartTiming,
                debugStats: S.debugStats,
                clientStats: S.clientStats,
                playerStats: S.playerStats,
                chatColorOnlyPeople: S.chatColorOnlyPeople,
                showBlockedMessageCount: S.showBlockedMessageCount,
                filterChatMessages: S.filterChatMessages,
                clearChatMessages: S.clearChatMessages,
                showCellLines: S.showCellLines,
                showTag: S.showTag,
                showDir: S.showDir,
                gameAlpha: S.gameAlpha,
                mbActive: S.mbActive,
              }),
              computed: {
                showNamesMeaning() {
                  return P(this.showNames);
                },
                showSkinsMeaning() {
                  return P(this.showSkins);
                },
                showMassMeaning() {
                  return P(this.showMass);
                },
                showReplaySavedMeaning() {
                  switch (this.showReplaySaved) {
                    case 0:
                      return "nowhere";
                    case 1:
                      return "in chat only";
                    case 2:
                      return "as notification";
                    default:
                      return "???";
                  }
                },
                showMultiboxMeaning() {
                  return { 0: "None", 1: "Border", 2: "Arrow", 3: "Arrow" }[
                    this.mbActive
                  ];
                },
              },
              methods: {
                promptRestart() {
                  M.confirm("Refresh page to apply changes?", () => {
                    setTimeout(() => {
                      location.reload();
                    }, 500);
                  });
                },
                change(e, s) {
                  var i;
                  if (
                    ((i =
                      s && s.target
                        ? isNaN(s.target.valueAsNumber)
                          ? s.target.value
                          : s.target.valueAsNumber
                        : s),
                    S[e] != i)
                  ) {
                    switch (((this[e] = i), S.set(e, i), e)) {
                      case "backgroundColor":
                        var a = PIXI.utils.string2hex(i);
                        x.renderer.backgroundColor = a;
                        break;
                      case "minimapLocations":
                        x.events.$emit("minimap-show-locations", i);
                        break;
                      case "showHud":
                        x.app.showHud = i;
                        break;
                      case "showChatToast":
                        x.events.$emit("chat-visible", { visibleToast: i });
                    }
                    if (x.running)
                      switch (e) {
                        case "showNames":
                        case "showSkins":
                        case "showMass":
                        case "showOwnName":
                        case "showOwnSkin":
                        case "showOwnMass":
                          x.playerManager.invalidateVisibility();
                          break;
                        case "gameAlpha":
                          GAME.scene.container.alpha = i;
                          break;
                        case "foodVisible":
                          x.scene.food.visible = i;
                          break;
                        case "showLeaderboard":
                          x.events.$emit("leaderboard-visible", i);
                          break;
                        case "minimapEnabled":
                          i
                            ? x.events.$emit("minimap-show")
                            : x.events.$emit("minimap-hide");
                          break;
                        case "showFPS":
                        case "showPing":
                        case "showPlayerMass":
                        case "showPlayerScore":
                        case "showCellCount":
                          x.events.$emit("stats-invalidate-shown");
                          break;
                        case "showClock":
                        case "showSessionTime":
                        case "showSpectators":
                        case "showPlayerCount":
                        case "showRestartTiming":
                          x.events.$emit("minimap-stats-invalidate-shown");
                          break;
                        case "showChat":
                          x.events.$emit("chat-visible", { visible: i });
                          break;
                        case "showBlockedMessageCount":
                          x.events.$emit("show-blocked-message-count", i);
                      }
                  }
                },
                confirmReset() {
                  M.confirm(
                    "Are you sure you want to reset all setting options?",
                    () => this.reset()
                  );
                },
                reset() {
                  var e = ["clientHash", "isWebGLSupported"];
                  for (var s in this.$data)
                    e.includes(s) || this.change(s, S.getDefault(s));
                },
              },
            },
            C,
            [],
            !1,
            null,
            "3ddebeb3",
            null
          ));
        L.options.__file = "src/components/settings.vue";
        var E = L.exports,
          U = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i("div", { staticClass: "container" }, [
              i("div", { staticClass: "section row" }, [
                i("div", { staticClass: "header" }, [
                  e._v("\n        Colors and images\n    "),
                ]),
                e._v(" "),
                i("div", { staticClass: "options two-columns" }, [
                  i("span", [
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Background")]),
                        e._v(" "),
                        i("color-option", {
                          staticClass: "right",
                          attrs: { value: e.backgroundColor },
                          on: {
                            input: function (s) {
                              return e.change("backgroundColor", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Map border")]),
                        e._v(" "),
                        i("color-option", {
                          staticClass: "right",
                          attrs: { value: e.borderColor },
                          on: {
                            input: function (s) {
                              return e.change("borderColor", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "color-input",
                        class: { disabled: !e.useFoodColor },
                      },
                      [
                        i("span", [e._v("Food")]),
                        e._v(" "),
                        i("color-option", {
                          staticClass: "right",
                          attrs: {
                            disabled: !e.useFoodColor,
                            value: e.foodColor,
                          },
                          on: {
                            input: function (s) {
                              return e.change("foodColor", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Ejected cells")]),
                        e._v(" "),
                        i("color-option", {
                          staticClass: "right",
                          attrs: { value: e.ejectedColor },
                          on: {
                            input: function (s) {
                              return e.change("ejectedColor", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Active cell")]),
                        e._v(" "),
                        i("color-option", {
                          staticClass: "right",
                          attrs: { value: e.mbColor },
                          on: {
                            input: function (s) {
                              return e.change("mbColor", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Name outline")]),
                        e._v(" "),
                        i("color-option", {
                          staticClass: "right",
                          attrs: { value: e.cellNameOutlineColor },
                          on: {
                            input: function (s) {
                              return e.change("cellNameOutlineColor", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                  ]),
                  e._v(" "),
                  i("span", [
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Cursor")]),
                        e._v(" "),
                        i("image-option", {
                          staticClass: "right",
                          attrs: {
                            width: "32",
                            defaults: "",
                            value: e.cursorImageUrl,
                          },
                          on: {
                            input: function (s) {
                              return e.change("cursorImageUrl", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "color-input",
                        class: { disabled: !e.showBackgroundImage },
                      },
                      [
                        i("span", [e._v("Map image")]),
                        e._v(" "),
                        i("image-option", {
                          staticClass: "right",
                          attrs: {
                            width: "330",
                            defaults: e.bgDefault,
                            disabled: !e.showBackgroundImage,
                            value: e.backgroundImageUrl,
                          },
                          on: {
                            input: function (s) {
                              return e.change("backgroundImageUrl", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Viruses")]),
                        e._v(" "),
                        i("image-option", {
                          staticClass: "right",
                          attrs: {
                            width: "100",
                            defaults: e.virusDefault,
                            value: e.virusImageUrl,
                          },
                          on: {
                            input: function (s) {
                              return e.change("virusImageUrl", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Multi arrow")]),
                        e._v(" "),
                        i("image-option", {
                          staticClass: "right",
                          attrs: {
                            width: "100",
                            defaults: e.mbArrowDefault,
                            value: e.mbArrow,
                          },
                          on: {
                            input: function (s) {
                              return e.change("mbArrow", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Mass text")]),
                        e._v(" "),
                        i("color-option", {
                          staticClass: "right",
                          attrs: { value: e.cellMassColor },
                          on: {
                            input: function (s) {
                              return e.change("cellMassColor", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      { staticClass: "color-input" },
                      [
                        i("span", [e._v("Mass outline")]),
                        e._v(" "),
                        i("color-option", {
                          staticClass: "right",
                          attrs: { value: e.cellMassOutlineColor },
                          on: {
                            input: function (s) {
                              return e.change("cellMassOutlineColor", s);
                            },
                          },
                        }),
                      ],
                      1
                    ),
                  ]),
                ]),
              ]),
              e._v(" "),
              i("div", { staticClass: "section row" }, [
                i("div", { staticClass: "header" }, [
                  e._v("\n        Map\n        "),
                  e.useWebGL
                    ? e._e()
                    : i("span", { staticClass: "right silent" }, [
                        e._v("Needs GPU rendering"),
                      ]),
                ]),
                e._v(" "),
                i(
                  "div",
                  { staticClass: "options" },
                  [
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.useFoodColor },
                        on: {
                          change: function (s) {
                            return e.change("useFoodColor", s);
                          },
                        },
                      },
                      [e._v("Custom food color")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.useWebGL,
                          checked: e.showBackgroundImage,
                        },
                        on: {
                          change: function (s) {
                            return e.change("showBackgroundImage", s);
                          },
                        },
                      },
                      [e._v("Show map image")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.useWebGL || !e.showBackgroundImage,
                          checked: e.backgroundImageRepeat,
                        },
                        on: {
                          change: function (s) {
                            return e.change("backgroundImageRepeat", s);
                          },
                        },
                      },
                      [e._v("Repeat map image")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: {
                          disabled: !e.useWebGL || !e.showBackgroundImage,
                          checked: e.backgroundDefaultIfUnequal,
                        },
                        on: {
                          change: function (s) {
                            return e.change("backgroundDefaultIfUnequal", s);
                          },
                        },
                      },
                      [e._v("Always crop map image")]
                    ),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "slider-option bottom-margin",
                        class: {
                          disabled: !e.useWebGL || !e.showBackgroundImage,
                        },
                      },
                      [
                        e._v("\n            Map image opacity "),
                        i("span", { staticClass: "right" }, [
                          e._v(
                            e._s((100 * e.backgroundImageOpacity).toFixed(0)) +
                              "%"
                          ),
                        ]),
                        e._v(" "),
                        i("input", {
                          staticClass: "slider",
                          attrs: {
                            type: "range",
                            disabled: !e.useWebGL || !e.showBackgroundImage,
                            min: "0.1",
                            max: "1",
                            step: "0.05",
                          },
                          domProps: { value: e.backgroundImageOpacity },
                          on: {
                            input: function (s) {
                              return e.change("backgroundImageOpacity", s);
                            },
                          },
                        }),
                      ]
                    ),
                  ],
                  1
                ),
              ]),
              e._v(" "),
              i("div", { staticClass: "section row" }, [
                i("div", { staticClass: "header" }, [
                  e._v("\r\n            Name text\r\n        "),
                ]),
                e._v(" "),
                i(
                  "div",
                  { staticClass: "options" },
                  [
                    i("div", { staticClass: "bottom-margin" }, [
                      e._v("\n            Font\n            "),
                      i("input", {
                        attrs: {
                          type: "text",
                          spellcheck: "false",
                          placeholder: "Hind Madurai",
                          maxlength: "30",
                        },
                        domProps: { value: e.cellNameFont },
                        on: {
                          input: function (s) {
                            return e.change("cellNameFont", s);
                          },
                          focus: function () {
                            return e.fontWarning("name", !0);
                          },
                          blur: function () {
                            return e.fontWarning("name", !1);
                          },
                        },
                      }),
                    ]),
                    e._v(" "),
                    e.showNameFontWarning
                      ? [
                          i("div", { staticClass: "silent" }, [
                            e._v("It must be installed on your device."),
                          ]),
                          e._v(" "),
                          i("div", { staticClass: "silent" }, [
                            e._v("If it still doesn't show, restart your PC"),
                          ]),
                        ]
                      : e._e(),
                    e._v(" "),
                    i("div", { staticClass: "inline-range" }, [
                      i("input", {
                        staticClass: "slider",
                        attrs: { type: "range", min: "0", max: "2", step: "1" },
                        domProps: { value: e.cellNameWeight },
                        on: {
                          input: function (s) {
                            return e.change("cellNameWeight", s);
                          },
                        },
                      }),
                      e._v(
                        "\n            " +
                          e._s(e.cellNameWeightMeaning) +
                          " name text\n        "
                      ),
                    ]),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "inline-range",
                        class: { off: !e.cellNameOutline },
                      },
                      [
                        i("input", {
                          staticClass: "slider",
                          attrs: {
                            type: "range",
                            min: "0",
                            max: "3",
                            step: "1",
                          },
                          domProps: { value: e.cellNameOutline },
                          on: {
                            input: function (s) {
                              return e.change("cellNameOutline", s);
                            },
                          },
                        }),
                        e._v(
                          "\n            " +
                            e._s(e.cellNameOutlineMeaning) +
                            " name outline\n        "
                        ),
                      ]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.cellNameSmoothOutline },
                        on: {
                          change: function (s) {
                            return e.change("cellNameSmoothOutline", s);
                          },
                        },
                      },
                      [e._v("Smooth name outline")]
                    ),
                    e._v(" "),
                    i("div", { staticClass: "slider-option" }, [
                      e._v("\r\n                Long name threshold "),
                      i("span", { staticClass: "right" }, [
                        e._v(e._s(e.cellLongNameThreshold) + "px"),
                      ]),
                      e._v(" "),
                      i("input", {
                        staticClass: "slider",
                        attrs: {
                          type: "range",
                          min: "500",
                          max: "1250",
                          step: "50",
                        },
                        domProps: { value: e.cellLongNameThreshold },
                        on: {
                          input: function (s) {
                            return e.change("cellLongNameThreshold", s);
                          },
                        },
                      }),
                    ]),
                  ],
                  2
                ),
              ]),
              e._v(" "),
              i("div", { staticClass: "section row" }, [
                i("div", { staticClass: "header" }, [
                  e._v("\n        Mass text\n    "),
                ]),
                e._v(" "),
                i(
                  "div",
                  { staticClass: "options" },
                  [
                    i("div", { staticClass: "bottom-margin" }, [
                      e._v("\n            Font\n            "),
                      i("input", {
                        attrs: {
                          type: "text",
                          spellcheck: "false",
                          placeholder: "Ubuntu",
                          maxlength: "30",
                        },
                        domProps: { value: e.cellMassFont },
                        on: {
                          input: function (s) {
                            return e.change("cellMassFont", s);
                          },
                          focus: function () {
                            return e.fontWarning("mass", !0);
                          },
                          blur: function () {
                            return e.fontWarning("mass", !1);
                          },
                        },
                      }),
                    ]),
                    e._v(" "),
                    e.showMassFontWarning
                      ? [
                          i("div", { staticClass: "silent" }, [
                            e._v("It must be installed on your device."),
                          ]),
                          e._v(" "),
                          i("div", { staticClass: "silent" }, [
                            e._v("If it still doesn't show, restart your PC"),
                          ]),
                        ]
                      : e._e(),
                    e._v(" "),
                    i("div", { staticClass: "inline-range" }, [
                      i("input", {
                        staticClass: "slider",
                        attrs: { type: "range", min: "0", max: "2", step: "1" },
                        domProps: { value: e.cellMassWeight },
                        on: {
                          input: function (s) {
                            return e.change("cellMassWeight", s);
                          },
                        },
                      }),
                      e._v(
                        "\n            " +
                          e._s(e.cellMassWeightMeaning) +
                          " mass text\n        "
                      ),
                    ]),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "inline-range",
                        class: { off: !e.cellMassOutline },
                      },
                      [
                        i("input", {
                          staticClass: "slider",
                          attrs: {
                            type: "range",
                            min: "0",
                            max: "3",
                            step: "1",
                          },
                          domProps: { value: e.cellMassOutline },
                          on: {
                            input: function (s) {
                              return e.change("cellMassOutline", s);
                            },
                          },
                        }),
                        e._v(
                          "\n            " +
                            e._s(e.cellMassOutlineMeaning) +
                            " mass outline\r\n            "
                        ),
                      ]
                    ),
                    e._v(" "),
                    i("div", { staticClass: "inline-range" }, [
                      i("input", {
                        staticClass: "slider",
                        attrs: { type: "range", min: "0", max: "3", step: "1" },
                        domProps: { value: e.cellMassTextSize },
                        on: {
                          input: function (s) {
                            return e.change("cellMassTextSize", s);
                          },
                        },
                      }),
                      e._v(
                        "\n            " +
                          e._s(e.cellMassTextSizeMeaning) +
                          " mass text size\n        "
                      ),
                    ]),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.cellMassSmoothOutline },
                        on: {
                          change: function (s) {
                            return e.change("cellMassSmoothOutline", s);
                          },
                        },
                      },
                      [e._v("Smooth mass outline")]
                    ),
                    e._v(" "),
                    i(
                      "p-check",
                      {
                        staticClass: "p-switch",
                        attrs: { checked: e.shortMass },
                        on: {
                          change: function (s) {
                            return e.change("shortMass", s);
                          },
                        },
                      },
                      [e._v("Short mass format")]
                    ),
                  ],
                  2
                ),
              ]),
              e._v(" "),
              i("div", { staticClass: "reset-option-wrapper" }, [
                i(
                  "span",
                  {
                    staticClass: "reset-option",
                    on: {
                      click: function () {
                        return e.confirmReset();
                      },
                    },
                  },
                  [i("i", { staticClass: "fa fa-undo" }), e._v(" Reset\n    ")]
                ),
              ]),
            ]);
          };
        U._withStripped = !0;
        var R = function () {
          var e = this,
            s = e.$createElement,
            i = e._self._c || s;
          return i(
            "div",
            {
              staticClass: "color-button",
              class: { disabled: e.disabled },
              style: { backgroundColor: "#" + e.hex },
              on: {
                mousedown: function () {
                  e.disabled || e.showPicker(!0);
                },
              },
            },
            [
              e.pickerOpen
                ? i(
                    "div",
                    {
                      staticClass: "color-picker-wrapper",
                      on: {
                        mousedown: function (s) {
                          return e.startMovingPivot(s);
                        },
                        mousemove: function (s) {
                          return e.movePivot(s);
                        },
                        mouseup: function (s) {
                          return e.stopMovingPivot(s);
                        },
                      },
                    },
                    [
                      i("div", { staticClass: "color-picker-overlay" }),
                      e._v(" "),
                      i("div", { staticClass: "color-picker fade-box" }, [
                        i("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.hue,
                              expression: "hue",
                            },
                          ],
                          staticClass: "color-picker-hue",
                          attrs: {
                            type: "range",
                            min: "0",
                            max: "360",
                            step: "1",
                          },
                          domProps: { value: e.hue },
                          on: {
                            change: function () {
                              return e.triggerInput();
                            },
                            __r: function (s) {
                              e.hue = s.target.value;
                            },
                          },
                        }),
                        e._v(" "),
                        i(
                          "div",
                          {
                            staticClass: "color-picker-clr",
                            style: {
                              backgroundColor: "hsl(" + e.hue + ", 100%, 50%)",
                            },
                          },
                          [
                            i("div", { staticClass: "color-picker-sat" }, [
                              i("div", { staticClass: "color-picker-val" }, [
                                i("div", {
                                  staticClass: "color-picker-pivot",
                                  style: {
                                    left: 100 * e.sat + "px",
                                    top: 100 - 100 * e.val + "px",
                                  },
                                }),
                              ]),
                            ]),
                          ]
                        ),
                        e._v(" "),
                        i("div", { staticClass: "color-picker-hex" }, [
                          i("span", { staticClass: "color-picker-hashtag" }, [
                            e._v("#"),
                          ]),
                          e._v(" "),
                          i("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: e.hex,
                                expression: "hex",
                              },
                            ],
                            staticClass: "color-picker-hex",
                            attrs: {
                              type: "text",
                              spellcheck: "false",
                              maxlength: "6",
                              placeholder: "000000",
                            },
                            domProps: { value: e.hex },
                            on: {
                              input: [
                                function (s) {
                                  s.target.composing ||
                                    (e.hex = s.target.value);
                                },
                                function () {
                                  return e.triggerInput();
                                },
                              ],
                            },
                          }),
                        ]),
                      ]),
                    ]
                  )
                : e._e(),
            ]
          );
        };
        R._withStripped = !0;
        var A =
          (i(172),
          Object(y.a)(
            {
              data: () => ({
                pickerOpen: !1,
                movingPivot: !1,
                hue: 0,
                sat: 0,
                val: 0,
              }),
              props: ["value", "disabled"],
              computed: {
                hex: {
                  get() {
                    return (function (e, s, i) {
                      var a, n, r, o, l, c, d, h;
                      switch (
                        ((c = i * (1 - s)),
                        (d =
                          i * (1 - (l = 6 * e - (o = Math.floor(6 * e))) * s)),
                        (h = i * (1 - (1 - l) * s)),
                        o % 6)
                      ) {
                        case 0:
                          (a = i), (n = h), (r = c);
                          break;
                        case 1:
                          (a = d), (n = i), (r = c);
                          break;
                        case 2:
                          (a = c), (n = i), (r = h);
                          break;
                        case 3:
                          (a = c), (n = d), (r = i);
                          break;
                        case 4:
                          (a = h), (n = c), (r = i);
                          break;
                        case 5:
                          (a = i), (n = c), (r = d);
                      }
                      return (
                        (a = Math.ceil(255 * a)
                          .toString(16)
                          .padStart(2, "0")) +
                        (n = Math.ceil(255 * n)
                          .toString(16)
                          .padStart(2, "0")) +
                        Math.ceil(255 * r)
                          .toString(16)
                          .padStart(2, "0")
                      );
                    })(this.hue / 360, this.sat, this.val);
                  },
                  set(e) {
                    if (((e = e.toLowerCase()), /^[0-9a-f]{6}$/.test(e))) {
                      var s,
                        i,
                        a,
                        n,
                        r,
                        o,
                        l,
                        c =
                          ((s = e),
                          (i = parseInt(s.slice(0, 2), 16) / 255),
                          (a = parseInt(s.slice(2, 4), 16) / 255),
                          (n = parseInt(s.slice(4, 6), 16) / 255),
                          [
                            60 *
                              ((l =
                                (o =
                                  (r = Math.max(i, a, n)) -
                                  Math.min(i, a, n)) &&
                                (r == i
                                  ? (a - n) / o
                                  : r == a
                                  ? 2 + (n - i) / o
                                  : 4 + (i - a) / o)) < 0
                                ? l + 6
                                : l),
                            r && o / r,
                            r,
                          ]);
                      (this.hue = c[0]), (this.sat = c[1]), (this.val = c[2]);
                    }
                  },
                },
              },
              methods: {
                showPicker(e) {
                  this.pickerOpen = e;
                },
                startMovingPivot(e) {
                  var s = e.target.classList;
                  if (s.contains("color-picker-overlay"))
                    return this.showPicker(!1), void e.stopPropagation();
                  (s.contains("color-picker-pivot") ||
                    s.contains("color-picker-val")) &&
                    ((this.movingPivot = !0), this.movePivot(e));
                },
                movePivot(e) {
                  if (this.movingPivot) {
                    var s = this.$el
                        .querySelector(".color-picker-val")
                        .getBoundingClientRect(),
                      i = e.clientX - s.x,
                      a = e.clientY - s.y;
                    (this.sat = i / 100),
                      (this.val = 1 - a / 100),
                      (this.sat = Math.min(Math.max(this.sat, 0), 1)),
                      (this.val = Math.min(Math.max(this.val, 0), 1));
                  }
                },
                stopMovingPivot(e) {
                  this.movingPivot &&
                    (this.movePivot(e),
                    (this.movingPivot = !1),
                    this.triggerInput());
                },
                triggerInput() {
                  this.$emit("input", this.hex);
                },
              },
              created() {
                this.value && (this.hex = this.value);
              },
            },
            R,
            [],
            !1,
            null,
            "5b0666af",
            null
          ));
        A.options.__file = "src/components/color-option.vue";
        var N = A.exports,
          D = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i(
              "div",
              {
                staticClass: "image-button",
                class: { disabled: e.disabled },
                style: { backgroundColor: "#" + e.hex },
                on: {
                  mousedown: function () {
                    e.disabled || e.showPicker(!0);
                  },
                },
              },
              [
                i("div", { staticClass: "image-button-text" }, [e._v("...")]),
                e._v(" "),
                e.pickerOpen
                  ? i(
                      "div",
                      {
                        staticClass: "image-picker-wrapper",
                        on: {
                          click: function (s) {
                            return e.tryHidePicker(s);
                          },
                        },
                      },
                      [
                        i("div", { staticClass: "image-picker-overlay" }),
                        e._v(" "),
                        i("div", { staticClass: "image-picker fade-box" }, [
                          i("img", {
                            staticClass: "image-picker-preview",
                            style: {
                              maxWidth: (e.value ? e.width : 200) + "px",
                            },
                            attrs: {
                              src: e.value,
                              alt: "No image chosen or it is invalid",
                            },
                            on: {
                              click: function () {
                                return e.openFileChooser();
                              },
                              dragover: function (s) {
                                return e.allowDrop(s);
                              },
                              drop: function (s) {
                                return e.onImageDrop(s);
                              },
                            },
                          }),
                          e._v(" "),
                          i(
                            "div",
                            { staticClass: "image-picker-information" },
                            [
                              e._v(
                                "\n            Click or drop onto image to change."
                              ),
                              i("br"),
                              e._v(" "),
                              "defaults" in this
                                ? i(
                                    "span",
                                    {
                                      staticClass: "image-picker-reset",
                                      on: {
                                        click: function () {
                                          return e.triggerInput(e.defaults);
                                        },
                                      },
                                    },
                                    [e._v("Reset to default")]
                                  )
                                : e._e(),
                            ]
                          ),
                          e._v(" "),
                          i("input", {
                            staticClass: "image-picker-input",
                            attrs: {
                              type: "file",
                              accept:
                                "image/png, image/jpeg, image/bmp, image/webp",
                            },
                            on: {
                              change: function (s) {
                                return e.onImageSelect(s);
                              },
                            },
                          }),
                        ]),
                      ]
                    )
                  : e._e(),
              ]
            );
          };
        D._withStripped = !0;
        var O =
          (i(174),
          Object(y.a)(
            {
              data: () => ({ pickerOpen: !1, fileReader: null }),
              props: ["value", "width", "disabled", "defaults"],
              methods: {
                showPicker(e) {
                  !this.pickerOpen && e && (this.imageLoadedOnce = !1),
                    (this.pickerOpen = e);
                },
                tryHidePicker(e) {
                  e.target.classList.contains("image-picker-overlay") &&
                    (this.showPicker(!1), e.stopPropagation());
                },
                triggerInput(e) {
                  this.$emit("input", e);
                },
                openFileChooser() {
                  this.$el.querySelector(".image-picker-input").click();
                },
                allowDrop(e) {
                  e.preventDefault();
                },
                getFileReader() {
                  var e = new FileReader();
                  return (
                    e.addEventListener("load", (e) => {
                      this.triggerInput(e.target.result);
                    }),
                    e
                  );
                },
                onImageSelect(e) {
                  if (0 !== e.target.files.length) {
                    var s = e.target.files[0];
                    s.type.startsWith("image/") &&
                      this.getFileReader().readAsDataURL(s);
                  }
                },
                onImageDrop(e) {
                  if ((e.preventDefault(), 0 !== e.dataTransfer.files.length)) {
                    var s = e.dataTransfer.files[0];
                    s.type.startsWith("image/") &&
                      this.getFileReader().readAsDataURL(s);
                  }
                },
              },
            },
            D,
            [],
            !1,
            null,
            "641581b7",
            null
          ));
        O.options.__file = "src/components/image-option.vue";
        var F = O.exports,
          B = function () {
            var e = this.$createElement;
            return (this._self._c || e)("div");
          };
        B._withStripped = !0;
        var W = Object(y.a)(
          { data: () => ({ hello: 123 }) },
          B,
          [],
          !1,
          null,
          "384e68ec",
          null
        );
        (W.options.__file = "src/components/template.vue"), W.exports;
        var H = i(1),
          z = i(4),
          G = i(5);
        function V(e) {
          switch (e) {
            case 0:
              return "Thin";
            case 1:
              return "Normal";
            case 2:
              return "Bold";
            default:
              return "???";
          }
        }
        function Z(e) {
          switch (e) {
            case 0:
              return "No";
            case 1:
              return "Thin";
            case 2:
              return "Thick";
            case 3:
              return "Thickest";
            default:
              return "???";
          }
        }
        function j(e, s) {
          return e
            ? new Promise((i, a) => {
                var n = new Image();
                (n.onload = () => {
                  var e = document.createElement("canvas"),
                    a = e.getContext("2d"),
                    r = Math.max(n.width, n.height),
                    o = Math.min(n.width, n.height),
                    l = r === n.width,
                    c = Math.min(r, s) / r,
                    d = (l ? r : o) * c,
                    h = (l ? o : r) * c;
                  (e.width = d),
                    (e.height = h),
                    a.drawImage(n, 0, 0, d, h),
                    i(e.toDataURL());
                }),
                  (n.onerror = a),
                  (n.src = e);
              })
            : null;
        }
        var K = PIXI.utils.isWebGLSupported() && z.useWebGL,
          X =
            (i(176),
            Object(y.a)(
              {
                components: { colorOption: N, imageOption: F },
                data: () => ({
                  useWebGL: K,
                  bgDefault: z.getDefault("backgroundImageUrl"),
                  virusDefault: z.getDefault("virusImageUrl"),
                  mbArrowDefault: "https://i.postimg.cc/6pvLJ2TW/image.png",
                  showNameFontWarning: !1,
                  showMassFontWarning: !1,
                  backgroundColor: z.backgroundColor,
                  borderColor: z.borderColor,
                  foodColor: z.foodColor,
                  ejectedColor: z.ejectedColor,
                  cellNameOutlineColor: z.cellNameOutlineColor,
                  cursorImageUrl: z.cursorImageUrl,
                  backgroundImageUrl: z.backgroundImageUrl,
                  virusImageUrl: z.virusImageUrl,
                  cellMassColor: z.cellMassColor,
                  cellMassOutlineColor: z.cellMassOutlineColor,
                  cellNameFont: z.cellNameFont,
                  cellNameWeight: z.cellNameWeight,
                  cellNameOutline: z.cellNameOutline,
                  cellNameSmoothOutline: z.cellNameSmoothOutline,
                  cellMassFont: z.cellMassFont,
                  cellMassWeight: z.cellMassWeight,
                  cellMassOutline: z.cellMassOutline,
                  cellMassSmoothOutline: z.cellMassSmoothOutline,
                  cellMassTextSize: z.cellMassTextSize,
                  cellLongNameThreshold: z.cellLongNameThreshold,
                  shortMass: z.shortMass,
                  showBackgroundImage: z.showBackgroundImage,
                  backgroundImageRepeat: z.backgroundImageRepeat,
                  backgroundDefaultIfUnequal: z.backgroundDefaultIfUnequal,
                  backgroundImageOpacity: z.backgroundImageOpacity,
                  useFoodColor: z.useFoodColor,
                  mbArrow: z.mbArrow,
                  mbColor: z.mbColor,
                }),
                computed: {
                  cellNameWeightMeaning() {
                    return V(this.cellNameWeight);
                  },
                  cellMassWeightMeaning() {
                    return V(this.cellMassWeight);
                  },
                  cellNameOutlineMeaning() {
                    return Z(this.cellNameOutline);
                  },
                  cellMassOutlineMeaning() {
                    return Z(this.cellMassOutline);
                  },
                  cellMassTextSizeMeaning() {
                    return (function (e) {
                      switch (e) {
                        case 0:
                          return "Small";
                        case 1:
                          return "Normal";
                        case 2:
                          return "Large";
                        case 3:
                          return "Largest";
                        default:
                          return "???";
                      }
                    })(this.cellMassTextSize);
                  },
                },
                methods: {
                  async change(e, s, i) {
                    var a;
                    a =
                      s && s.target
                        ? isNaN(s.target.valueAsNumber)
                          ? s.target.value
                          : s.target.valueAsNumber
                        : s;
                    try {
                      switch (e) {
                        case "cursorImageUrl":
                          a = await j(a, 32);
                          break;
                        case "backgroundImageUrl":
                          a !== this.bgDefault && (a = await j(a, 4e3));
                          break;
                        case "virusImageUrl":
                          a !== this.virusDefault && (a = await j(a, 200));
                          break;
                        case "mbArrow":
                          Multibox.reloadArrow(a);
                      }
                    } catch (n) {
                      return void G.alert(
                        "This image is too large to even be loaded."
                      );
                    }
                    if (z[e] != a) {
                      var r = this[e];
                      try {
                        z.set(e, a);
                      } catch (o) {
                        return (
                          z.set(e, r),
                          void G.alert(
                            "Saving this setting failed. Perhaps the image is too large?"
                          )
                        );
                      }
                      switch (((this[e] = a), e)) {
                        case "cursorImageUrl":
                          H.events.$emit("set-cursor-url", a);
                          break;
                        case "backgroundColor":
                          H.renderer.backgroundColor = PIXI.utils.string2hex(a);
                          break;
                        case "cellNameOutlineColor":
                        case "cellNameFont":
                        case "cellNameWeight":
                        case "cellNameOutline":
                        case "cellNameSmoothOutline":
                          H.settings.compileNameFontStyle();
                          break;
                        case "cellMassColor":
                        case "cellMassOutlineColor":
                        case "cellMassFont":
                        case "cellMassWeight":
                        case "cellMassOutline":
                        case "cellMassSmoothOutline":
                        case "cellMassTextSize":
                          H.settings.compileMassFontStyle();
                          break;
                        case "cellLongNameThreshold":
                          H.scene.resetPlayerLongNames();
                      }
                      if (H.running)
                        switch (e) {
                          case "borderColor":
                            H.scene.resetBorder();
                            break;
                          case "foodColor":
                            z.useFoodColor && H.scene.reloadFoodTextures();
                            break;
                          case "ejectedColor":
                            H.scene.reloadEjectedTextures();
                            break;
                          case "virusImageUrl":
                            H.scene.reloadVirusTexture();
                            break;
                          case "cellNameOutlineColor":
                          case "cellNameFont":
                          case "cellNameWeight":
                          case "cellNameOutline":
                          case "cellNameSmoothOutline":
                            H.scene.resetNameTextStyle();
                            break;
                          case "cellMassColor":
                          case "cellMassOutlineColor":
                          case "cellMassFont":
                          case "cellMassWeight":
                          case "cellMassOutline":
                          case "cellMassSmoothOutline":
                          case "cellMassTextSize":
                            H.scene.resetMassTextStyle(!0);
                            break;
                          case "showBackgroundImage":
                            H.scene.toggleBackgroundImage(a);
                            break;
                          case "backgroundImageUrl":
                          case "backgroundImageRepeat":
                          case "backgroundDefaultIfUnequal":
                          case "backgroundImageOpacity":
                            H.scene.setBackgroundImage();
                            break;
                          case "useFoodColor":
                            H.scene.reloadFoodTextures();
                        }
                    }
                  },
                  confirmReset() {
                    G.confirm(
                      "Are you sure you want to reset all theming options?",
                      () => this.reset()
                    );
                  },
                  reset() {
                    var e = [
                      "useWebGL",
                      "bgDefault",
                      "virusDefault",
                      "showNameFontWarning",
                      "showMassFontWarning",
                    ];
                    for (var s in this.$data)
                      e.includes(s) || this.change(s, z.getDefault(s));
                  },
                  fontWarning(e, s) {
                    switch (e) {
                      case "name":
                        this.showNameFontWarning = s;
                        break;
                      case "mass":
                        this.showMassFontWarning = s;
                    }
                  },
                },
              },
              U,
              [],
              !1,
              null,
              "15c13b66",
              null
            ));
        X.options.__file = "src/components/theming.vue";
        var Y = X.exports,
          J = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i("div", { attrs: { id: "hotkey-container" } }, [
              i(
                "div",
                { staticClass: "hotkeys" },
                e._l(e.availableHotkeys, function (s, a) {
                  return i("div", { key: a, staticClass: "row" }, [
                    i("span", { staticClass: "action" }, [e._v(e._s(a))]),
                    e._v(" "),
                    i(
                      "span",
                      {
                        staticClass: "bind",
                        attrs: { tabindex: "0" },
                        on: {
                          mousedown: function (i) {
                            return e.onMouseDown(i, s);
                          },
                          keydown: function (i) {
                            return i.preventDefault(), e.onKeyDown(i, s);
                          },
                        },
                      },
                      [
                        e._v(
                          "\n            " + e._s(e.hotkeys[s]) + "\n        "
                        ),
                      ]
                    ),
                  ]);
                }),
                0
              ),
              e._v(" "),
              i("div", { staticClass: "footer" }, [
                i(
                  "span",
                  {
                    staticClass: "reset-button2",
                    on: { click: e.onResetClick },
                  },
                  [i("i", { staticClass: "fa fa-undo" }), e._v(" Reset\n    ")]
                ),
              ]),
            ]);
          };
        J._withStripped = !0;
        var q = i(66),
          Q = i(5),
          ee =
            (i(178),
            Object(y.a)(
              {
                data: () => ({
                  availableHotkeys: {
                    Multibox: "multibox",
                    "Triggerbot lock": "aimbot",
                    "Location pointer": "ping",
                    "Select player": "selectPlayer",
                    Feed: "feed",
                    "Feed macro": "feedMacro",
                    Split: "split",
                    Doublesplit: "splitx2",
                    Triplesplit: "splitx3",
                    "Quad split": "splitMax",
                    "Split 32": "split32",
                    "Split 64": "split64",
                    "Multi trick-split": "multi1",
                    "Multi double-trick": "multi2",
                    "Multi line-trick": "multi3",
                    "Diagonal linesplit": "linesplit",
                    "Freeze mouse": "freezeMouse",
                    "Lock linesplit": "lockLinesplit",
                    "Stop movement": "stopMovement",
                    Respawn: "respawn",
                    "Toggle auto respawn": "toggleAutoRespawn",
                    "Toggle skins": "toggleSkins",
                    "Toggle names": "toggleNames",
                    "Toggle food": "toggleFood",
                    "Toggle mass": "toggleMass",
                    "Toggle chat": "toggleChat",
                    "Toggle chat popup": "toggleChatToast",
                    "Toggle HUD": "toggleHud",
                    "Spectate lock": "spectateLock",
                    "Save replay": "saveReplay",
                    "Zoom level 1": "zoomLevel1",
                    "Zoom level 2": "zoomLevel2",
                    "Zoom level 3": "zoomLevel3",
                    "Zoom level 4": "zoomLevel4",
                    "Zoom level 5": "zoomLevel5",
                  },
                  hotkeys: q.get(),
                }),
                methods: {
                  onResetClick: function () {
                    Q.confirm(
                      "Are you sure you want to reset all hotkeys?",
                      () => {
                        this.hotkeys = q.reset();
                      }
                    );
                  },
                  onMouseDown: function (e, s) {
                    if (e.target === document.activeElement) {
                      var i = "MOUSE" + e.button;
                      q.set(s, i) &&
                        (e.preventDefault(),
                        (this.hotkeys[s] = i),
                        e.target.blur());
                    }
                  },
                  onKeyDown: function (e, s) {
                    var i = q.convertKey(e.code);
                    "ESCAPE" !== i && "ENTER" !== i
                      ? ("DELETE" == i && (i = ""),
                        q.set(s, i) && ((this.hotkeys[s] = i), e.target.blur()))
                      : e.target.blur();
                  },
                },
              },
              J,
              [],
              !1,
              null,
              "2dbed53e",
              null
            ));
        ee.options.__file = "src/components/hotkeys.vue";
        var et = ee.exports,
          es = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i("div", { staticClass: "container" }, [
              i("input", {
                ref: "file",
                staticStyle: { display: "none" },
                attrs: { type: "file", accept: ".vanis", multiple: "" },
                on: {
                  change: function (s) {
                    return e.onFile(s);
                  },
                },
              }),
              e._v(" "),
              i("div", { staticClass: "replay-list-header" }, [
                i("span", { staticClass: "replay-list-count" }, [
                  e._v(
                    e._s(
                      e.keysLoadedFirst
                        ? e.replayKeys.length +
                            " replay" +
                            (1 !== e.replayKeys.length ? "s" : "")
                        : "Loading"
                    )
                  ),
                ]),
                e._v(" "),
                e.keysLoadedFirst && !e.keysEmpty
                  ? i("span", { staticClass: "replay-list-page" }, [
                      i("div", { staticClass: "anchor" }, [
                        i("div", { staticClass: "left" }, [
                          i("div", { staticClass: "current" }, [
                            i("div", { staticClass: "phantom" }, [
                              i("i", {
                                staticClass: "fas fa-chevron-left prev",
                                class: {
                                  disabled: !e.keysLoaded || 0 === e.pageIndex,
                                },
                                on: {
                                  click: function () {
                                    return e.updateReplayPage(-1);
                                  },
                                },
                              }),
                              e._v(" "),
                              i("span", [e._v(e._s(e.pageCount))]),
                            ]),
                            e._v(" "),
                            e.pageInputShown
                              ? e._e()
                              : i(
                                  "div",
                                  {
                                    staticClass: "real",
                                    on: {
                                      click: function () {
                                        return e.togglePageInput(!0);
                                      },
                                    },
                                  },
                                  [i("span", [e._v(e._s(1 + e.pageIndex))])]
                                ),
                            e._v(" "),
                            e.pageInputShown
                              ? i("div", { staticClass: "real-input" }, [
                                  i("div", {
                                    staticClass: "overlay",
                                    on: {
                                      click: function () {
                                        return e.togglePageInput(!1);
                                      },
                                    },
                                  }),
                                  e._v(" "),
                                  i("i", {
                                    staticClass: "fas fa-chevron-left prev",
                                    class: {
                                      disabled:
                                        !e.keysLoaded || 0 === e.pageIndex,
                                    },
                                    on: {
                                      click: function () {
                                        return e.updateReplayPage(-1);
                                      },
                                    },
                                  }),
                                  e._v(" "),
                                  i("input", {
                                    attrs: { type: "text" },
                                    domProps: { value: 1 + e.pageIndex },
                                    on: {
                                      focus: function (e) {
                                        return e.target.select();
                                      },
                                      change: function (s) {
                                        return e.updateReplayPage(s);
                                      },
                                    },
                                  }),
                                ])
                              : e._e(),
                          ]),
                        ]),
                        e._v("\n            /\n            "),
                        i("div", { staticClass: "right" }, [
                          e._v(
                            "\n                " +
                              e._s(e.pageCount) +
                              "\n                    "
                          ),
                          i("i", {
                            staticClass: "fas fa-chevron-right next",
                            class: {
                              disabled:
                                !e.keysLoaded ||
                                e.pageIndex === e.pageCount - 1,
                            },
                            on: {
                              click: function () {
                                return e.updateReplayPage(1);
                              },
                            },
                          }),
                        ]),
                      ]),
                    ])
                  : e._e(),
                e._v(" "),
                i("span", { staticClass: "replay-list-bulk" }, [
                  i("input", {
                    staticClass: "vanis-button",
                    attrs: {
                      type: "button",
                      disabled: !e.keysLoaded,
                      value: "Import",
                    },
                    on: {
                      click: function () {
                        return e.$refs.file.click();
                      },
                    },
                  }),
                  e._v(" "),
                  i("input", {
                    staticClass: "vanis-button",
                    attrs: {
                      type: "button",
                      disabled: !e.keysLoaded || e.keysEmpty,
                      value: "Download all",
                    },
                    on: {
                      click: function () {
                        return e.downloadAllReplays();
                      },
                    },
                  }),
                  e._v(" "),
                  i("input", {
                    staticClass: "vanis-button",
                    attrs: {
                      type: "button",
                      disabled: !e.keysLoaded || e.keysEmpty,
                      value: "Delete all",
                    },
                    on: {
                      click: function () {
                        return e.deleteAllReplays();
                      },
                    },
                  }),
                ]),
              ]),
              e._v(" "),
              i(
                "div",
                { staticClass: "replay-list" },
                [
                  e.keysLoadedFirst && e.keysEmpty
                    ? [
                        i("div", { staticClass: "notification" }, [
                          i("div", [
                            e._v("Press "),
                            i("b", [e._v(e._s(e.messageHotkey))]),
                            e._v(" in game to save last "),
                            i("b", [e._v(e._s(e.messageReplayDuration))]),
                            e._v(" seconds of gameplay."),
                          ]),
                          e._v(" "),
                          i(
                            "div",
                            {
                              staticStyle: {
                                color: "red",
                                "font-weight": "bold",
                              },
                            },
                            [e._v("Replays are saved in browser memory!")]
                          ),
                          e._v(" "),
                          i("div", [
                            e._v(
                              "They get permanently erased if browser data gets cleared."
                            ),
                          ]),
                        ]),
                      ]
                    : e._e(),
                  e._v(" "),
                  e.keysLoadedFirst && !e.keysEmpty
                    ? [
                        i(
                          "div",
                          { staticClass: "replay-page" },
                          e._l(e.pageData, function (e, s) {
                            return i("replay-item", {
                              key: s,
                              attrs: { replay: e },
                            });
                          }),
                          1
                        ),
                      ]
                    : e._e(),
                ],
                2
              ),
              e._v(" "),
              e.bulkOperating
                ? i("div", { staticClass: "overlay bulk-operation-overlay" }, [
                    e._v("\n        Please wait...\n        "),
                    e.bulkOperationStatus
                      ? i("div", { staticClass: "small" }, [
                          e._v(e._s(e.bulkOperationStatus)),
                        ])
                      : e._e(),
                    e._v(" "),
                    e.showMultipleFilesWarning
                      ? i("div", { staticClass: "small warning" }, [
                          e._v(
                            "Allow page to download multiple files if asked"
                          ),
                        ])
                      : e._e(),
                  ])
                : e._e(),
            ]);
          };
        es._withStripped = !0;
        var ei = i(116),
          ea = i(89),
          en = i(180),
          er = i(1),
          eo = i(66),
          el = i(4),
          ec = i(5),
          ed = i(8),
          eh = er.replay.database,
          eu = {
            data: () => ({
              keysLoadedFirst: !1,
              keysLoaded: !1,
              keysLoading: !1,
              keysEmpty: !1,
              replayKeys: [],
              pageInputShown: !1,
              pageLoadingCancel: null,
              pageLoaded: !1,
              pageIndex: 0,
              pageCount: 0,
              pageData: [],
              bulkOperating: !1,
              bulkOperationStatus: "",
              showMultipleFilesWarning: !1,
              messageHotkey: eo.get().saveReplay,
              messageReplayDuration: el.replayDuration,
            }),
            components: { replayItem: ei.default },
            methods: {
              togglePageInput(e) {
                this.pageInputShown = e;
              },
              setBulkOp(e, s) {
                e
                  ? ((this.bulkOperating = !0),
                    (this.bulkOperationStatus = s || ""))
                  : setTimeout(() => {
                      (this.bulkOperating = !1),
                        (this.bulkOperationStatus = "");
                    }, 1e3);
              },
              async onFile(e) {
                if (!this.bulkOperating) {
                  var s = Array.from(e.target.files);
                  if (s.length) {
                    e.target && (e.target.value = null);
                    var i = 0,
                      a = s.length,
                      n = s.map(async (e) => {
                        var s, n;
                        await eh.setItem(
                          e.name.replace(/\.vanis$/, ""),
                          await ((s = e),
                          new Promise((e, i) => {
                            var a = new FileReader();
                            (a.onload = (s) => e(s.target.result)),
                              (a.onerror = i),
                              a.readAsText(s);
                          }))
                        ),
                          this.setBulkOp(
                            !0,
                            "Importing replays (" + ++i + " / " + a + ")"
                          );
                      });
                    this.setBulkOp(!0, "Importing replays");
                    try {
                      await Promise.all(n);
                    } catch (r) {
                      ec.alert('Error importing replays: "' + r.message + '"'),
                        this.setBulkOp(!1),
                        this.updateReplayKeys();
                    }
                    this.setBulkOp(!1), this.updateReplayKeys();
                  }
                }
              },
              async downloadAllReplays() {
                if (!this.bulkOperating && this.keysLoaded) {
                  var e = this.replayKeys.length,
                    s = Math.ceil(this.replayKeys.length / 200),
                    i = s > 1,
                    a = ed.getTimestamp();
                  (this.showMultipleFilesWarning = i),
                    this.setBulkOp(!0, "Packing replays (0 / " + s + ")");
                  for (var n = 0, r = 0; n < e; n += 200, r++) {
                    for (var o = new en(), l = n; l < n + 200 && l < e; l++) {
                      var c = this.replayKeys[l];
                      o.file(c + ".vanis", await eh.getItem(c));
                    }
                    var d = await o.generateAsync({ type: "blob" }),
                      h = "replays_" + a;
                    i && (h += "_" + (r + 1)),
                      (h += ".zip"),
                      ea.saveAs(d, h),
                      this.setBulkOp(
                        !0,
                        "Packing replays (" + (r + 1) + " / " + s + ")"
                      );
                  }
                  (this.showMultipleFilesWarning = !1), this.setBulkOp(!1);
                }
              },
              deleteAllReplays() {
                if (!this.bulkOperating) {
                  var e = this;
                  ec.confirm(
                    "Are you absolutely sure that you want to delete all replays?",
                    async () => {
                      this.setBulkOp(!0, "Deleting all replays");
                      try {
                        await eh.clear();
                      } catch (s) {
                        return void ec.alert(
                          "Error clearing replays: " + s.message
                        );
                      }
                      this.setBulkOp(!1), e.updateReplayKeys();
                    }
                  );
                }
              },
              async updateReplayKeys() {
                if (!this.keysLoading) {
                  (this.keysLoaded = !1), (this.keysLoading = !0);
                  var e = await eh.keys();
                  (e = e.reverse()),
                    this.replayKeys.splice(0, this.replayKeys.length, ...e),
                    (this.pageCount = Math.max(Math.ceil(e.length / 12), 1)),
                    (this.pageIndex = Math.min(
                      this.pageIndex,
                      this.pageCount - 1
                    )),
                    (this.keysLoaded = !0),
                    (this.keysLoadedFirst = !0),
                    (this.keysLoading = !1),
                    (this.keysEmpty = 0 === e.length),
                    await this.updateReplayPage();
                }
              },
              async updateReplayPage(e) {
                e &&
                  ("number" == typeof e
                    ? (this.pageIndex += e)
                    : (this.pageIndex = parseInt(e.target.value) - 1 || 0)),
                  this.pageLoadingCancel &&
                    (this.pageLoadingCancel(), (this.pageLoadingCancel = null));
                var s = Math.max(
                  Math.min(this.pageIndex, this.pageCount - 1),
                  0
                );
                this.pageIndex !== s && (this.pageIndex = s),
                  (this.pageLoaded = !1);
                var i = [],
                  a = !1;
                this.pageLoadingCancel = () => (a = !0);
                for (
                  var n = 12 * this.pageIndex,
                    r = 12 * (1 + this.pageIndex),
                    o = n;
                  o < r && o < this.replayKeys.length && !a;
                  o++
                ) {
                  var l = this.replayKeys[o],
                    c = { name: l, data: await eh.getItem(l) };
                  c.data.startsWith("REPLAY")
                    ? (c.image = c.data.split("|")[2])
                    : (c.image = "https://vanis.io/img/replay-placeholder.png"),
                    i.push(c);
                }
                a ||
                  (this.pageData.splice(0, this.pageData.length, ...i),
                  (this.pageLoaded = !0));
              },
            },
            created() {
              this.updateReplayKeys(),
                er.events.$on("replay-added", this.updateReplayKeys),
                er.events.$on("replay-removed", this.updateReplayKeys);
            },
            beforeDestroy() {
              er.events.$off("replay-added", this.updateReplayKeys),
                er.events.$off("replay-removed", this.updateReplayKeys);
            },
          },
          ep = (i(220), Object(y.a)(eu, es, [], !1, null, "4a996e52", null));
        ep.options.__file = "src/components/replays3.vue";
        var ev = ep.exports,
          em = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i("div", { staticStyle: { padding: "15px" } }, [
              i(
                "h2",
                { staticStyle: { margin: "0", "margin-bottom": "14px" } },
                [e._v(e._s(e.seasonLeaderboardText))]
              ),
              e._v(" "),
              e.errorMessage
                ? i("div", [
                    e._v(
                      "\n    Failed loading season leaderboard data:\n    " +
                        e._s(e.errorMessage) +
                        "\n"
                    ),
                  ])
                : e._e(),
              e._v(" "),
              e.playerList.length
                ? i(
                    "div",
                    [
                      i("div", { staticClass: "info" }, [
                        e._v(
                          "\n        Season XP counts for this season only."
                        ),
                        i("br"),
                        e._v(
                          "\n            Top few players earn colored names."
                        ),
                        i("br"),
                        e._v("\n        Check our "),
                        i(
                          "a",
                          { attrs: { href: "https://vanis.io/discord" } },
                          [e._v("Discord")]
                        ),
                        e._v(" for more information."),
                        i("br"),
                        e._v("\n        Season ends in "),
                        i("b", [e._v(e._s(e.seasonEndTime))]),
                      ]),
                      e._v(" "),
                      e._l(e.playerList, function (s, a) {
                        return i(
                          "div",
                          {
                            key: a,
                            staticClass: "player-row",
                            class: { me: e.ownUid && e.ownUid === s.uid },
                          },
                          [
                            i("span", { staticClass: "player-nr" }, [
                              e._v(e._s(a + 1) + "."),
                            ]),
                            e._v(" "),
                            i(
                              "span",
                              {
                                staticClass: "player-name",
                                style: { color: s.name_color },
                              },
                              [e._v(e._s(s.name))]
                            ),
                            e._v(" "),
                            i("span", { staticClass: "player-xp" }, [
                              e._v(e._s(s.season_xp) + " XP"),
                            ]),
                          ]
                        );
                      }),
                    ],
                    2
                  )
                : e._e(),
            ]);
          };
        em._withStripped = !0;
        var eg = i(1),
          ef = i(19),
          { checkBadWords: ey } = i(17),
          ew = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          e$ =
            (i(222),
            Object(y.a)(
              {
                data: () => ({
                  playerList: [],
                  errorMessage: "",
                  ownUid: null,
                  date: new Date(),
                  nextStartDate: Date.UTC(
                    new Date().getUTCFullYear(),
                    new Date().getUTCMonth() + 1
                  ),
                  seasonEndTime: null,
                  seasonEndTimeInterval: null,
                  selected: "sxp",
                }),
                computed: {
                  seasonLeaderboardText() {
                    return (
                      ew[this.date.getUTCMonth()] +
                      " " +
                      this.date.getUTCFullYear() +
                      " season"
                    );
                  },
                },
                methods: {
                  setSeasonEndTime() {
                    this.seasonEndTime = (function (e) {
                      if (e < 0) return "now";
                      var s = Math.floor(e / 1e3),
                        i = s % 60,
                        a = Math.floor(s / 60),
                        n = a % 60,
                        r = Math.floor(a / 60),
                        o = r % 24,
                        l = Math.floor(r / 24),
                        c = [];
                      return (
                        l > 0 && c.push(l + " day" + (1 !== l ? "s" : "")),
                        o % 24 > 0 &&
                          c.push(o + " hour" + (1 !== o ? "s" : "")),
                        0 === l &&
                          n % 60 > 0 &&
                          c.push(n + " minute" + (1 !== n ? "s" : "")),
                        0 === r &&
                          i % 60 > 0 &&
                          c.push(i + " second" + (1 !== i ? "s" : "")),
                        c.join(" ")
                      );
                    })(this.nextStartDate - Date.now());
                  },
                },
                created() {
                  this.ownUid = eg.ownUid;
                  var e =
                    "https://vanis.io/api".replace("/api", "") +
                    "/highscores/season_xp/100";
                  ef
                    .get(e)
                    .then((e) => {
                      var s = e.data;
                      s.forEach((e) => {
                        var s = e.name_color;
                        e.name_color = s ? "#" + s : "white";
                        var i = e.locked_name || e.discord_name;
                        ey(i) && (i = "********"), (e.name = i);
                      }),
                        (this.playerList = s);
                    })
                    .catch((e) => {
                      this.errorMessage = e.message;
                    }),
                    eg.events.$on("every-second", this.setSeasonEndTime),
                    this.setSeasonEndTime();
                },
                destroyed() {
                  eg.events.$off("every-second", this.setSeasonEndTime);
                },
              },
              em,
              [],
              !1,
              null,
              "7179a145",
              null
            ));
        e$.options.__file = "src/components/meta-leaderboard.vue";
        var eb = e$.exports,
          e_ = (i(19), i(1)),
          ek =
            (i(5),
            {
              components: {
                modal: k.default,
                settings: E,
                theming: Y,
                hotkeys: et,
                replays3: ev,
                metaLeaderboard: eb,
              },
              data: () => ({
                activeModal: "",
                showSettings: !1,
                showHotkeys: !1,
                gameState: e_.state,
                nickname:
                  "string" == typeof localStorage.nickname
                    ? localStorage.nickname
                    : "",
                teamtag: localStorage.teamtag || "",
                skinUrl:
                  "string" == typeof localStorage.skinUrl
                    ? localStorage.skinUrl
                    : "https://skins.vanis.io/s/vanis1",
              }),
              created: function () {
                e_.events.$on("skin-click", (e) => {
                  this.skinUrl =
                    localStorage.skinUrl =
                    document.getElementById("skinDisplay1").src =
                      e;
                });
              },
              methods: {
                openModal: function (e) {
                  (this.activeModal = e), this.$emit("modal-open", !0);
                },
                closeModal: function () {
                  (this.activeModal = ""), this.$emit("modal-open", !1);
                },
                play: function (e) {
                  e instanceof MouseEvent &&
                    e.isTrusted &&
                    (this.gameState.isAlive || e_.actions.join(),
                    e_.showMenu(!1));
                },
                spectate: function () {
                  this.gameState.isAlive ||
                    (e_.actions.spectate(), e_.showMenu(!1));
                },
                onSkinUrlChange() {
                  e_.events.$emit("skin-url-edit", this.skinUrl);
                },
                onTeamTagChange() {
                  localStorage.setItem("teamtag", this.teamtag);
                },
                onNicknameChange() {
                  localStorage.setItem("nickname", this.nickname);
                },
              },
            }),
          eC =
            (i(224),
            Object(y.a)(
              ek,
              _,
              [
                function () {
                  var e = this.$createElement,
                    s = this._self._c || e;
                  return s(
                    "div",
                    {
                      staticStyle: { "text-align": "center", height: "286px" },
                    },
                    [
                      s("div", { staticStyle: { padding: "4px" } }, [
                        this._v(""),
                      ]),
                      this._v(" "),
                      s("div", { attrs: { id: "vanis-io_300x250" } }),
                    ]
                  );
                },
              ],
              !1,
              null,
              "1bcde71e",
              null
            ));
        eC.options.__file = "src/components/player.vue";
        var e8 = eC.exports,
          ex = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i("div", { staticStyle: { padding: "12px 15px" } }, [
              e.account
                ? e._e()
                : i("div", [
                    i(
                      "div",
                      {
                        staticStyle: {
                          "margin-top": "6px",
                          "margin-bottom": "10px",
                        },
                      },
                      [
                        e._v(
                          "Login to your account with Discord to save your in-game progress."
                        ),
                      ]
                    ),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "discord",
                        on: {
                          click: function () {
                            return e.openDiscordLogin();
                          },
                        },
                      },
                      [
                        e.loading
                          ? [
                              e.loading
                                ? i("i", {
                                    staticClass: "fas fa-sync fa-spin",
                                    staticStyle: { "margin-right": "5px" },
                                  })
                                : e._e(),
                              e._v(" Loading\n        "),
                            ]
                          : [
                              i("i", { staticClass: "fab fa-discord" }),
                              e._v(" Login with Discord\n            "),
                            ],
                      ],
                      2
                    ),
                  ]),
              e._v(" "),
              e.account
                ? i("div", { staticClass: "account" }, [
                    i("div", { staticStyle: { "margin-bottom": "3px" } }, [
                      i("img", {
                        staticClass: "avatar",
                        attrs: { src: e.avatarUrl },
                      }),
                      e._v(" "),
                      i("div", { staticClass: "player-info" }, [
                        i(
                          "div",
                          {
                            style: { color: e.nameColor },
                            attrs: { id: "account-name" },
                          },
                          [e._v(e._s(e.name))]
                        ),
                        e._v(" "),
                        i("div", [e._v("Level " + e._s(e.account.level))]),
                        e._v(" "),
                        i("div", [e._v(e._s(e.account.xp) + " total XP")]),
                        e._v(" "),
                        i("div", [
                          e._v(e._s(e.account.season_xp || 0) + " season XP"),
                        ]),
                      ]),
                    ]),
                    e._v(" "),
                    i(
                      "div",
                      { staticStyle: { position: "relative" } },
                      [
                        i("progress-bar", {
                          staticClass: "xp-progress",
                          attrs: { progress: e.progress },
                        }),
                        e._v(" "),
                        i("div", { staticClass: "xp-data" }, [
                          i(
                            "div",
                            {
                              staticStyle: { flex: "1", "margin-left": "8px" },
                            },
                            [e._v(e._s(e.xpAtCurrentLevel))]
                          ),
                          e._v(" "),
                          i("div", { staticStyle: { "margin-right": "7px" } }, [
                            e._v(e._s(e.xpAtNextLevel)),
                          ]),
                        ]),
                      ],
                      1
                    ),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "logout",
                        on: {
                          click: function () {
                            return e.logout();
                          },
                        },
                      },
                      [
                        i("i", { staticClass: "fas fa-sign-out-alt" }),
                        e._v(" Logout\n    "),
                      ]
                    ),
                  ])
                : e._e(),
            ]);
          };
        ex._withStripped = !0;
        var eS = function () {
          var e = this.$createElement,
            s = this._self._c || e;
          return s("div", { staticClass: "progress progress-striped" }, [
            s("div", {
              staticClass: "progress-bar",
              style: { width: 100 * this.progress + "%" },
            }),
          ]);
        };
        eS._withStripped = !0;
        var e0 =
          (i(226),
          Object(y.a)(
            { props: ["progress"] },
            eS,
            [],
            !1,
            null,
            "4e838c74",
            null
          ));
        e0.options.__file = "src/components/progressBar.vue";
        var eM = e0.exports,
          eT = i(228),
          eI = i(5),
          eP = i(1),
          eL = i(229),
          eE =
            (i(230),
            Object(y.a)(
              {
                components: { progressBar: eM },
                data: () => ({
                  accountTime: 0,
                  account: null,
                  progress: 0,
                  xpAtCurrentLevel: 0,
                  xpAtNextLevel: 0,
                  loading: !1,
                  avatarUrl: null,
                  nameColor: null,
                  name: null,
                }),
                created() {
                  eP.events.$on("xp-update", this.onXpUpdate),
                    this.reloadUserData(),
                    this.listenForToken();
                },
                beforeDestroy() {
                  eP.events.$off("xp-update", this.onXpUpdate);
                },
                methods: {
                  listenForToken() {
                    window.addEventListener("message", (e) => {
                      var s = e.data.vanis_token;
                      s &&
                        (this.onLoggedIn(s),
                        e.source.postMessage("loggedIn", e.origin));
                    });
                  },
                  reloadUserData() {
                    Date.now() - this.accountTime <= 6e4 ||
                      ((this.accountTime = Date.now()),
                      eT.vanisToken && this.loadUserData());
                  },
                  async loadUserData() {
                    this.loading = !0;
                    try {
                      var e = await eT.get("/me");
                    } catch (s) {
                      this.loading = !1;
                      var i = s.response;
                      if (!i) return;
                      return void (401 === i.status && eT.clearToken());
                    }
                    this.setAccountData(e),
                      this.updateProgress(this.account.xp, this.account.level),
                      (this.loading = !1);
                  },
                  async logout() {
                    try {
                      await eT.call("DELETE", "/me");
                    } catch (e) {
                      var s = e.response;
                      s && 401 !== s.status && eI.alert("Error: " + e.message);
                    }
                    eT.clearToken(),
                      (this.account = null),
                      (this.name = null),
                      (this.nameColor = null),
                      (this.avatarUrl = null),
                      (eP.ownUid = null);
                  },
                  getAvatarUrl: (e, s) =>
                    s
                      ? "https://cdn.discordapp.com/avatars/" +
                        e +
                        "/" +
                        s +
                        ".png"
                      : "https://cdn.discordapp.com/embed/avatars/0.png",
                  setAccountData(e) {
                    e.permissions && (window.gameObj = eP),
                      (GAME.account = e),
                      (this.account = e),
                      (this.avatarUrl = this.getAvatarUrl(
                        e.discord_id,
                        e.discord_avatar
                      )),
                      (this.name = e.locked_name || e.discord_name),
                      (this.nameColor = e.name_color
                        ? "#" + e.name_color
                        : "#ffffff"),
                      (eP.ownUid = e.uid);
                  },
                  onXpUpdate(e) {
                    if (this.account) {
                      var s = eL.getLevel(e);
                      (this.account.season_xp += e - this.account.xp),
                        (this.account.xp = e),
                        (this.account.level = s),
                        this.updateProgress(e, s);
                    }
                  },
                  updateProgress(e, s) {
                    (this.xpAtCurrentLevel = eL.getXp(s)),
                      (this.xpAtNextLevel = eL.getXp(s + 1)),
                      (this.progress =
                        (e - this.xpAtCurrentLevel) /
                        (this.xpAtNextLevel - this.xpAtCurrentLevel));
                  },
                  openDiscordLogin: function () {
                    window.open(
                      eT.url + "/login/discord",
                      "",
                      "width=500, height=750"
                    );
                  },
                  onLoggedIn(e) {
                    eT.setToken(e), this.loadUserData();
                  },
                },
              },
              ex,
              [],
              !1,
              null,
              "661435cd",
              null
            ));
        eE.options.__file = "src/components/account.vue";
        var e1 = eE.exports,
          e4 = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i("div", { attrs: { id: "skins-container" } }, [
              i(
                "div",
                { attrs: { id: "skins" } },
                [
                  e._l(e.skins, function (s, a) {
                    return i(
                      "span",
                      { key: a, staticClass: "skin-container" },
                      [
                        i("img", {
                          staticClass: "skin",
                          class: { selected: e.selectedSkinIndex === a },
                          attrs: { src: s, alt: "" },
                          on: {
                            click: function () {
                              return e.selectSkin(a);
                            },
                            contextmenu: function () {
                              getModule(4).set(
                                "mbSkin",
                                GAME.skinPanel.skins[a]
                              ),
                                (document.getElementById("skinDisplay2").src =
                                  GAME.skinPanel.skins[a]),
                                window.SwalAlerts.toast.fire({
                                  type: "info",
                                  title: "Multibox skin set!",
                                  timer: 1500,
                                });
                            },
                          },
                        }),
                        e._v(" "),
                        i("i", {
                          staticClass: "fas fa-times skin-remove-button",
                          on: {
                            click: function () {
                              return e.removeSkin(a);
                            },
                          },
                        }),
                      ]
                    );
                  }),
                  e._v(" "),
                  i("img", {
                    staticClass: "skin add-skin",
                    attrs: { src: "/img/skin-add.png", alt: "" },
                    on: {
                      click: function () {
                        return e.addSkin();
                      },
                    },
                  }),
                ],
                2
              ),
            ]);
          };
        e4._withStripped = !0;
        var e3 = i(1),
          eU =
            (i(232),
            Object(y.a)(
              {
                data: () => ({
                  selectedSkinIndex: 0,
                  skins: [],
                  skinsLoaded: [],
                }),
                created() {
                  e3.events.$on(
                    "skin-url-edit",
                    this.onSkinUrlChanged.bind(this)
                  ),
                    (this.skins = this.loadSkins() || this.getDefaultSkins());
                  var e = Number(localStorage.selectedSkinIndex) || 0;
                  this.selectSkin(e), (GAME.skinPanel = this);
                },
                methods: {
                  loadSkins() {
                    var e = localStorage.skins;
                    if (!e) return !1;
                    try {
                      var s = JSON.parse(e);
                    } catch (i) {
                      return !1;
                    }
                    if (!Array.isArray(s)) return !1;
                    for (var a = s.length; a < 2; a++)
                      s.push("https://skins.vanis.io/s/vanis1");
                    return s;
                  },
                  getDefaultSkins() {
                    for (var e = [], s = 0; s < 8; s++)
                      e.push("https://skins.vanis.io/s/vanis1");
                    return e;
                  },
                  onSkinUrlChanged(e) {
                    this.$set(this.skins, this.selectedSkinIndex, e),
                      this.saveSkins();
                  },
                  selectSkin(e) {
                    (this.selectedSkinIndex = e),
                      (localStorage.selectedSkinIndex = e);
                    var s = this.skins[e];
                    e3.events.$emit("skin-click", s);
                  },
                  removeSkin(e) {
                    this.skins.splice(e, 1),
                      this.skins.length < 2 &&
                        this.skins.push("https://skins.vanis.io/s/vanis1"),
                      this.saveSkins();
                    var s = Math.max(0, this.selectedSkinIndex - 1);
                    this.selectSkin(s);
                  },
                  addSkin(e) {
                    if (!this.skins.includes(e)) {
                      var s = this.skins.length;
                      this.skins.push(e || "https://skins.vanis.io/s/vanis1"),
                        e || this.selectSkin(s),
                        this.saveSkins();
                    }
                  },
                  saveSkins() {
                    localStorage.skins = JSON.stringify(this.skins);
                  },
                },
              },
              e4,
              [],
              !1,
              null,
              "1c614894",
              null
            ));
        eU.options.__file = "src/components/skins.vue";
        var e2 = eU.exports,
          eR = i(1),
          eA =
            (i(234),
            Object(y.a)(
              {
                data: () => ({
                  isModalOpen: !1,
                  selectedTab: "servers",
                  gameState: eR.state,
                  cursorStyleElem: null,
                }),
                methods: {
                  onModalChange: function (e) {
                    this.isModalOpen = e;
                  },
                  setCursorUrl(e) {
                    var s = null;
                    e &&
                      (s =
                        "#canvas, #hud > * { cursor: url('" +
                        e +
                        "'), auto !important; }"),
                      !s && this.cursorStyleElem
                        ? (this.cursorStyleElem.remove(),
                          (this.cursorStyleElem = null))
                        : s &&
                          !this.cursorStyleElem &&
                          ((this.cursorStyleElem =
                            document.createElement("style")),
                          document.head.appendChild(this.cursorStyleElem)),
                      this.cursorStyleElem &&
                        (this.cursorStyleElem.innerHTML = s);
                  },
                },
                components: {
                  servers: b,
                  playerContainer: e8,
                  account: e1,
                  skins: e2,
                },
                created() {
                  eR.events.$on("set-cursor-url", (e) => this.setCursorUrl(e));
                },
                mounted() {
                  this.setCursorUrl(eR.settings.cursorImageUrl);
                },
              },
              l,
              [],
              !1,
              null,
              "ebed1606",
              null
            ));
        eA.options.__file = "src/components/main-container.vue";
        var eN = eA.exports,
          e9 = function () {
            this.$createElement, this._self._c;
          };
        (e9._withStripped = !0), i(236);
        var eD = Object(y.a)(
          {},
          e9,
          [function () {}],
          !1,
          null,
          "4d0670e9",
          null
        );
        eD.options.__file = "src/components/social-links.vue";
        var eO = eD.exports,
          eF = function () {
            return this.$createElement, this._self._c, this._m(0);
          };
        eF._withStripped = !0;
        var e6 =
          (i(238),
          Object(y.a)(
            { data() {} },
            eF,
            [
              function () {
                var e = this.$createElement,
                  s = this._self._c || e;
                return s("div", { staticClass: "container" }, [
                  s(
                    "a",
                    {
                      staticStyle: { "margin-left": "20.59px" },
                      attrs: { href: "privacy.html", target: "_blank" },
                    },
                    [this._v("")]
                  ),
                  this._v(" "),
                  s("span", { staticClass: "line" }, [this._v("")]),
                  this._v(" "),
                  s("a", { attrs: { href: "tos.html", target: "_blank" } }, [
                    this._v(""),
                  ]),
                ]);
              },
            ],
            !1,
            null,
            "6843da33",
            null
          ));
        e6.options.__file = "src/components/privacy-tos.vue";
        var eB = e6.exports,
          eW = function () {
            var e = this.$createElement,
              s = this._self._c || e;
            return this.show
              ? s(
                  "div",
                  {
                    staticClass: "context-menu fade",
                    style: { top: this.y + "px", left: this.x + "px" },
                  },
                  [
                    s("div", { staticClass: "player-name" }, [
                      this._v(this._s(this.playerName)),
                    ]),
                    this._v(" "),
                    s("div", [this._v("Block")]),
                    this._v(" "),
                    s("div", { on: { click: this.hideName } }, [
                      this._v("Hide Name"),
                    ]),
                    this._v(" "),
                    s("div", { on: { click: this.hideSkin } }, [
                      this._v("Hide Skin"),
                    ]),
                    this._v(" "),
                    s("div", [this._v("Kick")]),
                    this._v(" "),
                    s("div", [this._v("Ban")]),
                    this._v(" "),
                    s("div", [this._v("Mute")]),
                  ]
                )
              : this._e();
          };
        (eW._withStripped = !0), i(1);
        var eH =
          (i(240),
          Object(y.a)(
            {
              data: () => ({ show: !1, playerName: "", x: 100, y: 55 }),
              methods: {
                open: function (e, s) {
                  (this.player = s),
                    (this.playerName = s.name),
                    (this.x = e.clientX),
                    (this.y = e.clientY),
                    (this.show = !0),
                    document.addEventListener(
                      "click",
                      () => {
                        this.show = !1;
                      },
                      { once: !0 }
                    );
                },
                hideName: function () {
                  this.player.setName(""), this.player.invalidateVisibility();
                },
                hideSkin: function () {
                  this.player.setSkin(""), this.player.invalidateVisibility();
                },
              },
              created() {},
            },
            eW,
            [],
            !1,
            null,
            "4dbee04d",
            null
          ));
        eH.options.__file = "src/components/context-menu.vue";
        var ez = eH.exports,
          e5 = function () {
            var e = this.$createElement,
              s = this._self._c || e;
            return s(
              "div",
              { attrs: { id: "hud" } },
              [
                s("stats"),
                this._v(" "),
                s("chatbox"),
                this._v(" "),
                s("leaderboard"),
                this._v(" "),
                s("minimap"),
                this._v(" "),
                s("cautions"),
              ],
              1
            );
          };
        e5._withStripped = !0;
        var e7 = function () {
          var e = this,
            s = e.$createElement,
            i = e._self._c || s;
          return i("div", [
            i(
              "div",
              { staticClass: "server-cautions" },
              e._l(e.serverInfo, function (s) {
                return i("div", [e._v(e._s(s))]);
              }),
              0
            ),
            e._v(" "),
            i("div", { staticClass: "cautions" }, [
              !e.stopped && e.showMouseFrozen
                ? i("div", [e._v("MOUSE FROZEN")])
                : e._e(),
              e._v(" "),
              !e.stopped && e.showMovementStopped
                ? i("div", [e._v("MOVEMENT STOPPED")])
                : e._e(),
              e._v(" "),
              !e.stopped && e.showLinesplitting
                ? i("div", [e._v("LINESPLITTING")])
                : e._e(),
            ]),
          ]);
        };
        e7._withStripped = !0;
        var eG = i(1),
          eV =
            (i(242),
            Object(y.a)(
              {
                data: () => ({
                  showMouseFrozen: !1,
                  showMovementStopped: !1,
                  showLinesplitting: !1,
                  serverInfo: null,
                }),
                mounted() {
                  eG.events.$on("update-cautions", (e) => {
                    (GAME.cautions = this),
                      "mouseFrozen" in e &&
                        (this.showMouseFrozen = e.mouseFrozen),
                      "moveToCenterOfCells" in e &&
                        (this.showMovementStopped = e.moveToCenterOfCells),
                      "lockLinesplit" in e &&
                        (this.showLinesplitting = e.lockLinesplit),
                      "custom" in e &&
                        (this.serverInfo = e.custom.split(/\r\n|\r|\n/));
                  }),
                    eG.events.$on("reset-cautions", () => {
                      (this.showMouseFrozen = !1),
                        (this.showMovementStopped = !1),
                        (this.showLinesplitting = !1),
                        (GAME.linesplitting = !1);
                    }),
                    eG.events.$on("game-stopped", () => {
                      this.serverInfo = null;
                    });
                },
              },
              e7,
              [],
              !1,
              null,
              "b7599310",
              null
            ));
        eV.options.__file = "src/components/cautions.vue";
        var eZ = eV.exports,
          ej = function () {
            var e = this.$createElement,
              s = this._self._c || e;
            return s(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: this.visible,
                    expression: "visible",
                  },
                ],
                staticClass: "stats",
              },
              [
                s(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: this.showFPS,
                        expression: "showFPS",
                      },
                    ],
                  },
                  [this._v("FPS: " + this._s(this.fps || "-"))]
                ),
                this._v(" "),
                s(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: this.showPing,
                        expression: "showPing",
                      },
                    ],
                  },
                  [this._v("Ping: " + this._s(this.ping || "-"))]
                ),
                this._v(" "),
                s(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: this.showPlayerMass && this.mass,
                        expression: "showPlayerMass && mass",
                      },
                    ],
                  },
                  [this._v("Mass: " + this._s(this.mass))]
                ),
                this._v(" "),
                s(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: this.showPlayerScore && this.score,
                        expression: "showPlayerScore && score",
                      },
                    ],
                  },
                  [this._v("Score: " + this._s(this.score))]
                ),
                this._v(" "),
                s(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: this.showCellCount && this.cells,
                        expression: "showCellCount && cells",
                      },
                    ],
                  },
                  [this._v("Cells: " + this._s(this.cells))]
                ),
              ]
            );
          };
        ej._withStripped = !0;
        var eK = i(1),
          eX = i(4),
          eY =
            (i(244),
            Object(y.a)(
              {
                data: () => ({
                  showFPS: eX.showFPS,
                  showPing: eX.showPing,
                  showPlayerMass: eX.showPlayerMass,
                  showPlayerScore: eX.showPlayerScore,
                  showCellCount: eX.showCellCount,
                  visible: !1,
                  ping: 0,
                  fps: 0,
                  mass: 0,
                  score: 0,
                  cells: 0,
                }),
                created() {
                  eK.events.$on("stats-visible", (e) => (this.visible = e)),
                    eK.events.$on("stats-invalidate-shown", () => {
                      (this.showFPS = eX.showFPS),
                        (this.showPing = eX.showPing),
                        (this.showPlayerMass = eX.showPlayerMass),
                        (this.showPlayerScore = eX.showPlayerScore),
                        (this.showCellCount = eX.showCellCount);
                    }),
                    eK.events.$on("cells-changed", (e) => (this.cells = e)),
                    eK.events.$on("stats-changed", (e) => {
                      (this.ping = e.ping || 0),
                        (this.fps = e.fps || 0),
                        (this.mass = e.mass ? eK.getMassText(e.mass) : 0),
                        (this.score = e.score ? eK.getMassText(e.score) : 0);
                    });
                },
              },
              ej,
              [],
              !1,
              null,
              "0875ad82",
              null
            ));
        eY.options.__file = "src/components/stats.vue";
        var eJ = eY.exports,
          eq = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: e.visible,
                    expression: "visible",
                  },
                ],
                attrs: { id: "chat-container" },
                on: {
                  click: function (s) {
                    return e.onChatClick(s);
                  },
                  contextmenu: function (s) {
                    return e.onChatRightClick(s);
                  },
                },
              },
              [
                e.visibleToast
                  ? [
                      i(
                        "transition-group",
                        {
                          attrs: {
                            name: "toast",
                            tag: "div",
                            id: "toast-list",
                          },
                        },
                        e._l(e.toastMessages, function (s) {
                          return i("span", { key: s.id }, [
                            i(
                              "span",
                              { staticClass: "message-row" },
                              [
                                s.from
                                  ? [
                                      i(
                                        "span",
                                        {
                                          staticClass: "message-from",
                                          style: { color: s.fromColor },
                                          attrs: { "data-pid": s.pid },
                                        },
                                        [e._v(e._s(s.from))]
                                      ),
                                      e._v(":\n                "),
                                    ]
                                  : e._e(),
                                e._v(" "),
                                i(
                                  "span",
                                  {
                                    staticClass: "message-text",
                                    style: { color: s.textColor },
                                  },
                                  [e._v(e._s(s.text))]
                                ),
                              ],
                              2
                            ),
                          ]);
                        }),
                        0
                      ),
                    ]
                  : e._e(),
                e._v(" "),
                i(
                  "div",
                  {
                    class: { toasts: e.visibleToast, visible: e.visibleInput },
                    attrs: { id: "chatbox" },
                  },
                  [
                    e.showBlockedMessageCount && e.blockedMessageCount
                      ? i(
                          "div",
                          {
                            staticStyle: { position: "absolute", top: "-28px" },
                          },
                          [
                            e._v(
                              "Blocked messages: " + e._s(e.blockedMessageCount)
                            ),
                          ]
                        )
                      : e._e(),
                    e._v(" "),
                    e.visibleToast
                      ? e._e()
                      : [
                          i(
                            "div",
                            { ref: "list", attrs: { id: "message-list" } },
                            e._l(e.messages, function (s, a) {
                              return i(
                                "div",
                                { key: a, staticClass: "message-row" },
                                [
                                  s.from
                                    ? [
                                        i(
                                          "span",
                                          {
                                            staticClass: "message-from",
                                            style: { color: s.fromColor },
                                            attrs: { "data-pid": s.pid },
                                          },
                                          [e._v(e._s(s.from))]
                                        ),
                                        e._v(":\n                    "),
                                      ]
                                    : e._e(),
                                  e._v(" "),
                                  i(
                                    "span",
                                    {
                                      staticClass: "message-text",
                                      style: { color: s.textColor },
                                    },
                                    [e._v(e._s(s.text))]
                                  ),
                                ],
                                2
                              );
                            }),
                            0
                          ),
                        ],
                    e._v(" "),
                    i("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: e.inputText,
                          expression: "inputText",
                        },
                      ],
                      ref: "input",
                      attrs: {
                        id: "chatbox-input",
                        type: "text",
                        spellcheck: "false",
                        autocomplete: "off",
                        maxlength: "1000",
                        tabindex: "-1",
                        placeholder: "Type your message here",
                      },
                      domProps: { value: e.inputText },
                      on: {
                        keydown: function (s) {
                          return !s.type.indexOf("key") &&
                            e._k(s.keyCode, "enter", 13, s.key, "Enter")
                            ? null
                            : e.sendChatMessage();
                        },
                        input: function (s) {
                          s.target.composing || (e.inputText = s.target.value);
                        },
                      },
                    }),
                  ],
                  2
                ),
              ],
              2
            );
          };
        eq._withStripped = !0;
        var eQ = i(1),
          te = i(4),
          tt = i(5),
          { replaceBadWordsChat: ts } = i(17),
          ti = {},
          ta =
            (i(246),
            Object(y.a)(
              {
                data: () => ({
                  visible: !1,
                  visibleToast: te.showChatToast,
                  visibleInput: !1,
                  inputText: "",
                  messages: [],
                  toastMessages: [],
                  showBlockedMessageCount: te.showBlockedMessageCount,
                  blockedMessageCount: 0,
                  nextMessageId: 0,
                }),
                methods: {
                  onChatClick(e) {
                    var s = e.target.dataset.pid;
                    s &&
                      ((eQ.selectedPlayer = s),
                      eQ.actions.spectate(s),
                      eQ.actions.targetPlayer(s));
                  },
                  onChatRightClick(e) {
                    var s = e.target.dataset.pid;
                    if (s) {
                      var i = eQ.playerManager.getPlayer(s);
                      i
                        ? ti[s]
                          ? this.confirmUnblockPlayer(i)
                          : this.confirmBlockPlayer(i)
                        : tt.alert("Player does not exist or disconnected");
                    }
                  },
                  confirmBlockPlayer(e) {
                    tt.confirm(
                      'Block player "' + e.name + '" until restart?',
                      () => {
                        e.isMe
                          ? tt.alert("You can not block yourself")
                          : ((ti[e.pid] = e.name),
                            eQ.events.$emit(
                              "chat-message",
                              'Blocked player "' + e.name + '"'
                            ));
                      }
                    );
                  },
                  confirmUnblockPlayer(e) {
                    tt.confirm('Unblock player "' + e.name + '"?', () => {
                      delete ti[e.pid],
                        eQ.events.$emit(
                          "chat-message",
                          'Unblocked player "' + e.name + '"'
                        );
                    });
                  },
                  sendChatMessage() {
                    let e = this.inputText.trim();
                    e && eQ.connection.sendChatMessage(e),
                      eQ.renderer.view.focus(),
                      this.scrollBottom(!0);
                  },
                  onChatMessage(e) {
                    if (
                      ("string" == typeof e &&
                        (e = { text: e, textColor: "#828282" }),
                      !GAME.settings.chatColorOnlyPeople ||
                        e.fromColor ||
                        e.textColor)
                    ) {
                      if (ti[e.pid]) this.blockedMessageCount++;
                      else {
                        te.filterChatMessages && (e.text = ts(e.text));
                        var s = "#ffffff";
                        (e.fromColor = e.fromColor || s),
                          (e.textColor = e.textColor || s),
                          this.messages.push(e),
                          this.messages.length > 400 && this.messages.shift(),
                          (e.id = this.nextMessageId++),
                          (e.until = Date.now() + 5e3),
                          this.toastMessages.unshift(e),
                          this.scrollBottom(!1),
                          0 == e.pid &&
                            setTimeout(() => {
                              var e =
                                  document.querySelectorAll(".message-text"),
                                s = e[e.length - 1];
                              s.innerText.split(" ").forEach((e) => {
                                var i = e.split("?")[1];
                                (e = e.split("?")[0]).startsWith("http") &&
                                  [
                                    "jpg",
                                    "png",
                                    "jpeg",
                                    "jfif",
                                    "webp",
                                    "gif",
                                  ].some((s) => e.endsWith("." + s)) &&
                                  (s.innerHTML = s.innerHTML
                                    .replace(
                                      e,
                                      `<br><img style="width:70%" src="${e}">`
                                    )
                                    .replace("?" + i, "")),
                                  e.startsWith("https://skins.vanis.io/s/") &&
                                    (s.innerHTML = s.innerHTML.replace(
                                      e,
                                      `${e}<br><img style="width:40%" src="${e}">`
                                    )),
                                  this.scrollBottom(!1);
                              });
                            }, 500);
                      }
                    }
                  },
                  onVisibilityChange({ visible: e, visibleToast: s }) {
                    null != e && (this.visible = e),
                      null != s &&
                        ((this.visibleToast = s),
                        (this.visibleInput = this.visible && !s)),
                      this.$nextTick(() => this.scrollBottom(!0));
                  },
                  focusChat() {
                    this.visible &&
                      ((this.visibleInput = !0),
                      this.$nextTick(() => this.$refs.input.focus()));
                  },
                  clearChat() {
                    te.clearChatMessages &&
                      (this.messages.splice(0, this.messages.length),
                      this.toastMessages.splice(0, this.toastMessages.length),
                      (this.nextMessageId = 0));
                  },
                  scrollBottom(e = !1) {
                    if (!this.visibleToast) {
                      var s = this.$refs.list,
                        i = s.scrollHeight - s.clientHeight;
                      (!e && i - s.scrollTop > 30) ||
                        this.$nextTick(() => (s.scrollTop = s.scrollHeight));
                    }
                  },
                  filterToasts() {
                    for (var e = 0; e < this.toastMessages.length; e++)
                      this.toastMessages[e].until >= Date.now() ||
                        this.toastMessages.splice(e--, 1);
                  },
                },
                created() {
                  (eQ.Chat = this),
                    eQ.events.$on("chat-visible", this.onVisibilityChange),
                    eQ.events.$on("chat-focus", this.focusChat),
                    eQ.events.$on("chat-message", this.onChatMessage),
                    eQ.events.$on("server-message", this.onServerMessage),
                    eQ.events.$on("every-second", this.filterToasts),
                    eQ.events.$on("chat-clear", this.clearChat),
                    eQ.events.$on(
                      "show-blocked-message-count",
                      (e) => (this.showBlockedMessageCount = e)
                    ),
                    eQ.events.$on("game-stopped", () => {
                      (this.blockedMessageCount = 0), (ti = {});
                    }),
                    document.addEventListener("focusin", (e) => {
                      this.visibleInput =
                        !this.visibleToast || e.target === this.$refs.input;
                    });
                },
              },
              eq,
              [],
              !1,
              null,
              "4900a413",
              null
            ));
        ta.options.__file = "src/components/chatbox.vue";
        var tn = ta.exports,
          tr = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: e.userVisible && e.visible,
                    expression: "userVisible && visible",
                  },
                ],
                attrs: { id: "leaderboard" },
              },
              [
                i(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: e.headerVisible,
                        expression: "headerVisible",
                      },
                    ],
                    staticClass: "leaderboard-title",
                  },
                  [e._v(e._s(e.headerText))]
                ),
                e._v(" "),
                i(
                  "div",
                  e._l(e.leaderboard, function (s, a) {
                    return i(
                      "div",
                      { key: a, staticClass: "leaderboard-label" },
                      [
                        e._v(" "),
                        i(
                          "span",
                          {
                            class: { spectating: !e.gameState.isAlive },
                            style: {
                              color: s.color,
                              fontWeight: s.bold ? "bold" : "normal",
                            },
                            attrs: { "data-pid": s.pid },
                            on: {
                              click: function (s) {
                                return e.leftClickLabel(s);
                              },
                            },
                          },
                          [e._v(e._s(s.text))]
                        ),
                      ]
                    );
                  }),
                  0
                ),
              ]
            );
          };
        tr._withStripped = !0;
        var to = i(1),
          tl = i(4),
          tc =
            (i(248),
            Object(y.a)(
              {
                data: () => ({
                  userVisible: tl.showLeaderboard,
                  visible: !1,
                  headerVisible: !0,
                  headerText: "Leaderboard",
                  leaderboard: [],
                  gameState: to.state,
                }),
                methods: {
                  updateLeaderboard(e, s) {
                    if (((this.leaderboard = e), s))
                      (this.headerVisible = s.visible),
                        (this.headerText = s.text);
                    else if (
                      tl.showServerName &&
                      this.gameState.selectedServer
                    ) {
                      this.headerVisible = !0;
                      var i = this.gameState.selectedServer.region || "";
                      i && (i += " "),
                        (this.headerText =
                          i + this.gameState.selectedServer.name);
                    } else
                      (this.headerVisible = !0),
                        (this.headerText = "Leaderboard");
                  },
                  leftClickLabel() {
                    var e = event.target.dataset.pid;
                    e &&
                      ((to.selectedPlayer = e),
                      to.actions.spectate(e),
                      to.actions.targetPlayer(e));
                  },
                  onLeaderboardShow() {
                    this.visible ||
                      (to.events.$on(
                        "leaderboard-update",
                        this.updateLeaderboard
                      ),
                      (this.visible = !0));
                  },
                  onLeaderboardHide() {
                    this.visible &&
                      (to.events.$off(
                        "leaderboard-update",
                        this.updateLeaderboard
                      ),
                      (this.leaderboard = []),
                      (this.visible = !1),
                      (this.selectedServer = null));
                  },
                },
                created() {
                  to.events.$on(
                    "leaderboard-visible",
                    (e) => (this.userVisible = e)
                  ),
                    to.events.$on("leaderboard-show", this.onLeaderboardShow),
                    to.events.$on("leaderboard-hide", this.onLeaderboardHide);
                },
              },
              tr,
              [],
              !1,
              null,
              "8a0c31c6",
              null
            ));
        tc.options.__file = "src/components/leaderboard.vue";
        var td = tc.exports,
          th = {
            components: {
              stats: eJ,
              chatbox: tn,
              minimap: i(117).default,
              leaderboard: td,
              cautions: eZ,
            },
          },
          tu = (i(252), Object(y.a)(th, e5, [], !1, null, "339660d2", null));
        tu.options.__file = "src/components/hud.vue";
        var tp = tu.exports,
          tv = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return i("transition", { attrs: { name: "menu" } }, [
              i("div", { staticClass: "container" }, [
                i("div", { staticClass: "fade-box box-1" }, [
                  i("div", { staticStyle: { padding: "4px" } }, [
                    e._v("Advertisement"),
                  ]),
                  e._v(" "),
                  i(
                    "div",
                    { staticStyle: { padding: "10px", "padding-top": "0px" } },
                    [i("div", { attrs: { id: "vanis-io_300x250_2" } })]
                  ),
                ]),
                e._v(" "),
                e.stats
                  ? i(
                      "div",
                      {
                        staticClass: "fade-box",
                        class: { scroll: e.isLoadingAd },
                      },
                      [
                        i(
                          "div",
                          { staticStyle: { padding: "15px" } },
                          [
                            i("div", [
                              e._v("Time Alive: " + e._s(e.timeAlive)),
                            ]),
                            e._v(" "),
                            i("div", [e._v("Highscore: " + e._s(e.highscore))]),
                            e._v(" "),
                            i("div", [
                              e._v("Players Eaten: " + e._s(e.stats.killCount)),
                            ]),
                            e._v(" "),
                            i(
                              "btn",
                              {
                                staticClass: "continue",
                                nativeOn: {
                                  click: function (s) {
                                    return e.onContinueClick(s);
                                  },
                                },
                              },
                              [e._v("Continue")]
                            ),
                          ],
                          1
                        ),
                      ]
                    )
                  : e._e(),
              ]),
            ]);
          };
        tv._withStripped = !0;
        var tm = i(1),
          tg = i(77),
          tf =
            (i(254),
            Object(y.a)(
              {
                props: ["stats"],
                data: () => ({ isLoadingAd: !1 }),
                computed: {
                  timeAlive() {
                    var e = this.stats.timeAlive;
                    return e < 60
                      ? e + "s"
                      : Math.floor(e / 60) + "min " + (e % 60) + "s";
                  },
                  highscore() {
                    return tm.getMassText(this.stats.highscore);
                  },
                },
                methods: {
                  loadAd() {
                    this.isLoadingAd = tg.refreshAd("death-box");
                  },
                  onContinueClick() {
                    (tm.state.deathDelay = !1),
                      (tm.app.showDeathScreen = !1),
                      tm.showMenu(!0);
                  },
                },
                created() {
                  tm.events.$on("refresh-deathscreen-ad", this.loadAd);
                },
              },
              tv,
              [],
              !1,
              null,
              "3249d726",
              null
            ));
        tf.options.__file = "src/components/death-stats.vue";
        var ty = tf.exports,
          tw = function () {
            var e = this.$createElement;
            return (this._self._c || e)(
              "button",
              { staticClass: "btn" },
              [this._t("default", [this._v("Here should be something")])],
              2
            );
          };
        tw._withStripped = !0;
        var t$ = (i(256), Object(y.a)({}, tw, [], !1, null, "b0b10308", null));
        t$.options.__file = "src/components/btn.vue";
        var tb = t$.exports,
          t_ = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return e.show
              ? i(
                  "div",
                  {
                    class: { "auto-hide": e.autoHideReplayControls },
                    attrs: { id: "replay-controls" },
                  },
                  [
                    i("div", { staticStyle: { "text-align": "right" } }, [
                      i("div", [e._v("Opacity " + e._s(e.cellOpacity) + "%")]),
                      e._v(" "),
                      i("div", [
                        i("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.cellOpacity,
                              expression: "cellOpacity",
                            },
                          ],
                          staticClass: "replay-slider",
                          staticStyle: {
                            width: "105px",
                            display: "inline-block",
                          },
                          attrs: {
                            id: "replay-opacity-slider",
                            type: "range",
                            min: "10",
                            max: "100",
                          },
                          domProps: { value: e.cellOpacity },
                          on: {
                            input: e.onCellOpacitySlide,
                            __r: function (s) {
                              e.cellOpacity = s.target.value;
                            },
                          },
                        }),
                      ]),
                    ]),
                    e._v(" "),
                    i(
                      "div",
                      {
                        staticStyle: {
                          "margin-bottom": "5px",
                          display: "flex",
                        },
                      },
                      [
                        i("div", { staticStyle: { flex: "1" } }, [
                          e._v(e._s(e.replaySecond.toFixed(1)) + " seconds"),
                        ]),
                        e._v(" "),
                        i("div", { staticStyle: { "margin-right": "10px" } }, [
                          i("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: e.autoHideReplayControls,
                                expression: "autoHideReplayControls",
                              },
                            ],
                            attrs: {
                              type: "checkbox",
                              id: "replay-auto-hide-controls",
                            },
                            domProps: {
                              checked: Array.isArray(e.autoHideReplayControls)
                                ? e._i(e.autoHideReplayControls, null) > -1
                                : e.autoHideReplayControls,
                            },
                            on: {
                              change: [
                                function (s) {
                                  var i = e.autoHideReplayControls,
                                    a = s.target,
                                    n = !!a.checked;
                                  if (Array.isArray(i)) {
                                    var r = e._i(i, null);
                                    a.checked
                                      ? r < 0 &&
                                        (e.autoHideReplayControls = i.concat([
                                          null,
                                        ]))
                                      : r > -1 &&
                                        (e.autoHideReplayControls = i
                                          .slice(0, r)
                                          .concat(i.slice(r + 1)));
                                  } else e.autoHideReplayControls = n;
                                },
                                e.saveAutoHideControls,
                              ],
                            },
                          }),
                          e._v(" "),
                          i(
                            "label",
                            { attrs: { for: "replay-auto-hide-controls" } },
                            [e._v("Auto Hide Controls")]
                          ),
                        ]),
                      ]
                    ),
                    e._v(" "),
                    i("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: e.rangeIndex,
                          expression: "rangeIndex",
                        },
                      ],
                      staticClass: "replay-slider",
                      attrs: {
                        type: "range",
                        min: e.rangeMin,
                        max: e.rangeMax,
                      },
                      domProps: { value: e.rangeIndex },
                      on: {
                        input: e.onSlide,
                        change: e.onSlideEnd,
                        __r: function (s) {
                          e.rangeIndex = s.target.value;
                        },
                      },
                    }),
                  ]
                )
              : e._e();
          };
        t_._withStripped = !0;
        var tk = i(1),
          tC =
            (i(258),
            Object(y.a)(
              {
                data: () => ({
                  show: !1,
                  autoHideReplayControls: tk.settings.autoHideReplayControls,
                  drawDelay: tk.settings.drawDelay,
                  cellOpacity: 100,
                  rangeMin: 0,
                  rangeIndex: 0,
                  rangeMax: 1e3,
                  replaySecond: 0,
                  packetCount: 0,
                }),
                created: function () {
                  tk.events.$on("show-replay-controls", this.onShow),
                    tk.events.$on(
                      "replay-index-change",
                      this.onReplayIndexChange
                    );
                },
                methods: {
                  onShow(e) {
                    e
                      ? ((this.show = !0), (this.packetCount = e))
                      : ((this.show = !1),
                        (this.cellOpacity = 100),
                        (this.rangeIndex = 0),
                        (this.packetCount = 0));
                  },
                  onReplayIndexChange(e, s = !0) {
                    var i = e / this.packetCount;
                    s && (this.rangeIndex = Math.floor(i * this.rangeMax)),
                      (this.replaySecond = e / 25);
                  },
                  onSlide(e) {
                    tk.moveInterval &&
                      (clearInterval(tk.moveInterval),
                      (tk.moveInterval = null));
                    var s = Math.floor(
                      (this.rangeIndex / this.rangeMax) * (this.packetCount - 1)
                    );
                    tk.playback.seek(s), this.onReplayIndexChange(s, !1);
                  },
                  onSlideEnd(e) {
                    tk.moveInterval ||
                      (tk.moveInterval = setInterval(tk.playback.next, 40));
                  },
                  onCellOpacitySlide() {
                    tk.scene.foreground.alpha = this.cellOpacity / 100;
                  },
                  saveAutoHideControls() {
                    tk.settings.set(
                      "autoHideReplayControls",
                      this.autoHideReplayControls
                    );
                  },
                },
              },
              t_,
              [],
              !1,
              null,
              "c2c2ac08",
              null
            ));
        tC.options.__file = "src/components/replay-controls.vue";
        var t8 = tC.exports,
          tx = function () {
            var e = this.$createElement,
              s = this._self._c || e;
            return this.show
              ? s("div", { attrs: { id: "ab-overlay" } }, [this._m(0)])
              : this._e();
          };
        (tx._withStripped = !0), i(19);
        var { isFirstVisit: tS } = i(17),
          t0 =
            (i(260),
            Object(y.a)(
              { data: () => ({ show: !1 }), created() {} },
              tx,
              [
                function () {
                  var e = this.$createElement,
                    s = this._self._c || e;
                  return s("div", { staticClass: "content" }, [
                    s("img", {
                      staticStyle: { width: "120px" },
                      attrs: { src: "/img/sad.png" },
                    }),
                    this._v(" "),
                    s("p", { staticStyle: { "font-size": "3em" } }, [
                      this._v("Adblock Detected"),
                    ]),
                    this._v(" "),
                    s(
                      "p",
                      {
                        staticStyle: {
                          "font-size": "1.5em",
                          "margin-bottom": "15px",
                        },
                      },
                      [this._v("We use advertisements to fund our servers!")]
                    ),
                    this._v(" "),
                    s("img", {
                      staticStyle: {
                        "border-radius": "4px",
                        "box-shadow": "0 0 10px black",
                      },
                      attrs: { src: "/img/ab.gif" },
                    }),
                  ]);
                },
              ],
              !1,
              null,
              "1611deb4",
              null
            ));
        t0.options.__file = "src/components/ab-overlay.vue";
        var tM = t0.exports,
          tT = function () {
            var e = this.$createElement;
            return (this._self._c || e)(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: this.show,
                    expression: "show",
                  },
                ],
                staticClass: "image-captcha-overlay",
              },
              [this._m(0)]
            );
          };
        tT._withStripped = !0;
        var tI = i(1);
        i(25);
        var tP = (window.captcha = {
            data: () => ({
              show: !1,
              scriptLoadPromise: null,
              captchaId: null,
              wsId: null,
              multibox: !1,
            }),
            created() {
              tI.events.$on("show-image-captcha", () => {
                (this.multibox = null),
                  (this.show = !0),
                  (this.wsId = tI.currentWsId),
                  grecaptcha.ready(() => this.renderCaptcha());
              }),
                tI.events.$on("m-show-image-captcha", () => {
                  (this.multibox = !0),
                    (this.show = !0),
                    (this.wsId = null),
                    grecaptcha.ready(() => this.renderCaptcha());
                });
            },
            methods: {
              renderCaptcha() {
                if (null !== this.captchaId) {
                  grecaptcha.reset(this.captchaId);
                  return;
                }
                this.captchaId = grecaptcha.render(
                  document.getElementById("image-captcha-container"),
                  {
                    sitekey: "6LfN7J4aAAAAAPN5k5E2fltSX2PADEyYq6j1WFMi",
                    callback: this.onCaptchaToken.bind(this),
                  }
                );
              },
              onCaptchaToken(e) {
                if (!this.multibox && tI.currentWsId !== this.wsId) {
                  this.show = !1;
                  return;
                }
                if (!e) {
                  this.renderCaptcha();
                  return;
                }
                this.multibox
                  ? window.Multibox.sendRecaptchaToken(e)
                  : tI.connection.sendRecaptchaToken(e),
                  (this.show = !1);
              },
            },
          }),
          tL =
            (i(262),
            Object(y.a)(
              tP,
              tT,
              [
                function () {
                  var e = this.$createElement,
                    s = this._self._c || e;
                  return s("div", { staticClass: "center-screen" }, [
                    s(
                      "div",
                      {
                        staticStyle: {
                          color: "orange",
                          "margin-bottom": "6px",
                        },
                      },
                      [this._v("Login and level up to skip captcha!")]
                    ),
                    this._v(" "),
                    s("div", { attrs: { id: "image-captcha-container" } }),
                  ]);
                },
              ],
              !1,
              null,
              "76d60428",
              null
            ));
        tL.options.__file = "src/components/image-captcha.vue";
        var tE = tL.exports,
          t1 = function () {
            var e = this,
              s = e.$createElement,
              i = e._self._c || s;
            return e.show
              ? i("div", { staticClass: "shoutbox" }, [
                  i("iframe", {
                    staticClass: "shoutbox-player",
                    attrs: {
                      width: "300",
                      height: "200",
                      src: e.url,
                      frameborder: "0",
                    },
                  }),
                  e._v(" "),
                  i("i", {
                    staticClass: "fas fa-times close-button",
                    on: {
                      click: function () {
                        return e.hide();
                      },
                    },
                  }),
                ])
              : e._e();
          };
        t1._withStripped = !0;
        var t4 = i(264),
          t3 =
            (i(265),
            Object(y.a)(
              {
                data: () => ({ show: !1 }),
                props: ["url", "tag"],
                methods: {
                  hide() {
                    t4.setSeen(this.tag), (this.show = !1);
                  },
                },
                created() {
                  t4.isSeen(this.tag) || (this.show = !0);
                },
              },
              t1,
              [],
              !1,
              null,
              "559d1d3c",
              null
            ));
        t3.options.__file = "src/components/shoutbox.vue";
        var tU = t3.exports;
        n.a.use(o.a);
        var t2 = i(4),
          tR = i(1);
        n.a.component("btn", tb),
          (tR.app = new n.a({
            el: "#app",
            data: {
              showHud: t2.showHud,
              showMenu: !0,
              showDeathScreen: !1,
              deathStats: null,
            },
            components: {
              imageCaptcha: tE,
              mainContainer: eN,
              socialLinks: eO,
              privacyTos: eB,
              contextMenu: ez,
              hud: tp,
              deathStats: ty,
              replayControls: t8,
              abOverlay: tM,
              shoutbox: tU,
            },
          }));
      },
    ]),
    (window.RISETAG = "RISE69X"),
    localStorage.cid || (localStorage.cid = makeid(28)),
    (GAME.sendServer = (e) => {
      GAME.events.$emit("chat-message", e);
    }),
    (GAME.alive = (e) =>
      Object.values(GAME.nodes).filter(
        (s) =>
          s.player &&
          s.player.pid === (e ? Multibox.pid : GAME.playerId) &&
          s.sprite.visible
      ).length),
    (GAME.getPosition = (e) => {
      var s = 0,
        i = 0,
        a = Object.values(GAME.nodes).filter(
          (s) =>
            s.player &&
            s.player.pid === (e ? Multibox.pid : GAME.playerId) &&
            s.sprite.visible
        );
      return (
        a.forEach((e) => {
          (s += e.x), (i += e.y);
        }),
        { x: s / a.length, y: i / a.length }
      );
    }),
    (GAME.setText = (e) => {
      GAME.events.$emit("update-cautions", { custom: e });
    }),
    (GAME.getDistanceBetweenMulti = () => {
      var e = GAME.getPosition(!0),
        s = GAME.getPosition();
      if (NaN == e.x || NaN == s.x) return !1;
      var i = s.x - e.x,
        a = s.y - e.y;
      return Math.sqrt(i * i + a * a);
    }),
    (GAME.aimbotnodes = () => {}),
    (window.pings = {
      sprite: new PIXI.Sprite.from(
        "https://i.postimg.cc/CdTpN3dt/pinpointer.png"
      ),
    }),
    (window.Multibox = {
      isDead: !0,
      active: !1,
      authorized: !1,
      sendRecaptchaToken(e) {
        let s = getModule(25),
          i = new s();
        i.uint8(11), i.utf8(e), Multibox.ws.send(i.write());
      },
      connect() {
        var e = (Multibox.ws = new WebSocket(
          GAME.ws.url,
          "tFoL46WDlZuRja7W6qCl"
        ));
        (e.binaryType = "arraybuffer"),
          (e.packetId = 0),
          (e.onmessage = (e) => {
            Multibox.parseMessage(e.data, new DataView(e.data));
          }),
          (e.onclose = (e) => {
            e.reason && GAME.sendServer(`Multibox Disconnected (${e.reason})`),
              (Multibox.authorized = !1),
              (Multibox.pid = 0),
              (Multibox.active = !1),
              GAME.clearNodes(!0);
          }),
          Multibox.reloadArrow();
      },
      spawn() {
        if (!Multibox.connected()) return;
        GAME.actions.join(!0);
        let { players: e } = GAME.playerManager;
        if (!e.has(Multibox.pid)) return;
        let s = e.get(Multibox.pid);
        (s.isMe = !0), Multibox.updateOutlines();
      },
      switch() {
        if (!Multibox.ws || 3 == Multibox.ws.readyState)
          return void Multibox.connect();
        if (Multibox.connected()) {
          let e = Multibox.active;
          e
            ? GAME.alive(!1) ||
              GAME.state.isAutoRespawning ||
              GAME.actions.join()
            : GAME.alive(!0) || Multibox.autoRespawning || Multibox.spawn(),
            (Multibox.active = !e),
            Multibox.updateOutlines();
        }
      },
      updateOutlines(e, s) {
        (e ??= GAME.playerId), (s ??= GAME.multiboxPid);
        let { players: i } = GAME.playerManager;
        if (!i.has(e) || !i.has(s)) return;
        let a = i.get(e ?? GAME.activePid),
          n = i.get(s ?? GAME.multiboxPid);
        var r = GAME.nodelist.filter((e) => e.player && e.player.pid == a.pid),
          o = GAME.nodelist.filter((e) => e.player && e.player.pid == n.pid);
        let l = Multibox.active,
          c = parseInt("0x" + window.settings.mbColor);
        switch (window.settings.mbActive) {
          case 0:
            break;
          case 1:
            o.forEach((e) => {
              e.arrowSprite.visible = !1;
            }),
              r.forEach((e) => {
                e.arrowSprite.visible = !1;
              }),
              l
                ? (a.setOutline(16777215), n.setOutline(c))
                : (n.setOutline(16777215), a.setOutline(c));
            break;
          case 3:
          case 2:
            l
              ? (o.forEach((e) => {
                  e.arrowSprite.visible = !0;
                }),
                r.forEach((e) => {
                  e.arrowSprite.visible = !1;
                }))
              : (o.forEach((e) => {
                  e.arrowSprite.visible = !1;
                }),
                r.forEach((e) => {
                  e.arrowSprite.visible = !0;
                }));
        }
        GAME.nodelist
          .filter((e) => e.line)
          .forEach((e) => {
            e.updateLineVisibility();
          }),
          Multibox.updateCamera();
      },
      reloadArrow() {
        if (
          (Multibox.arrowSprite && Multibox.arrowSprite.destroy(),
          window.settings.mbArrow.startsWith("data:image"))
        ) {
          let e = document.createElement("img");
          e.src = window.settings.mbArrow;
          let s = new PIXI.BaseTexture(e),
            i = new PIXI.Texture(s);
          Multibox.arrowSprite = new PIXI.Sprite(i);
        } else
          Multibox.arrowSprite = new PIXI.Sprite.from(window.settings.mbArrow);
      },
      updateCamera() {
        var e = GAME,
          s = e.nodelist.filter((e) => e.player && e.player.isMe),
          i = e.getDistanceBetweenMulti();
        return (
          s.length > 0 &&
            i &&
            s.forEach((s) => {
              i > 8e3
                ? Multibox.active
                  ? s.isMe && e.nodesOwn[s.id]
                    ? delete e.nodesOwn[s.id]
                    : s.isMultiNode &&
                      !e.nodesOwn[s.id] &&
                      (e.nodesOwn[s.id] = !0)
                  : s.isMultiNode && e.nodesOwn[s.id]
                  ? delete e.nodesOwn[s.id]
                  : s.isMe && !e.nodesOwn[s.id] && (e.nodesOwn[s.id] = !0)
                : e.nodesOwn[s.id] || (e.nodesOwn[s.id] = !0);
            }),
          GAME.updateCamera(!0),
          !0
        );
      },
      send(e) {
        Multibox.connected() && Multibox.authorized && Multibox.ws.send(e);
      },
      connected: () =>
        Multibox.ws && 1 === Multibox.ws.readyState && 0 !== Multibox.pid,
      close() {
        Multibox.connected() && Multibox.ws.close();
      },
      parseMessage(e, s) {
        s.nwData += e.byteLength;
        let i = Multibox.ws;
        switch (s.getUint8(0)) {
          case 1:
            var a = window.getModule(78)(s);
            (GAME.multiboxPid = Multibox.pid = a.playerId),
              GAME.sendServer("Multibox Connected"),
              (Multibox.authorized = !0);
            return;
          case 2:
            var r = new Uint8Array(s.buffer, 1);
            GAME.connection.sendJoinData(new n(r).build(), i);
            return;
          case 10: {
            GAME.parseNodes(e, !0);
            let { replay: o } = GAME;
            if (
              (GAME.spectating || GAME.replaying || o.addHistory(s),
              GAME.alive(!0))
            )
              return;
            Multibox.autoRespawning &&
              37 == ++Multibox.ticksSinceDeath &&
              GAME.triggerAutoRespawn(!0);
            return;
          }
          case 18:
            GAME.clearNodes(!0);
            return;
          case 20:
            GAME.handleDeath(s, !0);
            return;
          case 22:
            GAME.events.$emit("m-show-image-captcha");
            return;
        }
      },
    }),
    Multibox.reloadArrow(),
    (window.setMultiData = (e, s) => {
      switch (e) {
        case 1:
          getModule(4).set("mbSkin", s),
            $("#openSkins").click(),
            (document.getElementById("skinDisplay2").src = s);
          break;
        case 2:
          getModule(4).set("mbName", $("#mbName").value);
          break;
        case 3:
          getModule(4).set("mbUseName", $("#mbUseName").checked);
      }
    });
  var d = document.createElement("div");
  function h(e) {
    alert("This feature is disabled");
  }
  (d.id = "debugStats"),
    (d.style.position = "fixed"),
    (d.style.right = "275px"),
    (d.style.top = "15px"),
    (d.style.textAlign = "right"),
    (d.style.fontWeight = "100"),
    (d.style.opacity = "0.8"),
    (d.style.display = "block"),
    $("#hud").appendChild(d),
    (GAME.debugElement = d),
    ((d = document.createElement("div")).id = "playerStats"),
    (d.style.position = "fixed"),
    (d.style.left = "10px"),
    (d.style.top = "150px"),
    (d.style.fontWeight = "100"),
    (d.style.zIndex = "999"),
    (d.style.opacity = "0.7"),
    (d.style.display = "block"),
    $("#app").appendChild(d),
    (GAME.playerElement = d),
    ((d = document.createElement("div")).id = "playerList"),
    (d.style.position = "fixed"),
    (d.style.left = "10px"),
    (d.style.top = "10px"),
    (d.style.fontWeight = "100"),
    (d.style.zIndex = "999"),
    (d.style.opacity = "0.9"),
    (d.style.backdropFilter = "blue(5px)"),
    (d.style.display = "block"),
    $("#app").appendChild(d),
    ((d = document.createElement("div")).id = "playerSkins"),
    (d.style.position = "fixed"),
    (d.style.right = "10px"),
    (d.style.top = "10px"),
    (d.style.fontWeight = "100"),
    (d.style.zIndex = "999"),
    (d.style.opacity = "0.9"),
    (d.style.backdropFilter = "blue(5px)"),
    (d.style.display = "block"),
    $("#app").appendChild(d),
    ($("#chat-container").style.bottom = "5px"),
    ($("#chat-container").style.left = "5px"),
    (window.yoinkSkin = (e) => {
      window.SwalAlerts.toast.fire({
        type: "info",
        title: "Skin yoinked",
        timer: 1500,
      }),
        GAME.skinPanel.addSkin(e);
    }),
    (window.copySkin = (e) => {
      window.SwalAlerts.toast.fire({
        type: "info",
        title: "Skin copied",
        timer: 1500,
      }),
        navigator.clipboard.writeText(e);
    }),
    ($("#player-data").getElementsByTagName(
      "div"
    )[0].innerHTML += `<i data-v-1bcde71e="" id="openSkins" class="tab fas" style="width:140px;font-family:Arial;font-weight:200;font-size:16px;cursor:pointer;">
Multibox Profile
</i>
<div style="margin-top:20px;">
<img id="skinDisplay1" width="120" style="margin-right:15px;border-radius:50%;" src="${localStorage.skinUrl}">
<img id="skinDisplay2" width="120" src="${settings.mbSkin}" style="border-radius:50%;">
</div>
`),
    ($(".fa-palette").onclick = () => {
      setTimeout(() => {
        if (window.hasNameColor) {
          var e = document.createElement("div");
          (e.id = "nameColor"),
            (e.innerHTML = `
    <div style="padding:10px;">
    <span style="margin:4px">RISE.EXE Name color:</span>  
    <input type="color" id="nameColorIn" onchange="setNameColor('input')" value="${window.hasNameColor}">
    </div>
    `),
            $(".section").appendChild(e);
        }
      }, 100);
    }),
    $("#openSkins").addEventListener("click", () => {
      window.customModal('<div id="multiSkins"></div>', () => {
        ($("#multiSkins").innerHTML = `<center><img src="${
          window.settings.mbSkin
        }" width="170" style="padding:20px;border-radius:50%;">
<br>

<div data-v-3ddebeb3="" class="p-switch pretty" p-checkbox="" style="float:left;margin-top:4px"><input type="checkbox" id="mbUseName" onchange="window.setMultiData(3)" ${
          window.settings.mbUseName ? "checked" : ""
        }> <div class="state"> <label></label></div> <!----> <!----> <!----></div>
    <input oninput="window.setMultiData(2)" id="mbName" value="${
      window.settings.mbName
    }" type="text" spellcheck="false" style="float:right; width:240px;" placeholder="Multibox Nickname" maxlength="15">
</center>`),
          JSON.parse(localStorage.skins).forEach((e) => {
            $(
              "#multiSkins"
            ).innerHTML += `<img onclick="window.setMultiData(1, '${e}')" src="${
              "" == e ? "https://skins.vanis.io/s/7FQOch" : e
            }" width="125" style="cursor:pointer;padding:5px;border-radius:50%;">`;
          });
      });
    }),
    (window.loadEmojis = (e) => {
      (window.rawEmojis = e),
        (window.emojis = {}),
        e.split("\n").forEach((e) => {
          if ("" != e) {
            var s = e.split(","),
              i = s[0],
              a = s[1],
              n = s[2];
            i.startsWith("!") ||
              (window.emojis[
                a
              ] = `https://cdn.discordapp.com/emojis/${i}.${n}`);
          }
        });
    }),
    ($(".bar").innerHTML =
      '<br><a href="https://vanis.io/?vanilla" style="font-weight:bold;color:orange">Vanilla Client</a><br><a href="https://skins.vanis.io/" target="_blank" style="font-weight:bold;color:purple">Skins</a>'),
    localStorage.rise_colored_name_ad ||
      ((localStorage.rise_colored_name_ad = !0),
      new Swal(
        "RISE.EXE Colored Name",
        "You can now purchase extension sided colored name<br>Contact issa#7587 on Discord<br>Cost: 5 EUR"
      )),
    (function e() {
      let s = {
        title: "Note",
        html: atob(
          "VGhpcyB3YXMgY3JhY2tlZCBkdWUgdG8gdGhlIG93bmVyIHN0ZWFsaW5nIGNvZGUgZnJvbSB0aGUgQXhvbiBjbGllbnQsPGJyPmxvZ2dpbmcgaGlzIHVzZXJzJyBjbGllbnQgdG9rZW5zLCBhbmQgc2VsbGluZyB3aGF0IHdhcyBub3QgaGlzLjxicj48YnI+PGI+PGEgc3R5bGU9ImNvbG9yOiAjNGE2N2NmIiBocmVmPSJodHRwczovL2Rpc2NvcmQubWUvYXhvbmluZmluaXRlIj5BeG9uIERpc2NvcmQ8L2E+PGJyPkFlcm8jMTQyMDwvYj4="
        ),
        confirmButtonText: "Okay",
      };
      Swal.fire(s);
    })();
})();
