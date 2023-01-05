function Ht(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function $e(e) {
  if (_(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = $(s) ? Ut(s) : $e(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else {
    if ($(e))
      return e;
    if (S(e))
      return e;
  }
}
const Wt = /;(?![^(]*\))/g, Bt = /:(.+)/;
function Ut(e) {
  const t = {};
  return e.split(Wt).forEach((n) => {
    if (n) {
      const s = n.split(Bt);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Te(e) {
  let t = "";
  if ($(e))
    t = e;
  else if (_(e))
    for (let n = 0; n < e.length; n++) {
      const s = Te(e[n]);
      s && (t += s + " ");
    }
  else if (S(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const v = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const it = () => {
}, Jt = () => !1, qt = /^on[^a-z]/, Gt = (e) => qt.test(e), R = Object.assign, Lt = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Yt = Object.prototype.hasOwnProperty, h = (e, t) => Yt.call(e, t), _ = Array.isArray, L = (e) => Ee(e) === "[object Map]", Zt = (e) => Ee(e) === "[object Set]", N = (e) => typeof e == "function", $ = (e) => typeof e == "string", Ce = (e) => typeof e == "symbol", S = (e) => e !== null && typeof e == "object", Qt = (e) => S(e) && N(e.then) && N(e.catch), Xt = Object.prototype.toString, Ee = (e) => Xt.call(e), ct = (e) => Ee(e).slice(8, -1), kt = (e) => Ee(e) === "[object Object]", Pe = (e) => $(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, en = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, tn = en((e) => e.charAt(0).toUpperCase() + e.slice(1)), pe = (e, t) => !Object.is(e, t), nn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Ue;
const rn = () => Ue || (Ue = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Je(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let sn;
function on(e, t = sn) {
  t && t.active && t.effects.push(e);
}
const Oe = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, lt = (e) => (e.w & F) > 0, at = (e) => (e.n & F) > 0, cn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= F;
}, ln = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      lt(r) && !at(r) ? r.delete(e) : t[n++] = r, r.w &= ~F, r.n &= ~F;
    }
    t.length = n;
  }
}, xe = /* @__PURE__ */ new WeakMap();
let X = 0, F = 1;
const Se = 30;
let b;
const K = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Ve = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class an {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, on(this, s);
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
      return this.parent = b, b = this, H = !0, F = 1 << ++X, X <= Se ? cn(this) : qe(this), this.fn();
    } finally {
      X <= Se && ln(this), F = 1 << --X, b = this.parent, H = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    b === this ? this.deferStop = !0 : this.active && (qe(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function qe(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let H = !0;
const ut = [];
function ft() {
  ut.push(H), H = !1;
}
function pt() {
  const e = ut.pop();
  H = e === void 0 ? !0 : e;
}
function D(e, t, n) {
  if (H && b) {
    let s = xe.get(e);
    s || xe.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Oe());
    const o = process.env.NODE_ENV !== "production" ? { effect: b, target: e, type: t, key: n } : void 0;
    un(r, o);
  }
}
function un(e, t) {
  let n = !1;
  X <= Se ? at(e) || (e.n |= F, n = !lt(e)) : n = !e.has(b), n && (e.add(b), b.deps.push(e), process.env.NODE_ENV !== "production" && b.onTrack && b.onTrack(Object.assign({ effect: b }, t)));
}
function z(e, t, n, s, r, o) {
  const i = xe.get(e);
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
        _(e) ? Pe(n) && c.push(i.get("length")) : (c.push(i.get(K)), L(e) && c.push(i.get(Ve)));
        break;
      case "delete":
        _(e) || (c.push(i.get(K)), L(e) && c.push(i.get(Ve)));
        break;
      case "set":
        L(e) && c.push(i.get(K));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? se(c[0], a) : se(c[0]));
  else {
    const f = [];
    for (const d of c)
      d && f.push(...d);
    process.env.NODE_ENV !== "production" ? se(Oe(f), a) : se(Oe(f));
  }
}
function se(e, t) {
  const n = _(e) ? e : [...e];
  for (const s of n)
    s.computed && Ge(s, t);
  for (const s of n)
    s.computed || Ge(s, t);
}
function Ge(e, t) {
  (e !== b || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(R({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const fn = /* @__PURE__ */ Ht("__proto__,__v_isRef,__isVue"), dt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ce)
), pn = /* @__PURE__ */ Me(), dn = /* @__PURE__ */ Me(!0), hn = /* @__PURE__ */ Me(!0, !0), Le = /* @__PURE__ */ _n();
function _n() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        D(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(p)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ft();
      const s = p(this)[t].apply(this, n);
      return pt(), s;
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
    if (r === "__v_raw" && o === (e ? t ? Et : mt : t ? $n : gt).get(s))
      return s;
    const i = _(s);
    if (!e && i && h(Le, r))
      return Reflect.get(Le, r, o);
    const c = Reflect.get(s, r, o);
    return (Ce(r) ? dt.has(r) : fn(r)) || (e || D(s, "get", r), t) ? c : O(c) ? i && Pe(r) ? c : c.value : S(c) ? e ? Nt(c) : wt(c) : c;
  };
}
const gn = /* @__PURE__ */ mn();
function mn(e = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (J(i) && O(i) && !O(r))
      return !1;
    if (!e && (!ve(r) && !J(r) && (i = p(i), r = p(r)), !_(n) && O(i) && !O(r)))
      return i.value = r, !0;
    const c = _(n) && Pe(s) ? Number(s) < n.length : h(n, s), a = Reflect.set(n, s, r, o);
    return n === p(o) && (c ? pe(r, i) && z(n, "set", s, r, i) : z(n, "add", s, r)), a;
  };
}
function En(e, t) {
  const n = h(e, t), s = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && z(e, "delete", t, void 0, s), r;
}
function wn(e, t) {
  const n = Reflect.has(e, t);
  return (!Ce(t) || !dt.has(t)) && D(e, "has", t), n;
}
function Nn(e) {
  return D(e, "iterate", _(e) ? "length" : K), Reflect.ownKeys(e);
}
const bn = {
  get: pn,
  set: gn,
  deleteProperty: En,
  has: wn,
  ownKeys: Nn
}, ht = {
  get: dn,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Je(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Je(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, On = /* @__PURE__ */ R({}, ht, {
  get: hn
}), Fe = (e) => e, we = (e) => Reflect.getPrototypeOf(e);
function oe(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = p(e), o = p(t);
  n || (t !== o && D(r, "get", t), D(r, "get", o));
  const { has: i } = we(r), c = s ? Fe : n ? Ke : Ae;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function ie(e, t = !1) {
  const n = this.__v_raw, s = p(n), r = p(e);
  return t || (e !== r && D(s, "has", e), D(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function ce(e, t = !1) {
  return e = e.__v_raw, !t && D(p(e), "iterate", K), Reflect.get(e, "size", e);
}
function Ye(e) {
  e = p(e);
  const t = p(this);
  return we(t).has.call(t, e) || (t.add(e), z(t, "add", e, e)), this;
}
function Ze(e, t) {
  t = p(t);
  const n = p(this), { has: s, get: r } = we(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== "production" && _t(n, s, e) : (e = p(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? pe(t, i) && z(n, "set", e, t, i) : z(n, "add", e, t), this;
}
function Qe(e) {
  const t = p(this), { has: n, get: s } = we(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && _t(t, n, e) : (e = p(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && z(t, "delete", e, void 0, o), i;
}
function Xe() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? L(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && z(e, "clear", void 0, void 0, n), s;
}
function le(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = p(i), a = t ? Fe : e ? Ke : Ae;
    return !e && D(c, "iterate", K), i.forEach((f, d) => s.call(r, a(f), a(d), o));
  };
}
function ae(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = p(r), i = L(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = r[e](...s), d = n ? Fe : t ? Ke : Ae;
    return !t && D(o, "iterate", a ? Ve : K), {
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
      console.warn(`${tn(e)} operation ${n}failed: target is readonly.`, p(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function xn() {
  const e = {
    get(o) {
      return oe(this, o);
    },
    get size() {
      return ce(this);
    },
    has: ie,
    add: Ye,
    set: Ze,
    delete: Qe,
    clear: Xe,
    forEach: le(!1, !1)
  }, t = {
    get(o) {
      return oe(this, o, !1, !0);
    },
    get size() {
      return ce(this);
    },
    has: ie,
    add: Ye,
    set: Ze,
    delete: Qe,
    clear: Xe,
    forEach: le(!1, !0)
  }, n = {
    get(o) {
      return oe(this, o, !0);
    },
    get size() {
      return ce(this, !0);
    },
    has(o) {
      return ie.call(this, o, !0);
    },
    add: C("add"),
    set: C("set"),
    delete: C("delete"),
    clear: C("clear"),
    forEach: le(!0, !1)
  }, s = {
    get(o) {
      return oe(this, o, !0, !0);
    },
    get size() {
      return ce(this, !0);
    },
    has(o) {
      return ie.call(this, o, !0);
    },
    add: C("add"),
    set: C("set"),
    delete: C("delete"),
    clear: C("clear"),
    forEach: le(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = ae(o, !1, !1), n[o] = ae(o, !0, !1), t[o] = ae(o, !1, !0), s[o] = ae(o, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [Sn, Vn, vn, yn] = /* @__PURE__ */ xn();
function ze(e, t) {
  const n = t ? e ? yn : vn : e ? Vn : Sn;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(h(n, r) && r in s ? n : s, r, o);
}
const Dn = {
  get: /* @__PURE__ */ ze(!1, !1)
}, In = {
  get: /* @__PURE__ */ ze(!0, !1)
}, Rn = {
  get: /* @__PURE__ */ ze(!0, !0)
};
function _t(e, t, n) {
  const s = p(n);
  if (s !== n && t.call(e, s)) {
    const r = ct(e);
    console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const gt = /* @__PURE__ */ new WeakMap(), $n = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap();
function Tn(e) {
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
function Cn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Tn(ct(e));
}
function wt(e) {
  return J(e) ? e : je(e, !1, bn, Dn, gt);
}
function Nt(e) {
  return je(e, !0, ht, In, mt);
}
function ue(e) {
  return je(e, !0, On, Rn, Et);
}
function je(e, t, n, s, r) {
  if (!S(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Cn(e);
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
function ve(e) {
  return !!(e && e.__v_isShallow);
}
function ye(e) {
  return W(e) || J(e);
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Pn(e) {
  return nn(e, "__v_skip", !0), e;
}
const Ae = (e) => S(e) ? wt(e) : e, Ke = (e) => S(e) ? Nt(e) : e;
function O(e) {
  return !!(e && e.__v_isRef === !0);
}
function Mn(e) {
  return O(e) ? e.value : e;
}
const Fn = {
  get: (e, t, n) => Mn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return O(r) && !O(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function zn(e) {
  return W(e) ? e : new Proxy(e, Fn);
}
const B = [];
function jn(e) {
  B.push(e);
}
function An() {
  B.pop();
}
function x(e, ...t) {
  ft();
  const n = B.length ? B[B.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Kn();
  if (s)
    U(s, n, 11, [
      e + t.join(""),
      n && n.proxy,
      r.map(({ vnode: o }) => `at <${Ft(n, o.type)}>`).join(`
`),
      r
    ]);
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...Hn(r)), console.warn(...o);
  }
  pt();
}
function Kn() {
  let e = B[B.length - 1];
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
function Hn(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Wn(n));
  }), t;
}
function Wn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Ft(e.component, e.type, s)}`, o = ">" + n;
  return e.props ? [r, ...Bn(e.props), o] : [r + o];
}
function Bn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...bt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function bt(e, t, n) {
  return $(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : O(t) ? (t = bt(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const Ot = {
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
function U(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    xt(o, t, n);
  }
  return r;
}
function De(e, t, n, s) {
  if (N(e)) {
    const o = U(e, t, n, s);
    return o && Qt(o) && o.catch((i) => {
      xt(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(De(e[o], t, n, s));
  return r;
}
function xt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Ot[n] : n;
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
      U(a, null, 10, [e, i, c]);
      return;
    }
  }
  Un(e, n, r, s);
}
function Un(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = Ot[t];
    if (n && jn(n), x(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && An(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let de = !1, Ie = !1;
const I = [];
let M = 0;
const Y = [];
let T = null, P = 0;
const St = /* @__PURE__ */ Promise.resolve();
let He = null;
const Jn = 100;
function qn(e) {
  const t = He || St;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Gn(e) {
  let t = M + 1, n = I.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    te(I[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function We(e) {
  (!I.length || !I.includes(e, de && e.allowRecurse ? M + 1 : M)) && (e.id == null ? I.push(e) : I.splice(Gn(e.id), 0, e), Vt());
}
function Vt() {
  !de && !Ie && (Ie = !0, He = St.then(yt));
}
function vt(e) {
  _(e) ? Y.push(...e) : (!T || !T.includes(e, e.allowRecurse ? P + 1 : P)) && Y.push(e), Vt();
}
function Ln(e) {
  if (Y.length) {
    const t = [...new Set(Y)];
    if (Y.length = 0, T) {
      T.push(...t);
      return;
    }
    for (T = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), T.sort((n, s) => te(n) - te(s)), P = 0; P < T.length; P++)
      process.env.NODE_ENV !== "production" && Dt(e, T[P]) || T[P]();
    T = null, P = 0;
  }
}
const te = (e) => e.id == null ? 1 / 0 : e.id, Yn = (e, t) => {
  const n = te(e) - te(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function yt(e) {
  Ie = !1, de = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), I.sort(Yn);
  const t = process.env.NODE_ENV !== "production" ? (n) => Dt(e, n) : it;
  try {
    for (M = 0; M < I.length; M++) {
      const n = I[M];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        U(n, null, 14);
      }
    }
  } finally {
    M = 0, I.length = 0, Ln(e), de = !1, He = null, (I.length || Y.length) && yt(e);
  }
}
function Dt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Jn) {
      const s = t.ownerInstance, r = s && Mt(s.type);
      return x(`Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const Q = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (rn().__VUE_HMR_RUNTIME__ = {
  createRecord: Ne(Zn),
  rerender: Ne(Qn),
  reload: Ne(Xn)
});
const he = /* @__PURE__ */ new Map();
function Zn(e, t) {
  return he.has(e) ? !1 : (he.set(e, {
    initialDef: k(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function k(e) {
  return zt(e) ? e.__vccOpts : e;
}
function Qn(e, t) {
  const n = he.get(e);
  !n || (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, k(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function Xn(e, t) {
  const n = he.get(e);
  if (!n)
    return;
  t = k(t), ke(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = k(r.type);
    Q.has(o) || (o !== n.initialDef && ke(o, t), Q.add(o)), r.appContext.optionsCache.delete(r.type), r.ceReload ? (Q.add(o), r.ceReload(t.styles), Q.delete(o)) : r.parent ? (We(r.parent.update), r.parent.type.__asyncLoader && r.parent.ceReload && r.parent.ceReload(t.styles)) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  vt(() => {
    for (const r of s)
      Q.delete(k(r.type));
  });
}
function ke(e, t) {
  R(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ne(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let A = null, kn = null;
const er = (e) => e.__isSuspense;
function tr(e, t) {
  t && t.pendingBranch ? _(e) ? t.effects.push(...e) : t.effects.push(e) : vt(e);
}
const et = {};
function nr(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = v) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && x('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), s !== void 0 && x('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (g) => {
    x("Invalid watch source: ", g, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, a = Z;
  let f, d = !1, l = !1;
  if (O(e) ? (f = () => e.value, d = ve(e)) : W(e) ? (f = () => e, s = !0) : _(e) ? (l = !0, d = e.some((g) => W(g) || ve(g)), f = () => e.map((g) => {
    if (O(g))
      return g.value;
    if (W(g))
      return q(g);
    if (N(g))
      return U(g, a, 2);
    process.env.NODE_ENV !== "production" && c(g);
  })) : N(e) ? t ? f = () => U(e, a, 2) : f = () => {
    if (!(a && a.isUnmounted))
      return u && u(), De(e, a, 3, [m]);
  } : (f = it, process.env.NODE_ENV !== "production" && c(e)), t && s) {
    const g = f;
    f = () => q(g());
  }
  let u, m = (g) => {
    u = y.onStop = () => {
      U(g, a, 4);
    };
  }, E = l ? [] : et;
  const V = () => {
    if (!!y.active)
      if (t) {
        const g = y.run();
        (s || d || (l ? g.some((At, Kt) => pe(At, E[Kt])) : pe(g, E))) && (u && u(), De(t, a, 3, [
          g,
          E === et ? void 0 : E,
          m
        ]), E = g);
      } else
        y.run();
  };
  V.allowRecurse = !!t;
  let re;
  r === "sync" ? re = V : r === "post" ? re = () => rt(V, a && a.suspense) : (V.pre = !0, a && (V.id = a.uid), re = () => We(V));
  const y = new an(f, re);
  return process.env.NODE_ENV !== "production" && (y.onTrack = o, y.onTrigger = i), t ? n ? V() : E = y.run() : r === "post" ? rt(y.run.bind(y), a && a.suspense) : y.run(), () => {
    y.stop(), a && a.scope && Lt(a.scope.effects, y);
  };
}
function rr(e, t, n) {
  const s = this.proxy, r = $(e) ? e.includes(".") ? sr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = Z;
  st(this);
  const c = nr(r, o.bind(s), n);
  return i ? st(i) : Or(), c;
}
function sr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function q(e, t) {
  if (!S(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), O(e))
    q(e.value, t);
  else if (_(e))
    for (let n = 0; n < e.length; n++)
      q(e[n], t);
  else if (Zt(e) || L(e))
    e.forEach((n) => {
      q(n, t);
    });
  else if (kt(e))
    for (const n in e)
      q(e[n], t);
  return e;
}
const or = Symbol(), Re = (e) => e ? xr(e) ? Sr(e) || e.proxy : Re(e.parent) : null, _e = /* @__PURE__ */ R(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? ue(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? ue(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? ue(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? ue(e.refs) : e.refs,
  $parent: (e) => Re(e.parent),
  $root: (e) => Re(e.root),
  $emit: (e) => e.emit,
  $options: (e) => lr(e),
  $forceUpdate: (e) => e.f || (e.f = () => We(e.update)),
  $nextTick: (e) => e.n || (e.n = qn.bind(e.proxy)),
  $watch: (e) => rr.bind(e)
}), ir = (e) => e === "_" || e === "$", cr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && s !== v && s.__isScriptSetup && h(s, t))
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
        if (s !== v && h(s, t))
          return i[t] = 1, s[t];
        if (r !== v && h(r, t))
          return i[t] = 2, r[t];
        if ((f = e.propsOptions[0]) && h(f, t))
          return i[t] = 3, o[t];
        if (n !== v && h(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = _e[t];
    let l, u;
    if (d)
      return t === "$attrs" && (D(e, "get", t), process.env.NODE_ENV !== "production" && void 0), d(e);
    if ((l = c.__cssModules) && (l = l[t]))
      return l;
    if (n !== v && h(n, t))
      return i[t] = 4, n[t];
    if (u = a.config.globalProperties, h(u, t))
      return u[t];
    process.env.NODE_ENV !== "production" && A && (!$(t) || t.indexOf("__v") !== 0) && (r !== v && ir(t[0]) && h(r, t) ? x(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === A && x(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return r !== v && h(r, t) ? (r[t] = n, !0) : s !== v && h(s, t) ? (s[t] = n, !0) : h(e.props, t) ? (process.env.NODE_ENV !== "production" && x(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && x(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o } }, i) {
    let c;
    return !!n[i] || e !== v && h(e, i) || t !== v && h(t, i) || (c = o[0]) && h(c, i) || h(s, i) || h(_e, i) || h(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : h(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (cr.ownKeys = (e) => (x("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function lr(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: r, optionsCache: o, config: { optionMergeStrategies: i } } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach((f) => ge(a, f, i, !0)), ge(a, t, i)), S(t) && o.set(t, a), a;
}
function ge(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && ge(e, o, n, !0), r && r.forEach((i) => ge(e, i, n, !0));
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && x('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = ar[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const ar = {
  data: tt,
  props: j,
  emits: j,
  methods: j,
  computed: j,
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
  components: j,
  directives: j,
  watch: fr,
  provide: tt,
  inject: ur
};
function tt(e, t) {
  return t ? e ? function() {
    return R(N(e) ? e.call(this, this) : e, N(t) ? t.call(this, this) : t);
  } : t : e;
}
function ur(e, t) {
  return j(nt(e), nt(t));
}
function nt(e) {
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
function j(e, t) {
  return e ? R(R(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function fr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = R(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = w(e[s], t[s]);
  return n;
}
function pr() {
  return {
    app: null,
    config: {
      isNativeTag: Jt,
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
const rt = tr, dr = (e) => e.__isTeleport, It = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), hr = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), _r = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let G = null;
function gr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const mr = (...e) => Ct(...e), Rt = "__vInternal", $t = ({ key: e }) => e != null ? e : null, fe = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? $(e) || O(e) || N(e) ? { i: A, r: e, k: t, f: !!n } : e : null;
function Er(e, t = null, n = null, s = 0, r = null, o = e === It ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && $t(t),
    ref: t && fe(t),
    scopeId: kn,
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
  return c ? (Be(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= $(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && x("VNode created with invalid key (NaN). VNode type:", a.type), !i && G && (a.patchFlag > 0 || o & 6) && a.patchFlag !== 32 && G.push(a), a;
}
const Tt = process.env.NODE_ENV !== "production" ? mr : Ct;
function Ct(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === or) && (process.env.NODE_ENV !== "production" && !e && x(`Invalid vnode type when creating vnode: ${e}.`), e = _r), gr(e)) {
    const c = me(e, t, !0);
    return n && Be(c, n), !o && G && (c.shapeFlag & 6 ? G[G.indexOf(e)] = c : G.push(c)), c.patchFlag |= -2, c;
  }
  if (zt(e) && (e = e.__vccOpts), t) {
    t = wr(t);
    let { class: c, style: a } = t;
    c && !$(c) && (t.class = Te(c)), S(a) && (ye(a) && !_(a) && (a = R({}, a)), t.style = $e(a));
  }
  const i = $(e) ? 1 : er(e) ? 128 : dr(e) ? 64 : S(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && ye(e) && (e = p(e), x("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), Er(e, t, n, s, r, i, o, !0);
}
function wr(e) {
  return e ? ye(e) || Rt in e ? R({}, e) : e : null;
}
function me(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, c = t ? br(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && $t(c),
    ref: t && t.ref ? n && r ? _(r) ? r.concat(fe(t)) : [r, fe(t)] : fe(t) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && _(i) ? i.map(Pt) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== It ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && me(e.ssContent),
    ssFallback: e.ssFallback && me(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  };
}
function Pt(e) {
  const t = me(e);
  return _(e.children) && (t.children = e.children.map(Pt)), t;
}
function Nr(e = " ", t = 0) {
  return Tt(hr, null, e, t);
}
function Be(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (_(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Be(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Rt in t) ? t._ctx = A : r === 3 && A && (A.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    N(t) ? (t = { default: t, _ctx: A }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Nr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function br(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Te([t.class, s.class]));
      else if (r === "style")
        t.style = $e([t.style, s.style]);
      else if (Gt(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(_(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
pr();
let Z = null;
const st = (e) => {
  Z = e, e.scope.on();
}, Or = () => {
  Z && Z.scope.off(), Z = null;
};
function xr(e) {
  return e.vnode.shapeFlag & 4;
}
function Sr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(zn(Pn(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in _e)
          return _e[n](e);
      }
    }));
}
const Vr = /(?:^|[-_])(\w)/g, vr = (e) => e.replace(Vr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Mt(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ft(e, t, n = !1) {
  let s = Mt(t);
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
  return s ? vr(s) : n ? "App" : "Anonymous";
}
function zt(e) {
  return N(e) && "__vccOpts" in e;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function be(e) {
  return !!(e && e.__v_isShallow);
}
function yr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, r = {
    header(l) {
      return S(l) ? l.__isVue ? ["div", e, "VueInstance"] : O(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : W(l) ? [
        "div",
        {},
        ["span", e, be(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${J(l) ? " (readonly)" : ""}`
      ] : J(l) ? [
        "div",
        {},
        ["span", e, be(l) ? "ShallowReadonly" : "Readonly"],
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
    l.type.props && l.props && u.push(i("props", p(l.props))), l.setupState !== v && u.push(i("setup", l.setupState)), l.data !== v && u.push(i("data", p(l.data)));
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
    return u = R({}, u), Object.keys(u).length ? [
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
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : S(l) ? ["object", { object: u ? p(l) : l }] : ["span", n, String(l)];
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
    if (_(E) && E.includes(u) || S(E) && u in E || l.extends && f(l.extends, u, m) || l.mixins && l.mixins.some((V) => f(V, u, m)))
      return !0;
  }
  function d(l) {
    return be(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function Dr() {
  yr();
}
process.env.NODE_ENV !== "production" && Dr();
function Ir(e, t) {
  for (let n = 0; n < t.length; n++)
    if (e === t[n])
      return !0;
  return !1;
}
const Rr = {
  props: {
    size: {
      validator(e) {
        return Ir(e, ["small", "middle", "large"]);
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
}, ee = {
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
    return Tt("div", null, [this.prefixs]);
  },
  methods: {
    clickBtn(e) {
      this.$emit("on-click", e);
    }
  }
}, $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ee
}, Symbol.toStringTag, { value: "Module" }));
ee.install = function(e) {
  e.component(ee.name, ee);
};
const Tr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ee
}, Symbol.toStringTag, { value: "Module" })), Cr = "0.0.1", Pr = ["Base"], ot = /* @__PURE__ */ Object.assign({ "./Button/index.ts": Tr, "./Button/src/Index.vue": $r }), ne = {};
for (const e in ot)
  if (/\.\/[A-Za-z]+\/index\.ts/.test(e)) {
    const t = e.split("./")[1].split("/")[0];
    Pr.find((n) => n === t) || (ne[t] = ot[e].default);
  }
const jt = function(e, t = {}) {
  Object.keys(ne).forEach((n) => {
    e.component(n, ne[n]);
  }), e.config.globalProperties.$shui = {
    size: t.size || "",
    prefix: t.prefix || ""
  };
};
typeof window < "u" && window.Vue && jt(window.Vue);
const Mr = {
  version: Cr,
  install: jt,
  ...ne
}, Fr = ne.Button;
export {
  Fr as Button,
  Mr as default
};
