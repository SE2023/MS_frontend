<template>
  <PageWrapper title="Guide Page" content="An instruction to users.">
    <a-button type="primary" @click="handleStart">Start</a-button>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { PageWrapper } from '/@/components/Page'
  import { useDesign } from '/@/hooks/web/useDesign'
  import intro from 'intro.js'
  import 'intro.js/minified/introjs.min.css'

  export default defineComponent({
    components: { PageWrapper },
    setup() {
      const { prefixVar } = useDesign('')

      function handleStart() {
        intro()
          .setOptions({
            steps: [
              {
                title: 'Welcome',
                intro:
                  "Hi, there! 👋 \n Let' s firstly have a look at the usage of the sports-booking management system.",
              },
              {
                title: 'LOGO',
                element: document.querySelector(`.${prefixVar}-layout-menu-logo`)!,
                intro: 'This is our LOGO.',
              },
              {
                title: 'Collapse Button',
                element: document.querySelector(`.${prefixVar}-layout-header-trigger`)!,
                intro: 'This is the menu collapse button.',
              },
              {
                title: 'User Action',
                element: document.querySelector(`.${prefixVar}-layout-header-action`)!,
                intro: 'This is the user function area.',
              },
              {
                title: 'Menu List',
                element: document.querySelector(`.${prefixVar}-layout-sideBar`)!,
                intro: 'This is the menu list.',
              },
              {
                title: 'Begin',
                intro: "Let's start it!",
              },
            ],
          })
          .start()
      }
      return { handleStart }
    },
  })
</script>
