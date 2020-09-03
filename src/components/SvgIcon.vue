<!--
 * @Author: yzh
 * @Date: 2020-08-31 10:16:16
 * @Description: file content
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
        // console.log('this.iconClass :>> ', this.iconClass);
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style>
.svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.25em;
      fill: currentColor;
      overflow: hidden;
  }
</style>
