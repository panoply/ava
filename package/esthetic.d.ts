import { HighlightOptions } from 'cli-highlight';
import { Rules } from 'esthetic';
export { c as css, h as html, e as js, j as json, d as jsonc, f as jsx, l as liquid, m as md, b as sass, s as scss, t as ts, g as tsx, x as xhtml, a as xml, y as yaml } from './literals-a9155960.js';

interface DevCallback {
    (source: string, highlight: (source: string, options?: HighlightOptions) => string): void | Promise<{
        /**
         * Repeat the test function to simulate a persisted environment
         * like that found in text-editors when formatting onSave.
         */
        repeat?: number;
        /**
         * Whether or not output should be highlighted
         */
        colors?: boolean;
        /**
         * Provide the output source which was beautified
         */
        source: string;
        /**
         * Whether or not to log output of each repeat
         */
        logger?: boolean;
        /**
         * Whether or not to log the output at the end cycle.
         */
        inspect?: boolean;
        /**
         * A callback function to run after repeats finished
         */
        finish: () => void;
    }>;
}
/**
 * Dev Mode (Æsthetic)
 *
 * Development mode for Æsthetic which provides invokes a workable test mode within AVA.
 * Requires sample code be provided in a `dev.txt` file.
 *
 * @example
 *
 * import test from 'ava'
 * import { dev } from '@liquify/ava/esthetic'
 * import esthetic from 'esthetic'
 *
 * dev(function())
 */
declare const dev: (sample: string | DevCallback, callback: DevCallback) => void;

/**
 * For Sample (Æsthetic)
 *
 * Accepts an array string list of code samples. This test runner is typically applying
 * snapshot assertion and used to ensure correct structures are generated.
 *
 * @example
 *
 * import test from 'ava'
 * import { forSample, html } from '@liquify/ava/esthetic'
 * import esthetic from 'esthetic'
 *
 * test('Example Test', async t => {
 *
 *   forSample([
 *      html`
 *
 *        <div id="xxx"></div>
 *
 *      `,
 *      html`
 *
 *        <ul><li>Another Sample</li></ul>
 *
 *      `
 *   ])({
 *    language: 'html',
 *    markup: {
 *      forceAttribute: true
 *    }
 *   })(async function(source, rules, label) {
 *
 *     t.log(this.size) // number of samples
 *     t.log(this.index) // index reference of sample running
 *     t.log(this.last) // whether or not this is the last sample
 *
 *     const output = await esthetic.format(source, rules)
 *
 *     if (this.last) t.log('last sample') // example of using the last value
 *
 *     t.snapshot(output, label)
 *
 *   })
 *
 * })
 *
 */
declare const forSample: {
    (samples: string[]): (rules: Rules) => (callback: (this: {
        /**
         * The number of samples provided
         */
        size: number;
        /**
          * The current index
          */
        index: number;
        /**
         * Whether or not we are iterating a ruleset
         */
        last: boolean;
    }, source: string, rules: Rules, label: string) => void) => Promise<void>;
    /**
     * For Sample Files (Æsthetic)
     *
     * Indentical to `forSample` but can be used to resolve sample files located in a
     * sub-directory named `samples` relative to the test file in execution. This test
     * runner is typically applying snapshot assertion and used to ensure correct structures
     * are generated.
     *
     * @example
     * import test from 'ava'
     * import { forSample, html } from '@liquify/ava/esthetic'
     * import esthetic from 'esthetic'
     *
     * test('Example Test', async t => {
     *
     *   forSample.files([
     *     'example-sample.txt' // resolving to ./samples/*
     *     'another-sample.txt' // resolving to ./samples/*
     *   ])({
     *    language: 'html',
     *    markup: {
     *      forceAttribute: true
     *    }
     *   })(async function(source, rules, label) {
     *
     *     t.log(this.size) // number of samples
     *     t.log(this.index) // index reference of sample running
     *     t.log(this.last) // whether or not this is the last sample
     *
     *     const output = await esthetic.format(source, rules)
     *
     *     if (this.last) t.log('last sample') // example of using the last value
     *
     *     t.snapshot(output, label)
     *
     *   })
     *
     * })
     *
     */
    files(samples: string[]): (rules: Rules) => (callback: (this: {
        /**
         * The number of samples provided
         */
        size: number;
        /**
          * The current index
          */
        index: number;
        /**
         * Whether or not we are iterating a ruleset
         */
        last: boolean;
    }, source: string, rules: Rules, label: string) => void) => Promise<void>;
};

