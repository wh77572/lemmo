/**
 * Created by lemmo on 2017/3/30.
 */
<template>
<div class="sss">
  <img src="../../../assets/logo.png">
  <div>
    <span>手机号码：</span>
    <input type="tel" class="s">
  </div>
  <div>
    <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
    <input type="password" class="s">
  </div>
  <div>
    <span>验&nbsp;证&nbsp;&nbsp;码：</span>
    <input type="text" class="s">
  </div>
</div>
</template>

<script>
export default {
  name: 'sss',
  data () {
    return {
      msg: 'sssss'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  color: red;
}
img{
  margin: -200px 0 60px 0;
}
  .sss{
    text-align: center;
    width: 500px;
    height: 600px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
</style>
