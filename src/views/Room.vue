<template>
  <div>
    <Navbar currPage='thank'></Navbar>
    <div class="container" v-if='singleRoom.name'>
      <div class='room_detail'>
        <h2 class="room_title">{{singleRoom.name}}</h2>
        <div class='img-wrap'>
          <div class='big_img'>
            <img :src="singleRoom.imageUrl[currIdx]" :alt="singleRoom.name">
          </div>
          <div class="price-des">Weekday Price</div>
        </div>
        <div class='photo_list'>
          <ul class='photo_ul'>
            <li class='photo_li' v-for='(img, idx) in singleRoom.imageUrl'
            :key='img' @click.prevent="setCurrimg(idx)">
              <img :src="img" :alt="singleRoom.name" class="sub_img">
            </li>
          </ul>
        </div>
        <section class='des_con'>
          <h3 class='h3'>Description</h3>
          <p>{{ guest }}Guest・{{singleRoom.descriptionShort.Bed.length}}Bed(
            {{singleRoom.descriptionShort.Bed[0]}})
            ・{{singleRoom.descriptionShort['Private-Bath']}}Private Bath・
            {{singleRoom.descriptionShort.Footage}}m²</p>
          <p>{{singleRoom.description}}</p>
          <p>Check-in is from {{singleRoom.checkInAndOut.checkInEarly}} to
            {{singleRoom.checkInAndOut.checkInLate}}
            Check-out is before {{singleRoom.checkInAndOut.checkOut}}</p>
        </section>
        <section class="amen_con">
          <h3 class="h3">Amenities</h3>
          <ul class='amenity-list'>
            <li :class="{'active': singleRoom.amenities['Wi-Fi']}">
              <i class="fas fa-wifi"></i> Wi-Fi</li>
            <li :class="{'active': singleRoom.amenities['Television']}">
              <i class="fas fa-tv"></i> Television</li>
            <li :class="{'active': singleRoom.amenities['Great-View']}">
              <i class="fas fa-binoculars"></i> Great View</li>
            <li :class="{'active': singleRoom.amenities['Breakfast']}">
              <i class="fas fa-utensils"></i> Breakfast</li>
            <li :class="{'active': singleRoom.amenities['Air-Conditioner']}">
              <i class="far fa-snowflake"></i> Air Conditioner</li>
            <li :class="{'active': singleRoom.amenities['Smoke-Free']}">
              <i class="fas fa-smoking-ban"></i> Smoke Free</li>
            <li :class="{'active': singleRoom.amenities['Mini-Bar']}">
              <i class="fas fa-glass-martini-alt"></i> Mini Bar</li>
            <li :class="{'active': singleRoom.amenities['Refrigerator']}">
              <i class="fas fa-archive"></i> Refrigerator</li>
            <li :class="{'active': singleRoom.amenities['Child-Friendly']}">
              <i class="fas fa-child"></i> Child-Friendly</li>
            <li :class="{'active': singleRoom.amenities['Room-Service']}">
              <i class="fas fa-bell"></i> Room Service</li>
            <li :class="{'active': singleRoom.amenities['Sofa']}">
              <i class="fas fa-couch"></i> Sofa</li>
            <li :class="{'active': singleRoom.amenities['Pet-Friendly']}">
              <i class="fas fa-paw"></i> Pet-Friendly</li>
          </ul>
        </section>
      </div>
      <aside class='aside-reserve'>
        <div class='aside-price'><em> {{singleRoom.normalDayPrice | currency}} NTD</em>
         / night</div>
        <div class='aside-holiday-price'>Holiday price -
          {{singleRoom.normalDayPrice | currency}} NTD / night</div>
        <div class='datepicker-wrap'>
          <div class='date-picker'>
            <i class="fas fa-calendar-day"></i>
            <VueHotelDatepicker
            placeholder='Check-in / Check-Out'
            mobile='mobile'
            separator='-'
            format='YYYY-MM-DD'
            :maxDate='maxDate'
            :disabledDates='singleRoom.disabledDate'
            :startDate='this.booking.start'
            :endDate='this.booking.end'
            @confirm='updateDate'
            @reset='resetDate'
            ref='datePickInfo'
            >
            </VueHotelDatepicker>
          </div>
          <div v-show="booking.start !== '' && booking.end !== ''" class='booking-subtotal'>
            <ul>
              <li class="workingDay" v-show="workingDay > 0">
                <span class='item'> {{singleRoom.normalDayPrice | currency}} X {{workingDay}}
                   night (Weekdays)</span>
                <span class="subtotal"> {{singleRoom.normalDayPrice * workingDay | currency}}</span>
              </li>
              <li class="holiday" v-show='holiday > 0'>
                <span class='item'> {{singleRoom.holidayPrice | currency}}
                   X {{holiday}} night (Holidays)</span>
                <span class="subtotal"> {{singleRoom.holidayPrice * holiday | currency}}</span>
              </li>
              <li class="service_fee">
                <span class='item'>Service Fee</span>
                <span class="subtotal">{{serviceFee | currency}}</span>
              </li>
            </ul>
            <div class='total_price'>
              <span class='total_item'>TOTAL</span>
              <span class='item'>{{totalprice | currency}}</span>
            </div>
          </div>
          <div :class="{'disabled' : booking.date.length === 0}"
          @click.prevent='reserveRoom' class="reserve_btn">Reserve Now</div>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
