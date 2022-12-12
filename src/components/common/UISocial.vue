<template>
  <span
    class="ui-social"
    :class="classes"
  >
    <span class="ui-social__bg" />
    <component :is="type?.toUpperCase() + 'Logo'" />
  </span>
</template>

<script>
import VKLogo from './icons/VKLogo.vue';
import TWLogo from './icons/TWLogo.vue';
import OKLogo from './icons/OKLogo.vue';
import WALogo from './icons/WALogo.vue';
import TGLogo from './icons/TGLogo.vue';

export default {
  components: {
    VKLogo,
    TWLogo,
    OKLogo,
    TGLogo,
    WALogo,
  },
  props: {
    type: String,
    size: String,
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return {
        [`is-type-${this.type}`]: this.type,
        [`is-size-${this.size}`]: this.size,
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.ui-social {
  width: 30px;
  height: 30px;
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: opacity 0.25s ease;
  background: black;
  border-radius: 50%;
  border: 1px solid white;

  svg {
    position: relative;
    z-index: 2;
    flex: 0 0 12px;
    width: 12px;
    height: 12px;
    & >  {
      & >  {
        & > svg {
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  &.is-type-ok svg {
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
  }
  &:hover {
    opacity: .7;
  }
}
</style>
