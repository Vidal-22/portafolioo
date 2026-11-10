"use client";

import { useSyncExternalStore } from "react";

function subscribeMQ(query) {
  return (cb) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

const reducedQuery = "(prefers-reduced-motion: reduce)";
const finePointerQuery = "(hover: hover) and (pointer: fine)";
const subReduced = subscribeMQ(reducedQuery);
const subFine = subscribeMQ(finePointerQuery);

/** true si el sistema pide movimiento reducido. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false
  );
}

/** true en dispositivos con ratón (no táctiles). */
export function useFinePointer() {
  return useSyncExternalStore(
    subFine,
    () => window.matchMedia(finePointerQuery).matches,
    () => false
  );
}
