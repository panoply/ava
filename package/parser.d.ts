import { ExecutionContext } from 'ava';
import { IAST, INode } from '@liquify/liquid-parser';
export { c as css, h as html, e as js, j as json, d as jsonc, f as jsx, l as liquid, m as md, b as sass, s as scss, t as ts, g as tsx, x as xhtml, a as xml, y as yaml } from './literals-a9155960.js';

type TestContext = ExecutionContext<unknown>;
interface DevCallback {
    (source: string): void | Promise<{
        /**
         * Repeat the test function to simulate a persisted environment
         * like that found in text-editors when formatting onSave.
         */
        repeat: number;
        /**
         * Provide the AST
         */
        ast: IAST;
        /**
         * Whether or not to log output of each repeat
         */
        logger?: boolean;
        /**
         * A callback function to run after repeats finished
         */
        finish: () => void;
    }>;
}
/**
 * Dev Mode (Liquid Parser)
 *
 * Development utility which read a sample file or string input and
 * provides operations to run in the test instance.
 */
declare const dev: (t: TestContext) => (sample: string | DevCallback, callback: DevCallback) => Promise<void>;

type StackProps = Array<'scope' | 'objects' | 'arguments' | 'filters'>;
declare const explore: {
    ast: any;
    stack(props?: StackProps, callback?: (ast: INode) => void): any;
    /**
     * Parse Errors
     *
     * Returns readable diagnostic errors for inspecting
     * the parse operations.
     */
    errors: (t: ExecutionContext<unknown>) => (ast: IAST) => void;
};

type SnippetCallback = (sample: string, meta?: {
    /**
     * The number of samples provided
     */
    size: number;
    /**
     * Whether or not this is the last items
     */
    last: boolean;
    /**
     * The current index
     */
    index: number;
    /**
     * The current sample string tokens split at delimiters
     */
    tokens: string[];
}) => void;
/**
 * For Each Snippet (Liquid Parser)
 *
 * Accepts an array list of code sample snippets and
 * returns a curried function callback for each sample in the list.
 */
declare const forSnippet: (samples: string[]) => (callback: SnippetCallback) => void;
/**
 * For Each Sample (Liquid Parser)
 *
 * Reads a sample file in the provided `dir` and returns the
 * contents in a callback function.
 */
declare const forSample: (dir: string) => (files: string[], callback: (source: string, label?: string & {
    description: string;
}) => void) => Promise<void>;

/**
 * Get Sample
 *
 * Reads the file at the provided `sample` path
 * and returns it as a string.
 */
declare const getSample: (sample: string) => Promise<string>;

export { dev, explore, forSample, forSnippet, getSample };
