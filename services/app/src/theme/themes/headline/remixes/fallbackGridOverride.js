export const fallbackGridOverride = (palette) => ({
  '& .grid-container': {
    gridGap: '0.5em',
    '& .container': {
      // background: 'rgba(0,0,0,0)', // base on text color
      // border: '0.025em solid rgba(0,0,0,0.1)', // base on text color
      // border: `1px solid ${palette.accent()} !important`,
      backdropFilter: 'saturate(1.2)',
      borderRadius: '0',
      padding: '1.5em',
      alignItems: 'center',
      justifyContent: 'center',
      '&.container-heading-one': {
        // background: `${palette.title()} !important`,
        justifyContent: 'flex-start',
        '& h1': {
          // color: `${palette.background()} !important`,
          fontSize: '3.25em',
          lineHeight: '1',
        },
      },
      '&.container-heading-two': {
        justifyContent: 'flex-start',
      },
      '&.container-logo': {
        border: '0.025em solid rgba(0,0,0,0.1)',
      },
    },
  },
});
