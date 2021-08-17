export const olBoldNumberOverride = (palette) => ({
  '& .container-numbered-list ol li:before': {
    color: `${palette.titleColor} !important`,
  },
  '& ol': {
    borderWidth: '0 !important',
    '& li': {
      borderWidth: '0 !important',
      alignItems: 'baseline !important',
      '&:before': {
        fontFamily: '"IBM Plex Sans Condensed", sans-serif !important',
        fontWeight: '600 !important',
        fontSize: '1.1em !important',
        transform: 'scale(1,0.9)',
        minWidth: '2.3em !important',
      },
    },
  },
});
