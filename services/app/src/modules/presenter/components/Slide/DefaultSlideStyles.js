import { makeStyles } from "@material-ui/styles";

export const defaultSlideStyles = {
  slideRoot: {
    width: '100%',
    position: 'relative',

    "& .slide > *": {
      "-webkit-transform": "translateZ(0)",
    },

    '& .overflow:after': {
      background: 'repeating-linear-gradient(-55deg, rgb(212 11 0 / 0.9) 0em, rgb(212 11 0 / 0.9)1.5em, rgb(88 0 11 / 0.8) 1.5em, rgb(88 0 11 / 0.8)3em)',
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      height: '1.75em',
      zIndex: '1',
    },

    '& .slide': {
      display: 'flex', // flex
      flexDirection: 'column', // default to columns
      justifyContent: 'center', // default to centered vertically
      alignItems: 'flex-start', // default to left-aligned horizontally
      textAlign: 'left', // default to left-aligned text
      height: '100%',
      width: '100%',
      boxSizing: 'border-box',
      textShadow: 'none',
      cursor: 'default',
      position: 'relative',

      //  Slide Header
      '& .slideHeader.show': {
        display: 'block',
      },

      // Hook
      '& .hook': {
        display: 'none',
      },

      //  Component Containers
      '& .container': {

        // Maths Container
        '&.container-math': {
          width: '100%',
          // overflow: 'hidden',
          fontSize: '1.75em',
          '& > div': {
            margin: '0 auto',
            '& .katex-display > .katex': {
              boxSizing: 'border-box',
              textAlign: 'left',
            },
          },
          '& h4': {
            border: '0.1em solid',
            borderLeftWidth: '0.5em',
            borderRadius: '0.25em',
            padding: '0.5em 0.5em 0.5em 0.75em',
            fontWeight: '500',
            fontSize: '0.8em',
          },
        },

        //  Chart Container
        '&.container-chart': {
          height: '100%',
          width: '100%',
          padding: '0',
          overflow: 'hidden',
          display: 'flex',
        },

        //  Table Container
        '&.container-table': {
          overflow: 'hidden',
          display: 'flex',
          width: '100%',
          '& table': {
            margin: '4px 0',
            borderCollapse: 'collapse',
            width: '100%',
            '& td': {
              padding: '4px',
              border: '2px solid #ddd',
              width: '10%',
            }
          },
        },

        //  Image Container
        '&.container-image': {
          width: '100%',
          height: '100%', // important for default image heights, but remove this during remixes for safari
          padding: '0',
          overflow: 'hidden',
          '& .element': {
            width: '100%',
            height: '100%',
          },
        },

        //  Video Container
        '&.container-video': {
          width: '100%',
          height: '100%',
          padding: '0',
          overflow: 'hidden',
          '& .element': {
            width: '100%',
            height: '100%',
          },
        },

        //  Single Logo Container
        '&.container-logo': {
          '& .element': {
            width: '100%',
            height: '100%',
          },
          '& .imgWrap.opaqueBg': {
            borderRadius: '0.25em',
            padding: '1em',
          },
          '& img': {
            maxHeight: '15em',
          },
        },

        //  Code Container
        '&.container-code': {
          boxSizing: 'border-box',
          backgroundColor: "#202020",
          width: '100%',
          '& code': {
            color: '#fff',
          },
          padding: '0.05em 1.5em',
          marginTop: "0.25em",
          marginBottom: '1em',
          borderRadius: 6,
        },

        // Inline Code
        '& span.inlineCode': {
          border: '0.025em solid rgba(0,0,0,0.1)',
          borderRadius: '0.125em',
          margin: '0',
          padding: '0 0.25em',
          color: '#f31237',
          backgroundColor: 'rgba(0,0,0,.03)',
          fontFamily: '"Overpass Mono"',
          fontSize: '0.95em',
          letterSpacing: '-0.05em',
          lineHeight: '1.425',
          wordSpacing: '-0.25em',
        },

        //  Map Container
        '&.container-map': {
          width: '100%',
          height: '100%', // important for default image heights, but remove this during remixes for safari
          padding: '0',
          overflow: 'hidden',
        },

        // List Containers
        '&.container-bulleted-list, &.container-numbered-list': {
          width: '100%',
          margin: '0',
          padding: '0',
          '& ul, & ol': {
            marginBottom: '0.75em',
            '& ul, & ol': {
              marginBottom: '0',
            },
          },
        },

        // Text Containers
        '&.container-heading-one, &.container-heading-two, &.container-paragraph': {
          margin: '0',
          padding: '0',
        },

      },

      // Drag and Drop Containers
      // ------------------------

      // Wrapper around each container's component-specific markup. 1/2
      '& .container .element': {
        width: '100%',
        // background:'#66ffff44',
      },

      //  Single Image alone on a slide should be centered
      '& .element .imgWrap': {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        '& img': {
          maxHeight: '100%',
          objectFit: 'contain',
        },
      },

      //  Text styling is minimal here, so not as to override themes
      '& h1, & h2, & p': {
        zIndex: '1',
      },

      '& ol, & ul': {
        zIndex: '1',
        margin: 0,
        padding: 0,
        counterReset: 'listcounter',
        listStyle: 'none',
        width: '98.5%',
        '& li': {
          margin: "0.25em 0 0.25em 1.5em",
          padding: 0,
          counterIncrement: 'listcounter',
          lineHeight: '1.25',
          minHeight: '1.25em',
          width: 'auto',
          '&:before': {
            marginLeft: "-1.5em",
            float: 'left',
            fontFamily: 'Inter var',
          },
          '& p': {
            fontSize: '100%',
            margin: "0",
          },
        },
        // nested
        '& ul, ol': {
          margin: "0",
          '& li': {
            fontSize: '100%',
            margin: "0.25em 0 0.25em 1.5em",
            '& li': {
              margin: "0.25em 0 0.25em 1.5em",
            },
          },
        },
      },

      // ordered list bullet
      '& ol li:before': {
        content: 'counter(listcounter) "."',
      },
      '& ol ol li': {
        marginLeft: '2em !important',
        '&:before': {
          content: 'counters(listcounter,".") ". " ',
          marginLeft: '-2em',
        },
      },
      '& ol ol ol li': {
        marginLeft: '2.8em !important',
        '&:before': {
          marginLeft: '-2.8em',
        },
      },

      // unordered list bullet
      '& ul li:before': {
        content: '"•"',
      },
      '& ul ul li:before': {
        content: '"◦"',
        fontWeight: '700',
      },
      '& ul ul ul li:before': {
        content: '""',
        position: 'relative',
        top: '0.45em',
        width: '0.25em',
        height: '0.25em',
        background: '#1a1a1a',
      },

      // Quotes
      '& .container-block-quote': {
        width: '85%',
        '& blockquote': {
          textAlign: 'left',
          padding: '0',
          margin: '0',
          '& p': {
            display: 'block',
            position: 'relative',
            fontSize: '1.5em',
            lineHeight: '1.35em',
            margin: '0 0 1em 0',
            '&:before, &:after': {
              content: '"“"',
              fontSize: '1.6em',
              fontFamily: 'Arial, sans-serif',
              lineHeight: '0',
              margin: '0.3em 0 0 -0.55em',
              position: 'absolute',
              top: '0.15em',
              opacity: '0.75',
            },
            '&:after': {
              content: '"”"',
              margin: '0 0 0 0.05em',
              position: 'relative',
            },
          },
        },
      },

      '& span.mark': {
        zIndex: '1',
        padding: "0.5%",
        margin: "-0.5%",
      },

      // clusters
      '& .cluster': {
        marginBottom: "1em",
        '& h2': {
          marginBottom: '0.166em',
        },
        '& > .cluster': {
          marginBottom: "0",
        },
        '&:last-child': {
          marginBottom: "0",
        },
      },

    }

  }
};

export const getDefaultSlideStyles = (deterministic = false) => makeStyles(() => (defaultSlideStyles), { deterministic, meta: 'DefaultSlideStyles' });
