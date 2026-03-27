import CFTaggle from "../weather/CFTaggle";
import CurruntLocation from "../weather/CurruntLocation";
import Search from "../weather/Search";

export default function Header() {
    return (
        <header className="flex flex-row justify-between p-2 m-2 border">
            <div className="flex flex-row justify-between gap-2">
                <h1>Weather forcast</h1>
                <CFTaggle />
            </div>
            <div className="flex flex-row justify-between gap-2">
                <CurruntLocation />
                <Search />
            </div>
        </header>
    );
}
