var container;
var camera, scene, renderer;
var uniforms;
var startTime;

init();
animate();
var mesh;
var sphere;
function init() {

  container = document.getElementById( 'container' );

  startTime = Date.now();
  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry( 2, 2);
  
  var matrix = new THREE.Matrix4();
//        |                  |

var Syx = 0.5,
    Szx = 0,
    Sxy = 0,
    Szy = 0,
	Sxz = 0,
	Syz = 0;
	
	
	
	matrix.set(   1,   Syx,  Szx,  0,
				Sxy,     1,  Szy,  0,
				Sxz,   Syz,   1,   0,
				  0,     0,   0,   1  );

  //geometry.applyMatrix( matrix );
  
  uniforms = {
    iGlobalTime: { type: "f", value: 1.0 },
    iResolution: { type: "v2", value: new THREE.Vector2() },
	iMouse: { type: "v2", value: new THREE.Vector2() }
  };

  var material = new THREE.ShaderMaterial( {

    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent

  } );
  
  mesh = new THREE.Mesh( geometry, material );

  //scene.add( mesh );
  
  var material2 = new THREE.ShaderMaterial( {

    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader2' ).textContent

  } );
  


  
  sphere = new THREE.Mesh( geometry, material2 );
  //sphere.translateX(.6);
  
  scene.add( sphere );
  
  renderer = new THREE.WebGLRenderer();
  container.appendChild( renderer.domElement );

  onWindowResize();

  window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener('mousemove', mouseMonitor,false);

}
 function mouseMonitor(event) {
  uniforms.iMouse.value.x = event.pageX;
  uniforms.iMouse.value.y = event.pageY;
}

function onWindowResize( event ) {

  uniforms.iResolution.value.x = window.innerWidth;
  uniforms.iResolution.value.y = window.innerHeight;

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {
  var currentTime = Date.now();
  uniforms.iGlobalTime.value = (currentTime - startTime) * 0.001;
  renderer.render( scene, camera );

}