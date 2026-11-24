export const QUESTION_SWIPE_DISTANCE = 56;
export const QUESTION_FLICK_MIN_DISTANCE = 28;
export const FEEDBACK_SWIPE_DISTANCE = 64;
export const FEEDBACK_FLICK_MIN_DISTANCE = 32;
export const FLICK_VELOCITY_THRESHOLD = 0.38; // px/ms

export type SwipeDirection = 'left' | 'right';
export type GestureAxis = 'horizontal' | 'vertical' | null;

export function detectGestureAxis(dx: number, dy: number): GestureAxis {
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  if (absX > 12 && absX > absY * 1.2) {
    return 'horizontal';
  }
  if (absY > 10 && absY >= absX) {
    return 'vertical';
  }
  return null;
}

export function resolveHorizontalSwipe(
  dx: number,
  velocityX: number,
  distanceThreshold: number,
  flickMinDistance: number
): SwipeDirection | null {
  const passedDistance = Math.abs(dx) >= distanceThreshold;
  const passedFlick =
    Math.abs(dx) >= flickMinDistance && Math.abs(velocityX) >= FLICK_VELOCITY_THRESHOLD;

  if (!passedDistance && !passedFlick) {
    return null;
  }
  return dx < 0 ? 'left' : 'right';
}
