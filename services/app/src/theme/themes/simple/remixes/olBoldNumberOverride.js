export const olBoldNumberOverride = (palette) => ({
  '& ol': {
    borderBottom: `0.005em solid ${palette.text()}44 !important`,
    '& li': {
      borderTop: `0.005em solid ${palette.text()}44 !important`,
      '&:before': {
        color: palette.titleColor,
        height: '100%',
      },
      '& P': {
        color: palette.titleColor,
      },
    },
  },

  '& .group-text-before': {
    marginBottom: '2em',
    fontSize: '100%',
  },
  '& .group-text-after': {
    marginTop: '2em',
    fontSize: '100%',
  },
  '& .container.container-numbered-list ol li': {
    margin: '0 !important',
    padding: '0.65em 0 !important',
    '&:before': {
      fontWeight: '600 !important',
      opacity: '0.5',
      fontSize: '1.5em !important',
      minWidth: '2em',
    },
    '& p': {
      fontSize: '1.5em !important',
      fontWeight: '600 !important',
    },
  },
});
