import React from 'react'
import styles from "./contact.module.css"
import styled from 'styled-components'

const Heading = styled.h1`
  color: ${props => props.$active ? "red" : "yellow"};
  font-size: 40px;
  margin: 4px;


`

const Contact = () => {
  return (
    <>
    <Heading className="m-1">This is heading</Heading>
    <Heading active={true}>This is heading</Heading>
      <div className={styles.btnStyle}>contact</div>
    </>
  )
}

export default Contact