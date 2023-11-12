import React, { useState } from 'react';
import styles from './Community.module.css';
import { Link } from 'react-router-dom';

function Community() {
  const [likeState, setLikeState] = useState(true);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>커뮤니티</h1>
      </header>
      <section className="container">
        <article className={styles.topList_container}>
          <div className={styles.category_container}>
            <span>전체</span>
            <span>일상</span>
            <span>질문</span>
            <span>실종신고</span>
          </div>
          <div className={styles.location_container}>
            <div className={styles.img_container}>
              <img src="/assets/community/위치마커.png" alt="위치마커" />
            </div>
            <span>위치</span>
          </div>
        </article>
        <article className="Post_container">
          <div className={styles.profile_container}>
            <div className={styles.img_container}>
              <img src="/assets/home/임시프로필.png" alt="사용자이름" />
            </div>
            <span>사용자이름</span>
          </div>
          <div className="post_date">
            <span>1시간 전</span>
          </div>
          <div className="img_container">
            <img src="/assets/home/동탄여울공원.png" alt="커뮤니티사진" />
          </div>
          <div className="content">
            <span>새 프로필 사진을 찍었어요~ 진짜 귀여운 것 같아요!!!!</span>
          </div>
          <div className="community_category">
            <span>일상 게시판</span>
          </div>
          <div className="post_reaction">
            <div className="post_like">
              {!likeState ? (
                <img
                  src="/assets/community/채워지지않은좋아요.png"
                  alt="좋아요"
                />
              ) : (
                <img src="/assets/community/채워진좋아요.png" alt="좋아요" />
              )}
              <span>7</span>
            </div>
            <div className="post_comment">
              <img src="/assets/community/댓글아이콘.png" alt="댓글" />
              <span>22</span>
            </div>
          </div>
        </article>
        <div className="write_post">
          <Link to="/writePost" className={styles.write__link}>
            <img src="/assets/community/글작성 버튼.png" alt="글작성" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Community;
