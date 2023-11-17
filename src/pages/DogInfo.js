import React, { useState } from 'react';
import styles from './DogInfo.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function DogInfo() {
  //강아지 품종 option
  const dogKind = [
    '골든리트리버',
    '닥스훈트',
    '포메라니안',
    '푸들',
    '몰티즈',
    '비글',
    '비숑',
  ];
  const dogGender = ['여자', '남자'];
  const dogPhysical = ['날씬', '보통', '통통'];
  const dogNeuterzation = ['예', '아니오'];

  const [dogInfo, setDogInfo] = useState({
    name: '솜이',
    kind: '포메라니안',
    birth: new Date(),
    gender: '여자',
    weight: 3.8,
    physical: '보통',
    neuterzation: '아니오',
    details: '솜이의 상세 정보 입니다.',
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  //   {
  //   defaultValues: {
  //     name: dogInfo.name,
  //     kind: dogInfo.kind,
  //     birth: dogInfo.birth,
  //     gender: dogInfo.gender,
  //     weight: dogInfo.weight,
  //     physical: dogInfo.physical,
  //     neuterzation: dogInfo.neuterzation,
  //     details: dogInfo.details,
  //   },
  // }

  const submitForm = (data) => {
    console.log(data);
    navigate('/mypage');
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
        <h1 className={styles.header__title}>반려동물 상세정보</h1>
      </header>
      <section className={styles.container}>
        <article className={styles.container__profile}>
          <div className={styles.img_container}>
            <img src="/assets/dogInfo/강아지정보사진 예시.png" alt="" />
          </div>
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
            <label htmlFor="name">이름</label>
            <div className={styles.input_container}>
              <input
                type="text"
                {...register('name', {
                  valueAsDate: true,
                  required: '이름을 입력해주세요',
                })}
              />
              {errors.name && (
                <span className={styles.error_msg}>{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className={styles.form__items}>
            <label htmlFor="kind">품종</label>
            <div className={styles.input_container}>
              <select {...register('kind')}>
                {dogKind.map((kind, key) => {
                  return (
                    <option key={key} value={kind}>
                      {kind}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.form__items}>
            <label htmlFor="birth">나이(생년월일)</label>
            <div className={styles.input_container}>
              <input
                type="date"
                placeholder={useForm.birth}
                {...register('birth', {
                  valueAsDate: true,
                  required: '생일을 입력해주세요',
                })}
              />
              {errors.birth && (
                <span className={styles.error_msg}>{errors.birth.message}</span>
              )}
            </div>
          </div>
          <div className={styles.form__radio}>
            <label htmlFor="gender">성별</label>
            <div className={styles.radio_container}>
              {dogGender.map((gender, key) => {
                return (
                  <div key={key} className={styles.radio_select}>
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      id={gender}
                      className={styles.radioBtn}
                      {...register('gender', {
                        required: '성별을 선택해주세요',
                      })}
                    />
                    <label htmlFor={gender}>{gender}</label>
                  </div>
                );
              })}
              {errors.gender && (
                <span className={styles.error_msg}>
                  {errors.gender.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles.form__items}>
            <label htmlFor="weight">몸무게</label>
            <div className={styles.input_container}>
              <input
                type="text"
                {...register('weight', {
                  required: '몸무게를 입력해주세요',
                  pattern: {
                    value: /^(?=.*[0-9])/,
                    message: '숫자만 입력해주세요',
                  },
                })}
              />
              {errors.weight && (
                <span className={styles.error_msg}>
                  {errors.weight.message}
                </span>
              )}
            </div>
            <span>kg</span>
          </div>
          <div className={styles.form__radio}>
            <label htmlFor="physical">체형</label>
            <div className={styles.radio_container}>
              {dogPhysical.map((physical, key) => {
                return (
                  <div key={key} className={styles.radio_select}>
                    <input
                      type="radio"
                      name="physical"
                      value={physical}
                      id={physical}
                      className={styles.radioBtn}
                      {...register('physical', {
                        required: '체형을 선택해주세요',
                      })}
                    />
                    <label htmlFor={physical}>{physical}</label>
                  </div>
                );
              })}
              {errors.physical && (
                <span className={styles.error_msg}>
                  {errors.physical.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles.form__radio}>
            <label htmlFor="neuterzation">중성화여부</label>
            <div className={styles.radio_container}>
              {dogNeuterzation.map((neuterzation, key) => {
                return (
                  <div key={key} className={styles.radio_select}>
                    <input
                      type="radio"
                      name="neuterzation"
                      value={neuterzation}
                      id={neuterzation}
                      className={styles.radioBtn}
                      {...register('neuterzation', {
                        required: '중성화여부를 선택해주세요',
                      })}
                    />
                    <label htmlFor={neuterzation}>{neuterzation}</label>
                  </div>
                );
              })}
              {errors.neuterzation && (
                <span className={styles.error_msg}>
                  {errors.neuterzation.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles.form__items}>
            <label htmlFor="details">내용</label>
            <div className={styles.input_textatea}>
              <textarea
                id="details"
                aria-invalid={
                  isSubmitted ? (errors.details ? 'true' : 'false') : undefined
                }
                {...register('details', {
                  required: '내용을 입력해주세요.',
                  maxLength: {
                    value: 1000,
                    message: '1000자까지 작성이 가능합니다.',
                  },
                })}
              />
              {errors.details && (
                <span className={styles.error_msg}>
                  {errors.details.message}
                </span>
              )}
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

export default DogInfo;
