export default function DatTemp({ day, temprature }) {
    return (
        <span className="flex px-1 m-1 border rounded-md">
            <div>{day}</div>
            <div>{temprature}</div>
        </span>
    );
}
