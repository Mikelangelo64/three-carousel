import * as THREE from 'three';
import vertex from '@/glsl/vertex.glsl';
import fragment from '@/glsl/fragment.glsl';
import { lerp } from '@/scripts/lerp';

export default class Mesh {
  private _element: HTMLImageElement;

  private _container: HTMLElement;

  private _index: number;

  private _scene: THREE.Scene;

  private _position: THREE.Vector2;

  private _size: THREE.Vector2;

  private _mesh: THREE.Mesh | undefined;

  private _uniforms: THREE.Shader['uniforms'] | undefined;

  get uniforms() {
    return this._uniforms;
  }

  constructor(
    element: HTMLImageElement,
    scene: THREE.Scene,
    container: HTMLElement,
    index: number,
  ) {
    this._element = element;
    this._container = container;
    this._index = index;
    this._scene = scene;

    this._position = new THREE.Vector2(0, 0);
    this._size = new THREE.Vector2(0, 0);

    this._getDimensions();
    this._createMesh();
  }

  private _getDimensions() {
    const { width, height, top, left } = this._element.getBoundingClientRect();
    this._size.set(width, height);

    const newPositionX = lerp(
      this._position.x,
      left - window.innerWidth / 2 + width / 2,
      0.04,
    );

    this._position.set(
      newPositionX,
      -top + window.innerHeight / 2 - height / 2,
    );
  }

  private _createMesh() {
    const geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
    const imageTexture = new THREE.TextureLoader().load(this._element.src);

    this._uniforms = {
      uTexture: { value: imageTexture },
      uAlpha: { value: 1 },
    };

    // const material = new THREE.MeshBasicMaterial({
    //   color: 0xf00000,
    //   side: THREE.DoubleSide,
    //   wireframe: true,
    // });
    const material = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      // wireframe: true,
    });

    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.position.set(this._position.x, this._position.y, 100);
    this._mesh.scale.set(this._size.x, this._size.y, 1);

    this._scene.add(this._mesh);
  }

  render() {
    if (!this._mesh) {
      return;
    }

    this._getDimensions();

    this._mesh.position.set(this._position.x, this._position.y, 0);

    this._mesh.scale.set(this._size.x, this._size.y, 1);

    //this._mesh.position.x += 10;
  }
}
