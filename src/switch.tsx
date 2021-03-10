import React from 'react';

interface SwitchProps {
  title: string;
  value: boolean;
  onChange(value: boolean): void;
}

const Switch: React.FC<SwitchProps> = ({ title, value, onChange }) => {
  return (
    <div className="mt-4">
      <label id="switch-label" className="text-xs font-semibold px-1">{title}</label>
      <div className="flex items-center justify-center w-full mb-6 mt-3">
        <label 
          htmlFor="toogle"
          className="flex items-center cursor-pointer"
        >
          <div id="down" className="mr-3 text-gray-700 px-1">
            Pra baixo!
          </div>
          <div className="relative">
            <input id="toogle" type="checkbox" checked={value} onChange={() => onChange(!value)} className="hidden" />
            <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
          </div>
          <div id="up" className="ml-3 text-gray-700 px-1">
            Pra cima!
          </div>
        </label>
        
      </div>
    </div>
  );
};

export default Switch;