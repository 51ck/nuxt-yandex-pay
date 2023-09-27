import { Nuxt } from '@nuxt/schema';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxt: Nuxt) => {
  let YaPay = null;
  if (process.client) {
    YaPay = window.YaPay;
    if (!YaPay) {
      const SDKScript: HTMLScriptElement = document.querySelector('script#YaPay-SDK');

      if (!SDKScript) {
        return;
      }

      SDKScript.addEventListener('load', () => {
        Object.defineProperties(nuxt, {
          '$YaPay': {
            get: () => window.YaPay || null,
          },
        });
      })
    }
  }

  return {
    provide: {
      YaPay
    }
  }
});
