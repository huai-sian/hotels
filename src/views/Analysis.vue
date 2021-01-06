<template>
  <div >
    <Navbar currPage='analysis'></Navbar>
    <div class='container analysis'>
       <h2 class='h2'>報表</h2>
       <hr class="my-5">
       <div class='row'>
         <div class="col-6">
           <h3 class="h3">房型比例</h3>
           <ve-pie :data='chartData1' :settings="chartSettings" class='pie_chart'></ve-pie>
         </div>
         <div class="col-6">
           <h3 class="h3">訂單統計</h3>
           <ve-histogram :data='chartData2' class='histo_chart'></ve-histogram>
         </div>
       </div>
       <div class='row'>
         <div class="col-6">
           <h3 class="h3">完成付款比例</h3>
           <ve-liquidfill :data='chartData3' class='pie_chart'></ve-liquidfill>
         </div>
         <div class="col-6">
           <h3 class="h3">完成付款比例</h3>
           <ve-liquidfill :data='chartData4' class='histo_chart'></ve-liquidfill>
         </div>
       </div>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Analysis',
  components: {
    Navbar,
  },
  data() {
    this.chartSettings = {
      dimension: '房型',
      metrics: '房數',
    };
    return {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer xNygtU8g13IhFTs0nrMxqVbLCX2NWzLER3mWbTTx1HZG32hEnLoOuga0s2XK',
      },
      roomType: [],
      bookings: {},
      roomid: [],
      chartData1: {
        columns: ['房型', '房數'],
        rows: [
          { 房型: '單人房', 房數: 2 },
          { 房型: '雙人房', 房數: 2 },
          { 房型: '家庭房', 房數: 2 },
        ],
      },
      chartData2: {
        columns: ['房型', '訂單數'],
        rows: [{ 房型: 'Single Room', 訂單數: 3 },
          { 房型: 'Deluxe Single Room', 訂單數: 4 },
          { 房型: 'Double Room', 訂單數: 0 },
          { 房型: 'Deluxe Double Room', 訂單數: 0 },
          { 房型: 'Twin Room', 訂單數: 2 },
          { 房型: 'Deluxe Twin Room', 訂單數: 3 },
        ],
      },
      chartData3: {
        columns: ['訂單', 'percent'],
        rows: [{ 訂單: '已完成', percent: 0.8 }],
      },
      chartData4: {
        columns: ['訂單', 'percent'],
        rows: [{ 訂單: '已完成', percent: 0.8 }],
      },
    };
  },
  methods: {
    getRooms(val) {
      const vm = this;
      const api = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${val}`;
      vm.axios.get(api, {
        header: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer xNygtU8g13IhFTs0nrMxqVbLCX2NWzLER3mWbTTx1HZG32hEnLoOuga0s2XK',
        },
      }).then((response) => {
        vm.$set(vm.bookings, response.data.room[0].name, response.data.booking.length);
        vm.bookingSum();
      });
    },
    getRoomtype() {
      const vm = this;
      const api = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
      vm.axios.get(api, {
        header: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer xNygtU8g13IhFTs0nrMxqVbLCX2NWzLER3mWbTTx1HZG32hEnLoOuga0s2XK',
        },
      }).then((response) => {
        response.data.items.forEach((item) => {
          vm.roomType.push(item.name);
          vm.roomid.push(item.id);
          console.log(vm.roomType);
          console.log(vm.roomid);
        });
        vm.roomid.forEach((item) => {
          vm.getRooms(item);
        });
      });
    },
    bookingSum() {
      this.chartData2.row = [{ 房型: 'Single Room', 訂單數: this.bookings['Single Room'] },
        { 房型: 'Deluxe Single Room', 訂單數: this.bookings['Deluxe Single Room'] },
        { 房型: 'Double Room', 訂單數: this.bookings['Double Room'] },
        { 房型: 'Deluxe Double Room', 訂單數: this.bookings['Deluxe Double Room'] },
        { 房型: 'Twin Room', 訂單數: this.bookings['Twin Room'] },
        { 房型: 'Deluxe Twin Room', 訂單數: this.bookings['Deluxe Twin Room'] },
      ];
    },
  },
  mounted() {
    this.getRoomtype();
  },
};
</script>
<style lang="scss" scoped>
.analysis{
  padding-top: 80px;
  .h2{
    text-align: center;
    font-size:2.5rem;
    font-weight:600;
  }
  .row{
    width:90%;
    display: flex;
    margin: 0 auto;
    @media screen and (max-width: 786px){
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .col-6{
      width:50%;
      margin-top:1.5rem;
      margin-bottom:1.5rem;
      @media screen and (max-width: 786px){
        width:90%;
      }
      .h3{
        font-size: 1.6rem;
        font-weight: 500;
        text-align: center;
        margin-bottom: 1.5rem;
      }
      .pie_chart, .histo_chart{
        width:300px;
      }
    }
  }
}
</style>
