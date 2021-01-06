<template>
  <div>
    <transition name='slide'>
      <div class='navbar' v-show='show'>
        <a href="#" class='navbar-brand' @click.prevent='backHome'>
          <i class="fab fa-houzz"></i>
        </a>
        <ul class='navbar-nav'>
          <li class='nav-item'>
            <a href="#" class='nav-link' @click.prevent='backHome'>
              <i class="fas fa-bed"></i>ROOMS</a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  props: {
    currPage: { // currPage的型別及預設值，將當前頁面的資訊傳入，作為navabr動畫呈現的依據，若是在首頁則則有滾動轉換效果，其他頁則是固定不動
      type: String,
      default: 'Home',
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showAndhide() {
      if (this.currPage === 'Home') {
        const navTop = 80;
        window.addEventListener('scroll', () => {
          if (window.pageYOffset > navTop) {
            this.show = true;
          } else {
            this.show = false;
          }
        });
      } else {
        this.show = true;
      }
    },
    backHome() {
      if (this.currPage !== 'Home') {
        this.$router.push({ name: 'Home' });
      }
    },
  },
  mounted() {
    this.showAndhide();
  },
};
</script>
<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active{
  transform: scaleY(1);
}
.slide-enter, .slide-leave-to{
  transform: scaleY(0);
}
.navbar{
  position:fixed;
  left: 0;
  top: 0;
  width:100%;
  background-color:white;
  box-shadow: 0 2px 7px #ccc;
  z-index: 50;
  transform-origin: top;
  transition: transform 0.8s ease;
}
.navbar-brand{
  float: left;
  padding:10px 20px;
  i{
    font-size:34px;
    color: black;
  }
}
.navbar-nav{
  float: right;
  padding-left:0;
  padding-right:25px;
  list-style: none;
  padding-top: 18px;
  padding-bottom: 10px;
  .nav-item>a{
    text-decoration: none;
    color: black;
    font-size: 1.3rem;
    font-weight: 500;
    i{
      margin-right:3px;
    }
    &:hover{
      color: rgb(150, 148, 148);
    }
  }
}
</style>
