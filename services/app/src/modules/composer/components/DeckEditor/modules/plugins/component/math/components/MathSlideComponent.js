import { Node } from "slate";
import { BlockMath } from 'react-katex';
import React from "react";
import SlideComponent from "../../../../../../../../../common/slide/SlideComponent";
import { ProgressTracker } from "../../../../../../../../../common/util/ProgressTracker";
import 'katex/dist/katex.min.css';
import { CodeEditorElement } from "../../code/components/CodeEditorElement";

export class MathSlideComponent extends SlideComponent {
  constructor(node, view, themeName, settings, monitor = ProgressTracker.DUMMY) {
    super();
    const formula = Node.string(node).replace(/\n/g, '');
    this.setComponent(<BlockMath renderError={(error) => <h4>Please check your formula. It looks like a problem with the syntax.</h4>}>{formula}</BlockMath>);
  }
}
