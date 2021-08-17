// fullbleed fade
export const imageFullBleedTextGradientOverride = (palette) => ({
  '&:before': {
    background: 'rgba(255,255,255,0.15)',
    width: '100% !important',
    backdropFilter: 'brightness(0.8) contrast(1.1)',
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-block-quote': {
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
    textShadow: 'rgba(0,0,0,0.15)',
    '& p, & p:before, & p:after': {
      textAlign: 'center',
    },
    '& h1': {
      opacity: '1',
      fontSize: '7em', // matching Blockbuster remix for seamless transition
      margin: '0',
      lineHeight: '1',
      fontWeight: '700',
    },
  },
  '& .container-heading-two + .container-heading-one h1': {
    margin: '-0.1em 0 0 0 !important',
  },
  '& .container-heading-one + .container-heading-two h2': {
    marginTop: '0.5em',
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    maxWidth: '100%',
    width: 'auto',
    margin: '0 auto',
    textAlign: 'left',
  },
  '& .container-block-quote blockquote p': {
    '&:before, &:after': {
      opacity: '0.35 !important',
    },
  },
});
