//  i2:   Single image, windowed bleed (ie. image fills entire content within gutter).   (Boost 9)
//  ----------------------------------------------------------------------------------------------
import { Remix } from "../../../Remix";
import { Animations } from "../../../effects/Animations";
import { when } from "../../../match/RemixRule";
import { image, plainText, label } from "../../../match/Matchers";
import { anyNumber, once } from "../../../match/expressions/Occurring";

export const imageWindowedRemix = new Remix('image-1-windowed', {
  '& .container': {
    width: '100%',
  },
  '& .container-image': {
    margin: '0',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
  '& .group-text-before, & .group-text-after': {
    width: '100%',
    margin: '0 auto 1em auto',
  },
  '& .group-text-after': {
    margin: '1em auto 0 auto',
  },
},
when(
  label(plainText(anyNumber), "group-text-before"),
  image(once),
  label(plainText(anyNumber), "group-text-after"),
).score(30),
{
  animation: Animations.imagePan()
});
