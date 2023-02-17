<template>
  <section class="web-camera">
    <div class="web-camera__video-container">
      <div
        v-if="!predictions"
        class="web-camera__loading"
      >
        Загрузка модели...
      </div>

      <div
        v-else
        class="web-camera__predictions"
      >
        <div
          v-for="prediction in predictions"
          :key="prediction.className"
          class="web-camera__prediction"
          :style="{ left: prediction.bbox[0] + 'px',
                    top: prediction.bbox[1] + 'px',
                    width: prediction.bbox[2] + 'px',
                    height: prediction.bbox[3] + 'px'}"
        >
          {{ prediction.class }}: {{ prediction.score }}
        </div>
      </div>

      <video
        id="webcam"
        ref="videoEl"
        autoplay
        muted
        width="640"
        height="480"
      />
    </div>
  </section>
</template>

<script setup>

import { onBeforeUnmount, onMounted, ref } from 'vue';
import { enableCam, predictWebcam, removeListener } from '@/utils/videoPredictions';

const videoEl = ref(null);

const predictions = ref(null);

const loadFunctionality = async () => {
  const model = await enableCam(videoEl.value);

  predictWebcam(model, videoEl.value, (prediction) => {
    predictions.value = prediction;
  });
};

onMounted(async () => {
  loadFunctionality();
});

onBeforeUnmount(() => {
  removeListener();
});
</script>

<style lang="scss" scoped>
.web-camera {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__video-container {
    position: relative;

    @include layout-mobile {
      transform: scale(0.5);
    }
  }

  &__start-btn {
    cursor: pointer;
    padding: 0.5rem;
    margin-bottom: 1rem;

    background: mediumvioletred;
    border-radius: 0.2rem;
    color: white;
  }

  &__predictions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__prediction {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 5px;
  }

  &__loading {
    font-size: 3rem;
    color: red;
    text-align: center;

  }
}
</style>
