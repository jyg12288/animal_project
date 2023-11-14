import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  const [activeNav, setActiveNav] = useState(1);
  console.log('네비게이션');

  return (
    <div className={styles.main}>
      <nav className={styles.nav_container}>
        <div className={styles.home_container}>
          <Link
            to="/"
            className={styles.nav_link}
            onClick={() => setActiveNav(1)}
          >
            {activeNav === 1 ? (
              <div className={styles.nav_item_selected}>
                <div className={styles.img_container}>
                  <img src="/assets/navigation/선택 한 홈.png" alt="/" />
                </div>
                <span>홈</span>
              </div>
            ) : (
              <div className={styles.nav_item}>
                <div className={styles.img_container}>
                  <img src="/assets/navigation/선택 안한 홈.png" alt="/" />
                </div>
                <span>홈</span>
              </div>
            )}
          </Link>
        </div>
        <div className={styles.care_container}>
          <Link
            to="/walk"
            className={styles.nav_link}
            onClick={() => setActiveNav(2)}
          >
            {activeNav === 2 ? (
              <div className={styles.nav_item_selected}>
                <div className={styles.img_container}>
                  <img src="/assets/navigation/선택한 케어.png" alt="/" />
                </div>
                <span>케어</span>
              </div>
            ) : (
              <div className={styles.nav_item}>
                <div className={styles.img_container}>
                  <img src="/assets/navigation/선택 안한 케어.png" alt="/" />
                </div>
                <span>케어</span>
              </div>
            )}
          </Link>
        </div>
        <div className={styles.community_container}>
          <Link
            to="/community"
            className={styles.nav_link}
            onClick={() => setActiveNav(3)}
          >
            {activeNav === 3 ? (
              <div className={styles.nav_item_selected}>
                <div className={styles.img_container}>
                  <img src="/assets/navigation/선택한 커뮤니티.png" alt="/" />
                </div>
                <span>커뮤니티</span>
              </div>
            ) : (
              <div className={styles.nav_item}>
                <div className={styles.img_container}>
                  <img
                    src="/assets/navigation/선택 안한 커뮤니티.png"
                    alt="/"
                  />
                </div>
                <span>커뮤니티</span>
              </div>
            )}
          </Link>
        </div>
        <div className={styles.mypage_container}>
          <Link
            to="/mypage"
            className={styles.nav_link}
            onClick={() => setActiveNav(4)}
          >
            {activeNav === 4 ? (
              <div className={styles.nav_item_selected}>
                <div className={styles.img_container}>
                  <img
                    src="/assets/navigation/선택 한 마이페이지.png"
                    alt="/"
                  />
                </div>
                <span>마이페이지</span>
              </div>
            ) : (
              <div className={styles.nav_item}>
                <div className={styles.img_container}>
                  <img
                    src="/assets/navigation/선택 안한 마이페이지.png"
                    alt="/"
                  />
                </div>
                <span>마이페이지</span>
              </div>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
