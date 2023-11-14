import React, { useEffect, useRef, useState } from 'react';
import styles from './Community.module.css';
import { Link } from 'react-router-dom';
import CategoryFilter from './CategoryFilter.js';
import Navigation from './Navigation.js';

function Community({ coord }) {
  const [likeState, setLikeState] = useState(true);
  const [category, setCategory] = useState('all');

  const categories = [
    { name: '전체', value: 'all' },
    { name: '일상', value: 'daily' },
    { name: '질문', value: 'question' },
    { name: '실종신고', value: 'missing' },
  ];

  const [postList, setPostList] = useState([
    {
      category: 'daily',
      profile_img: '/assets/home/임시프로필.png',
      nic: '솜이',
      location: '성동구',
      date: '1시간 전',
      img: '/assets/home/동탄여울공원.png',
      content:
        '비가 와서 오늘은 산책을 못 갔네요.. 솜이가 화가났어요 그래서 간식을 많이 줬어요!',
      like: 4,
      comment: 11,
    },
    {
      category: 'daily',
      profile_img: '/assets/home/임시프로필.png',
      nic: '몽이',
      location: '성동구',
      date: '2시간 전',
      img: '/assets/home/동탄여울공원.png',
      content: '커뮤니티 글',
      like: 3,
      comment: 13,
    },
    {
      category: 'question',
      profile_img: '/assets/home/임시프로필.png',
      nic: '돌리',
      location: '성동구',
      date: '3시간 전',
      img: '/assets/home/동탄여울공원.png',
      content: '커뮤니티 글',
      like: 6,
      comment: 5,
    },
  ]);

  const [showList, setShowList] = useState(postList);

  useEffect(() => {
    setShowList(
      postList.filter((item) => {
        if (category === 'all') return true;
        if (category === item.category) return true;
        return false;
      })
    );
  }, [category]);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>커뮤니티</h1>
      </header>
      <section className={styles.container}>
        <article className={styles.topList_container}>
          <div className={styles.category_container}>
            <CategoryFilter
              categories={categories}
              category={category}
              setCategory={setCategory}
            />
          </div>
          <div className={styles.location_container}>
            <div className={styles.img_container}>
              <img src="/assets/community/위치마커.png" alt="위치마커" />
            </div>
            <span>{coord.region_3depth_name}</span>
          </div>
        </article>
        <ol className={styles.list__items}>
          {showList.map((data, i) => {
            return (
              <li className={styles.item} key={i}>
                <article className={styles.post_container}>
                  <div className={styles.post_info}>
                    <div className={styles.profile_container}>
                      <div className={styles.img_container}>
                        <img src={data.img} alt="사용자이름" />
                      </div>
                      <div className={styles.profile_info}>
                        <span>{data.nic}</span>
                        <div className={styles.info_location}>
                          <span>{data.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.post_date}>
                      <span>{data.date}</span>
                    </div>
                  </div>
                  <div className={styles.img_container}>
                    <img src={data.img} alt="커뮤니티사진" />
                  </div>
                  <div className={styles.content}>
                    <span>{data.content}</span>
                  </div>
                  <div className={styles.bottomList_container}>
                    <div className={styles.community_category}>
                      <span>
                        <CategoryName
                          categories={categories}
                          postList={data.category}
                        />
                      </span>
                    </div>
                    <div className={styles.post_reaction}>
                      <div className={styles.post_like}>
                        <div
                          className={styles.img_container}
                          onClick={() => {
                            setLikeState(!likeState);
                          }}
                        >
                          {!likeState ? (
                            <img
                              src="/assets/community/채워지지않은좋아요.png"
                              alt="좋아요"
                            />
                          ) : (
                            <img
                              src="/assets/community/채워진좋아요.png"
                              alt="좋아요"
                            />
                          )}
                        </div>
                        <span>{data.like}</span>
                      </div>
                      <div className={styles.post_comment}>
                        <div className={styles.img_container}>
                          <img
                            src="/assets/community/댓글아이콘.png"
                            alt="댓글"
                          />
                        </div>
                        <span>{data.comment}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
        <div className={styles.write_post}>
          <Link to="/writePost" className={styles.write__link}>
            <img src="/assets/community/글작성 버튼.png" alt="글작성" />
          </Link>
        </div>
      </section>
      <Navigation target={3} />
    </div>
  );
}

const CategoryName = function ({ categories, postList }) {
  for (let i = 0; i < categories.length; i++)
    if (categories[i].value === postList) return categories[i].name;
};

export default Community;
