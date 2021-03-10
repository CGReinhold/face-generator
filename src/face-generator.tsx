import React, { useState } from 'react';
import PixelFace from 'pixel-face';
import Input from './input';
import ColorPicker from './color';
import Switch from './switch';

function randomNumber(min: number = 0, max: number = 10) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function randomItem(list: any[]) {
  const index = randomNumber(0, list.length - 1);
  return list[index];
}

const EYE_COLORS = ['#000000', '#5c3836', '#ad6452', '#00aa00', '#0000aa', '#aaaaaa'];

const FACE_COLORS = ['#000000', '#5c3836', '#704139', '#ad6452', '#ffe0bd', '#e3cc88', '#fff5e1', '#a01900'];

function getEyeColor(color: '#000000'|'#5c3836'|'#ad6452'|'#00aa00'|'#0000aa'|'#aaaaaa') {
  console.log(color)
  switch (color) {
    case '#000000':
      return 'black';
    case '#0000aa':
      return 'blue';
    case '#5c3836':
      return 'dark-brown';
    case '#aaaaaa':
      return 'gray';
    case '#00aa00':
      return 'green';
    case '#ad6452':
      return 'light-brown';
  }
}

function getFaceColor(color: '#000000'|'#5c3836'|'#704139'|'#ad6452'|'#ffe0bd'|'#e3cc88'|'#fff5e1'|'#a01900') {
  switch (color) {
    case '#000000':
      return 'black';
    case '#5c3836':
      return 'dark-brown';
    case '#704139':
      return 'brown';
    case '#ad6452':
      return 'light-brown';
    case '#a01900':
      return 'red';
    case '#ffe0bd':
      return 'salmon';
    case '#fff5e1':
      return 'white';
    case '#e3cc88':
      return 'yellow';
  }
}

const Face: React.FC = () => {
  const [color, setColor] = useState(randomItem(FACE_COLORS));
  const [width, setWidth] = useState(randomNumber(5, 15));
  const [height, setHeight] = useState(randomNumber(5, 15));
  const [pointiness, setPointiness] = useState(randomNumber(0, 30));
  const [eyeColor, setEyeColor] = useState(randomItem(EYE_COLORS));
  const [eyeHorizontalMargin, setEyeHorizontalMargin] = useState(randomNumber(-1, 2));
  const [eyeVerticalMargin, setEyeVerticalMargin] = useState(randomNumber(-2, 2));
  const [mouthWidth, setMouthWidth] = useState(randomNumber(1, 5));
  const [noseWidth, setNoseWidth] = useState(randomNumber(0, 3));
  const [noseHeight, setNoseHeight] = useState(randomNumber(0, 5));
  const [hairColor, setHairColor] = useState(randomColor());
  const [hairLength, setHairLength] = useState(randomNumber(0, 15));
  const [hairType, setHairType] = useState(randomNumber(0, 1) === 0);
  const [resolution, setResolution] = useState(1);

  const pixelFace = new PixelFace({
    eye: { color: getEyeColor(eyeColor), horizontalMargin: eyeHorizontalMargin, verticalMargin: eyeVerticalMargin },
    face: { color: getFaceColor(color), height, width, pointiness },
    hair: { color: hairColor, length: hairLength, style: hairType ? 'top' : 'bottom' },
    mouth: { width: mouthWidth },
    nose: { height: noseHeight, width: noseWidth },
    resolution,
  });

  const onRandomClick = () => {
    setColor(randomItem(FACE_COLORS));
    setWidth(randomNumber(5, 15));
    setHeight(randomNumber(5, 15));
    setPointiness(randomNumber(0, 30));
    setEyeColor(randomItem(EYE_COLORS));
    setEyeHorizontalMargin(randomNumber(-1, 2));
    setEyeVerticalMargin(randomNumber(-2, 2));
    setMouthWidth(randomNumber(1, 5));
    setNoseWidth(randomNumber(0, 3));
    setNoseHeight(randomNumber(0, 5));
    setHairLength(randomNumber(0, 15));
    setHairColor(randomColor());
    setHairType(randomNumber(0, 1) === 0);
    setResolution(10);
  };

  const onSave = () => {
    const svg = document.querySelector('svg');
    if (svg) {
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svg);
      
      if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
      const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
      
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "face.svg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="m-6 w-72 h-72 flex flex-col justify-center items-center" dangerouslySetInnerHTML={{ __html: pixelFace.getSVG() || '' }}></div>
      <button
        id="random"
        className="p-2 my-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
        onClick={onRandomClick}
        >
        Aleatório!
      </button>
      <button
        id="save"
        className="p-2 my-2 bg-transparent border border-blue-500 text-blue-500 rounded-md focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
        onClick={onSave}
        >
        Salvar!
      </button>
      <div className="flex flex-wrap">
        <div className="p-8">
          <ColorPicker id="face-color" title="Rosto" colors={FACE_COLORS} color={color} onChange={newColor => setColor(newColor)} />
          <Input
            id="face-width"
            title="Largura do rosto"
            type="number"
            value={width}
            onChange={(value) => setWidth(Number(value))}
            maxValue={15}
            minValue={5}
            />
          <Input
            id="face-height"
            title="Altura do rosto"
            type="number"
            value={height}
            onChange={(value) => setHeight(Number(value))}
            maxValue={15}
            minValue={5}
            />
          <Input
            id="face-pointiness"
            title="Finura do rosto"
            type="number"
            value={pointiness}
            onChange={(value) => setPointiness(Number(value))}
            maxValue={30}
            minValue={0}
          />
          <Input
            id="resolution"
            title="Resolução"
            type="number"
            value={resolution}
            onChange={(value) => setResolution(Number(value))}
            maxValue={10}
            minValue={1}
          />
        </div>
        <div className="p-8">
          <ColorPicker id="hair-color" title="Cor do cabelo" color={hairColor} onChange={newColor => setHairColor(newColor)} />
          <Input
            id="hair-length"
            title="Comprimento do cabelo"
            type="number"
            value={hairLength}
            onChange={(value) => setHairLength(Number(value))}
            maxValue={15}
            minValue={0}
          />
          <Switch
            title="Tipo do cabelo"
            value={hairType}
            onChange={(value) => setHairType(value)}
          />
          <Input
            id="mouth-length"
            title="Largura da boca"
            type="number"
            value={mouthWidth}
            onChange={(value) => setMouthWidth(Number(value))}
            maxValue={5}
            minValue={1}
          />
        </div>
        <div className="p-8">
          <ColorPicker id="eye-color" title="Cor dos olhos" colors={EYE_COLORS} color={eyeColor} onChange={newColor => setEyeColor(newColor)} />
          <Input
            id="eyes-horizontal"
            title="Margem horizontal dos olhos"
            type="number"
            value={eyeHorizontalMargin}
            onChange={(value) => setEyeHorizontalMargin(Number(value))}
            maxValue={2}
            minValue={-1}
          />
          <Input
            id="eyes-vertical"
            title="Margem vertical dos olhos"
            type="number"
            value={eyeVerticalMargin}
            onChange={(value) => setEyeVerticalMargin(Number(value))}
            maxValue={2}
            minValue={-2}
          />
          <Input
            id="nose-width"
            title="Largura do nariz"
            type="number"
            value={noseWidth}
            onChange={(value) => setNoseWidth(Number(value))}
            maxValue={4}
            minValue={1}
          />
          <Input
            id="nose-height"
            title="Altura do nariz"
            type="number"
            value={noseHeight}
            onChange={(value) => setNoseHeight(Number(value))}
            maxValue={4}
            minValue={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Face;