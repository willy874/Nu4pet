import { v4 as uuidv4 } from 'uuid';

const class1 = 'c1' + uuidv4().split('-')[0]

export default {
  mount: '.icon-plus',
  attrs: {
    viewBox: '0 0 76.52 76.52' ,
    fill: 'currentColor'
  },
  path: `
    <defs>
      <style>.${class1}{fill:currentColor;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:8px;}</style>
    </defs>
    <line class="${class1}" x1="4" x2="72.52" y1="38.26" y2="38.26"/>
    <line class="${class1}"  x1="38.26" x2="38.26" y1="4" y2="72.52"/>
  `  
}