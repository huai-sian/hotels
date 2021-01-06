<template>
  <div>
    <section class='container room-intro animate_fade'>
      <div class="room-top">
        <h2 class='room-intro_title'>{{title}}</h2>
        <div class="room-intro_con">{{sub}}</div>
      </div>
      <div class="room_li" v-if='rooms'>
        <ul class='rec_ul'>
          <li class="rec_li" v-for="item in rooms" :key='item.id'>
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
</template>
<script>
export default {
  name: 'Roomintro',
  props: {
    rooms: Array,
    title: String,
    sub: String,
  },
  methods: {
    godetail(roomid) {
      this.$router.push({ name: 'Room', params: { id: roomid } });
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const items = document.querySelectorAll('.animate_fade');
      items.forEach((item) => {
        const scrollPos = window.innerHeight + window.scrollY;
        if (scrollPos >= item.offsetTop) {
          item.classList.add('fade_up');
        }
      });
    });
  },
};
</script>
<style lang="scss" scoped>
  .room-intro{
    height:300px;
    margin-bottom: 6rem;
    position:relative;
    display:flex;
    align-items: center;
    flex-direction: row;
    @media screen and (max-width: 820px){
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height:auto;
      margin-bottom:2rem;
    }
    .room-top{
      width:30%;
      @media screen and (max-width: 820px){
      width:95%;
    }
    }
    .room_li{
      width:70%;
      @media screen and (max-width: 820px){
      width:95%;
    }
    }
  }
  .room-intro_title{
    color:#748290;
    font-size: 30px;
    font-weight:600;
    margin-top:0.5rem;
  }
  .room-intro_con{
    color:#748290;
  }
  .rec_ul{
      display: flex;
      flex-direction: row;
      @media screen and (max-width: 820px){
        flex-direction: column;
        justify-content: center;
        }
      .rec_li{
        width:46%;
        margin:2.5%;
        max-width: 350px;
        @media screen and (max-width: 992px){
          width:43%;
          margin:1%;
        }
        @media screen and (max-width: 820px){
          width: 95%;
          margin:2.5%;
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
  .animate_fade{
    opacity: 0;
    transform: translateY(30%);
    transition: all 1.2s;
  }
  .fade_up{
    transform: translateY(0%);
    opacity: 1;
  }
</style>
