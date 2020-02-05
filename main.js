let marker = document.querySelector('a-marker');


let path = [{"x1":0,"y1":0,"x2":4,"y2":0},{"x1":4,"y1":0,"x2":4,"y2":4},{"x1":4,"y1":4,"x2":6,"y2":4}];

/*
takes a path structure
*/
function makePath(path){
  path.forEach((box)=>{
      let abox = document.createElement('a-entity');
      abox.setAttribute('geometry', {
        primitive: 'box',
        depth: box.y2-box.y1,
        width: box.x2-box.x1
      });
      abox.setAttribute('position', {x: ((box.x1+box.x2)/2), y: 0.5, z: (box.y1+box.y2)/2});
      abox.setAttribute('material', 'color', '#808080');
      marker.appendChild(abox);
      let node= document.createElement('a-entity');
      node.setAttribute('geometry', {
        primitive: 'box',
        depth: 1.2,
        width: 1.2,
        height: 1.2
      });
      node.setAttribute('position', {x: box.x1, y: 0.5, z: box.y1});
      node.setAttribute('material', 'color', '#404040');
      marker.appendChild(node);
  })
  let finalNode = document.createElement('a-entity');
      finalNode.setAttribute('geometry', {
        primitive: 'box',
        depth: 1.2,
        width: 1.2,
        height: 1.2
      });
      finalNode.setAttribute('position', {x: path[path.length-1].x2, y: 0.5, z: path[path.length-1].y1});
      finalNode.setAttribute('material', 'color', 'red');
      marker.appendChild(finalNode); 
}