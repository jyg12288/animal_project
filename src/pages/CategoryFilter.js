import React, { useEffect } from 'react';
import styles from './Community.module.css';

function CategoryFilter({ categories, category, setCategory }) {
  const makeCategories = () => {
    if (categories.length === 0) return;

    return categories.map((item, idx) => (
      <span
        key={idx}
        className={
          item.value === category
            ? styles.category_child_selected
            : styles.category_child
        }
        onClick={() => {
          setCategory(item.value);
        }}
      >
        {item.name}
      </span>
    ));
  };

  return (
    <div>
      <div className="category-set">{makeCategories()}</div>
    </div>
  );
}

export default CategoryFilter;
