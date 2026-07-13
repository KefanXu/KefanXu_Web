/**
 * Safari's compositor prefers translate3d() over translateY()/translateX()
 * for GPU-accelerated scrolling. This template replaces Framer Motion's
 * default 2D transform output with 3D equivalents.
 */
export const safari3dTemplate = (
  _: { rotate?: string; scaleX?: number; scaleY?: number },
  generated: string,
): string => {
  let result = generated;
  result = result.replace(
    /translateY\(([^)]+)\)/g,
    'translate3d(0px, $1, 0px)',
  );
  result = result.replace(
    /translateX\(([^)]+)\)/g,
    'translate3d($1, 0px, 0px)',
  );
  return result;
};
