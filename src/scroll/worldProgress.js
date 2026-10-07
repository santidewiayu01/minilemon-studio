import { useSyncExternalStore } from "react";

// ------------------------------------------------------------------
// Single source of truth for "where in the living world is the
// visitor". Three related but distinct values live here:
//
//   - `progress`   global 0→1 across the ENTIRE world span (top of
//                   the first chapter to the bottom of the last).
//                   ScrollWorld's finale pull-back reads this.
//   - `chapters`   per-chapter 0→1, keyed by chapter id, running from
//                   the moment a chapter's section enters the
//                   viewport (0) to the moment it fully leaves (1).
//                   This is what an individual chapter's own motion
//                   (card float, horizontal drift, reveal stagger)
//                   should read — it's local, so it doesn't have to
//                   care where it sits in the overall journey.
//   - `chapterId`  whichever chapter is currently front-and-center
//                   (crossing the viewport's vertical middle). Useful
//                   for anything that needs to know "what chapter is
//                   the visitor in RIGHT NOW" without doing its own
//                   hit-testing (e.g. a future progress rail).
//
// Plain module-scoped state + pub/sub on purpose, NOT React state:
// these values change every scroll frame, and funnelling that
// through setState would re-render the whole tree at 60fps. GSAP-
// driven visuals should call the subscribe/get functions directly
// inside their own ScrollTrigger/rAF work. The `use*` hooks exist
// only for the rare bit of UI that actually needs to re-render off
// of one of these.
// ------------------------------------------------------------------
let progress = 0;
let chapterId = null;
let chapterProgress = {};
const listeners = new Set();

const emit = () => {
  const snapshot = { progress, chapterId, chapters: chapterProgress };
  listeners.forEach((cb) => cb(snapshot));
};

export function setWorldProgress(next) {
  progress = next;
  emit();
}

export function setChapterProgress(id, value) {
  if (chapterProgress[id] === value) return;
  chapterProgress = { ...chapterProgress, [id]: value };
  emit();
}

export function setActiveChapter(id) {
  if (chapterId === id) return;
  chapterId = id;
  emit();
}

export function getWorldProgress() {
  return { progress, chapterId, chapters: chapterProgress };
}

export function getChapterProgress(id) {
  return chapterProgress[id] ?? 0;
}

export function getActiveChapter() {
  return chapterId;
}

export function subscribeWorldProgress(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/** React-state version, for UI that should genuinely re-render on scroll. */
export function useWorldProgress() {
  return useSyncExternalStore(subscribeWorldProgress, getWorldProgress, getWorldProgress);
}

/** Re-renders only when the given chapter's local progress changes value. */
export function useChapterProgress(id) {
  const snapshot = useSyncExternalStore(subscribeWorldProgress, getWorldProgress, getWorldProgress);
  return snapshot.chapters[id] ?? 0;
}

/** Re-renders only when the active chapter id changes. */
export function useActiveChapter() {
  const snapshot = useSyncExternalStore(subscribeWorldProgress, getWorldProgress, getWorldProgress);
  return snapshot.chapterId;
}
