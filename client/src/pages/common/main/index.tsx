import About from "./components/about";
import Faq from "./components/faq";
import Home from "./components/home";
import Reviews from "./components/reviews";
import Support from "./components/support";
import Tools from "./components/tools";
import Video from "./components/video";
import styles from "./index.module.scss";

export function MainPage() {
    return (
        <div className={styles.container}>
            <Home />
            <Video />
            <Tools />
            <About />
            <Reviews />
            <Support />
            <Faq />
        </div>
    );
}
