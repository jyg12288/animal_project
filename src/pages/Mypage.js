import React, { useState } from "react";
import styles from "./Mypage.module.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Mypage({ coord }) {
  const [loginState, setLoginState] = useState(true);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>마이페이지</h1>
      </header>
      {!loginState ? (
        <section className={styles.container}>
          <h1 className="hidden">로그인하기</h1>
          <div className={styles.container__login}>
            <span>로그인을 해주세요.</span>
            <Link to="/login">로그인</Link>
          </div>
        </section>
      ) : (
        <section className={styles.container}>
          <article className={styles.container__profile}>
            <div className={styles.profile__img}>
              <img src="/assets/home/임시프로필.png" alt="User Profile" />
            </div>
            <div className={styles.profile__info}>
              <div className={styles.info__header}>
                <h2>솜이</h2>
                <Link
                  to="/mypage/changeProfile"
                  className={styles.correction_btn}
                >
                  <div className={styles.img_container}>
                    <img
                      src="/assets/mypage/수정 아이콘.png"
                      alt="Correction icon"
                    />
                  </div>
                  <span>프로필 수정</span>
                </Link>
              </div>
              <div className={styles.info__detail}>
                <span>2020.10.10</span>
                <span>여자</span>
                <span>푸들</span>
              </div>
              <span className={styles.info__location}>
                {coord.region_1depth_name} {coord.region_2depth_name}
              </span>
            </div>
          </article>
          <article className={styles.container__menu}>
            <Link to="/walk" className={styles.menu__diary}>
              <div className={styles.img_container}>
                <img src="/assets/mypage/산책 아이콘.png" alt="Walk icon" />
              </div>
              <span>산책 일지</span>
            </Link>
            <Link to="/mypage/dog" className={styles.menu__dog}>
              <div className={styles.img_container}>
                <img
                  src="/assets/mypage/분홍 발바닥 아이콘.png"
                  alt="Dog Information icon"
                />
              </div>
              <span>상세정보</span>
            </Link>
            <Link to="/mypage/uploadHistory" className={styles.menu__history}>
              <div className={styles.img_container}>
                <img
                  src="/assets/mypage/활동 아이콘.png"
                  alt="User History icon"
                />
              </div>
              <span>나의 활동</span>
            </Link>
            <Link to="/mypage/likeHistory" className={styles.menu__like}>
              <div className={styles.img_container}>
                <img
                  src="/assets/mypage/좋아요 아이콘.png"
                  alt="Like History icon"
                />
              </div>
              <span>좋아요</span>
            </Link>
          </article>
          <article className={styles.container__banner}>
            <img src="/assets/mypage/배너.png" alt="" />
          </article>
          <article className={styles.container__menu_list}>
            <ul className={styles.list__items}>
              <li className={styles.items__item}>
                <span>푸시 설정</span>{" "}
                <div className={styles.img_container}>
                  <img src="/assets/mypage/더보기 아이콘.png" alt="more icon" />
                </div>
              </li>
              <li className={styles.items__item}>
                <span>이용 약관</span>{" "}
                <div className={styles.img_container}>
                  <img src="/assets/mypage/더보기 아이콘.png" alt="more icon" />
                </div>
              </li>
            </ul>
          </article>
        </section>
      )}

      <Navigation target={4} />
    </div>
  );
}

export default Mypage;
