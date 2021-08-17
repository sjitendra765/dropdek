// blockbuster
export const textBlockbusterOverride = () => ({
  '& h1': {
    fontSize: '6em !important', // matching Blockbuster remix for seamless transition
    lineHeight: '1.2 !important',
  },
  '& .container-heading-one + .container-heading-two h2': {
    marginTop: '0 !important',
  },
  '& .container.container-block-quote': {
    textAlign: 'left',
    '& blockquote': {
      textAlign: 'left',
    },
  },
});
