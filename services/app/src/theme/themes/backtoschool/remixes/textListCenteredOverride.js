// textlist-centered - book bg
export const textListCenteredOverride = (palette) => ({
  backgroundImage: 'url(/themes/b2s/theme-b2s-bg.png)',
  '& .group.group-text, & .container.container-numbered-list, & .container.container-bulleted-list': {
    position: 'absolute',
    top: '0',
    left: '0',
    minWidth: '50%',
    width: '50%',
    height: '100%',
    padding: '0',
    margin: '0',
    display: 'flex',
    right: 'unset',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  '& .group.group-text .container': {
    width: '75%',
    margin: '0 auto',
    '&.container-heading-one, &.container-heading-two, &.container-paragraph': {
      textAlign: 'center',
      '& h1, & h2, p': {
        textAlign: 'center',
      },
      '& h1': {
        lineHeight: '1.125',
      },
    },
  },
  '& .container.container-numbered-list, & .container.container-bulleted-list': {
    right: '0',
    top: '2.25%',
    left: 'unset',
    '& li': {
      margin: '0.5em 0 0.5em 2.25em',
      '& p': {
        color: '#000000CC',
      },
    },
    '& ol, & ul': {
      maxWidth: '75%',
    },
  },
  '& .container-bulleted-list:before, & .container-numbered-list:before': {
    width: '115%',
    height: '130%',
    position: 'absolute',
    left: '-12.5%',
    top: '-4.5%',
    background: 'url(/themes/b2s/theme-b2s-book.png) bottom left no-repeat',
    backgroundSize: 'cover',
  },
});
