document.querySelectorAll('a[href="#contact"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const target = document.querySelector('#contact');
      const offset = target.offsetTop; // Get the top offset of the target element
      const scrollOffset = 100; // Adjust this value based on your layout

      window.scrollTo({
          top: offset - scrollOffset, // Subtract the offset to position the section correctly
          behavior: 'smooth' // Smooth scrolling effect
      });
  });
});

const features = [
  {
      title: "Web Design & Development",
      description: "specific purpose:p teams focus on what they do best: Planning, building, and shipping great products.",
      imagePath: "assets/images/web-design-development.png"
  },
  {
      title: "Designed to move fast",
      description: "Speed is at the core of our platform. We've optimized every aspect to ensure your team can work efficiently and effectively, without any unnecessary delays or complications.",
      imagePath: "/api/placeholder/400/320"
  },
  {
      title: "Crafted to perfection",
      description: "Every detail has been carefully considered and refined to create a seamless experience. Our platform combines powerful functionality with intuitive design.",
      imagePath: "/api/placeholder/400/320"
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
      <div class="expanded">
          <div class="expanded-banner">
              <button class="close-button" aria-label="Close">
                  ${createCloseIcon()}
              </button>
              <div class="expanded-icon">
                  <div class="expanded-icon-wrapper">
                      <img src="${feature.imagePath}" alt="${feature.title}" class="expanded-image">
                      <div class="image-gradient"></div>
                  </div>
              </div>
              <div class="expanded-content">
                  <h2 class="expanded-title">${feature.title}</h2>
              </div>
          </div>
          <div class="expanded-description">
              <p>${feature.description}</p>
          </div>
      </div>
  `;

  // Add event listeners
  const expandButton = card.querySelector('.expand-button');
  const closeButton = card.querySelector('.close-button');
  const expandedView = card.querySelector('.expanded');

  expandButton.addEventListener('click', () => {
      expandedView.classList.add('active');
      document.body.style.overflow = 'hidden';
  });

  closeButton.addEventListener('click', () => {
      expandedView.classList.remove('active');
      document.body.style.overflow = '';
  });

  return card;
}

// Initialize cards
const container = document.getElementById('cardContainer');
features.forEach((feature, index) => {
  container.appendChild(createCard(feature, index));
});
