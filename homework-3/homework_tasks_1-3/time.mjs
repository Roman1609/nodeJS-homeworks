class Time {
    static getSeason() {
        const date = new Date();
        const month = date.getMonth();
        let season;
        if (month >= 2 && month <= 4) {
            return (season = String('Весна')); 
        } else if (month >= 5 && month <= 7) {
            return (season = String('Літо')); 
        } else if (month >= 8 && month <= 10) {
            return (season = String('Осінь')); 
        } else {
            return (season = String('Зима')); 
        }
    }
    static getDay() {
        const date = new Date();
        const day = date.getDay();
        let dayName;
        switch (day) {
            case 0:
                return dayName = 'Неділя';
            case 1:
                return dayName = 'Понеділок';
            case 2:
                return dayName = 'Вівторок';
            case 3:
                return dayName = 'Середа';
            case 4:
                return dayName = 'Четвер';
            case 5:
                return dayName = "П'ятниця";
            case 6:
                return dayName = "Субота";
            default: 
                return "no data";
        }
    }
    static getTime() {
        const date = new Date();
        const hours = date.getHours();
        let newTime;
        if (hours >= 6 && hours < 12) {
            return newTime = 'Ранок';
        } else if (hours >= 12 && hours < 18) {
            return newTime =  'Обід';
        } else if (hours >= 18 && hours < 24) {
            return newTime =  'Вечір';
        } else {
            return newTime =  'Ніч';
        }
    }
}

export default Time;