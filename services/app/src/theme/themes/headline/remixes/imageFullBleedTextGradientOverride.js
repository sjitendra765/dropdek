export const imageFullBleedTextGradientOverride = () => ({
  '& .container-heading-one': {
    marginTop: 'auto',
    '& h1': {
      fontSize: '9em',
      marginBottom: '0',
      lineHeight: '1',
    },
  },
  '& .container-heading-one + .container-heading-two, & .container-heading-one + .container-paragraph': {
    marginTop: '0.75em'
  },
  '& .container-block-quote': {
    marginTop: '1.5em !important'
  },
  '& .container-block-quote blockquote': {
    '&:before': {
      padding: '0.05em',
      lineHeight: '1.2',
    },
    '& p': {
      fontSize: '1.75em !important',
    },
  },
});
