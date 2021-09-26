import React from 'react';
import styles from './button.module.scss';
import cn from 'classnames';

const Button = ({ label, alternative, ...props}) => {
  return (
    <>
      <div className={cn([styles.container, alternative ? styles.containerAlt : null])} {...props}>
        <span className={cn([styles.label, alternative ? styles.labelAlt : null])}>{label}</span>
      </div>
    </>
  );
}

export default Button;