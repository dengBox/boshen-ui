function At(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function Ie(e) {
  if (_(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = $(s) ? Ht(s) : Ie(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else {
    if ($(e))
      return e;
    if (x(e))
      return e;
  }
}
const jt = /;(?![^(]*\))/g, Kt = /:(.+)/;
function Ht(e) {
  const t = {};
  return e.split(jt).forEach((n) => {
    if (n) {
      const s = n.split(Kt);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function $e(e) {
  let t = "";
  if ($(e))
    t = e;
  else if (_(e))
    for (let n = 0; n < e.length; n++) {
      const s = $e(e[n]);
      s && (t += s + " ");
    }
  else if (x(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const D = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const st = () => {
}, Wt = () => !1, Ut = /^on[^a-z]/, Bt = (e) => Ut.test(e), I = Object.assign, Jt = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, qt = Object.prototype.hasOwnProperty, h = (e, t) => qt.call(e, t), _ = Array.isArray, L = (e) => ge(e) === "[object Map]", Gt = (e) => ge(e) === "[object Set]", N = (e) => typeof e == "function", $ = (e) => typeof e == "string", Te = (e) => typeof e == "symbol", x = (e) => e !== null && typeof e == "object", Lt = (e) => x(e) && N(e.then) && N(e.catch), Yt = Object.prototype.toString, ge = (e) => Yt.call(e), ot = (e) => ge(e).slice(8, -1), Qt = (e) => ge(e) === "[object Object]", Ce = (e) => $(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Xt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Zt = Xt((e) => e.charAt(0).toUpperCase() + e.slice(1)), ue = (e, t) => !Object.is(e, t), kt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Ue;
const en = () => Ue || (Ue = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Be(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let tn;
function nn(e, t = tn) {
  t && t.active && t.effects.push(e);
}
const be = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, it = (e) => (e.w & F) > 0, ct = (e) => (e.n & F) > 0, rn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= F;
}, sn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      it(r) && !ct(r) ? r.delete(e) : t[n++] = r, r.w &= ~F, r.n &= ~F;
    }
    t.length = n;
  }
}, Oe = /* @__PURE__ */ new WeakMap();
let Z = 0, F = 1;
const Se = 30;
let b;
const K = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), xe = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class on {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, nn(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = b, n = H;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = b, b = this, H = !0, F = 1 << ++Z, Z <= Se ? rn(this) : Je(this), this.fn();
    } finally {
      Z <= Se && sn(this), F = 1 << --Z, b = this.parent, H = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    b === this ? this.deferStop = !0 : this.active && (Je(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Je(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let H = !0;
const lt = [];
function at() {
  lt.push(H), H = !1;
}
function ut() {
  const e = lt.pop();
  H = e === void 0 ? !0 : e;
}
function v(e, t, n) {
  if (H && b) {
    let s = Oe.get(e);
    s || Oe.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = be());
    const o = process.env.NODE_ENV !== "production" ? { effect: b, target: e, type: t, key: n } : void 0;
    cn(r, o);
  }
}
function cn(e, t) {
  let n = !1;
  Z <= Se ? ct(e) || (e.n |= F, n = !it(e)) : n = !e.has(b), n && (e.add(b), b.deps.push(e), process.env.NODE_ENV !== "production" && b.onTrack && b.onTrack(Object.assign({ effect: b }, t)));
}
function z(e, t, n, s, r, o) {
  const i = Oe.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && _(e))
    i.forEach((f, d) => {
      (d === "length" || d >= s) && c.push(f);
    });
  else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        _(e) ? Ce(n) && c.push(i.get("length")) : (c.push(i.get(K)), L(e) && c.push(i.get(xe)));
        break;
      case "delete":
        _(e) || (c.push(i.get(K)), L(e) && c.push(i.get(xe)));
        break;
      case "set":
        L(e) && c.push(i.get(K));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? ne(c[0], a) : ne(c[0]));
  else {
    const f = [];
    for (const d of c)
      d && f.push(...d);
    process.env.NODE_ENV !== "production" ? ne(be(f), a) : ne(be(f));
  }
}
function ne(e, t) {
  const n = _(e) ? e : [...e];
  for (const s of n)
    s.computed && qe(s, t);
  for (const s of n)
    s.computed || qe(s, t);
}
function qe(e, t) {
  (e !== b || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(I({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const ln = /* @__PURE__ */ At("__proto__,__v_isRef,__isVue"), ft = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Te)
), an = /* @__PURE__ */ Me(), un = /* @__PURE__ */ Me(!0), fn = /* @__PURE__ */ Me(!0, !0), Ge = /* @__PURE__ */ pn();
function pn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        v(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(p)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      at();
      const s = p(this)[t].apply(this, n);
      return ut(), s;
    };
  }), e;
}
function Me(e = !1, t = !1) {
  return function(s, r, o) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && o === (e ? t ? gt : _t : t ? vn : ht).get(s))
      return s;
    const i = _(s);
    if (!e && i && h(Ge, r))
      return Reflect.get(Ge, r, o);
    const c = Reflect.get(s, r, o);
    return (Te(r) ? ft.has(r) : ln(r)) || (e || v(s, "get", r), t) ? c : O(c) ? i && Ce(r) ? c : c.value : x(c) ? e ? Et(c) : mt(c) : c;
  };
}
const dn = /* @__PURE__ */ hn();
function hn(e = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (J(i) && O(i) && !O(r))
      return !1;
    if (!e && (!Ve(r) && !J(r) && (i = p(i), r = p(r)), !_(n) && O(i) && !O(r)))
      return i.value = r, !0;
    const c = _(n) && Ce(s) ? Number(s) < n.length : h(n, s), a = Reflect.set(n, s, r, o);
    return n === p(o) && (c ? ue(r, i) && z(n, "set", s, r, i) : z(n, "add", s, r)), a;
  };
}
function _n(e, t) {
  const n = h(e, t), s = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && z(e, "delete", t, void 0, s), r;
}
function gn(e, t) {
  const n = Reflect.has(e, t);
  return (!Te(t) || !ft.has(t)) && v(e, "has", t), n;
}
function mn(e) {
  return v(e, "iterate", _(e) ? "length" : K), Reflect.ownKeys(e);
}
const En = {
  get: an,
  set: dn,
  deleteProperty: _n,
  has: gn,
  ownKeys: mn
}, pt = {
  get: un,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Be(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Be(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, wn = /* @__PURE__ */ I({}, pt, {
  get: fn
}), Pe = (e) => e, me = (e) => Reflect.getPrototypeOf(e);
function re(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = p(e), o = p(t);
  n || (t !== o && v(r, "get", t), v(r, "get", o));
  const { has: i } = me(r), c = s ? Pe : n ? je : Ae;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function se(e, t = !1) {
  const n = this.__v_raw, s = p(n), r = p(e);
  return t || (e !== r && v(s, "has", e), v(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function oe(e, t = !1) {
  return e = e.__v_raw, !t && v(p(e), "iterate", K), Reflect.get(e, "size", e);
}
function Le(e) {
  e = p(e);
  const t = p(this);
  return me(t).has.call(t, e) || (t.add(e), z(t, "add", e, e)), this;
}
function Ye(e, t) {
  t = p(t);
  const n = p(this), { has: s, get: r } = me(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== "production" && dt(n, s, e) : (e = p(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? ue(t, i) && z(n, "set", e, t, i) : z(n, "add", e, t), this;
}
function Qe(e) {
  const t = p(this), { has: n, get: s } = me(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && dt(t, n, e) : (e = p(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && z(t, "delete", e, void 0, o), i;
}
function Xe() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? L(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && z(e, "clear", void 0, void 0, n), s;
}
function ie(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = p(i), a = t ? Pe : e ? je : Ae;
    return !e && v(c, "iterate", K), i.forEach((f, d) => s.call(r, a(f), a(d), o));
  };
}
function ce(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = p(r), i = L(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = r[e](...s), d = n ? Pe : t ? je : Ae;
    return !t && v(o, "iterate", a ? xe : K), {
      next() {
        const { value: l, done: u } = f.next();
        return u ? { value: l, done: u } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: u
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function C(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${Zt(e)} operation ${n}failed: target is readonly.`, p(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Nn() {
  const e = {
    get(o) {
      return re(this, o);
    },
    get size() {
      return oe(this);
    },
    has: se,
    add: Le,
    set: Ye,
    delete: Qe,
    clear: Xe,
    forEach: ie(!1, !1)
  }, t = {
    get(o) {
      return re(this, o, !1, !0);
    },
    get size() {
      return oe(this);
    },
    has: se,
    add: Le,
    set: Ye,
    delete: Qe,
    clear: Xe,
    forEach: ie(!1, !0)
  }, n = {
    get(o) {
      return re(this, o, !0);
    },
    get size() {
      return oe(this, !0);
    },
    has(o) {
      return se.call(this, o, !0);
    },
    add: C("add"),
    set: C("set"),
    delete: C("delete"),
    clear: C("clear"),
    forEach: ie(!0, !1)
  }, s = {
    get(o) {
      return re(this, o, !0, !0);
    },
    get size() {
      return oe(this, !0);
    },
    has(o) {
      return se.call(this, o, !0);
    },
    add: C("add"),
    set: C("set"),
    delete: C("delete"),
    clear: C("clear"),
    forEach: ie(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = ce(o, !1, !1), n[o] = ce(o, !0, !1), t[o] = ce(o, !1, !0), s[o] = ce(o, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [bn, On, Sn, xn] = /* @__PURE__ */ Nn();
function Fe(e, t) {
  const n = t ? e ? xn : Sn : e ? On : bn;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(h(n, r) && r in s ? n : s, r, o);
}
const Vn = {
  get: /* @__PURE__ */ Fe(!1, !1)
}, Dn = {
  get: /* @__PURE__ */ Fe(!0, !1)
}, Rn = {
  get: /* @__PURE__ */ Fe(!0, !0)
};
function dt(e, t, n) {
  const s = p(n);
  if (s !== n && t.call(e, s)) {
    const r = ot(e);
    console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const ht = /* @__PURE__ */ new WeakMap(), vn = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ new WeakMap();
function yn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function In(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : yn(ot(e));
}
function mt(e) {
  return J(e) ? e : ze(e, !1, En, Vn, ht);
}
function Et(e) {
  return ze(e, !0, pt, Dn, _t);
}
function le(e) {
  return ze(e, !0, wn, Rn, gt);
}
function ze(e, t, n, s, r) {
  if (!x(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = In(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? s : n);
  return r.set(e, c), c;
}
function W(e) {
  return J(e) ? W(e.__v_raw) : !!(e && e.__v_isReactive);
}
function J(e) {
  return !!(e && e.__v_isReadonly);
}
function Ve(e) {
  return !!(e && e.__v_isShallow);
}
function De(e) {
  return W(e) || J(e);
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function $n(e) {
  return kt(e, "__v_skip", !0), e;
}
const Ae = (e) => x(e) ? mt(e) : e, je = (e) => x(e) ? Et(e) : e;
function O(e) {
  return !!(e && e.__v_isRef === !0);
}
function Tn(e) {
  return O(e) ? e.value : e;
}
const Cn = {
  get: (e, t, n) => Tn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return O(r) && !O(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Mn(e) {
  return W(e) ? e : new Proxy(e, Cn);
}
const U = [];
function Pn(e) {
  U.push(e);
}
function Fn() {
  U.pop();
}
function S(e, ...t) {
  at();
  const n = U.length ? U[U.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = zn();
  if (s)
    B(s, n, 11, [
      e + t.join(""),
      n && n.proxy,
      r.map(({ vnode: o }) => `at <${Mt(n, o.type)}>`).join(`
`),
      r
    ]);
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...An(r)), console.warn(...o);
  }
  ut();
}
function zn() {
  let e = U[U.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function An(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...jn(n));
  }), t;
}
function jn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Mt(e.component, e.type, s)}`, o = ">" + n;
  return e.props ? [r, ...Kn(e.props), o] : [r + o];
}
function Kn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...wt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function wt(e, t, n) {
  return $(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : O(t) ? (t = wt(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const Nt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function B(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    bt(o, t, n);
  }
  return r;
}
function Re(e, t, n, s) {
  if (N(e)) {
    const o = B(e, t, n, s);
    return o && Lt(o) && o.catch((i) => {
      bt(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Re(e[o], t, n, s));
  return r;
}
function bt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Nt[n] : n;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let d = 0; d < f.length; d++)
          if (f[d](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      B(a, null, 10, [e, i, c]);
      return;
    }
  }
  Hn(e, n, r, s);
}
function Hn(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = Nt[t];
    if (n && Pn(n), S(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Fn(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let fe = !1, ve = !1;
const y = [];
let P = 0;
const Y = [];
let T = null, M = 0;
const Ot = /* @__PURE__ */ Promise.resolve();
let Ke = null;
const Wn = 100;
function Un(e) {
  const t = Ke || Ot;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Bn(e) {
  let t = P + 1, n = y.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    ee(y[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function He(e) {
  (!y.length || !y.includes(e, fe && e.allowRecurse ? P + 1 : P)) && (e.id == null ? y.push(e) : y.splice(Bn(e.id), 0, e), St());
}
function St() {
  !fe && !ve && (ve = !0, Ke = Ot.then(Vt));
}
function xt(e) {
  _(e) ? Y.push(...e) : (!T || !T.includes(e, e.allowRecurse ? M + 1 : M)) && Y.push(e), St();
}
function Jn(e) {
  if (Y.length) {
    const t = [...new Set(Y)];
    if (Y.length = 0, T) {
      T.push(...t);
      return;
    }
    for (T = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), T.sort((n, s) => ee(n) - ee(s)), M = 0; M < T.length; M++)
      process.env.NODE_ENV !== "production" && Dt(e, T[M]) || T[M]();
    T = null, M = 0;
  }
}
const ee = (e) => e.id == null ? 1 / 0 : e.id, qn = (e, t) => {
  const n = ee(e) - ee(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Vt(e) {
  ve = !1, fe = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), y.sort(qn);
  const t = process.env.NODE_ENV !== "production" ? (n) => Dt(e, n) : st;
  try {
    for (P = 0; P < y.length; P++) {
      const n = y[P];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        B(n, null, 14);
      }
    }
  } finally {
    P = 0, y.length = 0, Jn(e), fe = !1, Ke = null, (y.length || Y.length) && Vt(e);
  }
}
function Dt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Wn) {
      const s = t.ownerInstance, r = s && Ct(s.type);
      return S(`Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const X = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (en().__VUE_HMR_RUNTIME__ = {
  createRecord: Ee(Gn),
  rerender: Ee(Ln),
  reload: Ee(Yn)
});
const pe = /* @__PURE__ */ new Map();
function Gn(e, t) {
  return pe.has(e) ? !1 : (pe.set(e, {
    initialDef: k(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function k(e) {
  return Pt(e) ? e.__vccOpts : e;
}
function Ln(e, t) {
  const n = pe.get(e);
  !n || (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, k(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function Yn(e, t) {
  const n = pe.get(e);
  if (!n)
    return;
  t = k(t), Ze(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = k(r.type);
    X.has(o) || (o !== n.initialDef && Ze(o, t), X.add(o)), r.appContext.optionsCache.delete(r.type), r.ceReload ? (X.add(o), r.ceReload(t.styles), X.delete(o)) : r.parent ? (He(r.parent.update), r.parent.type.__asyncLoader && r.parent.ceReload && r.parent.ceReload(t.styles)) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  xt(() => {
    for (const r of s)
      X.delete(k(r.type));
  });
}
function Ze(e, t) {
  I(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ee(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let j = null, Qn = null;
const Xn = (e) => e.__isSuspense;
function Zn(e, t) {
  t && t.pendingBranch ? _(e) ? t.effects.push(...e) : t.effects.push(e) : xt(e);
}
const ke = {};
function kn(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = D) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && S('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), s !== void 0 && S('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (g) => {
    S("Invalid watch source: ", g, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, a = Q;
  let f, d = !1, l = !1;
  if (O(e) ? (f = () => e.value, d = Ve(e)) : W(e) ? (f = () => e, s = !0) : _(e) ? (l = !0, d = e.some((g) => W(g) || Ve(g)), f = () => e.map((g) => {
    if (O(g))
      return g.value;
    if (W(g))
      return q(g);
    if (N(g))
      return B(g, a, 2);
    process.env.NODE_ENV !== "production" && c(g);
  })) : N(e) ? t ? f = () => B(e, a, 2) : f = () => {
    if (!(a && a.isUnmounted))
      return u && u(), Re(e, a, 3, [m]);
  } : (f = st, process.env.NODE_ENV !== "production" && c(e)), t && s) {
    const g = f;
    f = () => q(g());
  }
  let u, m = (g) => {
    u = R.onStop = () => {
      B(g, a, 4);
    };
  }, E = l ? [] : ke;
  const V = () => {
    if (!!R.active)
      if (t) {
        const g = R.run();
        (s || d || (l ? g.some((Ft, zt) => ue(Ft, E[zt])) : ue(g, E))) && (u && u(), Re(t, a, 3, [
          g,
          E === ke ? void 0 : E,
          m
        ]), E = g);
      } else
        R.run();
  };
  V.allowRecurse = !!t;
  let te;
  r === "sync" ? te = V : r === "post" ? te = () => nt(V, a && a.suspense) : (V.pre = !0, a && (V.id = a.uid), te = () => He(V));
  const R = new on(f, te);
  return process.env.NODE_ENV !== "production" && (R.onTrack = o, R.onTrigger = i), t ? n ? V() : E = R.run() : r === "post" ? nt(R.run.bind(R), a && a.suspense) : R.run(), () => {
    R.stop(), a && a.scope && Jt(a.scope.effects, R);
  };
}
function er(e, t, n) {
  const s = this.proxy, r = $(e) ? e.includes(".") ? tr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = Q;
  rt(this);
  const c = kn(r, o.bind(s), n);
  return i ? rt(i) : wr(), c;
}
function tr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function q(e, t) {
  if (!x(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), O(e))
    q(e.value, t);
  else if (_(e))
    for (let n = 0; n < e.length; n++)
      q(e[n], t);
  else if (Gt(e) || L(e))
    e.forEach((n) => {
      q(n, t);
    });
  else if (Qt(e))
    for (const n in e)
      q(e[n], t);
  return e;
}
const nr = Symbol(), ye = (e) => e ? Nr(e) ? br(e) || e.proxy : ye(e.parent) : null, de = /* @__PURE__ */ I(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? le(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? le(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? le(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? le(e.refs) : e.refs,
  $parent: (e) => ye(e.parent),
  $root: (e) => ye(e.root),
  $emit: (e) => e.emit,
  $options: (e) => or(e),
  $forceUpdate: (e) => e.f || (e.f = () => He(e.update)),
  $nextTick: (e) => e.n || (e.n = Un.bind(e.proxy)),
  $watch: (e) => er.bind(e)
}), rr = (e) => e === "_" || e === "$", sr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && s !== D && s.__isScriptSetup && h(s, t))
      return s[t];
    let f;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (s !== D && h(s, t))
          return i[t] = 1, s[t];
        if (r !== D && h(r, t))
          return i[t] = 2, r[t];
        if ((f = e.propsOptions[0]) && h(f, t))
          return i[t] = 3, o[t];
        if (n !== D && h(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = de[t];
    let l, u;
    if (d)
      return t === "$attrs" && (v(e, "get", t), process.env.NODE_ENV !== "production" && void 0), d(e);
    if ((l = c.__cssModules) && (l = l[t]))
      return l;
    if (n !== D && h(n, t))
      return i[t] = 4, n[t];
    if (u = a.config.globalProperties, h(u, t))
      return u[t];
    process.env.NODE_ENV !== "production" && j && (!$(t) || t.indexOf("__v") !== 0) && (r !== D && rr(t[0]) && h(r, t) ? S(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === j && S(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return r !== D && h(r, t) ? (r[t] = n, !0) : s !== D && h(s, t) ? (s[t] = n, !0) : h(e.props, t) ? (process.env.NODE_ENV !== "production" && S(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && S(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o } }, i) {
    let c;
    return !!n[i] || e !== D && h(e, i) || t !== D && h(t, i) || (c = o[0]) && h(c, i) || h(s, i) || h(de, i) || h(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : h(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (sr.ownKeys = (e) => (S("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function or(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: r, optionsCache: o, config: { optionMergeStrategies: i } } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach((f) => he(a, f, i, !0)), he(a, t, i)), x(t) && o.set(t, a), a;
}
function he(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && he(e, o, n, !0), r && r.forEach((i) => he(e, i, n, !0));
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && S('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = ir[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const ir = {
  data: et,
  props: A,
  emits: A,
  methods: A,
  computed: A,
  beforeCreate: w,
  created: w,
  beforeMount: w,
  mounted: w,
  beforeUpdate: w,
  updated: w,
  beforeDestroy: w,
  beforeUnmount: w,
  destroyed: w,
  unmounted: w,
  activated: w,
  deactivated: w,
  errorCaptured: w,
  serverPrefetch: w,
  components: A,
  directives: A,
  watch: lr,
  provide: et,
  inject: cr
};
function et(e, t) {
  return t ? e ? function() {
    return I(N(e) ? e.call(this, this) : e, N(t) ? t.call(this, this) : t);
  } : t : e;
}
function cr(e, t) {
  return A(tt(e), tt(t));
}
function tt(e) {
  if (_(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function w(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function A(e, t) {
  return e ? I(I(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function lr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = I(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = w(e[s], t[s]);
  return n;
}
function ar() {
  return {
    app: null,
    config: {
      isNativeTag: Wt,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const nt = Zn, ur = (e) => e.__isTeleport, Rt = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), fr = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), pr = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let G = null;
function dr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const hr = (...e) => $t(...e), vt = "__vInternal", yt = ({ key: e }) => e != null ? e : null, ae = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? $(e) || O(e) || N(e) ? { i: j, r: e, k: t, f: !!n } : e : null;
function _r(e, t = null, n = null, s = 0, r = null, o = e === Rt ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && yt(t),
    ref: t && ae(t),
    scopeId: Qn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null
  };
  return c ? (We(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= $(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && S("VNode created with invalid key (NaN). VNode type:", a.type), !i && G && (a.patchFlag > 0 || o & 6) && a.patchFlag !== 32 && G.push(a), a;
}
const It = process.env.NODE_ENV !== "production" ? hr : $t;
function $t(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === nr) && (process.env.NODE_ENV !== "production" && !e && S(`Invalid vnode type when creating vnode: ${e}.`), e = pr), dr(e)) {
    const c = _e(e, t, !0);
    return n && We(c, n), !o && G && (c.shapeFlag & 6 ? G[G.indexOf(e)] = c : G.push(c)), c.patchFlag |= -2, c;
  }
  if (Pt(e) && (e = e.__vccOpts), t) {
    t = gr(t);
    let { class: c, style: a } = t;
    c && !$(c) && (t.class = $e(c)), x(a) && (De(a) && !_(a) && (a = I({}, a)), t.style = Ie(a));
  }
  const i = $(e) ? 1 : Xn(e) ? 128 : ur(e) ? 64 : x(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && De(e) && (e = p(e), S("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), _r(e, t, n, s, r, i, o, !0);
}
function gr(e) {
  return e ? De(e) || vt in e ? I({}, e) : e : null;
}
function _e(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, c = t ? Er(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && yt(c),
    ref: t && t.ref ? n && r ? _(r) ? r.concat(ae(t)) : [r, ae(t)] : ae(t) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && _(i) ? i.map(Tt) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Rt ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && _e(e.ssContent),
    ssFallback: e.ssFallback && _e(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  };
}
function Tt(e) {
  const t = _e(e);
  return _(e.children) && (t.children = e.children.map(Tt)), t;
}
function mr(e = " ", t = 0) {
  return It(fr, null, e, t);
}
function We(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (_(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), We(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(vt in t) ? t._ctx = j : r === 3 && j && (j.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    N(t) ? (t = { default: t, _ctx: j }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [mr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Er(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = $e([t.class, s.class]));
      else if (r === "style")
        t.style = Ie([t.style, s.style]);
      else if (Bt(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(_(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
ar();
let Q = null;
const rt = (e) => {
  Q = e, e.scope.on();
}, wr = () => {
  Q && Q.scope.off(), Q = null;
};
function Nr(e) {
  return e.vnode.shapeFlag & 4;
}
function br(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Mn($n(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in de)
          return de[n](e);
      }
    }));
}
const Or = /(?:^|[-_])(\w)/g, Sr = (e) => e.replace(Or, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ct(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Mt(e, t, n = !1) {
  let s = Ct(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(e.components || e.parent.type.components) || r(e.appContext.components);
  }
  return s ? Sr(s) : n ? "App" : "Anonymous";
}
function Pt(e) {
  return N(e) && "__vccOpts" in e;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function we(e) {
  return !!(e && e.__v_isShallow);
}
function xr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, r = {
    header(l) {
      return x(l) ? l.__isVue ? ["div", e, "VueInstance"] : O(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : W(l) ? [
        "div",
        {},
        ["span", e, we(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${J(l) ? " (readonly)" : ""}`
      ] : J(l) ? [
        "div",
        {},
        ["span", e, we(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const u = [];
    l.type.props && l.props && u.push(i("props", p(l.props))), l.setupState !== D && u.push(i("setup", l.setupState)), l.data !== D && u.push(i("data", p(l.data)));
    const m = a(l, "computed");
    m && u.push(i("computed", m));
    const E = a(l, "inject");
    return E && u.push(i("injected", E)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), u;
  }
  function i(l, u) {
    return u = I({}, u), Object.keys(u).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(u).map((m) => [
          "div",
          {},
          ["span", s, m + ": "],
          c(u[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, u = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : x(l) ? ["object", { object: u ? p(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const m = l.type;
    if (N(m))
      return;
    const E = {};
    for (const V in l.ctx)
      f(m, V, u) && (E[V] = l.ctx[V]);
    return E;
  }
  function f(l, u, m) {
    const E = l[m];
    if (_(E) && E.includes(u) || x(E) && u in E || l.extends && f(l.extends, u, m) || l.mixins && l.mixins.some((V) => f(V, u, m)))
      return !0;
  }
  function d(l) {
    return we(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function Vr() {
  xr();
}
process.env.NODE_ENV !== "production" && Vr();
function Dr(e, t) {
  for (let n = 0; n < t.length; n++)
    if (e === t[n])
      return !0;
  return !1;
}
const Rr = {
  props: {
    size: {
      validator(e) {
        return Dr(e, ["small", "middle", "large"]);
      },
      default: "middle"
    },
    prefix: {
      type: String,
      default: "sh-"
    }
  },
  data() {
    return {};
  },
  computed: {
    sizes() {
      return this.size || this.$shui && this.$shui.size;
    },
    prefixs() {
      return this.prefix || this.$prefix && this.$shui.prefix;
    }
  },
  watch: {
    size(e) {
      this.sizes = e;
    },
    "$shui.size": (e) => {
      globalThis.sizes = e.size;
    }
  }
}, Ne = {
  name: "Button",
  mixins: [Rr],
  components: {},
  data() {
    return {};
  },
  computed: {
    countClass() {
      return `${this.prefixs}Button`;
    }
  },
  render() {
    return It("div", null, [this.prefixs]);
  },
  methods: {
    clickBtn(e) {
      this.$emit("on-click", e);
    }
  }
};
Ne.install = function(e) {
  e.component(Ne.name, Ne);
};
export {
  Ne as default
};
