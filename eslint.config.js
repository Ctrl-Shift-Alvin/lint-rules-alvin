import { defineConfig, globalIgnores } from 'eslint/config';
import {
	base,
	importX,
	json,
	stylistic,
	custom
} from './eslint/configs/index.js';

export default defineConfig(
	globalIgnores(['**/*.d.ts']),
	base,
	importX,
	stylistic,
	json,
	custom
);