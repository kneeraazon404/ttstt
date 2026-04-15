import { useSyncExternalStore } from "react";

/**
 * Returns `true` on the client after hydration, `false` during SSR.
 *
 * Uses `useSyncExternalStore` — the React 18 idiomatic approach for
 * client-only rendering that satisfies the `react-hooks/set-state-in-effect`
 * rule and works correctly with concurrent features and Suspense.
 */
export function useIsClient(): boolean {
    return useSyncExternalStore(
        () => () => {},   // subscribe: no external store, never changes
        () => true,       // getSnapshot (client)
        () => false       // getServerSnapshot
    );
}
