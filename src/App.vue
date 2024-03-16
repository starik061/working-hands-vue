<template>
  <h1 class="visually-hidden">Calendar</h1>
  <p class="info-text">*Для упрощения себе работы в данном тестовом задании не выполнял микрозадачу по соответствия
    номеров дней дням
    недели.</p>
  <div class="lang-container">
    <label class="lang-select-text" for="languages">Choose a language:</label>

    <select name="languages" id="languages" @change="changeLanguage">
      <option value="ru" selected>Русский</option>
      <option value="en">English</option>
    </select>
  </div>
  <div class="main-wrapper">
    <div class="calendar-wrapper">
      <div class="month-container">
        <div class="change-month-arrow" @click="handlePrevMonthClick">
          <NextArrowIcon class="change-month-arrow--icon reversed-next-icon" />
        </div>
        <span>{{ currentMonth }}</span>
        <div class="change-month-arrow" @click="handleNextMonthClick">
          <NextArrowIcon class="change-month-arrow--icon" />
        </div>
      </div>

      <div class="week-container">
        <span class="week-and-day-size week" v-for="(weekDay, weekDayIdx) in weekData" :key="weekDayIdx">{{
      weekDay[lang] }}</span>
      </div>

      <div class="days-container">
        <span class="week-and-day-size" :class="{ 'active-day': dayNumber === activeDay }"
          v-for="dayNumber in monthData[activeMonth]['days']" :key="dayNumber" @click="handleDayClick">{{
      dayNumber }}</span>
      </div>
    </div>
    <form @submit.prevent="handleDateChange">
      <div class="input-wrapper">
        <input class="date-input" type="text" :value="activeFullDate">
        <span class="help-text">образец формата даты: 2024-Янв-11 </span>
      </div>
    </form>
  </div>
</template>

<script>
import NextArrowIcon from "@/components/icons/NextArrowIcon.vue";
import monthData from "/public/month_data.json";
import weekData from "/public/week_data.json";

export default {
  components: {
    NextArrowIcon
  },
  data() {
    return {
      lang: "ru",
      weekData: weekData,
      monthData: monthData,
      activeMonth: 0,
      currentMonth: null,
      activeDay: null,
    };
  },
  computed: {
    activeFullDate() {
      if (this.currentMonth && this.activeDay) {


        const [month, year] = this.currentMonth.split(" ");


        const dayFormatted = this.activeDay < 10 ? `0${this.activeDay}` : this.activeDay;

        return `${year}-${month}-${dayFormatted}`;
      }
      return "not choosen";
    }
  },
  methods: {
    getCurrentMonth() {
      const months = monthData.map((obj) => {
        return obj.language[this.lang]
      });

      const currentDate = new Date();
      const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();

      this.currentMonth = `${month} ${year}`;
      this.activeMonth = currentDate.getMonth();
    },

    getActiveDay() {
      const today = new Date();
      this.activeDay = today.getDate();
    },

    changeLanguage(ev) {
      const currentMonth = this.currentMonth.split(" ")[0];
      let currentYear = this.currentMonth.split(" ")[1];

      let monthIndex = monthData.findIndex((el) => {
        return el.language[this.lang] === currentMonth
      });

      this.lang = ev.target.value;

      this.currentMonth = `${monthData[monthIndex]["language"][this.lang]} ${currentYear}`;
    },

    handlePrevMonthClick() {
      const currentMonth = this.currentMonth.split(" ")[0];
      let currentYear = this.currentMonth.split(" ")[1];

      let prevMonthIndex = monthData.findIndex((el) => {
        return el.language[this.lang] === currentMonth
      }) - 1;

      if (prevMonthIndex === -1) {
        prevMonthIndex = 11;
        currentYear = Number(currentYear) - 1;
      }

      this.currentMonth = `${monthData[prevMonthIndex]["language"][this.lang]} ${currentYear}`;
      this.activeMonth = prevMonthIndex;
      this.activeDay = null;
    },
    handleNextMonthClick() {
      const currentMonth = this.currentMonth.split(" ")[0];
      let currentYear = this.currentMonth.split(" ")[1];

      let nextMonthIndex = monthData.findIndex((el) => {
        return el.language[this.lang] === currentMonth
      }) + 1;

      if (nextMonthIndex === 12) {
        nextMonthIndex = 0;
        currentYear = Number(currentYear) + 1;
      }

      this.currentMonth = `${monthData[nextMonthIndex]["language"][this.lang]} ${currentYear}`;
      this.activeDay = null;
      this.activeMonth = nextMonthIndex;
    },

    handleDayClick(ev) {
      this.activeDay = Number(ev.target.
        innerText);
    },

    handleDateChange(ev) {
      const dateArray = ev.target[0].value.split('-');

      this.currentMonth = `${dateArray[1]} ${dateArray[0]}`;;
      this.activeDay = Number(dateArray[2]);

    }
  },
  mounted() {
    this.getCurrentMonth();
    this.getActiveDay();
  }
};
</script>

<style lang="scss" scoped>
.info-text {
  text-align: center;
  font-size: 10px;
  color: rgb(0, 190, 44);
}

.lang-container {
  display: flex;
  align-items: center;
}

.lang-select-text {
  flex-grow: 1;
  text-align: end;
  margin-right: 4px;
}

.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: nowrap;
}

.change-month-arrow {
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
  fill: #000000;

  &:hover {
    cursor: pointer;
    outline: 1px solid rgb(115, 188, 233);
    fill: rgb(115, 188, 233)
  }
}

.change-month-arrow--icon {
  margin-left: 11px;
}

.month-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 5px;
  font-size: 16px;
}

.reversed-next-icon {
  transform: scaleX(-1);
  margin-left: 9px;
}

.week-container {
  display: flex;
  width: 210px;
  flex-wrap: wrap;
  font-size: 12px;
}

.days-container {
  display: flex;
  width: 210px;
  flex-wrap: wrap;
}

.week-and-day-size {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;

  &:hover {
    cursor: pointer;
    outline: 1px solid rgb(115, 188, 233);
  }

  &.week {
    pointer-events: none;
    outline: none;
    user-select: none;
  }
}

.date-input {
  border: 1px solid rgb(192, 192, 192);
  border-radius: 2px;

  &:hover,
  &:active,
  &:focus {
    border: 1px solid rgb(115, 188, 233);
    outline: none;
  }
}

.active-day {
  background-color: rgb(115, 188, 233);
}

.input-wrapper {
  position: relative;
}

.help-text {
  position: absolute;
  top: 20px;
  left: 0;
  color: red;
  font-size: 9px;
}
</style>
проверяющий человек