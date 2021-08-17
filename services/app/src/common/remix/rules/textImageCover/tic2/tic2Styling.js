//  tic2:   Image full bleed, text split and horzontally aligned. Two variations. Either image pinned to top of slide, or to bottom.
// ---------------------------------------------------------------------------------------------------------------------------------
export const tic2Styling = (align, alignItems) => {
  const imageContainer = {
    position: 'absolute',
    left: '0',
    right: '0',
    height: '67%',
    '& .element': {
      width: '100% !important',
      alignSelf: 'flex-end !important',
      margin: '0 !important',
      '& .imgWrap img': {
        objectFit: 'cover',
      },
    },
  };
  if (align === 'bottom') {
    imageContainer.bottom = '0';
  } else {
    imageContainer.top = '0';
  }
  return {
    height: '100%',
    alignItems,
    display: 'grid',
    gridGap: '0.15em',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: '0fr',
    padding: '4.5%',
    '& .container': {
      display: 'flex',
      justifyContent: 'center', // -
      alignItems: 'flex-start !important', // |
      margin: '0 !important',
      height: '22%',
    },
    '& .container-paragraph, & .container-block-quote, & .container-heading-one, & .container-heading-two': {
      zIndex: '2',
      gridColumn: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      margin: '0 !important',
      '& P': {
        margin: '0',
        lineHeight: '1.235',
        fontSize: '115%',
      },
      '& blockquote': {
        width: 'auto',
        margin: '0 auto',
        '& P': {
          textAlign: 'center',
        },
      },
      '& H1, & H2': {
        textAlign: 'left',
        width: '100%',
        letterSpacing: '-0.05rem',
        margin: '0',
      },
    },
    '& .container-image': imageContainer,
  };
};
