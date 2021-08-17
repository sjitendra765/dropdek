export const imageFullBleedOverride = () => ({
  '& .container-block-quote': {
    paddingLeft: '0.25em !important',
  },
  '& .container.container-block-quote blockquote:before': {
    top: '0.35em',
    padding: '0.25em 0 0.5em 0',
    transform: 'scale(3)',
  },
});
