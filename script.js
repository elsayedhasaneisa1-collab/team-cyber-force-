// ============================================
//   🛡️ الحماية
// ============================================

let pressTimer = null;

document.addEventListener('touchstart', function(e) {
  pressTimer = setTimeout(function() {
    e.preventDefault();
  }, 500);
}, { passive: false });

document.addEventListener('touchend', function() {
  clearTimeout(pressTimer);
});

document.addEventListener('touchmove', function() {
  clearTimeout(pressTimer);
});

document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.addEventListener('dragstart', function(e) {
  e.preventDefault();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || e.keyCode === 123) {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
    e.preventDefault();
  }
  if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
    e.preventDefault();
  }
  if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
    e.preventDefault();
  }
});

// ============================================
//   🎨 عرض بيانات الموقع
// ============================================

// الهيدر
document.getElementById('logo').src = siteData.site.logo;
document.getElementById('site-name').textContent = siteData.site.name;
document.getElementById('site-desc').textContent = siteData.site.description;
document.documentElement.style.setProperty('--main-color', siteData.site.color);

// زر واتساب الرئيسي
const mainWa = document.getElementById('main-whatsapp');
mainWa.href = `https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent('مرحبا، عايز أتواصل مع الفريق')}`;

// ===== الخدمات =====
const servicesContainer = document.getElementById('services-container');
if (servicesContainer && siteData.services) {
  siteData.services.forEach((service, i) => {
    servicesContainer.innerHTML += `
      <div class="card service-card" style="transition-delay: ${i * 0.1}s">
        <div class="service-icon">${service.icon}</div>
        <h3>${service.title}</h3>
        <p class="role">${service.description}</p>
      </div>
    `;
  });
}

// ===== الفريق =====
const teamContainer = document.getElementById('team-container');
siteData.team.forEach((member, i) => {
  const waLink = member.whatsapp
    ? `https://wa.me/${member.whatsapp}?text=${encodeURIComponent('مرحبا ' + member.name + '، عايز أتواصل معاك')}`
    : '#';

  teamContainer.innerHTML += `
    <div class="card" style="transition-delay: ${i * 0.1}s">
      <img src="${member.image}" alt="${member.name}"
           onerror="this.src='https://via.placeholder.com/180/0d1420/00a3ff?text=${member.name[0]}'"
           draggable="false">
      <h3>${member.name}</h3>
      <p class="role">${member.role}</p>
      ${member.whatsapp ? `
        <a href="${waLink}" target="_blank" class="whatsapp-btn">💬 واتساب</a>
      ` : ''}
    </div>
  `;
});

// ===== المشاريع =====
const projectsContainer = document.getElementById('projects-container');
siteData.projects.forEach((project, i) => {
  projectsContainer.innerHTML += `
    <div class="card" style="transition-delay: ${i * 0.1}s">
      <h3>${project.title}</h3>
      <p class="role">${project.description}</p>
      ${project.link && project.link !== '#' ? `
        <a href="${project.link}" target="_blank" class="whatsapp-btn">🔗 زيارة</a>
      ` : ''}
    </div>
  `;
});

// ============================================
//   ✨ أنيميشن الظهور (بعد توليد الكروت)
// ============================================

// ننتظر شوية عشان الكروت تتولد الأول
setTimeout(() => {
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '50px'
  });

  cards.forEach(card => observer.observe(card));

  // احتياطي: لو الأنيميشن مشتغلش، نظهر الكروت بعد ثانية
  setTimeout(() => {
    cards.forEach(card => card.classList.add('visible'));
  }, 1000);

}, 100);

// ===== حماية إضافية للصور =====
document.querySelectorAll('img').forEach(img => {
  img.setAttribute('draggable', 'false');
  img.addEventListener('contextmenu', e => e.preventDefault());
  img.addEventListener('dragstart', e => e.preventDefault());
});