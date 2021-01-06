<template>
  <div>
    <Navbar currPage="Home" />
    <!-- 傳入當前頁面資訊給navabr元件 -->
    <div class='container'>
      <div class='banner'>
        <h1>HOTEL</h1>
      </div>
      <section class='recommends'>
        <div class="recommend_top">
          <h2 class='rec_title'>Recommend</h2>
          <div class='rec_con'>You may be interested in our popular rooms</div>
        </div>
        <div class='rec_list animate_fade' v-if='recommends'>
          <ul class='rec_ul'>
            <li class="rec_li" v-for="item in recommends" :key="item.id">
              <a href="#" class="rec_link" @click.prevent='godetail(item.id)'>
                <div class="rec_img"><img :src="item.imageUrl" :alt="item.name"></div>
                <h3 class='rec_h3'>{{item.name}}</h3>
                <div class="rec_price">{{item.normalDayPrice | currency}} NTD / night</div>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <section class='container-fluid scroll-img'>
      <div class='scroll'>
        <h3 class='scroll_title'>Reserve the best service</h3>
        <div class='scroll_con'>over 50,000 commendations from our guests</div>
      </div>
    </section>
    <div class='container_b'>
      <Roomintro title="One person" sub="Enjoy the one and only service" :rooms='single' />
      <Roomintro title="Two people" sub="The perfect choice for both of you" :rooms='double' />
      <Roomintro title="Family" sub="Wanna a big room? there you are" :rooms='twin' />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import mixins from '@/mixins';
import Navbar from '../components/Navbar.vue';
import Roomintro from '../components/Roomintro.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    Roomintro,
  },
  mixins: [mixins],
  methods: {
    godetail(roomid) {
      // this.$router.push(`/room/${roomid}`);
      this.$router.push({ name: 'Room', params: { id: roomid } });
    },
    scrolling() {
      const item = document.querySelector('.rec_list');
      const scrollPos = window.innerHeight + window.scrollY;
      if (scrollPos >= item.offsetTop) {
        item.classList.add('fade_up');
      }
    },
  },
  computed: {
    rooms() {
      return this.$store.state.rooms;// 從store取出的全部rooms資料，
    },
    singleRoom() {
      return this.$store.state.singleroominfo;
    },
    recommends() {
      const rooms = [...this.rooms];// 將computed中的rooms進行複製，以免影響原本的rooms
      return rooms.sort(() => Math.random() - 0.5).splice(0, 3);
    },
    single() {
      return this.rooms.filter((item) => item.name.indexOf('Single Room') > -1); // 檢查篩出房間名稱為單人房的
    },
    double() {
      return this.rooms.filter((item) => item.name.indexOf('Double Room') > -1);
    },
    twin() {
      return this.rooms.filter((item) => item.name.indexOf('Twin Room') > -1);
    },
  },
  created() {
    const vm = this;
    this.$store.dispatch('isLoading', true);
    this.$store.dispatch('getAllrooms');
    setTimeout(() => {
      vm.$store.dispatch('isLoading', false);
    }, 1500);
  },
  mounted() {
    window.addEventListener('scroll', this.scrolling);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrolling);
  },
};
</script>
<style lang="scss" scoped>
.container{
  width:85%;
  margin:0 auto;
  padding-top:80px;
  @media screen and (max-width: 992px){
    width:95%;
  }
}
.container_b{
  width:85%;
  margin:0 auto;
  height:auto;
}
.banner{
  height:352px;
  background: transparent url('../assets/andrej-lisakov-7G8ARu_DJTc-unsplash.jpg');
  background-size: cover;
  position: relative;
  h1{
    position: absolute;
    top: 0;
    left: 0;
    width:57px;
    height: 180px;
    writing-mode: vertical-lr;
    font-size:48px;
    font-family: Helvetica;
    font-style: italic;
    font-weight:800;
    color: #2d3643;
    background-color: white;
  }
}
.container-fluid{
  width:100%;
}
.scroll-img{
  position: relative;
  height:352px;
  background: transparent url('../assets/andrej-lisakov-7G8ARu_DJTc-unsplash.jpg');
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  margin-bottom: 2rem;
  .scroll{
    position: absolute;
    right:1.5rem;
    top:249px;
    color:white;
    text-shadow:1px 1px black;
    .scroll_title{
      font-size: 36px;
      font-weight: 700;
    }
    .scroll_con{
      font-size:16px;
      text-align: right;

    }
  }
}
.recommends{
  margin:2rem 0;
  .recommend_top{
    margin-bottom:1.5rem;
    color: #748290;
    .rec_title{
      font-size: 36px;
      font-weight: 600;
    }
    .rec_con{
      font-size: 16px;
    }
  }
  .rec_list{
      width:95%;
      margin:1rem auto;
      @media screen and (max-width: 820px){
          margin-top:0;
          margin:0 auto;
        }
    .rec_ul{
      display: flex;
      flex-direction: row;
      @media screen and (max-width: 820px){
        flex-direction: column;
        justify-content: center;
        }
      .rec_li{
        width:30%;
        margin:2.5%;
        max-width: 350px;
        @media screen and (max-width: 992px){
          width:32%;
          margin:1%;
        }
        @media screen and (max-width: 820px){
          width: 95%;
          margin:2.5% 0;
          margin: 1.5rem auto;
        }
        .rec_link{
          display: block;
          text-decoration: none;
          .rec_img{
            width:100%;
            height:300px;
            background-position: center bottom;
            background-size: cover;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .rec_h3{
            font-size:1.5rem;
            font-weight: 500;
            line-height: 1.8rem;
            color: #748290;
            text-align: right;
          }
          .rec_price{
            color: #748290;
            text-align: right;
          }
        }
      }
    }
    }
    .animate_fade{
      opacity: 0;
      transform: translateY(-30%);
      transition: all 1.2s;
    }
    .fade_up{
      transform: translateY(0%);
      opacity: 1;
    }
}
.datepicker-wrap ::v-deep .vhd-container {
  background-color: white;
  width: 350px;
  cursor: pointer;
  border-bottom: 1px solid #2d3643;
}
.datepicker-wrap ::v-deep .vhd-input {
  position: relative;
  left: 45px;
  border: none;
  cursor: pointer;
  width: 300px;
  min-width: 300px;
}
.datepicker-wrap ::v-deep .vhd-container.mobile .vhd-picker{
  width: 350px;
  border-radius: 0;
}
.datepicker-wrap ::v-deep .vhd-container.mobile .vhd-picker .info{
  text-indent: 1.5rem;
}
.datepicker-wrap ::v-deep .vhd-calendar .calendar-month{
  top: -10px;
}
.datepicker-wrap ::v-deep .vhd-calendar-footer {
  top: 10px;
}
.datepicker-wrap ::v-deep .vhd-calendar-footer .confirm{
  color:#615858;
}
.datepicker-wrap ::v-deep .vhd-calendar-footer .confirm:hover{
  color:#aca9a9;
}
</style>
