import Layout from '../components/Layout';
import useCrawler from '../hooks/useCrawler';

function About() {
  const { Crawler } = useCrawler();

  return (
    <Layout className="about-container">
      <Crawler />
    </Layout>
  );
}

export default About;
