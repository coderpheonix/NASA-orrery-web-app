// Setup the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create the Sun (as a light source)
const sunLight = new THREE.PointLight(0xFFFFFF, 1, 100);
sunLight.position.set(0, 0, 0); // Sun at the center
scene.add(sunLight);

// Create Sun as a yellow sphere
const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0);
scene.add(sun);

// Create Earth (as a mesh with a blue material)
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(5, 0, 0); // Place Earth 5 units away from the Sun
scene.add(earth);

// Create Mars (as a red sphere)
const marsGeometry = new THREE.SphereGeometry(0.8, 32, 32);
const marsMaterial = new THREE.MeshBasicMaterial({color: 0xFF5733});
const mars = a Mesh(marsGeometry, marsMaterial);
mars.position.set(8, 0, 0); // Place Mars 8 units away from the Sun
scene.add(mars);

// Set the camera position
camera.position.z = 15;

// Add controls (orbit around the scene)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// NASA NEO API setup with your API key
const apiKey = 'pszf1uRds6MCHSyjlavhuCk9SPOnMCbYig4HNur3';  // Your NASA API key
const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}`;

// Fetch NEO data from NASA's NEO API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const neoObjects = data.near_earth_objects;
        Object.keys(neoObjects).forEach(date => {
            neoObjects[date].forEach(neo => {
                // Create NEO object (small red sphere representing an asteroid)
                const neoGeometry = new THREE.SphereGeometry(0.2, 32, 32);
                const neoMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000}); // Red for NEOs
                const neoMesh = new THREE.Mesh(neoGeometry, neoMaterial);

                // Randomly position the NEO in space (for demo purposes)
                neoMesh.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
                scene.add(neoMesh);
            });
        });
    })
    .catch(error => console.error('Error fetching NEO data:', error));

// Animation function to render the scene
function animate() {
    requestAnimationFrame(animate);

    // Earth's orbit motion around the Sun
    earth.position.x = 5 * Math.cos(Date.now() * 0.001);
    earth.position.z = 5 * Math.sin(Date.now() * 0.001);

    // Mars' orbit motion around the Sun
    mars.position.x = 8 * Math.cos(Date.now() * 0.0008);
    mars.position.z = 8 * Math.sin(Date.now() * 0.0008);

    controls.update(); // Update camera controls

    renderer.render(scene, camera); // Render the scene
}

// Start the animation loop
animate();
console.log("app.js is loaded");