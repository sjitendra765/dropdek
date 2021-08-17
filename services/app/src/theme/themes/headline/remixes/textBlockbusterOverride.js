export const textBlockbusterOverride = () => ({
  justifyContent: 'space-between !important',
  lineHeight: '0.9',
  textAlign: 'left',
  '& .container-heading-one': {
    marginTop: 'auto !important',
    '& h1': {
      fontSize: '9em',
      marginBottom: '0',
      textAlign: 'left !important',
    },
  },
  '& .container-heading-two, & .container-paragraph, & .container-block-quote': {
    textAlign: 'left',
    '& h2, & p, & blockquote': {
      textAlign: 'left'
    },
  },
  '& .container-block-quote': {
    '& p': {
      fontSize: '1.75em !important',         
    },
  },
  '& .container.container-logo': {
    marginLeft: '0',      
    '& .element': {
      marginLeft: '0',      
    },
  },

});
