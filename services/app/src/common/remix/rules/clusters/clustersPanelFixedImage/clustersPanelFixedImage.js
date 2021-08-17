import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { anyElement, cluster, plainText, label } from "../../../match/Matchers";
import { anyNumber, atLeast } from "../../../match/expressions/Occurring";

/**
 * Fixed image size clusters - left aligned text - to be scaled back to text only, when content aware image
 * remix is cooked.
 */
export const clustersPanelFixedImageRemix = new Remix('clusters-panels-fixedimg', {
  border: '0px solid lime',
  '& *': { boxSizing: 'border-box', },
  textAlign: 'center',
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  '& .sequence': {
    display: 'flex',
    justifyContent: 'center', // for 5+ clusters
    flexWrap: 'wrap', // for 5+ clusters
    width: '100%',
    margin: '0 -2% 1em -2%',
    '&:last-of-type': { marginBottom: '0', },
    // > CLUSTER
    '& .cluster': {
      margin: '0.5em 2%',
      width: '29%', // for 5+ clusters
      padding: '0.75em 1.25em 0.5em 1.25em',
      background: 'rgba(0,0,0,0.025)',
      borderRadius: '0.25em',
      boxShadow: '0 0.05em 0.075em rgba(0,0,0,.25)',
      // > CONTAINER
      '& .container': {
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'center',
        // type (smaller, left aligned)
        '&.container-heading-one, &.container-heading-two, &.container-paragraph, &.container-block-quote, &.container-numbered-list, &.container-bulleted-list': {
          width: '100%',
          textAlign: 'left',
          fontSize: '80%',
          '& H1, & H2, & p': { width: '100%', },
          '& h1, & h2': { margin: '0 0 0.166em 0', },
          '& p': { margin: '0 0 0.322em 0', },          
          '& ul, & ol': {
            margin: '0 0 0.5em 0',
            '& li': {
              width: 'auto',
              '& P': {
                margin: '0 0 0.5em 0',
              },
            },
          },
        },
        // Logos
        '&.container-logo': {
          maxWidth: '100%',
          margin: '0 auto 1.25em auto',
          '& img': {
            height: '6em',
            width: '100%',
            padding: '8%',
            boxSizing: 'border-box',
            borderRadius: '0.25em',
          },
        },

        // Paragraphs
        '&.container-paragraph': {
          display: 'block',
        },
        // Quotes
        '&.container-block-quote blockquote': {
          marginBottom: '0em',
          '& p': {
            textAlign: 'left',
          },
        },
        // Code
        '&.container-code': {
          textAlign: 'left',
          '& *': { textAlign: 'left', },
        },
        // Images
        '&.container-image': {
          height: '2.25em',
          margin: '1em 0',
          '& .imgWrap img': {
            objectFit: 'cover',
          },
        },
        // Charts
        '&.container-chart': {
          height: '2.25em',
          margin: '0.5em 0 1em 0',
        },
      },
      // Nested Clusters
      '& .cluster': {
        width: 'auto',
        margin: '0',
        padding: '0',
        boxShadow: 'none',
        background: 'transparent',
      },
    },
    // 2 x Cluster specific styling
    '&[data-length="2"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: '0 0 1em 0',
      '& .cluster': {
        width: '46.5%',
        margin: '0',
        // images
        '& .container.container-image, & .container.container-chart': { height: '8em', },
        // type
        '& .container.container-heading-one, & .container.container-heading-two, & .container.container-paragraph': {
          width: '100%',
          textAlign: 'center',
        },
        '& .container.container-heading-one + .container.container-heading-two h2': {
          margin: '-0.15em 0 0.35em 0',
        },
        '& .container.container-block-quote blockquote': {
          marginBottom: '0.5em',
          '& p': {
            textAlign: 'center',
            fontSize: '1.15em',
          },
        },
        '& .container.container-logo img': { 
          height: '6em', 
        },
      },
    },
    // 3 x Cluster specific styling
    '&[data-length="3"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: '0 0 1em 0',
      '& .cluster': {
        width: '29%',
        margin: '0',
        '& .container.container-image, & .container.container-chart': { height: '5em', },
        '& .container.container-logo img': { 
          height: '4em', 
        },
      },
    },
    // 4 x Cluster specific styling
    '&[data-length="4"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: '0 0 1em 0',
      '& .cluster': {
        width: '21.5%',
        margin: '0',
        '& .container.container-image, & .container.container-chart': { height: '4em', },
        '& .container.container-logo img': { 
          height: '3em', 
        },
      },
    },

  },
  // GROUP TEXT
  '& .group.group-text-before, & .group.group-text-after': {
    width: '100%',
    textAlign: 'center',
    '& .container': {
      width: '100%',
      textAlign: 'center',
    },
  },
},

// Accepts clusters with or without images.

when(
  label(plainText(anyNumber), "group-text-before"),
  cluster(anyElement(), atLeast(2)),
  label(plainText(anyNumber), "group-text-after"),
));
