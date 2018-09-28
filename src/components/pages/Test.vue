<template>
    <div>
        <tag-cloud :data="hotTag" :config="tagConfig" @clickTag="clickTagItem"></tag-cloud>
    </div>
</template>

<script>
    export default {
        name:'Test',
        data () {
    return {
      hotTag: [{"id":"05023f8da31c4b4187cc6899e2a3aec2","name":"镇远县"},{"id":"0ef028e5278f4f5ca31f99f1bd22b1cc","name":"剑河县"},{"id":"1a32ef04d3c548eaa6777abb46da32f2","name":"台江县"},{"id":"2c26488325bd493687d16315fe0e5fdd","name":"岑巩县"},{"id":"3a786111828a4b9f89ae9da25753eedd","name":"黎平"},{"id":"4ed593eed91b4244969995237f5c96c5","name":"丹寨县"},{"id":"615d2c178f1a47cb8d473823e74f5386","name":"凯里市"},{"id":"76f652df03db43349272a9aff492b065","name":"榕江县"},{"id":"8ff29d0d35e548feb945063b34ed9c9b","name":"黄平县"},{"id":"a8ac2170008746fdadc05ea461bc5e37","name":"雷山县"}]
      ,
      tagConfig:{'hover':true,'radius':60}
    }
  },
  methods: {
    clickTagItem (tag) {
      // TODO
    }
  }
    }
</script>

<style scoped>

</style>