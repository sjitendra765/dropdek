export const clustersText5050Override = (palette) => ({
  padding: '0',
  '& .sequence': {
    fontSize: '90%',
    '&[data-length="2"] .cluster': {
      width: '42% !important',
      padding: '2em 1em 1em 1em',
      borderRadius: '0.5em',
      position: 'relative',
      boxSizing: 'border-box',
      margin: '0 auto !important',
      '& .cluster': {
        width: '100%',
        display: 'contents',
      },
      '&:before': {
        padding: '0',
        display: 'block',
        content: '"1"',
        position: 'absolute',
        textAlign: 'center',
        lineHeight: '2',
        width: '2em',
        height: '2em',
        color: '#ffffff',
        borderRadius: '50%',
        top: '-0.85em',
        fontSize: '1.15em',
        left: 'calc(50% - 1em)',
        fontWeight: '600',
        background: '#292f36',
      },
      // first panel bg
      '&:first-of-type': {
        background: `${palette.accent()}`,
        '& .container *, & .container p:before, & .container p:after': {
          color: '#ffffff !important',
        },
      },
      // second panel text
      '&:last-of-type': {
        background: '#ffffff',
        '& .container *': {
          color: `${palette.accent()}`, // colouri
        },
        '& .container h1': {
          color: '#292f36 !important',
        },
        '& .container p, & .container p:before, & .container p:after': {
          color: `${palette.accent()} !important`,
        },
      },
      '&:last-of-type:before': {
        content: '"2"',
      },
    },
  },
  '& .sequence .cluster .container.container-image img': {
    borderRadius: '0.5em',
  },
  '& .sequence .cluster .container.container-block-quote': {
    '& blockquote': {
      position: 'relative',
      padding: '0',
      margin: '0.5em 0 0 0',
      width: '100%',
      '& p': {
        borderLeft: '0 !important',
        marginBottom: '0',
        padding: '0 0 0 0.55em',
      },
    },
  },
});
