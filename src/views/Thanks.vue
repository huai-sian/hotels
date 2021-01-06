<template>
  <div>
    <Navbar currPage='thank'></Navbar>
    <div class="container thanks">
      <h1 class='thank_title'>Reservation received!</h1>
      <ul class='info_ul'>
        <li class='info_li li_guest'>
          <div class="row">
            <div class="col-4"><div>GUEST</div></div>
            <div class='col-8'><div>{{ reservations.name }}</div></div>
          </div>
        </li>
        <li class='info_li'>
          <div class="row">
            <div class="col-4"><div>PHONE</div></div>
            <div class='col-8'><div>{{ reservations.tel }}</div></div>
          </div>
        </li>
        <li class='info_li'>
          <div class="row">
            <div class="col-4"><div>ROOM</div></div>
            <div class='col-8'><div>{{ reservations.roomName}}</div></div>
          </div>
        </li>
        <li class='info_li li_guest'>
          <div class="row">
            <div class="col-4"><div>CHECK-IN</div></div>
            <div class='col-8'><div>{{ reserveFrom }}</div></div>
          </div>
        </li>
        <li class='info_li'>
          <div class="row">
            <div class="col-4"><div>CHECK-OUT</div></div>
            <div class='col-8'><div>{{ reserveTo }}</div></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';
import mixins from '../mixins';

export default {
  name: 'Thanks',
  mixins: [mixins],
  components: {
    Navbar,
  },
  computed: {
    reservations() {
      return this.$store.state.reservation;
    },
    reserveFrom() {
      return this.reservations.date[0];
    },
    reserveTo() {
      const d = new Date(this.reservations.date[this.reservations.date.length - 1]);
      return this.dateFormat(this.addDate(d, 1));
    },
  },
};
</script>
<style lang="scss" scoped>
.thanks{
  padding-top:80px;
}
.container{
  width:80%;
  max-width:800px;
  margin: 0 auto;
  padding-left:3rem;
  padding-right: 3rem;
  margin-bottom: 4rem;
}
.thank_title{
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
}
.info_ul{
  list-style: none;
  .info_li{
    border-bottom: 1px solid rgb(224, 224, 224);
    margin-bottom:1rem;
    .row{
      padding:10px 0;
      display:flex;
      align-items: center;
      .col-4{
        width: 36%;
        font-weight:500;
      }
      .col-8{
        width: 64%;
        div{
          text-align: center;
        }
      }
    }
  }
  .li_guest{
    border-bottom: none;
    margin-bottom:0rem;
  }
}
</style>
