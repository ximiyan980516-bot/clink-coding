/**
 * square-grid.js
 * 方块马赛克动效（Canvas 2D）— 交互增强版
 *
 * 默认静息态：白色背景上仅有少量方块以极低透明度点缀（idleVisibleRatio）。
 * 鼠标划过时：光标附近的方块随机闪烁点亮（flicker），远离光标后逐渐熄灭。
 * 方块之间无缝隙（cellGap: 0）、无圆角（cornerRadius: 0），且尺寸更小更密集。
 *
 * 用法：
 *   const grid = new SquareGrid(canvasEl, {
 *     density: 900,                    // 网格方块数量（近似值，越大方块越小）
 *     palette: ['#FB8120','#F691DF'], // 方块配色（做插值取色）
 *     loop: true                      // 静息可见方块是否做缓慢呼吸
 *   });
 *   grid.start();
 *   grid.setPalette([...]); grid.setDensity(1200); // 动态切换
 *   grid.destroy();
 */
(function (global) {
  'use strict';

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(v) { return Math.max(0, Math.min(1, v)); }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
    if (!m) return { r: 255, g: 255, b: 255 };
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
  }

  function mixColor(hexA, hexB, t) {
    const a = hexToRgb(hexA), b = hexToRgb(hexB);
    const r = Math.round(lerp(a.r, b.r, t));
    const g = Math.round(lerp(a.g, b.g, t));
    const bl = Math.round(lerp(a.b, b.b, t));
    return `${r},${g},${bl}`;
  }

  class SquareGrid {
    constructor(canvas, options) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.opts = Object.assign({
        density: 900,
        palette: ['#FB8120', '#F691DF'],
        growDuration: 900,
        maxStagger: 1200,
        loop: true,
        cellGap: 0,
        cornerRadius: 0,
        idleVisibleRatio: 0.07,
        idleAlpha: [1, 1],
        pulseSpeed: [5200, 9000],
        hoverRadius: 160,
        hoverAlpha: [1, 1],
        flickerChance: 0.045,
        flickerCooldown: 900,
        flickerDecay: 0.94
      }, options || {});

      this._running = false;
      this._rafId = null;
      this._startTime = 0;
      this._cells = [];
      this._dpr = Math.min(window.devicePixelRatio || 1, 2);
      this._reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this._mouseX = -9999;
      this._mouseY = -9999;
      this._mouseActive = false;

      this._onResize = this._onResize.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._tick = this._tick.bind(this);

      this._resizeObserver = null;
      if (typeof ResizeObserver !== 'undefined') {
        this._resizeObserver = new ResizeObserver(() => this._onResize());
        this._resizeObserver.observe(canvas);
      } else {
        window.addEventListener('resize', this._onResize);
      }

      window.addEventListener('mousemove', this._onMouseMove, { passive: true });

      this._onResize();
      this._generateCells();
    }

    _onResize() {
      const rect = this.canvas.getBoundingClientRect();
      this._w = Math.max(1, rect.width);
      this._h = Math.max(1, rect.height);
      this.canvas.width = this._w * this._dpr;
      this.canvas.height = this._h * this._dpr;
      this.ctx.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
      if (this._cells.length) this._generateCells();
    }

    _onMouseMove(e) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        this._mouseActive = false;
        return;
      }
      this._mouseX = x;
      this._mouseY = y;
      this._mouseActive = true;
    }

    _generateCells() {
      const count = this.opts.density;
      const w = this._w, h = this._h;
      const cols = Math.max(6, Math.round(Math.sqrt(count * (w / h))));
      const rows = Math.max(6, Math.ceil(count / cols));
      const cellW = w / cols, cellH = h / rows;
      const cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: c * cellW,
            y: r * cellH,
            w: cellW,
            h: cellH,
            cx: c * cellW + cellW / 2,
            cy: r * cellH + cellH / 2,
            colorT: Math.random(),
            delay: Math.random() * this.opts.maxStagger,
            phase: Math.random() * Math.PI * 2,
            pulseDur: lerp(this.opts.pulseSpeed[0], this.opts.pulseSpeed[1], Math.random()),
            idleVisible: Math.random() < this.opts.idleVisibleRatio,
            idleA: lerp(this.opts.idleAlpha[0], this.opts.idleAlpha[1], Math.random()),
            flashAlpha: 0,
            flashTarget: 0,
            flashCooldownUntil: 0
          });
        }
      }
      this._cells = cells;
    }

    setPalette(palette) {
      this.opts.palette = palette;
    }

    setDensity(density) {
      this.opts.density = density;
      this._startTime = performance.now();
      this._generateCells();
    }

    /* 重新播放入场动画：重置起始时间，使所有静息可见方块重新走一遍
       延迟 + 淡入的生长过程，用于 Human/AI Agents 切换时的入场效果 */
    replay() {
      this._startTime = performance.now();
    }

    start() {
      if (this._running) return;
      this._running = true;
      this._startTime = performance.now();
      if (this._reducedMotion) {
        this._drawStatic();
        return;
      }
      this._rafId = requestAnimationFrame(this._tick);
    }

    stop() {
      this._running = false;
      if (this._rafId) cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    destroy() {
      this.stop();
      if (this._resizeObserver) this._resizeObserver.disconnect();
      else window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
    }

    _drawCell(cell, alpha, blur) {
      if (alpha <= 0.002) return;
      const ctx = this.ctx;
      const gap = this.opts.cellGap;
      const rx = this.opts.cornerRadius;
      const w = Math.max(0, cell.w - gap), h = Math.max(0, cell.h - gap);
      const x = cell.x + gap / 2, y = cell.y + gap / 2;

      const [c1, c2] = this.opts.palette;
      const rgb = mixColor(c1, c2, cell.colorT);
      const fill = `rgba(${rgb},${alpha})`;
      ctx.save();
      // 横向动感模糊：仅向左右两侧延展出渐隐的水平拖影，模拟运动模糊，
      // 而不是四周均匀外扩的辉光；方块本体始终保持满饱和纯色，不叠加透明度
      if (blur > 0.5) {
        const streak = blur * 2.6;
        const streakAlpha = Math.min(0.55, alpha * 0.5);
        const leftGrad = ctx.createLinearGradient(x - streak, 0, x, 0);
        leftGrad.addColorStop(0, `rgba(${rgb},0)`);
        leftGrad.addColorStop(1, `rgba(${rgb},${streakAlpha})`);
        ctx.fillStyle = leftGrad;
        ctx.fillRect(x - streak, y, streak, h);

        const rightGrad = ctx.createLinearGradient(x + w, 0, x + w + streak, 0);
        rightGrad.addColorStop(0, `rgba(${rgb},${streakAlpha})`);
        rightGrad.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = rightGrad;
        ctx.fillRect(x + w, y, streak, h);
      }
      ctx.fillStyle = fill;
      if (rx > 0 && ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, rx);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, w, h);
      }
      ctx.restore();
    }

    _drawStatic() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this._w, this._h);
      this._cells.forEach(cell => {
        if (cell.idleVisible) this._drawCell(cell, cell.idleA, cell.idleA * 6);
      });
    }

    _tick(now) {
      if (!this._running) return;
      const elapsed = now - this._startTime;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this._w, this._h);

      const mx = this._mouseX, my = this._mouseY;
      const radius = this.opts.hoverRadius;
      const mouseActive = this._mouseActive;

      this._cells.forEach(cell => {
        const entrance = clamp01((elapsed - cell.delay) / this.opts.growDuration);
        const eEnt = easeOutCubic(entrance);

        // 静息态：仅少量方块可见，保持高饱和纯色，配合呼吸节奏产生动感模糊辉光
        let idlePart = 0;
        let pulse = 0;
        if (cell.idleVisible) {
          idlePart = eEnt * cell.idleA;
          if (this.opts.loop) {
            const pulseT = (((now * 0.001 * 1000) + cell.phase * 1000) % cell.pulseDur) / cell.pulseDur;
            pulse = (Math.sin(pulseT * Math.PI * 2) + 1) / 2;
            idlePart = eEnt * cell.idleA;
          }
        }

        // 鼠标划过：邻近方块低频、柔和地随机点亮（带冷却，避免高频闪烁）
        if (mouseActive) {
          const dx = cell.cx - mx, dy = cell.cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius && now > cell.flashCooldownUntil) {
            const proximity = 1 - dist / radius;
            if (Math.random() < this.opts.flickerChance * proximity) {
              cell.flashTarget = lerp(this.opts.hoverAlpha[0], this.opts.hoverAlpha[1], proximity);
              cell.flashCooldownUntil = now + this.opts.flickerCooldown + Math.random() * 600;
            }
          }
        }

        // 柔和过渡：缓慢上升到目标亮度，再按衰减系数缓慢熄灭
        cell.flashAlpha = lerp(cell.flashAlpha, cell.flashTarget, 0.06);
        cell.flashTarget *= this.opts.flickerDecay;

        let alpha = Math.max(idlePart, cell.flashAlpha);
        // 动感模糊辉光：静息呼吸的波峰 + 鼠标点亮的闪烁都会放大模糊半径，
        // 制造类似运动光斑的效果，方块本身始终保持满饱和纯色
        const blur = alpha > 0.002
          ? lerp(2, 16, pulse) + cell.flashAlpha * 22
          : 0;

        this._drawCell(cell, alpha, blur);

        if (cell.flashAlpha < 0.003) {
          cell.flashAlpha = 0;
          cell.flashTarget = 0;
        }
      });

      this._rafId = requestAnimationFrame(this._tick);
    }
  }

  global.SquareGrid = SquareGrid;
})(window);
