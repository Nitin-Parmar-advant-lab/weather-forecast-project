import CFTaggle from "../weather/CFTaggle";
import CurruntLocation from "../weather/CurruntLocation";
import Search from "../weather/Search";

export default function Header() {
    return (
        <header className="flex flex-row justify-between items-center p-2 px-6 mx-6 mt-6 bg-white/50 rounded-lg">
            <div className="flex flex-row items-center justify-between gap-4">
                <h1 className="text-xl font-bold text-zinc-900">Weather forcast</h1>
                <CFTaggle />
            </div>
            <div className="flex flex-row items-center justify-between gap-4">
                <CurruntLocation />
                <Search />
            </div>
        </header>
    );
}
