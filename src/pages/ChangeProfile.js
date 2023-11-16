import React, { useState } from "react";
import styles from "./ChangeProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function ChangeProfile() {
  const navigate = useNavigate();

  // 현재 아이디, 닉네임을 저장할 변수입니다.
  const [profile, setProfile] = useState({
    id: "abcabcabc",
    pass: "aaaabbbbccccdddd",
    nick: "솜이",
  });

  // 현재 비밀번호 확인에 사용될 변수
  const [password, setPassword] = useState("");

  // 현재 비밀번호를 일치하게 입력했는지에 대한 상태를 나타낼 변수
  const [matchState, setMatchState] = useState(false);

  // 비밀번호가 일치할 때 상태를 변경해줄 함수
  const handleMatchBtn = () => {
    if (password === profile.pass) {
      setMatchState(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  // 내 정보 수정에 사용될 변수
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
    navigate("/mypage");
  };

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

        <h1 className={styles.header__title}>내 정보 수정</h1>
      </header>
      {!matchState ? (
        <section className={styles.container}>
          <h2 className={styles.container__info_text}>
            내 정보 수정을 위해서는 인증절차가 필요합니다.
          </h2>

          <div className={styles.container__pw_items}>
            <input
              type="password"
              className={styles.items__input}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button
              type="button"
              className={styles.items__match_btn}
              onClick={handleMatchBtn}
            >
              비밀번호 확인
            </button>
          </div>
        </section>
      ) : (
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
              <span className={styles.items__input_title}>아이디</span>
              <div className={styles.input_container}>
                <input
                  type="text"
                  className={styles.read_only}
                  defaultValue={profile.id}
                  readOnly
                />
              </div>
            </div>
            <div className={styles.form__items}>
              <label htmlFor="pw" className={styles.items__input_title}>
                비밀번호
              </label>
              <div className={styles.input_container}>
                <input
                  id="pw"
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
              <label htmlFor="nick" className={styles.items__input_title}>
                닉네임
              </label>
              <div className={styles.input_container}>
                <input
                  id="nick"
                  type="text"
                  placeholder="닉네임 입력"
                  defaultValue={profile.nick}
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
                  <span className={styles.error_msg}>
                    {errors.nick.message}
                  </span>
                )}
              </div>
            </div>

            <button type="submit" className={styles.submit_btn}>
              확인
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default ChangeProfile;
