import { NextRouter } from "next/router";

export function routerPush(router: NextRouter, url: string) {
  setTimeout(() => {
    router.push(url);
  }, 500);
}
