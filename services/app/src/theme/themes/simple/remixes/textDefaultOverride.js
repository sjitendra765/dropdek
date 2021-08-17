export const textDefaultOverride = () => ({
  '& .container': {
    width: '100% !important',
    maxWidth: '100% !important',
  },
  '& .container-block-quote blockquote': {
    '& p': {
      fontSize: '1.85em !important',
      lineHeight: '1.25 !important',
    },
  },
  '& .container + .container-chart': {
    paddingTop: '2em',
  },
  '& .container-chart + .container': {
    marginTop: '-2em',
  },
});
