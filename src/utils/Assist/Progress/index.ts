import NProgress from 'nprogress';

class NProgressUtil {
  #loading = false;

  internalStart = () => {
    NProgress.start();
    this.#loading = true;
  };

  start() {
    if (this.#loading) {
      NProgress.done();
      setTimeout(this.internalStart, 50);
    } else {
      this.internalStart();
    }
  }

  done() {
    this.#loading = false;
    NProgress.done();
  }
}

export default new NProgressUtil();
