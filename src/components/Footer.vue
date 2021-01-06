<template>
  <div>
    <footer>
      <div class='container'>
        <div class='map'>
        </div>
        <div class='copyright'>© 2019 HexHotel. All rights reserved.</div>
        <div class='address'>No. 5, Kaokao St., Kaohsiung City 803, Taiwan</div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'Footer',
};
</script>
<style lang="scss" scoped>
.container{
  width: 90%;
  margin:0 auto;
  position: relative;
}
.map{
  background-image: url("../assets/螢幕快照 2020-11-28 下午11.30.45.png");
  width:100%;
  background-size: cover;
  background-repeat: no-repeat;
  height:380px;
  z-index: 10;
}
.copyright, .address{
  left:0;
  position:absolute;
  font-size:1rem;
  color:#748290;
  height:4rem;
  line-height: 4rem;
}
 .address{
   right:0;
   left: auto;
 }
 @media screen and (max-width: 768px){
  .copyright, .address{
    left:0;
    position:absolute;
    font-size:0.7rem;
    color:#748290;
    height:2rem;
    line-height: 1rem;
  }
  .copyright{
    height:1rem;
  }
   .address{
      left:0;
      bottom:-3rem;
   }
 }
</style>
