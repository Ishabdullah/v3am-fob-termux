/* ============================================================
   windows.js — Agent Four Chat Window Manager
   Depends on: win-frame.js (must load first)

   Decorates every .message bubble with a WinFrame when pinned.
   Bubbles stay in normal scroll flow until pinned.

   API (window.WM):
     WM.pin(id)              pin/unpin bubble
     WM.pinTo(id, corner)    snap pinned bubble to corner
     WM.pinLatest(corner)    pin most recent assistant bubble
     WM.closeAll()           unpin all, return to chat flow
     WM.newIframe(url, opts) floating iframe using WinFrame

   Shortcuts (for Agent Four script blocks in responses):
     window.pinLatest('tr')
     window.openBrowser('http://127.0.0.1:PORT/', opts)

   On page refresh: all pinned windows fall back to normal flow.
   ============================================================ */

(function () {
    'use strict';

    function WindowManager() {
        this.wins   = {};   // id -> { el, frame, ph, pinned }
        this._init();
    }

    var LS_KEY = 'wm_state_v1';

    WindowManager.prototype._init = function () {
        var self = this;
        var msgs = document.getElementById('messages');
        if (!msgs) { setTimeout(function(){ self._init(); }, 300); return; }

        msgs.querySelectorAll('.message').forEach(function(m){ self._decorate(m); });

        /* Restore saved state after all bubbles are decorated */
        self._restoreState();

        new MutationObserver(function(muts){
            muts.forEach(function(mut){
                mut.addedNodes.forEach(function(n){
                    if (n.nodeType===1 && n.classList.contains('message')) self._decorate(n);
                });
            });
        }).observe(msgs, { childList: true });

        /* Save state after every drag/resize ends */
        document.addEventListener('mouseup', function(){
            setTimeout(function(){ self._saveState(); }, 60);
        });
    };

    /* ── Persistence ── */

    WindowManager.prototype._saveState = function () {
        var state = [];
        var self  = this;
        var msgs  = document.querySelectorAll('#messages .message');

        Object.keys(this.wins).forEach(function(id){
            var s = self.wins[id];
            if (!s.pinned || !s.frame) return;

            /* Stable index = position in #messages NodeList */
            var idx = -1;
            msgs.forEach(function(m, i){ if (m._wmId === id) idx = i; });
            if (idx === -1) return;

            var el = s.frame.el;
            state.push({
                idx:    idx,
                left:   parseInt(el.style.left)   || 0,
                top:    parseInt(el.style.top)    || 0,
                width:  parseInt(el.style.width)  || 480,
                height: parseInt(el.style.height) || 360
            });
        });

        try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch(e){}
    };

    WindowManager.prototype._restoreState = function () {
        var raw;
        try { raw = localStorage.getItem(LS_KEY); } catch(e){ return; }
        if (!raw) return;

        var state;
        try { state = JSON.parse(raw); } catch(e){ return; }

        var self = this;
        var msgs = document.querySelectorAll('#messages .message');

        state.forEach(function(entry){
            var el = msgs[entry.idx];
            if (!el || !el._wmId) return;
            var id = el._wmId;
            self._pin(id);
            var s = self.wins[id];
            if (!s || !s.frame) return;
            /* Override position/size that _pin() set from getBoundingClientRect */
            s.frame.el.style.left   = entry.left   + 'px';
            s.frame.el.style.top    = entry.top    + 'px';
            s.frame.el.style.width  = entry.width  + 'px';
            s.frame.el.style.height = entry.height + 'px';
        });
    };

    WindowManager.prototype._decorate = function (el) {
        if (el._wmId) return;
        var id = 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2,5);
        el._wmId = id;

        /* Hover bar — appears on bubble hover, lives inside the bubble */
        var hbar = document.createElement('div');
        hbar.className = 'win-hbar';
        hbar.innerHTML =
            '<span class="win-hbar-label">' + (el.classList.contains('user') ? 'You' : 'Agent') + '</span>' +
            '<span class="win-hbar-btns">' +
            '<button class="win-hbtn win-hbtn-pin" title="Pin as window">📌</button>' +
            '</span>';
        el.insertBefore(hbar, el.firstChild);

        var self = this;
        hbar.querySelector('.win-hbtn-pin').addEventListener('click', function(){ self.pin(id); });

        this.wins[id] = { el:el, frame:null, ph:null, pinned:false };
    };

    WindowManager.prototype.pin = function (id) {
        var s = this.wins[id];
        if (!s) return;
        if (s.pinned) this._unpin(id); else this._pin(id);
    };

    WindowManager.prototype._pin = function (id) {
        var s   = this.wins[id];
        var el  = s.el;
        var r   = el.getBoundingClientRect();

        /* Placeholder keeps scroll position intact */
        var ph = document.createElement('div');
        ph.className = 'win-placeholder';
        ph.style.height = Math.max(44, r.height) + 'px';
        el.parentNode.insertBefore(ph, el);
        s.ph = ph;

        /* Detach bubble from DOM */
        el.remove();
        el.classList.add('wf-bubble-content');

        /* Wrap in a WinFrame */
        var label = el.classList.contains('user') ? 'You' : 'Agent';
        var frame = new WinFrame({
            title:   label + ' — ' + new Date().toLocaleTimeString(),
            width:   Math.max(320, r.width + 2),
            height:  Math.max(120, r.height + 44),
            left:    Math.max(0, r.left),
            top:     Math.max(0, r.top),
            content: el,
            onClose: function(){ this._unpin(id); }.bind(this)
        });

        document.body.appendChild(frame.el);
        s.frame  = frame;
        s.pinned = true;
        this._saveState();

        /* Update the hover bar pin button */
        var btn = el.querySelector('.win-hbtn-pin');
        if (btn) { btn.textContent = '📍'; btn.title = 'Unpin (return to chat)'; btn.classList.add('active'); }
    };

    WindowManager.prototype._unpin = function (id) {
        var s = this.wins[id];
        if (!s || !s.pinned) return;

        /* Retrieve bubble from WinFrame content */
        var el = s.el;
        el.classList.remove('wf-bubble-content');
        s.frame.el.remove();
        s.frame = null;

        /* Return to placeholder position */
        s.ph.parentNode.insertBefore(el, s.ph);
        s.ph.remove();
        s.ph = null;
        s.pinned = false;

        var btn = el.querySelector('.win-hbtn-pin');
        if (btn) { btn.textContent = '📌'; btn.title = 'Pin as window'; btn.classList.remove('active'); }
        this._saveState();
    };

    WindowManager.prototype.pinTo = function (id, corner) {
        var s = this.wins[id];
        if (!s) return;
        if (!s.pinned) this._pin(id);
        s.frame.snapTo(corner || 'tr');
    };

    WindowManager.prototype.pinLatest = function (corner) {
        var all = document.querySelectorAll('#messages .message.assistant');
        if (!all.length) return;
        var last = all[all.length-1];
        if (!last._wmId) return;
        this.pinTo(last._wmId, corner || 'tr');
    };

    WindowManager.prototype.closeAll = function () {
        var self = this;
        Object.keys(this.wins).forEach(function(id){
            if (self.wins[id].pinned) self._unpin(id);
        });
    };

    /* Spawn a floating iframe wrapped in WinFrame */
    WindowManager.prototype.newIframe = function (url, opts) {
        opts = opts || {};
        var frame = document.createElement('iframe');
        frame.src = url;
        frame.setAttribute('sandbox','allow-same-origin allow-scripts allow-forms allow-popups');
        frame.style.cssText = 'width:100%;height:100%;border:none;display:block;background:#fff;';

        var win = new WinFrame({
            title:   opts.title || url,
            width:   opts.width  || 520,
            height:  opts.height || 440,
            top:     opts.top    !== undefined ? opts.top   : 8,
            left:    opts.left   !== undefined ? opts.left  : (window.innerWidth - (opts.width||520) - 8),
            content: frame
        });
        document.body.appendChild(win.el);
        win.navigate = function(u){ frame.src = u; win.setTitle(u); };
        window.agentBrowser = win;
        return win;
    };

    /* ── Init ── */
    window.WM = new WindowManager();
    window.pinLatest   = function(c)     { window.WM.pinLatest(c); };
    window.openBrowser = function(u, o)  { return window.WM.newIframe(u, o); };

}());
