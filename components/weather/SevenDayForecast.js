import DayTemp from "../ui/DayTemp";

export default function SevenDayForecast() {
    return (
        <div className="border flex px-2">
            <DayTemp day="today" temprature={24} />
            <DayTemp day="today" temprature={24} />
        </div>
    );
}
