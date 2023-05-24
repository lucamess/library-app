import React, { useState } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import { useNavigate, useLocation } from "react-router-dom"
import { Input, InputMultiple, Button, Space, Checkbox } from "comp"
import { booksState } from "src/states"
import { routePathList } from "src/config"
import { daysFromToday } from "src/utils"

const initEdBook = {
	issuedDate: "", issuedName: "", issuedClass: "", issuedNote: "",
}

const ViewBook = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [, setBooks] = useRecoilState(booksState)
	const [edBook, setEdBook] = useState({
		...initEdBook,
		...location.state,
	})
	const [taken, setTaken] = useState(edBook.issuedName.replace(" ", "") != "")

	const handleCheck = (checked) => {
		if(checked == false) {
			setEdBook(book => ({
				...book,
				...initEdBook,
			}))
		}

		setTaken(checked)
	}
	const handleInput = key => e => {
		setEdBook(book => ({
			...book,
			[key]: e.target.value
		}))
	}
	const handleSave = () => {
		setBooks(oldBooks => {
			const newBooks = editBook(edBook) (oldBooks)
			localStorage.setItem("books", JSON.stringify(newBooks))
			return newBooks
		})
		toast.success("Data saved to the database")
	}

	return (
		<Container>
			<Button onClick={() => navigate(routePathList.home)}
				type="text" style={{ width: "min-content" }}>{"<-Back"}</Button>
			<Space h="2rem" />
			<Title>{edBook.title}</Title>
			<Subtitle>{edBook.audience}</Subtitle>
			<Space h="1rem" />
			<Text><strong>Book ID:</strong> {edBook.bookId}</Text>
			{taken &&
			<Text><strong>Days since issue:</strong> {daysFromToday(edBook.issuedDate)}</Text>}
			<Space h="1rem" />
			<Checkbox label="Taken" initialValue={taken} onChange={handleCheck} />

			{taken == false ? null :
			<Card>
				<Input value={edBook.issuedName} onChange={handleInput("issuedName")}
					placeholder="Student name" />
				<Input value={edBook.issuedClass} onChange={handleInput("issuedClass")}
					placeholder="Class" />
				<Input value={edBook.issuedDate} onChange={handleInput("issuedDate")}
					placeholder="Date" type="date" />
				<InputMultiple value={edBook.issuedNote} onChange={handleInput("issuedNote")}
					placeholder="Note" />

				<Button onClick={handleSave}
					size="small" style={{ alignSelf: "flex-end", width: "min-content" }}>
					Save
				</Button>
			</Card>}
		</Container>
	)
}

const editBook = (edBook) => oldBooks => {
	return oldBooks.map(oldBook => {
		if(oldBook.bookId != edBook.bookId)
			return oldBook
		return ({
			...oldBook,
			...edBook,
		})
	})
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 600px;
	margin: 0 auto;
	padding: 2rem;
`
const Title = styled.div`
	font-size: 2rem;
	color: #363636;
	font-weight: bold;
`

const Subtitle = styled.div`
	font-size: 1.8rem;
	color: #454545;
`

const Text = styled.div`
	color: #454545;
`

const Card = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 2rem;
	gap: 1rem;
	margin: 1rem;
`

export default ViewBook
