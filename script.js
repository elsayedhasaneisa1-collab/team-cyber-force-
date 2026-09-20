document.getElementById('logo').src = siteData.site.logo;
document.getElementById('site-name').textContent = siteData.site.name;
document.getElementById('site-desc').textContent = siteData.site.description;
document.documentElement.style.setProperty('--main-color', siteData.site.color);

const teamContainer = document.getElementById('team-container');
siteData.team.forEach(member => {
  teamContainer.innerHTML += `
    <div class="card">
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    </div>
  `;
});

const projectsContainer = document.getElementById('projects-container');
siteData.projects.forEach(project => {
  projectsContainer.innerHTML += `
    <div class="card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.link}">زيارة</a>
    </div>
  `;
});

document.getElementById('email').textContent = siteData.contact.email;