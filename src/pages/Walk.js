import React, { useState, useEffect } from "react";
import styles from "./Walk.module.css";
import { Link } from "react-router-dom";

function Walk({ coord }) {
  // 로그인 상태
  const [loginState, setLoginState] = useState(true);

  // 오늘 날짜 저장 변수들
  const currentDay = new Date();
  const currentYear = currentDay.getFullYear();
  const currentMonth = currentDay.getMonth();
  const currentDate = currentDay.getDate();
  const currentDayOfWeek = currentDay.getDay();
  console.log(coord);
  // 이번주 날짜를 저장할 변수
  const [thisWeek, setThisWeek] = useState([]);
  console.log(coord);
  // 이번주 날짜를 가져올 함수
  const weekDate = () => {
    let temp = [];
    const day = {
      0: "일",
      1: "월",
      2: "화",
      3: "수",
      4: "목",
      5: "금",
      6: "토",
    };

    for (let i = 0; i < 7; i++) {
      let resultDay = new Date(
        currentYear,
        currentMonth,
        currentDate + (i - currentDayOfWeek)
      );

      let yyyy = Number(resultDay.getFullYear());
      let mm = Number(resultDay.getMonth()) + 1;
      let dd = Number(resultDay.getDate());
      let dddd = day[resultDay.getDay()];

      temp[i] = { yyyy: yyyy, mm: mm, dd: dd, dddd: dddd };
    }

    setThisWeek([...temp]);
  };

  // 산책 일지 저장 변수
  const [diary, setDiary] = useState([
    { date: "10월 02일 월요일", time: "43", distance: "851", kcal: "12.6" },
    { date: "10월 01일 일요일", time: "33", distance: "100", kcal: "6.7" },
    { date: "09월 29일 금요일", time: "196", distance: "780", kcal: "70.3" },
    { date: "10월 02일 월요일", time: "43", distance: "851", kcal: "12.6" },
    { date: "10월 02일 월요일", time: "43", distance: "851", kcal: "12.6" },
    { date: "10월 02일 월요일", time: "43", distance: "851", kcal: "12.6" },
    { date: "10월 02일 월요일", time: "43", distance: "851", kcal: "12.6" },
  ]);

  // 산책 일지를 3개씩만 보여주기 위해
  // 현재 페이지 개수를 저장할 변수
  const [pagenum, setPagenum] = useState(0);

  // 더보기 버튼 상태
  const [moreBtn, setMoreBtn] = useState(false);

  // 산책 일지에서 일부만 가져오기 위한 변수
  let slice = pagenum + 3;

  // 더보기 버튼을 눌렀을 때 실행될 함수
  const handleMoreBtn = (currentPagenum) => {
    if (currentPagenum >= diary.length) {
      setPagenum(diary.length);
      setMoreBtn(true);
    } else {
      setPagenum(currentPagenum);
    }
  };

  // 일주일 달력을 생성해주는 함수를 호출해주는 함수
  useEffect(() => {
    weekDate();
  }, []);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>케어</h1>
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
          <h1 className="hidden">산책하기</h1>
          <article className={styles.container__walk}>
            <h2 className={styles.walk__title}>산책하기</h2>
            <div className={styles.walk__location_info}>
              <span className={styles.current_date}>
                {(currentMonth + 1).length === 1
                  ? "0" + (currentMonth + 1)
                  : currentMonth + 1}
                월{currentDate.length === 1 ? "0" + currentDate : currentDate}일
              </span>
              <div className={styles.info__items}>
                <span>OO시 OO구 OO동</span>
                <div className={styles.temp_container}>
                  <div className={styles.img_container}>
                    <img src="/assets/walk/온도 아이콘.png" alt="temp_icon" />
                  </div>
                  <span>10℃</span>
                </div>
              </div>
            </div>
            <div className={styles.walk__weather_info}>
              <div className={styles.particulate_matter_level}>
                <div className={styles.img_container}>
                  <img
                    src="/assets/walk/미세먼지 좋음 아이콘.png"
                    alt="particulate matter icon"
                  />
                </div>
                <span>산책하기 좋은 날 오늘을 놓치지 마세요.</span>
              </div>
              <div className={styles.weather_level}>
                <div className={styles.current_weather}>
                  <img src="/assets/walk/weather icon.png" alt="weather icon" />
                  <span>구름</span>
                </div>
                <div className={styles.current_weather_detail}>
                  <span>미세먼지: 좋음</span>
                  <span>강수확율: 30%</span>
                </div>
              </div>
            </div>
            <button type="button" className={styles.walk__start_btn}>
              산책하기
            </button>
          </article>
          <article className={styles.container__diary}>
            <h2 className={styles.diary__title}>산책일지</h2>
            <div className={styles.diary__week_date}>
              <div className={styles.date__days}>
                <span className={styles.days__item}>일</span>
                <span className={styles.days__item}>월</span>
                <span className={styles.days__item}>화</span>
                <span className={styles.days__item}>수</span>
                <span className={styles.days__item}>목</span>
                <span className={styles.days__item}>금</span>
                <span className={styles.days__item}>토</span>
              </div>
              <ol className={styles.date__dates}>
                {thisWeek.map((date, i) => {
                  return (
                    <li
                      className={
                        date.dd === currentDate
                          ? styles.item_current
                          : styles.item
                      }
                      key={i}
                      onClick={() => {
                        console.log(
                          `${date.yyyy} ${date.mm} ${date.dd} ${date.dddd}`
                        );
                      }}
                    >
                      {date.dd}
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className={styles.diary_info}>
              <div className={styles.item}>
                <span>시간</span>
                <span>03:16:51</span>
              </div>
              <div className={styles.item}>
                <span>거리</span>
                <span>7.8km</span>
              </div>
              <div className={styles.item}>
                <span>칼로리</span>
                <span>70.3kcal</span>
              </div>
            </div>
            <div className={styles.diray__banner}>
              <span>산책 내역과 사진을 가족들에게 알려주세요</span>
            </div>
            <div className={styles.diary_list}>
              <h3 className={styles.list__title}>산책 내역</h3>
              <ol className={styles.list__items}>
                {diary.slice(0, slice).map((data, i) => {
                  return (
                    <li className={styles.item} key={i}>
                      <div className={styles.item_left}>
                        <span>{data.date}</span>
                        <span>
                          {data.time}분, {data.distance}m, {data.kcal}kcal
                        </span>
                      </div>
                      <div className={styles.item_right}>
                        <img
                          src="/assets/home/임시프로필.png"
                          alt="user profile"
                        />
                      </div>
                    </li>
                  );
                })}
              </ol>
              <button
                type="button"
                onClick={() => {
                  handleMoreBtn(pagenum + 3);
                }}
                className={
                  !moreBtn
                    ? styles.list__more_btn
                    : styles.list__more_btn_hidden
                }
              >
                더보기
              </button>
            </div>
          </article>
        </section>
      )}
    </div>
  );
}

export default Walk;
