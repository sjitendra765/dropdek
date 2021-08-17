export const clustersPanelFixedImageOverride = (palette) => ({

  '& .sequence .cluster': {
    background: 'transparent !important',
    backdropFilter: 'brightness(1.2) saturate(1.05)',
    border: '0',
    borderRadius: '0.75em',
    boxShadow: '0.08em 0.24em 0.8em 0.12em rgb(0 0 0 / 16%)',
  },

  '& .container-block-quote': {
    marginTop: '0.5em !important',
    '& blockquote': {
      margin: '0 auto',
      minWidth: '50%',
      '& p': {
        width: '100%',       
      },
    },
  },
});
