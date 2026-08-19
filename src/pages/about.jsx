import styles from './about.module.css'

// Inline CSS 
// CSS Modules
// normal css -> css file for every page/component file name -> .module.css

// style component
// tailwind

export const About = () => {
  return (
    <>
      <div className={styles.btnStyle}>About page</div>
      <div>I am a student</div>
    </>
  )
}
