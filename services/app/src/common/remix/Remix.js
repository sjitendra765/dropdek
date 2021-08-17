/**
 * A styling remix applied to a slide. A remix should have a unique name (global ID), a JSS object or generator function
 * (see below), a set of rules to evaluate whether the remix matches a particular content structure, and additional
 * options.
 *
 * @param name this should be a globally unique identifier, in the pattern of [a-z\-0-9]+.
 * @param css either a JSS object or a generator function that takes in a {@see ColorChart} parameter.
 * @param rules either a single rule or an array of rules to evaluate the remix against a certain content structure.
 * See {@see RemixRule} for details.
 * @param options.equivalence Determines whether two element types are equivalent or not in this remix. Two elements are
 * said to be equivalent if they can be interchanged in the content source without affecting the layout.
 * @param options.animation JSS snippet for adding animations to the remix.
 * @param options.transform a custom transformation that takes a list of content elements (editor elements) and
 * returns a tree-encoded data structure, with or without clustering. See {@see witClustering}.
 * @param options.clustering turned on by default, this can be used as a shorthand to specify a custom transformation
 * (see above) that does not attempt auto-clustering of content. When a transform is also provided, that overrides
 * this parameter option.
 */
export class Remix {

  constructor(name, css, rules, { animation, transform, clustering = true, equivalence } = {}) {
    this.name = () => name;
    this.relativeToPalette = typeof css === 'function';
    this.css = this.relativeToPalette ? (colorChart) => css(colorChart) : () => css; // this.css will be a function
    this.animation = () => animation;
    this.rules = Array.isArray(rules) ? rules : [rules];
    this.transform = transform;
    this.clustering = clustering;
    this.equivalence = equivalence;
  }

  /**
   * Specify a fallback remix.
   *
   * @param next next remix to evaluate if this one fails.
   * @return this remix instance
   */
  then = (fallback) => {
    this.fallback = fallback;
    return this;
  };

  /**
   * Return the next remix (if any) in the evaluation chain.
   *
   * @returns {*}
   */
  next = () => this.fallback;

  evaluate = (slide) => {
    if (this.rules === undefined || this.rules.length === 0) {
      return [0,];
    }
    let maxScore = 0;
    let maxLabels;
    for (let i = 0; i < this.rules.length; i++) {
      const [score, labels] = this.rules[i].evaluate(slide);
      if (score > maxScore) {
        maxScore = score;
        maxLabels = labels;
      }
    }
    return [maxScore, maxLabels];
  };

  score = (slide) => {
    const [score,] = this.evaluate(slide);
    return score;
  };

  matches = (slide) => this.score(slide) > 0;

}
