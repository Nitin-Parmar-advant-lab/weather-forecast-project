import Header from "../components/layout/Header";
import MainSection from "../components/layout/MainSection";

export default function Home() {
    return (
        <div className="flex flex-col h-full shadow-lg bg-zinc-300 rounded-2xl lg:overflow-hidden">
            <Header />
            <MainSection />
        </div>
    );
}
