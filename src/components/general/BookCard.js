import React from "react"
import styled from "styled-components"
import { Space, Row, FlexGrow } from "comp"
import { daysFromToday, dateToHuman } from "src/utils"

const BookCard = ({ book, onClick }) => {
	const taken = Boolean(book.issuedName)
	return (
		<Container onClick={onClick}>
			<Row>
				<Title>{book.title}</Title>
				<FlexGrow />
				{taken &&
				<Text>{dateToHuman(book.issuedDate)} ({daysFromToday(book.issuedDate)} days)</Text>}
			</Row>
			<Subtitle>{book.audience}</Subtitle>

			<Space h="1rem" />
			<Row style={{ gap: "0.5rem" }}>
				<Status>{taken ? "Taken" : "Free"}</Status>
				{taken ? <Text>{book.issuedName} - {book.issuedClass}</Text> : null}
			</Row>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem 2rem;
	box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
	border: 1px solid #ccc;
	border-radius: 8px;
	cursor: pointer;
	margin-top: 0.5rem;
`

const Title = styled.div`
	font-size: 1.2rem;
	color: #363636;
	font-weight: bold;
`
const Subtitle = styled.div`
	font-size: 1.1rem;
	color: #454545;
`
const Text = styled.div`
	font-size: 1.1rem;
	color: #454545;
`
const Status = styled.div`
	font-size: 0.9rem;
	padding: 4px 8px;
	background: var(--primary);
	border-radius: 8px;
	color: #fff;
	width: min-content;
`

export default BookCard

