// Page behaviour — same logic as the original inline script.

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  if (mobileMenu.classList.contains('active')) {
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  } else {
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  }
});

// ========== GOOGLE ADS CONVERSION TRACKING ==========
// Event snippet for "Clique WhatsApp (1)": records the conversion, then opens WhatsApp.
// Off the production domain (window.CS_TRACKING false) the link opens directly.
// A short fallback opens the link even if gtag never calls back (e.g. blocked by an ad blocker).
function gtagReportConversion(url) {
  let opened = false;
  const open = () => {
    if (opened) return;
    opened = true;
    window.open(url, '_blank', 'noopener');
  };

  if (!window.CS_TRACKING || typeof window.gtag !== 'function') {
    open();
    return false;
  }

  window.gtag('event', 'conversion', {
    send_to: 'AW-17141670851/mvQGCPvC8ukbEMPH5O0_',
    event_callback: open,
  });
  setTimeout(open, 1000);
  return false;
}

// GA4 event that the original's Site Kit plugin (content-events provider) sends for every
// WhatsApp contact link click.
function trackContactLinkClick() {
  if (!window.CS_TRACKING || typeof window.gtag !== 'function') return;
  window.gtag('event', 'contact_link_click', {
    link_type: 'whatsapp',
    transport_type: 'beacon',
    event_source: 'site-kit',
  });
}

// Intercepts every WhatsApp link click and records it as a conversion
document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    trackContactLinkClick();
    gtagReportConversion(link.getAttribute('href'));
  });
});
