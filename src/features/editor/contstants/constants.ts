
import * as material from "material-colors";

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
]


export const fonts = [
    "Arial",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Lucida Console",
    "Segoe UI",
    "Helvetica",
    "Helvetica Neue",
    "Geneva",
    "Palatino Linotype",
    "Garamond",
    "Calibri",
    "Candara",
    "Consolas",
    "Cambria",
];

export const linuxSafeFonts = [
    "DejaVu Sans",
    "Liberation Sans",
    "Liberation Serif",
    "Liberation Mono",
    "Nimbus Sans",
    "Nimbus Roman",
    "Ubuntu",
    "Cantarell",
    "Noto Sans",
    "Noto Serif",
    "Arial",
    "Verdana",
    "Tahoma",
    "Georgia",
    "Courier New",
    "sans-serif",
    "serif",
    "monospace",
]

export const FILL_COLOR = "#1292C9";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;

export const CIRCLE_OPTIONS = {
    radius: 225,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 400,
    height: 400,
    angle: 0,
};

export const DIAMOND_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 600,
    height: 600,
    angle: 0,
};

export const TRIANGLE_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 400,
    height: 400,
    angle: 0,
}

export const FONT_SIZE = 32
export const FONT_FAMILY = linuxSafeFonts[8]
export const FONT_WEIGHT = 500

export const TEXT_OPTIONS = {
    type: "textbox",
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILY
}

export const selectionDependantTools = [
    'fill',
    'font',
    'opacity',
    'filter',
    'opacity',
    'remove-bg',
    'stroke-color',
    'stroke-width',
    'font-family'
]

export const STROKE_DASH_ARRAY = []

export type Palette = {
    palette: string[]
    name: string
    category: string
}

export const imageFilters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
]

export const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension"
]

