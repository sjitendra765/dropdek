import React, { useState } from "react";
import debounce from "lodash.debounce";
import Palette from "../../../../../../../../theme/Palette";
import ColorPicker from "./ColorPicker";

const ColorPickerComponent = ({ colors, palette, component, setPalette }) => {

  const [color, setColor] = useState(palette[component]);

  const onChangeComplete = (c) => {
    const newPalette = palette.toDataObject();
    newPalette[component] = c.hex;
    setPalette(Palette.fromDataObject(newPalette));
  };
  const onChangeCompleteDebounced = debounce(onChangeComplete, 500);

  const onChange = (c) => {
    setColor(c);
  };

  return (<ColorPicker colors={colors} color={color} onChange={onChange} onChangeComplete={onChangeCompleteDebounced}/>);
};
export default ColorPickerComponent;
