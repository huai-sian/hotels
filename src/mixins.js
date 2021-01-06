const Mixins = {
  data() {
    return {
      maxDate: this.addDate(new Date(), 90),
      // 限制預定幾天內的房間，例:90天內
      workingDay: 0,
      holiday: 0,
      booking: {
        start: '',
        end: '',
        date: [],
      },
    };
  },
  computed: {
    totalprice() {
      return this.singleRoom
        ? this.singleRoom.holidayPrice * this.holiday + this.singleRoom.normalDayPrice
        * this.workingDay + this.serviceFee : 0;
    },
  },
  methods: {
    addDate(date, days) {
      const daylen = days || 0;
      const newDate = new Date(Number(date));// 當天的選日期時間
      newDate.setDate(date.getDate() + daylen);// 先取得日期，再加上限制天數，再調整日期
      return newDate;
    },
    resetDate() {
      this.booking.start = '';
      this.booking.end = '';
    },
    updateDate(date) {
      this.booking.start = new Date(date.start);
      // 點選calender插件的confirm，會將起始日傳進來date:{start:..., end:...}
      this.booking.end = new Date(date.end);// 將其傳入booking中填入start/end
      this.countDate();// 再計算起始及結束的日數，再將一個個日期加入date[]，及計算工作日及假日
    },
    countDate(start, end) {
      this.booking.date = [];
      let workingDay = 0;
      let holiday = 0;
      const from = start ? new Date(start) : this.booking.start;
      const to = end ? new Date(end) : this.booking.end;
      while (from < to) { // 將日期一個個累加
        const day = from.getDay();
        if ((day === 0) || (day === 6)) {
          holiday += 1;
        } else {
          workingDay += 1;
        }
        if (!start && !end) {
          this.booking.date.push(this.dateFormat(from)); // 一個個調整成api日期格式，加入陣列中
        }
        from.setDate(from.getDate() + 1);// 將起訖日加1
      }
      this.workingDay = workingDay;
      this.holiday = holiday;
    },
    dateFormat(date) {
      const year = date.getFullYear().toString();// 日期方法的回傳結果是number
      let month = (date.getMonth() + 1).toString();
      let day = date.getDate().toString();
      month = month.length === 1 ? `0${month}` : month;
      day = day.length === 1 ? `0${day}` : day;
      return `${year}-${month}-${day}`;
    },
  },
};

export default Mixins;
