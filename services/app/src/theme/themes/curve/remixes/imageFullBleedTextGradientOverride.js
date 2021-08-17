export const imageFullBleedTextGradientOverride = () => ({
  '& .container-heading-one': {
    marginTop: 'auto',
    '& h1': {
      fontSize: '4em',
      lineHeight: '1.1em !important',
      marginBottom: '0 !important',
      textAlign: 'left',
    },
  },
  '& .container-heading-one + .container-heading-two, & .container-heading-one + .container-paragraph': { marginTop: '0.5em' },
  '& .container-paragraph p': {
    fontWeight: '500',
    '& strong': {
      fontWeight: '600'
    },
  },
  '& .container-block-quote': { marginTop: '1.5em !important' },
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
