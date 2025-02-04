class PortfolioSlider {
  constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.navigation = document.getElementById('portfolioNav');
      this.loadingOverlay = document.getElementById('portfolioLoadingOverlay');
      this.currentSlide = 0;
      this.isTransitioning = false;
      this.isPaused = false;
      this.timer = null;

      this.portfolioItems = [
          {
              title: "Project One",
              description: "A revolutionary web application",
              videoUrl: "assets/images/project-sanic-video.mp4",
              liveUrl: "https://project1.com",
              duration: 5000
          },
          {
              title: "Project Two",
              description: "Mobile-first e-commerce platform",
              videoUrl: "path/to/your/video2.mp4",
              liveUrl: "https://project2.com",
              duration: 5000
          },
          {
              title: "Project Three",
              description: "Interactive dashboard",
              videoUrl: "path/to/your/video3.mp4",
              liveUrl: "https://project3.com",
              duration: 5000
          }
      ];

      this.init();
  }

  init() {
      this.portfolioItems.forEach((item, index) => {
          this.createSlide(item, index);
          this.createNavigationDot(index);
      });

      this.showSlide(0, true);
  }

  createSlide(item, index) {
      const slide = document.createElement('div');
      slide.className = `portfolio-slide ${index === 0 ? 'portfolio-slide--active' : ''}`;
      slide.innerHTML = `
          <div class="portfolio-video-container">
              <video
                  class="portfolio-video"
                  src="${item.videoUrl}"
                  muted
                  loop
                  preload="auto"
              ></video>
              <div class="portfolio-blur-overlay">
                  <div class="portfolio-content">
                      <h2 class="portfolio-title">${item.title}</h2>
                      <p class="portfolio-description">${item.description}</p>
                      <a href="${item.liveUrl}" class="portfolio-link" target="_blank">View Live Site</a>
                  </div>
              </div>
          </div>
      `;
      this.container.appendChild(slide);

      const video = slide.querySelector('.portfolio-video');
      const videoContainer = slide.querySelector('.portfolio-video-container');
      const blurOverlay = slide.querySelector('.portfolio-blur-overlay');
      const progress = this.navigation.querySelectorAll('.portfolio-progress')[index];

      videoContainer.addEventListener('mouseenter', () => {
          this.isPaused = true;
          video.pause();
          progress.style.animationPlayState = 'paused';
          clearTimeout(this.timer);
          blurOverlay.style.opacity = '1';
          blurOverlay.style.backdropFilter = 'blur(8px)';
      });

      videoContainer.addEventListener('mouseleave', () => {
          this.isPaused = false;
          video.play();
          progress.style.animationPlayState = 'running';
          this.resumeProgress();
          blurOverlay.style.opacity = '0';
          blurOverlay.style.backdropFilter = 'blur(0px)';
      });

      video.addEventListener('loadstart', () => {
          this.loadingOverlay.style.display = 'flex';
      });

      video.addEventListener('canplay', () => {
          this.loadingOverlay.style.display = 'none';
          if (index === this.currentSlide) {
              video.play();
          }
      });
  }

  resumeProgress() {
      const remainingDuration = this.portfolioItems[this.currentSlide].duration;
      this.timer = setTimeout(() => {
          if (!this.isPaused) {
              this.showSlide((this.currentSlide + 1) % this.portfolioItems.length);
          }
      }, remainingDuration);
  }

  createNavigationDot(index) {
      const dot = document.createElement('div');
      dot.className = `portfolio-dot ${index === 0 ? 'portfolio-dot--active' : ''}`;
      dot.innerHTML = '<div class="portfolio-progress"></div>';
      dot.addEventListener('click', () => this.showSlide(index));
      this.navigation.appendChild(dot);
  }

  showSlide(index, autoStart = false) {
      if (this.isTransitioning && !autoStart) return;
      this.isTransitioning = true;

      clearTimeout(this.timer);

      const slides = this.container.querySelectorAll('.portfolio-slide');
      const videos = this.container.querySelectorAll('.portfolio-video');
      const dots = this.navigation.querySelectorAll('.portfolio-dot');
      const progresses = this.navigation.querySelectorAll('.portfolio-progress');

      progresses.forEach(progress => {
          progress.style.width = '0';
      });

      slides[this.currentSlide].classList.remove('portfolio-slide--active');
      dots[this.currentSlide].classList.remove('portfolio-dot--active');

      slides[index].classList.add('portfolio-slide--active');
      dots[index].classList.add('portfolio-dot--active');

      videos[this.currentSlide].pause();

      videos[index].currentTime = 0;
      videos[index].play();

      const progress = dots[index].querySelector('.portfolio-progress');
      progress.style.transition = `width ${this.portfolioItems[index].duration}ms linear`;
      progress.style.width = '100%';

      this.timer = setTimeout(() => {
          this.showSlide((index + 1) % this.portfolioItems.length);
      }, this.portfolioItems[index].duration);

      this.currentSlide = index;
      this.isTransitioning = false;
      this.isPaused = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const slider = new PortfolioSlider('portfolioSlider');
});
