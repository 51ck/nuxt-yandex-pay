import { defineNuxtModule, addPlugin, createResolver, addImports, addComponent, isNuxt2, isNuxt3 } from '@nuxt/kit'
import { AppHeadMetaObject } from '@nuxt/schema';
const SDK_URL = 'https://pay.yandex.ru/sdk/v1/pay.js';

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'YaPay',
    configKey: 'yaPay'
  },

  // Default configuration options of the Nuxt module
  defaults: {},


  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.app.head.script = nuxt.options.app.head.script || [] as AppHeadMetaObject['script'];
    nuxt.options.app.head.script.push({
      src: SDK_URL,
      async: true,
      id: 'YaPay-SDK',
    });

    if (isNuxt2(nuxt)) {
      addImports({
        name: 'useYaPay', // name of the composable to be used
        as: 'useYaPay',
        from: resolver.resolve('runtime/composables/useYaPay.nuxt2'), // path of composable
      });
    }
    if (isNuxt3(nuxt)) {
      addImports({
        name: 'useYaPay', // name of the composable to be used
        as: 'useYaPay',
        from: resolver.resolve('runtime/composables/useYaPay.nuxt3'), // path of composable
      });
    }


    addComponent({
      name: 'YaPayButton',
      filePath: resolver.resolve('./runtime/components/YaPayButton'),
    });

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'));
  }
})
