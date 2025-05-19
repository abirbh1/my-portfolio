import { useRef } from "react";
import Head from "next/head";
import Link from "next/link";

import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Cursor from "../components/Cursor";

import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import { useRouter } from 'next/router';
const { basePath } = useRouter();

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  /* ──────────────────── refs ──────────────────── */
  const workRef  = useRef(null);
  const aboutRef = useRef(null);

  // Tagline element refs – needed for the stagger() call
  const textOne   = useRef(null);
  const textTwo   = useRef(null);
  const textThree = useRef(null);
  const textFour  = useRef(null);

  /* ──────────────────── handlers ──────────────────── */
  const handleWorkScroll = () =>
    window.scrollTo({ top: workRef.current?.offsetTop || 0, left: 0, behavior: "smooth" });

  const handleAboutScroll = () =>
    window.scrollTo({ top: aboutRef.current?.offsetTop || 0, left: 0, behavior: "smooth" });

  /* ──────────────────── animations ──────────────────── */
  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0,  x: 0,  transform: "scale(1)" }
    );
  }, []);

  /* ──────────────────── render ──────────────────── */
  return (
    
    <div className={`relative ${data.showCursor ? "cursor-none" : ""}`}>
      {data.showCursor && <Cursor />}

      <Head>
        <title>{data.name}</title>
        <meta name="description" content={`${data.name} – portfolio`} />
      </Head>

      {/* background decoration */}
      <div className="gradient-circle" />
      <div className="gradient-circle-bottom" />

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />


        {/* ───────────── Taglines ───────────── */}
        <div className="flex flex-col laptop:flex-row items-center laptop:items-start mt-10 mb-10">
          <div className="flex-shrink-0 mb-4 laptop:mb-0 laptop:mr-8">
            <img
              src={`${basePath}/images/profile.png`} 
              alt="Abir Bahri profile portrait"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
          </div>

          <div>
            <h1 ref={textOne}   className="text-3xl  font-bold      mb-2">{data.headerTaglineOne}</h1>
            <h2 ref={textTwo}   className="text-2xl  font-semibold  mb-1">{data.headerTaglineTwo}</h2>
            <h3 ref={textThree} className="text-xl   font-medium    mb-1">{data.headerTaglineThree}</h3>
            <p  ref={textFour}  className="text-lg                mb-1">{data.headerTaglineFour}</p>

            <p className="text-base mb-1">{data.headerTaglineFive}</p>
            <p className="text-base mb-1">{data.headerTaglineSix}</p>
            <p className="text-base mb-1">{data.headerTaglineSeven}</p>
            <p className="text-base text-gray-500">{data.headerTaglineEight}</p>
          </div>
        </div>

        <Socials className="mt-2 laptop:mt-5" />

        {/* ───────────── Work section ───────────── */}
        <section ref={workRef} className="mt-10 laptop:mt-32 p-2 laptop:p-0">
          <h1 className="text-2xl font-bold">Work.</h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url, "_blank")}
              />
            ))}
          </div>
        </section>

        {/* ───────────── Services section ───────────── */}
        <section className="mt-10 laptop:mt-32 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl font-bold">Services.</h1>

          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, idx) => (
              <ServiceCard
                key={idx}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </section>

        {/* edit-data shortcut – development only */}
        {/*
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit&nbsp;Data</Button>
            </Link>
          </div>
        )}
        */}

        {/* ───────────── About section ───────────── */}
        <section ref={aboutRef} className="mt-10 laptop:mt-40 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl font-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </section>

        <Footer />
      </div>
    </div>
  );
}