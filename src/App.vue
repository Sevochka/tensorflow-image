<template>
  <div class="app">
    <div class="app__controls">
      <button
        v-for="tab in TABS"
        :key="tab.name"
        class="app__control"
        :class="{ 'app__control--active': tab.name === currentTab.name }"
        @click="handleTabClick(tab)"
      >
        {{ tab.name }}
      </button>
    </div>

    <component
      :is="currentTab.component"
      class="app__tab"
    />
  </div>
</template>

<script setup>
import Image from '@/components/Image.vue';
import WebCamera from '@/components/WebCamera.vue';
import { markRaw, ref } from 'vue';

const TABS = [
  {
    name: 'Image',
    component: markRaw(Image),
  },
  {
    name: 'Webcam',
    component: markRaw(WebCamera),
  },
];

const currentTab = ref(TABS[0]);

const handleTabClick = (tab) => {
  currentTab.value = tab;
};

</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &__controls {
    display: flex;
    gap: 1rem;

    margin-bottom: 2rem;
  }

  &__control {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid red;
    background-color: darkblue;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &--active {
      background-color: white;
      color: darkblue;
    }

    &:hover {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }

  &__tab {
    width: 100%;
  }

}
</style>
