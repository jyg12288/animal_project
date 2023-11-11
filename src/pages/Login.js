import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="main">
      <header className={styles.header}>
        <h1 className={styles.header__title}>
          <img src="/assets/로고.png" alt="logo" />
        </h1>
      </header>
      <section className={styles.login_container}>
        <article className={styles.login__items}>
          <input type="text" placeholder="ID" />
          <input type="password" placeholder="Password" />
        </article>
        <button type="button">로그인</button>
      </section>
      <span className={styles.registration_notice}>
        아직 가입하지 않으셨다면 <Link to="/registration">회원가입</Link>
      </span>
    </div>
  );
}

export default Login;
