// Main JS for small portfolio site
// Adds projects, simple interactions, and micro-animations

const projects = [
  {
    id: 'tirtorrent',
    title: 'TirTorrent - A lightweight torrent client',
    desc: 'A fast torrent client using .NET 8.0 for downloading torrents without extra stuff.',
    link: 'https://example.com',
    thumb: 'resources/screenshots/tirtorrent.png',
    screenshots: ['resources/projects/atomic-1.jpg','resources/projects/atomic-2.jpg']
  },
  {
    id: 'petafly',
    title: 'Petafly - A console app for file transfer with high speeds',
    desc: 'An app to share files over local networks with solid speeds and minimal setup for internet sharing (powered by Ngrok).',
    link: 'https://stopscams.example',
    thumb: 'resources/screenshots/petafly.png',
    screenshots: ['resources/projects/stopscams-1.jpg','resources/projects/stopscams-2.jpg']
  },
  {
    id: 'nebulosa',
    title: 'Nebulosa - A web app to manage cloud storage.',
    desc: 'Access your files from anywhere around the world, From the web or from the Desktop App (In development).',
    link: '#',
    thumb: 'resources/screenshots/nebulosa.png',
    screenshots: ['resources/projects/tooling-1.jpg']
  },
  {
    id: 'proxybtc',
    title: 'ProxyBTC - Buy Bitcoin Without Verification',
    desc: 'We handle the verification process for you. Send us your payment, and we will deliver Bitcoin directly to your wallet - simple, secure, and private.',
    link: '#',
    thumb: 'resources/screenshots/proxybtc.png',
    screenshots: ['resources/projects/tooling-1.jpg']
  },
  {
    id: 'channelmud',
    title: 'Channel Mud Game - Unfinished Roguelike Game based on Channel Mud Characters',
    desc: 'A game made in Unity based on the Channel Mud universe.',
    link: '#',
    thumb: 'resources/screenshots/channelmud.png',
    screenshots: ['resources/projects/tooling-1.jpg']
  },
  {
    id: 'schoolday',
    title: 'School Day - Unfinished 3D Game about throwing aluminum balls at students',
    desc: 'A game made in Unity based on a joke in our high school.',
    link: '#',
    thumb: 'resources/screenshots/schoolday.png',
    screenshots: ['resources/projects/tooling-1.jpg']
  }
];

function injectProjects(){
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  projects.forEach((p, i) => {
    const el = document.createElement('article');
    el.className = 'project';
    el.innerHTML = `
      <div class="project-thumb">
        <img src="${p.thumb}" alt="${p.title}">
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    `;

    // wire details button
    el.querySelector('button[data-project-id]')?.addEventListener('click', ()=>openProjectModal(p));

    grid.appendChild(el);
  });
}

// Modal state
let modalState = {index:0, shots:[]};

function openProjectModal(project){
  const overlay = document.getElementById('projectModal');
  const img = overlay.querySelector('.modal-carousel img');
  const title = overlay.querySelector('.modal-info h3');
  const desc = overlay.querySelector('.modal-info p');
  const live = overlay.querySelector('#modalLive');
  modalState.shots = project.screenshots || [];
  modalState.index = 0;
  title.textContent = project.title;
  desc.textContent = project.desc;
  if(live) live.href = project.link || '#';
  img.src = modalState.shots[0] || project.thumb;
  overlay.classList.add('open');
  overlay.style.display = 'flex';
}

function closeProjectModal(){
  const overlay = document.getElementById('projectModal');
  overlay.classList.remove('open');
  overlay.style.display = 'none';
}

function showProjectImage(dir){
  if(!modalState.shots.length) return;
  modalState.index = (modalState.index + dir + modalState.shots.length) % modalState.shots.length;
  const overlay = document.getElementById('projectModal');
  overlay.querySelector('.modal-carousel img').src = modalState.shots[modalState.index];
}

function updateYear(){
  document.getElementById('year').textContent = new Date().getFullYear();
}

// Small counter animation
function animateCounters(){
  document.querySelectorAll('.num').forEach(el => {
    const target = +el.getAttribute('data-value') || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const id = setInterval(()=>{
      current += step;
      if(current >= target){
        el.textContent = target;
        clearInterval(id);
      } else {
        el.textContent = current;
      }
    }, 18 + Math.random()*20);
  });
}

// Simple menu toggle for small screens
function wireMenu(){
  const btn = document.getElementById('menuToggle');
  btn.addEventListener('click', ()=>{
    document.querySelector('.nav').classList.toggle('open');
  });
}

// Light form feedback
function wireForm(){
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit', (e)=>{
    const name = document.getElementById('name').value.trim();
    msg.textContent = '';
    if(!name){
      msg.textContent = 'Please add your name.';return;
    }
    msg.textContent = 'Thanks — message sent (demo).';
    setTimeout(()=>msg.textContent='', 3000);
  });
}

// small prefers-reduced-motion support
function prefersReducedMotion(){
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// entry
document.addEventListener('DOMContentLoaded', ()=>{
  injectProjects();
  updateYear();
  wireMenu();
  wireForm();
  if(!prefersReducedMotion()) animateCounters();

  // small subtle tilt on avatar
  const av = document.getElementById('avatar');
  if(av){
    let t = 0;
    setInterval(()=>{
      t += 0.02;
      av.style.transform = `translateY(-8px) rotate(${Math.sin(t)*3}deg)`;
    }, 80);
  }

  // modal wiring
  const overlay = document.getElementById('projectModal');
  if(overlay){
    overlay.querySelector('.modal-close')?.addEventListener('click', closeProjectModal);
    overlay.addEventListener('click', (e)=>{
      if(e.target === overlay) closeProjectModal();
    });
    const prev = document.getElementById('prevShot');
    const next = document.getElementById('nextShot');
    prev?.addEventListener('click', ()=>showProjectImage(-1));
    next?.addEventListener('click', ()=>showProjectImage(1));
  }

  // contact button removed — contact section now at page bottom

});
