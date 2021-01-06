<template>
  <div>
    <Navbar currPage='reservation'/>
    <div class='container'>
      <div class='row'>
        <div class='col-6 form'>
          <h1>Reservation Information</h1>
          <label>
            <div><i class="fas fa-user"></i>Name</div>
            <input type="text" placeholder="Fill your name" v-model.trim="name">
          </label>
          <label>
            <div><i class="fas fa-mobile-alt"></i>Phone</div>
            <input type="text" placeholder="Fill your phone number" v-model.trim="phone">
          </label>
          <div :class="{'disabled' : (name === '' || phone === '')}"
           class='reserve_btn' @click.prevent='bookRoom'>RESERVE NOW</div>
        </div>
        <div class="col-6 info">
          <img :src="singleRoom.imageUrl[0]" :alt="singleRoom.name">
          <div class='room_name'>{{singleRoom.name}}</div>
          <div>
            <i class="fas fa-calendar-check"></i>
            <em>Check-In</em>
            <span class='date'>{{reserveFrom}}</span>
          </div>
          <div>
            <i class="fas fa-calendar-check"></i>
            <em>Check-Out</em>
            <span class='date'>{{reserveTo}}</span>
          </div>
          <div>
            <div class='booking-subtotal'>
              <ul>
                <li class="workingDay">
                  <span> {{singleRoom.normalDayPrice | currency}} X {{workingDay}}
                    night (Weekdays)</span>
                  <span class="subtotal">
                     {{singleRoom.normalDayPrice * workingDay | currency}}</span>
                </li>
                <li class="holiday">
                  <span> {{singleRoom.holidayPrice | currency}} X {{holiday}}
                  night (Holidays)</span>
                  <span class="subtotal"> {{singleRoom.holidayPrice * holiday | currency}}</span>
                </li>
                <li class="service_fee">
                  <span>Service Fee</span>
                  <span class="subtotal"> {{serviceFee | currency}}</span>
                </li>
              </ul>
              <div class='total_price'>
                <span>TOTAL</span>
                <span class='item'> {{totalprice | currency}}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '../mixins';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Reservation',
  mixins: [mixins],
  components: {
    Navbar,
  },
  data() {
    return {
      name: '',
      phone: '',
      roomid: this.$route.params.id,
    };
  },
  computed: {
    serviceFee() {
      return this.$store.state.serviceFee;
    },
    singleRoom() {
      return this.$store.state.singleroominfo;
    },
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
  methods: {
    bookRoom() {
      console.log('bookRoom!');
      this.$store.dispatch('roomBooking', {
        roomName: this.singleRoom.name,
        roomId: this.roomid,
        name: this.name,
        tel: this.phone,
        date: this.reservations.date,
      })
        .then(() => {
          this.$router.push({ name: 'Thanks' });
        });
    },
  },
  created() {
    this.$store.dispatch('isLoading', true);
    this.$store.dispatch('getSingleroom', this.roomid)
      .then(() => {
        this.countDate(this.reserveFrom, this.reserveTo);
      });
    this.$store.dispatch('isLoading', false);
    console.log(this.workingDay);
    console.log(this.holiday);
    console.log(this.booking.date);
  },
};
</script>
<style lang="scss" scoped>
  .container{
    width:80%;
    margin:0 auto;
    padding-top:80px;
    margin-bottom: 3rem;
    @media screen and (max-width: 768px){
      width:95%;
    }
    .row{
      height:auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      @media screen and (max-width: 576px){
        flex-direction: column;
      }
    .col-6{
      width:50%;
      @media screen and (max-width: 820px){
        width:45%;
      }
      @media screen and (max-width: 576px){
        width: 90%;
        margin: 0 auto;
      }
      h1{
        margin-bottom: 40px;
        font-size:2.3rem;
        font-weight: 800;
        color:#2D3643;
        line-height: 2rem;
      }
      label{
        display: block;
        margin-bottom:40px;
        position: relative;
        div{
          margin-bottom:1.5rem;
          i{
            margin-right: 5px;
            display:inline-block;
            width:12px;
            height:12px;
          }
        }
        input{
          display: block;
          width: 90%;
          line-height: 1.5rem;
          font-size: 1rem;
          border: none;
          border-bottom: 1px solid #748290;
          outline: none;
          @media screen and (max-width: 576px){
            width: 100%;
          }
          &:focus{
            border-bottom: 1px solid #569DC3;
            color:#569DC3;
            & + label{
              color:#569DC3;
            }
          }
        }
      }
      .reserve_btn{
        width:90%;
        height: 60px;
        line-height: 60px;
        background-color: #4e9dc7;
        color: #fff;
        font-size: 1.2rem;
        text-align: center;
        cursor: pointer;
        @media screen and (max-width: 576px){
          width: 100%;
        }
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
    .info{
      border: 1px solid #2D3643;
      width:42%;
      margin-left:8%;
      @media screen and (max-width: 820px){
        width:50%;
        margin-left:5%;
      }
      @media screen and (max-width: 576px){
        width: 100%;
        margin-left:0;
        margin-top:3rem;
      }
      div{
        border-bottom: 1px solid #2D3643;
        padding:1rem;
        position: relative;
        &:last-of-type{
          border-bottom:none;
        }
        i{
          margin-right: 3px;
        }
        .date{
          color: #2D3643;
          position: absolute;
          right: 1.5rem;
          font-size: 13px;
        }
      }
      img{
        border-bottom: 1px solid #2D3643;
        width: 100%;
        height:210px;
        object-fit: cover;
      }
      .room_name{
        font-weight: 600;
      }
      .booking-subtotal{
        li{
          text-align: left;
          font-size:14px;
          margin:1rem 0;
          color:#748290;
          display: block;
          position:relative;
          .subtotal{
            position: absolute;
            right:0rem;
            top:0;
          }
        }
        .total_price{
          border-top:1px solid rgb(218, 216, 216);
          padding:0;
          padding-top:1rem;
          position: relative;
          .item{
            position:absolute;
            right:0;
            font-weight: 800;
          }
        }
      }
    }
  }
  }
</style>
