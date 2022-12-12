<template>
  <component
    :is="tag"
    class="common-button"
    :href="href"
    :class="classes"
    :style="styles"
    @click="onClick"
  >
    <span v-if="!htmlText">
      <slot />
    </span>
    <span
      v-else
      v-html="htmlText"
    />
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  bgColor: {
    type: String,
    default: '#FFCA05',
  },
  color: {
    type: String,
    default: '#000000',
  },
  theme: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  stretched: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  noMinWidth: {
    type: Boolean,
    default: false,
  },
  htmlText: {
    type: String,
    default: null,
  },
  noWrap: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const classes = computed(() => ({
  [`common-button--is-theme-${props.theme}`]: props.theme,
  'common-button--is-disabled': props.disabled,
  'common-button--is-stretched': props.stretched,
  'common-button--no-min-width': props.noMinWidth,
  'common-button--no-wrap': props.noWrap,
  [`common-button--size-${props.size}`]: props.size,
}));

const styles = computed(() => ({
  backgroundColor: props.bgColor,
  color: props.color,
}));

const tag = computed(() => (props.href ? 'a' : 'button'));

function onClick() {
  if (props.disabled) return;

  emit('click');
}
</script>

<style lang="scss" scoped>
.common-button {
  border: 0 none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  user-select: none;
  height: 44px;
  min-width: 182px;
  text-align: center;
  outline: none;
  transition: opacity 0.3s ease;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.1;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 74px;

  @include layout-mobile {
    font-size: 12px;
    padding: 12px 24px;
    height: auto;
  }

  &:hover {
    opacity: 0.7;
  }

  span {
    display: inline-block;
  }

  &--is-stretched {
    width: 100%;
  }

  &--no-min-width {
    min-width: auto;
    flex: 1;
  }

  &--is-disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  &--no-wrap {
    white-space: nowrap;
  }

  &--size-big {
    height: 56px;
    font-size: 20px;
    padding: 14px 28px;
    min-width: 220px;
  }
}

</style>
