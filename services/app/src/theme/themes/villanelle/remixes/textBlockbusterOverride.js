// blockbuster
export const textBlockbusterOverride = () => ({
  '& h1': {
    fontSize: '7em !important', // matching fullbleed fade remix for seamless transition
    lineHeight: '1.1 !important',
  },
  '& h2': {
    fontSize: '2em', // matching fullbleed fade remix for seamless transition
    lineHeight: '1.1 !important',
  },
  '& .container-heading-one + .container-heading-two h2': {
    marginTop: '0.25em !important',
  },
  '& .container.container-block-quote blockquote p': {
    '&:before, &:after': {
      margin: '0 0.075em 0 0',
      position: 'relative',
    },
    '&:after': {
      margin: '0 0 0 0.05em',
    },
  },
});
