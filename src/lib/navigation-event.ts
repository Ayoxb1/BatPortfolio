/**
 * Event bus for dock navigation and fluid section presentation animations
 */
export const NAVIGATE_EVENT = 'portfolio:section-navigate';

export function triggerSectionNavigation(sectionId: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(NAVIGATE_EVENT, { detail: { sectionId } })
    );
  }
}

export function onSectionNavigate(sectionId: string, callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<{ sectionId: string }>;
    if (customEvent.detail?.sectionId === sectionId) {
      callback();
    }
  };
  window.addEventListener(NAVIGATE_EVENT, handler);
  return () => window.removeEventListener(NAVIGATE_EVENT, handler);
}
