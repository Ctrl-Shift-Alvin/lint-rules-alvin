import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import { RuleTester } from '@typescript-eslint/rule-tester';
import {
	after as mochaAfter,
	afterEach as mochaAfterEach,
	before as mochaBefore,
	beforeEach as mochaBeforeEach,
	describe as mochaDescribe,
	it as mochaIt
} from 'mocha';

register(
	'ts-node/esm',
	pathToFileURL('./')
);

RuleTester.afterAll = mochaAfter;
RuleTester.afterEach = mochaAfterEach;
RuleTester.beforeAll = mochaBefore;
RuleTester.beforeEach = mochaBeforeEach;
RuleTester.describe = mochaDescribe;
RuleTester.describeOnly = mochaDescribe.only.bind(mochaDescribe);
RuleTester.describeSkip = mochaDescribe.skip.bind(mochaDescribe);
RuleTester.it = mochaIt;
RuleTester.itOnly = mochaIt.only.bind(mochaIt);
RuleTester.itSkip = mochaIt.skip.bind(mochaIt);

