document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileNav = document.querySelector('.mobile-nav');
  
    mobileMenuIcon.addEventListener('click', function () {
      mobileMenuIcon.classList.toggle('active'); // Toggle the icon's active state
      mobileNav.classList.toggle('active'); // Toggle the mobile menu's active state
    });
  });
  