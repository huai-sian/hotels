import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer xNygtU8g13IhFTs0nrMxqVbLCX2NWzLER3mWbTTx1HZG32hEnLoOuga0s2XK',
};

const SERVICE_FEE = 1200;
export default new Vuex.Store({
  state: {
    serviceFee: SERVICE_FEE,
    isLoading: false,
    rooms: [],
    // 單間資料
    singleroominfo: {
      disabledDate: [],
    },
    reservation: {
      roomName: '',
      roomId: '',
      name: '',
      tel: '',
      date: [],
    },
  },
  mutations: {
    ALLROOMS(state, val) {
      state.rooms = val;
    },
    SINGLEROOM(state, val) {
      state.singleroominfo = val;
    },
    // 接收傳入的資料，roomName是為畫面顯示
    SETRESERVATION(state, val) {
      if (val.roomName) { state.reservation.roomName = val.roomName; }
      if (val.roomId) { state.reservation.roomId = val.roomId; }
      if (val.name) { state.reservation.name = val.name; }
      if (val.tel) { state.reservation.tel = val.tel; }
      if (val.date) { state.reservation.date = val.date; }
    },
    ISLOADING(state, val) {
      state.isLoading = val;
    },
  },
  actions: {
    getAllrooms(context) {
      axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', { headers })
        .then((response) => {
          if (response.data.success) {
            context.commit('ALLROOMS', response.data.items);
            console.log(response.data);
          } else {
            console.log(response.data.message);
          }
        });
      /* const xhr = new XMLHttpRequest();
      xhr.open('get', 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Authorization',
       'Bearer 3oEl3P7cj0TenuUy2nuIUCPgVdEd1jTpCWLSJ1RcN2fJy5DoBHSP8MYh5MHL');
      xhr.send();
      xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        context.commit('ALLROOMS', data.items);
      }; */
    },
    getSingleroom(context, val) { // 取得單一房間資訊，val傳進來的是roomid（點擊房間連結即會帶著房間id為參數轉換到單一房間資訊）
      axios.get(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${val}`, { headers }).then((response) => {
        if (response.data.success) {
          const room = response.data.room[0];
          if (response.data.booking.length > 0) {
            room.disabledDates = response.data.booking.map((item) => item.date);
          }
          context.commit('SINGLEROOM', room);
          console.log(response.data);
          // 若有預定紀錄則將其日期取出（api日期格式date:["2020-12-01", "2020-12-02"]）
        }
      });
      /* const xhr = new XMLHttpRequest();
      xhr.open('get', `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${val}`);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Authorization',
       'Bearer 3oEl3P7cj0TenuUy2nuIUCPgVdEd1jTpCWLSJ1RcN2fJy5DoBHSP8MYh5MHL');
      xhr.send();
      xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        const room = data.room[0];
        if (data.booking.length > 0) {
          room.disabledDates = data.booking.map((item) => item.date);
          context.commit('SINGLEROOM', room);
        }
      }; */
    },
    // 負責將訂購資料傳給後端，於預定頁填寫完資料觸發，由於後端需要名字、電話、roomid、日期
    roomBooking(context, val) {
      axios.request({
        url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${val.roomId}`,
        method: 'post',
        headers,
        data: {
          name: val.name,
          tel: val.tel,
          date: val.date,
        },
      })
        .then((res) => {
          if (res.data.success) {
            context.commit('SETRESERVATION', val);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data.message);
          }
        });
      console.log('roombooking');
    },
    // 負責傳送房間及日期，於個別房型選取日期後觸發
    setReservation(context, obj) {
      context.commit('SETRESERVATION', obj);
    },
    isLoading(context, payload) {
      context.commit('ISLOADING', payload);
    },
  },
});
