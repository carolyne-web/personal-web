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
