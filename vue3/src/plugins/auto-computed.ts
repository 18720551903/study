import { App } from 'vue';

interface Options {
  readonly designWidth?: number;
  readonly maxWidth?: number;
  readonly minWidth?: number;
  readonly base?: number;
}

export default {
  install(app: App<Element>, options: Options = {}) {
    function autoComputed({
      designWidth = 1920,
      maxWidth = 2 ** 64,
      minWidth = 1366,
      base = 100
    }) {
      const html = document.documentElement || document.body;
      const limitMax = maxWidth / designWidth;
      const limitMin = minWidth / designWidth;
      const scale = document.body.offsetWidth / designWidth;

      html.style.fontSize =
        (
          (scale < limitMin ? limitMin : scale > limitMax ? limitMax : scale) *
          base
        ).toFixed(2) + 'px';
    }
    autoComputed(options);
    window.addEventListener('resize', () => {
      autoComputed(options);
    });
  }
};
