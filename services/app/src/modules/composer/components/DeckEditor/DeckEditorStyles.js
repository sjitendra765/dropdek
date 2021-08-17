import { makeStyles } from '@material-ui/styles';
import chroma from "chroma-js";
import { NewSlideButtonStyling } from "./modules/plugins/component/slide/components/NewSlideButton";

export const DeckEditorStyles = () => makeStyles((theme) => ({
  root: {
    minHeight: '94vh',
    padding: theme.spacing(0),
    '& :focus': {
      outline: 'none',
    },
    '& ::selection': {
      color: theme.palette.text.selected,
      backgroundColor: theme.palette.text.selectedbg,
      textShadow: 'none',
    },
  },
  paper: {
    // Counter for showing slide numbers.
    counterReset: "slideCounter",
    // editorSlide wraps every slide
    // editorElement contains an individual element + options popover
    // elementOptions may be empty of contain an icon which launches popover
    // elementContent contains the markup for the element
    borderRadius: 0,
    minHeight: '93vh',
    width: '100%',
    fontSize: '0.95em',
    background: theme.dark() ? theme.palette.background.main : `linear-gradient(90deg, ${theme.palette.background.elev02} -45%, #FFFFFF 50%)`,
    color: theme.palette.text.primary,
    "& .topFade": {
      position: "absolute",
      zIndex: 1,
      height: 20,
      background: theme.dark() ? theme.palette.background.main : `linear-gradient(90deg, ${theme.palette.background.elev02} -45%, #FFFFFF 50%)`,
      top: '0',
      left: '-1em',
      right: '0',
    },
    "& .bottomFade": {
      position: "sticky",
      zIndex: 5,
      bottom: '1.5vh',
      width: "105%",
      marginLeft: '-5%',
      background: theme.dark() ? `linear-gradient(0deg, ${theme.palette.background.main} 60%, ${theme.palette.background.main}00 100%), linear-gradient(0deg, ${theme.palette.background.main} 40%, ${theme.palette.background.main}00 110%)` : 'url(../bottomfade.png)',
      backgroundSize: theme.dark() ? "unset" : "contain",
      height: "2em",
      [theme.breakpoints.down('xs')]: {
        bottom: 0,
        left: 0,
        position: 'fixed',
      },
    },
    '& .editorInner': {
      margin: '0 auto 0 -16px',
      // maxWidth: '565px',
      userSelect: 'none',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        top: 104,
        margin: '8px auto 0 -2px',
      }
    },

    '& .editorSlide': {
      counterIncrement: 'slideCounter',
      position: 'relative',
      '&:first-of-type': {
        marginTop: '132px',
        [theme.breakpoints.down('xs')]: {
          marginTop: '0',
        },
      },
      transition: "margin-bottom 150ms ease-in",
      "&.magic-drawer-open .slide-area": {
        // Pushes elements down to make way for the magic drawer
        transition: "margin-bottom 150ms ease-out",
        marginBottom: 150
      },
      "& .slide-area": {
        position: "relative",
        marginLeft: 6,
        display: "flex",
        flexDirection: "row",
        background: theme.dark() ? `linear-gradient(90deg, #393939 0%, ${theme.palette.background.border03} 40%)` : '#ffffff',
        fontFeatureSettings: '"tnum"',
        borderRadius: 6,

        // Pulls up when drawer closes
        transition: "margin-bottom 100ms ease-in",
        "&.control-mode-full": {
          minHeight: 90,
        },

        "&:hover .slide-controls": {
          // Hovering slide area should show controls!
          "&.control-mode-compact": {
            "& .slide-number": {
              display: "none"
            },
            "& .options": {
              // Options cog styled when hovering over slide
              display: "inline",
              position: "relative",
              zIndex: 2,
              "& button": {
                opacity: 0.7,
                transition: "opacity 250ms ease-out",
                color: theme.dark() ? '#7a7a7a' : '#bbb',
              }
            }
          },
          "& .control-actions-outer.control-mode-full": {
            opacity: 1,
            "& .control-actions-inner": {
              opacity: 0.4,
              transition: "opacity 250ms ease-out"
            }
          }
        },

        "& .slide-controls.control-mode-compact.compact-mode-open": {
          // In compact mode controls should stay if toggled open
          "& .slide-number": {
            display: "none"
          },
          "& .options": {
            // Options cog styled when hovering over slide
            display: "inline",
            position: "relative",
            // zIndex: 2,
            "& button": {
              transition: "opacity 250ms ease-out",
              color: theme.dark() ? '#7a7a7a' : '#bbb',
              opacity: 0.7,
            }
          },
          "& .control-actions-outer": {
            opacity: 1,
            "& .control-actions-inner": {
              opacity: 0.4,
              transition: "opacity 250ms ease-out"
            }
          }
        },

        '& .slide-controls': {
          position: "relative",
          "&:hover .options button": {
            opacity: "1 !important",
          },
          "&:hover .control-actions-outer, &.active .control-actions-outer": {
            opacity: 1,
            "& .control-actions-inner": {
              opacity: "1 !important",
              transition: "opacity 150ms ease-out",
            }
          },
          "&:not(.active), &.control-mode-full": {
            "& .options": {
              // The options cog, not shown when we have enough space for the controls!
              display: "none"
            }
          },
          '&.active.control-mode-compact.compact-mode-open .options button': {
            // Showing options cog when 1) slide is active and 2) compact mode open
            transition: "color 250ms ease-out, opacity 250ms ease-out",
            color: theme.palette.text.primary,
            opacity: 0.7
          },
          '&.active.control-mode-compact .slide-number, &.control-mode-compact.compact-mode-open .slide-number': {
            display: "none"
          },
          color: "#313131",
          background: theme.dark() ? "#2e2e2e" : "#ebebeb",
          borderRight: theme.dark() && `1px solid ${theme.palette.background.border02}`,
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          display: "flex",
          // flexDirection: "column",
          width: 40,
          transition: "width 100ms ease-in",

          "&.control-mode-compact": {
            "& .control-actions-outer": {
              transition: "opacity 150ms ease-in",
              opacity: 0
            },
            // Width of control actions when we have only one component on the slide and user hovers over controls
            "&.compact-mode-open": {
              transition: "width 250ms ease-out",
              width: 160,
              "& .control-actions-outer": {
                transition: "opacity 350ms ease-in",
                opacity: 1
              },
              "& .options": {
                display: "inline",
                transition: "color 250ms ease-out",
                color: theme.dark() ? theme.palette.button.selected : "#bbb",
              }
            }
          },
          '& .slide-number': {
            position: "relative",
            width: "100%",
            display: "block",
            marginTop: 15,
            color: theme.dark() ? '#7a7a7a' : '#bbb',
            transition: "color 250ms ease-out",
            '&.active': {
              transition: "color 250ms ease-out",
              color: theme.palette.text.primary
            },
            fontWeight: '600',
            fontSize: '12px',
            textAlign: 'center',
            userSelect: 'none',
            '&:before': {
              content: 'counter(slideCounter)',
            }
          },
          "& .options": {
            display: "inline",
            "& button": {
              opacity: 0.7,
              transform: "scale(0.9)",
              transition: "transform 150ms ease-out",
              color: theme.dark() ? theme.palette.button.selected : "#bbb",
              "&:hover": {
                transform: "scale(1.07)",
                transition: "transform 150ms ease-out",
                color: theme.palette.icon.primary,
              }
            },
            marginTop: 9,
            marginLeft: 6,
          },
          '& .control-actions-outer': {
            right: 5,
            opacity: 0,
            position: "absolute",
            bottom: 0,
            paddingTop: 7,
            paddingBottom: 8,
            "&.control-mode-compact": {
              background: "none",
              top: 10,
              paddingTop: 0,
              "& .control-actions-inner": {
                flexDirection: "row",
                paddingBottom: 0,
                marginRight: 2
              }
            },
            background: theme.dark() ? "linear-gradient(180deg, rgba(46,46,46,0) 0%, rgba(46,46,46,1) 10%)" : "linear-gradient(180deg, rgba(235,235,235,0) 0%, rgba(235,235,235,1) 10%)",

            "& .control-actions-inner": {
              position: "relative",
              opacity: 0,
              transition: "opacity 250ms ease-in",
              background: theme.dark() ? "linear-gradient(180deg, rgba(46,46,46,0) 0%, rgba(46,46,46,1) 10%)" : "linear-gradient(180deg, rgba(235,235,235,0) 0%, rgba(235,235,235,1) 10%)",
              "&:hover": {
                opacity: 1
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& button": {
                transform: "scale(0.9)",
                transition: "transform 150ms ease-out",
                color: theme.dark() ? theme.palette.button.selected : "#bbb",
                "&.magic-wand": {
                  // Styling of the Magic Wand Button
                  opacity: 0.5,
                  "&.active": {
                    opacity: 1,
                    color: chroma(theme.palette.primary.main).alpha(0.5).hex(),
                    boxShadow: theme.dark() ? `0 0 14px -3px ${chroma(theme.palette.primary.main).alpha(0.4).hex()}` : `0 0 5px 0px ${chroma(theme.palette.primary.main).alpha(0.4).hex()}`,
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "scale(1)",
                      backgroundColor: theme.dark() ? "#2e2e2e" : "#dcdcdc",
                      boxShadow: theme.dark() ? `0 0 15px -4px ${theme.palette.primary.main}` : `0 0 6px -1px ${theme.palette.primary.main}`,
                    }
                  }
                },
                "&:hover": {
                  transform: "scale(1.07)",
                  transition: "transform 150ms ease-out",
                  color: theme.palette.icon.primary,
                }
              },
            },

          }
        },

        // This is a wrapper for the elements on a slide
        "& .slide-content": {
          position: "relative",
          width: "100%",
          padding: 7,
          "box-shadow": "-3px 0px 5px -5px rgba(0,0,0,0.5)",
          "-webkit-box-shadow": "-3px 0px 5px -5px rgba(0,0,0,0.5)",
          "-moz-box-shadow": "-3px 0px 5px -5px rgba(0,0,0,0.5)",

          // Group support
          '& .editor-group-collection': {
            backgroundColor: theme.dark() ? "rgba(30,31,32,0.1)" : "rgb(249, 249, 249)",
            boxShadow: `inset ${theme.dark() ? "rgba(20,20,20,0.35)" : "rgba(20,20,20,0.15)"} 2px 2px 1px -1px, inset ${theme.dark() ? "rgba(45,46,47,0.7)" : "rgb(244, 244, 244)"} -2px -2px 1px 0px`,
            position: "relative",
            margin: "6px 0 6px 0",
            borderRadius: 6,
            padding: "1px 6px 1px 6px",
            paddingLeft: 42,
            '& .group-icon': {
              position: "absolute",
              top: 22,
              left: 13,
              color: theme.dark() ? '#7a7a7a' : '#bbb',
            },
            "& .editor-group": {
              position: "relative",
              margin: "7px 0 7px 0",
              "&:first-of-type": {
                margin: "6px 0 7px 0"
              },
              "&:last-of-type": {
                margin: "7px 0 6px 0"
              },
              background: theme.dark() ? "linear-gradient(90deg, #393939 0%, #323234 40%)" : "#fff",
              boxShadow: `${theme.dark() ? "rgba(20,20,20,0.35)" : "rgba(20,20,20,0.05)"} 1px 1px 2px 1px, ${theme.dark() ? "rgba(20,20,20,0.35)" : "rgba(20,20,20,0.05)"} -1px -2px 2px 1px`,
              padding: 6,
              borderRadius: 6,

              "&:hover .editor-group-controls": {
                transition: "opacity 350ms ease-out",
                opacity: 1,
              },
              "& .editor-group-controls": {
                transition: "opacity 250ms ease-out",
                opacity: 0,
                position: "absolute",
                bottom: 0,
                right: 0,
                height: 25,
                width: 60,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                color: theme.dark() ? '#5a5959' : '#bbb',
                background: theme.dark() ? "rgba(30,31,32,0.1)" : "rgb(249, 249, 249)",
                borderTopLeftRadius: 6,
                borderBottomRightRadius: 6,
                boxShadow: `inset ${theme.dark() ? "rgba(20,20,20,0.35)" : "rgba(20,20,20,0.05)"} 1px 1px 1px 0px`,
                "& button": {
                  opacity: 0.6,
                  transition: "opacity 150ms ease-out",
                  padding: 2,
                  color: theme.dark() ? theme.palette.button.selected : "#bbb",
                  backgroundColor: "transparent",
                  "& svg": {
                    height: 16,
                    width: 16
                  },
                  "&:hover": {
                    transition: "color 150ms ease-out",
                    color: theme.palette.icon.primary,
                  }
                },
              }
            }
          },

          '& .editorElement': {
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '46px auto',
            padding: '0.25rem 0 0.25rem 0.25rem',
            borderRadius: '6px',
            background: "transparent",
            "&:first-of-type .elementOptions button.type-paragraph svg": {
              visibility: "visible !important",
              opacity: "1 !important",
            },
            "&:hover": {
              transition: "background 300ms ease-out",
              background: theme.dark() ? `linear-gradient(90deg, ${theme.palette.background.elev04} 0%, ${theme.palette.background.border03} 40%)` : `linear-gradient(90deg, ${theme.palette.background.elev04} 0%, #ffffff 40%)`,
              "& .elementOptions button.type-paragraph svg": {
                visibility: "visible",
                opacity: 1,
                transition: "opacity 300ms ease-in",
              },
            },

            // 01 Element Options: Drag and Drop, Mime Icon, Lightning Bolt ===v===
            '& .elementOptions': {
              textAlign: 'left',
              padding: '0 0 0 3px',
              height: '20px',
              '& button': {
                background: 'transparent',
                fontWeight: '100',
                color: theme.palette.text.secondary,
                padding: '4px',
                borderRadius: '4px',
                margin: '-2px 0 0 0',
                cursor: 'pointer',
                position: 'relative',
                '&:hover': {
                  color: theme.palette.gradient.stop03,
                },
                '& svg': {
                  fontSize: '1.2rem',
                  margin: '0',
                  padding: '0',
                },
              },
            },
            '& .elementOptions.selected': {
              position: 'relative',
              '& button.icon': {
                opacity: 1,
                color: theme.palette.primary.main,
                transition: "opacity 300ms ease-in, transform 300ms ease-in",
                transform: "scale(1.1)",
                "&:hover": {
                  transition: "opacity 200ms ease-in, transform 200ms ease-in",
                  transform: "scale(1.3)",
                  opacity: 1,
                  color: theme.palette.primary.main,
                }
              },
            },
            "& .elementOptions:not(.clicked) button.type-paragraph svg": {
              visibility: "hidden",
              opacity: 0,
              transition: "opacity 300ms ease-in"
            },

            // 02 Element Content: User entered text
            '& .elementContent': {
              padding: '0',
              userSelect: 'text'
            },

            // When dragging element, show destination as line
            // ===============================================
            '& .dropLine': {
              position: 'absolute',
              left: '-0.42rem',
              right: '-0.75rem',
              height: 2,
              opacity: 1,
              background: theme.palette.primary.main,
              // background:'#09cc39', // green?
              borderRadius: '0px',
              zIndex: '5',
              bottom: -1,
            },
            '& .dropLine.inactive': {
              display: 'none',
            },
            '& .dropLine.top': {
              top: -1,
            },
            '& .dropLine.bottom': {
              bottom: -1,
            },
          },

          // Highlight - pulse on to draw attention
          '& .editorElement.highlighted': {
            '& button:before ': {
              content: '""',
              position: 'absolute',
              width: '1px',
              height: '1px',
              margin: '-1px 0 0 0',
              borderRadius: '50%',
              animation: 'pulse-out 0.8s 1 ease-out',
            },
          },
        },
      },
      // New slide break button system
      ...NewSlideButtonStyling.main(theme),

      '&:last-of-type': {
        // paddingBottom: 50,
        marginBottom: '62px',
        [theme.breakpoints.down('xs')]: {
          marginBottom: '0',
        },

        // This is to make sure I can treat the last slide break suggestion separately
        ...NewSlideButtonStyling.last(theme)
      },

    },

    '& .editor': {
      backgroundColor: "transparent",
      padding: theme.spacing(0, 2, 0, 4),
      fontWeight: theme.dark() ? 300 : 400,
      minHeight: '99vh',
      marginBottom: 0,
      '& .editable::-webkit-scrollbar': {
        display: "none"
      },
      '& .editable': {
        "-ms-overflow-style": "none",
        scrollbarWidth: "none",
        minHeight: '98vh',
        lineHeight: '1.4',
        marginLeft: -20,
        paddingBottom: 60,
        // Phone size should not scroll within the editor
        [theme.breakpoints.up('sm')]: {
          height: '82vh',
          overflow: 'scroll',
          marginLeft: 0,
          padding: theme.spacing(0),
          paddingRight: theme.spacing(2),
        },
        '& .elementContent': {
          '& span.link': {
            cursor: "pointer",
            display: "inline",
            overflowWrap: "wrap",
            userSelect: "none",
            boxShadow: `${theme.dark() ? "rgb(65,65,65)" : "rgb(240,240,240)"} -2px 0px 0px 2px, ${theme.dark() ? "rgb(65,65,65)" : "rgb(240,240,240)"} 2px 0px 0px 2px`,
            backgroundColor: theme.dark() ? "rgb(65,65,65)" : "rgb(240,240,240)",
            borderRadius: 3,
            // padding: "0 6px 0 6px",
            margin: "0 2px 0 2px",
            color: theme.dark() ? "#fff" : "#000",
            textDecoration: "none",
            boxDecorationBreak: "clone",
            "-webkit-box-decoration-break": "clone",
            "& button": {
              position: "relative",
              marginLeft: 2,
              top: -1,
              backgroundColor: "transparent",
              color: theme.dark() ? "rgb(150,150,150)" : "rgb(100,100,100)",
              "& svg": {
                height: "0.65em",
                width: "0.65em"
              },
              '&:hover': {
                color: theme.dark() ? "rgb(220,220,220)" : "rgb(30,30,30)"
              }
            },
          },
          '& h1': {
            fontSize: '1.1em',
            fontWeight: theme.dark() ? 500 : 600,
            margin: '0',
          },
          '& h2': {
            fontSize: '1em',
            fontWeight: theme.dark() ? 400 : 500,
            margin: 0
          },
          '& blockquote': {
            color: theme.palette.text.primary,
            margin: '0 0 0 2px',
            padding: theme.spacing(0, 0, 0, 0),
            borderLeft: '0',
          },
          '& figure': {
            padding: 0,
            margin: 0,
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
          },
          '& hr': {
            borderWidth: 1,
            borderStyle: 'solid',
          },
          '& ul, & ol': {
            margin: '0 0 0 -1.25rem',
          },
          '& span.emphasis': {
            color: theme.palette.primary.main,
          },
          '& span.inlineCode': {
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '4px',
            margin: '0',
            padding: '1px 3px',
            color: theme.palette.primary.main,
            backgroundColor: 'rgba(0,0,0,.03)',
            fontFamily: '"Overpass Mono"',
            fontSize: '0.925em',
            letterSpacing: '-0.05em',
          },
          '& .emptyP': {
            border: '1px red solid',
            '& [data-slate-length="0"]': {
              display: 'inline',
            },
            '& br': {
              display: 'none', // Slate adds a <br> for empty leaves
            },
          },
        },
        caretColor: "#f31139"
      },

      '& .slide-break': {
        userSelect: 'text',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        margin: '0px 1px',
        height: '28px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'flex-start', // |---x---|
        alignItems: 'center',
        lineHeight: 0.4,
        fontSize: '1em',
        fontWeight: 500,
        // Default
        "&:before": {
          content: '"– – –"',
          textAlign: 'center',
          borderRadius: '50em',
          transition: 'color 200ms ease-in-out 0ms, box-shadow 200ms ease-in-out 0ms, background-color 200ms ease-in-out 0ms, letter-spacing 200ms ease-in-out 0ms, padding 200ms ease-in-out 0ms, margin 200ms ease-in-out 0ms',
          color: theme.palette.text.secondary,
          boxShadow: theme.dark() ? 'inset 0 1px 1px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 1px rgba(0, 0, 0, 0.025)',
          backgroundColor: theme.dark() ? theme.palette.background.elev01 : theme.palette.icon.primaryInset,
          letterSpacing: '-0.375rem',
          padding: '0 12px 2px 6px',
          marginLeft: '13px', // 17
          opacity: '0.7',
          cursor: 'pointer',
        },
        // Hover, Active Hover
        "&:hover:before": {
          boxShadow: theme.dark() ? 'inset 0 1px 1px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 1px rgba(0, 0, 0, 0.05)',
          color: theme.palette.icon.primary,
          backgroundColor: theme.dark() ? theme.palette.background.elev01 : theme.palette.icon.primaryInset,
          textShadow: 'none',
          letterSpacing: '0',
          padding: '0 7px 2px 7px',
          marginLeft: '1px',
          opacity: '1',
        },
      },
      "& .slide-break.selected:before, & .slide-break.selected:hover:before": {
        color: '#FFFFFF',
        boxShadow: theme.dark() ? 'inset 0 1px 1px rgba(0, 0, 0, 0.2)' : 'inset 0 1px 1px rgba(0, 0, 0, 0.05)',
        textShadow: '0 1px 0 #cf112f',
        backgroundColor: theme.palette.primary.main,
        letterSpacing: '0',
        padding: '0 7px 2px 7px',
        marginLeft: '1px',
        opacity: theme.dark() ? 0.75 : 1,
      },
    },
  }
}), { meta: 'DeckEditor' });
