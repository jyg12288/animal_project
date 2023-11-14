import React, { useState, useEffect, useRef } from 'react';
import styles from './Walk.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';

function Walk({ coord }) {
  // 로그인 상태
  const [loginState, setLoginState] = useState(true);

  // 오늘 날짜 저장 변수들
  const currentDay = new Date();
  const currentYear = currentDay.getFullYear();
  const currentMonth = currentDay.getMonth();
  const currentDate = currentDay.getDate();

  // 이번주 날짜를 저장할 변수
  const [thisWeek, setThisWeek] = useState([]);

  // 이번주 날짜를 가져올 함수
  const weekDate = () => {
    let temp = [];

    // 요일을 한글로 변환할 때 사용할 집합
    const day = {
      0: '일',
      1: '월',
      2: '화',
      3: '수',
      4: '목',
      5: '금',
      6: '토',
    };

    for (let i = 0; i < 7; i++) {
      let resultDay = new Date(
        currentYear,
        currentMonth,
        currentDate + (i - currentDay.getDay())
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
    { date: '10월 02일 월요일', time: '43', distance: '851', kcal: '12.6' },
    { date: '10월 01일 일요일', time: '33', distance: '100', kcal: '6.7' },
    { date: '09월 29일 금요일', time: '196', distance: '780', kcal: '70.3' },
    { date: '10월 02일 월요일', time: '43', distance: '851', kcal: '12.6' },
    { date: '10월 02일 월요일', time: '43', distance: '851', kcal: '12.6' },
    { date: '10월 02일 월요일', time: '43', distance: '851', kcal: '12.6' },
    { date: '10월 02일 월요일', time: '43', distance: '851', kcal: '12.6' },
  ]);

  // 산책 일지를 3개씩만 보여주기 위해
  // 현재 페이지 개수를 저장할 변수
  const [pagenum, setPagenum] = useState(0);

  // 더보기 버튼 상태
  const moreBtn = useRef(false);

  // 산책 일지에서 일부만 가져오기 위한 변수
  let slice = pagenum + 3;

  // 더보기 버튼을 눌렀을 때 실행될 함수
  const handleMoreBtn = (currentPagenum) => {
    if (currentPagenum + 3 >= diary.length) {
      moreBtn.current = true;
      setPagenum(diary.length);
    } else {
      setPagenum(currentPagenum);
    }
  };

  // 현재 날씨 정보를 저장하는 변수
  const [weather, setWeather] = useState({
    temp: 0,
    weather: '',
    weatherIcon: '',
    rain: 0,
  });

  // 미세먼지 농도를 저장하는 변수
  const [minudust, setMinudust] = useState({ description: '', level: '' });

  useEffect(() => {
    weekDate();

    // 현재 날씨를 가져와주는 API
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        )
        .then((response) => {
          const temp = response.data.main.temp;
          const weather = response.data.weather[0].description;
          const weatherIcon =
            'https://openweathermap.org/img/wn/' +
            response.data.weather[0].icon +
            '@2x.png';
          const rain =
            response.data.weather[0].main !== 'Rain' &&
            response.data.weather[0].main !== 'rain'
              ? 0
              : response['data']['rain']['1h'];

          setWeather({
            temp: temp,
            weather: weather,
            weatherIcon: weatherIcon,
            rain: rain,
          });
        });
    });

    // 미세먼지 농도 api
    axios
      .get(
        `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${
          process.env.REACT_APP_MINUDUST_API_KEY
        }&returnType=json&numOfRows=1&pageNo=1&searchDate=${currentYear}-${
          currentMonth + 1
        }-${currentDate - 1}&InformCode=PM10`
      )
      .then((response) => {
        setMinudust({
          description:
            response.data.response.body.items[0].informCause.slice(9),
          level: response.data.response.body.items[0].informOverall.slice(
            16,
            18
          ),
        });
      });
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
                  ? '0' + (currentMonth + 1)
                  : currentMonth + 1}
                월{currentDate.length === 1 ? '0' + currentDate : currentDate}일
              </span>
              <div className={styles.info__items}>
                <span>
                  {coord.region_2depth_name} {coord.region_3depth_name}
                </span>
                <div className={styles.temp_container}>
                  <div className={styles.img_container}>
                    <img src="/assets/walk/온도 아이콘.png" alt="temp_icon" />
                  </div>
                  <span>{weather.temp}℃</span>
                </div>
              </div>
            </div>
            <div className={styles.walk__weather_info}>
              {minudust.level && <MinudustText minudust={minudust.level} />}
              <div className={styles.weather_level}>
                <div className={styles.current_weather}>
                  <img src={weather.weatherIcon} alt="weather icon" />
                  <span>{weather.weather}</span>
                </div>
                <div className={styles.current_weather_detail}>
                  <span>{minudust.level}</span>
                  <span>{weather.rain}mm/h</span>
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
            <div className={styles.diary__banner}>
              <span>산책 내역과 사진을 가족들에게 알려주세요</span>
            </div>
            <div className={styles.diary__list}>
              <h3 className={styles.list__title}>산책 내역</h3>
              <ol className={styles.list__items}>
                {diary.slice(0, slice).map((data, i) => {
                  return (
                    <li className={styles.item} key={i}>
                      <div className={styles.item__left}>
                        <span>{data.date}</span>
                        <span>
                          {data.time}분, {data.distance}m, {data.kcal}kcal
                        </span>
                      </div>
                      <div className={styles.item__right}>
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
                  !moreBtn.current
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
      <Navigation />
    </div>
  );
}

// 미세먼지 농도에 따라 알맞은 코멘트를 화면에 보여주는 컴포넌트
function MinudustText({ minudust }) {
  if (minudust === '좋음') {
    return (
      <div className={styles.particulate_matter_level}>
        <div className={styles.img_container}>
          <img
            src="/assets/walk/좋음 아이콘.png"
            alt="particulate matter icon"
          />
        </div>
        <div className={styles.description}>
          <span>산책하기 정말 좋은 날</span>
          <span>오늘을 놓치지 마세요.</span>
        </div>
      </div>
    );
  } else if (minudust === '나쁨') {
    <div className={styles.particulate_matter_level}>
      <div className={styles.img_container}>
        <img src="/assets/walk/나쁨 아이콘.png" alt="particulate matter icon" />
      </div>
      <div className={styles.description}>
        <span>산책하기 어려운 날</span>
        <span>마스크 꼭 착용하세요.</span>
      </div>
    </div>;
  } else {
    return (
      <div className={styles.particulate_matter_level}>
        <div className={styles.img_container}>
          <img
            src="/assets/walk/보통 아이콘.png"
            alt="particulate matter icon"
          />
        </div>
        <div className={styles.description}>
          <span>산책하기 무난한 날</span>
          <span>좋은 하루 보내세요.</span>
        </div>
      </div>
    );
  }
}

export default Walk;
