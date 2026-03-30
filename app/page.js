import Header from "../components/layout/Header";
import MainSection from "../components/layout/MainSection";

export default function Home() {
    return (
        <div className="flex flex-col min-h-full lg:h-full shadow-2xl bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl lg:rounded-[2.5rem] lg:overflow-hidden relative">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
            <Header />
            <MainSection />
        </div>
    );
}
