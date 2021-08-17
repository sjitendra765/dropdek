// fullbleed fade
export const imageFullBleedTextGradientOverride = (palette) => ({
  '& .container.container-paragraph, & .container.container-block-quote, & .container.container-heading-two, & .container.container-numbered-list, & .container.container-bulleted-list, & .container.container-code': {
    maxWidth: '75%',
  },
  '& .container-heading-one': {
    '& h1': {
      fontSize: "4em",
      lineHeight: '1 !important',
      margin: '0 0 0.35em 0',
    },
  },
  '& .container-paragraph, & .container li, ': {
    '& p': {
      fontWeight: "500",
    },
  },
  '& .container-block-quote': {
    '& p': {
      fontSize: '1.85em',
      lineHeight: '1.25',
      '&:before': {
        marginLeft: '-0.6em',
        opacity: '1',
      },
      '&:after': {
        opacity: '1',
      },
    },
  },
  '& .container-heading-one + .container-block-quote': {
    margin: '-0.35em 0',
  },

});
