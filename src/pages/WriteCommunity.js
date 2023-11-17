import React, { useState } from 'react';
import styles from './WriteCommunity.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Write_Community({ coord }) {
  const [imgState, setImgState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
    navigate('/community');
  };

  const navigate = useNavigate();

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
        <h1 className={styles.header__title}>작성하기</h1>
      </header>
      <section className={styles.container}>
        <article className={styles.container__profile}>
          <div className={styles.img_container}>
            <img src="/assets/writeCommunity/커뮤니티사진 예시.png" alt="" />
          </div>
          <div className={styles.input_img}>
            <label htmlFor="file">
              <img
                src="/assets/writeCommunity/사진추가.png"
                alt="Attach button"
              />
            </label>
            <input type="file" id="file" onChange={() => setImgState(true)} />
            {imgState ? <span>1/1</span> : <span>0/1</span>}
          </div>
        </article>
        <form
          onSubmit={handleSubmit(submitForm)}
          className={styles.container__form}
        >
          <div className={styles.form__items}>
            <label htmlFor="category">카테고리</label>
            <div className={styles.input_select}>
              <select {...register('categoty')}>
                <option value="daily">일상</option>
                <option value="question">질문</option>
                <option value="missing">실종신고</option>
              </select>
            </div>
          </div>
          <div className={styles.form__items}>
            <div className={styles.input_container}>
              <label htmlFor="content">내용</label>
              <div className={styles.input_textatea}>
                <textarea
                  id="content"
                  placeholder="여기에 작성해주세요"
                  aria-invalid={
                    isSubmitted
                      ? errors.content
                        ? 'true'
                        : 'false'
                      : undefined
                  }
                  {...register('content', {
                    required: '내용을 입력해주세요.',
                    maxLength: {
                      value: 1000,
                      message: '1000자까지 작성이 가능합니다.',
                    },
                  })}
                />
                {errors.content && (
                  <span className={styles.error_msg}>
                    {errors.content.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submit_btn}
          >
            완료
          </button>
        </form>
      </section>
    </div>
  );
}

export default Write_Community;
