import CFTaggle from "../weather/CFTaggle";
import CurruntLocation from "../weather/CurruntLocation";
import Search from "../weather/Search";

export default function Header() {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-2 px-4 sm:px-8 mx-4 sm:mx-8 mt-4 sm:mt-8 bg-black/10 backdrop-blur-xl border border-white/5 rounded-2xl gap-4 sm:gap-0">
            <div className="flex flex-row items-center justify-between gap-6 w-full sm:w-auto">
                <h1 className="text-xl font-black text-white leading-none tracking-tight">Weather forecast</h1>
                <CFTaggle />
            </div>
            <div className="flex flex-row items-center justify-between gap-6 w-full sm:w-auto">
                <CurruntLocation />
                <Search />
            </div>
        </header>
    );
}
