import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hospital.module.css";

function Hospital({ coord }) {
  // 이전 페이지로 이동하기 위한 변수
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("관련순");

  // 병원 리스트 저장 변수
  const list = [
    {
      name: "24라임병원",
      time: "평일 00:00 ~ 24:00",
      kind: "동물병원",
      location: "서울 성동구 무학로 16(우)04707",
    },
    {
      name: "라임병원",
      time: "평일 00:00 ~ 24:00",
      kind: "동물병원",
      location: "서울 성동구 무학로 16(우)04707",
    },
    {
      name: "임병원",
      time: "평일 00:00 ~ 24:00",
      kind: "동물병원",
      location: "서울 성동구 무학로 16(우)04707",
    },
    {
      name: "병원",
      time: "평일 00:00 ~ 24:00",
      kind: "동물병원",
      location: "서울 성동구 무학로 16(우)04707",
    },
    {
      name: "24라임병원",
      time: "평일 00:00 ~ 24:00",
      kind: "동물병원",
      location: "서울 성동구 무학로 16(우)04707",
    },
    {
      name: "24라임병원",
      time: "평일 00:00 ~ 24:00",
      kind: "동물병원",
      location: "서울 성동구 무학로 16(우)04707",
    },
    {
      name: "24라임병원",
      time: "평일 00:00 ~ 24:00",
      kind: "동물병원",
      location: "서울 성동구 무학로 16(우)04707",
    },
  ];
  const [hospital, setHospital] = useState([]);

  // 전체 페이지에 맞게 페이지 번호 개수를 저장하는 변수
  const paginationUnits = Math.ceil(hospital.length / 2);

  // 현재 페이지 인덱스 저장 변수
  const [currentPage, setCurrentPage] = useState(0);

  // 병원 리스트를 일부만 가져오는 변수
  let slice = currentPage + 2;

  const clickPageBtn = (page) => {
    if (page === 0) {
      setCurrentPage(0);
    } else {
      setCurrentPage(page * 2);
    }
  };

  useEffect(() => {
    setHospital(list);
  }, []);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1 className="hidden">병원 검색창</h1>
        <button
          className={styles.header__previous_icon}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src="/assets/뒤로가기.png" alt="Go to previous page" />
        </button>
        <input
          type="text"
          className={styles.header__search_input}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder="병원을 검색하세요"
        />
        <button type="submit" className={styles.header__search_btn}>
          <img src="/assets/hospital/검색 아이콘.png" alt="A search button" />
        </button>
      </header>
      <article className={styles.user_location}>
        <h1 className="hidden">사용자 현재 위치</h1>
        <div className={styles.img_container}>
          <img src="/assets/community/위치마커.png" alt="Location icon" />
        </div>
        <span>{coord.region_3depth_name}</span>
      </article>
      <article className={styles.count_container}>
        <h1 className="hidden">병원 리스트 총 개수와 검색 필터 버튼</h1>
        <span>총 {hospital.length}개</span>
        <select
          className={styles.search_filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option>관련순</option>
          <option>동물병원</option>
          <option>동물약국</option>
        </select>
      </article>
      <ul className={styles.list}>
        {hospital.slice(currentPage, slice).map((item, i) => {
          return (
            <li className={styles.list__item} key={i}>
              <h2>{item.name}</h2>
              <div className={styles.item__operating_time}>
                <span className={styles.detail_time}>{item.time}</span>
                <span className={styles.item_kind}>{item.kind}</span>
              </div>
              <div className={styles.item__location}>
                <div className={styles.location__left}>
                  <div className={styles.img_container}>
                    <img
                      src="/assets/community/위치마커.png"
                      alt="Location icon"
                    />
                  </div>
                  <span>120m</span>
                </div>
                <div className={styles.location__right}>
                  <span>{item.location}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <ol className={styles.pagination_container}>
        {[...Array(parseInt(paginationUnits))].map((_, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                clickPageBtn(i);
              }}
              className={i === currentPage / 2 ? styles.current : undefined}
            >
              {i + 1}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Hospital;
