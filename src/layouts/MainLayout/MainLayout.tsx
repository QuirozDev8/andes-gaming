import type { ReactNode } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./MainLayout.module.css";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layout}>
        <Header />

        <main className={styles.main}> 
          {children}  
        </main>

        <Footer />
    </div>
  );
}

export default MainLayout;
