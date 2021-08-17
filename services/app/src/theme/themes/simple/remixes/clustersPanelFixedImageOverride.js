export const clustersPanelFixedImageOverride = () => ({
  justifyContent: 'center !important',
  '& .sequence .cluster': {
    background: 'transparent !important',
    // backdropFilter: 'brightness(1.6) saturate(1.2)',
    backdropFilter: 'brightness(1.3) saturate(0.9)',
    border: '0 !important',
    borderRadius: '0.75em',
    boxShadow: '0.08em 0.24em 0.8em 0.12em rgb(0 0 0 / 9%)',
    padding: '0.875em', 
    paddingBottom: '1.25em', 
    '& .container': {
      textAlign: 'center',
      '& *': {
        textAlign: 'center',
      },
    },
    // when first element is not an image add some additional space at top of cluster
    '& .container:first-child:not(.container-image)': {
      marginTop: '0.875em',
    },
    // when first element is a logo add space at top of cluster
    '& .container:first-child.container-logo': {
      marginTop: '0em',
    },
    // when last element is an image pull in bottom edge
    '& .container:last-child.container-image': {
      marginBottom: '-0.25em',
    },
    // all images
    '& .container.container-image': {
      margin: '0 0 1em 0',
      borderRadius: '0.25em',
    },
    // when non-image element follows image, add space
    '& .container.container-image + .container:not(.container-image)': {
      marginTop: '1.25em',
    },
    // when image follows another element, add space
    '& .container:not(.container-image) + .container.container-image': {
      marginTop: '0.75em',
    },
    '& .container.container-block-quote': {
      '& blockquote': {
        textAlign: 'center',
        width: '100% !important',
        '&:before': {
          display: 'none',
        },
        '& p': {
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '85%',
          fontSize: '1.75em !important',
          lineHeight: '1.25',
        },
      },
    },
  },
  '& .sequence[data-length="2"], & .sequence[data-length="3"], & .sequence[data-length="4"]': {
    '& .cluster': {
      '& .cluster': {
        width: '100% !important',
        margin: '0 !important',
        padding: '0 !important',
      },
      '& .container.container-heading-one, & .container.container-heading-two': {
        fontSize: '100%',
        '& h1': {
          fontSize: '3em',
        },
      },
    },
  },
  '& .sequence[data-length="3"]': {
    '& .cluster': {
      width: '31%',
      '& .container.container-heading-one, & .container.container-heading-two': {
        '& h1': {
          fontSize: '2.75em',
        },
      },
    },
  },
  '& .sequence[data-length="4"]': {
    '& .cluster': {
      '& .container.container-heading-one, & .container.container-heading-two': {
        '& h1': {
          fontSize: '2.5em',
        },
      },
    },
  },

  '& .group-text-after': {
    marginTop: '1em',
    fontSize: '95%',
    '& h1': {
      marginBottom: '0.25em',
    },
  },
  '& .group-text-before': {
    marginBottom: '1em',
    fontSize: '95%',
    '& h1': {
      marginBottom: '0.25em',
    },
  },

});
