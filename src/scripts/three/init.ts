import { Sketch } from './Sketch';

const initThree = (
  container: HTMLElement,
  imageArray: HTMLImageElement[],
  imageContainer: HTMLElement,
) => {
  const sketch = new Sketch(container, imageArray, imageContainer);
  console.log(sketch);
};

export default initThree;
