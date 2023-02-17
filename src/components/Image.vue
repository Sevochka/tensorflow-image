<template>
  <div class="image">
    <input
      type="file"
      @change="handleFileAdd"
    >

    <div class="image__content">
      <img
        ref="imageEl"
        :src="image"
        alt="your image"
      >

      <div class="image__predictions">
        <h3 class="image__prediction-title">
          Предсказания
        </h3>

        <h4 v-if="isPredictiong">
          Загрузка предсказания...
        </h4>
        <div
          v-for="prediction in predictions"
          v-else
          :key="prediction.className"
          class="image__prediction"
        >
          Это <span class="image__class-name">
            {{ prediction.className }}
          </span>
          с вероятностью <span class="image__probability">
            {{ prediction.probability }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import classify from '@/utils/classify';
import cat from '@/assets/cat.jpg';

const image = ref(cat);
const isPredictiong = ref(true);
const predictions = ref(null);
const handleFileAdd = async (e) => {
  isPredictiong.value = true;
  const [imagFile] = e.target.files;

  image.value = URL.createObjectURL(imagFile);

  predictions.value = await classify(image.value);
  isPredictiong.value = false;
};

onMounted(async () => {
  predictions.value = await classify(image.value);
  isPredictiong.value = false;
});
</script>

<style lang="scss">
.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
    width: 100%;
  }

  img {
    width: 400px;
    height: 400px;
    object-fit: contain;
  }

  &__prediction-title {
    margin-bottom: 1rem;
  }

  &__prediction {
    text-align: center;
    padding: 1rem;
    border: 1px solid #000;
    width: 100%;
    min-height: 4rem;

    & + & {
      margin-top: 0.3rem;
    }
  }

  &__class-name {
    font-weight: 800;
    color: red;
  }
}
</style>
