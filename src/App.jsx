import Nav from './components/Nav'
import Hero from './components/Hero'
import PillarsMarquee from './components/PillarsMarquee'
import ClimateAction from './components/ClimateAction'
import FeatureCards from './components/FeatureCards'
import Principles from './components/Principles'
import DynamicShift from './components/DynamicShift'
import Explore from './components/Explore'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PillarsMarquee />
        <ClimateAction />
        <FeatureCards />
        <Principles />
        <DynamicShift />
        <Explore />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}

export default App
