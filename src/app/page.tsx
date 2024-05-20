import { HomeModule } from '@/containers/modules';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeModule />
    </main>
  );
}
