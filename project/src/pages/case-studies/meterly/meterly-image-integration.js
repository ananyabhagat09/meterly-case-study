(() => {
  const galleries = [
    {
      id: 'prototype',
      className: 'meterly-prototype-gallery',
      title: 'Digital prototype views',
      images: [
        { source: '/assets/images/13 copy.png', alt: 'Meterly final app screens showing location, payment, route, fare, language, and QR code interfaces' },
        { source: '/assets/images/14 copy.png', alt: 'Meterly physical prototype mounted inside an auto-rickshaw' }
      ]
    },
  ];

  const reviewPhotos = {
    className: 'meterly-review-photos',
    title: '',
    images: [
      { source: '/images/case-study/Section 12: Physical Prototype/Untitled_design copy.png', alt: 'Close-up of the Meterly prototype housing and screen' },
      { source: '/images/case-study/Section 12: Physical Prototype/The_design_process_began_by_closely_observing_and_sketching_the_existing_auto_ri copy.png', alt: 'Meterly prototype installed inside an auto-rickshaw' }
    ]
  }; 

  const styles = `
    .meterly-final-screens {
      width: min(100%, 1200px);
      margin: 64px auto 0;
      padding: 0 24px;
      box-sizing: border-box;
      color: inherit;
    }
    .meterly-review-photos {
      width: 100%;
      max-width: none;
      margin-top: 48px;
      padding: 0;
    }
    .portfolio-link { display: none !important; }
    .meterly-persona-reference,
    .meterly-reviews-reference {
      display: block;
      width: 100%;
      height: auto;
      margin: 0 auto;
    }
    .meterly-final-screens__title {
      margin: 0 0 24px;
      color: #e2aa2b;
      font-size: clamp(1.5rem, 3vw, 2.4rem);
      line-height: 1.2;
      text-align: center;
    }
    .meterly-final-screens__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 32px;
    }
    .meterly-final-screens__figure {
      margin: 0;
      overflow: hidden;
      border: 1px solid rgba(226, 170, 43, .42);
      border-radius: 8px;
      background: #101010;
      cursor: zoom-in;
      transition: border-color .2s ease, transform .2s ease;
    }
    .meterly-final-screens__figure:hover,
    .meterly-final-screens__figure:focus-within {
      border-color: #e2aa2b;
      transform: translateY(-2px);
    }
    .meterly-final-screens__image {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
    .meterly-lightbox {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 24px;
      background: rgba(0, 0, 0, .9);
    }
    .meterly-lightbox[hidden] { display: none; }
    .meterly-lightbox__image {
      display: block;
      max-width: min(1489px, 94vw);
      max-height: 90vh;
      width: auto;
      height: auto;
      object-fit: contain;
    }
    .meterly-lightbox__close {
      position: absolute;
      top: 16px;
      right: 20px;
      border: 1px solid #e2aa2b;
      border-radius: 999px;
      padding: 8px 14px;
      color: #fff;
      background: #151515;
      font: inherit;
      cursor: pointer;
    }
    @media (max-width: 640px) {
      .meterly-final-screens { margin-top: 40px; padding: 0 16px; }
      .meterly-final-screens__grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      .meterly-lightbox { padding: 12px; }
    }
  `;

  const addStyles = () => {
    if (document.getElementById('meterly-image-integration-styles')) return;
    const style = document.createElement('style');
    style.id = 'meterly-image-integration-styles';
    style.textContent = styles;
    document.head.appendChild(style);
  };

  const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'meterly-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML = '<button class="meterly-lightbox__close" type="button" aria-label="Close image">Close</button><img class="meterly-lightbox__image" alt="Expanded Meterly final screen artwork">';
    document.body.appendChild(lightbox);

    const close = () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    };
    lightbox.querySelector('.meterly-lightbox__close').addEventListener('click', close);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.hidden) close();
    });

    return (source) => {
      lightbox.querySelector('.meterly-lightbox__image').src = source;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.meterly-lightbox__close').focus();
    };
  };

  const renderGallery = (target, gallery, openLightbox) => {
    if (target.querySelector(`.${gallery.className}`)) return;
    const section = document.createElement('div');
    section.className = `meterly-final-screens ${gallery.className}`;
    if (gallery.title) section.setAttribute('aria-labelledby', `${gallery.className}-title`);
    section.innerHTML = `${gallery.title ? `<h3 class="meterly-final-screens__title" id="${gallery.className}-title">${gallery.title}</h3>` : ''}<div class="meterly-final-screens__grid"></div>`;
    const grid = section.querySelector('.meterly-final-screens__grid');

    gallery.images.forEach(({ source, alt }) => {
      const figure = document.createElement('figure');
      figure.className = 'meterly-final-screens__figure';
      figure.tabIndex = 0;
      figure.innerHTML = `<img class="meterly-final-screens__image" src="${source}" alt="${alt}" loading="lazy">`;
      const open = () => openLightbox(source);
      figure.addEventListener('click', open);
      figure.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      });
      grid.appendChild(figure);
    });

    target.appendChild(section);
  };

  const replacePersonaSection = () => {
    const personas = document.getElementById('personas');
    const heading = personas?.querySelector('.section-heading');
    if (!personas || !heading || personas.dataset.meterlyPersonaReplaced === 'true') return;

    const image = document.createElement('img');
    image.className = 'meterly-persona-reference';
    image.src = '/images/case-study/Section 10: Concept Sketches & Digital Prototype/image.png';
    image.alt = 'User personas for Ramesh Yadav and Priya Sharma';
    image.decoding = 'async';
    personas.replaceChildren(heading, image);
    personas.dataset.meterlyPersonaReplaced = 'true';
  };

  const replaceReviewsSection = () => {
    const reviews = document.getElementById('reviews');
    const heading = reviews?.querySelector('.section-heading');
    if (!reviews || !heading || reviews.dataset.meterlyReviewsReplaced === 'true') return;

    const image = document.createElement('img');
    image.className = 'meterly-reviews-reference';
    image.src = '/images/case-study/Section 10: Concept Sketches & Digital Prototype/image copy.png';
    image.alt = 'Thoughts on the low-fidelity prototype and the path toward high-fidelity design';
    image.decoding = 'async';
    reviews.replaceChildren(heading, image);
    reviews.dataset.meterlyReviewsReplaced = 'true';
  };

  const refineLayout = () => {
    replacePersonaSection();
    replaceReviewsSection();
    document.querySelector('.portfolio-link')?.remove();
    const reviews = document.getElementById('reviews');
    const columns = reviews?.querySelector('.two-column');
    if (!columns || columns.dataset.meterlyRefined === 'true') return;

    const placeholder = columns.firstElementChild;
    const thoughts = columns.lastElementChild;
    placeholder?.remove();
    if (thoughts) columns.prepend(thoughts);
    columns.dataset.meterlyRefined = 'true';
  };

  const render = () => {
    const reviewsTarget = document.getElementById('reviews');
    const targets = galleries.map((gallery) => ({ gallery, target: document.getElementById(gallery.id) }));
    if (!reviewsTarget || targets.some(({ target }) => !target)) return false;

    addStyles();
    const openLightbox = createLightbox();
    targets.forEach(({ gallery, target }) => renderGallery(target, gallery, openLightbox));
    refineLayout();
    renderGallery(reviewsTarget, reviewPhotos, openLightbox);
    return true;
  };

  const start = () => {
    if (render()) return;
    const observer = new MutationObserver(() => {
      if (render()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 10000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
