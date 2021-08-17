export const textListCenteredOverride = (palette) => ({
  backgroundImage: `linear-gradient( 90deg, ${palette.background()}, ${palette.background()} 50%, ${palette.title()} 50%, ${palette.title()} 100%) !important`,
  '& .container-bulleted-list, & .container-numbered-list': {
    margin: '0 !important',
    padding: '0 !important',
    '&:before': {
      width: '0'
    },
    '& li': {
      color: `${palette.background()}`,
      '&:before': {
        color: `${palette.accent()}`,
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
    zIndex: '3',
    position: 'relative',
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
    '& *': {
      textAlign: 'left !important',
    },
    '& h1': {
      lineHeight: '1.25',
    },
  },
  '& .hook': {
    display: 'block',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='305px' height='2097px' viewBox='0 0 305 2097' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='Path' d='M305 0 C305 2098 305 2097 305 2097 L2 2097 C2 2097 414.427 1358.25 265 0' fill='${palette.title().replace('#', '%23')}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E")`,
    content: '""',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '1',
    zIndex: '1',
    backgroundSize: 'contain',
    backgroundPosition: '45.1% 0',
    backgroundRepeat: 'no-repeat',
  },
});
