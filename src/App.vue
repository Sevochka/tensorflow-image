<template>
  <div class="app">
    <input
      type="file"
      @change="handleFileAdd"
    >

    <div class="app__content">
      <img
        ref="imageEl"
        :src="image"
        alt="your image"
      >

      <div class="app__predictions">
        <h3>Predictions</h3>
        <p
          v-for="prediction in predictions"
          :key="prediction.className"
        >
          {{ prediction }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import classify from '@/utils/classify';
import cat from '@/assets/cat.jpg';

const image = ref(cat);
const predictions = ref(null);
const handleFileAdd = async (e) => {
  const [imagFile] = e.target.files;

  image.value = URL.createObjectURL(imagFile);

  predictions.value = await classify(image.value);
};

onMounted(async () => {
  predictions.value = await classify(image.value);
});
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &__content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;

    h3 {
      font-size: 20px;
      font-weight: 800;
    }
  }

  &__predictions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 400px;
    height: 400px;
    object-fit: contain;
  }
}
</style>
