export const Prop = () => {
  return (target, propName) => {
    target.constructor.propDecorators[propName] = null;
  }
}