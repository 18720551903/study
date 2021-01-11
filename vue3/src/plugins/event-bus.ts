import mitt, { Emitter } from 'mitt';
const emitter: Emitter = mitt();

export default {
  $on: emitter.on,
  $off: emitter.off,
  $emit: emitter.emit
};