export const standardColorPalettes: Palette[] = [
    // {
    //     palette: ['#3e3155', '#3b4f7b', '#25709a', '#0091b0', '#13b2ba', '#00c9a5', '#7f456d', '#be5e72', '#ed8669', '#ffbb60', '#f9f871'],
    //     name: 'Vibrant Palette',
    //     category: 'standard'
    // },
    // {
    //     palette: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#d62828', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4'],
    //     name: 'Costal Breeze',
    //     category: 'standard'
    // },
    // {
    //     palette: ['#e6b996', '#ffb238', '#f19143', '#ff773d', '#f55536', '#5b2333', /* '#f7f4f3', */ '#564d4a', '#ba1b1d'],
    //     name: 'Warm',
    //     category: 'standard'
    // },
    // {
    //     palette: ['#201E43', '#134B70', '#508C9B', '#EEEEEE', '#CDE8E5', '#EEF7FF', '#dfdfdf', '#4edaf7'],
    //     name: 'Cold',
    //     category: 'standard'
    // },
    // {
    //     palette: ['#7c00fe', '#f9e400', '#ffaf00', '#f5004f', '#007f73', '#4ccd99', '#ffc700', '#fff455'],
    //     name: 'Neon',
    //     category: 'standard'
    // },
    // {
    //     palette: ['#DEF9C4', '#9CDBA6', '#50B498', '#468585', '#914F1E', '#DEAC80', '#F7DCB9', '#B5C18E'],
    //     name: 'Nature',
    //     category: 'standard'
    // },
    // {
    //     palette: ['#797d62', '#9b9b7a', '#d9ae94', '#e5c59e', '#f1dca7', '#e4b074', '#d08c60', '#997b66'],
    //     name: 'Vintage',
    //     category: 'standard'
    // },
    // {
    //     palette: ['#6c9a8b', '#e8998d', '#eed2cc', '#fbf7f4', '#faf3dd', '#b8f2e6', '#aed9e0', '#5e6472'],
    //     name: 'Relaxed',
    //     category: 'standard'
    // },
    //new
    {
        palette: ['#DB4C57', '#F37B63', '#4D4D49', '#F9F3D9', '#ECCDAB', '#B5DCE8', '#F2EFDD', '#F4C6C0'],
        name: 'Japanese spring',
        category: 'standard'
    },
    {
        palette: ['#1C81F7', '#539EF7', '#90BFF7', '#C6DCF7', '#E8EFF7'],
        name: 'Facebook',
        category: 'standard'
    },
    {
        palette: ['#32C1EA', '#DA1857', '#E7AD28', '#2EAD79', '#450D47'],
        name: 'Slack',
        category: 'standard'
    },
    {
        palette: ['#1a1f2b', '#232a3a', '#2f3a4d', '#3e4c63', '#56657d', '#73829a', '#aab4c2', '#e2e6ee', '#e63946', '#3f37c9'],
        name: 'Slate Editorial',
        category: 'standard'
    },
    {
        palette: ['#1b1b17', '#26261f', '#34342a', '#444436', '#5a5a49', '#73735f', '#9c9c86', '#e6e4d6', '#b91c1c', '#1d4ed8'],
        name: 'Paper Ink',
        category: 'standard'
    },
    {
        palette: ['#1a2320', '#23302b', '#2f3f38', '#3e5249', '#51685e', '#6f8478', '#93a69a', '#e3ece7', '#ef233c', '#0ea5e9'],
        name: 'Green Editorial',
        category: 'standard'
    },
    {
        palette: ['#264653', '#287271', '#2a9d8f', '#8ab17d', '#e9c46a', '#f4a261', '#ee8959', '#e76f51'],
        name: 'Savanna',
        category: 'standard'
    },
    {
        palette: ['#0d1b2a', '#1b263b', '#415a77', '#778da9', '#a9bcd0', '#cbd5e1', '#e0e1dd', '#f8f9fa'],
        name: 'Arctic Sky',
        category: 'standard'
    },
    {
        palette: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff', '#00bbf9', '#00f5d4', '#9b5de5'],
        name: 'Candy Burst',
        category: 'standard'
    },
    {
        palette: ['#3c1518', '#69140e', '#a44200', '#d58936', '#f2f3ae', '#a2ad59', '#6b8e23', '#3b5249'],
        name: 'Autumn Trail',
        category: 'standard'
    },
    {
        palette: ['#03071e', '#370617', '#6a040f', '#9d0208', '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#ffba08'],
        name: 'Inferno',
        category: 'standard'
    },
    {
        palette: ['#f8edeb', '#fcd5ce', '#fae1dd', '#f9dcc4', '#fec89a', '#d8e2dc', '#ece4db', '#ffe5d9'],
        name: 'Pastel Cloud',
        category: 'standard'
    },
    {
        palette: ['#004e64', '#00a5cf', '#9fffcb', '#25a18e', '#7ae582', '#edf6f9', '#ffa69e', '#faf3dd'],
        name: 'Mint Splash',
        category: 'standard'
    },
    {
        palette: ['#2b2d42', '#414361', '#5c6784', '#7d8597', '#a5a58d', '#b7b7a4', '#d6ccc2', '#f5ebe0'],
        name: 'Stonewash',
        category: 'standard'
    },
    {
        palette: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'],
        name: 'Rainbow Pastel',
        category: 'standard'
    },
    {
        palette: ['#1f2041', '#4b3f72', '#417b5a', '#d0ce7c', '#e9d985', '#f2a65a', '#f58549', '#772f1a'],
        name: 'Golden Forest',
        category: 'standard'
    },
    {
        palette: ['#335c67', '#fff3b0', '#e09f3e', '#9e2a2b', '#540b0e', '#69140e', '#a44200', '#d58936'],
        name: 'Rustic Gold',
        category: 'standard'
    },
    {
        palette: ['#2ec4b6', '#cbf3f0', '#ffbf69', '#ff9f1c', '#e71d36', '#011627', '#1d3557', '#457b9d'],
        name: 'Summer Pop',
        category: 'standard'
    },
    {
        palette: ['#1b263b', '#243b53', '#415a77', '#5c677d', '#778da9', '#a9bcd0', '#cbd5e1', '#e0e1dd'],
        name: 'Deep Ocean',
        category: 'standard'
    },
    {
        palette: ['#2d1e2f', '#4f2f4f', '#624763', '#8e6c88', '#b08ea2', '#d7b377', '#e8c07d', '#f4e3b2'],
        name: 'Golden Dusk',
        category: 'standard'
    },
    {
        palette: ['#22223b', '#2f2f4f', '#4a4e69', '#6b705c', '#9a8c98', '#b5838d', '#c9ada7', '#ddb892', '#f2e9e4'],
        name: 'Muted Rose',
        category: 'standard'
    },
    {
        palette: ['#003049', '#1d3557', '#264653', '#457b9d', '#e63946', '#d62828', '#f77f00', '#fcbf49', '#ffd166'],
        name: 'Solar Flare',
        category: 'standard'
    },
    {
        palette: ['#283618', '#3a5a40', '#588157', '#606c38', '#7f5539', '#9c6644', '#bc6c25', '#dda15e', '#fefae0'],
        name: 'Earthy',
        category: 'standard'
    },
    {
        palette: ['#0b132b', '#1c2541', '#253858', '#3a506b', '#4f6d7a', '#5bc0be', '#84dcc6', '#c5f9e2'],
        name: 'Midnight Wave',
        category: 'standard'
    },
    {
        palette: ['#590d22', '#800f2f', '#a4133c', '#c9184a', '#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#ffccd5', '#fff0f3'],
        name: 'Soft Blush',
        category: 'standard'
    },
    {
        palette: ['#14213d', '#1f3b5f', '#2b4f75', '#3d5a80', '#778da9', '#fca311', '#ffba49', '#e5e5e5', '#f5f5f5', '#ffffff'],
        name: 'Urban Contrast',
        category: 'standard'
    },
    {
        palette: ['#06d6a0', '#1b9aaa', '#118ab2', '#073b4c', '#ef476f', '#ff5d8f', '#ffd166', '#ffc43d', '#f4f1de'],
        name: 'Playful Pop',
        category: 'standard'
    },
    {
        palette: ['#2b2d42', '#3a3d5c', '#4a4e69', '#6c757d', '#8d99ae', '#adb5bd', '#edf2f4', '#ef233c', '#d90429'],
        name: 'Editorial',
        category: 'standard'
    },
        {
        palette: ['#10002b', '#240046', '#3c096c', '#5a189a', '#7b2cbf', '#9d4edd', '#c77dff', '#e0aaff'],
        name: 'Royal Violet',
        category: 'standard'
    },
    {
        palette: ['#001219', '#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012'],
        name: 'Desert Tide',
        category: 'standard'
    },
    {
        palette: ['#2f3e46', '#354f52', '#52796f', '#84a98c', '#cad2c5', '#dde5b6', '#adc178', '#6c584c'],
        name: 'Forest Fog',
        category: 'standard'
    },
    {
        palette: ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#90e0ef', '#caf0f8'],
        name: 'Blue Lagoon',
        category: 'standard'
    },
    {
        palette: ['#ff4800', '#ff5400', '#ff6000', '#ff6d00', '#ff7900', '#ff8500', '#ff9100', '#ff9e00', '#ffaa00'],
        name: 'Molten Lava',
        category: 'standard'
    },
    {
        palette: ['#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8', '#3a0ca3', '#3f37c9', '#4361ee', '#4895ef'],
        name: 'Electric Dream',
        category: 'standard'
    },
    {
        palette: ['#606c38', '#283618', '#fefae0', '#dda15e', '#bc6c25', '#a98467', '#7f5539', '#582f0e'],
        name: 'Harvest',
        category: 'standard'
    },
    {
        palette: ['#ff9f1c', '#ffbf69', '#ffffff', '#cbf3f0', '#2ec4b6', '#1a759f', '#184e77', '#0b132b'],
        name: 'Fresh Air',
        category: 'standard'
    },
    {
        palette: ['#222222', '#444444', '#666666', '#888888', '#aaaaaa', '#cccccc', '#eeeeee', '#ffffff'],
        name: 'Monochrome',
        category: 'standard'
    },
    {
        palette: ['#2d3142', '#4f5d75', '#bfc0c0', '#ffffff', '#ef8354', '#ff6b35', '#d7263d', '#3f88c5'],
        name: 'Modern Retro',
        category: 'standard'
    },
    {
        palette: ['#ff595e', '#ff924c', '#ffca3a', '#c5ca30', '#8ac926', '#52a675', '#1982c4', '#4267ac', '#6a4c93'],
        name: 'Festival',
        category: 'standard'
    },
    {
        palette: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0', '#f8fafc'],
        name: 'Slate',
        category: 'standard'
    }
    
]