export const listSplitOverride = () => ({
  '& .container': {
    width: '100% !important',
    maxWidth: '100% !important',
    '& * ': {
      textAlign: 'left !important',
    },
  },
  '& .container-numbered-list, & .container-bulleted-list': {
    width: '85% !important',
    maxWidth: '85% !important',
    margin: '0 auto 0 0',
  },
});
