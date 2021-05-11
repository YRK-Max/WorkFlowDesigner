<template>
  <div class="row">
    <img src="../../assets/head_img.png">
    <label>{{title}}</label>
  </div>
</template>

<script>
export default {
  name: 'CustomHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.row{
  height: 30px;
  font-size: 15px;
  background: #f7f7f7;
  position: relative;
  padding: 5px;
}
.row img, label{
  display: inline-block;
}
.row img{
  height: 20px;
  vertical-align: top;
}
.row label{
  margin-left: 6px;
  font-weight: bolder;
}
</style>
