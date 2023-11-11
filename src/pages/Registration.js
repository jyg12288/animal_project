import React, { useState, useEffect } from "react";
import styles from "./Registration.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
  const [password, setPassword] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });

    // axios
    //   .get(
    //     `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lat}&y=${lon}`,
    //     {
    //       headers: {
    //         Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     //법정동 기준으로 동단위의 값을 가져온다
    //     let location = result.documents[0].region_3depth_name;
    //     console.log(location);
    //   });
  }, []);

  console.log(lat);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <button
          className={styles.header__previous_icon}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src="/assets/뒤로가기.png" alt="Go to previous page" />
        </button>
        <h1 className={styles.header__title}>회원가입</h1>
      </header>
      <section className={styles.container}>
        <article className={styles.container__profile}>
          <img src="/assets/registration/프로필사진예시.png" alt="" />
          <label htmlFor="file">
            <img
              src="/assets/registration/사진 첨부 아이콘.png"
              alt="Attach button"
            />
          </label>
          <input type="file" id="file" />
        </article>
        <form
          onSubmit={handleSubmit(submitForm)}
          className={styles.container__form}
        >
          <div className={styles.form__items}>
            <label htmlFor="id">아이디</label>
            <div className={styles.input_container}>
              <input
                type="text"
                placeholder="아이디 입력"
                aria-invalid={
                  isSubmitted ? (errors.id ? "true" : "false") : undefined
                }
                {...register("id", {
                  required: "아이디는 필수 입력입니다.",
                  minLength: {
                    value: 8,
                    message: "8자리 이상 아이디를 사용하세요",
                  },
                  maxLength: {
                    value: 15,
                    message: "15자리 이하 아이디를 사용하세요",
                  },
                })}
              />
              <span className={styles.id_warning_msg}>*중복 불가능</span>
              {errors.id && (
                <span className={styles.error_msg}>{errors.id.message}</span>
              )}
            </div>
          </div>
          <div className={styles.form__items}>
            <label htmlFor="id">비밀번호</label>
            <div className={styles.input_container}>
              <input
                type="text"
                placeholder="비밀번호 입력"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="비밀번호 재입력"
                aria-invalid={
                  isSubmitted ? (errors.password ? "true" : "false") : undefined
                }
                {...register("password", {
                  required: "비밀번호는 필수 입력입니다.",
                  pattern: {
                    value: new RegExp(`${password}`, "g"),
                    message: "비밀번호가 일치하지 않습니다.",
                  },
                  minLength: {
                    value: 10,
                    message: "10자리 이상 비밀번호를 사용하세요",
                  },
                  maxLength: {
                    value: 20,
                    message: "20자리 이하 비밀번호를 사용하세요",
                  },
                })}
              />
              {errors.password && (
                <span className={styles.error_msg}>
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles.form__items}>
            <label htmlFor="id">닉네임</label>
            <div className={styles.input_container}>
              <input
                type="text"
                placeholder="닉네임 입력"
                aria-invalid={
                  isSubmitted ? (errors.nick ? "true" : "false") : undefined
                }
                {...register("nick", {
                  required: "닉네임은 필수 입력입니다.",
                  maxLength: {
                    value: 10,
                    message: "10자리 이하 닉네임을 사용해주세요.",
                  },
                })}
              />
              {errors.nick && (
                <span className={styles.error_msg}>{errors.nick.message}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submit_btn}
          >
            회원가입
          </button>
        </form>
      </section>
    </div>
  );
}

export default Registration;
