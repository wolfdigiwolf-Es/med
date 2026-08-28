import gsap from 'gsap';

/**
 * GSAP Cinematic Animation Utilities for World Medical Pro
 */

// Stagger entrance for dashboard / page cards
export const animateCardsEntrance = (containerSelector: string | HTMLElement, itemSelector: string = '.gsap-card') => {
  if (typeof window === 'undefined') return;

  const target = typeof containerSelector === 'string' 
    ? document.querySelector(containerSelector) 
    : containerSelector;

  if (!target) return;

  const items = target.querySelectorAll(itemSelector);
  if (!items || items.length === 0) return;

  gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 24,
      scale: 0.97
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.65,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'transform'
    }
  );
};

// Smooth numeric counter animation with GSAP
export const animateNumber = (
  targetRef: HTMLElement | null,
  targetValue: number,
  duration: number = 1.2,
  prefix: string = '',
  suffix: string = ''
) => {
  if (!targetRef) return;

  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      if (targetRef) {
        targetRef.innerText = `${prefix}${Math.round(obj.val).toLocaleString('fr-FR')}${suffix}`;
      }
    }
  });
};

// Cinematic pulse for 2D ECG waves & radar indicators
export const animateECGWave = (svgElement: SVGElement | null) => {
  if (!svgElement) return;

  gsap.to(svgElement, {
    strokeDashoffset: 0,
    duration: 2,
    repeat: -1,
    ease: 'none'
  });
};

// Cinematic modal reveal
export const animateModalReveal = (modalElement: HTMLElement | null) => {
  if (!modalElement) return;

  gsap.fromTo(
    modalElement,
    {
      opacity: 0,
      scale: 0.94,
      y: 16
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(1.4)'
    }
  );
};
