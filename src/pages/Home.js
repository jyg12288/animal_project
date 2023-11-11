import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [loginState, setLoginState] = useState(false);
  return (
    <div className="main">
      <header className={styles.header}>
        <h1 className={styles.header__logo}>
          <img src="/assets/로고.png" alt="logo" />
        </h1>
        <Link to="/hospital" className={styles.header__link}>
          <img src="/assets/home/병원 로고.png" alt="hplogo" />
        </Link>
      </header>
      <section className={styles.container}>
        <h1 className="hidden">홈</h1>
        <section className={styles.container__walk}>
          <h1 className="hidden">강아지 산책 정보</h1>
          {!loginState ? (
            <article className={styles.login_container}>
              <h2>로그인 해주세요.</h2>
              <button type="button">
                <Link to="/login">로그인</Link>
              </button>
            </article>
          ) : (
            <article className={styles.walk__info}>
              <div className={styles.img_container}>
                <img src="/assets/home/강아지 아이콘.png" alt="" />
              </div>
              <span>강아지 산책을 안한지 20시간이 지났어요!</span>
            </article>
          )}
        </section>
        <section className={styles.container__course}>
          <h1 className={styles.course__title}>오늘의 산책 코스 추천</h1>
          <article className={styles.course__info}>
            <div className={styles.img_container}>
              <img src="/assets/home/동탄여울공원.png" alt="동탄여울공원" />
            </div>
            <div className={styles.info_detail}>
              <span>소요 시간 | 30분</span>
              <span>이동 거리 | 1.4km</span>
            </div>
          </article>
        </section>
        <section className={styles.container__community}>
          <h1 className={styles.community__title}>오늘의 인기 일상 글</h1>
          <article className={styles.community__info}>
            <div class={styles.slider}>
              <div class={styles.slide}>
                <div className={styles.img_container}>
                  <img src="/assets/home/동탄여울공원.png" alt="커뮤니티 첨부 사진" />
                </div>
                <div className={styles.profile_container}>
                  <div className={styles.img_container}>
                    <img src="/assets/home/임시프로필.png" alt="사용자이름" />
                  </div>
                  <span>사용자이름</span>
                </div>
                <div className={styles.content}>
                  <span>커뮤니티 내용</span>
                </div>
              </div>
              <div class={styles.slide}>
                <div className={styles.img_container}>
                  <img src="/assets/home/동탄여울공원.png" alt="커뮤니티 첨부 사진" />
                </div>
                <div className={styles.profile_container}>
                  <div className={styles.img_container}>
                    <img src="/assets/home/임시프로필.png" alt="사용자이름" />
                  </div>
                  <span>사용자이름</span>
                </div>
                <div className={styles.content}>
                  <span>커뮤니티 내용</span>
                </div>
              </div>
              <div class={styles.slide}>
                <div className={styles.img_container}>
                  <img src="/assets/home/동탄여울공원.png" alt="커뮤니티 첨부 사진" />
                </div>
                <div className={styles.profile_container}>
                  <div className={styles.img_container}>
                    <img src="/assets/home/임시프로필.png" alt="사용자이름" />
                  </div>
                  <span>사용자이름</span>
                </div>
                <div className={styles.content}>
                  <span>커뮤니티 내용</span>
                </div>
              </div>
            </div>          
          </article>
        </section>
      </section>
    </div>
  );
}

export default Home;
