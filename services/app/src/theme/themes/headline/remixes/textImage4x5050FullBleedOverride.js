// 5050 Quad
export const textImage4x5050FullBleedOverride = (palette) => ({
  '& .element': {
    borderColor: `${palette.background()} !important`,
  },
  justifyContent: 'flex-start',
  '& .container': {
    width: '27% !important',
    '& .container': { width: '100% !important' },
  },
  '& .container.container-image': {
    width: '65% !important',
    // 4
    '&[data-length="4"]': {
      width: '65% !important',
      border: '0',
      '& .element': {
        border: '0.2em solid',
        '&:nth-of-type(1)': {
          borderTop: '0',
          borderLeft: '0',
        },
        '&:nth-of-type(2)': {
          borderTop: '0',
          borderLeft: '0',
          borderRight: '0',
        },
        '&:nth-of-type(3)': {
          borderTop: '0',
          borderLeft: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(4)': {
          border: '0',
        },
      },
    },
  },
  '& .container-heading-one': {
    marginBottom: 'auto',
  },
  '& .container-paragraph + .container-heading-one, & .container-heading-two + .container-heading-one': {
    marginBottom: '0',
    marginTop: 'auto',
  },
  '& .container-block-quote blockquote:before': {
    top: '0',
    transform: 'scale(3)',
  },
});
