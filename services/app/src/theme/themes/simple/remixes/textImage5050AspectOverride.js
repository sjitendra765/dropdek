export const textImage5050AspectOverride = () => ({
  justifyContent: 'center !important',
  '& .container': {
    '& .container': { width: '100% !important' },
  },
  // '& .container-paragraph + .container-heading-one, & .container-heading-two + .container-heading-one': {
  //   marginBottom: '0',
  // },
  '& .container.container-logo': {
    // background: '#fff !important',
    backdropFilter: 'brightness(1.055)',
    border: '0 !important',
    borderRadius: '0.75em',
    boxShadow: '0.08em 0.24em 0.8em 0.12em rgb(0 0 0 / 9%)',
  },
  '& .container.container-block-quote': {
    '& blockquote p': {
      lineHeight: '1.25',
    }
  },
});
