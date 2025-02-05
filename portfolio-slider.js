document.addEventListener("DOMContentLoaded", function () {
  const videoContainers = document.querySelectorAll(".video-container");
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const closeModal = document.querySelector(".close");

  videoContainers.forEach(container => {
      const video = container.querySelector(".video-thumb");

      // Play video on hover
      container.addEventListener("mouseenter", () => {
          video.play();
      });

      container.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
      });

      // Click to expand video in modal
      container.addEventListener("click", () => {
          modal.style.display = "block";
          modalVideo.src = video.src;
          modalVideo.play();
      });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      modalVideo.pause();
  });

  // Close modal when clicking outside content
  modal.addEventListener("click", (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
          modalVideo.pause();
      }
  });
});
