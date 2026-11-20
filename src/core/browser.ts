/**
 * Script-tag build (dist/bento.iife.js). Exposes everything on `window.BentoUI`
 * and starts the behaviours as soon as it loads.
 */
import { start } from './index';

export * from './index';

start();
