import NekosBest from '../components/NekosBest';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex  items-center justify-between p-1">
        <NekosBest />
      </main>
    </>
  );
}
