export const textListCenteredOverride = (palette) => ({
  backgroundImage: `linear-gradient( 90deg, ${palette.background()}, ${palette.background()} 50%, ${palette.title()} 50%, ${palette.title()} 100%) !important`,
  '& .container-bulleted-list, & .container-numbered-list': {
    margin: '0 !important',
    padding: '0 !important',
    '&:before': {
      width: '0'
    },
    '& li': {
      '&:before': {
        color: `${palette.background()}`,
      },
      '& p': {
        color: `${palette.background()}`,
      },
    },
  },
  justifyContent: 'space-between',
  '& *': {
    boxSizing: 'border-box',
  },
  '& .group-text, & .container-bulleted-list, & .container-numbered-list': {
    '& .group-text': {
      minWidth: '100%',
      maxWidth: '100%',
      width: '100%',
    },
    minWidth: '44%',
    maxWidth: '44%',
    width: '44%',
  },
  '& .group-text': {
    marginRight: 'auto',
    '& h1': {
      lineHeight: '0.9',
    },
  },
});
