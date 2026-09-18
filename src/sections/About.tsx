import AnimatedText from '../components/AnimatedText'
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle'

const ABOUT_BODY =
  'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.'

export default function About() {
  return (
    <section id="about" className="bg-black px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl bg-[#101010] px-6 py-20 text-center sm:px-10 sm:py-24 md:px-16 md:py-32 lg:py-40">
        <p className="mb-6 text-[10px] text-primary sm:mb-8 sm:text-xs">Visual arts</p>

        <WordsPullUpMultiStyle
          className="mx-auto max-w-3xl text-3xl leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
          segments={[
            { text: 'I am Marcus Chen,', className: 'font-normal' },
            {
              text: 'a self-taught director.',
              className: 'font-serif italic',
            },
            {
              text: 'I have skills in color grading, visual effects, and narrative design.',
              className: 'font-normal',
            },
          ]}
        />

        <AnimatedText
          text={ABOUT_BODY}
          className="mx-auto mt-10 max-w-xl text-xs text-[#DEDBC8] sm:mt-14 sm:text-sm md:mt-16 md:text-base"
        />
      </div>
    </section>
  )
}