import mixins from '@/mixins';
import VueHotelDatepicker from '@northwalker/vue-hotel-datepicker';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Room',
  mixins: [mixins],
  data() {
    return {
      roomid: this.$route.params.id,
      currIdx: 0,
    };
  },
  components: {
    VueHotelDatepicker,
    Navbar,
  },
  methods: {
    setCurrimg(idx) {
      this.currIdx = idx;
      console.log(this.$refs.datePickInfo);
    },
    reserveRoom() {
      // if (this.booking.date > 0) {
      this.$store.dispatch('setReservation', {
        roomId: this.roomid,
        date: this.booking.date,
      }).then(() => {
        this.$router.push({ name: 'Reservation', params: { id: this.roomid } });
      });
      // }
    },
  },
  computed: {
    serviceFee() {
      return this.$store.state.serviceFee;
    },
    singleRoom() {
      return this.$store.state.singleroominfo;
    },
    guest() {
      return (this.singleRoom.descriptionShort.GuestMin === this.singleRoom.descriptionShort.GuestMax) ? this.singleRoom.descriptionShort.GuestMin : `${this.singleRoom.descriptionShort.GuestMin}-${this.singleRoom.descriptionShort.GuestMax}`;
    },
  },
  created() {
    const vm = this;
    this.$store.dispatch('isLoading', true);
    this.$store.dispatch('getSingleroom', this.roomid);// 元件生成時即去後端api取得資料（點擊房間連結轉到該元件即會帶著房間id為參數)
    setTimeout(() => {
      vm.$store.dispatch('isLoading', false);
    }, 1500);
  },
};
</script>
<style lang="scss" scoped>
.container{
  width: 80%;
  padding-top:80px;
  margin:0 auto;
  display:flex;
  flex-direction: row;
  position: relative;
  @media screen and (max-width: 820px){
    width: 95%;
    flex-direction: column;
    justify-content: center;
  }
  @media screen and (max-width: 576px){
    padding-left:1rem;
    padding-right:1rem;
  }
}
.room_detail{
  width:75%;
  position:relative;
  @media screen and (max-width: 820px){
    width: 100%;
  }
  .room_title{
    position: absolute;
    left:0;
    top:0;
    color:black;
    writing-mode: vertical-lr;
    width:40px;
    height:auto;
    background-color: #fff;
    font-size: 35px;
    font-family: Helvetica;
    font-style: italic;
    line-height: 40px;
    padding:2.5px;
    z-index:3;
    font-weight: 800;
  }
  .img-wrap{
    position: relative;
    .big_img{
      img{
        width: 750px;
        height: 480px;
        object-position: center bottom;
        object-fit: cover;
        @media screen and (max-width: 820px){
          width: 100%;
        }
        @media screen and (max-width: 576px){
          height: 320px;
        }
      }
    }
    .price-des{
      position: absolute;
      left:750px;
      top:0;
      writing-mode:vertical-lr;
      font-size:1rem;
      color: #fff;
      text-transform: uppercase;
      background-color: #748290;
      padding:3px 6px;
      @media screen and (max-width: 820px){
        right:0px;
        left: auto;
      }
    }
  }
  .photo_list{
    margin-top:0.5rem;
    .photo_ul{
      width:100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      height:100px;
      .photo_li{
        display: block;
        height:100px;
        width:160px;
        cursor:pointer;
        margin-right: 1rem;
        @media screen and (max-width: 576px){
          height:80px;
          width:95%;
        }
        .sub_img{
          display: block;
          width: 160px;
          height: 100px;
          object-fit: cover;
          @media screen and (max-width: 576px){
          height:80px;
          width:95%;
          }
        }
      }
    }
  }
  .des_con, .amen_con{
    margin:2.5rem 0;
    width:100%;
    .h3{
      font-size: 1.3rem;
      font-weight: 600;
    }
    p{
      line-height:1.2rem;
      margin-top:15px;
    }
  }
  .amen_con{
    .amenity-list{
      width:100%;
      margin-top:1.5rem;
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      li{
        width:30%;
        margin-right: 1%;
        display: block;
        color: #c0c2c4;
        margin-top:1.4rem;
        @media screen and (max-width: 576px){
          width:45%;
        }
        &.active{
          color: #748290;
        }
      }
    }
  }
  .des_con{
    @media screen and (max-width: 820px){
       margin-top:14rem;
    }
  }
}
.aside-reserve{
  width:25%;
  position: absolute;
  z-index: 5;
  right:2.5rem;
  top:500px;
  @media screen and (max-width: 1200px){
    top:570px;
  }
  @media screen and (max-width: 820px){
    width: 100%;
    top:52%;
    right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  @media screen and (max-width: 576px){
    top:520px;
    right:0;
  }
  }
  .aside-price{
    font-size: 0.8rem;
    line-height: 2rem;
    color:#2d3643;
    text-align: right;
    em{
      font-size:24px;
      font-weight: 700;
    }
  }
  .aside-holiday-price{
    text-align: right;
    color:#2d3643;
    text-align: right;
    margin-top:10px;
    font-size: 0.9rem;
  }
}
.datepicker-wrap{
  width: 290px;
  top:30px;
  position: relative;
  background-color: #fff;
  border:1px solid #2d3643;
  border-right:1px solid #2d3643;
  &::after{
    content: '';
    position: absolute;
    top:20px;
    right:18px;
    width:0;
    height:0;
    border-top:6px solid #2d3643;
    border-left:6px solid transparent;
    border-right:6px solid transparent;
    pointer-events:none;
  }
  .date-picker>i{
    z-index: 15;
    position:absolute;
    top:20px;
    left:15px;
    font-size: 1rem;
  }
  .booking-subtotal{
    width:290px;
    height:auto;
    padding:1rem;
    ul{
      margin: 1rem 0;
      li{
        text-align: left;
        font-size:14px;
        margin:1rem 0;
        color:#748290;
        display: block;
        position:relative;
        .subtotal{
          position: absolute;
          right:2rem;
          top:0;
        }
      }
    }
    .total_price{
      border-top:1px solid rgb(218, 216, 216);
      padding-top:1rem;
      position: relative;
      width:265px;
      .item{
        position:absolute;
        right:0;
        font-weight: 800;
      }
    }
  }
  .reserve_btn{
    padding:0.5rem;
    line-height: 1.2rem;
    font-size: 1.2rem;
    background-color: #4e9dc7;
    text-align: center;
    color:#fff;
    cursor:pointer;
    &.hover{
      background-color: #569dc3;
    }
    &.disabled{
      pointer-events: none;
      background-color: #eee;
      color: #999;
    }
  }
}
.datepicker-wrap ::v-deep .vhd-container {
  background-color: rgb(214, 208, 208);
  width: 290px;
  cursor: pointer;
  border-bottom: 1px solid #2d3643;
}
.datepicker-wrap ::v-deep .vhd-input {
  position: relative;
  border:none;
  cursor: pointer;
  width: 290px;
  min-width: 290px;
}
.datepicker-wrap ::v-deep .vhd-calendar-footer .confirm{
  color:#615858;
}
.datepicker-wrap ::v-deep .vhd-calendar-footer .confirm:hover{
  color:#aca9a9;
}
</style>
