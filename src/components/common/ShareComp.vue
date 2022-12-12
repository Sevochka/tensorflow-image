<template>
  <div class="share-comp">
    <div
      v-if="label"
      class="share-comp__label"
    >
      {{ label }}
    </div>

    <UISocial
      v-for="socType in socialTypes"
      :key="socType"
      :type="socType"
      class="share-comp__button"
      @click="share(socType)"
    />
  </div>
</template>

<script>
import Share from '../../utils/share';
import { sendShareEvent } from '../../utils/analytics';
import UISocial from './UISocial.vue';

export default {
  components: {
    UISocial,
  },
  props: {
    resultId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    socialTypes() {
      return ['vk', 'tg', 'ok', 'wa', 'tw'];
    },
  },
  methods: {
    share(type) {
      this.track(type);
      Share.open(type, this.sharedData(type));
      return '';
    },
    sharedData(type) {
      return {
        url: this.url(type),
        title: this.title,
      };
    },
    url() {
      return 'httt://sports.ru';
    },
    getLink(type) {
      return Share.getLink(type, this.sharedData);
    },
    track(type) {
      sendShareEvent({ socialNetwork: type });
    },
  },
};
</script>

<style lang="scss" scoped>
.share-comp {
  display: flex;
  justify-content: center;
  margin-top: 22px;

  &__label {
    font-size: 12px;
    color: white;
    display: flex;
    align-items: center;
    margin-right: 12px;
    z-index: 3;

    @include layout-mobile {
      display: none;
    }
  }

  &__button {
    &+& {
      margin-left: 8px;
    }
  }
}
</style>
