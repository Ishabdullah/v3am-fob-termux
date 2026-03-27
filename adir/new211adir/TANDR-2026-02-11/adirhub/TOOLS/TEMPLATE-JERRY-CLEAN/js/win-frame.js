/* ============================================================
   win-frame.js — Standalone Reusable Window Chrome v1
   No dependencies. No Agent Four specifics.
   Works with any content element.

   Usage:
     var win = new WinFrame({
       title:   'My Window',
       width:   480,
       height:  360,
       top:     40,
       left:    40,
       content: someElement,   // optional DOM node to put inside
       onClose: function() {}  // optional callback
     });
     document.body.appendChild(win.el);

   API:
     win.setTitle(str)
     win.setContent(el)
     win.moveTo(x, y)
     win.snapTo('tr'|'tl'|'br'|'bl')
     win.resize(w, h)
     win.toggleMobile()
     win.copyContent()
     win.screenshot()
     win.minimize()
     win.close()
     win.bringToFront()
   ============================================================ */

(function (global) {
    'use strict';

    var Z = 8000;

    /* ── Shared mouse state for drag + resize ── */
    var active = null;   // { type:'drag'|'resize', win, dir, sx,sy, ox,oy,ow,oh }

    function disableIframes() {
        document.querySelectorAll('iframe').forEach(function (f) {
            f._wfPE = f.style.pointerEvents;
            f.style.pointerEvents = 'none';
        });
    }
    function enableIframes() {
        document.querySelectorAll('iframe').forEach(function (f) {
            f.style.pointerEvents = f._wfPE || '';
        });
    }

    document.addEventListener('mousemove', function (e) {
        if (!active) return;
        var dx = e.clientX - active.sx;
        var dy = e.clientY - active.sy;

        if (active.type === 'drag') {
            var x = Math.max(0, Math.min(active.ox + dx, window.innerWidth  - 60));
            var y = Math.max(0, Math.min(active.oy + dy, window.innerHeight - 30));
            active.win.el.style.left = x + 'px';
            active.win.el.style.top  = y + 'px';
            return;
        }

        if (active.type === 'resize') {
            var dir = active.dir;
            var el  = active.win.el;
            var nx  = active.ox;
            var ny  = active.oy;
            var nw  = active.ow;
            var nh  = active.oh;
            var minW = 180;
            var minH = 80;

            if (dir.indexOf('e') !== -1) nw = Math.max(minW, active.ow + dx);
            if (dir.indexOf('s') !== -1) nh = Math.max(minH, active.oh + dy);
            if (dir.indexOf('w') !== -1) {
                nw = Math.max(minW, active.ow - dx);
                if (nw !== minW) nx = active.ox + dx;
            }
            if (dir.indexOf('n') !== -1) {
                nh = Math.max(minH, active.oh - dy);
                if (nh !== minH) ny = active.oy + dy;
            }

            el.style.left   = nx + 'px';
            el.style.top    = ny + 'px';
            el.style.width  = nw + 'px';
            el.style.height = nh + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        if (!active) return;
        if (active.type === 'drag')   active.win.el.classList.remove('wf-dragging');
        if (active.type === 'resize') active.win.el.classList.remove('wf-resizing');
        active = null;
        enableIframes();
    });

    /* ── WinFrame constructor ── */
    function WinFrame(opts) {
        opts = opts || {};
        this._mobile = false;

        /* Root element */
        var el = document.createElement('div');
        el.className = 'wf-window';
        el.style.cssText = [
            'left:'   + (opts.left   !== undefined ? opts.left   : 40)  + 'px',
            'top:'    + (opts.top    !== undefined ? opts.top    : 40)   + 'px',
            'width:'  + (opts.width  !== undefined ? opts.width  : 480)  + 'px',
            'height:' + (opts.height !== undefined ? opts.height : 360)  + 'px',
            'z-index:' + (++Z)
        ].join(';');
        this.el = el;

        /* Titlebar */
        var tb   = document.createElement('div');
        tb.className = 'wf-titlebar';
        this._tb = tb;

        var titleEl = document.createElement('span');
        titleEl.className = 'wf-title';
        titleEl.textContent = opts.title || 'Window';
        this._titleEl = titleEl;

        var btns = document.createElement('div');
        btns.className = 'wf-btns';

        var self = this;

        var mobBtn  = this._mkBtn('📱', 'wf-btn-mobile',  'Mobile view',  function () { self.toggleMobile(); });
        var copyBtn = this._mkBtn('⧉',  'wf-btn-copy',   'Copy content', function () { self.copyContent(); });
        var shotBtn = this._mkBtn('📷', 'wf-btn-shot',   'Screenshot',   function () { self.screenshot(); });
        var minBtn  = this._mkBtn('─',  'wf-btn-min',    'Minimize',     function () { self.minimize(); });
        var clsBtn  = this._mkBtn('✕',  'wf-btn-close',  'Close',        function () { self.close(); });

        this._mobBtn = mobBtn;
        btns.appendChild(mobBtn);
        btns.appendChild(copyBtn);
        btns.appendChild(shotBtn);
        btns.appendChild(minBtn);
        btns.appendChild(clsBtn);

        tb.appendChild(titleEl);
        tb.appendChild(btns);

        /* Drag on titlebar */
        tb.addEventListener('mousedown', function (e) {
            if (e.target.closest('.wf-btns')) return;
            var r = el.getBoundingClientRect();
            active = { type:'drag', win:self, sx:e.clientX, sy:e.clientY, ox:r.left, oy:r.top };
            el.style.zIndex = ++Z;
            el.classList.add('wf-dragging');
            disableIframes();
            e.preventDefault();
        });

        /* Content area */
        var content = document.createElement('div');
        content.className = 'wf-content';
        this._content = content;

        if (opts.content) content.appendChild(opts.content);

        /* Resize handles — 8 directions */
        var dirs = ['n','s','e','w','ne','nw','se','sw'];
        dirs.forEach(function (dir) {
            var h = document.createElement('div');
            h.className = 'wf-resize-handle wf-r' + dir;
            h.addEventListener('mousedown', function (e) {
                var r  = el.getBoundingClientRect();
                active = {
                    type:'resize', win:self, dir:dir,
                    sx:e.clientX, sy:e.clientY,
                    ox:r.left, oy:r.top, ow:r.width, oh:r.height
                };
                el.style.zIndex = ++Z;
                el.classList.add('wf-resizing');
                disableIframes();
                e.preventDefault();
                e.stopPropagation();
            });
            el.appendChild(h);
        });

        el.appendChild(tb);
        el.appendChild(content);

        this._onClose = opts.onClose || null;

        /* Click to bring to front */
        el.addEventListener('mousedown', function () {
            el.style.zIndex = ++Z;
        });
    }

    /* ── Internal button factory ── */
    WinFrame.prototype._mkBtn = function (icon, cls, title, cb) {
        var b = document.createElement('button');
        b.className = 'wf-btn ' + cls;
        b.textContent = icon;
        b.title = title;
        b.addEventListener('click', cb);
        return b;
    };

    /* ── Public API ── */

    WinFrame.prototype.setTitle = function (str) {
        this._titleEl.textContent = str;
    };

    WinFrame.prototype.setContent = function (el) {
        this._content.innerHTML = '';
        if (el) this._content.appendChild(el);
    };

    WinFrame.prototype.moveTo = function (x, y) {
        this.el.style.left = x + 'px';
        this.el.style.top  = y + 'px';
    };

    WinFrame.prototype.snapTo = function (corner) {
        var w   = this.el.offsetWidth  || 480;
        var h   = this.el.offsetHeight || 360;
        var vw  = window.innerWidth;
        var vh  = window.innerHeight;
        var pad = 10;
        var pos = {
            tr: [vw - w - pad, pad          ],
            tl: [pad,           pad          ],
            br: [vw - w - pad, vh - h - pad ],
            bl: [pad,           vh - h - pad ]
        }[corner] || [vw - w - pad, pad];
        this.moveTo(pos[0], pos[1]);
    };

    WinFrame.prototype.resize = function (w, h) {
        this.el.style.width  = w + 'px';
        this.el.style.height = h + 'px';
    };

    WinFrame.prototype.toggleMobile = function () {
        this._mobile = !this._mobile;
        this._content.classList.toggle('wf-mobile', this._mobile);
        this._mobBtn.classList.toggle('active', this._mobile);
        this._mobBtn.title = this._mobile ? 'Exit mobile view' : 'Mobile view';
    };

    WinFrame.prototype.copyContent = function () {
        var text = this._content.innerText || this._content.textContent || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                console.log('[WinFrame] Copied ' + text.length + ' chars');
            });
        } else {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity  = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
        /* Flash the button */
        var btn = this._content.closest('.wf-window').querySelector('.wf-btn-copy');
        if (btn) { btn.textContent = '✓'; setTimeout(function(){ btn.textContent = '⧉'; }, 1000); }
    };

    WinFrame.prototype.screenshot = function () {
        /* Uses the Vision Bridge — falls back to opening the screenshot in a new tab */
        var bridgeUrl = 'http://127.0.0.1:40001/screenshot';
        window.open(bridgeUrl, '_blank');
    };

    WinFrame.prototype.minimize = function () {
        this.el.classList.toggle('wf-minimized');
    };

    WinFrame.prototype.bringToFront = function () {
        this.el.style.zIndex = ++Z;
    };

    WinFrame.prototype.close = function () {
        if (this._onClose) this._onClose();
        this.el.remove();
    };

    /* ── Expose globally ── */
    global.WinFrame = WinFrame;

}(window));
