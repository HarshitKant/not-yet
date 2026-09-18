const views = {
  watchlist: document.getElementById('watchlistView'),
  detail: document.getElementById('detailView'),
  simple: document.getElementById('simpleView')
};

const navLabels = {
  watchlist: ['Workspace', 'Watchlist', 'What changed while you waited?'],
  decisions: ['Workspace', 'Decisions', 'Your decision memory, in one place.'],
  signals: ['Workspace', 'Signals', 'Signals connected to your decisions.'],
  templates: ['Workspace', 'Templates', 'Turn recurring choices into durable decisions.']
};

const breadcrumb = document.getElementById('breadcrumb');
const modalBackdrop = document.getElementById('modalBackdrop');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

function setBreadcrumb(parent, current) {
  breadcrumb.innerHTML = `<span>${parent}</span><i>/</i><strong>${current}</strong>`;
}

function showView(name) {
  Object.values(views).forEach(view => view.classList.remove('active-view'));
  views[name].classList.add('active-view');
  const [parent, title, text] = navLabels[name] || ['Watchlist', 'AI voice interface', ''];
  setBreadcrumb(parent, title);
  if (name === 'simple') {
    document.getElementById('simpleViewTitle').textContent = title;
    document.getElementById('simpleViewText').textContent = text;
  }
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === (name === 'detail' ? 'watchlist' : title.toLowerCase())));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openModal(id) {
  modalBackdrop.classList.add('visible');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const firstInput = document.querySelector(`#${id} input`);
  if (firstInput) setTimeout(() => firstInput.focus(), 80);
}

function closeModal() {
  modalBackdrop.classList.remove('visible');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
}

document.querySelectorAll('[data-view]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const view = link.dataset.view;
    if (view === 'watchlist') showView('watchlist');
    else showView('simple');
  });
});

function openDetail() { showView('detail'); }
document.getElementById('voiceDecisionCard').addEventListener('click', event => {
  if (!event.target.closest('.card-review')) openDetail();
});
document.getElementById('voiceDecisionCard').addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetail(); }
});
document.querySelector('.card-review').addEventListener('click', event => { event.stopPropagation(); openModal('reevalModal'); });
document.getElementById('detailReviewBtn').addEventListener('click', () => openModal('reevalModal'));
document.getElementById('backToWatchlist').addEventListener('click', () => showView('watchlist'));

document.querySelectorAll('.open-decision').forEach(button => button.addEventListener('click', () => {
  showToast('This decision is still watching its conditions.');
}));

document.getElementById('newDecisionBtn').addEventListener('click', () => openModal('newDecisionModal'));
document.getElementById('inlineDecisionBtn').addEventListener('click', () => openModal('newDecisionModal'));
document.getElementById('showHowItWorks').addEventListener('click', () => openModal('howModal'));
document.getElementById('showAllBtn').addEventListener('click', () => showView('simple'));
document.getElementById('searchBtn').addEventListener('click', () => showToast('Search is ready when your decision history grows.'));
document.querySelector('.notification').addEventListener('click', () => showToast('1 decision is ready for a fresh look.'));

modalBackdrop.addEventListener('click', event => {
  if (event.target === modalBackdrop || event.target.closest('[data-close-modal]')) closeModal();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.getElementById('decisionForm').addEventListener('submit', event => {
  event.preventDefault();
  const title = document.getElementById('decisionName').value.trim();
  const reason = document.getElementById('decisionWhy').value.trim();
  const condition = document.getElementById('decisionCondition').value.trim();
  if (!title || !reason || !condition) return;
  const card = document.createElement('article');
  card.className = 'decision-card compact-card';
  card.innerHTML = `<div class="card-topline"><span class="signal-label watching">WATCHING</span><span class="card-date">Today</span><button class="more-button">•••</button></div><div class="compact-content"><div class="decision-icon enterprise-icon">○</div><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(reason)}</p></div></div><div class="compact-progress"><span><b>0</b> / 1 conditions met</span><div class="progress-line"><i style="width:4%"></i></div></div><div class="card-footer"><span>Watching <b>${escapeHtml(condition)}</b></span><button class="open-decision">Open <span>→</span></button></div>`;
  card.querySelector('.open-decision').addEventListener('click', () => showToast('Your new decision is now being watched.'));
  document.getElementById('decisionGrid').appendChild(card);
  event.target.reset();
  closeModal();
  showToast('Decision saved. The reason now has a future.');
});

document.getElementById('confirmReview').addEventListener('click', () => {
  closeModal();
  showView('detail');
  showToast('Re-evaluation opened. Original context is preserved.');
});

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}
