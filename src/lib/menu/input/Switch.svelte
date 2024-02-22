<script lang="ts">
export let toggled: boolean;
</script>

<div class="switch {toggled ? 'on' : ''}" on:click={() => toggled = !toggled}><div class="switchslider" /></div>

<style lang="less">
.switch {
  position: absolute;
  transition: all 250ms;
  right: 30px;
  width: 50px;
  height: 25px;
  background-color: var(--border-color);
  border-radius: 999px;
  .switchslider {
    transition: all 250ms;
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    border-radius: 999px;
    background-color: white;
    width: 20px;
    height: 20px;
  }
  &.on {
    background-color: rgb(39, 66, 66);
    .switchslider {
      left: 27.5px;
    }
  }
}
</style>