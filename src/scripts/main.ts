import '@/styles/style.scss';
import initThree from './three/init';
import grabDesktopInit from './grabDesktop/init';

const init = () => {
  const container = document.querySelector<HTMLElement>('.app');
  if (!container) {
    return;
  }

  const imageContainer =
    document.querySelector<HTMLElement>('.image-container');
  if (!imageContainer) {
    return;
  }

  const imageArray = Array.from(
    imageContainer.querySelectorAll<HTMLImageElement>('img'),
  );
  if (imageArray.length === 0) {
    return;
  }

  grabDesktopInit();
  initThree(container, imageArray, imageContainer);
};

export default init;
