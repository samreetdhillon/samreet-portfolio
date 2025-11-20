/* script.js
 - Smooth scrolling for navigation
 - Side dots hover label already handled by CSS; we implement click-to-scroll
*/

document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Side dots click -> scroll
  document.querySelectorAll('.side-dots .dot').forEach(function(dot){
    dot.addEventListener('click', function(){
      const targetSel = this.dataset.target;
      const target = document.querySelector(targetSel);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Make the active top nav link reflect current scroll position
  const navLinks = document.querySelectorAll('.nav a');
  const sections = Array.from(document.querySelectorAll('main section'));
  function onScroll(){
    const pos = window.scrollY + window.innerHeight/3;
    let current = sections[0];
    for(const s of sections){
      if(s.offsetTop <= pos) current = s;
    }
    navLinks.forEach(l=> l.classList.toggle('active', document.querySelector(l.getAttribute('href')) === current));
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});