// 5050 Quad - staggered images
export const textImage4x5050FullBleedOverride = (palette) => ({
  '& .element': {
    borderColor: `${palette.background()} !important`,
  },
  '& .container': {
    width: '27% !important',
    '& .container': { width: '100% !important' },
  },
  '& .container.container-image': {
    width: '55% !important',
    // 4
    '&[data-length="4"]': {
      width: '55% !important',
      border: '0',
      bottom: '2.5em',
      '& .element': {
        border: '0.2em solid', // 0.2em
        '&:nth-of-type(1)': {
          borderTop: '0',
          borderLeft: '0',
          height: '57.5% !important',
          zIndex: '3', },
        '&:nth-of-type(2)': {
          borderTop: '0',
          borderLeft: '0',
          borderRight: '0',
          height: '42.5% !important',
          zIndex: '2',
        },
        '&:nth-of-type(3)': {
          borderTop: '0',
          borderLeft: '0',
          borderBottom: '0',
          height: '42.5% !important',
          zIndex: '2',
          '& img': {
            borderBottomLeftRadius: '5em',
          },
        },
        '&:nth-of-type(4)': {
          border: '0',
          height: '57.5% !important',
          zIndex: '3',
        },
      },
    },
  },
});
