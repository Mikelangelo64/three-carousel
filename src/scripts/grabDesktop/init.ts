const grabHandler = (containerDom: HTMLElement) => {
  const container = containerDom;

  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const progress = {
    current: 0,
    target: 0,
  };

  // const frame = new AnimationFrame({ fps: 60 });

  // const render = () => {
  //   progress.current = lerp(progress.current, progress.target, 0.16);
  //   container.scrollLeft = progress.current;

  //   if (progress.current === progress.target) {
  //     frame.pause();
  //   }
  // };

  // frame.addCallback('frame', () => {
  //   render();
  // });

  container.addEventListener('mousedown', (evt) => {
    isDown = true;
    container.classList.add('active');
    startX = evt.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('active');
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('active');
  });

  container.addEventListener('mousemove', (evt) => {
    if (!isDown) {
      return;
    }

    evt.preventDefault();

    const x = evt.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    progress.target = scrollLeft - walk;
    container.scrollLeft = progress.target;
    // frame.play();
  });
};

const grabDesktopInit = () => {
  // if (vevet.isMobile) {
  //   return;
  // }

  const containerArray =
    document.querySelectorAll<HTMLElement>('.grab-desktop');

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    grabHandler(container);
  });
};

export default grabDesktopInit;
