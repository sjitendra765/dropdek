// fullbleed fade
export const imageFullBleedTextGradientOverride = (palette) => ({
  '&:before': {
    background: 'rgba(255,255,255,0.15)',
    width: '100% !important',
    backdropFilter: 'brightness(0.7) contrast(1.2)',
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-block-quote': {
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
    '& h1': {
      fontSize: '6em !important', // matching Blockbuster remix for seamless transition
      lineHeight: '1.2 !important',
      margin: '0.05em 0',
    },
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    maxWidth: '100%',
    width: 'auto',
    margin: '0 auto',
    textAlign: 'left',
  },
});
