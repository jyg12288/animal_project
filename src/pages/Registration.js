import React, { useState } from "react";
import styles from "./Registration.module.css";
import { useForm } from "react-hook-form";

function Registration() {
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div className="main">
      <header className={styles.header}>
        <div className={styles.header__previous_icon}>
          <img src="/assets/뒤로가기.png" alt="Go to previous page" />
        </div>
        <h1 className={styles.header__title}>회원가입</h1>
      </header>
      <section className={styles.registration_container}>
        <article className={styles.registration__profile}>
          <img src="/assets/registration/프로필사진예시.png" alt="" />
          <button type="button">
            <img
              src="/assets/registration/사진 첨부 아이콘.png"
              alt="Attach button"
            />
          </button>
          <input type="file" />
        </article>
        <article className={styles.registration__form}>
          <form onSubmit={handleSubmit(submitForm)} className={styles.items}>
            <div className={styles.item}>
              <label htmlFor="id">아이디</label>
              {errors.id && (
                <span className={styles.error_msg}>{errors.id.message}</span>
              )}
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
              <span className={styles.id_warning_msg}>중복 불가능</span>
            </div>
            <div className={styles.item}>
              <label htmlFor="id">비밀번호</label>
              <div>
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
                    isSubmitted
                      ? errors.password
                        ? "true"
                        : "false"
                      : undefined
                  }
                  {...register("password", {
                    required: "비밀번호는 필수 입력입니다.",
                    pattern: {
                      value: new RegExp(`${password}`, "g"),
                      message: "비밀번호가 일치하지 않습니다.",
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
            <div className={styles.item}>
              <label htmlFor="id">닉네임</label>

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

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submit_btn}
            >
              회원가입
            </button>
          </form>
        </article>
      </section>
    </div>
  );
}

export default Registration;
