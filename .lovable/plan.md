

## Improvements to Portfolio Website

### 1. About Me Section
Add a short "About" blurb section between the bio paragraph and the section cards grid. This will be a simple bordered card (matching the existing style) with a brief personal paragraph covering interests, background, and what drives you -- giving visitors a more personal connection beyond the resume-style bio.

### 2. Relevant Courses Section Card
Add a new "Courses" SectionCard (with `disableGlitch`) containing two items:
- **Computer Science** -- tags like: Intro to CS, Data Structures & Algorithms, Discrete Math, etc.
- **Biology** -- tags like: Intro to Biology, Molecular Biology, Genetics, etc.

This mirrors the Skills card format (tag-based, no glitch).

### 3. Expanded Skills Section
Update the Skills data to include Python, Napari, and other tools:
- **Languages & Frameworks**: add Python
- **Tools & Platforms**: add Napari, Figma, Git/Linux as appropriate

### 4. UX Improvements
- **Keyboard navigation**: Escape closes modal, Left/Right arrow keys navigate between items
- **Backdrop click to close**: Clicking outside the modal content dismisses it
- **Mobile audit**: Ensure the now 6-card grid (3 rows x 2 columns on desktop) and footer look good on small screens

### 5. Grid Layout Update
The grid currently has 4 items (2x2). With 6 items (Experience, Projects, Skills, Courses, LeetCode, About Me), it becomes a clean 3x2 grid on desktop.

---

### Technical Details

**File: `src/pages/Index.tsx`**

- Add `courseItems` data array with two entries (CS and Biology), each using `tags`
- Update `skillItems` to add Python, Napari, and other tools
- Add an `aboutItems` data array with a single item containing a personal description
- Update the grid to render 6 cards:
  1. Experience
  2. Projects
  3. Skills (disableGlitch)
  4. Courses (disableGlitch)
  5. LeetCode
  6. About Me (disableGlitch, single-item card -- or a simple static card)

**File: `src/components/SectionCard.tsx`**

- Add `useEffect` for keyboard event listeners (Escape to close, ArrowLeft/ArrowRight for prev/next)
- Add `onClick` handler on the backdrop overlay (outside the modal content) to trigger `closeModal`

**No new files or dependencies needed.**
