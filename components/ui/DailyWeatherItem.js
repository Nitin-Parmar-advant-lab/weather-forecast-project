export default function DailyWeatherItem({ day, temperature }) {
    return (
        <span className="flex px-3 m-1.5 cursor-pointer border rounded-md" >
            <div>{day},</div>
            <div>{temperature}°</div>
        </span>
    );
}
