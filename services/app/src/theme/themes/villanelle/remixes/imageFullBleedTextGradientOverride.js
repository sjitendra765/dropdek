// fullbleed fade
export const imageFullBleedTextGradientOverride = (palette) => ({
  '&:before': {
    background: 'rgba(255,255,255,0.15) !important',
    width: '100%',
    backdropFilter: 'brightness(0.8) contrast(1.1)',
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-block-quote': {
    maxWidth: '100%',
    // width: '100%',
    margin: '0 auto',
    textAlign: 'center',
    textShadow: 'rgba(0,0,0,0.15)',
    '& p, & p:before, & p:after': {
      textAlign: 'center',
    },
    '& h1': {
      opacity: '0.875',
      margin: '0.05em 0',
      fontSize: '7em', // matching fullbleed fade remix for seamless transition
      lineHeight: '1.1 !important',
  
    },
    '& h2': {
      fontSize: '2em', // matching Blockbuster remix for seamless transition
      lineHeight: '1.1',
    },
  },
  '& .container-heading-two + .container-heading-one h1': {
    margin: '-0.1em 0 0 0 !important',
  },
  '& .container-heading-one + .container-heading-two h2': {
    marginTop: '0.25em !important',
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    maxWidth: '100%',
    width: 'auto',
    margin: '0 auto',
    textAlign: 'left',
  },
});
