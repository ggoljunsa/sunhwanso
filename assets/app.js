/* ============================================
   순환소 · Sunhwanso — Shared app logic
   ============================================ */
window.Sunhwanso = (function () {
  const D = window.SUNHWANSO_DATA;

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function getItem(id) {
    return D.items[id] || null;
  }

  function listItems(category) {
    const items = Object.values(D.items);
    if (!category || category === "전체") return items;
    return items.filter((it) => it.category === category);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function badgeClass(style) {
    if (style === "today") return "card__badge card__badge--mustard";
    return "card__badge";
  }
  function badgeLabel(style, stock) {
    if (style === "hot") return "인기";
    if (style === "today") return "당일";
    if (style === "new") return "NEW";
    return "재고 " + stock;
  }

  function renderGrid(targetId, category) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const items = listItems(category);
    if (items.length === 0) {
      target.innerHTML =
        '<div class="empty" style="grid-column:1/-1"><div class="empty__icon">🌱</div>' +
        '<div class="empty__title">이 카테고리는 아직 비어있어요.</div>' +
        '<div class="empty__desc">곧 새 이야기가 채워집니다.</div></div>';
      return;
    }
    target.innerHTML = items
      .map(
        (it) => `
      <a class="card" href="story.html?id=${it.id}">
        <div class="card__media">
          <span class="${badgeClass(it.badgeStyle)}">${badgeLabel(it.badgeStyle, it.stock)}</span>
          <span>${it.emoji}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${escapeHtml(it.name)} · ${escapeHtml(it.size)}</div>
          <div class="card__story">${escapeHtml(it.storyBadge)}</div>
        </div>
      </a>`
      )
      .join("");
  }

  function bindChips(chipSelector, gridId) {
    const chips = document.querySelectorAll(chipSelector);
    chips.forEach((c) => {
      c.addEventListener("click", () => {
        chips.forEach((x) => x.classList.remove("is-active"));
        c.classList.add("is-active");
        const cat = c.dataset.cat || "전체";
        renderGrid(gridId, cat);
      });
    });
  }

  function showToast(text, ms) {
    let t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = text;
    requestAnimationFrame(() => t.classList.add("is-show"));
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => t.classList.remove("is-show"), ms || 2400);
  }

  return {
    qs,
    getItem,
    listItems,
    renderGrid,
    bindChips,
    showToast,
    meta: D.meta,
    spots: D.spots
  };
})();
