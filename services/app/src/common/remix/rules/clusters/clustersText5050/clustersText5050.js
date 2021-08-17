import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { anyElement, cluster, label, plainText } from "../../../match/Matchers";
import { anyNumber, exactly } from "../../../match/expressions/Occurring";

/**
 * Fixed image size clusters - centered text - to be scaled back to text only,
 * when content aware image remix is cooked
 */
export const clustersText5050Remix = new Remix('clusters-text-5050', {
  border: '0px solid #FFC300',
  '& *': { 
    boxSizing: 'border-box',
  },
  textAlign: 'left',
  '& .hook': {
    display: 'block',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundImage: 'linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,1) 50%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.7) 100%)',
    opacity: '0.0275',
    zIndex: '0',
  },
  '& .container': {
    width: '100%',
    textAlign: 'left',
    zIndex: '1',
  },
  // SEQUENCE
  '& .sequence': {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    margin: '0 -2% 1em -2%',
    '&:last-of-type': { marginBottom: '0', },
    // > CLUSTER
    '& .cluster': {
      margin: '0.5em 2%',
      width: '50%',
      // > CONTAINER
      '& .container': {
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'left',
        // type
        '&.container-heading-one, &.container-heading-two, &.container-paragraph, &.container-block-quote, &.container-numbered-list, &.container-bulleted-list': {
          width: '100%',
          textAlign: 'left',
          '& H1, & H2, & p': { width: '100%', },
          // Margins reduced to bring text together more successfully:
          '& h1': {
            margin: '0 0 0.325em 0',
          },
          '& h2': {
            margin: '0 0 0.166em 0',
          },
          '& p': {
            margin: '0 0 0.325em 0',
          },
          '& ul, & ol': {
            margin: '0 0 0.5em 0',
            '& li': {
              width: 'auto',
              '& P': { margin: '0 0 0.5em 0', },
            },
          },
        },
        // Paragraphs
        '&.container-paragraph': {
          display: 'block',
        },
        // Logos
        '&.container-logo': {
          maxWidth: '80%',
          margin: '1em auto',
          '& img': {
            height: '5em',
            width: '100%',
            padding: '8%',
            boxSizing: 'border-box',
            borderRadius: '0.25em',
          },
        },
        // Quotes
        '&.container-block-quote': {
          '& blockquote': {
            marginBottom: '0em',
            width: '100%',
            '& p': {
              textAlign: 'left',
            },
          },
        },
        // Images
        '&.container-image': {
          height: '2.5em',
          margin: '1.5em 0 !important',
          '& .imgWrap img': {
            objectFit: 'cover',
          },
        },
        // Chart
        '&.container-chart': {
          height: '2.5em',
          margin: '0.5em 0 1em 0',
        },
      },
      // Nested Clusters
      '& .cluster': {
        width: 'auto',
        margin: '0',
      },
    },
    // 2 x Cluster specific styling
    '&[data-length="2"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: '1em 0',
      '& .cluster': {
        width: '40%',
        margin: '0',
        // images
        '& .container.container-image': { height: '10em', },
        // charts
        '& .container.container-chart': { height: '10em', },
        // type
        '& .container.container-heading-one, & .container.container-heading-two, & .container.container-paragraph': {
          width: '100%',
          textAlign: 'center',
          '& H1, & H2, & p': { width: '100%', },
        },
        '& .container.container-heading-one + .container.container-heading-two h2': {
          margin: '-0.15em 0 0.35em 0',
        },
        '& .container.container-block-quote blockquote': {
          '& p': {
            textAlign: 'center',
          },
        },
      },
    },
  },
},[

  // Accepts clusters with or without images. Only shows when there are exactly 2 Clusters.

  when(cluster(anyElement(), exactly(2))).score(11),
]);
