
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('in'); }
  });
},{threshold:.12});
reveals.forEach(el=>observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card=>{
      card.classList.toggle('hidden', filter !== 'All' && card.dataset.filter !== filter);
    });
  });
});

function openModal(id){
  const modal = document.getElementById(id);
  if(modal){
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(modal){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click', ()=> openModal(card.dataset.modal));
});
document.querySelectorAll('[data-close]').forEach(btn=>{
  btn.addEventListener('click', (e)=> closeModal(e.target.closest('.modal')));
});
document.querySelectorAll('.modal').forEach(modal=>{
  modal.addEventListener('click', (e)=>{
    if(e.target === modal){ closeModal(modal); }
  });
});
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    document.querySelectorAll('.modal.open').forEach(closeModal);
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if(menuToggle){
  menuToggle.addEventListener('click', ()=> nav.classList.toggle('open'));
}


// subtle hero card interaction
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('pointermove', e => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    const base = card.classList.contains('hero-card-top') ? 'rotate(-2.5deg)' : card.classList.contains('hero-card-bottom') ? 'rotate(2.5deg)' : '';
    card.style.transform = `${base} perspective(800px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-2px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});
