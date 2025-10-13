import type { Linter } from 'eslint';

/**
 * ESLint preset for Astro/React with JavaScript.
 *
 * This package uses ESLint's flat config format, so the preset is an array
 * of flat-config items.
 */
export declare const astroReact: readonly Linter.Config[];

/**
 * ESLint preset for Astro/React with TypeScript.
 */
export declare const astroReactTs: readonly Linter.Config[];