import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { inOrder, anyElement, cluster, label, plainText, image, or } from "../../../match/Matchers";
import { anyNumber, atLeast } from "../../../match/expressions/Occurring";

export const clustersTextFixedImageAspectRemix = new Remix('clusters-text-fixedimgaspect', {
  border: '0px solid #4caf50',
  textAlign: 'left',
  justifyContent: 'center !important',
  '& *': { boxSizing: 'border-box' },
  '& .container': {
    width: '100%',
    textAlign: 'left',
  },
  // SEQUENCE
  '& .sequence': {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    margin: '0',
    '&:last-of-type': { marginBottom: '0', },
    // > CLUSTER
    '& .cluster': {
      border: '0',
      width: '29%',
      margin: '0 2%',
      padding: '0.875em 0.875em 1.25em 0.875em', 
      // > CONTAINER
      '& .container': {
        '& *': { textAlign: 'center', },
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'center',
        // > COMPONENTS
        // Images
        '&.container-image': {
          height: '2.5em',
          margin: '1em 0',
          '& .imgWrap img': {
            objectFit: 'contain',
          },
        },
        // Everything apart from images
        '.container:not(.container-image)': {
          width: '100%',
          textAlign: 'center',
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
        '& .container-block-quote': {
          '& blockquote': {
            textAlign: 'center',
            width: '100% !important',
            marginBottom: '0em',
            '& p': {
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
          },
        },
        // Charts
        '&.container-chart': {
          height: '2.5em',
          margin: '0.5em 0 1em 0',
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
        // Code
        '&.container-code': {
          margin: '0.5em 0 1em 0',
          textAlign: 'left',
          '& *': { textAlign: 'left', },
        },
      },
      // CONTAINER COMBOS
      // when first element isn't an image, add additional space at top of cluster
      '& .container:first-child:not(.container-image)': {
        marginTop: '0.875em',
      },
      // when last element IS an image, pull in bottom edge
      '& .container:last-child.container-image': {
        marginBottom: '-0.25em',
      },
      // when non-image element follows image, add space
      '& .container.container-image + .container:not(.container-image)': {
        marginTop: '1.25em',
      },
      // when image follows another element, add space
      '& .container:not(.container-image) + .container.container-image': {
        marginTop: '0.75em',
      },
      // Nested Clusters
      '& .cluster': {
        width: '100%',
        margin: '0',
        padding: '0',
      },
    },

    // 2 x Cluster specific styling
    '&[data-length="2"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: '0',
      '& .cluster': {
        width: '46.5%',
        margin: '0',
        // images
        '& .container.container-image': { 
          height: '9em', 
        },
        // charts
        '& .container.container-chart': { 
          height: '9em', 
        },
        // h1 + h2
        '& .container.container-heading-one + .container.container-heading-two h2': {
          margin: '-0.05em 0 0.35em 0',
        },
        // quote
        '& .container.container-block-quote blockquote': {
          marginBottom: '0.5em',
          '& p': {
            textAlign: 'center',
            fontSize: '1.15em',
          },
        },       
      },
    },

    // 3 x Cluster specific styling
    '&[data-length="3"]': {
      fontSize: '85%',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: '0',
      '& .cluster': {
        width: '32%',
        // images
        '& .container.container-image': { 
          height: '9em', 
        },
        // charts
        '& .container.container-chart': { 
          height: '9em', 
        },
      },
    },

    // 4 x Cluster specific styling
    '&[data-length="4"]': {
      fontSize: '70%',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: '0',
      '& .cluster': {
        width: '23%',
        margin: '0',
        // images
        '& .container.container-image': { 
          height: '7em', 
        },
        // charts
        '& .container.container-chart': { 
          height: '7em', 
        },
      },
    },

    // 5 + 6 Cluster specific styling
    '&[data-length="5"], &[data-length="6"]': {
      fontSize: '70%',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: '0',
      '& .cluster': {
        width: '30%',
        margin: '0 1%',
        // images
        '& .container.container-image': { 
          height: '7em', 
        },
        // charts
        '& .container.container-chart': { 
          height: '7em', 
        },
      },
    },

  },

  // GROUP TEXT
  '& .group-text-after, & .group-text-before': {
    fontSize: '95%',
    marginTop: '0.5em',
    width: '100%',
    textAlign: 'center',
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

},[

  // Should only appear when image present, as is otherwise identical to clusters-text-fixedimg

  // When cluster contains any element
  // when(
  //   label(plainText(anyNumber), "group-text-before"),
  //   cluster(anyElement(), atLeast(2)),
  //   label(plainText(anyNumber), "group-text-after"),
  // ),

  // Boost when cluster contains image (any order):
  when(
    label(plainText(anyNumber), "group-text-before"),
    or(
      cluster(inOrder(anyElement(), image()), atLeast(2)),
      cluster(inOrder(image(), anyElement()), atLeast(2))
    ),
    label(plainText(anyNumber), "group-text-after"),
  ).score(14),

]);
