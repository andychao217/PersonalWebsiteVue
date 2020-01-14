<template>
  <div :style="{width: '100vw', height: '100vh', backgroundColor: 'whitesmoke'}">
  </div>
</template>
<script>
    import bgPic from "@/assets/bg2.jpg";
    export default {
        name: "loading",
        data() {
            return {
                imgUrl: 'url(' + bgPic + ')'
            }
        }
    }
</script>
