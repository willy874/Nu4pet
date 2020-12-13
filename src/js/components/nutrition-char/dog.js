import Canvas from './canvas'

const pathData = [
    {
        fill: '#6bc0b1',
        path: new Path2D('M152.81 136.92 152.14 143.08 177.8 151.36 179 140.42 152.81 136.92z')
    },
    {
        fill: '#6bc0b1',
        path: new Path2D('M150.99 121.27 152.81 125.81 172.33 125.08 169.46 114.01 150.99 121.27z')
    },
    {
        fill: '#6bc0b1',
        path: new Path2D('M145.03 156.44 148.46 151.61 166.46 162.89 160.35 171.47 145.03 156.44z')
    },
    {
        fill: 'rgba(34,31,32,0.3)',
        path: new Path2D('M153,280.22c-4.35-9.93-36.81-17.64-76.22-17.64C34.35,262.58,0,271.49,0,282.5s34.35,19.9,76.74,19.9c2.81,0,5.59,0,8.32-.11,3.85,9.76,31.08,17.33,64.11,17.33,35.66,0,64.57-8.82,64.57-19.71C213.74,289.4,186.86,280.82,153,280.22Z')
    },
    {
        fill: '#936c4c',
        path: new Path2D('M43.59,179.59c3.63,1.2,13.71,4.5,17.21,2.22s-.22-8.28-3.2-9.61-6,0-9.28-.76a41.44,41.44,0,0,1-10.76-4.07c-5.28-2.88-10.33-7.57-14.64-11.62-4-3.72-7.82-8.36-10-13.32-2.74-6.25-1.72-9.63,5.08-9.76.45-6.42-9.66-2.87-11.35,1.18-3,7.11.44,13.91,4.46,19.9s9.09,14,15.43,17.77A86.3,86.3,0,0,0,43.59,179.59Z')
    },
    {
        fill: '#b9926e',
        path: new Path2D('M56.93,168.14c-6.56-10.81-23.43,1-26,11.32C26.73,196.54,28.26,214,26.17,231c-1.1,9-.78,20.67-5.87,29.27-4.08.81-7.68,5.73-8.43,9.4-1.21,5.88,1.76,7.06,7,7.24,11.75.41,18-.65,21.65-12.42,4.26-13.67,6.6-27.13,8.3-40.88,1.53-12.42,5-24.89,7.52-37.31C57.42,181.05,59.59,172.54,56.93,168.14Z')
    },
    {
        fill: '#b9926e',
        path: new Path2D('M75.25,168.14c6.56-10.81,23.44,1,26,11.32,4.21,17.08,2.68,34.52,4.77,51.5,1.1,9,.78,20.67,5.88,29.27,4.07.81,7.67,5.73,8.42,9.4,1.21,5.88-1.75,7.06-7,7.24-11.75.41-18-.65-21.65-12.42-4.26-13.67-6.59-27.13-8.3-40.88-1.53-12.42-5-24.89-7.52-37.31C74.76,181.05,72.59,172.54,75.25,168.14Z')
    },
    {
        fill: '#e0bc96',
        path: new Path2D('M132.33,165a28.57,28.57,0,0,0-6.5-11.85,4.58,4.58,0,0,1-1.25-3.16c-.51-3.57.16-4.94-.8-7.58-6-16.38-25.78,2.48-32.21.64-3.83-1.1-7.12-3.34-10.85-4.68-9.26-3.31-23.09-3.24-29.94,4.93a55.68,55.68,0,0,0-6.18,9.49c-1.66,3.13-4.92,4.33-7.19,7.34a31.88,31.88,0,0,0-6.21,15.77c-1.44,13.42,3.27,28.61,12.94,37.91.67.65,1.35,1.27,2,1.9,0-.13,0-.25,0-.38.54-7.59,7.1-18.4,15.35-19.46a8,8,0,0,1,1.94,0c.72,1.57,1.42,3,2,4.28,2.09,4.62,8.06,6.39,12.8,7.76s12.59,1.13,17.38-.32a27.82,27.82,0,0,0,17-13.87,15,15,0,0,1,4.59.61c5.58,1.62,8.6,8.91,9.7,13.84,5.2-3.57,8.4-11.16,8.74-18.78C136,182.8,134.1,171.28,132.33,165Z')
    },
    {
        fill: '#b9926e',
        path: new Path2D('M118.9,195.05c-10.28,5.68-14.65,7.65-24.92,9-7.91,1-18,0-25.36-3.06-4-1.68-2.14-5.76-6.56-5.61-9.62.35-15.56,12.33-16.1,19.92,0,.13,8.92,6.66,13.55,8.6,9.77,4.1,25.36,6,35.73,2.59C106,222.88,122.1,218,127.3,206.08c.18-.41.37-.81.57-1.19C126.78,200,124,192.24,118.9,195.05Z')
    },
    {
        fill: '#e0bc96',
        path: new Path2D('M105,182c6.84-10.81,24.43,1,27.08,11.32,4.4,17.09,2.8,34.52,5,51.5,1.15,9,.82,20.67,6.13,29.27,4.24.81,8,5.73,8.78,9.4,1.26,5.88-1.83,7.06-7.34,7.24-12.24.41-18.75-.65-22.57-12.42-4.44-13.67-6.88-27.13-8.65-40.88-1.6-12.42-5.24-24.89-7.84-37.31C104.49,194.91,102.23,186.4,105,182Z')
    },
    {
        fill: '#e0bc96',
        path: new Path2D('M72.16,182c-6.82-10.79-24.35,1-27,11.31-4.38,17.07-2.78,34.48-5,51.44-1.14,9-.81,20.65-6.1,29.23-4.23.81-8,5.73-8.76,9.39-1.25,5.87,1.83,7.05,7.32,7.24,12.2.4,18.69-.66,22.49-12.41,4.43-13.66,6.86-27.1,8.62-40.83C65.36,225,69,212.5,71.59,200.09,72.67,194.89,74.93,186.39,72.16,182Z')
    },
    {
        fill: '#db5041',
        path: new Path2D('M87.26,157.59c-16.78,0-31.08-6.33-36.53-15.19a15.11,15.11,0,0,0-2.35,7.95c0,12.77,17.41,23.12,38.88,23.12s38.88-10.35,38.88-23.12a15,15,0,0,0-2.36-7.95C118.33,151.26,104,157.59,87.26,157.59Z')
    },
    {
        fill: '#513b20',
        path: new Path2D('M26,40.42c.42,8,2,16.82,5.86,24C38,76.13,48.66,72.35,57.92,66.1,63.56,62.29,70.31,54,67.26,47.34,62.91,37.79,56.4,29,49.59,20.74,45.84,16.18,41.54,12,37.94,7.42c-1.59-2-4.35-6.13-6.75-7.1C24.46-2.4,25.93,13,25.69,16.82A206.59,206.59,0,0,0,26,40.42Z')
    },
    {
        fill: '#30200f',
        path: new Path2D('M36.76,58.33c4,6.13,9.48,7.35,16.37,5.69,5.9-1.43,9.21-4.5,8.33-10.79-1.15-8.23-6.4-12.14-11.81-18a94.07,94.07,0,0,1-7-9c-1.11-1.56-3.47-6.75-5.52-7.17-4.4-.9-4.6,14.33-4.63,17.83C32.43,44.39,32.6,52,36.76,58.33Z')
    },
    {
        fill: '#513b20',
        path: new Path2D('M142.38,41c-2.44,7.66-6.23,15.75-11.77,21.76-9,9.71-18.31,3.36-25.68-5-4.48-5.12-8.92-14.82-4.27-20.52,6.63-8.13,15.16-15,23.84-21.25,4.78-3.45,10-6.41,14.65-9.92,2-1.55,5.77-4.83,8.33-5.16,7.2-.92,1.87,13.65,1.14,17.36A208.93,208.93,0,0,1,142.38,41Z')
    },
    {
        fill: '#30200f',
        path: new Path2D('M127.37,55.59c-5.43,4.92-11,4.71-17.27,1.35-5.35-2.88-7.78-6.69-5.33-12.55,3.21-7.68,9.28-10.13,16-14.46a94.81,94.81,0,0,0,9.08-7c1.47-1.23,5.07-5.65,7.16-5.54,4.48.25.81,15-.05,18.43C135.1,43.2,133,50.49,127.37,55.59Z')
    },
    {
        fill: '#e0bc96',
        path: new Path2D('M120.59,49.65c-6.32-4.93-14.62-8.48-23.08-8.6-6.36-.09-12,2.8-18,3.46v0l-.51.1-.51,0v0c-5.91,1.06-12.17-.1-18.24,1.8-8.08,2.53-15,8.29-19.68,14.81-10,14-4.72,29.12-2.51,44.34,1.65,11.37,3.12,22.71,6.08,33.75,1.8,6.71,4.1,15,11.2,18.67,5.86,3.05,14.09,4.56,20.89,5A71.48,71.48,0,0,0,96,161.22a71.93,71.93,0,0,0,19.42-3.88c6.39-2.35,13.85-6.14,18.6-10.74,5.76-5.56,5.61-14.13,5.43-21.08-.31-11.42-2.13-22.71-3.79-34.08C133.4,76.21,134.16,60.23,120.59,49.65Z')
    },
    {
        fill: '#343228',
        path: new Path2D('M116.23,131.74a33.32,33.32,0,0,0-12.92-4.58,31.87,31.87,0,0,0-11.33,1,32.23,32.23,0,0,0-11.15,2.24,33.45,33.45,0,0,0-11.08,8.07c-4,4.41-2.87,7.93-2.08,13.37,1,6.89,3.48,12.73,9.45,16.51,5.55,3.51,10.47,2.17,15.47-1.39,1.41-1,2.86-2.7,4.51-3.6,1.82.39,3.7,1.61,5.34,2.17,5.8,2,10.9,1.87,15.22-3.07,4.65-5.33,5.36-11.63,4.36-18.51C121.23,138.52,121.27,134.84,116.23,131.74Z')
    },
    {
        fill: '#92202f',
        path: new Path2D('M104.4,154.31c-6.69,3.91-10.56,2.16-11.27,2.27-3,.49-5.68,2.5-8.45,1.22a11.65,11.65,0,0,1-3.36-2.25l0,0a7.84,7.84,0,0,1-1.53-2.12l0-.08c-2-4.41-3.58-8.82,1.45-12.25,2.53,4.22,13.31,2.42,13.32,2.42,6.73.76,9.17-.56,13-3.19C109.41,143.08,109.66,151.23,104.4,154.31Z')
    },
    {
        fill: '#000',
        path: new Path2D('M98.11,144.84c2.59.6,6.32,3.36,10.8,8.09,1.85,1.95.58-8.36.39-10.34-.27-3-.59-4.1-3.06-5.56s-4.85-4.4-7.86-4.42c-5.57,0-11.38,2.52-14.44,7.33-1.06,1.66-5.1,20.6-3.61,18.2,3.48-5.59,6.08-9.65,7.31-10.71A11.45,11.45,0,0,1,98.11,144.84Z')
    },
    {
        fill: '#545244',
        path: new Path2D('M121,111.91c-7.39-17.1-20.24-12.81-33-11.5v0l-.52.1-.54.05v0C74.24,103,59.8,102.37,57.59,120.87c-1.39,11.64-1.54,26.88,2.86,37.9,3.32,8.33,18.66,15.17,20.13,3.85,1-7.77,1.41-15.7,8.69-19.79a14.72,14.72,0,0,1,4.06-1.55,14.7,14.7,0,0,1,4.33.33c8.15,1.84,8.85,9.41,12,16.57,4.63,10.44,17.13.37,18-8.56C128.72,137.81,125.6,122.68,121,111.91Z')
    },
    {
        fill: '#000',
        path: new Path2D('M86.87,96.52h-.09c-4.7.85-12.61,2.3-9.45,9.18,2.41,5.24,7,6.85,11.71,6.41h0l0,0s0,0,0,0h0c4.64-.93,8.58-3.78,9.4-9.49C99.61,95.14,91.61,96,86.87,96.52Z')
    },
    {
        fill: '#fff',
        path: new Path2D('M91.94,101.9c2.06.5,4,0,4.23-1S95,98.57,92.93,98.07s-4,0-4.24,1S89.87,101.39,91.94,101.9Z')
    },
    {
        fill: '#000',
        path: new Path2D('M101.11,80.58c3,6.83,8.73,10.94,12.86,9.17S119,81,116.06,74.18,107.33,63.24,103.2,65,98.14,73.75,101.11,80.58Z')
    },
    {
        fill: '#fff',
        path: new Path2D('M106.93,73c1.54,2.38,3.78,3.7,5,2.94s1-3.32-.57-5.7-3.78-3.7-5-2.94S105.39,70.63,106.93,73Z')
    },
    {
        fill: '#000',
        path: new Path2D('M94.26,143.83c-.69.1-1.31-.14-1.37-.54l-4.66-32.08c-.06-.41.46-.81,1.16-.91s1.31.14,1.37.54l4.66,32.08C95.48,143.32,95,143.73,94.26,143.83Z')
    },
    {
        fill: '#f7f3df',
        path: new Path2D('M114.31,176.48c-4.73-3.83-10.78-2.6-15.74.57a15.92,15.92,0,0,1-17.13,1c-5.29-2.59-11.44-3.13-15.71,1.21-6.51,6.62-3.4,13.65,4.52,16.13,6.9,2.16,13.72-1.28,20.64-2.14,7,.07,14.14,2.72,20.75-.21C119.23,189.65,121.52,182.32,114.31,176.48Z')
    },
    {
        fill: '#6bc0b1',
        path: new Path2D('M91.63,293l6-26.17,106.27.53,6,31.13c-.87,10-27.45,17.65-60,17.2-33-.45-59.69-9.08-59.55-19.26A5.74,5.74,0,0,1,91.63,293Z')
    },
    {
        fill: '#a8d9cf',
        path: new Path2D('M174.14,300.57a4.37,4.37,0,0,0,1.36-2.66,4,4,0,0,0-4.08-4c-1.8,0-3.39,2.42-3.88,4.05l-18.58.33c-.54-1.62-2.14-4-3.94-3.95a4,4,0,0,0-4,4.08,4.48,4.48,0,0,0,1.58,2.82,4.41,4.41,0,0,0-1.37,2.64,4,4,0,0,0,4.08,4c1.8,0,3.3-2.13,3.8-3.76l18.47-.48c.54,1.62,2.33,3.84,4.12,3.81a4,4,0,0,0,4-4.07A4.44,4.44,0,0,0,174.14,300.57Z')
    },
    {
        fill: '#fff',
        path: new Path2D('M175.6,300.47A4.46,4.46,0,0,0,177,297.8a4,4,0,0,0-4.08-4c-1.8,0-3.38,2.42-3.88,4.05l-18.58.33c-.54-1.62-2.14-4-3.93-3.95a4,4,0,0,0-4,4.08,4.53,4.53,0,0,0,1.58,2.83,4.36,4.36,0,0,0-1.37,2.63,4,4,0,0,0,4.08,4c1.8,0,3.3-2.13,3.8-3.76l18.47-.48c.54,1.62,2.33,3.84,4.13,3.81a4,4,0,0,0,4-4.07A4.42,4.42,0,0,0,175.6,300.47Z')
    },
    {
        fill: '#faf5ef',
        path: new Path2D('M96.29,272.57l1.32-5.74,106.27.53,1.26,6.06c-7,8-28.95,13.61-54.91,13.26C125,286.33,103.66,280.43,96.29,272.57Z')
    },
    {
        fill: '#a8d9cf',
        transform: {
            rotate: {
                cx: '150.5',
                cy: '267.26',
                deg: '-89.21'
            }
        },
        path: new Path2D('M135.84,267.26a14.66,53.57 0 1,0 29.32,0a14.66,53.57 0 1,0 -29.32,0')
    },
    {
        fill: '#2e3033',
        transform: {
            rotate: {
                cx: '150.5',
                cy: '267.26',
                deg: '-89.21'
            }
        },
        path: new Path2D('M139.39,267.26a11.11,45.52 0 1,0 22.22,0a11.11,45.52 0 1,0 -22.22,0')
    },
    {
        fill: '#906440',
        path: new Path2D('M190.57,261.13a.93.93,0,0,1,0-.24c0-.63.72-1,.9-1.64.76-2.51-3.73-1.26-4.52-1.92-1.1-.91-.48-2.43-.88-3.68-1.14-3.6-3.43-2.11-5.67-4.37a1.11,1.11,0,0,1-.31-.49,2.48,2.48,0,0,1,0-.72,2.54,2.54,0,0,0-2.5-2.55,10.14,10.14,0,0,0-1.44.27,5.34,5.34,0,0,1-4.44-1.19,2.47,2.47,0,0,0-.76-3.81c-1.5-.64-3.26.4-4.83,0-2.71-.74-3.14-1.95-6-.6-1.27.6-2.68,1.48-3.95.9s-1.69-2.07-2.92-2.34c-2.07-.45-2.92,2.89-4.92,3.58-1.38.47-2.8-.45-4.07-1.16s-3.09-1.15-4,0c-.36.44-.5,1-.91,1.43-1.8,1.69-4.78-2.7-6.73-1.2-.76.59-.74,1.72-.86,2.68s-.81,2.1-1.75,1.87c-.75-.18-1-1.09-1.55-1.65-1.23-1.3-3.37-.42-4.89.51-.88.54-1.87,1.26-1.91,2.3,0,.43.14.86.13,1.29,0,1.63-2,2.3-3.62,2.69-6.27,1.53.87,9.31-4,11.45a13.87,13.87,0,0,0-1.7.65,1.3,1.3,0,0,0-.67,1.53c.1.21.29.42.23.64a.68.68,0,0,1-.24.32c-.88.76-2.42,1.66-2.91,2.72-.14.3-.48,2.9.13,2.9,7.08,4,22.94,6.86,41.41,7.12,18.94.26,35.21-2.34,42.12-6.27,1-.57-2.76-5.8-1.4-7.3.54-.59,1.28-1.28,1-2S190.79,261.78,190.57,261.13Z')
    },
    {
        fill: '#6f4e2f',
        path: new Path2D('M121.65,247.94a2.83,2.83,0,0,1,0,.41,1.79,1.79,0,0,1-.09.57l-.06.13,0,.12a.36.36,0,0,1-.07.1.57.57,0,0,1-.08.13.86.86,0,0,1-.07.1l-.11.12-.09.09-.11.1-.2.16,0,0-.21.14-.05,0-.2.11-.07,0a7.89,7.89,0,0,1-1.45.55l-.06,0-.22.06-.09,0-.3.08a6.32,6.32,0,0,0-2.11,1.25c-1.17,1.52-.59,4-.34,6.11a3.64,3.64,0,0,1-.05,1.14,2.74,2.74,0,0,1,.49.35c1.06.93,1.12,2.52,1.48,3.88s1.61,2.83,2.92,2.34,1.69-2.59,3.07-2.6c1.91,0,2,3.89,3.89,3.67s2.07-4.05,3.69-3.26c.84.4.63,1.7,1.17,2.46.81,1.12,2.59.46,3.64-.44s2.32-2,3.61-1.54c1,.39,1.4,1.57,2.11,2.37a3.38,3.38,0,0,0,5.89-2.5c.95.93,2,1.92,3.36,2s2.67-1.49,1.93-2.59c-.38-.56,1.53-.5,1.65-.47,1,.24.81,1.35,1.4,1.74,1.25.81,3.84,2.08,4-1.06,0-.45-.07-.91,0-1.37a2.42,2.42,0,0,1,3.39-1.86,3.54,3.54,0,0,1,1,2.2,1.8,1.8,0,0,0,.21.95,1.33,1.33,0,0,0,.65.4,4.72,4.72,0,0,0,2.4.31,2.2,2.2,0,0,0,1.76-1.51c.18-.76-.18-1.57,0-2.33a2.22,2.22,0,0,1,2.54-1.4,5.27,5.27,0,0,1,2.69,1.62c1.61,1.56,3.65,3.84,6,2.1a5,5,0,0,0,1.82-3.46c.55-.86,1.94-.39,2.59.4s1.09,1.85,2,2.25a2.71,2.71,0,0,0,2.25-.25,4.52,4.52,0,0,0,1.36-1.14,7.27,7.27,0,0,0,1.27-2.08,2.7,2.7,0,0,0-.2-1.31,3.31,3.31,0,0,0-1-1.58,10.46,10.46,0,0,0-1.93-.85c-1.23-.62-1.87-2-2.88-2.93-1.35-1.26-3.1-1.08-4.58-2l-.19-.13-.19-.14a4.47,4.47,0,0,1-.53-.46,1.11,1.11,0,0,1-.31-.49,2.47,2.47,0,0,1,0-.72,2.17,2.17,0,0,0-.18-1c-.91-2.17-2.69-1-4.26-1.91-.92-.51-1.34-1.58-2-2.38-1-1.15-2.92-2.36-4.45-2.2-.21,0-.41,0-.62.09a6.09,6.09,0,0,1-2.44.06c-1.53-.42-2.33-1-3.25-1.16l-.32,0a3.15,3.15,0,0,0-.68,0l-.38.07a7.42,7.42,0,0,0-1.4.51,12,12,0,0,1-2.47,1,4.43,4.43,0,0,1-.51.06,2.18,2.18,0,0,1-1-.19,4.63,4.63,0,0,1-1.43-1.26,5.37,5.37,0,0,0-.68-.67,2,2,0,0,0-.81-.41,1.77,1.77,0,0,0-.95.07c-1.79.67-2.85,2.07-5,1.66-.61-.12-1.2-.37-1.81-.51a6,6,0,0,0-4,.61c-1.22.57-1.23,1.1-2.18,2-1.35,1.26-3.36-.89-5.11-1.41l-.43-.09a1.57,1.57,0,0,0-1.19.3,1.74,1.74,0,0,0-.38.44,2,2,0,0,0-.2.42c0,.11-.07.23-.09.34a4.55,4.55,0,0,0-.11.74c0,.13,0,.25,0,.38s0,.24,0,.36a3.31,3.31,0,0,1-.2.73,1.93,1.93,0,0,1-.9,1.08,1,1,0,0,1-.65.06,1.24,1.24,0,0,1-.68-.45c-.18-.22-.34-.48-.51-.73a3.43,3.43,0,0,0-.36-.47,1.83,1.83,0,0,0-.5-.39,2.2,2.2,0,0,0-.87-.26,6.4,6.4,0,0,0-3.52,1.16l-.33.21a2.9,2.9,0,0,0-1.58,2.09,1.71,1.71,0,0,0,0,.32C121.58,247.57,121.62,247.75,121.65,247.94Z')
    },
    {
        fill: '#906440',
        path: new Path2D('M173.27,253.8a1.11,1.11,0,0,0-1.05-.93,4.82,4.82,0,0,0-2.44.54,1.25,1.25,0,0,0-.53.54,6.88,6.88,0,0,0-1.2.56,1.27,1.27,0,0,0,.72,2.39,8.28,8.28,0,0,0,2.63-.85l1.09-.18A1.34,1.34,0,0,0,173.27,253.8Z')
    },
    {
        fill: '#906440',
        path: new Path2D('M179.92,254.94l-.21,0a1.26,1.26,0,0,0-.26,2.5l.21,0a1.27,1.27,0,0,0,1.38-1.12A1.28,1.28,0,0,0,179.92,254.94Z')
    },
    {
        fill: '#906440',
        path: new Path2D('M177.6,249l-.2,0a1.27,1.27,0,0,0-1.38,1.12,1.28,1.28,0,0,0,1.11,1.38l.21,0a1.27,1.27,0,0,0,1.38-1.12A1.28,1.28,0,0,0,177.6,249Z')
    },
    {
        fill: '#906440',
        path: new Path2D('M133.28,258.62a18.5,18.5,0,0,0-3.49.12,1.09,1.09,0,0,0-.38.14,1.26,1.26,0,0,0-.1,2.5,8.26,8.26,0,0,0,4.35-.36A1.27,1.27,0,0,0,133.28,258.62Z')
    },
    {
        fill: '#906440',
        path: new Path2D('M123.05,257.09l-.19-.23a1.25,1.25,0,1,0-2,1.58l.19.23a1.26,1.26,0,0,0,1.76.19A1.28,1.28,0,0,0,123.05,257.09Z')
    },
    {
        fill: '#906440',
        path: new Path2D('M158.71,259.39l-.18-.23a1.25,1.25,0,1,0-1.95,1.58l.19.23a1.25,1.25,0,0,0,1.94-1.58Z')
    },
    {
        fill: '#d16585',
        path: new Path2D('M88.46,153.21c-1.85-.26-4.07.22-4.73.93-.64-.82-4-1.22-5.77-.23-2.1,1.21-3.37,3.8-4.06,6.4-1,3.54-.18,8.7,2.9,11.12a4.89,4.89,0,0,0,3.43.92,8.24,8.24,0,0,0,6-3.45c2-2.82,4.33-9.59,6.85-12.32C91.78,155.14,90.12,153.45,88.46,153.21Z')
    },
    {
        fill: '#000',
        path: new Path2D('M52.11,82.87c-1,7.31,1.77,13.68,6.12,14.23s8.68-4.92,9.65-12.23-1.77-13.68-6.12-14.23S53.08,75.57,52.11,82.87Z')
    },
    {
        fill: '#fff',
        path: new Path2D('M60.61,79c1.14,2.56,3.12,4.16,4.41,3.59s1.4-3.12.25-5.68-3.12-4.16-4.41-3.58S59.46,76.49,60.61,79Z')
    },
]    
export default class Dog extends Canvas {
    constructor(ops){
        super(ops)
        this.box = {
            x: '213.74',
            y: '319.62'
        }
        this.pathData = pathData
    }
    draw(){
        this.drawPath(this.pathData)
    }
}