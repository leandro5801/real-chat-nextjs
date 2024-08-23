
export const TimeOut = (time:number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(time);
        }, time);
      });
}