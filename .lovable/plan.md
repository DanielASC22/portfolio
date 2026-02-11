

## Add Transitions to Section Card Modals

### What changes
1. **Modal open animation** -- When clicking a project/experience, the modal will fade and scale in smoothly instead of appearing instantly.
2. **Item-to-item transition** -- When clicking Prev/Next, the body content will fade out and back in to create a smooth transition between items.
3. **Glitch effect on the title only** -- The item title in the modal header will use the `MonoGlitch` component to scramble into the new title when navigating between items. The body content (description, bullets, tags, etc.) will NOT use the glitch effect.
4. **Respects `disableGlitch` prop** -- Skills cards (which have `disableGlitch` set) will skip the glitch on the title and just show plain text.

### Technical details

**File: `src/components/SectionCard.tsx`**

- Import `MonoGlitch` component
- Add a `contentKey` state that tracks transitions -- use a CSS fade animation triggered by a key change on the body content wrapper
- Wrap the modal overlay with `animate-fade-in` class for the open animation
- Render the modal title as `<MonoGlitch text={item.title} />` when `disableGlitch` is false, otherwise render plain text
- Add a `key={activeIndex}` on the scrollable content div so React re-mounts it with a fade-in animation on each item change
- Add a CSS transition class (`animate-fade-in`) to the content area, keyed to `activeIndex`, so the body fades in when switching items

No new dependencies needed -- uses existing `MonoGlitch` component and existing `animate-fade-in` Tailwind animation.

