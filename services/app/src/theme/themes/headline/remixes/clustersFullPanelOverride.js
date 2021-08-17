export const clustersFullPanelOverride = (palette) => ({

  '& .sequence': {
    borderWidth: '0.05em',
    borderColor: `${palette.text()}44`,
    '& .cluster': {
      borderColor: `${palette.text()}44`,  
    },
  },
  '& .group-text-before, & .group-text-after': {
    borderWidth: '0.05em',
    borderColor: `${palette.text()}44`,   
  },

  // '& .sequence': {
  //   borderColor: `${palette.text()}44 !important`,
  //   background: `repeating-linear-gradient( 45deg, ${palette.background()}, ${palette.background()} 0.3em, ${palette.text()}11 0.3em, ${palette.text()}11 0.6em)`,
  //   margin: '0 !important',
  //   height: '100%',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flexWrap: 'wrap !important',
  //   borderLeft: '0.05em solid',
  //   '& .cluster': {
  //     borderColor: `${palette.text()}44 !important`,
  //     background: palette.backgroundColor,
  //     '& blockquote': {
  //       '&:before': {
  //         background: 'transparent !important',
  //       },
  //       '& p:before': {
  //         backgroundImage: `linear-gradient( 0deg, ${palette.text()}, ${palette.text()} 90%, transparent 90%) !important`,
  //       },
  //     },
  //     width: '33.3334%',
  //     height: '50%',
  //     margin: '0',
  //     padding: '1.5em',
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'flex-start !important',
  //     textAlign: 'left !important',
  //     border: '0.05em solid',
  //     borderLeftWidth: '0',
  //     position: 'relative',
  //     '&:last-of-type': { borderRightWidth: '0.05em' },
  //     '& .cluster': {
  //       display: 'contents',
  //     },
  //     '& .container': {
  //       textAlign: 'left !important',
  //       fontSize: '100% !important',
  //       zIndex: '2',
  //     },
  //     '& .container-image': {
  //       margin: '0 !important',
  //       position: 'absolute',
  //       top: '0',
  //       bottom: '0',
  //       left: '0',
  //       right: '0',
  //       height: '100% !important',
  //       zIndex: '1',
  //       opacity: '0.8',
  //     },
  //     '& .container-heading-one': {
  //       fontSize: '75% !important',
  //       marginTop: 'auto',
  //       '& h1': {
  //         margin: '0',
  //       },
  //     },
  //     '& .container.container-block-quote blockquote': {
  //       '&:before': {
  //         padding: '0.05em',
  //         lineHeight: '1.2',
  //         transform: 'scale(2.5)',
  //       },
  //       '& p': {
  //         border: '0 !important',
  //         textAlign: 'left !important',
  //         '&:before': {
  //           content: '""',
  //           display: 'block',
  //           position: 'absolute',
  //           top: '0',
  //           bottom: '0',
  //           left: '0.55em',
  //           width: '0.03em',
  //         },
  //       },

  //     },
  //   },
  //   // 2 x cluster
  //   '&[data-length="2"]': {
  //     '& .cluster': {
  //       width: '50%',
  //       height: '100%',
  //       '&:last-of-type': {
  //         width: '50%',
  //         height: '100%',
  //       },
  //     },
  //   },
  //   // 3 x cluster
  //   '&[data-length="3"]': {
  //     '& .cluster': {
  //       height: '100%',
  //       width: '33.3334%',
  //     },
  //   },
  //   // 4 x cluster
  //   '&[data-length="4"]': {
  //     '& .cluster': {
  //       width: '50%',
  //       '&:nth-of-type(3)': { borderTopWidth: '0' },
  //       '&:nth-of-type(4)': { borderTopWidth: '0' },
  //     },
  //   },
  //   // 5 x cluster
  //   '&[data-length="5"]': {
  //     '& .cluster': {
  //       width: '33.3334%',
  //       '&:nth-of-type(4)': { borderTopWidth: '0' },
  //       '&:nth-of-type(5)': { borderTopWidth: '0' },
  //     },
  //   },
  //   // 6 x cluster
  //   '&[data-length="6"]': {
  //     '& .cluster': {
  //       width: '33.3334%',
  //       '&:nth-of-type(4)': { borderTopWidth: '0' },
  //       '&:nth-of-type(5)': { borderTopWidth: '0' },
  //       '&:nth-of-type(6)': { borderTopWidth: '0' },
  //     },
  //   },
  // },
  
});
