document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const circles = document.querySelectorAll('.circle');
  
  function getRandomColor(page) {
      let hue;
      switch(page) {
          case 'kesfet':
              return `hsl(${Math.random() * 60 + 180}, 70%, 80%)`; // Soft colors
          case 'hakkimda':
              hue = Math.random() * 60 + 180; // Blue hues
              break;
          case 'oner':
              hue = Math.random() * 60 + 90; // Green hues
              break;
          default:
              hue = Math.random() * 360;
      }
      return `hsl(${hue}, 100%, 70%)`;
  }

  function moveCircle(circle) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 200;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      circle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  }

  const currentPage = window.location.pathname.split('/').pop().split('.')[0];

  circles.forEach(circle => {
      // Set initial gradient
      const color1 = getRandomColor(currentPage);
      const color2 = getRandomColor(currentPage);
      circle.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;

      // Continuous movement and color change
      function updateCircle() {
          const currentColor1 = circle.style.background.match(/hsl$$[\d.]+,\s*[\d.]+%,\s*[\d.]+%$$/g)[0];
          const currentColor2 = circle.style.background.match(/hsl$$[\d.]+,\s*[\d.]+%,\s*[\d.]+%$$/g)[1];
          const newColor1 = getRandomColor(currentPage);
          const newColor2 = getRandomColor(currentPage);
          
          circle.style.background = `linear-gradient(45deg, ${currentColor1}, ${currentColor2})`;
          
          // Animate to new colors
          circle.animate([
              { background: `linear-gradient(45deg, ${currentColor1}, ${currentColor2})` },
              { background: `linear-gradient(45deg, ${newColor1}, ${newColor2})` }
          ], {
              duration: 10000,
              easing: 'ease-in-out',
              fill: 'forwards'
          });

          moveCircle(circle);
          setTimeout(updateCircle, Math.random() * 10000 + 10000);
      }

      updateCircle();
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
});