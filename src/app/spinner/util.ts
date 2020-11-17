export const svgnms = 'http://www.w3.org/2000/svg';

export function wait(duration: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
