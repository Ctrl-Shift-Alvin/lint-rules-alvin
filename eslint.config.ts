import { defineConfig, globalIgnores } from 'eslint/config';
import {
	base,
	json,
	stylistic,
	custom,
	typescript,
	importX
} from './eslint/configs/index';

export default defineConfig(
	globalIgnores(['**/*.d.ts']),
	base as any,
	typescript as any,
	importX as any,
	stylistic as any,
	json as any,
	custom as any
);