/**
 * For Assert (Æsthetic)
 *
 * Accepts an array string list of actual/expected assertions,
 * Where index[0] equates to `actual` and index[1] equates to `expected`.
 *
 * @example
 *
 * import test from 'ava'
 * import { forAssert, liquid } from '@liquify/ava/esthetic'
 *
 * test('Example Test', async t => {
 *
 *   forSample(
 *    [
 *      [
 *        liquid`{{actual}}`,
 *        liquid`{{ actual }}`
 *      ],
 *      [
 *        liquid`
 *          {% if x %} Hello World {% endif %}
 *        `,
 *        liquid`
 *         {% if x %}
 *           Hello World
 *         {% endif %}
 *        `
 *      ]
 *    ]
 *   )(async function(input, expect) {
 *
 *     t.log(this.size) // number of samples
 *     t.log(this.index) // index reference of sample running
 *     t.log(this.last) // whether or not this is the last sample
 *
 *     const actual = esthetic.format.sync(input, {
 *       language: 'liquid',
 *       liquid: {
 *         normalizeSpacing: true
 *       }
 *     });
 *
 *     // The beautified result must match index[1] in the
 *     // samples array list.
 *     t.deepEqual(actual, expect);
 *
 *   })
 *
 * })
 */
declare const forAssert: (samples: string[][]) => (callback: (this: {
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
}, actual: string, expect: string) => void) => void;
/**
 * For Rule (Æsthetic)
 *
 * Accepts a string sample value and an various rules to apply on each provided
 * sample. The execution order is **sample** > **rule** so for each sample all
 * rules provided will be return in the callback cycle.
 *
 * @example
 *
 * import test from 'ava'
 * import { forRules, html } from '@liquify/ava/esthetic'
 * import esthetic from 'esthetic'
 *
 * test('Example Test', async t => {
 *
 *  forRules([
 *      html`
 *
 *        <div id="xxx"></div>
 *
 *      `,
 *      html`
 *
 *        <div id="xxx" class="test" data-attr="foo"></div>
 *
 *      `
 *   ])([
 *     {
 *       language: 'html',
 *       markup: {
 *        forceAttribute: true
 *       }
 *     },
 *     {
 *       language: 'html',
 *       markup: {
 *        forceAttribute: 2
 *       }
 *     },
 *     {
 *       language: 'html',
 *       markup: {
 *        forceAttribute: false
 *       }
 *     },
 *  ])(async function(sample, rules, label) {
 *
 *     t.log(this.size) // number of samples
 *     t.log(this.indexSample) // the index reference of sample running
 *     t.log(this.indexRule) // the index reference of ruleset
 *
 *     const output = await esthetic.format(sample, rules)
 *
 *     if (this.isRule) t.log('running a rule') // prints when executing a rule
 *
 *     t.snapshot(output, label)
 *
 *   })
 *
 * })
 *
 */
declare const forRule: {
    (samples: string[]): (rules: Rules[]) => (callback: (this: {
        /**
         * The number of samples and rules
         */
        size: {
            /**
             * The amount of samples provided
             */
            samples: number;
            /**
             * The amount of rules provided
             */
            rules: number;
        };
        /**
          * The index references in iteration
          */
        index: {
            /**
             * The current sample index
             */
            sample: number;
            /**
             * The current rule index
             */
            rule: number;
        };
    }, sample: string, rule?: Rules | string, label?: string) => void) => void;
    /**
     * For Rule Files (Æsthetic)
     *
     * Indentical to `forRule` but can be used to resolve sample files located in a
     * sub-directory named `samples` relative to the test file in execution. Accepts a
     * string sample value and an various rules to apply on each provided
     * sample. The execution order is **sample** > **rule** so for each sample all
     * rules provided will be return in the callback cycle.
     *
     * @example
     *
     * import test from 'ava'
     * import { forRule, html } from '@liquify/ava/esthetic'
     * import esthetic from 'esthetic'
     *
     * test('Example Test', async t => {
     *
     *  forRule.files([
     *    'example-sample.txt' // resolving to ./samples/*
     *    'another-sample.txt' // resolving to ./samples/*
     *  ])([
     *     {
     *       language: 'html',
     *       markup: {
     *        forceAttribute: true
     *       }
     *     },
     *     {
     *       language: 'html',
     *       markup: {
     *        forceAttribute: 2
     *       }
     *     },
     *     {
     *       language: 'html',
     *       markup: {
     *        forceAttribute: false
     *       }
     *     },
     *  ])(async function(sample, rules, label) {
     *
     *     t.log(this.size) // number of samples
     *     t.log(this.index) // the index reference of sample running
     *     t.log(this.isRule) // whether or not we are iterating a ruleset
     *     t.log(this.indexRule) // the index reference of ruleset
     *
     *     const output = await esthetic.format(sample, rules)
     *
     *     if (this.isRule) t.log('running a rule') // prints when executing a rule
     *
     *     t.snapshot(output, label)
     *
     *   })
     *
     * })
     *
     */
    files(samples: string[]): (rules: Rules[]) => (callback: (this: {
        /**
         * The number of samples and rules
         */
        size: {
            /**
             * The amount of samples provided
             */
            samples: number;
            /**
             * The amount of rules provided
             */
            rules: number;
        };
        /**
          * The index references in iteration
          */
        index: {
            /**
             * The current sample index
             */
            sample: number;
            /**
             * The current rule index
             */
            rule: number;
        };
    }, sample: string, rule?: Rules | string, label?: string) => void) => Promise<void>;
};

export { dev, forAssert, forRule, forSample };
