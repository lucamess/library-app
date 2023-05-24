import React, { useState } from "react"
import styled from "styled-components"

const Checkbox = ({ label, initialValue = false, onChange }) => {
	const [checked, setChecked] = useState(initialValue)
	const handleClick = () => {
		setChecked(prev => {
			onChange(!prev)
			return !prev
		})
	}
	return (
		<Container>
			<input id={label} name={label} type="checkbox" onClick={handleClick} />
			<label htmlFor={label} style={{ cursor: "pointer" }}><strong>{label}</strong></label>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	gap: 0.5rem;
	padding: 0.5rem;
	border: 1px solid #aaa;
	border-radius: 4px;
	width: min-content;
`

export default Checkbox

