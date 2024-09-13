import Layout from '../components/Layout';
import useCrawler from '../hooks/useCrawler';

function Home() {
  const { Crawler } = useCrawler();
  return (
    <Layout className="home-container">
      <Crawler />
    </Layout>
  );
}

export default Home;
