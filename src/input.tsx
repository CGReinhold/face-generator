import React from 'react';

interface InputProps {
  id: string;
  title?: string;
  placeholder?: string;
  type?: 'number' | 'text';
  value: string | number;
  maxValue?: number;
  minValue?: number;
  onChange(value: string): void;
}

const Input: React.FC<InputProps> = ({ id, title, placeholder, type = 'text', value, onChange, maxValue, minValue }) => {
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  }

  return (
    <div className="mt-4">
      <label id={id} className="text-xs font-semibold px-1">{title}</label>
      <div className="flex">
        <input
          type={type}
          value={value}
          className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          placeholder={placeholder}
          onChange={onChangeHandler}
          max={maxValue}
          min={minValue}
        />
      </div>
    </div>
  );
};

export default Input;