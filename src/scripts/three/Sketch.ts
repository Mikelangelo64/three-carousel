import * as THREE from 'three';
import Mesh from './Mesh';

export class Sketch {
  private _container: HTMLElement;

  get container() {
    return this._container;
  }

  private _imageContainer: HTMLElement;

  get imageContainer() {
    return this._imageContainer;
  }

  private _elementsDom: HTMLImageElement[];

  get elementsDom() {
    return this._elementsDom;
  }

  private _viewport: {
    width: number;
    height: number;
    aspectRatio: number;
  };

  get viewport() {
    return this._viewport;
  }

  private _scene: THREE.Scene | undefined;

  private _camera: THREE.OrthographicCamera | undefined;

  private _renderer: THREE.WebGLRenderer | undefined;

  private _meshItems: Mesh[];

  constructor(
    container: HTMLElement,
    images: HTMLImageElement[],
    imageContainer: HTMLElement,
  ) {
    this._container = container;
    this._imageContainer = imageContainer;
    this._elementsDom = images;
    this._meshItems = [];

    this._viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
    };

    this._createScene();
    this._createCamera();
    this._initRenderer();
    this._createMesh();
    this.render();
  }

  private _createScene() {
    this._scene = new THREE.Scene();
  }

  private _createCamera() {
    this._camera = new THREE.OrthographicCamera(
      this._viewport.width / -2,
      this._viewport.width / 2,
      this._viewport.height / 2,
      this._viewport.height / -2,
      -200,
      200,
    );
  }

  private _initRenderer() {
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    this._container.appendChild(this._renderer.domElement);
  }

  private _createMesh() {
    this._elementsDom.forEach((item, index) => {
      if (!this._scene) {
        return;
      }

      const mesh = new Mesh(item, this._scene, this._imageContainer, index);
      this._meshItems.push(mesh);
    });
  }

  render() {
    if (
      this._meshItems.length === 0 ||
      !this._camera ||
      !this._renderer ||
      !this._scene
    ) {
      return;
    }

    this._renderer.render(this._scene, this._camera);

    this._meshItems.forEach((mesh) => {
      mesh.render();
    });

    requestAnimationFrame(this.render.bind(this));
  }
}
