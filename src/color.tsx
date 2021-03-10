import React from 'react';
import { CirclePicker, SliderPicker } from 'react-color';

interface ColorProps {
  id: string;
  title: string;
  colors?: string[];
  color: string;
  onChange(value: string): void;
}

const ColorPicker: React.FC<ColorProps> = ({ id, title, colors, color, onChange }) => {
  return (
    <div>
      <label id={id} className="text-xs font-semibold px-1">{title}</label>
      {!colors ? (
        <SliderPicker color={color} onChange={color => onChange(color.hex)} />
      ) : (
        <CirclePicker colors={colors} color={color} onChange={color => onChange(color.hex)}  />
      )}
    </div>
  );
};

export default ColorPicker;