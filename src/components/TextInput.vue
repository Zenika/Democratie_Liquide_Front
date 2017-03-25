<template>
  <div class="text-input">
    <component name="text-input" :is="textarea ? 'textarea' : 'input'" class="simple" :class="{ input: !!value }" :value="value" @input="$emit('input', $event.target.value)"></component>
    <label for="text-input" class="placeholder">{{ placeholder }}</label>
  </div>
</template>

<script>

export default {
  name: 'text-input',

  props: {
    placeholder: String,
    textarea: Boolean,
    value: String
  }
}
</script>

<style lang="scss" scoped>

.text-input {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

label {
  font-weight: bold;
  position: absolute;
  opacity: 0.3;
  top: 9px;
  left: 12px;
  text-shadow: none;
  transition: all 200ms ease;
  pointer-events: none;
}

input, textarea {
  padding: 10px;
  font-size: 1em;
  &:focus, &:active, &.input {
    & ~ label {
      transform: translate(-8px, -18px);
      font-size: 13px;
      opacity: 1;
      color: lightgray;
      // font-weight: normal;
      text-shadow: 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white, -2px -2px 0 white, 2px 0px 0 white, -2px 0px 0 white, 0 2px 0 white, 0 -2px 0 white;
    }
  }
}


</style>
