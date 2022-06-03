import HomeStyle from "../styles/Home.module.css";
import { Button } from "@nextui-org/react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <main className={HomeStyle.container}>
    <Layout>
        <section className={HomeStyle.heroSection}>
          <div className={HomeStyle.heroSectionText}>
            <h3>
              A program that allows you to mix an image and an audio
              file into a one minute video file that you can download and share with your
              friends.
            </h3>
            <Link href="/Blendpage">
            <Button
              className={HomeStyle.homeBtn}
              color="secondary"
              shadow
              size="md"
              style={{
                fontWeight: "bolder",
                fontFamily: "Roboto Slab",
                letterSpacing: "3px",
              }}
              css={{fontFamily: "Roboto Slab", fontSize: "1.2rem", py: "$10"}}
              auto
            >
              Get Started <HiArrowNarrowRight className={HomeStyle.rightArrow} />
            </Button>
            </Link>
          </div>

          <div className={HomeStyle.hideMobile}></div>
        </section>
    </Layout>
    </main>
  );
};

export default Home;
