(() => {
  'use strict';

  const FACE_COLORS = ['#000000', '#5c3836', '#704139', '#ad6452', '#ffe0bd', '#e3cc88', '#fff5e1', '#a01900'];
  const EYE_COLORS = ['#000000', '#5c3836', '#ad6452', '#00aa00', '#0000aa', '#aaaaaa'];

  const FACE_COLOR_NAMES = {
    '#000000': 'black',
    '#5c3836': 'dark-brown',
    '#704139': 'brown',
    '#ad6452': 'light-brown',
    '#ffe0bd': 'salmon',
    '#e3cc88': 'yellow',
    '#fff5e1': 'white',
    '#a01900': 'red',
  };

  const EYE_COLOR_NAMES = {
    '#000000': 'black',
    '#5c3836': 'dark-brown',
    '#ad6452': 'light-brown',
    '#00aa00': 'green',
    '#0000aa': 'blue',
    '#aaaaaa': 'gray',
  };

  const preview = document.getElementById('face-preview');
  const randomButton = document.getElementById('random');
  const saveButton = document.getElementById('save');
  const hairColorInput = document.getElementById('hair-color');
  const hairTypeInput = document.getElementById('hair-type');
  const hairTypeLabel = hairTypeInput.closest('.switch');
  const numberInputs = Array.from(document.querySelectorAll('input[type="number"][data-field]'));

  const state = {
    faceColor: randomItem(FACE_COLORS),
    width: randomNumber(5, 15),
    height: randomNumber(5, 15),
    pointiness: randomNumber(0, 30),
    eyeColor: randomItem(EYE_COLORS),
    eyeHorizontalMargin: randomNumber(-1, 2),
    eyeVerticalMargin: randomNumber(-2, 2),
    mouthWidth: randomNumber(1, 5),
    noseWidth: randomNumber(0, 3),
    noseHeight: randomNumber(0, 4),
    hairColor: randomColor(),
    hairLength: randomNumber(0, 15),
    hairType: randomNumber(0, 1) === 0,
  };

  function randomNumber(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  function randomItem(list) {
    return list[randomNumber(0, list.length - 1)];
  }

  function buildPixelFace() {
    return new PixelFace({
      eye: {
        color: EYE_COLOR_NAMES[state.eyeColor],
        horizontalMargin: state.eyeHorizontalMargin,
        verticalMargin: state.eyeVerticalMargin,
      },
      face: {
        color: FACE_COLOR_NAMES[state.faceColor],
        height: state.height,
        width: state.width,
        pointiness: state.pointiness,
      },
      hair: {
        color: state.hairColor,
        length: state.hairLength,
        style: state.hairType ? 'top' : 'bottom',
      },
      mouth: { width: state.mouthWidth },
      nose: { height: state.noseHeight, width: state.noseWidth },
      resolution: 1,
    });
  }

  function render() {
    preview.innerHTML = buildPixelFace().getSVG();
  }

  function syncPalettes() {
    document.querySelectorAll('[data-color-group]').forEach((group) => {
      const selectedColor = state[group.dataset.colorGroup];
      group.querySelectorAll('input[type="radio"]').forEach((input) => {
        input.checked = input.value === selectedColor;
      });
    });
  }

  function syncNumberInputs() {
    numberInputs.forEach((input) => {
      input.value = String(state[input.dataset.field]);
    });
  }

  function syncSwitch() {
    hairTypeInput.checked = state.hairType;
    hairTypeLabel.dataset.state = state.hairType ? 'up' : 'down';
  }

  function syncControls() {
    syncPalettes();
    syncNumberInputs();
    syncSwitch();
    hairColorInput.value = state.hairColor;
  }

  function randomize() {
    state.faceColor = randomItem(FACE_COLORS);
    state.width = randomNumber(5, 15);
    state.height = randomNumber(5, 15);
    state.pointiness = randomNumber(0, 30);
    state.eyeColor = randomItem(EYE_COLORS);
    state.eyeHorizontalMargin = randomNumber(-1, 2);
    state.eyeVerticalMargin = randomNumber(-2, 2);
    state.mouthWidth = randomNumber(1, 5);
    state.noseWidth = randomNumber(0, 3);
    state.noseHeight = randomNumber(0, 4);
    state.hairColor = randomColor();
    state.hairLength = randomNumber(0, 15);
    state.hairType = randomNumber(0, 1) === 0;

    syncControls();
    render();
  }

  function saveSvg() {
    const svg = preview.querySelector('svg');
    if (!svg) return;

    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    let source = new XMLSerializer().serializeToString(clone);
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'face.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }

  document.querySelectorAll('[data-color-group]').forEach((group) => {
    group.addEventListener('change', (event) => {
      if (!event.target.matches('input[type="radio"]')) return;
      state[group.dataset.colorGroup] = event.target.value;
      render();
    });
  });

  numberInputs.forEach((input) => {
    const field = input.dataset.field;
    const min = Number(input.min);
    const max = Number(input.max);

    input.addEventListener('input', () => {
      if (input.value === '') return;

      const value = Number(input.value);
      if (!Number.isFinite(value) || value < min || value > max) return;

      state[field] = Math.trunc(value);
      render();
    });

    input.addEventListener('change', () => {
      let value = Number(input.value);
      if (!Number.isFinite(value)) value = state[field];

      value = Math.min(max, Math.max(min, Math.round(value)));
      input.value = String(value);
      state[field] = value;
      render();
    });
  });

  hairColorInput.addEventListener('input', () => {
    state.hairColor = hairColorInput.value;
    render();
  });

  hairTypeInput.addEventListener('change', () => {
    state.hairType = hairTypeInput.checked;
    syncSwitch();
    render();
  });

  randomButton.addEventListener('click', randomize);
  saveButton.addEventListener('click', saveSvg);

  syncControls();
  render();
})();
