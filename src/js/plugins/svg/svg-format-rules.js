export default [{
    name: 'text',
    attrPath: ['transform'],
    html: true
},{
    name: 'path',
    attrPath: ['d','fill','transform']
},{
    name: 'rect',
    attrPath: ['x','y','width','height','fill','stroke-width','transform']
},{
    name: 'polyline',
    attrPath: ['points','fill','stroke','stroke-width','transform']
},{
    name: 'circle',
    attrPath: ['cx','cy','r','stroke','stroke-width','transform']
},{
    name: 'line',
    attrPath: ['x1','x2','y1','y2','stroke','stroke-width','transform']
},{
    name: 'ellipse',
    attrPath: ['cx','cy','rx','ry','stroke','stroke-width','transform']
}]