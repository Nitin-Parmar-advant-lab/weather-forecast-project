import closeIcon from "@/public/svgs/close.svg";
import Image from "next/image";
import useFavoriteCities from "@/hooks/useFavoriteCities";

export default function FavoriteCities() {
    const {
        favorites,
        toggleFavorite,
        isAdding,
        setIsAdding,
        query,
        setQuery,
        error,
        handleAddCity,
        handleSelectCity,
    } = useFavoriteCities();

    return (
        <div className="p-4 sm:p-6 rounded-4xl border border-white/5 bg-black/20 backdrop-blur-3xl shadow-2xl flex flex-col transition-all duration-500">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <h3 className="font-black text-white/40 tracking-[0.2em] uppercase text-[10px] opacity-60">
                        Saved Locations
                    </h3>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
                >
                    <span className="text-white text-lg sm:text-xl font-thin">
                        {isAdding ? "−" : "+"}
                    </span>
                </button>
            </div>

            {isAdding && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type city and press Enter..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm shadow-inner"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleAddCity}
                    />
                </div>
            )}

            {error && (
                <p className="text-rose-400 text-[10px] mb-6 ml-1 font-black italic animate-in fade-in duration-500 tracking-wider">
                    {error}
                </p>
            )}

            <div className="flex flex-col gap-3 min-h-0 pr-1">
                {favorites.length === 0 ? (
                    <div className="flex-1 py-10 flex items-center justify-center text-white/20 text-xs font-black uppercase tracking-widest italic">
                        No saved locations
                    </div>
                ) : (
                    favorites.map((city) => (
                        <div
                            key={city.name}
                            onClick={() => handleSelectCity(city)}
                            className="flex justify-between items-center p-2 sm:p-2 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-500 cursor-pointer border border-white/5 hover:border-indigo-500/30 group relative overflow-hidden shadow-lg active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -z-10 group-hover:bg-indigo-500/10 transition-colors" />
                            <div className="flex flex-col z-10">
                                <span className="font-black text-xs sm:text-base text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                                    {city.name}
                                </span>
                                <span className="text-[9px] sm:text-[10px] text-white/30 font-black tracking-[0.2em] uppercase mt-1">
                                    {city.country || "Custom"}
                                </span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(city);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/20 rounded-xl transition-all duration-500 text-white/20 hover:text-rose-400 z-10 hover:rotate-90"
                                title="Remove location"
                            >
                                <Image
                                    src={closeIcon}
                                    alt="remove city"
                                    className="w-3.5 sm:w-4 invert opacity-50"
                                />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
