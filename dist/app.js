const dialog = document.querySelector('#inquiry');
document.querySelectorAll('[data-inquire]').forEach(button => button.addEventListener('click', () => { dialog.showModal(); }));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => { const open = document.querySelector('nav').classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { document.querySelector('nav').classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu'); }));
