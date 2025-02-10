document.querySelector('a[href="#contact"]').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default anchor behavior
  window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' // Smooth scrolling
  });
});


const features = [
  {
    title: "Design & Development",
    description: `"send me your location"<br>
gone are the days when having a website was just a nice-to-have. you need a digital "location" to reach a broader audience and stay competitive. in this digital age, if you're not online—do you even exist?<br><br>
<span class="expanded-service-item">website design & development</span>
<span class="expanded-service-item">e-commerce solutions</span>
<span class="expanded-service-item">ui/ux design</span>
<span class="expanded-service-item">digital product / app </span>
<span class="expanded-service-item">website maintenance & support</span>`,
    imagePath: "assets/images/web-development-white-glossy.png"
  },
  {
    title: "Growth & Visibility Marketing",
    description: `"loyalty, not traffic"<br>
    to reach a wider audience in this vast and dynamic digital world, a one-size-fits-all approach doesn’t work.
    we combine data-driven insights with creative, human-centered approaches,
    tailored to your unique needs. at the core of our strategy is community— through authentic communication
    that connects with your audiences and nurtures lasting loyalty.<br><br>
<span class="expanded-service-item">Search Engine Optimization (SEO)</span>
<span class="expanded-service-item">SEO Audits & Strategy</span>
<span class="expanded-service-item">Pay Per Click (PPC)</span>
<span class="expanded-service-item">Google Ads</span>
<span class="expanded-service-item">Google Shopping Ads</span>
<span class="expanded-service-item">Meta Ads (Facebook/Instagram)</span>
<span class="expanded-service-item">Affiliate Marketing</span>
<span class="expanded-service-item">Email Marketing</span>
<span class="expanded-service-item">Copywriting & Brand Messaging</span>`,
      imagePath: "assets/images/growth-and-visibility-marketing-white-glossy.png"
  },
  {
      title: "Digital Automation Solutions",
      description: `"this is an intervention"<br>
you can't afford to waste any more time on tasks and processes that can be done with the push of a button.
we take the time to understand your business, offering strategic solutions and innovations that drive efficiency.
the choice is yours — keep up, get ahead, or get eaten alive if you don't automate.<br><br>
<span class="expanded-service-item">workflow automation</span>
<span class="expanded-service-item">crm & email marketing integrations</span>
<span class="expanded-service-item">AI-powered tools</span>
<span class="expanded-service-item">custom api development & integrations</span>
<span class="expanded-service-item">chatbots & customer service automation</span>
<span class="expanded-service-item">business intelligence & reporting</span>
<span class="expanded-service-item">inventory & supply chain automation</span>`,
      imagePath: "assets/images/automation-solutions-white-glossy.png"
  }
];

function createPlusIcon() {
  return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
  `;
}

function createCloseIcon() {
  return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
  `;
}

function createCard(feature, index) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
      <div class="card-icon">
          <div class="card-icon-wrapper">
              <img src="${feature.imagePath}" alt="${feature.title}" class="card-image">
              <div class="image-gradient"></div>
          </div>
      </div>
      <div class="card-content">
          <h3 class="card-title">${feature.title}</h3>
          <button class="expand-button" aria-label="Expand">
              ${createPlusIcon()}
          </button>
      </div>
      <div class="expanded-container">
          <div class="expanded">
              <div class="expanded-banner">
                  <button class="close-button" aria-label="Close">
                      ${createCloseIcon()}
                  </button>
              </div>
              <div class="expanded-description">
                  <h2 class="expanded-title">${feature.title}</h2>
                  <p>${feature.description}</p>
              </div>
          </div>
      </div>
  `;

  // Add event listeners
  const expandButton = card.querySelector('.expand-button');
  const closeButton = card.querySelector('.close-button');
  const expandedView = card.querySelector('.expanded');
  const stickyNavWrapper = document.querySelector('.digital-sticky-nav-wrapper'); // Grab the sticky nav element

  expandButton.addEventListener('click', () => {
      expandedView.classList.add('active');
      document.body.style.overflow = 'hidden';  // Disable body scroll
      stickyNavWrapper.style.display = 'none'; // Hide sticky nav
  });

  closeButton.addEventListener('click', () => {
      expandedView.classList.remove('active');
      document.body.style.overflow = '';  // Re-enable body scroll
      stickyNavWrapper.style.display = 'flex'; // Show sticky nav
  });

  return card;
}


// Initialize cards
const container = document.getElementById('cardContainer');
features.forEach((feature, index) => {
  container.appendChild(createCard(feature, index));
});
