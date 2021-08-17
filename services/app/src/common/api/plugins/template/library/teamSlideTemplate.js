import { clustersRoundedImageRemix } from "../../../../remix/rules/clusters/clustersRoundedImage/clustersRoundedImage";
import Palette from "../../../../../theme/Palette";
import { componentBuilder } from "../../builder/ComponentBuilder";

const builder = componentBuilder();
export const teamSlideTemplate = builder
  .template({
    name: 'Team slide',
    remix: clustersRoundedImageRemix,
    palette: new Palette("#4e4e4e", "#f6f6f4", "#000000", "#000000", "#414141"),
  })
  .title('Our team')
  .collection(
    builder.group()
      .image({
        from: "unsplash",
        label: "portrait",
        url: "https://images.unsplash.com/photo-1495490140452-5a226aef25d4?ixid=MnwxOTEwMjl8MHwxfHNlYXJjaHwzNTF8fHBvcnRyYWl0fGVufDB8MHx8fDE2MTUyOTc0NTI&ixlib=rb-1.2.1",
      })
      .paragraph("Jonathan")
      .build(),

    builder.group()
      .image({
        from: "unsplash",
        label: "portrait",
        url: "https://images.unsplash.com/photo-1511546395756-590dffdcdbd1?ixid=MnwxOTEwMjl8MHwxfHNlYXJjaHwxMzB8fHBvcnRyYWl0fGVufDB8MHx8fDE2MTUyOTczNzU&ixlib=rb-1.2.1",
      })
      .paragraph("Alice")
      .build(),

    builder.group()
      .image({
        from: "unsplash",
        label: "portrait",
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MnwxOTEwMjl8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdHxlbnwwfDB8fHwxNjE1Mjk3Mjkx&ixlib=rb-1.2.1",
      })
      .paragraph("Suzan")
      .build(),
  );
