import Header from "../components/layout/Header";
import MainSection from "../components/layout/MainSection";

export default function Home() {
    return (
        <div className="flex flex-col border h-full">
            <Header />
            <MainSection />
        </div>
    );
}
