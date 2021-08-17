import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { anyElement, cluster, label, plainText, or, image, inOrder } from "../../../match/Matchers";
import { anyNumber, atLeast } from "../../../match/expressions/Occurring";

export const clustersPanelLandscapeRemix = new Remix('clusters-panel-landscape', {
  border: '0px solid #3f51b5',
  padding: '0',
  textAlign: 'left',
  justifyContent: 'center !important',
  '& *': { boxSizing: 'border-box' },
  '& .container': {
    width: '100%',
    textAlign: 'left',
  },
  // SEQUENCE
  '& .sequence': {
    fontSize: '80%',
    margin: '0',
    height: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: '3',
    display: 'flex',
    // > CLUSTER
    '& .cluster': {
      width: '33.3334%',
      height: '100%',
      maxHeight: '100%',
      margin: '0',
      padding: '1.5em',
      paddingTop: '1.8em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start !important',
      position: 'relative',
      borderRadius: '0.25em',
      background: 'transparent',
      backdropFilter: 'brightness(1.2) saturate(1.05)',
      boxShadow: '0.08em 0.24em 0.8em 0.12em rgb(0 0 0 / 9%)',
      '& .cluster': {
        display: 'contents',
      },
      // Clusters containing images
      // ---------------------------
      '&.cluster': {
        '& .cluster': {
          display: 'contents',
        },
        '& .container-image': {
          height: 'auto !important',
          margin: '0',
          zIndex: '4',
          '& .element': {
            paddingLeft: '0',
            position: 'absolute',
            top: '0.5em',
            bottom: '0.5em',
            left: '0.5em',
            width: '25%',
            height: 'auto',
            margin: '0',
            '& .imgWrap img': {
              borderRadius: '0.15em',
              objectFit: 'cover',
            },
          },
        },
      },
      // > CONTAINER
      '& .container': {
        '& *': { textAlign: 'left', },
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'left',
        zIndex: '2',
        paddingLeft: '30%',
        // > COMPONENTS
        // Everything apart from images
        '&.container:not(.container-image)': {
          width: '100%',
          textAlign: 'left',
          fontSize: '100%',
        },
        // Headings
        '&.container-heading-one, &.container-heading-two': {
          '& H1, & H2': { 
            width: '100%', 
            margin: '0 0 0.166em 0', 
          },
        },
        // Paragraphs
        '&.container-paragraph': {
          display: 'block',
          '& p': { 
            width: '100%', 
            margin: '0 0 0.322em 0', 
          },
        },
        // Lists
        '&.container-numbered-list, &.container-bulleted-list': {
          '& ul, & ol': {
            margin: '0 0 0.5em 0',
            '& li': {
              width: 'auto',
              '& P': { 
                margin: '0 0 0.5em 0', 
                textAlign: 'left',
              },
            },
          },
        },
        // Quotes
        '&.container-block-quote': {
          paddingLeft: '33.5%',
          '& blockquote': {
            width: '100%',
            margin: '0em',
          },
        },
        // Charts
        '&.container-chart': {
          maxHeight: '8em',
          minHeight: '6em',
          margin: '0.5em 0 1em 0',
          width: '100%',
        },
        // Logos
        '&.container-logo': {
          margin: '1em 0 2em 0',
          '& img': {
            maxWidth: '50%',
            height: '2.5em',
            padding: '6%',
          },
        },
        // Code
        '&.container-code': {
          margin: '0.5em 0 1em 30%',
          paddingLeft: '1em',
          boxSizing: 'border-box',
          width: '70% !important',
        },
      },
    },

    // 2 x cluster
    '&[data-length="2"]': {
      padding: '4%',
      height: 'max-content',
      justifyContent: 'space-between',
      '& .cluster': {
        width: '48%',
        margin: '0',
        height: '100%',
      },
    },

    // 3 x cluster
    '&[data-length="3"]': {
      padding: '4%',
      justifyContent: 'center',
      height: 'max-content',
      '& .cluster': {
        width: '45%',
        margin: '0 1.5%',
        maxHeight: '45%',
        justifyContent: 'center',
      },
    },

    // 4 x cluster
    '&[data-length="4"]': {
      padding: '4%',
      justifyContent: 'center',
      height: 'max-content',
      '& .cluster': {
        width: '45%',
        margin: '0 1.5%',
        maxHeight: '45%',
        justifyContent: 'center',
      },
    },

    // 5 x cluster
    '&[data-length="5"]': {
      padding: '4%',
      justifyContent: 'center',
      height: 'max-content',
      '& .cluster': {
        width: '30%',
        margin: '0 1.5%',
        maxHeight: '45%',
        justifyContent: 'center',
      },
    },

    // 6 x cluster
    '&[data-length="6"]': {
      padding: '4%',
      justifyContent: 'center',
      height: 'max-content',
      '& .cluster': {
        width: '30%',
        margin: '0 1.5%',
        maxHeight: '45%',
        justifyContent: 'center',
      },
    },

  },

  // GROUP TEXT
  '& .group-text-after, & .group-text-before': {
    fontSize: '95%',
    marginTop: '0.5em',
    width: '100%',
    textAlign: 'center',
    padding: '0 9%',
    '& .container': {
      width: '100%',
      textAlign: 'center',
    },
    '& h1': { marginBottom: '0.25em', },
  },
  '& .group-text-before': {
    marginTop: '0',
    marginBottom: '0.5em',
  },
},

// Should only appear when image present, as is otherwise undifferentiated
when(
  label(plainText(anyNumber), "group-text-before"),
  or(
    cluster(inOrder(anyElement(), image()), atLeast(2)),
    cluster(inOrder(image(), anyElement()), atLeast(2))
  ),
  label(plainText(anyNumber), "group-text-after"),
).score(14));
